/**
 * Dashboard Service Layer
 * 
 * This service communicates with the Express backend to fetch aggregated
 * financial metrics for the dashboard.
 */

export interface DashboardMetrics {
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  healthScore: number;
  categoryAllocation: { name: string; value: number }[];
  dailyCashflow: { date: string; income: number; expense: number }[];
  smartAlerts: { id: string; type: 'Warning' | 'Info' | 'Success'; title: string; message: string }[];
  calendarNotes: Record<string, string>;
  monthlyTransactions: any[];
}

export async function saveCalendarNote(date: string, content: string) {
  const response = await fetch("/api/dashboard/calendar-note", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ date, content }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to save calendar note");
  }

  return response.json();
}

export async function getDashboardMetrics(timeRange: 'monthly' | 'yearly' | 'all' = 'yearly'): Promise<DashboardMetrics> {
  let retries = 3;
  let lastError = null;

  while (retries > 0) {
    try {
      const response = await fetch(`/api/dashboard/data?timeRange=${timeRange}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch dashboard metrics (${response.status})`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      if (error instanceof Error && (error.message.includes("Failed to fetch") || error.message.includes("NetworkError") || error.message.includes("fetch"))) {
        retries--;
        if (retries > 0) {
          await new Promise(r => setTimeout(r, 1000));
          continue;
        }
      }
      throw error;
    }
  }
  
  throw lastError;
}
