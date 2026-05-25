import React, { useState } from "react";
import { Sparkles, Loader2, ShieldAlert, FileText, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";

export default function PolicyScanner({ user }: { user?: any }) {
  const isPro = !!user?.isPro;
  const [policyText, setPolicyText] = useState("");
  const [policyType, setPolicyType] = useState("Health Insurance");
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleScan = async () => {
    if (!policyText) return;
    
    // Create a Unique Cache Key
    const cacheKey = 'policy_scan_' + JSON.stringify({ policyText, policyType });
    
    setResult(null);
    setIsLoading(true);

    // Check the Cache First
    const cachedData = sessionStorage.getItem(cacheKey);
    
    if (cachedData) {
      // Condition A (Cache Hit - Fake Loading)
      setTimeout(() => {
        setResult(cachedData);
        setIsLoading(false);
      }, 2500);
      return;
    }

    // Condition B (Cache Miss - Real API Call)
    try {
      const response = await fetch("/api/protection/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          policyText,
          policyType
        })
      });

      if (!response.ok) {
        throw new Error("Failed to scan policy.");
      }

      const data = await response.json();
      const analysis = data.analysis;

      // Save the result string to sessionStorage
      sessionStorage.setItem(cacheKey, analysis);

      setResult(analysis);
    } catch (error) {
      console.error(error);
      setResult("### Error\nFailed to scan the policy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-xl rounded-[2.5rem] overflow-hidden mt-8">
      <CardHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b border-slate-100 dark:border-zinc-800 p-8">
        <CardTitle className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <ShieldAlert className="h-6 w-6 text-indigo-500" />
          Policy Auditor
        </CardTitle>
        <CardDescription className="text-base text-slate-500 font-medium mt-2 max-w-2xl">
          Paste your policy fine print, exclusions, or terms and conditions below. Stocrates will analyze the text for hidden clauses, sub-limits, and denied-claim loopholes.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="space-y-8 flex flex-col h-full">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" /> Policy Type
              </label>
              <div className="flex flex-wrap gap-3">
                {["Health Insurance", "Motor Insurance", "Term Life"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPolicyType(type)}
                    className={`px-5 py-3 rounded-xl text-sm font-bold border transition-all ${
                      policyType === type 
                        ? "text-indigo-600 bg-indigo-100 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-400"
                        : "border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 flex-grow flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Paste your Policy Fine Print, Exclusions, or T&Cs here
              </label>
              <textarea
                value={policyText}
                onChange={(e) => setPolicyText(e.target.value)}
                placeholder="Paste the confusing legal jargon here..."
                className="w-full flex-grow min-h-[200px] p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-indigo-500/20 text-sm md:text-base resize-none"
              />
            </div>

            <Button 
              onClick={handleScan}
              disabled={isLoading || !policyText}
              className="w-full h-14 rounded-2xl font-black text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_30px_-5px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_-5px_rgba(79,70,229,0.5)] transition-all mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Scanning for Loopholes...
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5 mr-2" />
                  Scan for Loopholes
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div className="h-full min-h-[400px] border border-slate-200 dark:border-zinc-800 rounded-3xl bg-slate-50 dark:bg-zinc-900 overflow-hidden relative">
            {!result && !isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-50">
                <FileText className="w-16 h-16 text-slate-400 mb-4" />
                <p className="text-sm font-bold text-slate-500">
                  Your Threat Report will appear here.
                </p>
              </div>
            )}
            
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-50/80 dark:bg-zinc-900/80 backdrop-blur-sm z-10">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 animate-pulse">
                  Analyzing legal text & finding loopholes...
                </p>
              </div>
            )}
            
            {result && !isLoading && (
              <>
                <div className={`p-8 prose prose-slate dark:prose-invert prose-headings:font-black prose-a:text-indigo-500 max-w-none h-full overflow-y-auto ${!isPro ? "blur-[5px] select-none pointer-events-none" : ""}`}>
                  <Markdown>{result}</Markdown>
                </div>
                {!isPro && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-white/20 dark:bg-black/20 backdrop-blur-[2px]">
                    <div className="bg-white dark:bg-zinc-900 border border-indigo-500/30 p-8 rounded-3xl shadow-2xl max-w-sm text-center">
                      <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Hidden Clauses Detected</h3>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                        🚨 Stocrates found potential loopholes in your policy. Upgrade to SpendSense Pro to reveal hidden clauses and sub-limits.
                      </p>
                      <Button onClick={() => {
                        window.history.pushState({}, '', '/pro');
                        window.dispatchEvent(new CustomEvent('navigate', { detail: 'pro' }));
                      }} className="w-full h-14 rounded-2xl font-bold text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)] transition-all">
                        Unlock Full Report
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
