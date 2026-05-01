import React, { useState, useEffect } from "react";
import { 
  Info, 
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Globe,
  Loader2
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import WealthSimulator from "./WealthSimulator";
import AIAllocationTease from "./AIAllocationTease";
import { getDashboardMetrics, DashboardMetrics } from "../services/dashboardService";

export default function InvestView() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDashboardMetrics();
        setMetrics(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const investTarget = (metrics?.totalIncome || 0) * 0.20;
  // Make sure to round it to look neat, or limit it to current balance as requested
  const availableToInvest = Math.max(0, Math.min(investTarget, metrics?.currentBalance || 0));

  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

  return (
    <div className="space-y-10 pb-16">
      {/* Top Section: Balance */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <CardContent className="p-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-medium opacity-70 mb-2 uppercase tracking-widest">Available to Invest</p>
              <h1 className="text-5xl font-mono font-bold tracking-tighter">{formatINR(availableToInvest)}</h1>
              <p className="mt-4 text-xs opacity-60 max-w-sm leading-relaxed">
                Calculated based on your current savings goals and the "50/30/20" wealth principle.
              </p>
            </div>
            <div className="flex gap-3">
              <a 
                href={`/?tab=goals&action=create&category=Investment&amount=${availableToInvest}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', `/?tab=goals&action=create&category=Investment&amount=${availableToInvest}`);
                  window.dispatchEvent(new CustomEvent('navigate', { detail: 'goals' }));
                }}
              >
                <Button className="bg-white text-primary hover:bg-white/90 rounded-2xl px-6 h-12 font-bold shadow-xl shadow-black/10">
                  Move to Invest
                </Button>
              </a>
              <Button 
                variant="ghost" 
                className="text-white hover:text-white hover:bg-white/10 rounded-2xl h-12 font-bold border border-white/20"
                onClick={() => {
                  const val = !showTable;
                  setShowTable(val);
                  if (val) {
                    setTimeout(() => {
                      document.getElementById('projection-table-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }
                }}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                {showTable ? 'Hide Details' : 'Projection'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <WealthSimulator defaultMonthlyInvestment={Math.max(1000, Math.round(availableToInvest))} showTable={showTable} />

      <AIAllocationTease />

      {/* Execution Section */}
      <div className="pt-8">
        <div className="px-2 mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Ready to deploy your capital?</h2>
          <p className="text-sm text-muted-foreground mt-1">Execute your strategy on high-trust, zero-commission platforms.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <Card className="border border-slate-200 dark:border-zinc-800 shadow-sm rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 relative">
            <CardContent className="p-8 flex-1 flex flex-col">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Direct Mutual Funds</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                Zero commission platforms for long-term compounding.
              </p>
              <a href="https://coin.zerodha.com" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-slate-200 dark:border-zinc-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400 dark:hover:border-emerald-500/30 transition-colors shadow-none">
                  Explore Platforms
                </Button>
              </a>
            </CardContent>
          </Card>
          
          {/* Card 2 */}
          <Card className="border border-slate-200 dark:border-zinc-800 shadow-sm rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 relative">
            <CardContent className="p-8 flex-1 flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Hedge & Preserve</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                Sovereign Gold Bonds and secure fixed-income assets.
              </p>
              <a href="https://www.rbi.org.in/Scripts/BS_SwarnVol.aspx" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-slate-200 dark:border-zinc-800 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10 dark:hover:text-amber-400 dark:hover:border-amber-500/30 transition-colors shadow-none">
                  View Assets
                </Button>
              </a>
            </CardContent>
          </Card>
          
          {/* Card 3 */}
          <Card className="border border-slate-200 dark:border-zinc-800 shadow-sm rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 relative">
            <CardContent className="p-8 flex-1 flex flex-col">
               <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Global Diversification</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                Fractional shares in global tech giants.
              </p>
              <a href="https://indmoney.com" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-slate-200 dark:border-zinc-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 dark:hover:border-blue-500/30 transition-colors shadow-none">
                  Invest Globally
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
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


