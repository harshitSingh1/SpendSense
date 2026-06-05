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
  
  // 1. Calculate Average Monthly Expenses (Last 3 Months)
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const threeMonthTransactions = await Transaction.find({
    userId,
    date: { $gte: threeMonthsAgo },
    type: 'expense'
  });

  const totalThreeMonthExpenses = threeMonthTransactions.reduce((acc, tx) => acc + tx.amount, 0);
  const averageMonthlyExpense = totalThreeMonthExpenses / 3;

  // 2. targetEmergencyFund = 6x Monthly Expenses
  const targetEmergencyFund = averageMonthlyExpense * 6;

  // 3. Current Savings (Net Balance: Total Income - Total Expense)
  // Note: In a real app, this might track a specific 'Savings' account, but for this logic we use net pulse.
  const allTransactions = await Transaction.find({ userId });
  const totals = allTransactions.reduce((acc, tx) => {
    if (tx.type === 'income') acc.income += tx.amount;
    else acc.expense += tx.amount;
    return acc;
  }, { income: 0, expense: 0 });

  const currentSavings = Math.max(totals.income - totals.expense, 0);

  // 4. Insurance Detection
  // We scan all-time transactions for any entry with 'Insurance' or 'Medical Premium'
  const insurancePaymentsCount = await Transaction.countDocuments({
    userId,
    category: { $regex: /insurance|medical premium/i }
  });

  const hasActiveInsurance = insurancePaymentsCount > 0;

  // 5. Calculate Protection Score (0-100)
  // 60% Weight: Emergency Fund Coverage (up to target)
  // 40% Weight: Insurance Presence
  let fundScore = 0;
  if (targetEmergencyFund > 0) {
    fundScore = Math.min((currentSavings / targetEmergencyFund) * 60, 60);
  } else if (currentSavings > 0) {
    fundScore = 60; // No expenses but has savings? Great!
  }

  const insuranceScore = hasActiveInsurance ? 40 : 0;
  const protectionScore = Math.round(fundScore + insuranceScore);

  return {
    averageMonthlyExpense: Math.round(averageMonthlyExpense),
    targetEmergencyFund: Math.round(targetEmergencyFund),
    currentSavings: Math.round(currentSavings),
    hasActiveInsurance,
    insurancePaymentsCount,
    protectionScore
  };
}
