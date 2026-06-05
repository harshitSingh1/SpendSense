import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, HeartPulse, CarFront, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CountryCode } from "../config/pricing";
import { benchmarks } from "../config/benchmarks";
import { formatMoney } from "@/lib/utils/currency";

type DisasterType = 'Job Loss' | 'Medical Emergency' | 'Car Totaled' | null;

interface BlackSwanSimulatorProps {
  currentBalance: number;
  dailyBurnRate: number;
  userRegion?: CountryCode;
  setActiveTab?: (tab: string) => void;
}

export default function BlackSwanSimulator({ currentBalance, dailyBurnRate, userRegion = 'IN', setActiveTab }: BlackSwanSimulatorProps) {
  const [activeDisaster, setActiveDisaster] = useState<DisasterType>(null);
  
  const regionBenchmarks = benchmarks[userRegion] || benchmarks['IN'];

  const disasters = [
    {
      id: 'Job Loss' as DisasterType,
      title: 'Tech Layoff (Job Loss)',
      impact: 0,
      icon: <Briefcase className="h-6 w-6" />,
      description: 'Income = 0. Relying entirely on current liquidity.',
      cta: 'Stocrates recommends 6 months of liquid runway to survive macroeconomic downturns without accumulating high-interest debt.',
      ctaBtn: 'Calculate Buffer',
      ctaLink: '/piggy-banks?action=create&category=Emergency',
      external: false
    },
    {
      id: 'Medical Emergency' as DisasterType,
      title: 'ICU Admission',
      impact: regionBenchmarks.icuAdmission,
      icon: <HeartPulse className="h-6 w-6" />,
      description: `-${formatMoney(regionBenchmarks.icuAdmission, userRegion)} instant medical drain.`,
      cta: `A small monthly health insurance policy prevents this. Let Stocrates audit your local healthcare options in ${userRegion} and find the right one.`,
      ctaBtn: 'Find Health Insurance',
      ctaLink: 'https://joinditto.in/health-insurance/',
      external: true
    },
    {
      id: 'Car Totaled' as DisasterType,
      title: 'Vehicle Totaled',
      impact: regionBenchmarks.carTotaled,
      icon: <CarFront className="h-6 w-6" />,
      description: `-${formatMoney(regionBenchmarks.carTotaled, userRegion)} instant asset replacement cost.`,
      cta: 'Comprehensive motor insurance and a dedicated emergency fund neutralize this threat.',
      ctaBtn: 'Review Motor Policy',
      ctaLink: 'https://www.acko.com/car-insurance/',
      external: true
    }
  ];

  const activeConfig = disasters.find(d => d.id === activeDisaster);
  
  // Calculations
  const impactAmount = activeConfig ? activeConfig.impact : 0;
  const newBalance = currentBalance - impactAmount;
  const debtAccrued = newBalance < 0 ? Math.abs(newBalance) : 0;
  
  let survivingRunway = "0 Days";
  if (newBalance > 0) {
    if (dailyBurnRate > 0) {
      survivingRunway = `${Math.floor(newBalance / dailyBurnRate)} Days`;
    } else {
      survivingRunway = "Infinite";
    }
  }

  const isBankrupt = newBalance < 0;

  return (
    <Card className="border border-white/20 dark:border-zinc-800/50 shadow-xl rounded-[2.5rem] bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl overflow-hidden mt-8 relative">
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
        <AlertTriangle className="w-64 h-64" />
      </div>
      
      <CardHeader className="text-center pb-2 relative z-10">
        <CardTitle className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Stress Test Your Life</CardTitle>
        <CardDescription className="text-base text-slate-500 font-medium">Select a crisis to see if your architecture holds.</CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-8 relative z-10 space-y-6 sm:space-y-10">
        {/* The Disaster Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {disasters.map((disaster) => {
            const isActive = activeDisaster === disaster.id;
            return (
              <button
                key={disaster.id}
                onClick={() => setActiveDisaster(isActive ? null : disaster.id)}
                className={`flex flex-col p-6 rounded-3xl border transition-all duration-300 text-left relative overflow-hidden group cursor-pointer hover:-translate-y-1 ${
                  isActive 
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.2)]' 
                    : 'border-slate-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]'
                }`}
              >
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {disaster.icon}
                </div>
                <h3 className={`text-lg font-bold mb-1 ${isActive ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-800 dark:text-slate-200'}`}>
                  {disaster.title}
                </h3>
                <p className={`text-xs font-medium ${isActive ? 'text-indigo-600/80 dark:text-indigo-400/80' : 'text-slate-500 dark:text-slate-400'}`}>
                  {disaster.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* The Reaction (Visual Output) */}
        <AnimatePresence mode="wait">
          {activeDisaster && (
            <motion.div
              key={activeDisaster}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className={`p-8 rounded-[2rem] border transition-colors ${
                isBankrupt 
                  ? 'bg-red-500/10 border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.15)]' 
                  : 'bg-slate-100/50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700'
              }`}>
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Post-Crisis Projection
                  </span>
                  
                  {isBankrupt ? (
                    <div className="space-y-2">
                      <h2 className="text-4xl md:text-5xl font-black text-red-600 dark:text-red-500 tracking-tighter">
                        Bankruptcy in: 0 Days
                      </h2>
                      <p className="text-xl font-bold font-mono text-red-600/80 dark:text-red-400">
                        Debt Accrued: -{formatMoney(debtAccrued, userRegion)}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                       <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                        Surviving Runway: {survivingRunway}
                      </h2>
                      <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-500">
                        Remaining Liquidity: {formatMoney(newBalance, userRegion)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* The AI Save (CTA) */}
              <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent p-6 rounded-3xl border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed max-w-md">
                    {activeConfig?.cta}
                  </p>
                </div>
                <a
                  href={activeConfig?.ctaLink || '#'}
                  target={activeConfig?.external ? "_blank" : undefined}
                  rel={activeConfig?.external ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (!activeConfig?.external) {
                      e.preventDefault();
                      if (setActiveTab) {
                        setActiveTab('goals');
                      } else {
                        window.history.pushState({}, '', activeConfig?.ctaLink);
                        window.dispatchEvent(new CustomEvent('navigate', { detail: 'goals' }));
                      }
                    }
                  }}
                  className="inline-flex items-center justify-center shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 px-6 shadow-lg shadow-indigo-600/20 transition-colors cursor-pointer"
                >
                  {activeConfig?.ctaBtn}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
