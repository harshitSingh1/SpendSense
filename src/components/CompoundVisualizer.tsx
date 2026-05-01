import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart } from "lucide-react";

export default function CompoundVisualizer() {
  const [sip, setSip] = useState(10000);
  const returnRate = 0.12;

  const calculateFutureValue = (years: number) => {
    const monthlyRate = returnRate / 12;
    const months = years * 12;
    const fv = sip * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return fv;
  };

  const formatINR = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

  return (
    <Card className="border border-slate-200 dark:border-zinc-800 shadow-xl rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-zinc-800/50 border-b border-slate-100 dark:border-zinc-800 pb-3 px-5 pt-5">
        <CardTitle className="text-base font-black tracking-tight flex items-center gap-2 text-slate-900 dark:text-white">
          <LineChart className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          The Compounding Engine
        </CardTitle>
        <CardDescription className="text-xs font-medium text-slate-500">
          Visualize your wealth at 12% annualized return.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Monthly SIP (INR)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
            <input 
              type="number" 
              value={sip || ''}
              onChange={(e) => setSip(Number(e.target.value))}
              className="w-full pl-7 pr-3 h-11 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono font-bold text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-300 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2.5 pt-1">
          {[10, 20, 30].map((years) => (
             <div key={years} className="p-3.5 rounded-xl border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/20 flex justify-between items-center group hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-colors">
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">After {years} Years</span>
                <span className="font-mono font-black text-sm text-emerald-600 dark:text-emerald-400">{formatINR(calculateFutureValue(years))}</span>
             </div>
          ))}
        </div>

        <div className="pt-2">
          <Button 
            className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.7)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'goals' }))}
          >
            Automate My Investments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
