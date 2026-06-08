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
  Wallet
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

export default function LandingPage({ onGetStarted, onViewPricing, onViewTerms, onViewPrivacy, onViewContact, user }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState<'track' | 'protect' | 'grow'>('track');

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-emerald-500/30 selection:text-emerald-900 overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl shrink-0 h-16">
        <div className="container mx-auto max-w-7xl flex h-full items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Logo className="h-8 w-8" />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-xl font-sonsie tracking-normal bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 dark:from-violet-400 dark:via-blue-400 dark:to-emerald-400"
            >
              SpendSense
            </motion.span>
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
        <section className="relative pt-40 pb-48 text-center overflow-hidden bg-slate-50 dark:bg-slate-950">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-200/50 via-slate-50/10 to-slate-50 dark:from-indigo-900/20 dark:via-slate-950/50 dark:to-slate-950"
          ></motion.div>
          <div className="container mx-auto px-6 max-w-5xl relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-8 leading-[1.05]">
                Move Beyond Passive Budgeting. <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 dark:from-violet-400 dark:via-blue-400 dark:to-emerald-400">Engineer Your Wealth.</span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              SpendSense AI is your proactive Financial Intelligence Engine. Stop looking in the rear view mirror.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mb-20"
            >
              <Button 
                size="lg" 
                className="group h-14 px-8 rounded-full text-lg font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_40px_-10px_#10b981] hover:shadow-[0_0_60px_-15px_#10b981] transition-all hover:scale-105" 
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
                className="h-14 px-8 rounded-full text-lg font-bold border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all hover:scale-105" 
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  if (featuresSection) featuresSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Features
              </Button>
            </motion.div>

            {/* Floating Dashboard Real Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              style={{ perspective: 1000 }}
              className="w-full max-w-4xl mx-auto rounded-[2rem] border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl shadow-2xl overflow-hidden p-6 md:p-8 relative text-left"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500"></div>
              
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                 {/* Stat Card 1: Income */}
                 <div className="flex-1 h-32 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 flex flex-col justify-center px-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white">$14,250.00</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-slate-500 mt-1">Monthly Income</div>
                 </div>
                 
                 {/* Stat Card 2: Expenses */}
                 <div className="flex-1 h-32 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 flex flex-col justify-center px-6 relative overflow-hidden group hover:shadow-md transition-shadow shadow-[0_0_30px_-5px_rgba(239,68,68,0.1)]">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center mb-3">
                      <TrendingDown className="h-5 w-5" />
                    </div>
                    <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white">$8,450.00</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-slate-500 mt-1">Monthly Expenses</div>
                 </div>

                 {/* Stat Card 3: Balance */}
                 <div className="flex-1 h-32 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 flex flex-col justify-center px-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-3">
                      <Wallet className="h-5 w-5" />
                    </div>
                    <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white">$5,800.00</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-slate-500 mt-1">Current Balance</div>
                 </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                 {/* Trend Chart Mockup */}
                 <div className="md:w-2/3 h-64 rounded-2xl bg-white/80 dark:bg-slate-950/50 border border-slate-200/50 dark:border-white/5 p-6 relative overflow-hidden flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Cashflow Trends</h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Income vs Expenses</p>
                    </div>
                    <div className="flex-1 relative w-full">
                      <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t from-emerald-500/20 to-transparent"></div>
                      <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0,100 C20,80 40,90 60,50 C80,10 90,30 100,20 L100,100 Z" fill="currentColor" className="text-emerald-500/20 dark:text-emerald-500/10" />
                        <path d="M0,100 C20,80 40,90 60,50 C80,10 90,30 100,20" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-500" />
                        
                        <path d="M0,100 C20,95 40,85 60,70 C80,50 90,60 100,40 L100,100 Z" fill="currentColor" className="text-blue-500/20 dark:text-blue-500/10" />
                        <path d="M0,100 C20,95 40,85 60,70 C80,50 90,60 100,40" fill="none" stroke="currentColor" strokeWidth="3" className="text-blue-500" />
                      </svg>
                    </div>
                 </div>
                 
                 {/* Recent Activity Mockup */}
                 <div className="md:w-1/3 h-64 rounded-2xl bg-white/80 dark:bg-slate-950/50 border border-slate-200/50 dark:border-white/5 p-6 flex flex-col gap-4">
                    <div className="mb-2">
                       <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Recent Pulse</h3>
                       <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Latest Transactions</p>
                    </div>
                    <div className="flex flex-col gap-4 overflow-hidden">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 text-xs">🍎</div>
                           <div>
                             <p className="text-sm font-bold text-slate-900 dark:text-white">Whole Foods</p>
                             <p className="text-xs text-slate-500">Groceries</p>
                           </div>
                         </div>
                         <p className="font-mono text-sm font-bold text-slate-900 dark:text-white">-$142.50</p>
                       </div>
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 text-xs">💻</div>
                           <div>
                             <p className="text-sm font-bold text-slate-900 dark:text-white">Apple Store</p>
                             <p className="text-xs text-slate-500">Tech</p>
                           </div>
                         </div>
                         <p className="font-mono text-sm font-bold text-slate-900 dark:text-white">-$899.00</p>
                       </div>
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 text-xs">💼</div>
                           <div>
                             <p className="text-sm font-bold text-slate-900 dark:text-white">Salary</p>
                             <p className="text-xs text-slate-500">Income</p>
                           </div>
                         </div>
                         <p className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">+$6,240.00</p>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. The Motive Grid */}
        <section className="relative py-24 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800/50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-white/[0.02] bg-[length:32px_32px]"></div>
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Side: The Old Way */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="p-10 rounded-[2rem] border bg-red-50/50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-red-500/10 rounded-xl">
                    <TrendingDown className="h-6 w-6 text-red-500 dark:text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">The Old Way</h3>
                </div>
                <ul className="space-y-6">
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 transition-transform"
                  >
                    <XCircle className="h-6 w-6 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Reactive Analysis</span>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">Tells you what you spent after the money is already gone.</p>
                    </div>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 transition-transform"
                  >
                    <XCircle className="h-6 w-6 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Manual Spreadsheets</span>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">Requires hours of data entry and categorizing receipts.</p>
                    </div>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 transition-transform"
                  >
                    <XCircle className="h-6 w-6 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Confusing Charts</span>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">Endless pie charts that offer zero actionable insights.</p>
                    </div>
                  </motion.li>
                </ul>
              </motion.div>

              {/* Right Side: SpendSense AI */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-10 rounded-[2rem] border bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30 shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)] relative overflow-hidden flex flex-col justify-center"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 dark:bg-indigo-500/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 dark:bg-emerald-500/10 rounded-full blur-[80px]" />
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="p-3 bg-emerald-500/20 rounded-xl relative">
                    <div className="absolute inset-0 bg-emerald-400 animate-ping opacity-20 rounded-xl" />
                    <BrainCircuit className="h-6 w-6 text-emerald-600 dark:text-emerald-400 relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">SpendSense AI</h3>
                </div>
                <ul className="space-y-6 relative z-10">
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 transition-transform"
                  >
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Predictive AI Forecasts</span>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">Forecasts cash flow and stops bad spending before it happens.</p>
                    </div>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 transition-transform"
                  >
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Automated Policy Auditing</span>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">Continuously scans your finances for vulnerabilities and risks.</p>
                    </div>
                  </motion.li>
                  <motion.li 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 transition-transform"
                  >
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Dynamic Wealth Architecting</span>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">Automatically routes money to optimize for compound growth.</p>
                    </div>
                  </motion.li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Core Architecture Bento Box */}
        <section id="features" className="py-32 bg-slate-50 dark:bg-slate-950 relative">
          <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent"></div>
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">Core Architecture</h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Experience our expansive toolkit organized in a beautiful, cohesive ecosystem.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
              {/* Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:col-span-2 group bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 hover:scale-[1.02] hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-6 relative z-10">
                  <ListPlus className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">The Omni-Tracker</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg relative z-10">
                  Say goodbye to manual categorization. The Omni-Tracker captures every financial pulse across your accounts. It categorizes your cash flow into Defensive Capital for survival and Offensive Capital for wealth generation.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 hover:scale-[1.02] hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-6 relative z-10">
                  <BrainCircuit className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">Stocrates AI Coach</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg relative z-10">
                  Your personal AI CFO. Context aware coaching that remembers your financial history to provide tailored strategies.
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 hover:scale-[1.02] hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-6 relative z-10">
                  <History className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">The Arsenal & Academy</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg relative z-10">
                  Access our Core Intelligence Academy and Tactical Tools directory. Learn global financial hacks for travel, food, and cashback to leverage your spending.
                </p>
              </motion.div>

              {/* Card 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:col-span-2 group bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 hover:scale-[1.02] hover:shadow-xl hover:border-red-500/30 transition-all duration-300 flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 mb-6 relative z-10">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">Policy Scanner & Claim Enforcer</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg relative z-10">
                  Upload your insurance documents. Our AI audits hidden clauses and enforces claims by generating legal grievance redressals automatically.
                </p>
              </motion.div>

              {/* Card 5 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="md:col-span-3 group bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800/80 rounded-3xl p-10 hover:scale-[1.02] hover:shadow-xl hover:border-violet-500/30 transition-all duration-300 flex flex-col items-center text-center justify-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-6 relative z-10">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">Gamified Finance</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xl max-w-3xl relative z-10">
                  Level up your finances. Hit personalized goals, track your progress, and climb the ranks with our checkpoint system.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* 4. The Final CTA */}
      <section className="relative py-32 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-slate-100/80 dark:bg-slate-800/60 backdrop-blur-xl rounded-[2.5rem] p-12 md:p-20 text-center shadow-2xl border border-white/50 dark:border-slate-700/50 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent dark:from-white/5 pointer-events-none"></div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-8 relative z-10">
              Ready to build your financial fortress?
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto relative z-10">
              Join the ecosystem and take control of your capital today.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block relative z-10"
            >
              <Button 
                size="lg" 
                className="group h-16 px-12 rounded-full text-xl font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_40px_-5px_#10b981] hover:shadow-[0_0_80px_-10px_#10b981] transition-all" 
                onClick={onGetStarted}
              >
                Launch SpendSense AI 
                <motion.div 
                  className="inline-block ml-3 group-hover:translate-x-1 transition-transform"
                >
                  <ArrowRight className="h-6 w-6" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
              SpendSense AI. Built for the modern wealth builder.
            </div>
            <div className="flex gap-8 text-sm font-bold text-slate-500 dark:text-slate-400">
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">GitHub</a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Documentation</a>
              <button onClick={onViewPrivacy} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Privacy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}