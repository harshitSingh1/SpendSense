import DashboardView from "@/components/DashboardView";
import { getDashboardMetrics } from "@/lib/actions/dashboard";

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();
  return <DashboardView initialMetrics={metrics} />;
}
