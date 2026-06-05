import React, { useState } from "react";
import { motion } from "motion/react";
import { Calculator, AlertTriangle, TrendingUp, DollarSign } from "lucide-react";

interface TaxOptimizerWidgetProps {
  region: string;
}

export default function TaxOptimizerWidget({ region }: TaxOptimizerWidgetProps) {
  const [grossIncome, setGrossIncome] = useState<number | "">("");
  const [deductions, setDeductions] = useState<number | "">("");

  const calculateTax = (region: string, gross: number, deds: number) => {
    let taxable = Math.max(0, gross - deds);
    let taxOwed = 0;

    switch (region) {
      case "India":
      case "IN":
        // Simplified India New Tax Regime approx 2024
        // Standard deduction is ₹50,000 for salaried but we simplify to strictly user inputs + basic rebate
        // Rebate u/s 87A: If taxable <= 7L, tax is zero
        if (taxable <= 700000) {
          taxOwed = 0;
        } else {
          if (taxable > 1500000) { taxOwed += (taxable - 1500000) * 0.30; taxable = 1500000; }
          if (taxable > 1200000) { taxOwed += (taxable - 1200000) * 0.20; taxable = 1200000; }
          if (taxable > 900000) { taxOwed += (taxable - 900000) * 0.15; taxable = 900000; }
          if (taxable > 600000) { taxOwed += (taxable - 600000) * 0.10; taxable = 600000; }
          if (taxable > 300000) { taxOwed += (taxable - 300000) * 0.05; }
        }
        break;

      case "US":
        // US approx 2024 brackets (Single)
        // Built-in standard deduction of $14,600
        const usStandardDeduction = 14600;
        taxable = Math.max(0, taxable - usStandardDeduction);
        
        if (taxable > 609350) { taxOwed += (taxable - 609350) * 0.37; taxable = 609350; }
        if (taxable > 243725) { taxOwed += (taxable - 243725) * 0.35; taxable = 243725; }
        if (taxable > 191950) { taxOwed += (taxable - 191950) * 0.32; taxable = 191950; }
        if (taxable > 100525) { taxOwed += (taxable - 100525) * 0.24; taxable = 100525; }
        if (taxable > 47150) { taxOwed += (taxable - 47150) * 0.22; taxable = 47150; }
        if (taxable > 11600) { taxOwed += (taxable - 11600) * 0.12; taxable = 11600; }
        if (taxable > 0) { taxOwed += taxable * 0.10; }
        break;

      case "UK":
      case "GB":
        // UK approx 2024 brackets
        // Personal allowance £12,570 (reduces by £1 for every £2 over £100,000)
        let personalAllowance = 12570;
        if (taxable > 100000) {
          personalAllowance = Math.max(0, personalAllowance - (taxable - 100000) / 2);
        }
        let ukTaxable = Math.max(0, taxable - personalAllowance);
        
        if (ukTaxable > 125140) { taxOwed += (ukTaxable - 125140) * 0.45; ukTaxable = 125140; }
        if (ukTaxable > 37700) { taxOwed += (ukTaxable - 37700) * 0.40; ukTaxable = 37700; }
        if (ukTaxable > 0) { taxOwed += ukTaxable * 0.20; }
        break;

      case "Switzerland":
      case "CH":
        // Switzerland approx generic progressive
        if (taxable > 200000) { taxOwed += (taxable - 200000) * 0.35; taxable = 200000; }
        if (taxable > 100000) { taxOwed += (taxable - 100000) * 0.25; taxable = 100000; }
        if (taxable > 50000) { taxOwed += (taxable - 50000) * 0.15; taxable = 50000; }
        if (taxable > 14500) { taxOwed += (taxable - 14500) * 0.10; }
        break;

      default:
      case "Global":
        // Generic simplified progressive
        if (taxable > 100000) { taxOwed += (taxable - 100000) * 0.40; taxable = 100000; }
        if (taxable > 50000) { taxOwed += (taxable - 50000) * 0.30; taxable = 50000; }
        if (taxable > 20000) { taxOwed += (taxable - 20000) * 0.20; taxable = 20000; }
        break;
    }
    return Math.round(taxOwed);
  };

  const currencySymbol = (() => {
    switch (region) {
      case "India": case "IN": return "₹";
      case "UK": case "GB": return "£";
      case "Switzerland": case "CH": return "CHF ";
      case "US": return "$";
      case "Global": default: return "$";
    }
  })();

  const taxAccountSuggestion = (() => {
    switch (region) {
      case "India": case "IN": return "Section 80C options and NPS";
      case "UK": case "GB": return "ISA and Pension Contributions";
      case "Switzerland": case "CH": return "Pillar 3a and Pillar 2 buy-ins";
      case "US": return "401(k), IRA, and HSA";
      case "Global": default: return "tax-deferred retirement accounts";
    }
  })();

  const grossNumeric = typeof grossIncome === "number" ? grossIncome : 0;
  const dedsNumeric = typeof deductions === "number" ? deductions : 0;

  const taxOwed = calculateTax(region, grossNumeric, dedsNumeric);
  const takeHome = grossNumeric - taxOwed;
  const effectiveRate = grossNumeric > 0 ? (taxOwed / grossNumeric) * 100 : 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4">
        <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400">
          <Calculator className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Take-Home Pay Estimator</h2>
          <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-widest text-[10px]">Tax Calculator</p>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="grossIncome" className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Money You Earned This Year (Before Taxes)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">{currencySymbol}</span>
              <input
                id="grossIncome"
                type="number"
                value={grossIncome === "" ? "" : grossIncome}
                onChange={(e) => setGrossIncome(e.target.value ? Number(e.target.value) : "")}
                className="w-full flex pl-10 h-12 rounded-md border text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
                placeholder="Enter gross income"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="deductions" className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Money Saved in Tax-Free Accounts (Deductions)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">{currencySymbol}</span>
              <input
                id="deductions"
                type="number"
                value={deductions === "" ? "" : deductions}
                onChange={(e) => setDeductions(e.target.value ? Number(e.target.value) : "")}
                className="w-full flex pl-10 h-12 rounded-md border text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
                placeholder="Enter deductions"
              />
            </div>
          </div>
        </div>

        <motion.div 
          className="bg-slate-900 dark:bg-black text-white p-6 rounded-2xl border border-slate-800 space-y-6"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1 opacity-80">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Taxes You Have to Pay</p>
              <p className="text-2xl font-mono tracking-tight text-red-400">
                {currencySymbol}{taxOwed.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1 opacity-80">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Effective Rate</p>
              <p className="text-2xl font-mono tracking-tight">{effectiveRate.toFixed(1)}%</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Money You Get to Keep (Take-Home)</p>
            <p className="text-4xl font-mono tracking-tighter text-emerald-400">
              {currencySymbol}{takeHome.toLocaleString()}
            </p>
          </div>
        </motion.div>

        {effectiveRate > 20 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-2xl flex gap-4"
          >
            <AlertTriangle className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-700 dark:text-indigo-400">💡 Stocrates Suggestion</p>
              <p className="text-sm text-indigo-900/80 dark:text-indigo-300 leading-relaxed font-medium">
                Tip: If you put more money into this specific account ({taxAccountSuggestion}), your taxes go down and you keep more money.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
