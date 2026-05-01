import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Lock, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const data = [
  { name: "Hidden Asset A", value: 45 },
  { name: "Hidden Asset B", value: 25 },
  { name: "Hidden Asset C", value: 15 },
  { name: "Hidden Asset D", value: 10 },
  { name: "Hidden Asset E", value: 5 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"];

export default function AIAllocationTease() {
  return (
    <Card className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-xl rounded-[2.5rem] overflow-hidden relative group">
      <CardHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b border-slate-100 dark:border-zinc-800 p-8 z-10 relative">
        <CardTitle className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-emerald-500" />
          Stocrates Dynamic Portfolio
        </CardTitle>
        <CardDescription className="text-base text-slate-500 font-medium mt-2 max-w-2xl">
          Generic advice fails. Let our syndicate of elite AI models analyze your volatility and expense ratios to generate a mathematically optimal asset allocation.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0 relative h-[500px]">
        {/* Blurred Chart Layer */}
        <div className="absolute inset-0 z-0 p-8 filter blur-[8px] opacity-60 pointer-events-none transition-all duration-700 group-hover:blur-md">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={160}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
            {data.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-sm font-bold text-slate-400 capitalize">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Unblurred Paywall Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 shadow-2xl rounded-3xl p-8 max-w-md text-center transform transition-all duration-500 hover:scale-105">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 text-emerald-500 flex items-center justify-center rounded-2xl mb-6 shadow-inner border border-emerald-500/20 relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
              <Lock className="w-8 h-8 relative z-10" />
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
              Unlock Your Personalized Strategy
            </h3>
            
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 leading-relaxed">
              Pro users get real-time portfolio generation and rebalancing alerts based on their live cash flow data.
            </p>
            
            <a 
              href="/pro" 
              className="w-full inline-block"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('navigate', { detail: 'pro' }));
              }}
            >
              <Button className="w-full h-14 rounded-xl text-white font-bold text-base shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.7)] transition-all bg-emerald-600 hover:bg-emerald-500 relative overflow-hidden group/btn">
                 <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/btn:animate-[shine_1.5s_ease-out_infinite]" />
                 Upgrade to SpendSense Pro
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
