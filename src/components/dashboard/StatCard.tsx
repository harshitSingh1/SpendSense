import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowUpRight, TrendingDown } from "lucide-react";

export function StatCard({ title, amount, icon, color }: { title: string, amount: string, icon: React.ReactNode, color: 'emerald' | 'destructive' | 'primary' }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm hover:scale-[1.01] transition-all">
       <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-3 sm:mb-4 border border-slate-100 dark:border-white/5">
         {React.cloneElement(icon as any, { className: "h-4 w-4 sm:h-5 sm:w-5 text-slate-700 dark:text-slate-300" })}
       </div>
       <div className="text-[10px] sm:text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</div>
       <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 truncate">{amount}</div>
       <div className={`text-xs font-semibold flex items-center gap-1 ${color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : color === 'destructive' ? 'text-red-500 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
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
    ? 'bg-amber-50 text-amber-600 border-amber-100' 
    : 'bg-emerald-50 text-emerald-600 border-emerald-100';

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
