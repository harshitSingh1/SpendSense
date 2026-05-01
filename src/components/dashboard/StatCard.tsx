import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowUpRight, TrendingDown } from "lucide-react";

export function StatCard({ title, amount, icon, color }: { title: string, amount: string, icon: React.ReactNode, color: 'emerald' | 'destructive' | 'primary' }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
       <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center mb-4 border border-slate-100 dark:border-zinc-700">
         {React.cloneElement(icon as any, { className: "h-5 w-5 text-slate-700 dark:text-slate-300" })}
       </div>
       <div className="text-sm font-medium text-slate-500 mb-1">{title}</div>
       <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{amount}</div>
       <div className={`text-xs font-semibold flex items-center gap-1 ${color === 'emerald' ? 'text-emerald-600' : color === 'destructive' ? 'text-red-500' : 'text-slate-500'}`}>
         {color === 'emerald' ? <ArrowUpRight className="h-3 w-3" /> : color === 'destructive' ? <TrendingDown className="h-3 w-3" /> : <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />} {color === 'emerald' ? '+Active Intel' : color === 'destructive' ? 'Tracked' : 'Updated just now'}
       </div>
    </div>
  );
}

export interface AlertItemProps {
  color: 'amber' | 'emerald';
  icon: React.ReactNode;
  title: string;
  desc: string;
  key?: React.Key;
}

export function AlertItem({ color, icon, title, desc }: AlertItemProps) {
  const colorClasses = color === 'amber' 
    ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20' 
    : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20';

  return (
    <div className={`flex items-start gap-3 p-4 rounded-2xl border ${colorClasses}`}>
      <div className="mt-0.5">{icon}</div>
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-wider">{title}</p>
        <p className="text-sm font-medium leading-relaxed opacity-90">{desc}</p>
      </div>
    </div>
  );
}
