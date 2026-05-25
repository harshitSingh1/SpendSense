import React, { useState } from "react";
import { Loader2, Calculator, Sparkles, Receipt, ArrowRight, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";

export default function TaxOptimizerView({ user, setActiveTab }: { user?: any, setActiveTab?: any }) {
  const isPro = !!user?.isPro;
  const [ctc, setCtc] = useState("");
  const [basic, setBasic] = useState("");
  const [hra, setHra] = useState("");
  const [eightyC, setEightyC] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleOptimize = async () => {
    if (!ctc || !basic || !hra || !eightyC) return;
    
    setResult(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/tax/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ctc,
          basic,
          hra,
          eightyC
        })
      });

      if (!response.ok) {
        throw new Error("Failed to optimize taxes.");
      }

      const data = await response.json();
      setResult(data.response);
    } catch (error) {
      console.error(error);
      setResult("### Error\nFailed to generate tax optimization report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isPro) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full min-h-[60vh] text-center">
        <div className="w-20 h-20 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/20">
          <Calculator className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Tax Optimizer is a Pro Feature</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed font-medium">
          Unlock SpendSense Pro to access AI-driven tax optimization. Legally minimize your taxes with custom salary restructuring and regime analysis.
        </p>
        <Button 
          onClick={() => setActiveTab && setActiveTab('pro')}
          className="h-14 rounded-2xl px-10 font-bold text-lg bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 text-white shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)] transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Upgrade to Pro
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-700 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 text-center md:text-left">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center justify-center md:justify-start gap-2">
            <Calculator className="w-8 h-8 text-indigo-500" />
            Tax Optimizer
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium opacity-60 mt-1">
            Let Stocrates calculate your most efficient tax regime and suggest salary restructuring.
          </p>
        </div>
      </div>

      <Card className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-xl rounded-[2.5rem] overflow-hidden">
        <CardContent className="p-0">
          <div className="grid lg:grid-cols-2">
            {/* Form Section */}
            <div className="p-6 sm:p-10 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950">
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    Annual CTC (₹)
                  </label>
                  <input
                    type="number"
                    value={ctc}
                    onChange={(e) => setCtc(e.target.value)}
                    placeholder="e.g. 1500000"
                    className="w-full p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-indigo-500/20 text-sm md:text-base shadow-sm"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-blue-500" />
                    Basic Salary (₹)
                  </label>
                  <input
                    type="number"
                    value={basic}
                    onChange={(e) => setBasic(e.target.value)}
                    placeholder="e.g. 750000"
                    className="w-full p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-indigo-500/20 text-sm md:text-base shadow-sm"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-orange-500" />
                    HRA Received (₹)
                  </label>
                  <input
                    type="number"
                    value={hra}
                    onChange={(e) => setHra(e.target.value)}
                    placeholder="e.g. 300000"
                    className="w-full p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-indigo-500/20 text-sm md:text-base shadow-sm"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-purple-500" />
                    Total 80C Investments (₹)
                  </label>
                  <input
                    type="number"
                    value={eightyC}
                    onChange={(e) => setEightyC(e.target.value)}
                    placeholder="e.g. 150000"
                    className="w-full p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-indigo-500/20 text-sm md:text-base shadow-sm"
                  />
                </div>

                <Button 
                  onClick={handleOptimize}
                  disabled={isLoading || !ctc || !basic || !hra || !eightyC}
                  className="w-full h-14 rounded-2xl font-black text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_30px_-5px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_-5px_rgba(79,70,229,0.5)] transition-all mt-6"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing Tax Regimes...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Optimize My Taxes
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Results Section */}
            <div className="h-full min-h-[500px] bg-white dark:bg-zinc-900 relative">
              {!result && !isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-50">
                  <Receipt className="w-16 h-16 text-slate-400 mb-4" />
                  <p className="text-sm font-bold text-slate-500">
                    Your Optimization Report will appear here.
                  </p>
                </div>
              )}
              
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm z-10">
                  <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-6" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 animate-pulse mt-2">
                    Consulting Stocrates...
                  </p>
                </div>
              )}
              
              {result && !isLoading && (
                <div className="p-6 sm:p-10 prose prose-slate dark:prose-invert prose-headings:font-black prose-a:text-indigo-500 prose-strong:text-emerald-600 dark:prose-strong:text-emerald-400 max-w-none h-full overflow-y-auto custom-scrollbar">
                  <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-start gap-4">
                    <div className="bg-emerald-500/20 p-2 rounded-xl text-emerald-600 shrink-0">
                       <CheckCircleIcon className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="text-emerald-800 dark:text-emerald-300 font-bold m-0 text-sm">Optimization Complete</h4>
                       <p className="text-emerald-600 dark:text-emerald-400 text-xs mt-1 mb-0 font-medium">Review your regime comparison and salary restructuring options below.</p>
                    </div>
                  </div>
                  <Markdown>{result}</Markdown>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CheckCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
