"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import Transaction from "@/lib/models/Transaction";
import mongoose from "mongoose";

export async function getDashboardMetrics() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await dbConnect();
  const userId = new mongoose.Types.ObjectId(session.user.id);

  // Get current month boundaries
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  try {
    const metrics = await Transaction.aggregate([
      {
        $match: {
          userId,
          date: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      {
        $facet: {
          totals: [
            {
              $group: {
                _id: "$type",
                total: { $sum: "$amount" }
              }
            }
          ],
          expensesByCategory: [
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
            }
          ],
          dailySpending: [
            { $match: { type: "expense" } },
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                spending: { $sum: "$amount" }
              }
            },
            { $sort: { _id: 1 } },
            {
              $project: {
                date: "$_id",
                amount: "$spending",
                _id: 0
              }
            }
          ]
        }
      }
    ]);

    const totals = metrics[0].totals;
    const totalIncome = totals.find((t: any) => t._id === "income")?.total || 0;
    const totalExpenses = totals.find((t: any) => t._id === "expense")?.total || 0;

    return {
      totalIncome,
      totalExpenses,
      expensesByCategory: metrics[0].expensesByCategory,
      dailySpending: metrics[0].dailySpending
    };
  } catch (error) {
    console.error("Aggregation Error:", error);
    return {
      totalIncome: 0,
      totalExpenses: 0,
      expensesByCategory: [],
      dailySpending: []
    };
  }
}
