import ShieldView from "@/components/ShieldView";
import { getShieldMetrics } from "@/lib/actions/shield";

export default async function ShieldPage() {
  const metrics = await getShieldMetrics();
  return <ShieldView metrics={metrics} />;
}
