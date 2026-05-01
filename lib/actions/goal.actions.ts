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
 * Fetch all goals for the logged-in user.
 */
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
