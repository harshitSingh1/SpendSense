import TrackerView from "@/components/TrackerView";
import { getTransactions } from "@/lib/actions/transactions";

export default async function TrackerPage() {
  const transactions = await getTransactions();
  return <TrackerView initialTransactions={transactions} />;
}
