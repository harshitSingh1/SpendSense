import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Loader2, Key, CheckCircle2, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { getPricing } from "../config/pricing";

interface CheckoutPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function CheckoutPage({ onBack, onSuccess }: CheckoutPageProps) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [durationUnlocked, setDurationUnlocked] = useState<number | null>(null);
  const { width, height } = useWindowSize();
  const pricing = getPricing();

  // Get plan from query params
  const [plan, setPlan] = useState<string>("quarterly");
  const [currentPrice, setCurrentPrice] = useState<number>(pricing.quarterly);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");
    if (planParam === "monthly" || planParam === "yearly" || planParam === "quarterly") {
      setPlan(planParam);
      if (planParam === "monthly") setCurrentPrice(pricing.monthly);
      if (planParam === "quarterly") setCurrentPrice(pricing.quarterly);
      if (planParam === "yearly") setCurrentPrice(pricing.yearly);
    } else {
      setCurrentPrice(pricing.quarterly);
    }
  }, [pricing]);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/checkout/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code }),
      });

      const resData = await res.json();
      
      if (!res.ok) {
        throw new Error(resData.error || "Failed to redeem code");
      }

      setStatus("success");
      setCurrentPrice(0); // FREE
      if (resData.durationMonths) {
        setDurationUnlocked(resData.durationMonths);
      }
      
      // Complete after 3 seconds
      setTimeout(() => {
        onSuccess();
      }, 3000);

    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  const planName = plan.charAt(0).toUpperCase() + plan.slice(1);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-slate-900 dark:text-white flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {status === "success" && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti 
            width={width} 
            height={height} 
            recycle={false} 
            numberOfPieces={600} 
            gravity={0.15}
          />
        </div>
      )}

      {/* Header */}
      <header className="w-full border-b border-slate-200 dark:border-white/10 bg-white dark:bg-black/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="font-bold text-lg tracking-tight">SpendSense Pro</div>
        <div className="w-16" /> {/* Spacer */}
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
        
        {/* Left Column: Order Summary */}
        <div className="order-2 lg:order-1 flex flex-col pt-4">
          <h2 className="text-xl font-medium text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-widest text-sm">Order Summary</h2>
          
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-200 dark:border-white/10">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">SpendSense Pro - {planName}</h1>
              <p className="text-slate-500 dark:text-slate-400">Recurring billing. Cancel anytime.</p>
            </div>
            <div className="text-right">
              <div className="text-3xl lg:text-4xl font-bold tracking-tighter">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentPrice}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={currentPrice === 0 ? "text-emerald-500" : ""}
                  >
                    {pricing.symbol}{currentPrice}
                  </motion.span>
                </AnimatePresence>
              </div>
              {currentPrice > 0 && <div className="text-sm text-slate-500 mt-1 uppercase tracking-wider">{pricing.currency}</div>}
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <h3 className="text-lg font-bold">What's included:</h3>
            <ul className="space-y-4">
              {[
                "Unlimited AI Predictive Planning",
                "Advanced Wealth Projections",
                "Priority Email & Chat Support",
                "Custom Dynamic Tracking Categories",
                "Zero platform ads or restrictions"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="h-6 w-6 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total due today</span>
              <span className={currentPrice === 0 ? "text-emerald-500 text-2xl" : "text-2xl"}>{pricing.symbol}{currentPrice}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Payment & Redemption */}
        <div className="order-1 lg:order-2 space-y-10 pt-4">
          
          {/* The Beta Lockout (Payment Details) */}
          <section className="relative">
            <h2 className="text-xl font-medium text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-widest text-sm">Payment Details</h2>
            
            <div className="relative rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900 p-6 overflow-hidden">
              
              {/* Mock Inputs (Locked) */}
              <div className="opacity-30 grayscale blur-[2px] pointer-events-none space-y-4 select-none">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Card Information</label>
                  <div className="relative">
                    <Input disabled value="**** **** **** 4242" className="pl-10 h-12" />
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry</label>
                    <Input disabled value="MM / YY" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CVC</label>
                    <Input disabled value="123" className="h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name on Card</label>
                  <Input disabled value="SpendSense User" className="h-12" />
                </div>
              </div>

              {/* Lockout Glass Overlay */}
              <div className="absolute inset-0 z-10 bg-slate-50/60 dark:bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center border border-white/20 dark:border-white/5 rounded-2xl">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2">Beta Trial Active</h3>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 max-w-[280px] leading-relaxed">
                  Direct payments are temporarily disabled. Secure Pro access via contest giveaways or invite codes.
                </p>
              </div>

            </div>
          </section>

          {/* The Promo Code Vault */}
          <section>
             <h2 className="text-xl font-medium text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-widest text-sm">Have an invite code?</h2>
             <div className="rounded-2xl border border-indigo-100 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/20 p-6 shadow-inner ring-1 ring-inset ring-indigo-500/10">
               
               {status === "success" ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex flex-col items-center justify-center py-6 text-center"
                 >
                   <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 border-4 border-emerald-50 dark:border-emerald-500/10">
                     <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                   </div>
                   <h3 className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 mb-2">Access Granted</h3>
                   {durationUnlocked ? (
                     <p className="text-slate-600 dark:text-slate-400 font-medium whitespace-pre-line">
                       Successfully unlocked {durationUnlocked} months of SpendSense Pro!
                       Redirecting to dashboard...
                     </p>
                   ) : (
                     <p className="text-slate-600 dark:text-slate-400 font-medium">Your account has been upgraded. Redirecting to dashboard...</p>
                   )}
                 </motion.div>
               ) : (
                 <form onSubmit={handleRedeem} className="space-y-4">
                   <div className="relative">
                     <Input 
                        placeholder="Enter your VIP access code" 
                        value={code} 
                        onChange={e => {
                          setCode(e.target.value.toUpperCase());
                          setStatus("idle");
                        }}
                        className={`pl-12 h-14 text-lg font-bold tracking-widest uppercase bg-white dark:bg-black/50 border-slate-200 dark:border-white/10 focus:ring-indigo-500/50 transition-all ${status === 'error' ? 'border-rose-500/50 focus:ring-rose-500/50' : ''}`}
                      />
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                   </div>
                   
                   <AnimatePresence>
                     {status === "error" && (
                       <motion.div 
                         initial={{ opacity: 0, y: -10, height: 0 }}
                         animate={{ opacity: 1, y: 0, height: 'auto' }}
                         exit={{ opacity: 0, y: -10, height: 0 }}
                         className="text-rose-500 dark:text-rose-400 text-sm font-medium mt-2 flex items-center gap-2"
                       >
                         <div className="w-1 h-1 rounded-full bg-rose-500" />
                         {errorMessage}
                       </motion.div>
                     )}
                   </AnimatePresence>

                   <Button 
                     type="submit" 
                     disabled={!code.trim() || status === "loading"} 
                     className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-50 mt-4 disabled:transform-none"
                   >
                     {status === "loading" ? (
                       <Loader2 className="h-5 w-5 animate-spin" />
                     ) : (
                       "Apply Code"
                     )}
                   </Button>
                 </form>
               )}
             </div>
          </section>

        </div>
      </main>
    </div>
  );
}

