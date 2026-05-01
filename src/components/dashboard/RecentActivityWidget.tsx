import React from "react";
import { ArrowDownRight, ArrowUpRight, Clock, Plus } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { Button } from "@/components/ui/button";

interface Transaction {
  _id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description?: string;
  date: string;
}

interface RecentActivityWidgetProps {
  transactions: Transaction[];
}

export default function RecentActivityWidget({ transactions }: RecentActivityWidgetProps) {
  const latestTransactions = transactions.slice(0, 5);
  const isEmpty = latestTransactions.length === 0;

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto pr-2 space-y-2 min-h-0">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-muted/20 rounded-2xl border border-dashed border-border/50">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary">
              <Clock className="h-5 w-5 opacity-50" />
            </div>
            <p className="text-sm font-bold text-muted-foreground">No recent activity.</p>
          </div>
        ) : (
          latestTransactions.map((tx) => (
            <div key={tx._id} className="flex items-center justify-between p-2.5 px-3 rounded-2xl bg-white/40 dark:bg-black/20 border border-border/50 shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}>
                  {tx.type === 'income' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-sm font-bold truncate text-foreground">{tx.description || tx.category}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground opacity-70">
                    {tx.category} • {format(new Date(tx.date), 'dd/MM/yy')}
                  </span>
                </div>
              </div>
              <span className={`text-sm font-mono font-black shrink-0 pl-3 ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}`}>
                {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="pt-4 mt-auto">
        <Button 
          className="w-full rounded-xl font-bold shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary/10 text-primary hover:bg-primary/20"
          onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'history' }))}
        >
          <Plus className="w-4 h-4 mr-2" /> Log New Transaction
        </Button>
      </div>
    </div>
  );
}
