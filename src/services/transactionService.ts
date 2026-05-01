/**
 * Transaction Service Layer
 * 
 * Note: Since we are in a Vite + React SPA architecture, this replaces Next.js Server Actions.
 * These functions call the Express API routes defined in server.ts.
 */

export interface TransactionData {
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description?: string;
  date?: string;
}

export async function addTransaction(data: TransactionData) {
  const response = await fetch("/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create transaction");
  }

  // Instead of revalidatePath, we return the new transaction 
  // so the React state can update locally.
  return await response.json();
}

export async function getRecentTransactions() {
  const response = await fetch("/api/transactions?limit=10", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch transactions");
  }

  // The server handles the .lean() and ID stringification logic
  return await response.json();
}

export async function deleteTransaction(id: string) {
  const response = await fetch(`/api/transactions/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete transaction");
  }

  return await response.json();
}

export async function updateTransaction(id: string, data: Partial<TransactionData>) {
  const response = await fetch(`/api/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update transaction");
  }

  return await response.json();
}
