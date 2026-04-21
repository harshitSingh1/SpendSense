"use client";

import React from "react";
import { 
  Shield, 
  Scale, 
  Flame, 
  Info, 
  ArrowUpRight, 
  TrendingUp, 
  Wallet,
  Coins,
  Gem,
  BarChart3
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip 
} from "recharts";
import { motion } from "motion/react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const GROWTH_DATA = [
  { year: "2024", conservative: 100, balanced: 100, aggressive: 100 },
  { year: "2025", conservative: 107, balanced: 112, aggressive: 118 },
  { year: "2026", conservative: 115, balanced: 125, aggressive: 140 },
  { year: "2027", conservative: 124, balanced: 140, aggressive: 165 },
  { year: "2028", conservative: 133, balanced: 158, aggressive: 195 },
  { year: "2029", conservative: 142, balanced: 178, aggressive: 235 },
];

export default function InvestView() {
  return (
    <div className="space-y-10 pb-16">
      {/* Top Section: Balance */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <CardContent className="p-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-medium opacity-70 mb-2 uppercase tracking-widest">Available to Invest</p>
              <h1 className="text-5xl font-mono font-bold tracking-tighter">₹32,240.50</h1>
              <p className="mt-4 text-xs opacity-60 max-w-sm leading-relaxed">
                Calculated based on your current savings goals and the "50/30/20" wealth principle.
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-primary hover:bg-white/90 rounded-2xl px-6 h-12 font-bold shadow-xl shadow-black/10">
                Move to Invest
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10 rounded-2xl h-12 font-bold border border-white/20">
                <BarChart3 className="h-4 w-4 mr-2" />
                Projection
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Tiers Heading */}
      <div className="px-2">
        <h2 className="text-2xl font-bold tracking-tight">Select your Risk Architecture</h2>
        <p className="text-sm text-muted-foreground mt-1 underline decoration-secondary decoration-2 underline-offset-4">Understand the spectrum of wealth creation.</p>
      </div>

      {/* Risk Tiers Horizontal Scroll / Bento Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Conservative */}
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl h-full flex flex-col group overflow-hidden">
            <div className="h-2 w-full bg-accent" />
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Shield className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-accent/5 text-accent border-none text-[10px] uppercase font-black tracking-widest">Low Risk</Badge>
              </div>
              <CardTitle className="text-xl font-bold">Capital Preservation</CardTitle>
              <CardDescription>Steady, reliable growth with minimal volatility.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GROWTH_DATA}>
                    <Area type="monotone" dataKey="conservative" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.05} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <EducationItem icon={<PlusCircleIcon />} title="Asset Type" value="FDs, Gilts, Gold" />
                <EducationItem icon={<TrendingUp className="h-4 w-4" />} title="Hist. Return" value="6% - 8% p.a." />
                <EducationItem icon={<Scale className="h-4 w-4" />} title="Allocation" value="20% - 30%" />
              </div>
              <Button className="w-full mt-4 rounded-xl bg-muted text-foreground group-hover:bg-accent group-hover:text-white transition-all shadow-none">
                Explore Fixed Assets
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Balanced */}
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl h-full flex flex-col group overflow-hidden">
            <div className="h-2 w-full bg-secondary" />
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <Scale className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-secondary/5 text-secondary border-none text-[10px] uppercase font-black tracking-widest">Medium Risk</Badge>
              </div>
              <CardTitle className="text-xl font-bold">Strategic Wealth</CardTitle>
              <CardDescription>Balancing risk with market-beating returns.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
               <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GROWTH_DATA}>
                    <Area type="monotone" dataKey="balanced" stroke="#10B981" fill="#10B981" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <EducationItem icon={<Gem className="h-4 w-4" />} title="Asset Type" value="Index Funds, Blue Chip" />
                <EducationItem icon={<TrendingUp className="h-4 w-4" />} title="Hist. Return" value="12% - 15% p.a." />
                <EducationItem icon={<Scale className="h-4 w-4" />} title="Allocation" value="40% - 60%" />
              </div>
              <Button className="w-full mt-4 rounded-xl bg-muted text-foreground group-hover:bg-secondary group-hover:text-white transition-all shadow-none">
                Explore Index Funds
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Aggressive */}
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl h-full flex flex-col group overflow-hidden relative">
            <div className="h-2 w-full bg-amber-500" />
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                  <Flame className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-amber-500/5 text-amber-500 border-none text-[10px] uppercase font-black tracking-widest">High Risk</Badge>
              </div>
              <CardTitle className="text-xl font-bold">Exponential Alpha</CardTitle>
              <CardDescription>Maximized upside for long-term horizons.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
               <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GROWTH_DATA}>
                    <Area type="monotone" dataKey="aggressive" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <EducationItem icon={<Coins className="h-4 w-4" />} title="Asset Type" value="Mid/Small Cap, Crypto" />
                <EducationItem icon={<TrendingUp className="h-4 w-4" />} title="Hist. Return" value="18% - 30% p.a." />
                <EducationItem icon={<Scale className="h-4 w-4" />} title="Allocation" value="10% - 20%" />
              </div>
              
              <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/10">
                 <p className="text-[10px] text-amber-600 font-bold leading-tight">
                   Note: High chance of volatility. Only invest capital you can afford to hold for 5+ years.
                 </p>
              </div>

              <Button className="w-full rounded-xl bg-muted text-foreground group-hover:bg-amber-500 group-hover:text-white transition-all shadow-none">
                Explore Emerging Mkts
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Educational Constraint */}
      <footer className="mt-16 bg-muted/30 border border-border/50 rounded-3xl p-8">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
            <Info className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Legal & Regulatory Guardrails</h4>
            <p className="text-xs leading-relaxed text-muted-foreground opacity-80">
              SpendSense AI provides financial <span className="text-foreground font-bold">educational insights and data-driven analysis</span>. We are not a SEBI/FCA licensed investment advisor. All projections are based on historical datasets and do not guarantee future results. Please consult with a certified financial professional before making critical capital allocations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function EducationItem({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/50 pb-3">
      <div className="flex items-center gap-3">
        <div className="text-muted-foreground opacity-40">{icon}</div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{title}</p>
      </div>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}

function PlusCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}
