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
import { useCurrency, formatMoney } from "@/lib/utils/currency";

export default function ShieldView() {
  const userRegion = useCurrency();
  const [metrics, setMetrics] = useState<ProtectionMetrics | null>(null);
  const [loading, setLoading] = useState(true);

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

  const averageMonthlyExpenses = metrics?.averageMonthlyExpense || 11566; // Fallback data
  const currentBalance = metrics?.currentSavings || 87802;
  const targetEmergencyFund = metrics?.targetEmergencyFund || (averageMonthlyExpenses * 6);
  const dailyBurnRate = averageMonthlyExpenses / 30;
  const runwayDays = dailyBurnRate > 0 ? Math.floor(currentBalance / dailyBurnRate) : 0;
  
  // Calculate resilience score
  const resilienceScore = metrics?.protectionScore ?? Math.min(Math.round((runwayDays / 180) * 100), 100);

  const radialData = [
    {
      name: "Score",
      value: resilienceScore,
      fill: resilienceScore > 50 ? "#10B981" : "#F59E0B"
    }
  ];

  const emergencyPercentage = targetEmergencyFund > 0 ? Math.min(Math.round((currentBalance / targetEmergencyFund) * 100), 100) : 100;
  const isFullyShielded = currentBalance >= targetEmergencyFund;


  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-1000">
      {/* Risk Architecture Header */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] bg-white dark:bg-zinc-900 overflow-hidden relative">
        <CardContent className="p-6 md:p-10 relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 justify-between">
          
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Financial Runway: {runwayDays} Days
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              If your income stopped today, this is exactly how long you survive.
            </p>
          </div>

          <div className="w-48 h-48 sm:w-64 sm:h-64 shrink-0 relative flex flex-col items-center justify-center">
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
              <span className="text-5xl font-black text-slate-900 dark:text-white">{resilienceScore}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Resilience</span>
            </div>
          </div>
          
        </CardContent>
      </Card>

      {/* Shields Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Shield 1 (Emergency Fund) */}
        <Card className="border border-slate-100 dark:border-zinc-800 shadow-sm rounded-[2rem] bg-white dark:bg-zinc-900 overflow-hidden hover:shadow-md transition-all duration-500">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center transition-transform hover:scale-110 bg-emerald-500/10 text-emerald-600 shadow-lg shadow-emerald-500/10">
                <Siren className="h-6 w-6" />
              </div>
              <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full border ${isFullyShielded ? 'bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)]'}`}>
                {isFullyShielded ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                ) : (
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
                )}
                <span className={`text-[10px] font-black uppercase tracking-widest ${isFullyShielded ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {isFullyShielded ? 'Fully Shielded' : 'Vulnerable'}
                </span>
              </div>
            </div>
            <CardTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Emergency Buffer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <p className="text-base font-bold font-mono tracking-tight text-slate-900 dark:text-white">
                Current: {formatMoney(currentBalance, userRegion)} <span className="opacity-40">/</span> Target: {formatMoney(targetEmergencyFund, userRegion)}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                (6 Months) living expenses liquidity.
              </p>
            </div>
            
            <div className="h-3 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${emergencyPercentage}%` }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 className={`h-full ${isFullyShielded ? 'bg-emerald-500' : 'bg-amber-500'}`}
               />
            </div>
          </CardContent>
        </Card>

        {/* Shield 2 (Medical Armor) */}
        <Card className="border border-amber-500/30 dark:border-amber-500/20 shadow-md shadow-amber-500/5 rounded-[2rem] bg-amber-50/30 dark:bg-zinc-900 overflow-hidden transition-all duration-500 flex flex-col justify-between">
          <div>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="h-14 w-14 rounded-2xl flex items-center justify-center transition-transform hover:scale-110 bg-amber-500/10 text-amber-600 shadow-lg shadow-amber-500/10 relative">
                  <div className="absolute inset-0 bg-amber-500/20 animate-ping rounded-2xl" />
                  <HeartPulse className="h-6 w-6 relative z-10" />
                </div>
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
                  <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest">Vulnerable</span>
                </div>
              </div>
              <CardTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Medical Armor</CardTitle>
              <CardDescription className="text-sm font-medium text-amber-700/80 dark:text-amber-400 mt-2">
                0 Premium Payments Detected.
              </CardDescription>
            </CardHeader>
          </div>
          <CardContent className="pt-2">
            <a href="https://ditto.in" target="_blank" rel="noopener noreferrer" className="block w-full">
              <Button 
                className="w-full h-14 rounded-2xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-500/20 transition-all font-sans"
              >
                Patch Vulnerability
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Black Swan Simulator */}
      <BlackSwanSimulator currentBalance={currentBalance} dailyBurnRate={dailyBurnRate} userRegion={userRegion} />

      <AIPolicyAuditorTease />
    </div>
  );
}
