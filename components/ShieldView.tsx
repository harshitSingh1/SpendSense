"use client";

import React from "react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  HeartPulse, 
  Users, 
  Siren, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  ChevronRight,
  TrendingDown
} from "lucide-react";
import { motion } from "motion/react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function ShieldView({ metrics }: { metrics: any }) {
  const currentBalance = metrics?.currentBalance || 0;
  const avgMonthlyExpense = metrics?.avgMonthlyExpense || 0;
  const emergencyFundTarget = metrics?.emergencyFundTarget || 0;
  const isFunded = metrics?.isFunded || false;
  const progress = emergencyFundTarget > 0 ? Math.min(100, Math.round((currentBalance / emergencyFundTarget) * 100)) : 0;
  const runwayMonths = avgMonthlyExpense > 0 ? (currentBalance / avgMonthlyExpense).toFixed(1) : "0";

  const shields = [
    {
      id: "health",
      title: "Health Insurance",
      desc: "Comprehensive medical safety net.",
      coverage: "$ / € / ₹ 5,00,000 Recommended",
      status: "action_needed",
      icon: <HeartPulse className="h-6 w-6" />,
      insight: "A basic plan could reduce out-of-pocket risk for your profile by up to 80%."
    },
    {
      id: "life",
      title: "Term Life Insurance",
      desc: "Income protection for your dependents.",
      coverage: "$ / € / ₹ 1,00,00,000 Target",
      status: "action_needed",
      icon: <Users className="h-6 w-6" />,
      insight: "Term life is your primary inheritance pillar if you have dependents."
    },
    {
      id: "emergency",
      title: "Emergency Fund",
      desc: "6 Months of living expenses.",
      coverage: `${currentBalance.toLocaleString()} / ${emergencyFundTarget.toLocaleString()}`,
      status: isFunded ? "active" : "action_needed",
      current: progress,
      icon: <Siren className="h-6 w-6" />,
      insight: `You've secured ${runwayMonths} months of runway. You are ${progress}% towards absolute liquidity.`
    }
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* AI Risk Analysis Header */}
      <Card className="border-none shadow-[0_8px_32px_rgba(15,23,42,0.06)] rounded-[2.5rem] bg-card overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <ShieldAlert className="h-64 w-64 rotate-12" />
        </div>
        <CardContent className="p-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="h-16 w-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-2xl shadow-primary/20 shrink-0">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">AI Risk Intelligence</h2>
              </div>
              <p className="text-2xl font-bold tracking-tight leading-snug">
                "Based on your average monthly spending of <span className="text-secondary italic font-mono">$ / € / ₹ {avgMonthlyExpense.toLocaleString()}</span>, we recommend {emergencyFundTarget > 0 ? `a shield of ${emergencyFundTarget.toLocaleString()}` : "establishing an emergency fund"} to prevent <span className="underline decoration-destructive/30 decoration-2 underline-offset-4">catastrophic debt</span>."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shields Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shields.map((shield) => (
          <ShieldCard key={shield.id} shield={shield} />
        ))}
      </div>

      {/* Protective Education Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl bg-muted/20">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              The "Why" Behind The Shield
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-4">
            <p>
              Risk management isn't about the products; it's about <span className="text-foreground font-semibold">financial resilience</span>. Our Shield Analysis looks at your cash flow and liability profile to find "cracks" in your defense.
            </p>
            <p>
              An uncovered medical emergency or loss of income can wipe out years of disciplined investing in just 48 hours. We prioritize protection over performance.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl bg-primary/5">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2 text-primary">
              <TrendingDown className="h-4 w-4" />
              Impact on Growing Wealth
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-4">
            <p>
              Securing these shields lowers your <span className="text-foreground font-semibold italic">Emotional Volatility</span>. When your downside is protected, you can take smarter, long-term risks with your "Growth Capital" in the Wealth Hub.
            </p>
            <Button variant="link" className="p-0 h-auto text-xs text-secondary font-bold uppercase tracking-widest gap-1 hover:no-underline">
              Analyze liability risk <ChevronRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Educational Footer */}
      <footer className="text-center py-10 opacity-50">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em]">SpendSense Guardian Protocol v1.4</p>
      </footer>
    </div>
  );
}

function ShieldCard({ shield }: any) {
  const isActionNeeded = shield.status === "action_needed";

  return (
    <Card className={`border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl ${isActionNeeded ? 'hover:ring-1 hover:ring-amber-500/20' : 'hover:ring-1 hover:ring-secondary/20'}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${isActionNeeded ? 'bg-amber-500/10 text-amber-600' : 'bg-secondary/10 text-secondary'}`}>
            {shield.icon}
          </div>
          {isActionNeeded ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest">Action Needed</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
              <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
              <span className="text-[10px] font-black uppercase text-secondary tracking-widest">Active Shield</span>
            </div>
          )}
        </div>
        <CardTitle className="text-xl font-bold tracking-tight">{shield.title}</CardTitle>
        <CardDescription className="text-xs font-medium">{shield.desc}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-2">Coverage Analytics</p>
          <p className="text-sm font-bold font-mono text-foreground">{shield.coverage}</p>
          {shield.id === "emergency" && (
            <div className="mt-4 space-y-2">
              <Progress value={shield.current} className="h-1.5 bg-muted" />
              <p className="text-[9px] font-black text-right text-muted-foreground uppercase tracking-tighter italic">Stability Progress</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold text-muted-foreground underline decoration-1 underline-offset-4">AI Intelligence</p>
          <p className="text-xs italic leading-relaxed text-muted-foreground/80">"{shield.insight}"</p>
        </div>

        <Button 
          className={`w-full h-11 rounded-xl font-bold text-xs uppercase tracking-widest gap-2 transition-all ${isActionNeeded ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        >
          {isActionNeeded ? 'Review Protection' : 'Shield Details'}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
