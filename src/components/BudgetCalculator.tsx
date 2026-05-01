import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart } from "lucide-react";

export default function BudgetCalculator() {
  const [income, setIncome] = useState(100000);
  
  const needs = income * 0.5;
  const wants = income * 0.3;
  const savings = income * 0.2;

  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <Card className="border border-slate-200 dark:border-zinc-800 shadow-xl rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-zinc-800/50 border-b border-slate-100 dark:border-zinc-800 pb-3 px-5 pt-5">
        <CardTitle className="text-base font-black tracking-tight flex items-center gap-2 text-slate-900 dark:text-white">
          <PieChart className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          Your Reality Check
        </CardTitle>
        <CardDescription className="text-xs font-medium text-slate-500">
          Live 50/30/20 Blueprint Calculator
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Monthly Income (INR)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
            <input 
              type="number" 
              value={income || ''}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full pl-7 pr-3 h-11 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-3 pt-1">
          {/* Needs */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Needs (50%)</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">{formatINR(needs)}</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[50%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all" />
            </div>
          </div>
          
          {/* Wants */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Wants (30%)</span>
              <span className="font-mono font-bold text-amber-500 text-sm">{formatINR(wants)}</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[30%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all" />
            </div>
          </div>

          {/* Savings */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Savings (20%)</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">{formatINR(savings)}</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[20%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all" />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button 
            className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.7)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'goals' }))}
          >
            Apply to Tracker
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
