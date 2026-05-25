import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ override: true });

import { GoogleGenAI } from "@google/genai";
import { auth } from "./lib/auth";
import { protectRoutes } from "./lib/middleware";
import { requireUser } from "./lib/auth-utils";
import dbConnect from "./lib/mongodb";
import Transaction from "./lib/models/Transaction";

import { getDashboardMetrics } from "./lib/actions/dashboard.actions";
import { createGoal, getGoals, fundGoal, updateGoal, deleteGoal } from "./lib/actions/goal.actions";
import { getProtectionMetrics } from "./lib/actions/protection.actions";
import { saveCalendarNote } from "./lib/actions/calendar.actions";
import { generateAndSendOTP, verifyOTP } from "./lib/actions/auth.actions";
import { authenticateChatUser, chatRateLimiter } from "./src/middleware/chatRateLimiter";
import { otpRateLimiter } from "./src/middleware/otpRateLimiter";

let aiClient: GoogleGenAI | null = null;
function getAIClient() {
  if (!aiClient) {
    const rawKey = process.env.GEMINI_API_KEY || (process.env as any).VITE_GEMINI_API_KEY || (process.env as any).NEXT_PUBLIC_GEMINI_API_KEY;
    const apiKey = typeof rawKey === 'string' ? rawKey.trim().replace(/^["']|["']$/g, '') : undefined;
    
    if (!apiKey || apiKey.length < 20 || apiKey.includes('YOUR_API_KEY') || !apiKey.startsWith('AIza')) {
      throw new Error(`API_KEY_INVALID: Please configure a valid GEMINI_API_KEY in Settings. Current key is missing or invalid.`);
    }

    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

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
        return res.status(400).json({ error: error.message });
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

  // 3.1 CRON - Monthly Digest
  app.post("/api/cron/monthly-digest", async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      const secret = process.env.CRON_SECRET;
      
      if (!secret || authHeader !== `Bearer ${secret}`) {
        console.warn('⚠️ Unauthorized CRON attempt');
        return res.status(401).json({ error: "Unauthorized. Secure CRON secret required." });
      }

      await dbConnect();
      const User = (await import("./lib/models/User")).default;
      const Goal = (await import("./lib/models/Goal")).default;
      const { createNotification } = await import("./lib/actions/notification.actions");

      const allUsers = await User.find({}, '_id email');
      
      // Aggregate savings for ALL users in one go
      const savingsAggregation = await Goal.aggregate([
        { $group: { _id: '$userId', totalSavings: { $sum: '$currentAmount' } } }
      ]);
      
      const savingsMap = new Map(savingsAggregation.map(s => [s._id.toString(), s.totalSavings]));

      let count = 0;
      for (const user of allUsers) {
        const userId = user._id.toString();
        const totalSavings = savingsMap.get(userId) || 0;
        
        const message = `Your monthly financial debrief is ready. You have ₹${totalSavings.toLocaleString('en-IN')} protected in your Piggy Banks.`;
        
        await createNotification(userId, '📊 Monthly Digest', message, 'system');
        count++;
      }

      console.log(`✅ Monthly Digest CRON completed. Users processed: ${count}`);
      res.json({ status: 'ok', usersProcessed: count });
    } catch (error) {
      console.error('❌ Monthly Digest CRON Failed:', error);
      res.status(500).json({ error: (error as Error).message });
    }
  });

  // 3.2 CRON - Daily Market Brief for Pro Users
  app.post("/api/cron/market-brief", async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      const secret = process.env.CRON_SECRET;
      
      if (!secret || authHeader !== `Bearer ${secret}`) {
        console.warn('⚠️ Unauthorized CRON attempt (Market Brief)');
        return res.status(401).json({ error: "Unauthorized CRON execution." });
      }

      let aiInsight = "The market rewards patience and consistent strategy over time.";
      
      if (process.env.GEMINI_API_KEY) {
        const aiClient = getAIClient();
        const prompt = "Generate a short, generic daily financial wisdom quote or market brief (max 2 sentences).";
        
        const response = await aiClient.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
        });
        
        if (response && response.text) {
          aiInsight = response.text.trim();
        }
      }

      await dbConnect();
      const User = (await import("./lib/models/User")).default;
      const NotificationModel = (await import("./lib/models/Notification")).default;

      const now = new Date();
      const proUsers = await User.find({
        $or: [
          { isPro: true },
          { proExpiresAt: { $gt: now } }
        ]
      }, '_id');

      if (proUsers.length > 0) {
        const insertDocs = proUsers.map(user => ({
          userId: user._id,
          title: '📈 Daily Market Brief',
          message: aiInsight,
          type: 'system',
          isRead: false,
          createdAt: new Date(),
        }));
        await NotificationModel.insertMany(insertDocs);
      }

      console.log(`✅ Daily Market Brief sent to ${proUsers.length} Pro users.`);
      res.json({ success: true, count: proUsers.length, insight: aiInsight });
    } catch (error: any) {
      console.error('❌ Daily Market Brief CRON Failed:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // 4.5 Notifications API Routes
  app.get("/api/notifications", async (req, res) => {
    try {
      console.log('📬 GET /api/notifications called');
      const user = await requireUser(req);
      await dbConnect();
      const NotificationModel = (await import("./lib/models/Notification")).default;
      
      const userId = (user as any).id || (user as any)._id;
      console.log('📬 Fetching notifications for user:', userId);
      
      const notifications = await NotificationModel.find({ userId })
        .sort({ createdAt: -1 })
        .limit(20);
        
      res.json(notifications);
    } catch (error) {
      console.error('❌ Notification GET Error:', error);
      res.status(401).json({ error: (error as Error).message });
    }
  });

  app.patch("/api/notifications", async (req, res) => {
    try {
      const user = await requireUser(req);
      await dbConnect();
      const NotificationModel = (await import("./lib/models/Notification")).default;
      
      const userId = (user as any).id || (user as any)._id;
      const { notificationIds, markAll } = req.body;
      
      if (markAll) {
        await NotificationModel.updateMany({ userId, isRead: false }, { isRead: true });
      } else if (Array.isArray(notificationIds)) {
        await NotificationModel.updateMany(
          { _id: { $in: notificationIds }, userId }, 
          { isRead: true }
        );
      } else {
        return res.status(400).json({ error: "Invalid request parameters." });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  });

  // 4. Transaction API Routes
  app.get("/api/transactions", async (req, res) => {
    try {
      const user = await requireUser(req);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 1000;
      
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
    } catch (error: any) {
      if (error.code === 'limit_reached') {
        res.status(400).json({ error: 'limit_reached', message: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
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

  app.put("/api/goals/:id", async (req, res) => {
    try {
      const goal = await updateGoal(req);
      res.json(goal);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  app.delete("/api/goals/:id", async (req, res) => {
    try {
      const result = await deleteGoal(req);
      res.json(result);
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

  app.post("/api/protection/scan", async (req, res) => {
    try {
      const user = await requireUser(req);
      await dbConnect();
      const User = (await import("./lib/models/User")).default;
      
      const targetId = (user as any).id || (user as any)._id || (user as any).userId;
      const dbUser = await User.findById(targetId);

      const isUserPro = dbUser?.isPro || (dbUser?.proExpiresAt && new Date(dbUser.proExpiresAt) > new Date());


      const { policyText, policyType } = req.body;

      if (!policyText || !policyType) {
        return res.status(400).json({ error: "Missing required parameters." });
      }

      const prompt = `Act as a ruthless insurance auditor. Analyze this ${policyType} policy text. CRITICAL INSTRUCTIONS: Do not summarize the policy. Identify ONLY the top 3 to 5 most dangerous hidden clauses, sub-limits, or denied-claim loopholes. Format with Red Flags (Danger) and Green Flags (Good). Keep the explanation for each flag under two sentences. Be brutal and concise.

Policy Text: ${policyText}`;

      const response = await getAIClient().models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      if (!response || !response.text) {
        throw new Error("Empty response from AI model.");
      }

      res.json({ analysis: response.text });
    } catch (error: any) {
      console.error("❌ Policy Scan Error:", error);
      const isApiKeyError = error.message?.includes("API key not valid") || 
                           error.message?.includes("API_KEY_INVALID") ||
                           JSON.stringify(error).includes("API_KEY_INVALID");
      
      if (isApiKeyError) {
        return res.status(401).json({ error: "API key is invalid. Please configure a valid GEMINI_API_KEY." });
      }
      res.status(500).json({ error: error.message || String(error) || "Failed to scan policy." });
    }
  });

  app.post("/api/protection/enforce", async (req, res) => {
    try {
      const user = await requireUser(req);
      await dbConnect();
      const User = (await import("./lib/models/User")).default;
      
      const targetId = (user as any).id || (user as any)._id || (user as any).userId;
      const dbUser = await User.findById(targetId);

      const isUserPro = dbUser?.isPro || (dbUser?.proExpiresAt && new Date(dbUser.proExpiresAt) > new Date());
      
      if (!isUserPro) {
        return res.status(403).json({ error: "Claim Enforcer is strictly reserved for SpendSense Pro members." });
      }

      const { claimAmount, rejectionLetter } = req.body;

      if (!claimAmount || !rejectionLetter) {
        return res.status(400).json({ error: "Missing required parameters." });
      }

      const prompt = `Act as a fierce insurance regulatory lawyer in India. Analyze this rejection letter for a claim amount of ₹${claimAmount}: 
      
      ${rejectionLetter}
      
      Draft a formal, highly assertive Grievance Redressal email to the Insurance Nodal Officer demanding the claim be honored. Cite IRDAI guidelines where applicable. Tone: Professional but threatening legal action. Make it ready to be copied and pasted in an email body.`;

      const response = await getAIClient().models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      if (!response || !response.text) {
        throw new Error("Empty response from AI model.");
      }

      res.json({ response: response.text });
    } catch (error: any) {
      console.error("❌ Claim Enforcer Error:", error);
      const isApiKeyError = error.message?.includes("API key not valid") || 
                           error.message?.includes("API_KEY_INVALID") ||
                           JSON.stringify(error).includes("API_KEY_INVALID");
      
      if (isApiKeyError) {
        return res.status(401).json({ error: "API key is invalid. Please configure a valid GEMINI_API_KEY." });
      }
      res.status(500).json({ error: error.message || String(error) || "Failed to draft grievance." });
    }
  });

  app.post("/api/tax/optimize", async (req, res) => {
    try {
      const user = await requireUser(req);
      await dbConnect();
      const User = (await import("./lib/models/User")).default;
      
      const targetId = (user as any).id || (user as any)._id || (user as any).userId;
      const dbUser = await User.findById(targetId);

      const isUserPro = dbUser?.isPro || (dbUser?.proExpiresAt && new Date(dbUser.proExpiresAt) > new Date());
      
      if (!isUserPro) {
        return res.status(403).json({ error: "Tax Optimizer is strictly reserved for SpendSense Pro members." });
      }

      const { ctc, basic, hra, eightyC } = req.body;

      if (!ctc || !basic || !hra || !eightyC) {
        return res.status(400).json({ error: "Missing required parameters." });
      }

      const prompt = `Act as a Chartered Accountant in India. Based on CTC: ₹${ctc}, Basic: ₹${basic}, HRA: ₹${hra}, and 80C: ₹${eightyC}. Calculate the most efficient tax regime (Old vs New). Suggest specific salary restructuring (e.g., adding Food Coupons, LTA, NPS under 80CCD(1B)) to legally minimize taxes. Format in Markdown. Highlight the 'Estimated Tax Saved (₹)' exactly like that in the response to emphasize it. Use bold styling for amounts where it makes sense to draw attention to savings.`;

      const response = await getAIClient().models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      if (!response || !response.text) {
        throw new Error("Empty response from AI model.");
      }

      res.json({ response: response.text });
    } catch (error: any) {
      console.error("❌ Tax Optimizer Error:", error);
      const isApiKeyError = error.message?.includes("API key not valid") || 
                           error.message?.includes("API_KEY_INVALID") ||
                           JSON.stringify(error).includes("API_KEY_INVALID");
      
      if (isApiKeyError) {
        return res.status(401).json({ error: "API key is invalid. Please configure a valid GEMINI_API_KEY." });
      }
      res.status(500).json({ error: error.message || String(error) || "Failed to optimize taxes." });
    }
  });

  app.get("/api/user/status", async (req, res) => {
    try {
      const user = await requireUser(req);
      await dbConnect();
      const User = (await import("./lib/models/User")).default;
      const targetId = (user as any).id || (user as any)._id || (user as any).userId;
      const dbUser = await User.findById(targetId);
      res.json({
        isPro: dbUser?.isPro || false,
        promptCountToday: 0 // Assume 0 if not tracked persistently yet
      });
    } catch (error) {
      res.status(401).json({ error: "Unauthorized" });
    }
  });

  app.post("/api/wealth/generate", async (req, res) => {
    console.log('🚀 WEALTH ROUTE HIT by User:', (req as any).user?.id);
    try {
      const user = await requireUser(req);
      await dbConnect();
      const User = (await import("./lib/models/User")).default;
      
      const targetId = (user as any).id || (user as any)._id || (user as any).userId;
      const dbUser = await User.findById(targetId);

      console.log('🔑 DB Lookup for ID:', targetId); 
      console.log('👤 DB User Found:', dbUser ? dbUser.isPro : 'USER IS NULL');

      const isUserPro = dbUser?.isPro || (dbUser?.proExpiresAt && new Date(dbUser.proExpiresAt) > new Date());
      if (!isUserPro) {
        return res.status(400).json({ error: "Portfolio generation is highly guarded and strictly reserved for SpendSense Pro members." });
      }

      const { age, monthlyAmount, riskTolerance, primaryGoal } = req.body;

      if (!age || !monthlyAmount || !riskTolerance || !primaryGoal) {
        return res.status(400).json({ error: "Missing required parameters." });
      }

      const prompt = `Act as a fiduciary financial advisor. Based on Age ${age}, a monthly investment of ₹${monthlyAmount}, Risk Tolerance: ${riskTolerance}, and Primary Goal: ${primaryGoal}, output a recommended Boglehead-style ETF portfolio allocation. CRITICAL INSTRUCTIONS: Keep the entire response under 250 words. Do not write introductory or concluding paragraphs. Use a strict, highly scannable bullet-point format. Prioritize mathematical clarity over conversational fluff.`;

      let recommendation = "";
      try {
        const featherlessUrl = process.env.FEATHERLESS_BASE_URL || 'https://api.featherless.ai/v1';
        const featherlessKey = process.env.FEATHERLESS_API_KEY;
        
        if (!featherlessKey) {
          throw new Error("FEATHERLESS_API_KEY not configured");
        }

        const fRes = await fetch(`${featherlessUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${featherlessKey}`
          },
          body: JSON.stringify({
            model: "meta-llama/Meta-Llama-3-8B-Instruct",
            messages: [{ role: "user", content: prompt }]
          })
        });

        if (!fRes.ok) {
           const errText = await fRes.text();
           throw new Error(`Featherless API Error: ${fRes.status} ${errText}`);
        }
        
        const data = await fRes.json();
        if (!data.choices?.[0]?.message?.content) {
            throw new Error("Empty response from Featherless");
        }
        recommendation = data.choices[0].message.content;
        console.log('🚀 AI Generation completed successfully via FEATHERLESS PRO.');
      } catch (error: any) {
        console.warn('⚠️ FEATHERLESS ERROR, falling back to Gemini:', error.message || error);
        
        const result = await getAIClient().models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt
        });

        if (!result || !result.text) {
          throw new Error("AI failed to generate a plan. Please try again.");
        }
        recommendation = result.text;
        console.log('🔄 Fallback triggered: AI Generation completed via GOOGLE GEMINI SDK.');
      }

      res.json({ recommendation });
    } catch (error: any) {
      console.error('❌ Wealth Genesis Error:', error);
      const isApiKeyError = error.message?.includes("API key not valid") || 
                           error.message?.includes("API_KEY_INVALID") ||
                           JSON.stringify(error).includes("API_KEY_INVALID");

      if (isApiKeyError) {
        return res.status(401).json({ error: "API key is invalid. Please configure a valid GEMINI_API_KEY." });
      }
      res.status(500).json({ error: error.message || String(error) || "Genesis failed." });
    }
  });

  // 4.3 AI Chat Route & History
  app.get("/api/chat/history", authenticateChatUser, async (req, res) => {
    try {
      const user = (req as any).user;
      await dbConnect();
      const ChatMessage = (await import("./lib/models/ChatMessage")).default;
      
      const messages = await ChatMessage.find({ userId: user.id })
        .sort({ createdAt: 1 })
        .limit(40);
        
      res.json({ history: messages });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch history" });
    }
  });

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
      const prompt = history[history.length - 1].content;
      
      await dbConnect();
      const ChatMessage = (await import("./lib/models/ChatMessage")).default;
      
      // Save User Message
      await ChatMessage.create({ userId: user.id, role: 'user', content: prompt });

      const messages = [
        systemMessage,
        ...history.map((m: any) => ({
          role: m.role === "ai" || m.role === "assistant" || m.role === "model" ? "assistant" as const : "user" as const,
          content: m.content || m.parts?.[0]?.text || ""
        }))
      ];

      // 5. Call AI APIs
      let outputText = "";
      try {
        const featherlessUrl = process.env.FEATHERLESS_BASE_URL || 'https://api.featherless.ai/v1';
        const featherlessKey = process.env.FEATHERLESS_API_KEY;
        
        if (!featherlessKey) {
          throw new Error("FEATHERLESS_API_KEY not configured");
        }

        const oaiMessages = [
          { role: "system", content: systemMessage.content },
          ...history.map((m: any) => ({
            role: m.role === "ai" || m.role === "assistant" || m.role === "model" ? "assistant" : "user",
            content: m.content || m.parts?.[0]?.text || ""
          }))
        ];

        const fRes = await fetch(`${featherlessUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${featherlessKey}`
          },
          body: JSON.stringify({
            model: "meta-llama/Meta-Llama-3-8B-Instruct",
            messages: oaiMessages
          })
        });

        if (!fRes.ok) {
           const errText = await fRes.text();
           throw new Error(`Featherless API Error: ${fRes.status} ${errText}`);
        }
        
        const data = await fRes.json();
        if (!data.choices?.[0]?.message?.content) {
            throw new Error("Empty response from Featherless");
        }
        outputText = data.choices[0].message.content;
        console.log('🚀 AI Generation completed successfully via FEATHERLESS PRO.');
      } catch (error: any) {
        console.warn('⚠️ FEATHERLESS ERROR, falling back to Gemini:', error.message || error);
        try {
          const geminiMessages = history.map((m: any) => ({
            role: m.role === "ai" || m.role === "assistant" || m.role === "model" ? "model" : "user",
            parts: [{ text: m.content || m.parts?.[0]?.text || "" }]
          }));
          
          const response = await getAIClient().models.generateContent({
            model: "gemini-2.5-flash",
            contents: geminiMessages,
            config: { systemInstruction: systemMessage.content }
          });

          if (!response || !response.text) {
            throw new Error("No response from AI assistant.");
          }

          outputText = response.text || "";
          console.log('🔄 Fallback triggered: AI Generation completed via GOOGLE GEMINI SDK.');
        } catch (e: any) {
          console.error("❌ Chat Gemini Error:", e);
          const isApiKeyError = e.message?.includes("API key not valid") || 
                               e.message?.includes("API_KEY_INVALID") ||
                               JSON.stringify(e).includes("API_KEY_INVALID");
                               
          if (isApiKeyError) {
            return res.status(401).json({ error: "API key is invalid. Please configure a valid GEMINI_API_KEY." });
          }
          return res.status(500).json({ error: e.message || String(e) || "Chat processing failed" });
        }
      }

      // Save AI Message
      await ChatMessage.create({ userId: user.id, role: 'model', content: outputText });

      // Auto-pruning hook
      const messageCount = await ChatMessage.countDocuments({ userId: user.id });
      if (messageCount > 40) {
        const messagesToKeep = await ChatMessage.find({ userId: user.id }).sort({ createdAt: -1 }).limit(40).select('_id');
        const keepIds = messagesToKeep.map((m: any) => m._id);
        await ChatMessage.deleteMany({ userId: user.id, _id: { $nin: keepIds } });
      }

      res.json({ message: outputText, text: outputText });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to communicate with AI." });
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

  app.post("/api/admin/broadcast", async (req, res) => {
    try {
      const user = await requireUser(req);
      const adminEmails = process.env.VITE_ADMIN_EMAILS?.split(',') || [];
      if (!adminEmails.includes(user.email)) {
        return res.status(403).json({ error: "Unauthorized. Admin access required." });
      }

      const { title, message, type = 'global' } = req.body;
      if (!title || !message) {
        return res.status(400).json({ error: "Title and message are required." });
      }

      const { broadcastNotification } = await import("./lib/actions/notification.actions");
      const result = await broadcastNotification(title, message, type);
      
      if (result.success) {
        res.json({ success: true, count: result.count });
      } else {
        res.status(500).json({ error: result.error });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  app.post("/api/checkout/redeem", async (req, res) => {
    try {
      const user = await requireUser(req);
      await dbConnect();
      
      const { Coupon } = await import("./lib/models/Coupon");
      const User = (await import("./lib/models/User")).default;
      
      const { code } = req.body;
      if (!code) {
        return res.status(400).json({ error: "Coupon code is required" });
      }

      const couponCode = code.trim().toUpperCase();
      const coupon = await Coupon.findOne({ code: couponCode });
      
      if (!coupon) {
        return res.status(404).json({ error: "Coupon not found" });
      }

      if (!coupon.isActive) {
        return res.status(400).json({ error: "Coupon is deactivated" });
      }

      if (coupon.expiresAt && new Date() > coupon.expiresAt) {
        return res.status(400).json({ error: "Coupon has expired" });
      }

      if (coupon.currentUses >= coupon.maxUses) {
        return res.status(400).json({ error: "Coupon limit reached" });
      }

      // Atomic Update
      const updatedCoupon = await Coupon.findOneAndUpdate(
        { 
          _id: coupon._id, 
          currentUses: { $lt: coupon.maxUses }, 
          isActive: true 
        },
        { 
          $inc: { currentUses: 1 } 
        },
        { new: true }
      );

      if (!updatedCoupon) {
        return res.status(400).json({ error: "Coupon limit reached" });
      }

      const durationMonths = updatedCoupon.durationMonths;
      const newExpirationDate = new Date();
      newExpirationDate.setMonth(newExpirationDate.getMonth() + durationMonths);

      const planName = durationMonths === 12 ? '1 Year' : `${durationMonths} Month${durationMonths > 1 ? 's' : ''}`;

      const targetId = (user as any).id || (user as any)._id || (user as any).userId;
      
      const updatedUser = await User.findByIdAndUpdate(targetId, {
        $set: {
          isPro: true,
          plan: 'pro',
          proExpiresAt: newExpirationDate
        }
      }, { new: true });

      console.log('✅ Coupon Redeemed! User isPro set to:', updatedUser?.isPro);

      const { createNotification } = await import("./lib/actions/notification.actions");
      await createNotification(targetId, '✨ Pro Unlocked!', 'Welcome to SpendSense Pro. Your limits have been removed.', 'billing');

      res.json({ success: true, proExpiresAt: newExpirationDate, durationMonths });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  // Admin APIs
  app.get("/api/admin/data", async (req, res) => {
    try {
      const { getAdminData } = await import("./lib/actions/admin.actions");
      const data = await getAdminData(req);
      res.json(data);
    } catch (error) {
      if ((error as Error).message.includes("Unauthorized")) {
        return res.status(400).json({ error: (error as Error).message });
      }
      res.status(400).json({ error: (error as Error).message });
    }
  });

  app.post("/api/admin/coupons", async (req, res) => {
    try {
      const { createCoupon } = await import("./lib/actions/admin.actions");
      const coupon = await createCoupon(req, req.body);
      res.status(201).json(coupon);
    } catch (error) {
      if ((error as Error).message.includes("Unauthorized")) {
        return res.status(400).json({ error: (error as Error).message });
      }
      res.status(400).json({ error: (error as Error).message });
    }
  });

  app.put("/api/admin/coupons/:id", async (req, res) => {
    try {
      const { toggleCouponStatus } = await import("./lib/actions/admin.actions");
      const coupon = await toggleCouponStatus(req, req.params.id, req.body.isActive);
      res.json(coupon);
    } catch (error) {
      if ((error as Error).message.includes("Unauthorized")) {
        return res.status(400).json({ error: (error as Error).message });
      }
      res.status(400).json({ error: (error as Error).message });
    }
  });

  app.put("/api/user/profile", async (req, res) => {
    try {
      const { updateUserProfile } = await import("./lib/actions/user.actions");
      const user = await updateUserProfile(req, req.body);
      res.json(user);
    } catch (error) {
      if ((error as Error).message.includes("Unauthorized")) {
        return res.status(401).json({ error: (error as Error).message });
      }
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
