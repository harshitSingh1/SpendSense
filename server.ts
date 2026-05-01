import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import OpenAI from "openai";
import { auth } from "./lib/auth";
import { protectRoutes } from "./lib/middleware";
import { requireUser } from "./lib/auth-utils";
import dbConnect from "./lib/mongodb";
import Transaction from "./lib/models/Transaction";

import { getDashboardMetrics } from "./lib/actions/dashboard.actions";
import { createGoal, getGoals, fundGoal } from "./lib/actions/goal.actions";
import { getProtectionMetrics } from "./lib/actions/protection.actions";
import { saveCalendarNote } from "./lib/actions/calendar.actions";
import { generateAndSendOTP, verifyOTP } from "./lib/actions/auth.actions";
import { authenticateChatUser, chatRateLimiter } from "./src/middleware/chatRateLimiter";
import { otpRateLimiter } from "./src/middleware/otpRateLimiter";

dotenv.config();

const openai = new OpenAI({ 
  baseURL: 'https://api.featherless.ai/v1', 
  apiKey: process.env.FEATHERLESS_API_KEY || '' 
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust reverse proxy for X-Forwarded-* headers (required for correct OAuth redirect URIs)
  // Configure trust proxy securely. 
  // Scenario B: Cloud PaaS (Cloud Run, Vercel, Heroku) uses a dynamic load balancer. Trust exactly 1 hop.
  // If you deploy to a Self-Hosted VPS with Nginx, you would use: app.set("trust proxy", "loopback");
  app.set("trust proxy", 1);

  // 1. Auth.js Integration
  // Fix for @auth/express bug where it strictly uses req.get("host") instead of honoring trust proxy
  app.use("/api/auth", (req, res, next) => {
    if (process.env.APP_URL) {
      try {
        const parsedUrl = new URL(process.env.APP_URL);
        req.headers["host"] = parsedUrl.host;
        req.headers["x-forwarded-host"] = parsedUrl.host;
        req.headers["x-forwarded-proto"] = parsedUrl.protocol.replace(":", "");
      } catch (e) {
        // ignore
      }
    }
    next();
  }, auth);

  // 1.1 Auth Success Popup Handler
  app.get("/auth-success", (req, res) => {
    res.send(`
      <html>
        <body style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; background: #0f172a; color: white;">
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <div style="text-align: center;">
            <h2 style="margin-bottom: 8px;">Success!</h2>
            <p style="opacity: 0.7;">Closing this window...</p>
          </div>
        </body>
      </html>
    `);
  });

  // 2. Body parsing
  app.use(express.json());

  // 2.5 Auth API Routes (Custom OTP)
  app.post("/api/local-auth/send-otp", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      await generateAndSendOTP(email);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Password Reset Route
  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      const { sendPasswordResetEmail } = await import("./lib/actions/password.actions");
      await sendPasswordResetEmail(email);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/auth/reset-password-confirm", async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword) {
        return res.status(400).json({ error: "Token and new password are required" });
      }
      const { resetPassword } = await import("./lib/actions/password.actions");
      await resetPassword(token, newPassword);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });


  app.post("/api/local-auth/verify-otp", otpRateLimiter, async (req, res) => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).json({ error: "Email and OTP are required" });
      }
      await verifyOTP(email, otp);
      res.json({ success: true });
    } catch (error: any) {
      if (error.message?.includes("Maximum attempts reached")) {
        return res.status(403).json({ error: error.message });
      }
      if (error.message?.includes("Invalid OTP")) {
        return res.status(401).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  });

  // 3. API Routes (Example)
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      appUrl: process.env.APP_URL,
      authUrl: process.env.AUTH_URL
    });
  });

  // 4. Transaction API Routes
  app.get("/api/transactions", async (req, res) => {
    try {
      const user = await requireUser(req);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      
      await dbConnect();
      const transactions = await Transaction.find({ userId: (user as any).id })
        .sort({ date: -1 })
        .limit(limit)
        .lean();

      // Convert ObjectIds to strings for safe client-side consumption
      const safeTransactions = transactions.map(t => ({
        ...t,
        _id: t._id.toString(),
        userId: t.userId.toString()
      }));

      res.json(safeTransactions);
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const user = await requireUser(req);
      await dbConnect();
      
      // Sanitize the string (remove accidental commas) and prevent float loss
      const rawAmount = req.body.amount?.toString().replace(/,/g, '');
      const sanitizedAmount = Math.round(parseFloat(rawAmount) * 100) / 100;

      const transaction = await Transaction.create({
        ...req.body,
        amount: sanitizedAmount,
        userId: (user as any).id,
      });
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  app.delete("/api/transactions/:id", async (req, res) => {
    try {
      const user = await requireUser(req);
      await dbConnect();
      const result = await Transaction.deleteOne({ _id: req.params.id, userId: (user as any).id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Transaction not found or unauthorized" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  app.put("/api/transactions/:id", async (req, res) => {
    try {
      const user = await requireUser(req);
      await dbConnect();
      
      const { amount, category, date, note, type } = req.body;
      
      const updates: Record<string, any> = {};
      
      if (amount !== undefined) {
        const rawAmount = amount.toString().replace(/,/g, '');
        const parsed = Math.round(parseFloat(rawAmount) * 100) / 100;
        if (!isNaN(parsed)) updates.amount = parsed;
      }
      if (category !== undefined) updates.category = category;
      if (date !== undefined) updates.date = date;
      if (note !== undefined) updates.note = note;
      if (type !== undefined) updates.type = type;

      const transaction = await Transaction.findOneAndUpdate(
        { _id: req.params.id, userId: (user as any).id },
        { $set: updates },
        { new: true }
      );

      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found or unauthorized" });
      }
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  app.get("/api/dashboard/data", async (req, res) => {
    try {
      const stats = await getDashboardMetrics(req);
      res.json(stats);
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  });

  app.post("/api/dashboard/calendar-note", async (req, res) => {
    try {
      const { date, content } = req.body;
      const note = await saveCalendarNote(req, date, content);
      res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  // 4.1 Goal API Routes
  app.get("/api/goals", async (req, res) => {
    try {
      const goals = await getGoals(req);
      res.json(goals);
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  });

  app.post("/api/goals", async (req, res) => {
    try {
      const goal = await createGoal(req);
      res.status(201).json(goal);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  app.post("/api/goals/fund", async (req, res) => {
    try {
      const goal = await fundGoal(req);
      res.json(goal);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  // 4.2 Protection API Routes
  app.get("/api/protection/data", async (req, res) => {
    try {
      const metrics = await getProtectionMetrics(req);
      res.json(metrics);
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  });

  // 4.3 AI Chat Route with Context Injection
  app.post("/api/chat", authenticateChatUser, chatRateLimiter, async (req, res) => {
    try {
      // 1. User is already authenticated and attached by the middleware
      const user = (req as any).user;
      
      // 2. Fetch User Data
      const metrics = await getDashboardMetrics(req);
      
      const balance = metrics.currentBalance;
      const income = metrics.totalIncome;
      const categories = metrics.categoryAllocation.map(c => `${c.name} (₹${c.value})`).join(", ");

      // 3. Dynamic Context String
      const userDataContext = `User Current Balance: ₹${balance}. Total Income: ₹${income}. Top Expense Categories: ${categories}.`;

      // 4. The New System Prompt
      const systemMessage = { 
        role: "system" as const, 
        content: "You are Stocrates, an elite AI financial analyst for SpendSense AI. Here is the user live data: " + userDataContext + " Rules: Be direct, analytical. Speak in terms of runway and burn rate. Use Socratic questioning to challenge bad habits. Format cleanly with bullet points. NO licensed financial advice." 
      };

      const { history } = req.body;
      
      const messages = [
        systemMessage,
        ...history.map((m: any) => ({
          role: m.role === "ai" || m.role === "assistant" ? "assistant" as const : "user" as const,
          content: m.content || m.parts?.[0]?.text || ""
        }))
      ];

      // 5. Call Featherless API
      const response = await openai.chat.completions.create({
        model: "deepseek-ai/DeepSeek-V3.2",
        messages: messages
      });

      const aiMessage = response.choices[0]?.message?.content || "";

      res.json({ message: aiMessage, text: aiMessage });
    } catch (error: any) {
      console.error("Featherless API Error:", error);
      res.status(500).json({ error: "Failed to communicate with DeepSeek." });
    }
  });

  // 4.4 Arsenal API Routes
  app.get("/api/academy/progress", async (req, res) => {
    try {
      const { getUserProgress } = await import("./lib/actions/arsenal.actions");
      const progress = await getUserProgress(req);
      res.json(progress);
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  });

  app.post("/api/academy/complete", async (req, res) => {
    try {
      const { completeModule } = await import("./lib/actions/arsenal.actions");
      const { slug, score } = req.body;
      const result = await completeModule(req, slug, score);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  app.post("/api/arsenal/rate", async (req, res) => {
    try {
      const { rateTool } = await import("./lib/actions/arsenal.actions");
      const { toolId, voteType } = req.body;
      const result = await rateTool(req, toolId, voteType);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  app.get("/api/arsenal/tools/:slug", async (req, res) => {
    try {
      const { getToolBySlug } = await import("./lib/actions/arsenal.actions");
      const result = await getToolBySlug(req, req.params.slug);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  });

  app.get("/api/arsenal/tools", async (req, res) => {
    try {
      const { getTools } = await import("./lib/actions/arsenal.actions");
      const result = await getTools(req);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  // 5. Protection Middleware
  // This helps protect SPA routes if shared or direct access (limited in SPA mode)
  // but mostly useful for server-side logic protection.
  app.use(protectRoutes);

  // 5. Vite Middleware or Static Assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SpendSense Server running at http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
