import React, { useState } from "react";
import { Sparkles, Loader2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Markdown from "react-markdown";

export default function PortfolioGenerator() {
  const [age, setAge] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("Moderate");
  const [primaryGoal, setPrimaryGoal] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!age || !monthlyAmount) return;
    
    // Create a Unique Cache Key
    const cacheKey = 'wealth_' + JSON.stringify({ age, monthlyAmount, riskTolerance, primaryGoal });
    
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
      const response = await fetch("/api/wealth/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          age,
          monthlyAmount,
          riskTolerance,
          primaryGoal
        })
      });

      if (!response.ok) {
        const text = await response.text();
        let errorData: any = {};
        try {
          errorData = JSON.parse(text);
        } catch (e) {
          throw new Error(`Raw server error: ${text.substring(0, 500)}`);
        }
        throw new Error(errorData.error || "Failed to generate portfolio.");
      }

      const data = await response.json();
      const recommendation = data.recommendation;
      
      // Save the result string to sessionStorage
      sessionStorage.setItem(cacheKey, recommendation);
      
      setResult(recommendation);
    } catch (error: any) {
      console.error(error);
      setResult(`### Error\n${error.message || "Failed to generate the strategy. Please try again."}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Row 1: The Header */}
      <div className="mb-8 text-left">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-indigo-500" />
          AI Portfolio Architect
        </h2>
        <p className="mt-3 text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-3xl">
          Enter your parameters below. Our fiduciary AI model will generate a personalized Boglehead-style ETF strategy specifically tailored to your timeline.
        </p>
      </div>

      {/* Row 2: The Smart Form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Line 1 */}
        {/* Age */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Current Age
          </label>
          <Input 
            type="number"
            placeholder="e.g. 30"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full h-14 rounded-xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        {/* Monthly Investment */}
        <div className="md:col-span-3 space-y-2 relative">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Monthly Investment (₹)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-medium font-mono">₹</span>
            <Input 
              type="number"
              placeholder="e.g. 50000"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(e.target.value)}
              className="w-full h-14 pl-8 rounded-xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 text-base font-mono placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Primary Goal */}
        <div className="md:col-span-7 space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Primary Goal
          </label>
          <Input 
            type="text"
            placeholder="Retirement/Wealth Generation/House/ etc"
            value={primaryGoal}
            onChange={(e) => setPrimaryGoal(e.target.value)}
            className="w-full h-14 rounded-xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 text-base placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        {/* Line 2 */}
        {/* Risk Tolerance */}
        <div className="md:col-span-5 space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Risk Tolerance
          </label>
          <div className="relative">
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              className="w-full h-14 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white text-base appearance-none cursor-pointer"
            >
              <option value="Conservative">Conservative</option>
              <option value="Moderate">Moderate</option>
              <option value="Aggressive">Aggressive</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Generate Strategy Button */}
        <div className="md:col-span-7 flex items-end">
          <Button 
            onClick={handleGenerate}
            disabled={isLoading || !age || !monthlyAmount}
            className="w-full h-14 rounded-xl font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 active:scale-[0.99] transition-all border-0 disabled:opacity-50 disabled:hover:bg-blue-600 disabled:active:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                Generating Strategy...
              </>
            ) : (
              <>
                <Target className="w-5 h-5 mr-3" />
                Generate Strategy
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Row 3: The Output Vault */}
      <div className="mt-8 min-h-[400px] border border-slate-200 dark:border-zinc-800 rounded-3xl bg-slate-50 dark:bg-zinc-900 overflow-hidden relative shadow-inner">
        {!result && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-50">
            <Target className="w-16 h-16 text-slate-400 mb-4" />
            <p className="text-sm font-bold text-slate-500">
              Your personalized asset allocation will appear here.
            </p>
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-50/80 dark:bg-zinc-900/80 backdrop-blur-sm z-10">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 animate-pulse">
              Structuring optimal portfolio...
            </p>
          </div>
        )}
        
        {result && !isLoading && (
          <div className="p-8 prose prose-slate dark:prose-invert prose-headings:font-black prose-a:text-blue-500 max-w-none h-full overflow-y-auto">
            <Markdown>{result}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}
