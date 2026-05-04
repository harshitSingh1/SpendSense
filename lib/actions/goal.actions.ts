import { Request } from 'express';
import { requireUser } from '../auth-utils';
import dbConnect from '../mongodb';
import Goal from '../models/Goal';
import Transaction from '../models/Transaction';
import mongoose from 'mongoose';

/**
 * SpendSense AI - Goal (Piggy Bank) Server Actions
 * Note: These take a Request object to verify the session in our Express + Vite architecture.
 */

/**
 * Create a new financial goal.
 */
export async function createGoal(req: Request) {
  const user = await requireUser(req);
  await dbConnect();

  // Fetch full user to check Pro status
  const User = (await import('../models/User')).default;
  const fullUser = await User.findById((user as any).id);
  const isPro = fullUser?.isPro;

  if (!isPro) {
    const goalsCount = await Goal.countDocuments({ userId: (user as any).id });
    if (goalsCount >= 2) {
      const error: any = new Error('Free tier is limited to 2 Piggy Banks.');
      error.code = 'limit_reached';
      throw error;
    }
  }

  const { title, targetAmount, targetDate, icon } = req.body;

  if (!title || !targetAmount || !targetDate) {
    throw new Error('Missing required fields: title, targetAmount, and targetDate are required.');
  }

  const goal = await Goal.create({
    userId: (user as any).id,
    title,
    targetAmount: Number(targetAmount),
    targetDate: new Date(targetDate),
    icon: icon || 'PiggyBank',
    status: 'active'
  });

  // In this architecture, revalidation is handled by the client state update or a manual fetch.
  // revalidatePath('/dashboard'); 
  // revalidatePath('/goals');

  return JSON.parse(JSON.stringify(goal));
}

/**
 * Update a financial goal.
 */
export async function updateGoal(req: Request) {
  const user = await requireUser(req);
  await dbConnect();

  const { id } = req.params;
  const { title, targetAmount, targetDate, icon } = req.body;

  if (!id) {
    throw new Error('Goal ID is required.');
  }

  const updateFields: any = {};
  if (title) updateFields.title = title;
  if (targetAmount) updateFields.targetAmount = Number(targetAmount);
  if (targetDate) updateFields.targetDate = new Date(targetDate);
  if (icon) updateFields.icon = icon;

  const goal = await Goal.findOneAndUpdate(
    { _id: id, userId: (user as any).id },
    { $set: updateFields },
    { new: true }
  );

  if (!goal) {
    throw new Error('Goal not found or unauthorized.');
  }

  return JSON.parse(JSON.stringify(goal));
}

/**
 * Delete a financial goal.
 */
export async function deleteGoal(req: Request) {
  const user = await requireUser(req);
  await dbConnect();

  const { id } = req.params;

  if (!id) {
    throw new Error('Goal ID is required.');
  }

  const goal = await Goal.findOneAndDelete({ _id: id, userId: (user as any).id });

  if (!goal) {
    throw new Error('Goal not found or unauthorized.');
  }

  return { success: true };
}
export async function getGoals(req: Request) {
  const user = await requireUser(req);
  await dbConnect();

  const goals = await Goal.find({ userId: (user as any).id }).sort({ createdAt: -1 });

  return JSON.parse(JSON.stringify(goals));
}

/**
 * Fund an existing goal. 
 * Atomic-like operation: updates goal amount and creates a corresponding transaction.
 */
export async function fundGoal(req: Request) {
  const user = await requireUser(req);
  await dbConnect();

  const { goalId, amount } = req.body;

  if (!goalId || !amount) {
    throw new Error('Goal ID and amount are required.');
  }

  const userId = (user as any).id;
  const fundAmount = Number(amount);

  if (isNaN(fundAmount) || fundAmount <= 0) {
    throw new Error('Valid positive amount is required.');
  }

  // Start a transaction if needed for absolute integrity, but for now sequential is fine for this app's scale.
  // 1. Update Goal
  const goal = await Goal.findOneAndUpdate(
    { _id: goalId, userId: userId },
    { $inc: { currentAmount: fundAmount } },
    { new: true }
  );

  if (!goal) {
    throw new Error('Goal not found or unauthorized.');
  }

  // 2. Create Transaction to deduct from main balance
  await Transaction.create({
    userId: userId,
    amount: fundAmount,
    type: 'expense',
    category: 'Savings/Goal',
    description: `Transferred to ${goal.title}`,
    date: new Date()
  });

  // Update status if goal is reached
  if (goal.currentAmount >= goal.targetAmount) {
    goal.status = 'completed';
    await goal.save();
  }

  // revalidatePath('/dashboard');
  // revalidatePath('/goals');

  return JSON.parse(JSON.stringify(goal));
}
