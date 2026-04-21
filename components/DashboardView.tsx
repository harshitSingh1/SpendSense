"use client";

import React, { useState, useEffect } from "react";
import { 
  PieChart as RePieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
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

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CHART_COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function DashboardView({ initialMetrics }: { initialMetrics?: any }) {
  const [metrics, setMetrics] = useState<any>(initialMetrics || null);
  const [loading, setLoading] = useState(!initialMetrics);

  useEffect(() => {
    if (!initialMetrics) {
      fetchMetrics();
    }
  }, [initialMetrics]);

  const fetchMetrics = async () => {
    try {
      const res = await fetch("/api/dashboard/metrics");
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
    } catch (error) {
      console.error("Dashboard fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[600px] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary/30" />
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">Scanning Intelligence...</p>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">Sign in to view your financial intelligence.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Top Stat Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard 
          title="Monthly Income" 
          amount={`₹${metrics.totalIncome.toLocaleString()}`} 
          icon={<TrendingUp className="h-5 w-5" />} 
          color="emerald"
        />
        <StatCard 
          title="Monthly Expenses" 
          amount={`₹${metrics.totalExpenses.toLocaleString()}`} 
          icon={<TrendingDown className="h-5 w-5" />} 
          color="destructive"
        />
        <StatCard 
          title="Current Balance" 
          amount={`₹${(metrics.totalIncome - metrics.totalExpenses).toLocaleString()}`} 
          icon={<Wallet className="h-5 w-5" />} 
          color="primary"
        />
      </div>

      {/* Top Charts Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {/* Pie Chart: Categories */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Spending Allocation</CardTitle>
            <CardDescription>Monthly breakdown by category</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            {metrics.expensesByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={metrics.expensesByCategory}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {metrics.expensesByCategory.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                    }} 
                    formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Spent']}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }} />
                </RePieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center px-6">
                <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                  Not enough data to generate insights.<br/>Log your expenses to see your financial breakdown.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bar Chart: Daily Spending */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Daily Activity</CardTitle>
            <CardDescription>Financial pulse over the current month</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            {metrics.dailySpending.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.dailySpending}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8' }} 
                    tickFormatter={(val) => val.split('-')[2]}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8' }} 
                    tickFormatter={(val) => `₹${val}`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                    }} 
                    formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Spent']}
                  />
                  <Bar name="Activity" dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
             ) : (
              <div className="flex h-full items-center justify-center text-center px-6">
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                  Log your activity to see your monthly pulse.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Grid: Health Score, Alerts, Chrome Ext */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Health Score */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl flex flex-col items-center justify-center py-8">
          {(() => {
            const savings = metrics.totalIncome - metrics.totalExpenses;
            const healthScore = metrics.totalIncome > 0 ? Math.max(0, Math.min(100, Math.round((savings / metrics.totalIncome) * 100))) : null;
            const scoreLabel = healthScore === null ? "N/A" : 
                             healthScore > 80 ? "Excellent" :
                             healthScore > 50 ? "Good" :
                             healthScore > 20 ? "Fair" : "Warning";

            return (
              <>
                <div className="relative flex items-center justify-center">
                  <svg className="h-32 w-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted/20"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="351.85"
                      initial={{ strokeDashoffset: 351.85 }}
                      animate={{ strokeDashoffset: healthScore === null ? 351.85 : 351.85 * (1 - healthScore / 100) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={healthScore === null ? "text-muted/40" : healthScore > 50 ? "text-secondary" : "text-primary"}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-mono text-4xl font-bold tracking-tighter">{healthScore ?? '--'}</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground opacity-60">Score</span>
                  </div>
                </div>
                <div className="mt-6 text-center px-6">
                  <h4 className="font-bold">Financial Health: {scoreLabel}</h4>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {healthScore === null 
                      ? "Log your income to calculate your health score."
                      : healthScore > 50 
                        ? `You are saving ${healthScore}% of your income. Great work!` 
                        : "Focus on reducing expenses to improve your health score."}
                  </p>
                </div>
              </>
            );
          })()}
        </Card>

        {/* Smart Alerts */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-destructive" />
              <CardTitle className="text-lg font-bold">Smart Intelligence</CardTitle>
            </div>
            <CardDescription>AI-driven alerts for your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <AlertItem 
              color="amber"
              icon={<Clock className="h-4 w-4" />}
              title="Subscription Renewal"
              desc="Hulu Premium renews in 2 days ($18.99)"
            />
            <AlertItem 
              color="emerald"
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Identity Clear"
              desc="No suspicious login attempts detected"
            />
            <AlertItem 
              color="amber"
              icon={<AlertCircle className="h-4 w-4" />}
              title="High Weekend Spending"
              desc="You spent 25% more than usual this SAT-SUN"
            />
          </CardContent>
        </Card>

        {/* Chrome Extension Placeholder */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 opacity-50 transition-opacity group-hover:opacity-100" />
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white mb-4">
              <Chrome className="h-6 w-6" />
            </div>
            <CardTitle className="text-lg font-bold">Browser Companion</CardTitle>
            <CardDescription className="leading-relaxed">
              Track impulse buying in real-time. Our Chrome Extension adds a SpendSense guard to your favorite stores.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button className="w-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all rounded-xl gap-2 group">
              Connect Extension
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
            <div className="mt-4 flex items-center justify-center gap-1.5 py-1 px-3 rounded-full bg-muted/50 w-fit mx-auto border border-border/50">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground opacity-80 letter-spacing-tight">Private Beta</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, amount, icon, color }: { title: string, amount: string, icon: React.ReactNode, color: 'emerald' | 'destructive' | 'primary' }) {
  const colorMap = {
    emerald: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
    destructive: 'text-primary bg-primary/5 border-primary/10',
    primary: 'text-secondary bg-secondary/10 border-secondary/20'
  };

  return (
    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden relative group">
      <div className={`absolute top-0 left-0 w-1 h-full ${color === 'emerald' ? 'bg-emerald-500' : color === 'destructive' ? 'bg-primary' : 'bg-secondary'}`} />
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">{title}</p>
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${colorMap[color]}`}>
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-2xl font-mono font-bold tracking-tighter">{amount}</h3>
        <div className="mt-2 flex items-center gap-1">
          <div className={`h-1.5 w-1.5 rounded-full ${color === 'emerald' ? 'bg-emerald-500' : color === 'destructive' ? 'bg-primary/40' : 'bg-secondary'}`} />
          <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-40 tracking-tight">Active Intel</p>
        </div>
      </CardContent>
    </Card>
  );
}

function AlertItem({ color, icon, title, desc }: { color: 'amber' | 'emerald', icon: React.ReactNode, title: string, desc: string }) {
  const colorClasses = color === 'amber' 
    ? 'bg-destructive/10 text-destructive border-destructive/20' 
    : 'bg-secondary/10 text-secondary border-secondary/20';

  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl border ${colorClasses}`}>
      <div className="mt-0.5">{icon}</div>
      <div className="space-y-0.5">
        <p className="text-[11px] font-bold uppercase tracking-wider">{title}</p>
        <p className="text-xs font-medium leading-tight opacity-90">{desc}</p>
      </div>
    </div>
  );
}
