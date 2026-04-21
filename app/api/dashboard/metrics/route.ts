import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import Transaction from "@/lib/models/Transaction";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  const userId = new mongoose.Types.ObjectId(session.user.id);

  try {
    const stats = await Transaction.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      {
        $facet: {
          totals: [
            { $group: { _id: "$type", amount: { $sum: "$amount" } } }
          ],
          expensesByCategory: [
            { $match: { type: "expense" } },
            { $group: { _id: "$category", value: { $sum: "$amount" } } },
            { $project: { name: "$_id", value: 1, _id: 0 } },
            { $sort: { value: -1 } },
            { $limit: 5 }
          ],
          dailySpending: [
            { $match: { type: "expense" } },
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                value: { $sum: "$amount" }
              }
            },
            { $sort: { "_id": 1 } },
            { $project: { date: "$_id", value: 1, _id: 0 } }
          ]
        }
      }
    ]);

    const result = stats[0];
    const totalIncome = result.totals.find((t: any) => t._id === 'income')?.amount || 0;
    const totalExpenses = result.totals.find((t: any) => t._id === 'expense')?.amount || 0;

    return NextResponse.json({
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      expensesByCategory: result.expensesByCategory,
      dailySpending: result.dailySpending
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
