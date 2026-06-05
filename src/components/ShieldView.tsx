import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  HeartPulse, 
  Siren, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  ChevronRight,
  TrendingDown,
  Loader2,
  Zap,
  ArrowUpRight
} from "lucide-react";
import { motion } from "motion/react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProtectionMetrics, ProtectionMetrics } from "../services/protectionService";
import BlackSwanSimulator from "./BlackSwanSimulator";
import AIPolicyAuditorTease from "./AIPolicyAuditorTease";
import PolicyScanner from "./PolicyScanner";
import { useCurrency, formatMoney } from "@/lib/utils/currency";

import ClaimEnforcer from "./ClaimEnforcer";

export default function ShieldView({ user, setActiveTab }: { user?: any, setActiveTab?: any }) {
  const userRegion = useCurrency();
  const [metrics, setMetrics] = useState<ProtectionMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTool, setActiveTool] = useState<'auditor' | 'enforcer'>('auditor');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getProtectionMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Failed to fetch protection metrics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary/30" />
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Calculating Resilience...</p>
      </div>
    );
  }

  const monthlyExpenses = metrics?.averageMonthlyExpense || 0;
  const currentBalance = metrics?.currentSavings || 0;
  const targetEmergencyFund = monthlyExpenses > 0 ? monthlyExpenses * 6 : 0;
  const dailyBurnRate = monthlyExpenses > 0 ? monthlyExpenses / 30 : 0;
  
  let runwayDaysDisplay = "0 Days";
  let runwayScoreValue = 0;

  if (monthlyExpenses <= 0) {
    if (currentBalance > 0) {
      runwayDaysDisplay = "Infinite (Needs Expense Data)";
      runwayScoreValue = 100;
    } else {
      runwayDaysDisplay = "0 Days";
      runwayScoreValue = 0;
    }
  } else {
    const days = Math.floor(currentBalance / dailyBurnRate);
    runwayDaysDisplay = `${days} Days`;
    runwayScoreValue = Math.min(Math.round((days / 180) * 100), 100);
  }

  // Calculate resilience score
  const resilienceScore = metrics?.protectionScore ?? runwayScoreValue;

  const radialData = [
    {
      name: "Score",
      value: resilienceScore,
      fill: resilienceScore > 50 ? "#10B981" : "#F59E0B"
    }
  ];

  const emergencyPercentage = targetEmergencyFund > 0 ? Math.min(Math.round((currentBalance / targetEmergencyFund) * 100), 100) : (monthlyExpenses <= 0 ? 0 : 100);
  const isFullyShielded = targetEmergencyFund > 0 && currentBalance >= targetEmergencyFund;
  
  const insurancePaymentsCount = metrics?.insurancePaymentsCount || 0;
  const isMedicalShielded = insurancePaymentsCount > 0;


  return (
    <div className="space-y-6 sm:space-y-10 pb-16 animate-in fade-in duration-1000">
      {/* Risk Architecture Header */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl sm:rounded-[2.5rem] bg-white dark:bg-zinc-900 overflow-hidden relative">
        <CardContent className="p-6 sm:p-8 md:p-10 relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 justify-between">
          
          <div className="flex-1 space-y-3 sm:space-y-4 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Financial Runway: {runwayDaysDisplay}
            </h2>
            <p className="text-sm sm:text-lg text-slate-500 dark:text-slate-400 font-medium">
              If your income stopped today, this is exactly how long you survive.
            </p>
          </div>

          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 shrink-0 relative flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="80%" 
                outerRadius="100%" 
                barSize={16} 
                data={radialData}
                startAngle={90} 
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  background={{ fill: 'currentColor', className:'text-slate-100 dark:text-zinc-800' }}
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white">{resilienceScore}</span>
              <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5 md:mt-1">Resilience</span>
            </div>
          </div>
          
        </CardContent>
      </Card>

      {/* Shields Grid */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
        {/* Shield 1 (Emergency Fund) */}
        <Card className="border border-slate-100 dark:border-zinc-800 shadow-sm rounded-2xl sm:rounded-[2rem] bg-white dark:bg-zinc-900 overflow-hidden hover:shadow-md transition-all duration-500">
          <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform hover:scale-110 bg-emerald-500/10 text-emerald-600 shadow-lg shadow-emerald-500/10 shrink-0">
                <Siren className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border ${isFullyShielded ? 'bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)]'}`}>
                {isFullyShielded ? (
                  <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-600 animate-pulse" />
                ) : (
                  <AlertTriangle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-600 animate-pulse" />
                )}
                <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-widest ${isFullyShielded ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {isFullyShielded ? 'Shielded' : 'Vulnerable'}
                </span>
              </div>
            </div>
            <CardTitle className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">Emergency Buffer</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {monthlyExpenses <= 0 ? (
              <p className="flex items-center text-sm font-medium text-amber-600 dark:text-amber-500 bg-amber-500/10 px-4 py-3 rounded-xl border border-amber-500/20">
                <AlertTriangle className="w-4 h-4 mr-2 shrink-0" /> Add your monthly expenses in the Omni-Tracker to calculate your target buffer.
              </p>
            ) : (
              <>
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-sm sm:text-base font-bold font-mono tracking-tight text-slate-900 dark:text-white truncate">
                    Current: {formatMoney(currentBalance, userRegion)} <span className="opacity-40">/</span> Target: {formatMoney(targetEmergencyFund, userRegion)}
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                    (6 Months) living expenses liquidity.
                  </p>
                </div>
                
                <div className="h-2.5 sm:h-3 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${emergencyPercentage}%` }}
                     transition={{ duration: 1.5, ease: "easeOut" }}
                     className={`h-full ${isFullyShielded ? 'bg-emerald-500' : 'bg-amber-500'}`}
                   />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Shield 2 (Medical Armor) */}
        <Card className={`border shadow-md rounded-2xl sm:rounded-[2rem] overflow-hidden transition-all duration-500 flex flex-col justify-between ${isMedicalShielded ? 'border-emerald-500/30 dark:border-emerald-500/20 shadow-emerald-500/5 bg-emerald-50/30 dark:bg-zinc-900' : 'border-amber-500/30 dark:border-amber-500/20 shadow-amber-500/5 bg-amber-50/30 dark:bg-zinc-900'}`}>
          <div>
            <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className={`h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform hover:scale-110 shadow-lg relative shrink-0 ${isMedicalShielded ? 'bg-emerald-500/10 text-emerald-600 shadow-emerald-500/10' : 'bg-amber-500/10 text-amber-600 shadow-amber-500/10'}`}>
                  {!isMedicalShielded && <div className="absolute inset-0 bg-amber-500/20 animate-ping rounded-xl sm:rounded-2xl" />}
                  <HeartPulse className="h-5 w-5 sm:h-6 sm:w-6 relative z-10" />
                </div>
                <div className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border ${isMedicalShielded ? 'bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)]'}`}>
                  {isMedicalShielded ? (
                    <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-600 animate-pulse" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-600 animate-pulse" />
                  )}
                  <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-widest ${isMedicalShielded ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {isMedicalShielded ? 'Shielded' : 'Vulnerable'}
                  </span>
                </div>
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">Medical Armor</CardTitle>
              <CardDescription className={`text-xs sm:text-sm font-medium mt-1 sm:mt-2 ${isMedicalShielded ? 'text-emerald-700/80 dark:text-emerald-400' : 'text-amber-700/80 dark:text-amber-400'}`}>
                {insurancePaymentsCount} Premium Payment{insurancePaymentsCount !== 1 ? 's' : ''} Detected.
              </CardDescription>
            </CardHeader>
          </div>
          {!isMedicalShielded && (
            <CardContent className="p-4 sm:p-6 pt-0 sm:pt-2">
              <a href="https://joinditto.in/" target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button 
                  className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-500/20 transition-all font-sans"
                >
                  + Audit Existing Policy
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Black Swan Simulator */}
      <BlackSwanSimulator 
        currentBalance={currentBalance} 
        dailyBurnRate={dailyBurnRate} 
        userRegion={userRegion} 
        setActiveTab={setActiveTab}
      />

      <div className="pt-8">
        {user?.isPro && (
          <div className="flex justify-center md:justify-start mb-6">
            <div className="flex gap-1 p-1 bg-slate-100 dark:bg-zinc-900 rounded-full w-fit border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
              <button 
                onClick={() => setActiveTool('auditor')}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-black tracking-tight transition-all truncate ${activeTool === 'auditor' ? 'bg-white dark:bg-zinc-800 shadow-sm text-indigo-700 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
              >
                Policy Auditor
              </button>
              <button 
                onClick={() => setActiveTool('enforcer')}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-black tracking-tight transition-all truncate ${activeTool === 'enforcer' ? 'bg-white dark:bg-zinc-800 shadow-sm text-red-600 dark:text-red-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
              >
                Claim Enforcer
              </button>
            </div>
          </div>
        )}

        {activeTool === 'auditor' || !user?.isPro ? (
          <PolicyScanner user={user} />
        ) : (
          <ClaimEnforcer user={user} />
        )}
      </div>
    </div>
  );
}
