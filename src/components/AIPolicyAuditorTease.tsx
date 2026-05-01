import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Lock, ShieldAlert, Sparkles, Search } from "lucide-react";

export default function AIPolicyAuditorTease() {
  return (
    <Card className="border border-indigo-500/10 dark:border-indigo-500/5 shadow-xl rounded-[2.5rem] bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 overflow-hidden relative mt-8">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <Sparkles className="w-64 h-64 text-indigo-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center p-1 relative z-10">
        
        {/* Left Side: Pitch */}
        <div className="p-6 md:p-10 md:pr-0 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
            <Search className="h-3 w-3" />
            <span>Premium AI Ensemble</span>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              The Premium Policy Auditor.
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Stop paying for junk insurance. Upload your policy PDFs, and let Stocrates scan the fine print for hidden clauses, terrible ROIs, and denied-claim loopholes in seconds.
            </p>
          </div>
        </div>

        {/* Right Side: The Visual Tease & Paywall */}
        <div className="relative p-8 h-full min-h-[350px] flex items-center justify-center">
          {/* Blurred Background UI */}
          <div className="absolute inset-0 bg-slate-900/5 dark:bg-black/20 rounded-l-3xl overflow-hidden border-l border-white/20 dark:border-white/5 flex flex-col justify-center p-6 blur-md select-none pointer-events-none opacity-60">
            <div className="space-y-4 animate-pulse">
              <div className="h-4 w-1/3 bg-slate-300 dark:bg-slate-700 rounded-md" />
              <div className="h-6 w-3/4 bg-slate-400 dark:bg-slate-600 rounded-md" />
              
              <div className="mt-8 p-4 bg-white dark:bg-zinc-800 rounded-xl border border-slate-200 dark:border-zinc-700 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Search className="h-4 w-4" />
                  <span className="font-mono text-xs">Analyzing LIC Endowment Plan...</span>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
                  <span className="text-red-700 dark:text-red-400 font-bold text-sm">Alert: 4% ROI Detected.</span>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">Recommendation: Surrender & move to Term + Index.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Unblurred Paywall Card */}
          <div className="relative z-20 w-full max-w-sm bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-white/50 dark:border-zinc-700/50 p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] text-center space-y-6 transform hover:scale-105 transition-transform duration-500">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 relative">
              <FileText className="h-8 w-8 text-white absolute opacity-50" />
              <Lock className="h-6 w-6 text-white relative z-10 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Unlock AI Document Scanning
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Pro users can upload unlimited insurance policies and contracts for Stocrates to audit.
              </p>
            </div>

            <a 
              href="/pro" 
              className="w-full inline-block"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('navigate', { detail: 'pro' }));
              }}
            >
              <Button className="w-full h-12 rounded-xl text-white font-bold transition-all bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.7)] group relative overflow-hidden">
                 <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[shine_1.5s_ease-out_infinite]" />
                 Upgrade to Pro to Audit Policies
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}
