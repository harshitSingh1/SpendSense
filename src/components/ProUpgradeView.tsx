import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus, Lock, CreditCard, Sparkles, Brain, Shield, Target } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getPricing } from "../config/pricing";

export default function ProUpgradeView() {
  const pricing = getPricing();

  const baseFeatures = [
    "Manual Omni-Tracker",
    "Basic Cashflow",
    "2 Piggy Banks"
  ];

  const proFeatures = [
    "Unlimited Proprietary Financial LLM Coach",
    "Advanced Protection Shield",
    "Unlimited Piggy Banks"
  ];
  
  const proYearlyFeatures = [
    ...proFeatures,
    "Priority Support",
    "Early Access to New Models"
  ];

  // Trigger the checkout overlay
  const handleCheckoutMonthly = () => {
    console.log(`Triggering checkout for Monthly plan at ${pricing.symbol}${pricing.monthly}`);
  };

  const handleCheckoutYearly = () => {
    console.log(`Triggering checkout for Yearly plan at ${pricing.symbol}${pricing.yearly}`);
  };

  // Compute old values for comparisons
  const oldApp1 = pricing.currency === 'INR' ? 800 : pricing.currency === 'USD' && pricing.monthly === 16.99 ? 12 : 10;
  const oldApp2 = pricing.currency === 'INR' ? 1950 : pricing.currency === 'USD' && pricing.monthly === 16.99 ? 20 : 15;
  const oldApp3 = pricing.currency === 'INR' ? 400 : pricing.currency === 'USD' && pricing.monthly === 16.99 ? 8 : 5;
  const totalOld = oldApp1 + oldApp2 + oldApp3;
  const totalSaved = (totalOld - pricing.monthly) * 12;

  const effectivelyMonthly = (pricing.yearly / 12).toFixed(0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-full w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center"
    >
      {/* Hero Header */}
      <div className="text-center mb-12 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
          Master Your Wealth for the Price of a Coffee.
        </h1>
        <p className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-400 text-balance">
          Stop paying for fragmented apps. Get a world-class AI financial advisor, goal tracker, and risk shield in one unified platform.
        </p>
      </div>

      {/* The 'True Cost' Value Stack */}
      <div className="w-full max-w-4xl mb-16 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">The Cost of Fragmented Finance</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 bg-white dark:bg-zinc-900 rounded-[2rem] p-6 sm:p-8 border border-slate-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-emerald-500/5 pointer-events-none" />
          
          {/* Left Side: The Old Way */}
          <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-3xl p-6 border border-slate-100 dark:border-zinc-800 relative">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6">The Old Way</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex justify-between items-center text-sm font-medium text-slate-400 dark:text-slate-500 line-through decoration-red-500/50">
                <span>Generic Budgeting App</span>
                <span>{pricing.symbol}{oldApp1}/mo</span>
              </li>
              <li className="flex justify-between items-center text-sm font-medium text-slate-400 dark:text-slate-500 line-through decoration-red-500/50">
                <span>ChatGPT Plus (Advice)</span>
                <span>{pricing.symbol}{oldApp2}/mo</span>
              </li>
              <li className="flex justify-between items-center text-sm font-medium text-slate-400 dark:text-slate-500 line-through decoration-red-500/50">
                <span>Goal Tracking App</span>
                <span>{pricing.symbol}{oldApp3}/mo</span>
              </li>
            </ul>
            <div className="pt-4 border-t border-slate-200 dark:border-zinc-700 flex justify-between items-center">
              <span className="font-bold text-slate-400">Total</span>
              <span className="text-xl font-bold text-red-500/80 line-through">{pricing.symbol}{totalOld}/month</span>
            </div>
          </div>

          {/* Right Side: The SpendSense Way */}
          <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl p-6 border border-indigo-100 dark:border-indigo-500/20 relative flex flex-col justify-center items-center text-center">
            <h3 className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4">The SpendSense Way</h3>
            <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              All of this, unified and automated.<br/>
              <span className="text-indigo-600 dark:text-indigo-400">Just {pricing.symbol}{pricing.monthly}/mo.</span>
            </p>
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-black tracking-wide text-emerald-600 dark:text-emerald-400 uppercase">Save {pricing.symbol}{Math.floor(totalSaved)} every year</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, staggerChildren: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl relative z-10 mb-12"
      >
        {/* Card 1: The Core */}
        <Card className="rounded-[2.5rem] border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm h-full flex flex-col p-2">
          <CardHeader className="pb-6 pt-8 px-6 text-center border-b border-transparent">
            <CardTitle className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">The Core</CardTitle>
            <CardDescription className="text-sm font-medium opacity-80 min-h-[40px] text-slate-500">
              Everything you need to build the habit.
            </CardDescription>
            <div className="mt-6 flex items-baseline justify-center gap-1">
              <span className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">{pricing.symbol}0</span>
              <span className="text-slate-500 font-semibold">/mo</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 px-6">
            <ul className="space-y-4">
              {baseFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-slate-700 dark:text-slate-300" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="px-6 pb-8 pt-4">
            <Button variant="outline" className="w-full rounded-2xl py-6 font-bold text-sm bg-transparent border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-500 dark:hover:text-slate-400" disabled>
              Your Current Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Card 2: Pro Monthly (The Decoy) */}
        <Card className="rounded-[2.5rem] border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md h-full flex flex-col p-2 relative">
          <CardHeader className="pb-6 pt-8 px-6 text-center border-b border-transparent">
            <div className="inline-flex items-center justify-center mb-4 min-h-[28px]">
              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full border border-emerald-500/20">
                50% OFF
              </span>
            </div>
            <CardTitle className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">Pro Monthly</CardTitle>
            <CardDescription className="text-sm font-medium opacity-80 min-h-[40px] text-slate-500">
              Month-to-month intelligence.
            </CardDescription>
            <div className="mt-4 flex flex-col items-center justify-center">
              <span className="text-sm font-bold text-slate-400 dark:text-slate-500 line-through decoration-red-500/50 mb-1">{pricing.symbol}{pricing.strikethroughMonthly}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                  {pricing.symbol}{pricing.monthly}
                </span>
                <span className="text-slate-500 font-semibold">/mo</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 px-6">
            <ul className="space-y-4">
              {proFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="px-6 pb-8 pt-4">
            <Button 
              onClick={handleCheckoutMonthly}
              className="w-full rounded-2xl py-6 font-bold text-sm bg-indigo-600 text-white shadow-lg hover:shadow-indigo-600/25 hover:scale-[1.02] active:scale-[0.98] hover:bg-indigo-700 transition-all"
            >
              Choose Monthly
            </Button>
          </CardFooter>
        </Card>

        {/* Card 3: Pro Yearly (The Anchor) */}
        <Card className="rounded-[2.5rem] border-indigo-500/50 dark:border-indigo-500/60 bg-white dark:bg-zinc-950 shadow-[0_0_50px_rgba(79,70,229,0.2)] relative h-full flex flex-col p-2 overflow-hidden ring-2 ring-indigo-500/30 scale-100 lg:scale-[1.03] transform origin-bottom z-10">
          <div className="absolute top-0 inset-x-0 bg-indigo-600 dark:bg-indigo-500 text-white text-[11px] font-black uppercase tracking-widest text-center py-2 shadow-inner">
            Best Value
          </div>
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-500/15 blur-[80px] rounded-full pointer-events-none" />

          <CardHeader className="pb-6 pt-10 px-6 text-center relative z-10">
            <div className="inline-flex items-center justify-center mb-4 min-h-[28px]">
               <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                SAVE 75%
              </span>
            </div>
            <CardTitle className="text-2xl font-bold mb-2">Pro Yearly</CardTitle>
            <CardDescription className="text-sm font-medium opacity-80 min-h-[40px]">
              Master your wealth for a full year.
            </CardDescription>
            <div className="mt-4 flex flex-col items-center justify-center">
              <span className="text-sm font-bold text-muted-foreground line-through decoration-red-500/50 mb-1">{pricing.symbol}{pricing.strikethroughYearly}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tighter text-foreground">
                  {pricing.symbol}{pricing.yearly}
                </span>
                <span className="text-muted-foreground font-semibold">/yr</span>
              </div>
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-2">
                Effectively just {pricing.symbol}{effectivelyMonthly} / mo
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex-1 px-6 relative z-10">
            <ul className="space-y-4">
              {proYearlyFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-bold text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="px-6 pb-8 pt-4 relative z-10">
            <Button 
              onClick={handleCheckoutYearly}
              className="w-full rounded-2xl py-6 font-bold text-sm bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] hover:bg-emerald-600 transition-all border border-emerald-400"
            >
              Claim 75% Discount
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Feature ROI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-16 relative z-10">
        <Card className="rounded-[2rem] border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:-translate-y-1 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 scale-50 group-hover:scale-150 transition-all duration-700 pointer-events-none origin-top-right">
            <Brain className="w-32 h-32 text-indigo-500" />
          </div>
          <CardHeader className="pb-4 pt-8 px-6 relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0 mb-4 text-indigo-600 dark:text-indigo-400 relative">
              <Brain className="h-6 w-6" />
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-indigo-500" />
            </div>
            <CardTitle className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Your Personal CFO.</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-8 relative z-10">
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm">
              Stop guessing if you can afford it. Our elite unified financial advisor analyzes your live data and stops impulse purchases before they happen. <span className="text-slate-900 dark:text-white font-bold">One avoided impulse buy pays for the app for a year.</span>
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:-translate-y-1 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 scale-50 group-hover:scale-150 transition-all duration-700 pointer-events-none origin-top-right">
            <Shield className="w-32 h-32 text-emerald-500" />
          </div>
          <CardHeader className="pb-4 pt-8 px-6 relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 mb-4 text-emerald-600 dark:text-emerald-400">
              <Shield className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Bulletproof Your Future.</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-8 relative z-10">
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm">
              We scan your cash flow to find hidden vulnerabilities, from missing emergency funds to insurance gaps, ensuring a medical emergency doesn't wipe out your savings.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:-translate-y-1 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 scale-50 group-hover:scale-150 transition-all duration-700 pointer-events-none origin-top-right">
            <Target className="w-32 h-32 text-blue-500" />
          </div>
          <CardHeader className="pb-4 pt-8 px-6 relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0 mb-4 text-blue-600 dark:text-blue-400">
              <Target className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">Give Every Rupee a Job.</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-8 relative z-10">
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm">
              Create unlimited, mathematically tracked goals. Watch your money automatically route itself toward your dream car, vacation, or retirement.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="mt-24 w-full max-w-4xl relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 dark:text-white">Compare Features</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">See exactly what you get across all plans.</p>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="min-w-[600px] border border-slate-100 dark:border-zinc-800 rounded-[2rem] overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-zinc-800 font-bold">
                  <th className="py-6 px-6 text-slate-900 dark:text-white w-2/5">Features</th>
                  <th className="py-6 px-6 text-slate-900 dark:text-white text-center w-1/4">Core (Free)</th>
                  <th className="py-6 px-6 text-slate-900 dark:text-white text-center w-1/4 bg-slate-50 dark:bg-zinc-800">SpendSense Pro</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {/* Feature 1 */}
                <tr className="border-b border-slate-100 dark:border-zinc-800">
                  <td className="py-5 px-6 text-slate-700 dark:text-slate-300">Expense Tracking</td>
                  <td className="py-5 px-6 text-center text-slate-500 dark:text-slate-400">Unlimited</td>
                  <td className="py-5 px-6 text-center text-slate-800 dark:text-slate-200 font-semibold bg-slate-50 dark:bg-zinc-800">Unlimited</td>
                </tr>
                {/* Feature 2 */}
                <tr className="border-b border-slate-100 dark:border-zinc-800">
                  <td className="py-5 px-6 text-slate-700 dark:text-slate-300">Goal Tracking / Piggy Banks</td>
                  <td className="py-5 px-6 text-center text-slate-500 dark:text-slate-400">Up to 2</td>
                  <td className="py-5 px-6 text-center text-emerald-600 dark:text-emerald-400 font-bold bg-slate-50 dark:bg-zinc-800">Unlimited</td>
                </tr>
                {/* Feature 3 */}
                <tr className="border-b border-slate-100 dark:border-zinc-800">
                  <td className="py-5 px-6 text-slate-700 dark:text-slate-300">AI Financial Coach</td>
                  <td className="py-5 px-6 text-center text-slate-500 dark:text-slate-400">3 Prompts / Day</td>
                  <td className="py-5 px-6 text-center text-slate-800 dark:text-slate-200 font-semibold bg-slate-50 dark:bg-zinc-800">Unrestricted Access to Premium AI Ensemble</td>
                </tr>
                {/* Feature 4 */}
                <tr className="border-b border-slate-100 dark:border-zinc-800">
                  <td className="py-5 px-6 text-slate-700 dark:text-slate-300">Risk & Insurance Shield</td>
                  <td className="py-5 px-6 text-center text-slate-500 dark:text-slate-400">Basic Scan</td>
                  <td className="py-5 px-6 text-center text-slate-800 dark:text-slate-200 font-semibold bg-slate-50 dark:bg-zinc-800">Deep Behavioral Analytics</td>
                </tr>
                {/* Feature 5 */}
                <tr>
                  <td className="py-5 px-6 text-slate-700 dark:text-slate-300 rounded-bl-[2rem]">Data Export</td>
                  <td className="py-5 px-6 text-center text-slate-500 flex justify-center items-center h-full min-h-[60px]"><Minus className="h-5 w-5 opacity-40 mx-auto" /></td>
                  <td className="py-5 px-6 text-center bg-slate-50 dark:bg-zinc-800 rounded-br-[2rem]">
                    <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mx-auto" strokeWidth={3} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 w-full max-w-2xl relative z-10 text-left">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">Frequently Asked Questions</h2>
        </div>
        <Accordion className="w-full space-y-4">
          <AccordionItem value="faq-1" className="border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl px-6 py-2">
            <AccordionTrigger className="text-base font-bold text-slate-800 dark:text-white hover:no-underline hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              How does this save me money?
            </AccordionTrigger>
            <AccordionContent className="text-slate-500 dark:text-slate-400 font-medium text-sm pb-4 leading-relaxed">
              By consolidating your financial tools and using AI to identify wasteful subscriptions and impulse habits, the average user saves 10x the subscription cost in their first month.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2" className="border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl px-6 py-2">
            <AccordionTrigger className="text-base font-bold text-slate-800 dark:text-white hover:no-underline hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Can I cancel?
            </AccordionTrigger>
            <AccordionContent className="text-slate-500 dark:text-slate-400 font-medium text-sm pb-4 leading-relaxed">
              Instantly, with one click. No phone calls, no guilt trips.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3" className="border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl px-6 py-2">
            <AccordionTrigger className="text-base font-bold text-slate-800 dark:text-white hover:no-underline hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Is my data secure?
            </AccordionTrigger>
            <AccordionContent className="text-slate-500 dark:text-slate-400 font-medium text-sm pb-4 leading-relaxed">
              Bank-level AES-256 encryption. You own your data.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Final CTA */}
      <div className="mt-24 text-center relative z-10">
        <Button 
          onClick={handleCheckoutYearly}
          className="rounded-full px-12 py-8 text-lg font-black bg-indigo-600 text-white shadow-xl shadow-indigo-600/25 hover:scale-[1.02] active:scale-[0.98] hover:bg-indigo-700 transition-all border border-indigo-500/20"
        >
          Start Your Pro Journey
        </Button>
      </div>

      {/* Payment Trust Footer */}
      <div className="mt-16 mb-8 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-4 mb-4 grayscale">
          {/* SVG representations for Visa, Mastercard, Apple Pay */}
          <svg className="h-6 w-auto" viewBox="0 0 38 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.072 11.233l2.25-10.74h3.58l-2.25 10.74h-3.58zm17.159-10.422c-.672-.311-1.791-.58-3.085-.58-3.468 0-5.918 1.802-5.937 4.385-.027 1.905 1.761 2.964 3.097 3.593 1.365.64 1.823 1.053 1.82 1.62-.005.877-1.094 1.282-2.102 1.282-1.42 0-2.18-.216-3.342-.71l-.47-.217-.504 3.045c.827.368 2.348.683 3.931.696 3.684 0 6.09-1.768 6.12-4.512.016-1.523-.9-2.673-2.96-3.626-1.217-.597-1.96-1.01-1.96-1.63 0-.583.67-1.183 2.01-1.183 1.135-.02 1.936.242 2.535.503l.302.14 1.09-3.046M12.227 11.232l-2.883-7.7c-.126-.516-.25-1-.705-1.39A9.124 9.124 0 005.42.92L.034.908l-.014.28 1.144.24c1.196.248 2.548.86 3.018 1.644l2.553 8.16h3.801l5.69-10.74H12.63l-.403.5M36.177 1.306l-3.398 7.22h-1.635l-1.07-5.903c-.22-.962-.404-1.29-1.025-1.602A9.554 9.554 0 0025.293.92H38V10.871l-1.823-9.565z" fill="currentColor"/></svg>
          <svg className="h-6 w-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.957 23.473H13.628V.856h10.33v22.617z" fill="currentColor"/><path d="M14.073 12.164a11.385 11.385 0 011.66-5.882A11.531 11.531 0 008.358.855C2.665.855-.008 5.48-.008 12.164c0 6.721 2.658 11.31 8.351 11.31a11.534 11.534 0 007.385-5.428 11.39 11.39 0 01-1.656-5.882z" fill="currentColor"/><path d="M37.593 12.164c0-6.708-2.659-11.309-8.352-11.309a11.534 11.534 0 00-7.385 5.427 11.384 11.384 0 011.657 5.882c0 2.228-.592 4.256-1.656 5.882a11.531 11.531 0 007.384 5.428c5.694 0 8.352-4.604 8.352-11.31z" fill="currentColor"/></svg>
          <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.288 3.515c.983-1.127 1.642-2.88 1.463-4.515-1.503.056-3.414.939-4.428 2.066-.91.996-1.698 2.766-1.488 4.381 1.674.113 3.47-1.026 4.453-1.932Zm-4.966 6.304c-.035-2.073 1.776-3.084 1.849-3.13-1.042-1.428-2.73-1.656-3.328-1.705-1.4-.132-2.736.8-3.454.8-.737 0-1.843-.787-2.997-.768-1.501.018-2.923.826-3.693 2.076-1.564 2.535-.398 6.28.98 8.163.743 1.012 1.626 2.146 2.809 2.106 1.144-.037 1.584-.684 2.969-.684 1.384 0 1.789.684 2.986.666 1.218-.02 1.954-1.025 2.695-2.015.856-1.168 1.206-2.298 1.225-2.355-.035-.01-2.316-.848-2.34-3.138Z" fill="currentColor"/></svg>
        </div>
        <p className="text-xs font-medium text-muted-foreground text-center text-balance max-w-sm">
          Secure checkout powered by Lemon Squeezy. SSL Encrypted.
        </p>
      </div>
    </motion.div>
  );
}
