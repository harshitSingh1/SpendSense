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
  BookOpen,
  ChevronDown,
  Bell,
  Home,
  Target,
  Zap,
  TreePine,
  ArrowUpRight,
  FileText,
  AlertTriangle,
  Bot,
  MessageSquare,
  Briefcase,
  GraduationCap,
  Play,
  Award
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
          <div className="order-1 md:order-2 bg-white dark:bg-[#0e162d] border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-125"></div>
            
            <div className="relative z-10 flex flex-col h-full">
               <div className="flex justify-between items-center mb-6">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
                     <PieChart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                   </div>
                   <div>
                     <p className="font-bold text-slate-900 dark:text-white text-sm">Omni-Tracker</p>
                     <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Real-time Allocation</p>
                   </div>
                 </div>
                 <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/30 shadow-sm flex items-center gap-1.5">
                   <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                   </span>
                   Live Sync
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-white/5 shadow-sm">
                     <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 font-semibold flex items-center gap-1.5 break-words whitespace-nowrap"><ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Defensive</p>
                     <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">60%</p>
                     <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-3 overflow-hidden">
                        <div className="bg-blue-500 h-1.5 rounded-full w-[60%] shadow-[0_0_8px_#3b82f6]"></div>
                     </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-white/5 shadow-sm">
                     <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 font-semibold flex items-center gap-1.5 break-words whitespace-nowrap"><TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Offensive</p>
                     <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">40%</p>
                     <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-3 overflow-hidden">
                        <div className="bg-emerald-500 h-1.5 rounded-full w-[40%] shadow-[0_0_8px_#10b981]"></div>
                     </div>
                  </div>
               </div>

               <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-500/20 flex items-center gap-4 mt-auto">
                 <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30 shrink-0 shadow-sm">
                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                 </div>
                 <div>
                    <p className="text-[12px] font-bold text-indigo-900 dark:text-indigo-100 mb-0.5">AI Optimization</p>
                    <p className="text-[11px] text-indigo-700 dark:text-indigo-300/80 leading-tight">Shift <strong>₹5,000</strong> to Offensive Capital to stay on track for your Goa Trip goal.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white dark:bg-[#0e162d] border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-indigo-500/30 transition-colors duration-500 h-[320px]">
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-125"></div>
            
            <div className="relative z-10 flex flex-col h-full">
               <div className="flex justify-between items-center mb-5">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                     <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                   </div>
                   <div>
                     <p className="font-bold text-slate-900 dark:text-white text-sm">Policy Auditor</p>
                     <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">HDFC Optima Restore PDF</p>
                   </div>
                 </div>
                 <div className="text-[10px] font-semibold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/40 px-3 py-1.5 rounded-full border border-rose-200 dark:border-rose-500/30 shadow-sm flex items-center gap-1.5">
                   <AlertTriangle className="w-3 h-3" />
                   Risks Found
                 </div>
               </div>

               <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-white/5 shadow-sm relative overflow-hidden mb-4 flex flex-col">
                  {/* Subtle scanline effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(99,102,241,0.05),transparent)] bg-[length:100%_4px] opacity-50 dark:opacity-20 pointer-events-none animate-[shimmer_2s_linear_infinite]"></div>
                  
                  <div className="space-y-3 relative z-10">
                     <div className="flex justify-between items-start">
                        <div className="flex gap-2 items-center">
                           <FileText className="w-4 h-4 text-slate-400" />
                           <div className="h-2 w-32 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                        </div>
                        <div className="h-2 w-8 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                     </div>
                     <div className="pl-6 space-y-2">
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                        <div className="h-1.5 w-[80%] bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                     </div>
                     
                     <div className="relative group/clause cursor-pointer mt-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-500/30 rounded-lg p-2.5 shadow-sm transition-all hover:bg-rose-100 dark:hover:bg-rose-900/30">
                        <div className="flex items-center gap-1.5 mb-1.5">
                           <XCircle className="w-3 h-3 text-rose-500" />
                           <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300">Room Rent Capping Detected</span>
                        </div>
                        <p className="text-[10px] text-rose-600 dark:text-rose-400/90 leading-tight">Clause 3.4 restricts room rent to 1% of Sum Insured. This exposes you to massive out-of-pocket expenses.</p>
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-rose-500 rounded-r-lg"></div>
                     </div>
                  </div>
               </div>

               <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 px-1 mt-auto">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 14 Safe Clauses
                  </div>
                  <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                    <AlertTriangle className="w-3.5 h-3.5" /> 2 Hidden Risks
                  </div>
               </div>
            </div>
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
          <div className="order-1 md:order-2 bg-white dark:bg-[#0e162d] border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-violet-500/30 transition-colors duration-500 h-[320px] flex flex-col">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-125"></div>
             
             <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center border border-violet-100 dark:border-violet-500/20 shadow-sm shrink-0">
                    <Bot className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Stocrates AI</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Chief Financial Officer</p>
                  </div>
                </div>

                {/* Chat window */}
                <div className="flex-1 overflow-hidden flex flex-col gap-3">
                   {/* User message */}
                   <div className="self-end bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] border border-slate-200 dark:border-white/5 shadow-sm">
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">I have ₹20,000 extra this month. Where should I put it?</p>
                   </div>
                   
                   {/* AI message */}
                   <div className="self-start bg-violet-50 dark:bg-violet-900/20 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[95%] border border-violet-100 dark:border-violet-500/20 shadow-sm relative">
                      {/* Triangle pointer */}
                      <div className="absolute -left-2 top-3 w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-violet-100 dark:border-r-violet-900/20 border-b-[8px] border-b-transparent"></div>
                      
                      <p className="text-[11px] text-slate-700 dark:text-slate-200 mb-3 leading-relaxed font-medium">Let's put that to work. Based on your moderate risk profile, here is the optimal split:</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] bg-white dark:bg-[#0e162d] rounded-lg px-2.5 py-1.5 border border-slate-100 dark:border-white/5 shadow-sm">
                           <div className="flex items-center gap-1.5">
                             <TrendingUp className="w-3 h-3 text-emerald-500" />
                             <span className="font-bold text-slate-900 dark:text-slate-300">Index Funds (Nifty 50)</span>
                           </div>
                           <span className="font-black text-slate-800 dark:text-slate-200">₹12,000</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] bg-white dark:bg-[#0e162d] rounded-lg px-2.5 py-1.5 border border-slate-100 dark:border-white/5 shadow-sm">
                           <div className="flex items-center gap-1.5">
                             <Briefcase className="w-3 h-3 text-blue-500" />
                             <span className="font-bold text-slate-900 dark:text-slate-300">Emergency Fund</span>
                           </div>
                           <span className="font-black text-slate-800 dark:text-slate-200">₹5,000</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] bg-white dark:bg-[#0e162d] rounded-lg px-2.5 py-1.5 border border-slate-100 dark:border-white/5 shadow-sm">
                           <div className="flex items-center gap-1.5">
                             <LineChart className="w-3 h-3 text-violet-500" />
                             <span className="font-bold text-slate-900 dark:text-slate-300">High-Growth Tech</span>
                           </div>
                           <span className="font-black text-slate-800 dark:text-slate-200">₹3,000</span>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white dark:bg-[#0e162d] border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-blue-500/30 transition-colors duration-500 h-[320px] flex flex-col">
             <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-125"></div>
             
             <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center border border-blue-100 dark:border-blue-500/20 shadow-sm shrink-0">
                    <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">The Arsenal</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Core Intelligence Library</p>
                  </div>
                </div>

                {/* Course List */}
                <div className="flex-1 space-y-3 relative">
                   <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-white/5 shadow-sm flex items-center justify-between group/course hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-sm">
                           <Play className="w-3.5 h-3.5 text-blue-500 ml-0.5" />
                         </div>
                         <div>
                            <p className="text-[12px] font-bold text-slate-900 dark:text-slate-200">The Mathematics of Wealth</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Lesson 1 &bull; 8 mins</p>
                         </div>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                   </div>

                   <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-100 dark:border-blue-500/20 shadow-sm flex items-center justify-between relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]"></div>
                      <div className="flex items-center gap-3 relative z-10">
                         <div className="w-8 h-8 rounded-full bg-blue-600 border border-blue-500 flex items-center justify-center shadow-sm shadow-blue-500/20">
                           <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                         </div>
                         <div>
                            <p className="text-[12px] font-bold text-blue-900 dark:text-blue-100">Outsmarting Inflation</p>
                            <div className="flex items-center gap-2 mt-1">
                               <div className="h-1.5 w-16 bg-blue-200 dark:bg-blue-900/50 rounded-full overflow-hidden">
                                  <div className="h-full bg-blue-500 w-[45%]"></div>
                               </div>
                               <p className="text-[9px] font-bold text-blue-600 dark:text-blue-400">45%</p>
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-white/5 shadow-sm flex items-center justify-between opacity-70">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center shadow-sm">
                           <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                         </div>
                         <div>
                            <p className="text-[12px] font-bold text-slate-700 dark:text-slate-400">Tax Optimization 101</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-0.5">Unlocks after Lesson 2</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
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
        <div className="container mx-auto max-w-[1400px] flex h-full items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-2xl font-sonsie tracking-normal bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 dark:from-violet-400 dark:via-blue-400 dark:to-emerald-400 outline-none whitespace-nowrap">SpendSense</span>
          </div>
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#solutions" className="hover:text-slate-900 dark:hover:text-white transition-colors">Solutions</a>
            <button onClick={onViewPricing} className="hover:text-slate-900 dark:hover:text-white transition-colors outline-none cursor-pointer text-sm font-medium">Pricing</button>
            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
              Resources <ChevronDown className="w-4 h-4 ml-0.5" />
            </div>
          </motion.nav>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-4 sm:gap-6">
                <button className="hidden sm:block text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors outline-none" onClick={onGetStarted}>{user ? "Launch App" : "Log in"}</button>
                <Button variant="outline" size="sm" onClick={onGetStarted} className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-slate-700 dark:bg-transparent dark:text-white dark:hover:bg-slate-800 hidden sm:flex border-white/20 dark:bg-white/5 py-1 px-4 h-9">
                  Dashboard <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="flex-1 pt-16 bg-slate-50 dark:bg-[#020617]">
        {/* 1. The Hero Section */}
        <section className="relative overflow-hidden bg-slate-50 dark:bg-[#020617] min-h-[calc(100vh-4rem)] flex flex-col justify-center">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-50 dark:from-blue-900/20 dark:via-[#020617] dark:to-[#020617] pointer-events-none"></div>

          <div className="container mx-auto px-6 lg:px-10 max-w-[1400px] relative z-10 grid lg:grid-cols-12 gap-12 items-center pt-8 pb-16">
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
              className="col-span-12 lg:col-span-6 flex flex-col items-start text-left w-full relative z-20"
            >

              <motion.h1 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15] xl:leading-[1.1]"
              >
                <span>Don't Just Save Money. </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-400 pb-2">
                  Grow Your Net Worth.
                </span>
              </motion.h1>
              
              <motion.div 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
                }}
                className="text-slate-600 dark:text-slate-300 text-lg md:text-[1.15rem] max-w-xl mb-12 leading-[1.7] font-medium"
              >

                <p>Meet the AI powered financial engine that predicts your cashflow and outsmarts inflation. See where your money is going, bypass hidden fees, and build your wealth on autopilot.</p>
              </motion.div>
              
              <motion.div 
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
                }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16 text-left"
              >
                <Button 
                  size="lg" 
                  className="group h-14 px-8 w-full sm:w-auto rounded-full text-[1.05rem] font-bold bg-[#10b981] hover:bg-[#059669] text-white transition-all hover:scale-105 shadow-[0_0_30px_-5px_#10b981]" 
                  onClick={onGetStarted}
                >
                  Get Started Free 
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-8 w-full sm:w-auto rounded-full text-[1.05rem] font-bold border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 transition-all outline-none" 
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
                className="flex flex-wrap items-center gap-6 text-[13px] font-medium text-slate-600 dark:text-slate-400"
              >
                 <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500 line-through decoration-transparent" /> Bank-Grade Security</div>
                 <div className="flex items-center gap-2">
                   <div className="flex -space-x-1.5 opacity-80">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white border border-white dark:border-[#020617]">&starf;</div>
                      <div className="w-4 h-4 rounded-full bg-emerald-500/70 flex items-center justify-center text-[10px] text-white border border-white dark:border-[#020617]">&starf;</div>
                   </div>
                   Trusted by 10K+ Users
                 </div>
                 <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-500" /> AI-Powered Insights</div>
              </motion.div>
            </motion.div>

            {/* Right Column (The Floating UI Mockup) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="col-span-12 lg:col-span-6 relative h-[650px] w-full hidden lg:block"
            >
               {/* Decorative background arcs and glows */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/20 to-transparent dark:from-blue-600/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>

               {/* Main Application Window */}
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.6, duration: 0.8 }}
                 className="absolute inset-y-10 -right-20 left-10 z-10 bg-white dark:bg-[#0c142e] border border-slate-200 dark:border-white/5 shadow-[0_30px_100px_-20px_rgba(59,130,246,0.3)] rounded-3xl overflow-hidden flex flex-col"
               >
                  {/* Mockup Header */}
                  <div className="h-16 border-b border-slate-100 dark:border-white/5 flex items-center justify-between px-6 bg-slate-50 dark:bg-[#0f172a]">
                     <div className="flex items-center gap-3">
                        <Logo className="h-6 w-6" />
                        <span className="text-sm font-sonsie bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 dark:from-violet-400 dark:via-blue-400 dark:to-emerald-400">SpendSense</span>
                        <span className="text-sm text-slate-500 ml-4 font-medium">Overview</span>
                     </div>
                     <div className="flex items-center gap-5 relative right-4 max-w-full">
                        <div className="flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/10 bg-white dark:bg-black/20 px-3 py-1 lg:max-w-none shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                          <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Calm Intelligence Mode</span>
                        </div>
                        <Bell className="w-4 h-4 text-slate-400" />
                        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white ring-2 ring-slate-100 dark:ring-white/10">A</div>
                     </div>
                  </div>
                  
                  {/* Mockup Content */}
                  <div className="flex flex-1 h-full bg-white dark:bg-[#080d1e]">
                     {/* Light sidebar */}
                     <div className="w-16 border-r border-slate-100 dark:border-white/5 flex flex-col items-center py-6 gap-8 text-slate-400 dark:text-slate-500/70">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.1)]"><Home className="w-5 h-5" /></div>
                        <TrendingUp className="w-5 h-5 hover:text-slate-600 dark:hover:text-slate-300" />
                        <Target className="w-5 h-5 hover:text-slate-600 dark:hover:text-slate-300" />
                        <History className="w-5 h-5 hover:text-slate-600 dark:hover:text-slate-300" />
                        <div className="mt-8">
                          <Zap className="w-5 h-5 hover:text-slate-600 dark:hover:text-slate-300" />
                        </div>
                     </div>
                     
                     <div className="flex-1 p-8 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

                        <h2 className="text-[1.4rem] font-bold text-slate-900 dark:text-white mb-0.5">Hello, Arjun <span role="img" aria-label="wave">👋</span></h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 font-medium">Here's your financial overview for May 2024</p>
                        
                        <div className="grid grid-cols-12 gap-5 mb-5 relative z-10">
                           <div className="col-span-5 bg-white dark:bg-[#0e162d] border border-slate-100 dark:border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 tracking-wide font-medium">Net Worth</p>
                              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">₹24,75,000</p>
                              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                                <ArrowUpRight className="w-3 h-3" /> 12.6% <span className="text-slate-400 dark:text-slate-500 font-medium">vs last month</span>
                              </div>
                              <div className="h-10 mt-3 absolute bottom-0 left-0 right-0 opacity-80">
                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                                   <path d="M0,40 L10,35 L20,38 L40,25 L60,30 L80,10 L100,20 L100,40 Z" fill="url(#gradient-green)" />
                                   <path d="M0,40 L10,35 L20,38 L40,25 L60,30 L80,10 L100,20" fill="none" stroke="#10b981" strokeWidth="2.5" />
                                   <defs>
                                     <linearGradient id="gradient-green" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="0%" stopColor="rgba(16,185,129,0.2)" />
                                       <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                                     </linearGradient>
                                   </defs>
                                </svg>
                              </div>
                           </div>
                           <div className="col-span-4 bg-white dark:bg-[#0e162d] border border-slate-100 dark:border-white/5 rounded-2xl p-5 flex flex-col justify-center relative shadow-lg">
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-slate-100 dark:border-slate-800 border-r-emerald-500 border-t-emerald-500 flex items-center justify-center text-[10px] shadow-[0_0_15px_rgba(16,185,129,0.1)] font-bold text-slate-700 dark:text-slate-300">38.8%</div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 tracking-wide font-medium">Offensive Capital</p>
                              <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">₹9,60,000</p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500">38.8%</p>
                           </div>
                           <div className="col-span-3 bg-white dark:bg-[#0e162d] border border-slate-100 dark:border-white/5 rounded-2xl p-5 flex flex-col justify-center relative shadow-lg overflow-hidden">
                              <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-slate-100 dark:border-slate-800 border-r-blue-500 border-t-blue-500 border-b-blue-500 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300">61.2%</div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 tracking-wide font-medium relative z-10 w-full truncate">Defensive Capital</p>
                              <p className="text-lg font-bold text-slate-900 dark:text-white mb-1 relative z-10 truncate max-w-[80%]">₹15,15,000</p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 relative z-10">61.2%</p>
                           </div>
                        </div>

                        <div className="grid grid-cols-12 gap-5 relative z-10">
                           <div className="col-span-7 bg-white dark:bg-[#0e162d] border border-slate-100 dark:border-white/5 rounded-2xl p-5 relative overflow-hidden shadow-lg h-44">
                              <p className="text-xs font-bold text-slate-900 dark:text-white mb-3">Cash Flow</p>
                              <div className="flex gap-4 sm:gap-6 mb-2">
                                 <div>
                                   <p className="text-[10px] text-slate-500 font-medium">Income</p>
                                   <p className="text-[13px] font-bold text-slate-900 dark:text-white">₹1,25,000</p>
                                 </div>
                                 <div>
                                   <p className="text-[10px] text-slate-500 font-medium">Expenses</p>
                                   <p className="text-[13px] font-bold text-slate-900 dark:text-white">₹78,400</p>
                                 </div>
                                 <div>
                                   <p className="text-[10px] text-slate-500 font-medium">Savings Rate</p>
                                   <p className="text-[13px] font-bold text-emerald-600 dark:text-emerald-400">37.2%</p>
                                 </div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 h-20 opacity-80">
                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                                   <path d="M0,40 C10,15 20,38 40,25 C60,30 80,10 100,20 L100,40 Z" fill="url(#gradient-blue)" />
                                   <path d="M0,40 C10,15 20,38 40,25 C60,30 80,10 100,20" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                                   <defs>
                                     <linearGradient id="gradient-blue" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="0%" stopColor="rgba(59,130,246,0.2)" />
                                       <stop offset="100%" stopColor="rgba(59,130,246,0)" />
                                     </linearGradient>
                                   </defs>
                                </svg>
                                <div className="absolute bottom-2 left-6 text-[8px] text-slate-400 dark:text-slate-500">Jan</div>
                                <div className="absolute bottom-2 left-1/3 text-[8px] text-slate-400 dark:text-slate-500">Feb</div>
                                <div className="absolute bottom-2 left-1/2 text-[8px] text-slate-400 dark:text-slate-500">Mar</div>
                                <div className="absolute bottom-2 right-1/4 text-[8px] text-slate-400 dark:text-slate-500">Apr</div>
                                <div className="absolute bottom-2 right-6 text-[8px] text-slate-400 dark:text-slate-500">May</div>
                              </div>
                           </div>
                           <div className="col-span-5 bg-white dark:bg-[#0e162d] border border-slate-100 dark:border-white/5 rounded-2xl p-5 relative shadow-lg h-44 flex flex-col">
                              <p className="text-xs font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><Sparkles className="w-3 h-3 text-emerald-500" /> AI Insight</p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-0.5">You can save an additional</p>
                              <p className="text-[17px] font-bold text-emerald-600 dark:text-emerald-400 mb-2">₹8,340/month</p>
                              <p className="text-[10px] text-slate-500 leading-tight flex-1">by optimizing your Food, Cabs & Subscriptions.</p>
                              <button className="text-[10px] font-semibold rounded-full border border-slate-200 dark:border-white/10 w-full py-2 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition-colors bg-slate-50/50 dark:bg-white/5 mt-auto flex items-center justify-center gap-1">View Opportunities <ArrowRight className="w-3 h-3" /></button>
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* Floating Widgets */}
               {/* 1. Top Subscription Leak */}
               <motion.div 
                 initial={{ y: -20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                 className="absolute right-0 top-6 z-20 bg-white dark:bg-[#161c31] border border-slate-200 dark:border-indigo-500/20 shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] rounded-xl p-3 flex items-center gap-3 pr-6"
               >
                 <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                   <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex shadow-[0_0_10px_rgba(99,102,241,0.3)] overflow-hidden">
                     <span className="w-full text-center mt-0.5 text-white text-[10px] font-black">P</span>
                   </div>
                 </div>
                 <div>
                   <p className="text-[11px] text-slate-500 dark:text-slate-300 font-medium">Subscription Leak</p>
                   <p className="text-[13px] font-bold text-slate-900 dark:text-white leading-tight mt-0.5">3 Unused Found</p>
                   <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">Save ₹1,200/mo <ArrowRight className="inline w-3 h-3 opacity-60" /></p>
                 </div>
               </motion.div>

               {/* 2. Bottom Left Cashback Earned */}
               <motion.div 
                 initial={{ x: -20, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ delay: 1.0, type: "spring", stiffness: 100 }}
                 className="absolute -left-6 bottom-24 z-30 bg-white/90 dark:bg-[#161cf1]/5 backdrop-blur-xl border border-slate-200 dark:border-blue-500/20 dark:bg-[#0e162d] shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] rounded-xl p-3 px-4 flex items-center gap-4 min-w-[200px]"
               >
                 <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                   <Zap className="w-4 h-4 fill-current" />
                 </div>
                 <div className="flex-1">
                   <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Cashback Earned</p>
                   <p className="text-xl font-bold text-slate-900 dark:text-white leading-tight mt-0.5">₹2,450</p>
                   <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">This Month</p>
                 </div>
               </motion.div>
               
               {/* 3. Bottom Right Goal Progress */}
               <motion.div 
                 initial={{ x: 20, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
                 className="absolute -right-4 bottom-14 z-30 bg-white dark:bg-[#0e162d] border border-slate-200 dark:border-emerald-500/20 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.2)] rounded-xl p-4 flex items-center gap-4 min-w-[240px]"
               >
                 <div className="w-11 h-11 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/30 flex items-center justify-center shrink-0">
                   <TreePine className="w-5 h-5" />
                 </div>
                 <div className="flex-1">
                   <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Goal Progress</p>
                   <p className="text-[13px] font-bold text-slate-900 dark:text-white mt-1">Goa Trip</p>
                   <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mb-1.5 flex items-center justify-between">
                     72% Completed
                   </p>
                   <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 dark:to-emerald-300 w-[72%] rounded-full shadow-[0_0_10px_#10b981]"></div>
                   </div>
                 </div>
               </motion.div>
               
            </motion.div>
          </div>

          {/* Logo Ticker */}
          <div className="mt-8 border-t border-slate-200 dark:border-white/5 py-10 z-10 relative">
             <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center justify-center gap-10">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Loved by smart savers & wealth builders
                </p>
                <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-60">
                   <div className="flex items-center gap-2 grayscale"><Logo className="h-6 w-6" /><span className="font-bold text-xl text-slate-900 dark:text-white dark:brightness-200">Groww</span></div>
                   <div className="flex items-center gap-2 grayscale"><div className="w-4 h-4 bg-slate-900 dark:bg-white -skew-x-[20deg] ml-2 mr-1"></div><span className="font-bold text-xl tracking-wider text-slate-900 dark:text-white dark:brightness-200">ZERODHA</span></div>
                   <div className="flex items-center gap-2 grayscale"><span className="font-black text-xl text-slate-900 dark:text-white tracking-[0.2em] dark:brightness-200">KUVERA</span></div>
                   <div className="flex items-center gap-2 grayscale"><span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight dark:brightness-200">IND money</span></div>
                   <div className="flex items-center gap-2 grayscale"><span className="font-bold text-xl text-slate-900 dark:text-white tracking-widest lowercase dark:brightness-200">Upstox</span></div>
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