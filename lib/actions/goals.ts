"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import Goal from "@/lib/models/Goal";
import Transaction from "@/lib/models/Transaction";
import { revalidatePath } from "next/cache";

export async function getGoals() {
  const session = await auth();
  if (!session?.user?.id) return [];

  await dbConnect();
  try {
    const goals = await Goal.find({ userId: session.user.id }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(goals));
  } catch (error) {
    console.error("Failed to fetch goals:", error);
    return [];
  }
}

export async function addGoal(data: { title: string; targetAmount: number; targetDate: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await dbConnect();
  try {
    const goal = await Goal.create({
      ...data,
      userId: session.user.id,
      currentAmount: 0,
      status: 'active'
    });
    revalidatePath("/goals");
    revalidatePath("/dashboard");
    return { success: true, goal: JSON.parse(JSON.stringify(goal)) };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteGoal(goalId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await dbConnect();
  try {
    await Goal.findOneAndDelete({ _id: goalId, userId: session.user.id });
    revalidatePath("/goals");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function addFundsToGoal(goalId: string, amount: number) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await dbConnect();
  const sessionUser = session.user;

  try {
    const goal = await Goal.findOne({ _id: goalId, userId: sessionUser.id });
    if (!goal) throw new Error("Goal not found");

    // 1. Update Goal
    goal.currentAmount += amount;
    if (goal.currentAmount >= goal.targetAmount) {
      goal.status = 'completed';
    }
    await goal.save();

    // 2. Create Transaction (as expense in tracker, representing moving money to savings)
    await Transaction.create({
      userId: sessionUser.id,
      type: 'expense',
      amount,
      category: 'Savings/Goals',
      description: `Contribution to goal: ${goal.title}`,
      date: new Date()
    });

    revalidatePath("/goals");
    revalidatePath("/tracker");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
