import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingDown } from "lucide-react";

export default function InflationErosion() {
  const [savings, setSavings] = useState(500000);
  const [years, setYears] = useState(10);
  const inflationRate = 0.06;

  // Purchasing power formula: Future Value = Present Value / (1 + inflation)^years
  const futurePurchasingPower = savings / Math.pow(1 + inflationRate, years);
  const totalLost = savings - futurePurchasingPower;

  const formatINR = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

  return (
    <Card className="border border-slate-200 dark:border-zinc-800 shadow-xl rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-zinc-800/50 border-b border-slate-100 dark:border-zinc-800 pb-3 px-5 pt-5">
        <CardTitle className="text-base font-black tracking-tight flex items-center gap-2 text-slate-900 dark:text-white">
          <TrendingDown className="h-4 w-4 text-red-500" />
          The Erosion Check
        </CardTitle>
        <CardDescription className="text-xs font-medium text-slate-500">
          Calculate the hidden cost of holding cash.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Current Cash Savings (INR)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
            <input 
              type="number" 
              value={savings || ''}
              onChange={(e) => setSavings(Number(e.target.value))}
              className="w-full pl-7 pr-3 h-11 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono font-bold text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder:text-slate-300 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Years in Bank</label>
          <input 
            type="number" 
            value={years || ''}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full px-4 h-11 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono font-bold text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder:text-slate-300 dark:text-white"
          />
        </div>

        <div className="p-5 mt-2 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 space-y-2">
          <p className="text-sm font-medium text-red-800 dark:text-red-400">At 6% inflation, {formatINR(savings)} purchasing power becomes:</p>
          <p className="text-3xl font-black text-red-600 dark:text-red-500">{formatINR(futurePurchasingPower)}</p>
          <p className="text-xs font-bold text-red-700/60 dark:text-red-400/60">You effectively lose <span className="text-red-700 dark:text-red-400">{formatINR(totalLost)}</span> in value.</p>
        </div>

        <div className="pt-2">
          <Button 
            className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.7)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'goals' }))}
          >
            Start Investing
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
