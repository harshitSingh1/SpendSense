import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  ShieldCheck, 
  BrainCircuit, 
  TrendingUp, 
  ChevronRight,
  TrendingDown,
  ListPlus,
  History,
  XCircle,
  CheckCircle2,
  Wallet,
  Sparkles,
  Lock,
  Users,
  Brain,
  PieChart,
  LineChart,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./ui/Logo";

interface LandingPageProps {
  onGetStarted: () => void;
  onViewPricing?: () => void;
  onViewTerms?: () => void;
  onViewPrivacy?: () => void;
  onViewContact?: () => void;
  user?: any;
}

function TheFinancialTrap() {
  return (
    <section className="container mx-auto px-6 max-w-6xl py-12 relative z-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">The Financial Illiteracy Trap</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium max-w-2xl mx-auto">Without a system, your money sits idle, loses value to inflation, and leaves you vulnerable to emergencies.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 p-6 rounded-2xl w-full text-left">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">The Problem: Blind Spending</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">You track expenses after the money is gone. You do not know where your cash leaks are.</p>
        </div>
        <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 p-6 rounded-2xl w-full text-left">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">The Problem: Hidden Inflation</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Your savings account pays 3 percent, but living costs rise by 7 percent. You are secretly losing purchasing power every single day.</p>
        </div>
        <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 p-6 rounded-2xl w-full text-left">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">The Problem: Insurance Traps</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">You pay premiums for years, only to get claims rejected due to fine print you never understood.</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-900 to-emerald-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 w-full shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="relative z-10 text-left md:max-w-2xl">
          <p className="text-xl font-bold leading-tight">SpendSense AI fixes this. We translate complex financial rules into automated, everyday actions.</p>
        </div>
        <Button className="relative z-10 bg-white text-indigo-900 hover:bg-slate-100 font-bold px-8 rounded-full h-12 w-full md:w-auto shrink-0 transition-transform hover:scale-105">
          See How It Works
        </Button>
      </div>
    </section>
  );
}

function YourBlueprintToWealth() {
  return (
    <section className="container mx-auto px-6 max-w-6xl py-20 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">Your Blueprint to Wealth</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg max-w-2xl mx-auto">This is how we engineer your financial independence, step by step.</p>
      </div>

      <div className="flex flex-col gap-20">
        {/* Step 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold text-xl mb-6">1</div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Track: The Omni-Tracker</h3>
            <p className="text-slate-900 dark:text-slate-300 font-bold mb-2">Why you need it:</p>
            <p className="text-slate-600 dark:text-slate-400 mb-6">You cannot grow what you do not measure.</p>
            <p className="text-slate-900 dark:text-slate-300 font-bold mb-2">How to use it:</p>
            <p className="text-slate-600 dark:text-slate-400">Connect your accounts or log cashflows. The AI automatically separates your money into Defensive Capital (for survival) and Offensive Capital (for investing).</p>
          </div>
          <div className="order-1 md:order-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-3xl h-64 flex items-center justify-center text-slate-400 relative overflow-hidden">
            <PieChart className="w-16 h-16 opacity-50 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-3xl h-64 flex items-center justify-center text-slate-400 relative overflow-hidden">
            <ShieldCheck className="w-16 h-16 opacity-50 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/5 to-transparent pointer-events-none"></div>
          </div>
          <div className="text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold text-xl mb-6">2</div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Protect: The Policy Auditor</h3>
            <p className="text-slate-900 dark:text-slate-300 font-bold mb-2">Why you need it:</p>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Medical emergencies wipe out unprotected wealth.</p>
            <p className="text-slate-900 dark:text-slate-300 font-bold mb-2">How to use it:</p>
            <p className="text-slate-600 dark:text-slate-400">Upload your insurance PDF. Our AI instantly highlights dangerous hidden clauses so you are never caught off guard.</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="order-2 md:order-1 text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 font-bold text-xl mb-6">3</div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Grow: AI Architect</h3>
            <p className="text-slate-900 dark:text-slate-300 font-bold mb-2">Why you need it:</p>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Investing is intimidating for beginners.</p>
            <p className="text-slate-900 dark:text-slate-300 font-bold mb-2">How to use it:</p>
            <p className="text-slate-600 dark:text-slate-400">Chat with Stocrates, our AI CFO. Ask it how to allocate your monthly savings, and it will build a custom, risk-adjusted portfolio for you.</p>
          </div>
          <div className="order-1 md:order-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-3xl h-64 flex items-center justify-center text-slate-400 relative overflow-hidden">
             <LineChart className="w-16 h-16 opacity-50 relative z-10" />
             <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-3xl h-64 flex items-center justify-center text-slate-400 relative overflow-hidden">
            <BookOpen className="w-16 h-16 opacity-50 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/5 to-transparent pointer-events-none"></div>
          </div>
          <div className="text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-xl mb-6">4</div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Learn: Core Intelligence</h3>
            <p className="text-slate-900 dark:text-slate-300 font-bold mb-2">Why you need it:</p>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Financial education is the ultimate wealth multiplier.</p>
            <p className="text-slate-900 dark:text-slate-300 font-bold mb-2">How to use it:</p>
            <p className="text-slate-600 dark:text-slate-400">Spend 10 minutes a day in our Academy reading simple, jargon-free courses on taxes and inflation to level up your mindset.</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default function LandingPage({ onGetStarted, onViewPricing, onViewTerms, onViewPrivacy, onViewContact, user }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState<'track' | 'protect' | 'grow'>('track');

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-emerald-500/30 selection:text-emerald-900 overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl shrink-0 h-16">
        <div className="container mx-auto max-w-7xl flex h-full items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-xl font-sonsie tracking-normal bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 dark:from-violet-400 dark:via-blue-400 dark:to-emerald-400">SpendSense</span>
          </div>
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 dark:text-slate-400"
          >
            <a href="#features" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Features</a>
            <button onClick={onViewPricing} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors outline-none cursor-pointer">Pricing</button>
          </motion.nav>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button variant="ghost" size="sm" onClick={onGetStarted} className="md:flex gap-2 font-bold hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400">
              {user ? "Dashboard" : "Sign In"} <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* 1. The Hero Section */}
        <section className="relative overflow-hidden bg-slate-50 dark:bg-[#0B0F19]">
          <div className="container mx-auto px-6 max-w-7xl relative z-10 grid lg:grid-cols-2 gap-8 items-center pt-12 pb-8">
            {/* Left Column (The Hook) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              className="flex flex-col items-start text-left w-full"
            >
              <motion.div 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6 border border-indigo-100 dark:border-indigo-800/30"
              >
                 <Sparkles className="h-3 w-3" />
                 AI-Powered Financial Intelligence
              </motion.div>

              <motion.h1 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
                }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight"
              >
                <div className="block">Move Beyond <br /> Passive Budgeting.</div>
                <div className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-400">
                  Engineer Your Wealth.
                </div>
              </motion.h1>
              
              <motion.p 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
                }}
                className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-xl mb-8 leading-relaxed"
              >
                Most people lose money to inflation and hidden fees because they lack financial literacy. SpendSense AI is your proactive engine. Get predictive insights and AI guidance to build wealth effortlessly.
              </motion.p>
              
              <motion.div 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
                }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10 text-left"
              >
                <Button 
                  size="lg" 
                  className="group h-14 px-8 w-full sm:w-auto rounded-full text-lg font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-all hover:scale-105 shadow-[0_0_40px_-10px_#10b981]" 
                  onClick={onGetStarted}
                >
                  Get Started Free 
                  <motion.div
                    className="inline-block ml-2 group-hover:translate-x-1 transition-transform"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-8 w-full sm:w-auto rounded-full text-lg font-bold border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" 
                  onClick={() => {
                    const featuresSection = document.getElementById('features');
                    if (featuresSection) featuresSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore Features
                </Button>
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
                }}
                className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-500 dark:text-slate-400"
              >
                 <div className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Bank-Grade Security</div>
                 <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Trusted by 10K+ Users</div>
                 <div className="flex items-center gap-1.5"><Brain className="w-4 h-4 text-slate-400 dark:text-slate-500" /> AI-Powered Insights</div>
              </motion.div>
            </motion.div>

            {/* Right Column (The Floating UI Mockup) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative h-[450px] w-full hidden lg:block"
            >
               {/* Card 2: Center, Large (Net Worth) */}
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.6, duration: 0.8 }}
                 className="absolute inset-x-8 top-16 bottom-16 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] rounded-2xl p-6 flex flex-col"
               >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Net Worth</h3>
                      <p className="text-3xl font-mono font-bold text-slate-900 dark:text-white mt-1">$142,500.00</p>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-xs font-bold">
                      <TrendingUp className="w-3 h-3" /> +12.5%
                    </div>
                  </div>
                  <div className="flex-1 relative w-full mt-2">
                    <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t from-emerald-500/20 to-transparent"></div>
                    <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,100 C20,80 40,90 60,50 C80,10 90,30 100,20 L100,100 Z" fill="currentColor" className="text-emerald-500/20 dark:text-emerald-500/10" />
                      <path d="M0,100 C20,80 40,90 60,50 C80,10 90,30 100,20" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-500" />
                    </svg>
                  </div>
               </motion.div>

               {/* Card 1: Top Right (Subscription Leak) */}
               <motion.div 
                 initial={{ y: -20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                 className="absolute -right-4 top-4 z-20 w-64 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_20px_40px_-15px_rgba(239,68,68,0.2)] rounded-2xl p-4 flex items-start gap-4"
               >
                 <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                   <TrendingDown className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-sm font-bold text-slate-900 dark:text-white">Subscription Leak</p>
                   <p className="text-xs text-slate-500 leading-tight mt-1">You are paying for 3 streaming services you haven't used in 90 days.</p>
                   <button className="text-xs font-bold text-red-500 mt-2 hover:underline">Cancel Now</button>
                 </div>
               </motion.div>

               {/* Card 3: Bottom Left (AI Insight) */}
               <motion.div 
                 initial={{ x: -20, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ delay: 1.0, type: "spring", stiffness: 100 }}
                 className="absolute -left-4 bottom-4 z-30 w-72 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] rounded-2xl p-4 flex items-start gap-4"
               >
                 <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                   <BrainCircuit className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-sm font-bold text-slate-900 dark:text-white">AI Suggestion</p>
                   <p className="text-xs text-slate-500 leading-tight mt-1">Move $2,000 from checking to your high yield savings to earn $80 more this year.</p>
                   <button className="text-xs font-bold text-indigo-500 mt-2 hover:underline">Execute Transfer</button>
                 </div>
               </motion.div>
            </motion.div>
          </div>

          {/* Logo Ticker */}
          <div className="border-t border-slate-200/50 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-md mt-12 py-6">
             <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  Loved by smart savers and wealth builders
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 grayscale">
                   <div className="text-lg font-black font-serif text-slate-800 dark:text-white">AcmeCorp</div>
                   <div className="text-lg font-black font-serif text-slate-800 dark:text-white">GlobalTech</div>
                   <div className="text-lg font-black font-serif text-slate-800 dark:text-white">Nexus</div>
                   <div className="text-lg font-black font-serif text-slate-800 dark:text-white">Vanguard</div>
                   <div className="text-lg font-black font-serif text-slate-800 dark:text-white">Zenith</div>
                </div>
             </div>
          </div>
        </section>

        <TheFinancialTrap />
        <YourBlueprintToWealth />

        {/* Compact Bento Grid */}
        <section className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-3 gap-4 mt-16 mb-20">
            <div className="md:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Tactical Arsenal</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Access global hacks to lower your food, travel, and cab expenses.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Gamified Finance</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Earn XP and climb ranks by hitting your savings targets.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Dynamic Notifications</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Get real-time push alerts before you overspend.</p>
            </div>
            <div className="md:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Bank-Grade Security</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Your data is secured with enterprise encryption and strict rate limits.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Compact CTA */}
      <section className="container mx-auto px-6 max-w-6xl pb-16 relative z-10">
        <div className="bg-slate-900 dark:bg-slate-800 text-white rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-bold text-lg md:text-xl">Ready to take control? Join 10,000+ smart savers.</p>
          <Button onClick={onGetStarted} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full px-8 h-12 shrink-0">
            Launch Dashboard
          </Button>
        </div>
      </section>

      {/* Compact Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-4">
        <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
          <div>SpendSense AI</div>
          <div className="flex gap-6">
            <button onClick={onViewPrivacy} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Privacy</button>
            <button onClick={onViewTerms} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
}