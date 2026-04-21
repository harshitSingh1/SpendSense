import GoalsView from "@/components/GoalsView";
import { getGoals } from "@/lib/actions/goals";

export default async function GoalsPage() {
  const goals = await getGoals();
  return <GoalsView initialGoals={goals} />;
}
