import React, { useState } from "react";
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
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./ui/Logo";

interface LandingPageProps {
  onGetStarted: () => void;
  onViewTerms?: () => void;
  onViewPrivacy?: () => void;
  onViewContact?: () => void;
  user?: any;
}

export default function LandingPage({ onGetStarted, onViewTerms, onViewPrivacy, onViewContact, user }: LandingPageProps) {
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
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-foreground">
            <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-emerald-600 transition-colors">Pricing</a>
          </nav>
          <Button variant="ghost" size="sm" onClick={onGetStarted} className="md:flex gap-2 font-bold hover:bg-emerald-500/10 hover:text-emerald-600">
            {user ? "Dashboard" : "Sign In"} <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* 1. The Hero Section */}
        <section className="relative pt-32 pb-32 text-center overflow-hidden">
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-8 leading-[1.1]">
              Move Beyond Passive Budgeting.<br/>
              <span className="text-emerald-500">Engineer Your Wealth.</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-slate-500 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              SpendSense AI is your proactive Financial Intelligence Engine. Stop looking in the rear-view mirror.
            </p>
            <Button 
              size="lg" 
              className="h-16 px-10 rounded-full text-xl font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_40px_-10px_#10b981] hover:shadow-[0_0_60px_-15px_#10b981] transition-all hover:scale-105" 
              onClick={onGetStarted}
            >
              Get Started Free <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </section>

        {/* 2. The 'Old vs. New' Grid */}
        <section className="py-24 bg-slate-50 dark:bg-zinc-900/50 border-y border-slate-200 dark:border-white/5">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Side: Old Budgeting Apps */}
              <div className="bg-slate-100 dark:bg-slate-800/50 p-10 rounded-[2rem] border border-red-500/10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-red-500/10 rounded-xl">
                    <TrendingDown className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-300">Old Budgeting Apps</h3>
                </div>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <XCircle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-200">Reactive Analysis</span>
                      <p className="text-slate-500 dark:text-slate-400 mt-1">Tells you what you spent after the money is already gone.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <XCircle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-200">Manual Spreadsheets</span>
                      <p className="text-slate-500 dark:text-slate-400 mt-1">Requires hours of data entry and categorizing receipts.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <XCircle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-200">Confusing Charts</span>
                      <p className="text-slate-500 dark:text-slate-400 mt-1">Endless pie charts that offer zero actionable insights.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Right Side: SpendSense AI */}
              <div className="bg-slate-900 dark:bg-slate-900 border border-emerald-500/30 p-10 rounded-[2rem] shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)] relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <div className="p-3 bg-emerald-500/20 rounded-xl">
                    <BrainCircuit className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">SpendSense AI</h3>
                </div>
                <ul className="space-y-6 relative z-10">
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white">Predictive AI</span>
                      <p className="text-slate-400 mt-1">Forecasts cash flow and stops bad spending before it happens.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white">Automated Policy Auditing</span>
                      <p className="text-slate-400 mt-1">Continuously scans your finances for vulnerabilities and risks.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white">Dynamic Wealth Architecting</span>
                      <p className="text-slate-400 mt-1">Automatically routes money to optimize for compound growth.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Interactive Feature Tabs */}
        <section id="features" className="py-32">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">A complete ecosystem for financial dominance.</h2>
            </div>
            
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <button 
                onClick={() => setActiveTab('track')}
                className={`px-8 py-4 rounded-xl font-bold transition-all text-lg ${activeTab === 'track' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-zinc-700'}`}
              >
                Track
              </button>
              <button 
                onClick={() => setActiveTab('protect')}
                className={`px-8 py-4 rounded-xl font-bold transition-all text-lg ${activeTab === 'protect' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-zinc-700'}`}
              >
                Protect
              </button>
              <button 
                onClick={() => setActiveTab('grow')}
                className={`px-8 py-4 rounded-xl font-bold transition-all text-lg ${activeTab === 'grow' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-zinc-700'}`}
              >
                Grow
              </button>
            </div>

            {/* Tab Content */}
            <div className="rounded-[2rem] border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-12 shadow-xl">
              {activeTab === 'track' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-6">
                      <ListPlus className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-black mb-4 text-slate-900 dark:text-white">The Omni-Tracker</h3>
                    <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                      Say goodbye to manual categorization. The Omni-Tracker captures every financial pulse across all your accounts, instantly categorizing and contextualizing your spending with zero friction.
                    </p>
                    <ul className="space-y-3 font-semibold text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Unified history logs</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Auto-categorization AI</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Real-time burn rate sync</li>
                    </ul>
                  </div>
                  <div className="flex-1 h-64 rounded-2xl bg-slate-100 dark:bg-zinc-950 flex items-center justify-center border border-slate-200 dark:border-zinc-800 w-full object-cover">
                     <History className="h-24 w-24 text-slate-300 dark:text-zinc-800" />
                  </div>
                </div>
              )}

              {activeTab === 'protect' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-6">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-black mb-4 text-slate-900 dark:text-white">Policy Auditor</h3>
                    <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                      Never get caught off guard. The Auditor continuously monitors your exposure, ensuring your emergency funds are adequate and your insurance policies actually cover your risks.
                    </p>
                    <ul className="space-y-3 font-semibold text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Emergency fund monitoring</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Risk exposure alerts</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Automated compliance checks</li>
                    </ul>
                  </div>
                  <div className="flex-1 h-64 rounded-2xl bg-slate-100 dark:bg-zinc-950 flex items-center justify-center border border-slate-200 dark:border-zinc-800 w-full object-cover">
                     <ShieldCheck className="h-24 w-24 text-slate-300 dark:text-zinc-800" />
                  </div>
                </div>
              )}

              {activeTab === 'grow' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-6">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-black mb-4 text-slate-900 dark:text-white">Portfolio Architect</h3>
                    <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                      Structure your compound growth like a professional. The Architect simulates long-term outcomes and helps you dynamically re-allocate capital toward your highest-yield opportunities.
                    </p>
                    <ul className="space-y-3 font-semibold text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Asset allocation models</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Scenario simulations</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Goal-based capital routing</li>
                    </ul>
                  </div>
                  <div className="flex-1 h-64 rounded-2xl bg-slate-100 dark:bg-zinc-950 flex items-center justify-center border border-slate-200 dark:border-zinc-800 w-full object-cover">
                     <TrendingUp className="h-24 w-24 text-slate-300 dark:text-zinc-800" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-muted/20">
        <div className="container mx-auto px-6 md:px-10 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Logo className="h-6 w-6" />
              <span className="font-sonsie tracking-normal text-lg bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 dark:from-violet-400 dark:via-blue-400 dark:to-emerald-400">SpendSense</span>
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