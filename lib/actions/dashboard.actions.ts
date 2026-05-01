import { Request } from 'express';
import { requireUser } from '../auth-utils';
import dbConnect from '../mongodb';
import Transaction from '../models/Transaction';
import CalendarNote from '../models/CalendarNote';
import mongoose from 'mongoose';

/**
 * SpendSense AI - Advanced Dashboard Aggregation
 * Returns real-time metrics, dual cashflow daily data, and dynamic health alerts.
 */

export interface AggregatedDashboardData {
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  healthScore: number;
  categoryAllocation: { name: string; value: number }[];
  dailyCashflow: { date: string; income: number; expense: number }[];
  smartAlerts: { id: string; type: 'Warning' | 'Info' | 'Success'; title: string; message: string }[];
  calendarNotes?: Record<string, string>;
  monthlyTransactions?: any[];
}

export async function getDashboardMetrics(req: Request): Promise<AggregatedDashboardData> {
  const user = await requireUser(req);
  await dbConnect();

  const now = new Date();
  const timeRange = req.query.timeRange as string || 'yearly';

  let startDate: Date;
  let endDate: Date;

  if (timeRange === 'monthly') {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  } else if (timeRange === 'yearly') {
    startDate = new Date(now.getFullYear(), 0, 1);
    endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
  } else {
    // all time
    startDate = new Date(1970, 0, 1);
    endDate = new Date(2100, 11, 31, 23, 59, 59);
  }

  const userId = new mongoose.Types.ObjectId((user as any).id);

  const aggregation = await Transaction.aggregate([
    {
      $match: {
        userId: userId,
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $facet: {
        totals: [
          {
            $group: {
              _id: "$type",
              amount: { $sum: "$amount" }
            }
          }
        ],
        categoryAllocation: [
          { $match: { type: "expense" } },
          {
            $group: {
              _id: "$category",
              value: { $sum: "$amount" }
            }
          },
          {
            $project: {
              name: "$_id",
              value: 1,
              _id: 0
            }
          },
          { $sort: { value: -1 } }
        ],
        dailyCashflow: [
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
              income: { 
                $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } 
              },
              expense: { 
                $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } 
              }
            }
          },
          { $sort: { "_id": 1 } },
          {
            $project: {
              date: "$_id",
              income: 1,
              expense: 1,
              _id: 0
            }
          }
        ]
      }
    }
  ]);

  const stats = aggregation[0];
  
  const totalIncome = stats.totals.find((t: any) => t._id === 'income')?.amount || 0;
  const totalExpenses = stats.totals.find((t: any) => t._id === 'expense')?.amount || 0;
  const currentBalance = totalIncome - totalExpenses;

  // --- Real Health Score Algorithm ---
  let healthScore = 50; 
  if (totalIncome === 0 && totalExpenses > 0) {
    healthScore = 10;
  } else if (totalIncome > 0) {
    const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
    // Formula: 60 + savingsRate (e.g., 20% savings = 80 score)
    healthScore = Math.min(Math.max(60 + savingsRate, 0), 100);
  }
  healthScore = Math.round(healthScore);

  // --- Dynamic Smart Alerts ---
  const smartAlerts: { id: string; type: 'Warning' | 'Info' | 'Success'; title: string; message: string }[] = [];

  // Rule 1: High Spending
  if (totalIncome > 0) {
    const burnRate = (totalExpenses / totalIncome) * 100;
    if (burnRate > 80) {
      smartAlerts.push({
        id: 'high-burn',
        type: 'Warning',
        title: 'High Burn Rate',
        message: `You have spent ${Math.round(burnRate)}% of your income this month.`
      });
    }
  }

  // Rule 2: Top Category
  if (stats.categoryAllocation.length > 0 && totalExpenses > 0) {
    const topCat = stats.categoryAllocation[0];
    const catPercent = (topCat.value / totalExpenses) * 100;
    smartAlerts.push({
      id: 'top-category',
      type: 'Info',
      title: 'Spending Focus',
      message: `${topCat.name} makes up ${Math.round(catPercent)}% of your expenses.`
    });
  }

  // Rule 3: Safe Zone
  if (totalIncome > 0) {
    const burnRate = (totalExpenses / totalIncome) * 100;
    if (burnRate < 50 && totalIncome > 0) {
      smartAlerts.push({
        id: 'efficiency',
        type: 'Success',
        title: 'Optimal Efficiency',
        message: 'Your cash flow is highly positive.'
      });
    }
  }

  // --- Fetch Calendar Notes for the Month ---
  const pad = (n: number) => n.toString().padStart(2, '0');
  const monthString = pad(startDate.getMonth() + 1);
  const startDateStr = `${startDate.getFullYear()}-${monthString}-01`;
  const endDay = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate();
  const endMonthString = pad(endDate.getMonth() + 1);
  const endDateStr = `${endDate.getFullYear()}-${endMonthString}-${pad(endDay)}`;
  
  let noteQuery: any = { userId };
  if (timeRange === 'all') {
    // for all time, we might skip filtering or just include everything up to date.
  } else {
    noteQuery.date = { $gte: startDateStr, $lte: endDateStr };
  }

  const notes = await CalendarNote.find(noteQuery).lean();

  const calendarNotes: Record<string, string> = {};
  for (const note of notes) {
    calendarNotes[note.date] = note.content;
  }

  // --- Fetch Transactions for the Month ---
  const monthlyTransactions = await Transaction.find({
    userId,
    date: { $gte: startDate, $lte: endDate }
  }).sort({ date: -1 }).lean();

  const safeMonthlyTransactions = monthlyTransactions.map(t => ({
    ...t,
    _id: t._id.toString(),
    userId: t.userId.toString()
  }));

  return {
    totalIncome,
    totalExpenses,
    currentBalance,
    healthScore,
    categoryAllocation: stats.categoryAllocation,
    dailyCashflow: stats.dailyCashflow,
    smartAlerts,
    calendarNotes,
    monthlyTransactions: safeMonthlyTransactions
  };
}
