/**
 * Goal Service Layer
 * 
 * This service communicates with the Express backend to manage financial goals (Piggy Banks).
 */

export interface GoalData {
  _id?: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  icon: string;
  status: 'active' | 'completed';
}

export async function getGoals(): Promise<GoalData[]> {
  const response = await fetch("/api/goals", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch goals");
  }

  return await response.json();
}

export async function createGoal(data: Partial<GoalData>): Promise<GoalData> {
  const response = await fetch("/api/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create goal");
  }

  return await response.json();
}

export async function fundGoal(goalId: string, amount: number): Promise<GoalData> {
  const response = await fetch("/api/goals/fund", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ goalId, amount }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fund goal");
  }

  return await response.json();
}
