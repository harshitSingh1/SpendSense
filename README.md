# SpendSense AI

A full-stack financial intelligence platform featuring Stocrates, the AI fiduciary coach.

## Tech Stack
- **Next.js / Node.js (Express)**
- **TypeScript**
- **Tailwind CSS**
- **Mongoose (MongoDB)**

## Core Features List
- **Dashboard with dynamic time-filters**: Accurately view and sort your financial trajectory.
- **AI Portfolio Architect (Boglehead Engine)**: Algorithmic investment recommendations.
- **Protection Page**: Includes the Stress Tester, Policy Auditor with Freemium blur, and the Claim Enforcer.
- **The Arsenal**: Features Sticky Segmented Toggles and custom gamification levels.
- **Persistent AI Coach Chat (Database-backed)**: A live Stocrates coaching interface featuring a 40-message rolling pruning window to optimize database costs and relevancy.

## Environment Variables Blueprint
Below is the required `.env.example` template:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.net/spendsense?retryWrites=true&w=majority
GEMINI_API_KEY=AIzaSy...
JWT_SECRET=your_jwt_secret_key
CRON_SECRET=your_secure_cron_secret
```
