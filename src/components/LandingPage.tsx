import React from "react";
import { 
  ArrowRight, 
  ShieldCheck, 
  PieChart, 
  BrainCircuit, 
  BookOpen, 
  TrendingUp, 
  ArrowUpRight,
  ChevronRight,
  TrendingDown,
  AlertCircle,
  Target,
  ListPlus,
  PlayCircle,
  LayoutGrid,
  History,
  Bot,
  PiggyBank,
  Link,
  Search,
  Moon,
  Bell,
  Sparkles,
  Plus
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

interface LandingPageProps {
  onGetStarted: () => void;
  onViewTerms?: () => void;
  onViewPrivacy?: () => void;
  onViewContact?: () => void;
  user?: any;
}

export default function LandingPage({ onGetStarted, onViewTerms, onViewPrivacy, onViewContact, user }: LandingPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-indigo-500/30 selection:text-indigo-900 overflow-x-hidden">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">SpendSense</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-foreground">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#problem" className="hover:text-indigo-600 transition-colors">Why AI?</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
          </nav>
          <Button variant="ghost" size="sm" onClick={onGetStarted} className="md:flex gap-2 font-bold hover:bg-indigo-500/10 hover:text-indigo-600">
            {user ? "Dashboard" : "Sign In"} <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. The Hero Section */}
        <section className="relative pt-6 pb-16 md:pt-12 overflow-hidden">
          <div className="container mx-auto px-6 md:px-10 max-w-7xl">
            <div className="max-w-[850px] mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6 leading-[1.1]">
                  Stop Tracking the Past. <br />
                  <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">Start Directing Your Future.</span>
                </h1>
                <p className="text-lg md:text-xl font-medium text-muted-foreground mb-10 max-w-[650px] mx-auto leading-relaxed">
                  We aggregate the world's most powerful AI models into one unified financial advisor. Get institutional-grade intelligence for less than the cost of a coffee.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <Button size="lg" className="h-14 px-8 rounded-full text-base font-black bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95" onClick={onGetStarted}>
                    {user ? "Go to Dashboard" : "Get Started for Free"} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  {!user && (
                    <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-base font-bold border-border/60 hover:bg-muted transition-all">
                      <PlayCircle className="mr-2 h-5 w-5" /> See How It Works
                    </Button>
                  )}
                </div>
                <p className="text-sm font-medium text-muted-foreground/80">
                  Join the waitlist of young professionals mastering their wealth. <span className="font-bold text-foreground/70">No credit card required.</span>
                </p>
              </motion.div>
            </div>

            {/* 2. The Visual Proof */}
            <motion.div 
              className="mt-16 relative px-4 md:px-0"
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative mx-auto max-w-[1100px] aspect-[16/9] rounded-t-3xl border-t border-x border-slate-200/50 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 shadow-[0_-20px_80px_-20px_rgba(79,70,229,0.15)] backdrop-blur-2xl overflow-hidden pt-4 px-4 md:pt-6 md:px-6 flex items-end">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
                
                {/* Mock UI Dashboard Image representation */}
                <div className="w-full h-full rounded-t-xl bg-slate-50 dark:bg-[#09090b] border-t border-x border-slate-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden flex transform origin-top hover:scale-[1.01] transition-transform duration-700">
                  
                  {/* Left Sidebar Mock */}
                  <div className="w-64 bg-white dark:bg-zinc-950 border-r border-slate-200 dark:border-zinc-800 flex flex-col pt-8 pb-4 shrink-0 hidden sm:flex">
                      {/* Brand */}
                      <div className="flex items-center gap-3 mb-10 px-8">
                         <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm">
                           <TrendingUp className="h-5 w-5" />
                         </div>
                         <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">SpendSense</span>
                      </div>
                      
                      {/* Menu */}
                      <div className="space-y-1 flex-1 px-4">
                         <div className="h-11 w-full bg-slate-100 dark:bg-zinc-900 rounded-xl flex items-center px-4 gap-3 relative border border-slate-200/50 dark:border-zinc-800">
                            <LayoutGrid className="h-4 w-4 text-slate-900 dark:text-white" />
                            <span className="text-sm font-bold text-slate-900 dark:text-white">Dashboard</span>
                            <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white" />
                         </div>
                         {[
                           { icon: History, label: "History" },
                           { icon: PiggyBank, label: "Piggy Banks" },
                           { icon: ShieldCheck, label: "Protection" },
                           { icon: Link, label: "Wealth Engine" },
                           { icon: Bot, label: "AI Coach" },
                           { icon: Sparkles, label: "Pro" },
                         ].map((item, i) => (
                           <div key={i} className="h-11 w-full rounded-xl flex items-center px-4 gap-3 hover:bg-slate-100 dark:hover:bg-zinc-900 cursor-pointer transition-colors">
                              <item.icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{item.label}</span>
                           </div>
                         ))}
                      </div>

                      {/* Profile */}
                      <div className="mt-auto px-4">
                        <div className="bg-slate-50 dark:bg-zinc-900 rounded-2xl p-3 flex items-center gap-3 border border-slate-100 dark:border-zinc-800">
                            <img src="https://ui-avatars.com/api/?name=Harshit+Singh&background=0D8ABC&color=fff" className="h-10 w-10 rounded-full" />
                            <div className="flex flex-col">
                               <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Harshit Singh</span>
                               <span className="text-[10px] text-slate-500 truncate w-32 font-medium">sharshitsingh007@gmail....</span>
                            </div>
                        </div>
                      </div>
                  </div>

                  {/* Main Content Area Mock */}
                  <div className="flex-1 flex flex-col min-w-0 bg-slate-50/30 dark:bg-[#09090b]">
                      {/* Subheader Mock */}
                      <div className="px-8 py-6 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between shrink-0 hidden md:flex">
                         <div className="text-slate-500 dark:text-slate-400 font-medium">{getGreeting()}, Harshit <span className="mx-2 text-slate-300 dark:text-slate-700">•</span> Dashboard</div>
                         <div className="flex items-center gap-4">
                           <div className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold rounded-full border border-emerald-100 dark:border-emerald-500/20 flex items-center gap-1.5">
                             AI Agent: Active
                           </div>
                         </div>
                      </div>

                      {/* Dashboard Body / Charts */}
                      <div className="p-8 space-y-6 flex-1 pb-20 overflow-y-auto">
                          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.5fr] gap-6">
                             {/* Spending Allocation */}
                             <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 p-8 shadow-sm flex flex-col items-center relative h-[420px]">
                                <div className="w-full text-left mb-8 flex justify-between items-center">
                                  <div>
                                    <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">Spending Allocation</h3>
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Monthly Categorization</p>
                                  </div>
                                </div>
                                
                                {/* SVG Donut */}
                                <div className="relative w-[50%] aspect-square mb-8">
                                   <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#334155" strokeWidth="16" strokeDasharray="23 251.2" strokeDashoffset="0"></circle>
                                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FBBF24" strokeWidth="16" strokeDasharray="30 251.2" strokeDashoffset="-26"></circle>
                                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EF4444" strokeWidth="16" strokeDasharray="15 251.2" strokeDashoffset="-59"></circle>
                                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#A855F7" strokeWidth="16" strokeDasharray="20 251.2" strokeDashoffset="-77"></circle>
                                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10B981" strokeWidth="16" strokeDasharray="65 251.2" strokeDashoffset="-100"></circle>
                                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3B82F6" strokeWidth="16" strokeDasharray="80.2 251.2" strokeDashoffset="-168"></circle>
                                   </svg>
                                </div>

                                {/* Legend */}
                                <div className="w-full flex justify-center gap-x-6 gap-y-3 flex-wrap mt-auto">
                                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-slate-700"></div><span className="text-[10.5px] font-bold text-slate-700 dark:text-slate-300">Food</span></div>
                                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-400"></div><span className="text-[10.5px] font-bold text-amber-500">General</span></div>
                                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-[10.5px] font-bold text-emerald-500">Rent</span></div>
                                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span className="text-[10.5px] font-bold text-blue-500">Savings/Goal</span></div>
                                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-purple-500"></div><span className="text-[10.5px] font-bold text-purple-400">Shopping</span></div>
                                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div><span className="text-[10.5px] font-bold text-red-500">Transport</span></div>
                                </div>
                             </div>

                             {/* Cashflow Trends */}
                             <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 p-8 shadow-sm flex flex-col relative h-[420px]">
                                <div className="w-full text-left mb-6">
                                  <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">Cashflow Trends</h3>
                                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Income vs Expenses Over Time</p>
                                </div>
                                
                                <div className="flex-1 w-full relative">
                                   <svg viewBox="0 0 500 200" preserveAspectRatio="none" className="w-full h-full absolute inset-0">
                                      {/* Grid lines */}
                                      <line x1="0" y1="20" x2="500" y2="20" stroke="currentColor" className="text-slate-100 dark:text-zinc-800" strokeWidth="1.5" strokeDasharray="4 4" />
                                      <line x1="0" y1="80" x2="500" y2="80" stroke="currentColor" className="text-slate-100 dark:text-zinc-800" strokeWidth="1.5" strokeDasharray="4 4" />
                                      <line x1="0" y1="140" x2="500" y2="140" stroke="currentColor" className="text-slate-100 dark:text-zinc-800" strokeWidth="1.5" strokeDasharray="4 4" />
                                      
                                      {/* Y-Axis Labels */}
                                      <text x="0" y="25" fill="currentColor" className="text-slate-400 dark:text-slate-500" fontSize="10">20,000</text>
                                      <text x="0" y="85" fill="currentColor" className="text-slate-400 dark:text-slate-500" fontSize="10">60,000</text>
                                      <text x="0" y="145" fill="currentColor" className="text-slate-400 dark:text-slate-500" fontSize="10">30,000</text>
                                      <text x="5" y="195" fill="currentColor" className="text-slate-400 dark:text-slate-500" fontSize="10">₹0</text>
                                      
                                      {/* X-Axis Labels */}
                                      <text x="50" y="215" fill="currentColor" className="text-slate-400 dark:text-slate-500" fontSize="10">Apr 21</text>
                                      <text x="250" y="215" fill="currentColor" className="text-slate-400 dark:text-slate-500" fontSize="10">Apr 22</text>
                                      <text x="400" y="215" fill="currentColor" className="text-slate-400 dark:text-slate-500" fontSize="10">Apr 24</text>
                                      <text x="480" y="215" fill="currentColor" className="text-slate-400 dark:text-slate-500" fontSize="10">Apr 25</text>

                                      {/* Income Line & Area (Green) */}
                                      <path d="M 50 10 C 150 150, 250 180, 300 170 C 350 160, 400 160, 500 180" fill="transparent" stroke="#10B981" strokeWidth="2.5" />
                                      <path d="M 50 10 C 150 150, 250 180, 300 170 C 350 160, 400 160, 500 180 L 500 200 L 50 200 Z" fill="url(#greenGradient)" />

                                      {/* Expenses Line & Area (Red) */}
                                      <path d="M 50 190 C 150 150, 250 130, 300 140 C 350 190, 400 195, 500 195" fill="transparent" stroke="#EF4444" strokeWidth="2.5" />
                                      <path d="M 50 190 C 150 150, 250 130, 300 140 C 350 190, 400 195, 500 195 L 500 200 L 50 200 Z" fill="url(#redGradient)" />
                                      
                                      <defs>
                                        <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                                          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                                        </linearGradient>
                                        <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
                                          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                                        </linearGradient>
                                      </defs>
                                   </svg>
                                </div>

                                {/* Legend */}
                                <div className="w-full flex justify-center gap-x-6 mt-10">
                                   <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-400"></div><span className="text-xs font-bold text-red-500">Expenses</span></div>
                                   <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-xs font-bold text-emerald-500">Income</span></div>
                                </div>
                             </div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. The Problem/Agitation Section */}
        <section id="problem" className="py-24 bg-slate-50 dark:bg-zinc-900/30 border-y border-slate-200 dark:border-zinc-800">
          <div className="container mx-auto px-6 md:px-10 max-w-7xl">
            <div className="text-center max-w-[700px] mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                The system is built for you to spend. <br/>
                <span className="text-indigo-600 dark:text-indigo-400">We built a system for you to keep it.</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-2">The Trap</h3>
                <p className="text-3xl font-black text-foreground mb-4">78%</p>
                <p className="font-medium text-muted-foreground leading-relaxed">
                  of professionals live paycheck to paycheck despite a good salary.
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group hover:border-amber-500/20 transition-colors">
                <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
                  <TrendingDown className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-2">The Leak</h3>
                <p className="text-3xl font-black text-foreground mb-4">60%</p>
                <p className="font-medium text-muted-foreground leading-relaxed">
                  struggle with daily impulse purchases they regret later.
                </p>
              </div>

              <div className="bg-indigo-600 p-8 rounded-3xl shadow-xl shadow-indigo-600/20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 blur-[40px] rounded-full pointer-events-none" />
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-sm font-black text-indigo-200 uppercase tracking-widest mb-2">The Fix</h3>
                <p className="text-2xl font-black text-white mb-2 leading-tight">SpendSense</p>
                <p className="font-medium text-indigo-100/90 leading-relaxed text-sm">
                  intercepts bad habits before they drain your accounts, changing your trajectory instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. The Solution/Features */}
        <section id="features" className="py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Everything you need, unified in one platform.</h2>
            </div>
            
            <div className="space-y-32">
              {/* Feature 1 */}
              <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="order-2 md:order-1 relative rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 md:p-8 aspect-video flex items-center justify-center shadow-inner overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent" />
                   <div className="w-full max-w-[340px] bg-white dark:bg-zinc-950 rounded-3xl shadow-xl border border-slate-100 dark:border-zinc-800 relative z-10 overflow-hidden flex flex-col">
                      {/* Header */}
                      <div className="bg-slate-50/50 dark:bg-zinc-900/50 p-5 border-b border-slate-100 dark:border-zinc-800 flex items-center gap-4">
                         <div className="h-10 w-10 bg-[#1e293b] text-white rounded-xl flex items-center justify-center shadow-sm">
                           <Plus className="h-5 w-5" />
                         </div>
                         <div>
                            <h4 className="font-bold text-slate-900 dark:text-white leading-tight">Log Transaction</h4>
                            <p className="text-[11px] font-medium text-slate-500">Capture your financial pulse instantly</p>
                         </div>
                      </div>
                      {/* Body */}
                      <div className="p-5 flex flex-col gap-4">
                          {/* Value Amount */}
                          <div>
                            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Value Amount</div>
                            <div className="h-11 w-full bg-slate-50 dark:bg-zinc-900/50 rounded-xl flex items-center px-4 border border-slate-100 dark:border-zinc-800">
                               <span className="text-slate-400 font-medium mr-2">₹</span>
                               <span className="text-slate-600 dark:text-slate-300 font-mono font-bold">0.00</span>
                            </div>
                          </div>
                          {/* Flow Type */}
                          <div>
                            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Flow Type</div>
                            <div className="h-11 w-full bg-slate-50 dark:bg-zinc-900/50 rounded-xl p-1 flex border border-slate-100 dark:border-zinc-800">
                               <div className="flex-1 bg-white dark:bg-zinc-800 rounded-lg flex items-center justify-center shadow-sm border border-slate-100 dark:border-zinc-700/50">
                                  <span className="text-xs font-bold text-slate-900 dark:text-white">Expense</span>
                               </div>
                               <div className="flex-1 rounded-lg flex items-center justify-center">
                                  <span className="text-xs font-bold text-slate-500">Income</span>
                               </div>
                            </div>
                          </div>
                          {/* Category & Description */}
                          <div className="grid grid-cols-2 gap-3">
                             <div>
                                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Category</div>
                                <div className="h-10 w-full bg-slate-50 dark:bg-zinc-900/50 rounded-xl border border-slate-100 dark:border-zinc-800 flex items-center px-3">
                                   <span className="text-xs font-medium text-slate-900 dark:text-white">General</span>
                                </div>
                             </div>
                             <div>
                                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Description</div>
                                <div className="h-10 w-full bg-slate-50 dark:bg-zinc-900/50 rounded-xl border border-slate-100 dark:border-zinc-800 flex items-center px-3">
                                   <span className="text-xs font-medium text-slate-400">E.g. Groceries</span>
                                </div>
                             </div>
                          </div>
                          {/* Button */}
                          <div className="h-11 w-full bg-[#838b97] hover:bg-[#6c7481] rounded-xl flex items-center justify-center mt-1 cursor-pointer transition-colors shadow-sm">
                             <span className="text-sm font-bold text-white">Commit Transaction</span>
                          </div>
                      </div>
                   </div>
                </div>
                <div className="order-1 md:order-2 space-y-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <ListPlus className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-black">The Omni-Tracker</h3>
                  <p className="text-lg font-medium text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-bold">Zero-Friction Logging.</span> Manually entering expenses builds discipline. Our lightning-fast Omni-Tracker makes it painless.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="space-y-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-black">Stocrates AI Coach</h3>
                  <p className="text-lg font-medium text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-bold">An Analyst in Your Pocket.</span> Meet Stocrates. Before you buy that new gadget, chat with your AI coach to see exactly how it impacts your long-term goals.
                  </p>
                </div>
                <div className="relative rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 md:p-8 aspect-video flex items-center justify-center shadow-inner overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/5 to-transparent" />
                   <div className="w-full max-w-sm bg-white dark:bg-zinc-950 rounded-xl shadow-xl border border-slate-200 dark:border-zinc-800 p-4 relative z-10 flex flex-col gap-3">
                      <div className="bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 rounded-2xl rounded-tr-sm p-3 text-sm self-end max-w-[80%] font-medium">Can I afford the new iPad?</div>
                      <div className="bg-muted/50 rounded-2xl rounded-tl-sm p-3 text-sm self-start max-w-[90%] font-medium text-foreground">Buying it will delay your 'Emergency Fund' goal by 2 months. Let's find a way to save up first.</div>
                   </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="order-2 md:order-1 relative rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 md:p-8 aspect-video flex items-center justify-center shadow-inner overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
                   <div className="w-full max-w-sm relative z-10 flex flex-col gap-3">
                      <div className="bg-white dark:bg-zinc-950 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-800 p-4">
                         <div className="flex justify-between items-center mb-2"><span className="font-bold text-sm">Dream Vacation</span><span className="font-bold text-xs">75%</span></div>
                         <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[75%] rounded-full" /></div>
                      </div>
                      <div className="bg-white dark:bg-zinc-950 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-800 p-4">
                         <div className="flex justify-between items-center mb-2"><span className="font-bold text-sm">New Car</span><span className="font-bold text-xs">30%</span></div>
                         <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[30%] rounded-full" /></div>
                      </div>
                   </div>
                </div>
                <div className="order-1 md:order-2 space-y-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-black">Infinite Piggy Banks</h3>
                  <p className="text-lg font-medium text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-bold">Give Every Rupee a Job.</span> Create targeted savings goals. Watch your money automatically route itself toward your dream car or emergency fund.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="space-y-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-black">The Protection Shield</h3>
                  <p className="text-lg font-medium text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-bold">Bulletproof Your Future.</span> Our algorithm scans your cash flow to detect critical vulnerabilities, from missing emergency funds to insurance gaps.
                  </p>
                </div>
                <div className="relative rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 md:p-8 aspect-video flex items-center justify-center shadow-inner overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/5 to-transparent" />
                   <div className="w-full max-w-sm bg-white dark:bg-zinc-950 rounded-xl shadow-xl border border-slate-200 dark:border-zinc-800 p-6 relative z-10 text-center">
                      <div className="h-20 w-20 rounded-full border-8 border-emerald-500 mx-auto flex items-center justify-center mb-4 text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        92
                      </div>
                      <div className="font-black text-lg mb-1">Financial Health Strong</div>
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No Critical Gaps Detected</div>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. The Final CTA */}
        <section className="py-24 border-t border-border">
          <div className="container mx-auto px-6 md:px-10 max-w-7xl">
            <div className="rounded-[3rem] bg-indigo-600 p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-[80px]" />
              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-[80px]" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Ready to rewrite your financial narrative?</h2>
                <p className="text-lg md:text-xl font-medium text-indigo-100/90 mb-10 leading-relaxed">
                  Stop piecing together spreadsheets and generic apps. Get the ultimate financial command center today.
                </p>
                <Button size="lg" className="h-16 px-10 rounded-full text-lg font-black bg-white text-indigo-600 hover:bg-slate-100 hover:scale-105 transition-all shadow-xl" onClick={onGetStarted}>
                  Unlock Your Dashboard Now <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-muted/20">
        <div className="container mx-auto px-6 md:px-10 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm">
                <TrendingUp className="h-3 w-3" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white">SpendSense</span>
            </div>
            <div className="flex gap-8 text-sm font-bold text-muted-foreground">
              <button onClick={onViewTerms} className="hover:text-emerald-500 transition-colors">Terms</button>
              <button onClick={onViewPrivacy} className="hover:text-emerald-500 transition-colors">Privacy</button>
              <button onClick={onViewContact} className="hover:text-emerald-500 transition-colors">Contact</button>
            </div>
            <div className="text-sm font-medium text-muted-foreground/60">
              © 2026 SpendSense AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


function ProblemStat({ percentage, label, icon }: { percentage: string, label: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card border border-border group-hover:border-accent/40 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold font-mono tracking-tighter">{percentage}</p>
        <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">{label}</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none bg-card hover:bg-muted/50 transition-colors shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)]">
      <CardContent className="p-8">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
