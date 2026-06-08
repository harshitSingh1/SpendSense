<div align="center">
  <!-- Placeholder for Banner Image -->
  <img src="https://via.placeholder.com/1200x400/0f172a/10b981?text=SpendSense+AI+-+Financial+Intelligence+Engine" alt="SpendSense AI Banner" />

  <h1>SpendSense AI — Premium Financial Intelligence Platform.</h1>
  
  <p><strong>Move beyond passive budgeting. Engineer your wealth.</strong></p>

  <p>
    <a href="https://github.com/your-username/spendsense-ai/stargazers"><img src="https://img.shields.io/github/stars/your-username/spendsense-ai?style=for-the-badge&color=10b981" alt="Stars Badge"/></a>
    <a href="https://github.com/your-username/spendsense-ai/network/members"><img src="https://img.shields.io/github/forks/your-username/spendsense-ai?style=for-the-badge&color=8b5cf6" alt="Forks Badge"/></a>
    <a href="https://docs.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge"/></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js Badge"/></a>
    <a href="https://github.com/your-username/spendsense-ai/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&color=3b82f6" alt="License Badge"/></a>
  </p>
</div>

<br />

## ⚡ The Motive

Traditional budgeting apps are rear-view mirrors - they tell you what you did wrong *after* you've done it. 

**SpendSense AI** is a **Financial Intelligence Engine**. It shifts you from passive tracking into proactive, predictive wealth building. By merging institutional-grade artificial intelligence with community-driven "Jugaad" (optimization hacks), we help you keep more of what you earn, effortlessly.

Built on our **"Calm Intelligence" Design System** - featuring Deep Indigo backgrounds, Emerald Green growth accents, and sleek glassmorphism micro-interactions - SpendSense AI treats your personal finances with the gravity and elegance of a hedge fund terminal.

---

<details>
<summary><b>📖 Table of Contents</b></summary>

- [⚡ The Motive](#-the-motive)
- [✨ Core Architecture & Features](#-core-architecture--features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🔒 Security Architecture](#-security-architecture)
- [🚀 Getting Started](#-getting-started)
- [📂 Folder Structure](#-folder-structure)
- [📜 .env Configuration](#-env-configuration)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

</details>

---

## ✨ Core Architecture & Features

SpendSense AI is broken down into interconnected, high-leverage engines:

- 📊 **The Omni-Tracker:** A unified ledger that goes beyond generic charts. We categorize your cash flow into **Defensive Capital** (survival) and **Offensive Capital** (wealth generation).
- 🧭 **Interactive Dashboard Tour:** Seamless onboarding flow to get new users acquainted with their financial command center.
- 🎓 **Core Intelligence Academy:** Learn financial literacy through modular lessons and progress tracking.
- 🥷 **Tactical Tools Directory (The Arsenal):** A master guide of global financial hacks across Travel, Food, Cabs, and Cashback to help you leverage your spending.
- 🧠 **AI Portfolio Architect & Shield View:** Intelligently plan and architect your investments. Includes an **Insurance Gap** calculator, **Policy Scanner**, and **Claim Enforcer** to audit hidden clauses and enforce claims.
- 📈 **Wealth Visualizers & Simulators:** An array of interactive tools including **Black Swan Event Simulators**, **Compound Interest Visualizers**, and **Inflation Erosion Calculators**.
- 🎯 **Financial Goals Engine:** Systematically create, track, and fund your personalized savings and investment goals.
- 🎮 **Gamified Rank Dashboard:** Level up your finances and track your accomplishments with a progress-driven checkpoint system.
- 🤖 **Stocrates AI Coach:** AI-driven, context-aware coaching for your personalized financial strategy, remembering past context with a MongoDB-backed rolling chat window.
- 📬 **Dynamic Notification Inbox:** Real-time push alerts with a rolling window to keep you informed on budget limits and strategic opportunities.
- ⌘ **Omni-Command Palette:** Instantly navigate across all application modules, tools, and actions like a power user.
- 🌟 **Premium Experiences:** Seamless Pro-tier upgrade integration allowing users to checkout and unlock advanced institutional-grade analysis.

## 🛠️ Tech Stack

**Frontend:**
- **Next.js/React** - App framework and UI component architecture.
- **Tailwind CSS** - Utility-first styling (Calm Intelligence theme).

**Backend & Database:**
- **Node.js/Express** - Blazing fast API layer.
- **Mongoose/MongoDB** - Highly scalable document database.

**AI & Infrastructure:**
- **@google/genai SDK** - Official Google Gemini LLM API integration.

---

## 🔒 Security Architecture

Your financial data is your most critical asset. We treat it like a fortress.

1. **Brute-Force OTP Protection:** Custom dual-layer OTP verification system with inherent timeout penalties for failed attempts.
2. **Enterprise API Rate Limiting:** Global Express rate limiters utilizing caching to prevent DDoS attacks and endpoint scraping.
3. **Payload Sanitization:** Strict MongoDB injection blocking and cross-site scripting (XSS) neutralization on all incoming JSON payloads.

---

## 🚀 Getting Started

Follow these instructions to spin up the local development environment.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/spendsense-ai.git
cd spendsense-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure the Environment
Create a `.env` file in the root directory and securely populate your variables (see the `.env.example` section below).

### 4. Start the Application
```bash
npm run dev
```

Navigate to `http://localhost:3000` to view the application.

---

## 📂 Folder Structure

```
spendsense-ai/
├── src/
│   ├── components/      # React functional components
│   ├── middleware/      # Express middlewaes (Rate Limiters, Auth)
│   ├── types.ts         # Global TypeScript interfaces
│   └── App.tsx          # Main entry route for frontend
├── lib/
│   ├── actions/         # Route actions and data fetching logic
│   ├── models/          # Mongoose DB schema definitions
│   └── auth.ts          # Authentication logic
├── server.ts            # Node/Express backend and API routing
├── package.json         # Project dependencies
└── README.md            # You are here
```

---

## 📜 .env Configuration

Below is the required local `.env` example setup. **Never commit your actual `.env` file to version control.**

```env
# ==========================================
# 🛑 SPENDSENSE AI - ENVIRONMENT VARIABLES
# ==========================================

# 1. CORE ENVIRONMENT
NODE_ENV=development
PORT=3000

# 2. DATABASE (MongoDB)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/spendsense?retryWrites=true&w=majority

# 3. AI SDK (Google Gemini)
GEMINI_API_KEY=your_google_gemini_api_key

# 4. SECURE CRON AUTH
CRON_SECRET=your_super_secure_cron_secret
```

---

## 🤝 Contributing

We believe in the power of the open-source community to democratize financial intelligence.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<br />
<div align="center">
  <p>Built with 🧠 and ☕ by the SpendSense Team.</p>
</div>
