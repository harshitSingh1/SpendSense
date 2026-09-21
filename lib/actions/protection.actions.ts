import { Request } from "express";
import { requireUser } from "../auth-utils";
import dbConnect from "../mongodb";
import Transaction from "../models/Transaction";
import mongoose from "mongoose";

/**
 * SpendSense AI - Protection Shield (Risk Analysis) Server Actions
 */

export async function getProtectionMetrics(req: Request) {
  const user = await requireUser(req);
  await dbConnect();

  const userId = (user as any).id;
  
  // 1. Fetch all transactions for the user
  const allTransactions = await Transaction.find({ userId }).sort({ date: -1 });

  const expenseTransactions = allTransactions.filter(tx => tx.type === 'expense');
  const incomeTransactions = allTransactions.filter(tx => tx.type === 'income');

  const totals = allTransactions.reduce((acc, tx) => {
    if (tx.type === 'income') acc.income += tx.amount;
    else acc.expense += tx.amount;
    return acc;
  }, { income: 0, expense: 0 });

  const currentSavings = Math.max(totals.income - totals.expense, 0);

  // 2. Calculate Monthly Income based on recorded income history
  const incomeMonthMap = new Map<string, number>();
  for (const tx of incomeTransactions) {
    const d = new Date(tx.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    incomeMonthMap.set(key, (incomeMonthMap.get(key) || 0) + tx.amount);
  }
  const incomeMonthEntries = Array.from(incomeMonthMap.entries());
  let averageMonthlyIncome = 0;
  if (incomeMonthEntries.length > 0) {
    const recentIncome = incomeMonthEntries.slice(-3);
    const sumIncome = recentIncome.reduce((acc, [, val]) => acc + val, 0);
    averageMonthlyIncome = sumIncome / recentIncome.length;
  } else if (totals.income > 0) {
    averageMonthlyIncome = totals.income;
  }

  // 3. Calculate Monthly Expenses from recorded expense history
  const expenseMonthMap = new Map<string, number>();
  for (const tx of expenseTransactions) {
    const d = new Date(tx.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    expenseMonthMap.set(key, (expenseMonthMap.get(key) || 0) + tx.amount);
  }
  const expenseMonthEntries = Array.from(expenseMonthMap.entries());
  let rawMonthlyExpense = 0;
  if (expenseMonthEntries.length > 0) {
    const recentExpenses = expenseMonthEntries.slice(-3);
    const sumExpenses = recentExpenses.reduce((acc, [, val]) => acc + val, 0);
    rawMonthlyExpense = sumExpenses / recentExpenses.length;
  } else if (totals.expense > 0) {
    rawMonthlyExpense = totals.expense;
  }

  // 4. Robust Living Baseline Calibration
  // When expense logging is preliminary (e.g., only 1-2 small incidental transactions totaling
  // less than 15% of monthly income), using that raw number produces mathematically distorted
  // runway (e.g. 19,000+ days) and an absurdly low 6-month buffer target (e.g. ₹1,002).
  // Following the standard 50/30/20 personal finance framework, essential living expenses ("Needs")
  // default to 50% of monthly income unless representative expense history is logged.
  let averageMonthlyExpense = rawMonthlyExpense;
  let isEstimatedExpense = false;

  const isPreliminaryExpenseData = 
    averageMonthlyIncome > 0 && 
    (rawMonthlyExpense < averageMonthlyIncome * 0.15 || expenseTransactions.length < 3);

  if (isPreliminaryExpenseData) {
    const baselineLivingNeeds = averageMonthlyIncome * 0.50;
    averageMonthlyExpense = Math.max(rawMonthlyExpense, baselineLivingNeeds);
    isEstimatedExpense = true;
  } else if (rawMonthlyExpense <= 0 && averageMonthlyIncome > 0) {
    averageMonthlyExpense = averageMonthlyIncome * 0.50;
    isEstimatedExpense = true;
  }

  // 5. Target Emergency Fund = 6x Monthly Expenses
  const targetEmergencyFund = averageMonthlyExpense * 6;

  // 6. Insurance Detection
  const insurancePaymentsCount = await Transaction.countDocuments({
    userId,
    category: { $regex: /insurance|medical premium/i }
  });

  const hasActiveInsurance = insurancePaymentsCount > 0;

  // 7. Calculate Protection Score (0-100)
  // 60% Weight: Emergency Fund Coverage (up to target)
  // 40% Weight: Insurance Presence
  let fundScore = 0;
  if (targetEmergencyFund > 0) {
    fundScore = Math.min((currentSavings / targetEmergencyFund) * 60, 60);
  } else if (currentSavings > 0) {
    fundScore = 30;
  }

  const insuranceScore = hasActiveInsurance ? 40 : 0;
  const protectionScore = Math.round(fundScore + insuranceScore);

  return {
    averageMonthlyExpense: Math.round(averageMonthlyExpense),
    targetEmergencyFund: Math.round(targetEmergencyFund),
    currentSavings: Math.round(currentSavings),
    hasActiveInsurance,
    insurancePaymentsCount,
    protectionScore,
    isEstimatedExpense
  };
}
