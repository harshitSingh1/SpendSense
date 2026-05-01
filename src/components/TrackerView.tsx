import React, { useState, useEffect } from "react";
import { 
  Plus, 
  History, 
  ArrowUpRight, 
  ArrowDownRight, 
  Loader2,
  AlertCircle,
  MoreVertical,
  CheckCircle2,
  Pencil,
  Trash
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { addTransaction, getRecentTransactions, deleteTransaction, updateTransaction, TransactionData } from "../services/transactionService";
import { useCurrency, formatMoney } from "@/lib/utils/currency";

export default function TrackerView() {
  const currency = useCurrency();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Edit / Delete State
  const [isEditingTx, setIsEditingTx] = useState<any | null>(null);
  const [editFormData, setEditFormData] = useState<TransactionData | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [txToDelete, setTxToDelete] = useState<any | null>(null);

  // Form State
  const [formData, setFormData] = useState<TransactionData>({
    amount: 0,
    type: 'expense',
    category: 'General',
    description: ''
  });

  const categories = [
    "General", "Food", "Transport", "Rent", "Salary", "Utilities", 
    "Entertainment", "Shopping", "Health", "Investment"
  ];

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await getRecentTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount <= 0) return;

    setIsSubmitting(true);
    try {
      await addTransaction(formData);
      setSuccessMessage(true);
      setFormData({
        amount: 0,
        type: 'expense',
        category: 'General',
        description: ''
      });
      await fetchTransactions();
      setTimeout(() => setSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!txToDelete) return;
    setActionLoadingId(txToDelete._id);
    try {
      await deleteTransaction(txToDelete._id);
      await fetchTransactions();
      setTxToDelete(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const openEditModal = (tx: any) => {
    setIsEditingTx(tx);
    setEditFormData({
      amount: tx.amount,
      type: tx.type,
      category: tx.category,
      description: tx.description || '',
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditingTx || !editFormData) return;
    
    setActionLoadingId(isEditingTx._id);
    try {
      await updateTransaction(isEditingTx._id, editFormData);
      await fetchTransactions();
      setIsEditingTx(null);
      setEditFormData(null);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Input Area */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="border border-slate-100 dark:border-zinc-800 shadow-sm rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden">
          <CardHeader className="pb-6 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center">
                <Plus className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-white">Log Transaction</CardTitle>
                <CardDescription className="text-slate-500 font-medium">Capture your financial pulse instantly</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Value Amount</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold opacity-30 group-focus-within:opacity-100 transition-opacity">
                    {formatMoney(0, currency).replace(/[0-9.,\s]/g, '')}
                  </span>
                  <Input 
                    type="number"
                    step="0.01"
                    required
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    value={formData.amount || ""}
                    onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
                    placeholder="0.00" 
                    className="h-16 pl-10 text-2xl font-mono font-bold rounded-2xl bg-muted/30 border-none shadow-inner focus:bg-background transition-all hover:bg-muted/100"
                  />
                </div>
              </div>

              {/* Type Radio-like Toggle */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Flow Type</label>
                <div className="flex p-1 gap-1 rounded-2xl bg-muted/40 border border-border/50">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, type: 'expense'})}
                    className={`flex-1 h-12 rounded-xl text-sm font-bold transition-all ${
                      formData.type === 'expense' 
                      ? 'bg-card text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:bg-muted/60'
                    }`}
                  >
                    Expense
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, type: 'income'})}
                    className={`flex-1 h-12 rounded-xl text-sm font-bold transition-all ${
                      formData.type === 'income' 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                      : 'text-muted-foreground hover:bg-muted/60'
                    }`}
                  >
                    Income
                  </button>
                </div>
              </div>

              {/* Category & Description */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full h-14 rounded-2xl bg-muted/30 border-none px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Description</label>
                  <Input 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="E.g. Groceries"
                    className="h-14 rounded-2xl bg-muted/30 border-none px-4 focus:bg-background"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting || formData.amount <= 0}
                className={`w-full h-14 rounded-2xl text-base font-bold transition-all active:scale-[0.98] ${
                  successMessage 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                  : 'bg-primary text-primary-foreground shadow-xl shadow-primary/20'
                }`}
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : successMessage ? (
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                ) : null}
                {successMessage ? "Recorded Successfully" : "Commit Transaction"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <div className="p-6 rounded-3xl bg-accent/5 border border-accent/10">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-accent shrink-0" />
            <p className="text-xs leading-relaxed text-muted-foreground font-medium italic">
              AI Tip: Logging expenses in the moment increases financial awareness by <span className="text-accent font-bold">23%</span>. Your SpendSense intelligence is tracking categories automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Recent Transactions */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <History className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-xl font-bold tracking-tight">Recent Activity</h3>
          </div>
          {transactions.length > 0 && (
            <span className="text-[10px] font-bold uppercase tracking-widest bg-muted px-3 py-1 rounded-full text-muted-foreground">
              Last 10 Logs
            </span>
          )}
        </div>

        <Card className="border border-slate-100 dark:border-zinc-800 shadow-sm rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="py-32 flex flex-col items-center justify-center text-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary/30 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Syncing Ledger...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="py-24 px-10 text-center">
                <div className="h-20 w-20 rounded-full bg-muted/40 mx-auto flex items-center justify-center mb-6">
                  <History className="h-10 w-10 text-muted-foreground/30" />
                </div>
                <h4 className="text-lg font-bold mb-2">No transactions yet</h4>
                <p className="text-muted-foreground text-sm max-w-[280px] mx-auto">Start tracking your financial pulse using the logger on the left.</p>
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <div className="divide-y divide-border/50 min-w-[500px]">
                  {transactions.map((tx, idx) => (
                  <motion.div
                    key={tx._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between px-6 py-3 hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-muted/60 text-muted-foreground'
                      }`}>
                        {tx.type === 'income' ? <ArrowDownRight className="h-6 w-6" /> : <ArrowUpRight className="h-6 w-6" />}
                      </div>
                      <div>
                        <p className="font-bold text-sm leading-tight mb-1">{tx.category}</p>
                        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-tight opacity-60">
                          {tx.description || 'Omni-Track Logged'} • {format(new Date(tx.date), 'dd/MM/yy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className={`text-lg font-mono font-black tracking-tighter ${
                          tx.type === 'income' ? 'text-emerald-500' : 'text-foreground'
                        }`}>
                          {tx.type === 'income' ? '+' : '-'}{formatMoney(tx.amount ?? 0, currency)}
                        </p>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-40">Processed</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex shrink-0 items-center justify-center text-sm font-medium hover:bg-muted hover:text-foreground h-8 w-8 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:bg-muted">
                          {actionLoadingId === tx._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreVertical className="h-4 w-4" />
                          )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32 rounded-2xl">
                          <DropdownMenuItem onClick={() => openEditModal(tx)} className="cursor-pointer gap-2 mb-1">
                            <Pencil className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTxToDelete(tx)} className="cursor-pointer gap-2 text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!isEditingTx} onOpenChange={(open) => {
        if (!open) {
          setIsEditingTx(null);
          setEditFormData(null);
        }
      }}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl border-none">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          {editFormData && (
            <form onSubmit={handleUpdate} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Amount</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold opacity-30">
                    {formatMoney(0, currency).replace(/[0-9.,\s]/g, '')}
                  </span>
                  <Input 
                    type="number"
                    required
                    value={editFormData.amount}
                    onChange={e => setEditFormData({...editFormData, amount: Number(e.target.value)})}
                    className="pl-10 h-14 rounded-2xl font-mono text-xl font-bold bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:bg-background transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button"
                  variant={editFormData.type === 'expense' ? 'default' : 'outline'}
                  className={`h-12 rounded-xl border font-bold ${editFormData.type === 'expense' ? 'bg-primary border-primary hover:bg-primary/90' : 'border-border/50 text-muted-foreground hover:bg-muted bg-transparent'}`}
                  onClick={() => setEditFormData({...editFormData, type: 'expense'})}
                >
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Expense
                </Button>
                <Button 
                  type="button"
                  variant={editFormData.type === 'income' ? 'default' : 'outline'}
                  className={`h-12 rounded-xl border font-bold ${editFormData.type === 'income' ? 'bg-emerald-500 border-emerald-500 hover:bg-emerald-600 text-white' : 'border-border/50 text-muted-foreground hover:bg-muted bg-transparent'}`}
                  onClick={() => setEditFormData({...editFormData, type: 'income'})}
                >
                  <ArrowDownRight className="mr-2 h-4 w-4" />
                  Income
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Category</label>
                <select 
                  className="flex h-14 w-full items-center justify-between rounded-2xl border border-border/50 bg-muted/50 px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
                  value={editFormData.category}
                  onChange={e => setEditFormData({...editFormData, category: e.target.value})}
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Optional Note</label>
                <Input 
                  placeholder="e.g. Uber to Airport"
                  value={editFormData.description}
                  onChange={e => setEditFormData({...editFormData, description: e.target.value})}
                  className="h-12 rounded-xl bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:bg-background transition-all font-medium"
                />
              </div>

              <DialogFooter className="pt-6 w-full border-none bg-transparent m-0 p-0 sm:justify-center">
                <Button 
                  type="submit" 
                  disabled={!!actionLoadingId}
                  className="w-full h-14 rounded-2xl font-bold text-base text-primary-foreground bg-primary shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {actionLoadingId === isEditingTx?._id ? (
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  ) : null}
                  {actionLoadingId === isEditingTx?._id ? "Saving Changes" : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!txToDelete} onOpenChange={(open) => !open && setTxToDelete(null)}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl border-none">
          <DialogHeader>
            <DialogTitle>Delete Transaction</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <p className="font-semibold text-lg">Are you sure?</p>
            <p className="text-sm text-muted-foreground mt-2">
              You are about to delete a transaction of <span className="font-bold text-foreground">{formatMoney(txToDelete?.amount ?? 0, currency)}</span>. This action cannot be undone.
            </p>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 w-full border-none bg-transparent m-0 p-0">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setTxToDelete(null)}
              className="w-full sm:w-1/2 h-12 rounded-xl font-bold bg-background text-foreground hover:bg-muted"
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="destructive"
              onClick={confirmDelete}
              disabled={!!actionLoadingId}
              className="w-full sm:w-1/2 h-12 rounded-xl font-bold bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all"
            >
              {actionLoadingId === txToDelete?._id ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : null}
              {actionLoadingId === txToDelete?._id ? "Deleting" : "Delete Transaction"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

