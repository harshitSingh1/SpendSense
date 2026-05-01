/**
 * Protection Service Layer
 * 
 * This service communicates with the Express backend to analyze financial risk and protection.
 */

export interface ProtectionMetrics {
  averageMonthlyExpense: number;
  targetEmergencyFund: number;
  currentSavings: number;
  hasActiveInsurance: boolean;
  protectionScore: number;
}

export async function getProtectionMetrics(): Promise<ProtectionMetrics> {
  const response = await fetch("/api/protection/data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch protection metrics");
  }

  return await response.json();
}
