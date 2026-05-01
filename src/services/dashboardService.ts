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
    body: JSON.stringify({ date, content }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to save calendar note");
  }

  return response.json();
}

export async function getDashboardMetrics(timeRange: 'monthly' | 'yearly' | 'all' = 'yearly'): Promise<DashboardMetrics> {
  const response = await fetch(`/api/dashboard/data?timeRange=${timeRange}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch dashboard metrics");
  }

  return await response.json();
}
