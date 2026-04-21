"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import Transaction from "@/lib/models/Transaction";
import mongoose from "mongoose";

export async function getShieldMetrics() {
  const session = await auth();
  if (!session?.user?.id) return null;

  await dbConnect();
  const userId = new mongoose.Types.ObjectId(session.user.id);

  try {
    const now = new Date();
    // Start of 3 months ago
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);

    const metrics = await Transaction.aggregate([
      {
        $facet: {
          // Calculate overall balance
          balance: [
            { $match: { userId } },
            {
              $group: {
                _id: "$type",
                total: { $sum: "$amount" }
              }
            }
          ],
          // Calculate average monthly expense over last 3 months
          avgMonthlyExpense: [
            { 
              $match: { 
                userId, 
                type: "expense",
                date: { $gte: threeMonthsAgo }
              } 
            },
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
                monthlyTotal: { $sum: "$amount" }
              }
            },
            {
              $group: {
                _id: null,
                avg: { $avg: "$monthlyTotal" },
                count: { $count: {} }
              }
            }
          ]
        }
      }
    ]);

    const balanceData = metrics[0].balance;
    const totalIncome = balanceData.find((b: any) => b._id === "income")?.total || 0;
    const totalExpenses = balanceData.find((b: any) => b._id === "expense")?.total || 0;
    const currentBalance = totalIncome - totalExpenses;

    const avgData = metrics[0].avgMonthlyExpense[0];
    const avgMonthlyExpense = avgData?.avg || 0;
    
    // Target is 6x the average monthly expense
    const emergencyFundTarget = avgMonthlyExpense * 6;
    const isFunded = currentBalance >= emergencyFundTarget && emergencyFundTarget > 0;

    return {
      currentBalance,
      avgMonthlyExpense,
      emergencyFundTarget,
      isFunded
    };
  } catch (error) {
    console.error("Shield Metrics Error:", error);
    return null;
  }
}
