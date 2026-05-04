<div align="center">
  <!-- Placeholder for Banner Image -->
  <img src="https://via.placeholder.com/1200x400/0f172a/10b981?text=SpendSense+AI+-+Financial+Intelligence+Engine" alt="SpendSense AI Banner" />

  <h1>SpendSense AI</h1>
  
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

Built on our **"Calm Intelligence" Design System** - featuring Deep Indigo backgrounds, Emerald Green growth accents, and Framer Motion for sleek glassmorphism micro-interactions - SpendSense AI treats your personal finances with the gravity and elegance of a hedge fund terminal.

---

<details>
<summary><b>📖 Table of Contents</b></summary>

- [⚡ The Motive](#-the-motive)
- [✨ Core Architecture & Features](#-core-architecture--features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🔒 Security Architecture](#-security-architecture)
- [🚀 Getting Started](#-getting-started)
- [📜 .env Configuration](#-env-configuration)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

</details>

---

## ✨ Core Architecture & Features

SpendSense AI is broken down into interconnected, high-leverage engines:

- 📊 **The Omni-Tracker:** A unified ledger that goes beyond generic charts. We categorize your cash flow into **Defensive Capital** (survival) and **Offensive Capital** (wealth generation).
- 🎯 **Gamified Piggy Banks:** Goal-based saving mechanics featuring visual progress rings, escrow visualizations, and compounding timelines.
- ⚙️ **The Wealth Engine:** An interactive financial simulator charting the silent, corrosive tax of inflation directly against the exponential power of algorithmic compound interest.
- 🛡️ **The Resilience Engine:** 
  - *Black Swan Simulator:* Stress-test your current liquidity against sudden job loss or critical medical emergencies.
  - *AI Policy Auditor:* Upload your insurance PDFs, and our LLM syndicate will scan the fine print for hidden loopholes and claim-denial clauses.
- 🥷 **The Arsenal (Leverage Hub):** A flattened, densely-packed "Master Guide" of global financial hacks across Travel, Food, Cabs, and Cashback. Features a **10-Tier Gamified Progression System** (from *Iron Novice* to *Celestial CFO*). Earn "Financial IQ" points by voting on the community's best arbitrage tools.
- 🤖 **Stocrates (AI CFO):** Our proprietary AI Chief Financial Officer. Powered by a syndicate of premium LLMs, Stocrates analyzes your data to provide personalized, proactive financial interventions before you make a mistake.
- 🌍 **Global PPP Monetization:** Seamlessly integrated with **Lemon Squeezy** as the Merchant of Record (MoR), enabling absolute Purchasing Power Parity (PPP) tiered subscriptions for equal accessibility across the US, India, and beyond.

## 🛠️ Tech Stack

**Frontend:**
- **Next.js (App Router)** - React framework for SSR and routing.
- **React 18** - UI component architecture.
- **Tailwind CSS** - Utility-first styling (Calm Intelligence theme).
- **Framer Motion** - Premium, fluid UI micro-interactions.
- **Recharts** - Dynamic data visualization.

**Backend & Database:**
- **Node.js & Express.js** - Blazing fast API layer.
- **Server Actions** - Next.js native data mutations.
- **MongoDB & Mongoose** - Highly scalable document database.

**Infrastructure & Payments:**
- **Auth.js** - Robust authentication.
- **Lemon Squeezy** - Global Merchant of Record (Tax & Subscriptions).
- **LLM Syndicate** - OpenAI / Anthropic / Google Gemini APIs.

---

## 🔒 Security Architecture

Your financial data is your most critical asset. We treat it like a fortress.

1. **Brute-Force OTP Protection:** Custom dual-layer OTP verification system with inherent timeout penalties for failed attempts.
2. **Enterprise API Rate Limiting:** Global Express rate limiters utilizing Redis memory caching to prevent DDoS attacks and endpoint scraping.
3. **Payload Sanitization:** Strict MongoDB injection blocking and cross-site scripting (XSS) neutralization on all incoming JSON payloads.
4. **Secure Webhook Listeners:** Cryptographically hashed payload verification from Lemon Squeezy to prevent subscription spoofing.

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
# or
yarn install
```

### 3. Configure the Environment
Create a `.env` file in the root directory and securely populate your API keys (see the template below).

### 4. Seed the Database (Optional but recommended)
```bash
npm run seed
```

### 5. Start the Development Server
```bash
npm run dev
```

Navigate to `http://localhost:3000` to view the application.

---

## 📜 .env Configuration

Below is the required `.env.example` structure. **Never commit your actual `.env` file to version control.**

```env
# ==========================================
# 🛑 SPENDSENSE AI - ENVIRONMENT VARIABLES
# ==========================================

# 1. CORE ENVIRONMENT
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# 2. DATABASE (MongoDB)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/spendsense?retryWrites=true&w=majority

# 3. AUTHENTICATION (Auth.js)
AUTH_SECRET=your_super_secure_randomly_generated_auth_secret_string

# 4. LEMON SQUEEZY (Payments & Subscriptions)
LEMON_SQUEEZY_API_KEY=your_lemon_squeezy_api_key
LEMON_SQUEEZY_WEBHOOK_SECRET=your_secure_webhook_signing_secret
LEMON_SQUEEZY_STORE_ID=your_store_id

# 5. AI SYNDICATE (LLM API Keys)
OPENAI_API_KEY=sk-your_openai_api_key
GEMINI_API_KEY=your_google_gemini_api_key

# 6. ENCRYPTION & SECURITY
# Used for custom Dual-Layer OTP and data encryption
ENCRYPTION_KEY=32_byte_aes_256_encryption_key
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
