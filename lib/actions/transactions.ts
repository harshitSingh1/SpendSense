"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import Transaction from "@/lib/models/Transaction";
import { revalidatePath } from "next/cache";

export async function addTransaction(formData: any) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to add a transaction");
  }

  await dbConnect();

  try {
    const transaction = await Transaction.create({
      ...formData,
      userId: session.user.id,
    });
    revalidatePath("/tracker");
    revalidatePath("/dashboard");
    return { success: true, transaction: JSON.parse(JSON.stringify(transaction)) };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function getTransactions() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  await dbConnect();
  try {
    const transactions = await Transaction.find({ userId: session.user.id }).sort({ date: -1 });
    return JSON.parse(JSON.stringify(transactions));
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return [];
  }
}
