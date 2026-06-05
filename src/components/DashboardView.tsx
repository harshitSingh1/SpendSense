import React, { useState, useEffect } from "react";
import { 
  AlertCircle, 
  Zap, 
  ArrowUpRight, 
  ShieldCheck, 
  TrendingDown, 
  Clock,
  Loader2,
  TrendingUp,
  Wallet,
  Target,
  Briefcase,
  Activity,
  History,
  ChevronRight,
  TrendingUp as TrendingUpIcon,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";
import { useCurrency, formatMoney } from "@/lib/utils/currency";

import { AlertItem, StatCard } from "./dashboard/StatCard";
import SpendingDonutChart from "./dashboard/SpendingDonutChart";
import CashflowTrendChart from "./dashboard/CashflowTrendChart";
import RecentActivityWidget from "./dashboard/RecentActivityWidget";
import { FinancialCalendar } from "./dashboard/FinancialCalendar";
import { getDashboardMetrics, saveCalendarNote, DashboardMetrics } from "../services/dashboardService";
import { getGoals, GoalData } from "../services/goalService";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardTour from "./DashboardTour";

export default function DashboardView({ timeRange }: { timeRange?: 'monthly' | 'yearly' | 'all' }) {
  const currency = useCurrency();
  const [session, setSession] = useState<any>(null);
  const [rawMetrics, setRawMetrics] = useState<DashboardMetrics | null>(null);
  const [goals, setGoals] = useState<GoalData[]>([]);
  const [loading, setLoading] = useState(true);

  const activeTimeRange = timeRange || 'monthly';

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        try {
          const sessionRes = await fetch("/api/auth/session", { credentials: "include" });
          if (sessionRes.ok) {
            const sessionData = await sessionRes.json();
            setSession(sessionData);
          }
        } catch (sessionErr) {}

        const metricsData = await getDashboardMetrics(activeTimeRange);
        setRawMetrics(metricsData);

        const goalsData = await getGoals();
        setGoals(goalsData || []);
      } catch (error) {
        console.error("Dashboard init failed:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [activeTimeRange]);

  const metrics = React.useMemo(() => {
    if (!rawMetrics) return null;
    let totalIncome = rawMetrics.totalIncome || 0;
    let totalExpenses = rawMetrics.totalExpenses || 0;
    const currentBalance = totalIncome - totalExpenses;

    const healthScore = rawMetrics.healthScore ?? 50;

    return {
      ...rawMetrics,
      totalIncome,
      totalExpenses,
      currentBalance,
      healthScore,
    };
  }, [rawMetrics]);

  if (loading && !metrics) {
    return (
      <div className="flex h-[600px] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary/30" />
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">Scanning Intelligence...</p>
      </div>
    );
  }

  const activeGoals = goals.filter(g => g.status === 'active').slice(0, 3);
  const healthScore = metrics?.healthScore ?? 50;
  const healthStatus = healthScore >= 80 ? "Excellent" : healthScore >= 50 ? "Stable" : "Needs Review";

  const dispatchNavigation = (tab: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: tab }));
  };

  return (
    <div className="space-y-6 md:space-y-10 pb-10 max-w-7xl mx-auto w-full overflow-hidden text-slate-100">
      <DashboardTour />
      
      {/* TIER 1: The Pulse (Top Row) */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Income"
            amount={formatMoney(metrics?.totalIncome ?? 0, currency)}
            icon={<TrendingUp />}
            color="emerald"
          />
          <StatCard 
            title="Expenses"
            amount={formatMoney(metrics?.totalExpenses ?? 0, currency)}
            icon={<TrendingDown />}
            color="destructive"
          />
          <StatCard 
            title="Balance"
            amount={formatMoney(metrics?.currentBalance ?? 0, currency)}
            icon={<Wallet />}
            color="primary"
          />
        </div>
      </section>

      {/* TIER 3: Secondary (Bottom Row) */}
      <section className="pt-8 border-t border-slate-200 dark:border-white/10">
         <div className="mb-6 px-2">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-slate-400" />
            Analytics & Reconnaissance
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Deep-dive visualizations and Stocrates insights</p>
        </div>

        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-8 mb-8">
          <Card className="xl:col-span-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="p-6 border-b border-slate-100">
              <CardTitle className="text-xl font-serif font-bold text-slate-900">Financial Calendar</CardTitle>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Transaction Pulse & Memos</p>
            </CardHeader>
            <CardContent className="h-auto xl:min-h-[450px] p-6 flex flex-col overflow-x-auto">
               <div className="flex-1 min-w-[300px]">
                <FinancialCalendar 
                  dailyCashflow={metrics?.dailyCashflow || []} 
                  calendarNotes={metrics?.calendarNotes || {}} 
                  monthlyTransactions={metrics?.monthlyTransactions || []}
                  onSaveNote={async (date, content) => {
                     await saveCalendarNote(date, content);
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="xl:col-span-4 flex flex-col gap-8">
             <Card className="bg-white border border-slate-100 rounded-[2rem] shadow-sm flex-1 flex flex-col hover:shadow-md transition-shadow">
              <CardHeader className="p-6 border-b border-slate-100">
                <CardTitle className="text-xl font-serif font-bold text-slate-900">Recent Pulse</CardTitle>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Latest Transactions</p>
              </CardHeader>
              <CardContent className="flex-1 p-6 z-10 text-slate-700">
                <RecentActivityWidget transactions={metrics?.monthlyTransactions || []} />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
          <Card className="lg:col-span-12 xl:col-span-4 bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="p-6 border-b border-slate-100">
              <CardTitle className="text-xl font-serif font-bold text-slate-900">Spending Allocation</CardTitle>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">{activeTimeRange === 'monthly' ? 'Monthly' : activeTimeRange === 'yearly' ? 'Yearly' : 'All Time'} Categorization</p>
            </CardHeader>
            <CardContent className="h-72 lg:h-96 px-6 py-6 flex flex-col items-center justify-center">
              <SpendingDonutChart data={metrics?.categoryAllocation || []} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-12 xl:col-span-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="p-6 border-b border-slate-100">
              <CardTitle className="text-xl font-serif font-bold text-slate-900">Cashflow Trends</CardTitle>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Income vs Expenses Over Time</p>
            </CardHeader>
            <CardContent className="h-72 lg:h-96 px-6 py-6">
              <CashflowTrendChart data={metrics?.dailyCashflow || []} />
            </CardContent>
          </Card>
        </div>

        {/* Command Center */}
        <div className="mt-8 mb-8">
          <div className="mb-6 px-2">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Zap className="h-6 w-6 text-emerald-500" />
              Command Center
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Quick access to core operational zones</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            
            <button 
              onClick={() => dispatchNavigation('history')}
              className="group flex flex-col items-start p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[2rem] hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-emerald-500/30 transition-all text-left relative overflow-hidden shadow-sm hover:shadow-md"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-10 transform translate-x-4 group-hover:translate-x-0 transition-all text-slate-900 dark:text-white">
                <History className="h-20 w-20" />
              </div>
              <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-4 rounded-2xl mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <History className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Omni-Tracker</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Centralize and audit all historical transactions across accounts.</p>
            </button>

            <button 
              onClick={() => dispatchNavigation('wealth')}
              className="group flex flex-col items-start p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[2rem] hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-emerald-500/30 transition-all text-left relative overflow-hidden shadow-sm hover:shadow-md"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-10 transform translate-x-4 group-hover:translate-x-0 transition-all text-slate-900 dark:text-white">
                <Briefcase className="h-20 w-20" />
              </div>
              <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-4 rounded-2xl mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Briefcase className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Portfolio Architect</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Simulate and structure compound wealth strategies.</p>
            </button>

            <button 
              onClick={() => dispatchNavigation('shield')}
              className="group flex flex-col items-start p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[2rem] hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-emerald-500/30 transition-all text-left relative overflow-hidden shadow-sm hover:shadow-md"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-10 transform translate-x-4 group-hover:translate-x-0 transition-all text-slate-900 dark:text-white">
                <ShieldCheck className="h-20 w-20" />
              </div>
              <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-4 rounded-2xl mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Policy Auditor</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Secure emergency funds and establish financial life rafts.</p>
            </button>

            <button 
              onClick={() => dispatchNavigation('goals')}
              className="group flex flex-col items-start p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[2rem] hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-emerald-500/30 transition-all text-left relative overflow-hidden shadow-sm hover:shadow-md"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-10 transform translate-x-4 group-hover:translate-x-0 transition-all text-slate-900 dark:text-white">
                <Target className="h-20 w-20" />
              </div>
              <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-4 rounded-2xl mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Target className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Piggy Banks</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Allocate funds to specific targets and track savings momentum.</p>
            </button>

          </div>
        </div>

        {/* AI Stocrates Entry */}
        <div className="mt-8">
          <Card className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-emerald-500/30 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow dark:shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-50 to-transparent dark:from-emerald-500/10 pointer-events-none" />
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3 mb-2">
                  <Zap className="h-8 w-8 text-emerald-500 dark:text-emerald-400" />
                  Stocrates AI Coach
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium max-w-xl text-lg">
                  Access hyper-personalized strategic advisory based on your live telemetry and cash flow footprint.
                </p>
              </div>
              <Button 
                size="lg" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/20 px-8 py-6 text-lg w-full md:w-auto"
                onClick={() => dispatchNavigation('analytics')}
              >
                Engage AI Coach
              </Button>
            </div>
          </Card>
        </div>
      </section>

    </div>
  );
}

