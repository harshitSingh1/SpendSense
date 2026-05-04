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
import PortfolioGenerator from "./PortfolioGenerator";
import { getDashboardMetrics, DashboardMetrics } from "../services/dashboardService";

export default function InvestView({ user, setActiveTab }: { user?: any, setActiveTab?: any }) {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTable] = useState(true);

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

  const scrollToProjection = () => {
    document.getElementById('projection-table-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Top Section: Balance */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl sm:rounded-[2.5rem] bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-secondary/10 rounded-full -mr-16 -mt-16 sm:-mr-20 sm:-mt-20 blur-3xl shrink-0" />
        <CardContent className="p-6 sm:p-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-[10px] sm:text-sm font-medium opacity-70 mb-1 sm:mb-2 uppercase tracking-widest">Available to Invest</p>
              <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tighter">{formatINR(availableToInvest)}</h1>
              <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs opacity-60 max-w-sm leading-relaxed mx-auto md:mx-0">
                Calculated based on your current savings goals and the "50/30/20" wealth principle.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href={`/?tab=goals&action=create&category=Investment&amount=${availableToInvest}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', `/?tab=goals&action=create&category=Investment&amount=${availableToInvest}`);
                  window.dispatchEvent(new CustomEvent('navigate', { detail: 'goals' }));
                }}
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 rounded-xl sm:rounded-2xl px-6 h-12 font-bold shadow-xl shadow-black/10">
                  Move to Invest
                </Button>
              </a>
              <Button 
                variant="ghost" 
                className="w-full sm:w-auto text-white hover:text-white hover:bg-white/10 rounded-xl sm:rounded-2xl h-12 font-bold border border-white/20"
                onClick={scrollToProjection}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Projection
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <WealthSimulator defaultMonthlyInvestment={Math.max(1000, Math.round(availableToInvest))} showTable={showTable} />

      {user?.isPro ? (
        <PortfolioGenerator />
      ) : (
        <AIAllocationTease />
      )}

      {/* Execution Section */}
      <div className="pt-4 sm:pt-8">
        <div className="px-2 mb-4 sm:mb-6 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Ready to deploy your capital?</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Execute your strategy on high-trust, zero-commission platforms.</p>
        </div>
        
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
          {/* Card 1 */}
          <Card className="border border-slate-200 dark:border-zinc-800 shadow-sm rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 relative">
            <CardContent className="p-6 sm:p-8 flex-1 flex flex-col">
               <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 sm:mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">Direct Mutual Funds</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mb-6 sm:mb-8 flex-1">
                Zero commission platforms for long-term compounding.
              </p>
              <a href="https://coin.zerodha.com" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold border-slate-200 dark:border-zinc-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400 dark:hover:border-emerald-500/30 transition-colors shadow-none">
                  Explore Platforms
                </Button>
              </a>
            </CardContent>
          </Card>
          
          {/* Card 2 */}
          <Card className="border border-slate-200 dark:border-zinc-800 shadow-sm rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 relative">
            <CardContent className="p-6 sm:p-8 flex-1 flex flex-col">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 sm:mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">Hedge & Preserve</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mb-6 sm:mb-8 flex-1">
                Sovereign Gold Bonds and secure fixed-income assets.
              </p>
              <a href="https://rbiretaildirect.org.in/" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold border-slate-200 dark:border-zinc-800 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10 dark:hover:text-amber-400 dark:hover:border-amber-500/30 transition-colors shadow-none">
                  View Assets
                </Button>
              </a>
            </CardContent>
          </Card>
          
          {/* Card 3 */}
          <Card className="border border-slate-200 dark:border-zinc-800 shadow-sm rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 relative">
            <CardContent className="p-6 sm:p-8 flex-1 flex flex-col">
               <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 sm:mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">Global Diversification</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mb-6 sm:mb-8 flex-1">
                Fractional shares in global tech giants.
              </p>
              <a href="https://indmoney.com" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold border-slate-200 dark:border-zinc-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 dark:hover:border-blue-500/30 transition-colors shadow-none">
                  Invest Globally
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Educational Constraint */}
      <footer className="mt-8 sm:mt-16 bg-muted/30 border border-border/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
            <Info className="h-5 w-5" />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-muted-foreground">Legal & Regulatory Guardrails</h4>
            <p className="text-[10px] sm:text-xs leading-relaxed text-muted-foreground opacity-80">
              SpendSense AI provides financial <span className="text-foreground font-bold">educational insights and data-driven analysis</span>. We are not a SEBI/FCA licensed investment advisor. All projections are based on historical datasets and do not guarantee future results. Please consult with a certified financial professional before making critical capital allocations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


