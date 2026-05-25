import React, { useState, useEffect } from "react";
import { 
  AlertCircle, 
  Zap, 
  ArrowUpRight, 
  Chrome, 
  ShieldCheck, 
  TrendingDown, 
  Clock,
  Loader2,
  TrendingUp,
  Wallet
} from "lucide-react";
import { motion } from "motion/react";
import { useCurrency, formatMoney } from "@/lib/utils/currency";

import { StatCard, AlertItem } from "./dashboard/StatCard"; // I'll move these out if needed, but for now just cleanup
import SpendingDonutChart from "./dashboard/SpendingDonutChart";
import CashflowTrendChart from "./dashboard/CashflowTrendChart";
import RecentActivityWidget from "./dashboard/RecentActivityWidget";
import { FinancialCalendar } from "./dashboard/FinancialCalendar";
import { getDashboardMetrics } from "../services/dashboardService";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardView() {
  const currency = useCurrency();
  const [session, setSession] = useState<any>(null);
  const [rawMetrics, setRawMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'monthly' | 'yearly' | 'all'>('monthly');

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        // Fetch session safely
        try {
          const sessionRes = await fetch("/api/auth/session", { credentials: "include" });
          if (sessionRes.ok) {
            const sessionData = await sessionRes.json();
            setSession(sessionData);
          }
        } catch (sessionErr) {
          console.warn("Could not fetch session, proceeding to metrics fetch:", sessionErr);
        }

        // Fetch metrics once for 'all' time
        const metricsData = await getDashboardMetrics('all');
        setRawMetrics(metricsData);
      } catch (error) {
        console.error("Dashboard init failed:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []); // Run only once on mount

  const metrics = React.useMemo(() => {
    if (!rawMetrics) return null;
    if (timeRange === 'all') return rawMetrics;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const filteredTransactions = (rawMetrics.monthlyTransactions || []).filter((t: any) => {
      const d = new Date(t.date);
      if (timeRange === 'monthly') {
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      }
      if (timeRange === 'yearly') {
        return d.getFullYear() === currentYear;
      }
      return true;
    });

    const filteredCashflow = (rawMetrics.dailyCashflow || []).filter((c: any) => {
      const d = new Date(c.date);
      if (timeRange === 'monthly') {
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      }
      if (timeRange === 'yearly') {
        return d.getFullYear() === currentYear;
      }
      return true;
    });

    let totalIncome = 0;
    let totalExpenses = 0;
    const catMap: Record<string, number> = {};

    filteredTransactions.forEach((t: any) => {
      if (t.type === 'income') {
        totalIncome += t.amount;
      } else if (t.type === 'expense') {
        totalExpenses += t.amount;
        catMap[t.category] = (catMap[t.category] || 0) + t.amount;
      }
    });

    const categoryAllocation = Object.entries(catMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const currentBalance = totalIncome - totalExpenses;

    let healthScore = 50; 
    if (totalIncome === 0 && totalExpenses > 0) {
      healthScore = 10;
    } else if (totalIncome > 0) {
      const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
      healthScore = Math.min(Math.max(60 + savingsRate, 0), 100);
    }
    healthScore = Math.round(healthScore);

    return {
      ...rawMetrics,
      totalIncome,
      totalExpenses,
      currentBalance,
      healthScore,
      categoryAllocation,
      monthlyTransactions: filteredTransactions,
      dailyCashflow: filteredCashflow
    };
  }, [rawMetrics, timeRange]);

  if (loading && !metrics) {
    return (
      <div className="flex h-[600px] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary/30" />
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">Scanning Intelligence...</p>
      </div>
    );
  }

  const userName = session?.user?.name?.split(' ')[0] || 'Member';
  
  // Use backend-calculated health metrics
  const healthScore = metrics?.healthScore ?? 50;
  const isHealthy = healthScore >= 70;
  const healthStatus = healthScore >= 80 ? "Excellent" : healthScore >= 50 ? "Stable" : "Needs Review";

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10 pb-10 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Time Range Filter */}
      <div className="flex justify-center sm:justify-end mb-4 sm:mb-6">
        <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-800 scale-90 sm:scale-100">
          <button 
            onClick={() => setTimeRange('monthly')}
            className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${timeRange === 'monthly' ? 'bg-white dark:bg-zinc-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setTimeRange('yearly')}
            className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${timeRange === 'yearly' ? 'bg-white dark:bg-zinc-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Yearly
          </button>
          <button 
            onClick={() => setTimeRange('all')}
            className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${timeRange === 'all' ? 'bg-white dark:bg-zinc-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Top Row: Metrics (Metrics) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        <div className="col-span-1">
          <StatCard 
            title="Income" 
            amount={formatMoney(metrics?.totalIncome ?? 0, currency)} 
            icon={<TrendingUp className="h-5 w-5" />} 
            color="emerald"
          />
        </div>
        <div className="col-span-1">
          <StatCard 
            title="Expenses" 
            amount={formatMoney(metrics?.totalExpenses ?? 0, currency)} 
            icon={<TrendingDown className="h-5 w-5" />} 
            color="destructive"
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <StatCard 
            title="Balance" 
            amount={formatMoney(metrics?.currentBalance ?? 0, currency)} 
            icon={<Wallet className="h-5 w-5" />} 
            color="primary"
          />
        </div>
      </div>

      {/* Top Row: Financial Calendar & Recent Activity */}
      <div className="flex flex-col xl:grid xl:grid-cols-12 gap-6 sm:gap-8">
        <Card className="xl:col-span-8 border border-slate-100 dark:border-zinc-800 shadow-sm rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden">
          <CardHeader className="p-4 sm:p-6 pb-2 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50">
            <CardTitle className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">Financial Calendar</CardTitle>
            <CardDescription className="text-[10px] sm:text-xs font-semibold tracking-wide text-slate-500">Transaction Pulse & Memos</CardDescription>
          </CardHeader>
          <CardContent className="h-auto xl:min-h-[450px] p-4 sm:p-6 flex flex-col bg-white dark:bg-zinc-900 overflow-x-auto">
            <div className="flex-1 min-w-[300px]">
              <FinancialCalendar 
                dailyCashflow={metrics?.dailyCashflow || []} 
                calendarNotes={metrics?.calendarNotes || {}} 
                monthlyTransactions={metrics?.monthlyTransactions || []}
                onSaveNote={async (date, content) => {
                   await import('../services/dashboardService').then(m => m.saveCalendarNote(date, content));
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-4 border border-slate-100 dark:border-zinc-800 shadow-sm rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden flex flex-col">
          <CardHeader className="p-4 sm:p-6 pb-2 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50">
            <CardTitle className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">Recent Pulse</CardTitle>
            <CardDescription className="text-[10px] sm:text-xs font-semibold tracking-wide text-slate-500">Latest Transactions</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-4 sm:p-6 min-h-0">
            <RecentActivityWidget transactions={metrics?.monthlyTransactions || []} />
          </CardContent>
        </Card>
      </div>

      {/* Middle Row: Visuals */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
        {/* Spending Allocation */}
        <Card className="lg:col-span-12 xl:col-span-4 border border-slate-100 dark:border-zinc-800 shadow-sm rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden">
          <CardHeader className="pb-2 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50">
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-white">Spending Allocation</CardTitle>
            <CardDescription className="text-xs font-semibold tracking-wide text-slate-500">Monthly Categorization</CardDescription>
          </CardHeader>
          <CardContent className="h-72 lg:h-96 px-6 py-6 flex flex-col items-center justify-center">
            <SpendingDonutChart data={metrics?.categoryAllocation || []} />
          </CardContent>
        </Card>

        {/* Cashflow Trends */}
        <Card className="lg:col-span-12 xl:col-span-8 border border-slate-100 dark:border-zinc-800 shadow-sm rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden">
          <CardHeader className="pb-2 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50">
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-white">Cashflow Trends</CardTitle>
            <CardDescription className="text-xs font-semibold tracking-wide text-slate-500">Income vs Expenses Over Time</CardDescription>
          </CardHeader>
          <CardContent className="h-72 lg:h-96 px-6 py-6">
            <CashflowTrendChart data={metrics?.dailyCashflow || []} />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: AI Insights (Smart Intelligence) */}
      <div className="grid gap-8 lg:grid-cols-12 items-stretch">
        {/* Financial Health Score */}
        <Card className="lg:col-span-5 border border-slate-100 dark:border-zinc-800 shadow-sm rounded-3xl bg-white dark:bg-zinc-900 flex flex-col items-center justify-center py-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="h-20 w-20 text-emerald-500" />
          </div>
          
          <div className="relative flex items-center justify-center mb-6 scale-75 sm:scale-100 transition-transform">
            <svg className="h-40 w-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-slate-100 dark:text-zinc-800"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray="439.8"
                initial={{ strokeDashoffset: 439.8 }}
                animate={{ strokeDashoffset: 439.8 * (1 - healthScore/100) }}
                transition={{ duration: 2, ease: "easeOut" }}
                className={healthScore >= 80 ? "text-emerald-500" : healthScore >= 50 ? "text-amber-500" : "text-red-500"}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-5xl font-black tracking-tighter text-slate-900 dark:text-white">{healthScore}</span>
              <span className="text-[10px] uppercase font-black text-slate-500 opacity-60 -mt-1 tracking-[0.2em]">Pulse Scale</span>
            </div>
          </div>
          
          <div className="text-center px-4 sm:px-10">
            <h4 className="text-lg sm:text-xl font-bold flex items-center justify-center gap-2 text-slate-800 dark:text-slate-100">
              Health Status: <span className={healthScore >= 80 ? "text-emerald-600" : healthScore >= 50 ? "text-amber-600" : "text-red-500"}>{healthStatus}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-3 font-medium leading-relaxed italic">
              {healthScore >= 80 
                ? "Excellent. Your income inflow safely covers your expenses." 
                : healthScore >= 50 
                ? "Stable. Your cash flow is positive but recommend optimizing discretionary spending."
                : "Attention Needed. Your burn rate is currently high relative to your income inflow."}
            </p>
          </div>
        </Card>

        {/* Smart Alerts */}
        <Card className="lg:col-span-7 border border-slate-100 dark:border-zinc-800 shadow-sm rounded-3xl bg-white dark:bg-zinc-900">
          <CardHeader className="pb-4 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 rounded-t-3xl">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-500 animate-pulse" />
              <CardTitle className="text-lg font-bold text-slate-800 dark:text-white">Smart Intelligence</CardTitle>
            </div>
            <CardDescription className="text-xs font-semibold tracking-wide text-slate-500">AI-Driven Alerts</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 py-6 px-6">
            {metrics?.smartAlerts && metrics.smartAlerts.length > 0 ? (
              metrics.smartAlerts.map((alert: any) => (
                <AlertItem 
                  key={alert.id}
                  color={alert.type === 'Warning' ? 'amber' : alert.type === 'Success' ? 'emerald' : 'emerald'}
                  icon={alert.type === 'Warning' ? <Clock className="h-4 w-4" /> : alert.type === 'Success' ? <ShieldCheck className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  title={alert.title}
                  desc={alert.message}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 opacity-40">
                <ShieldCheck className="h-10 w-10 mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest">No anomalies detected</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
