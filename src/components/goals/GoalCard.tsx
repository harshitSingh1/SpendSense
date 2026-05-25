"use client";

import React, { useState } from "react";
import { 
  PiggyBank, 
  Target, 
  Flame, 
  Heart, 
  ShoppingBag, 
  Briefcase, 
  Car, 
  Home, 
  Plane, 
  Gift,
  Plus,
  Loader2,
  Calendar,
  Pencil,
  Trash2
} from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fundGoal, deleteGoal, updateGoal, GoalData } from "@/src/services/goalService";

const iconMap: Record<string, React.ReactNode> = {
  PiggyBank: <PiggyBank className="h-5 w-5" />,
  Target: <Target className="h-5 w-5" />,
  Flame: <Flame className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
  ShoppingBag: <ShoppingBag className="h-5 w-5" />,
  Briefcase: <Briefcase className="h-5 w-5" />,
  Car: <Car className="h-5 w-5" />,
  Home: <Home className="h-5 w-5" />,
  Plane: <Plane className="h-5 w-5" />,
  Gift: <Gift className="h-5 w-5" />,
};

interface GoalCardProps {
  goal: GoalData;
  onUpdate?: () => void;
  isPro?: boolean;
}

export default function GoalCard({ goal, onUpdate, isPro = false }: GoalCardProps) {
  const [isFunding, setIsFunding] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [open, setOpen] = useState(false);
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editForm, setEditForm] = useState({
    title: goal.title,
    targetAmount: goal.targetAmount.toString(),
    targetDate: goal.targetDate.substring(0, 10),
  });

  const percentage = Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);
  const leftAmount = Math.max(goal.targetAmount - goal.currentAmount, 0);
  const inflationLoss = goal.currentAmount * 0.06;

  const handleFund = async () => {
    const amount = parseFloat(fundAmount);
    if (isNaN(amount) || amount <= 0) return;

    setIsFunding(true);
    try {
      await fundGoal(goal._id!, amount);
      setOpen(false);
      setFundAmount("");
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Failed to fund goal:", error);
    } finally {
      setIsFunding(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteGoal(goal._id!);
      setDeleteOpen(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Failed to delete goal:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateGoal(goal._id!, {
        title: editForm.title,
        targetAmount: parseFloat(editForm.targetAmount),
        targetDate: new Date(editForm.targetDate).toISOString(),
      });
      setEditOpen(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Failed to update goal:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="border border-slate-100 dark:border-zinc-800 shadow-sm rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden group hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
              {iconMap[goal.icon] || <PiggyBank className="h-5 w-5" />}
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-slate-800 dark:text-white">{goal.title}</CardTitle>
              <div className="flex items-center gap-1.5 opacity-60">
                <Calendar className="h-3 w-3 text-slate-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Target: {new Date(goal.targetDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
               <span className="text-sm font-mono font-black text-slate-800 dark:text-white">₹{goal.currentAmount.toLocaleString()}</span>
               <p className="text-[9px] font-bold uppercase tracking-tighter text-slate-400">of ₹{goal.targetAmount.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
               <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" onClick={() => setEditOpen(true)}>
                  <Pencil className="h-3 w-3" />
               </Button>
               <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-400 hover:text-red-500" onClick={() => setDeleteOpen(true)} disabled={isDeleting}>
                  {isDeleting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
               </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-end">
             <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">Progress</span>
             <span className="text-xs font-mono font-bold text-emerald-500">{percentage}%</span>
          </div>
          <div className="h-2 w-full bg-muted/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-emerald-500"
            />
          </div>
          
          <div className="pt-2 text-[10px] sm:text-xs font-medium leading-relaxed">
            {goal.currentAmount === 0 ? (
              <span className="text-slate-500 dark:text-slate-400 italic">
                🌱 Deposit funds to unlock AI wealth protection insights for your '{goal.title}' goal.
              </span>
            ) : !isPro ? (
              <span className="text-red-500/80 dark:text-red-400/80 italic">
                ⚠️ Your ₹{goal.currentAmount.toLocaleString()} is losing ~₹{inflationLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })} in purchasing power yearly. Unlock Pro to see Liquid Fund alternatives.
              </span>
            ) : (
              <span className="text-emerald-700 dark:text-emerald-400 block p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
                💡 Protect this ₹{goal.currentAmount.toLocaleString()}: Stocrates suggests optimizing your '{goal.title}' capital in a high-yield Arbitrage or Liquid Fund. <span className="font-bold underline cursor-pointer hover:text-emerald-800 dark:hover:text-emerald-300" onClick={() => { 
                  const targetDateStr = new Date(goal.targetDate).toLocaleDateString();
                  const query = `I have ₹${goal.currentAmount} saved for my '${goal.title}' goal by ${targetDateStr}. Stocrates, give me an exact Liquid Mutual Fund or Arbitrage fund allocation strategy in India to protect this capital from inflation.`;
                  window.history.pushState({}, '', `/?tab=analytics&q=${encodeURIComponent(query)}`);
                  window.dispatchEvent(new CustomEvent('navigate', { detail: 'analytics' }));
                }}>View Allocation Strategy</span>.
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">Remaining</span>
            <span className="text-[11px] font-bold">₹{leftAmount.toLocaleString()}</span>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button size="sm" className="rounded-xl px-4 bg-primary shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                <Plus className="h-4 w-4 mr-1" />
                Fund Goal
              </Button>} />
            <DialogContent className="rounded-[2.5rem] p-8 border-none bg-white/95 backdrop-blur-xl shadow-2xl sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-center mb-2">Fund {goal.title}</DialogTitle>
                <div className="text-center pb-4">
                   <p className="text-sm text-muted-foreground">How much intelligence would you like to commit today?</p>
                </div>
              </DialogHeader>
              <div className="py-6 space-y-4">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold opacity-30">₹</span>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    className="h-16 pl-10 text-2xl font-mono font-bold rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20"
                    autoFocus
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleFund} 
                  disabled={isFunding || !fundAmount}
                  className="w-full h-14 rounded-2xl text-base font-bold shadow-xl shadow-primary/20"
                >
                  {isFunding ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <Plus className="h-5 w-5 mr-2" />
                  )}
                  Confirm Transfer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent className="rounded-[2.5rem] p-8 border-none bg-white/95 backdrop-blur-xl shadow-2xl sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-center mb-2">Edit Piggy Bank</DialogTitle>
                <div className="text-center pb-4">
                   <p className="text-sm text-muted-foreground">Update the parameters of your goal.</p>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Goal Name</label>
                  <Input 
                    value={editForm.title}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Target Amount</label>
                  <Input 
                    type="number"
                    value={editForm.targetAmount}
                    onChange={(e) => setEditForm(prev => ({ ...prev, targetAmount: e.target.value }))}
                    className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Target Date</label>
                  <Input 
                    type="date"
                    value={editForm.targetDate}
                    onChange={(e) => setEditForm(prev => ({ ...prev, targetDate: e.target.value }))}
                    className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button 
                  onClick={handleUpdate} 
                  disabled={isUpdating || !editForm.title || !editForm.targetAmount || !editForm.targetDate}
                  className="w-full h-14 rounded-2xl text-base font-bold shadow-xl shadow-primary/20"
                >
                  {isUpdating ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <Pencil className="h-5 w-5 mr-2" />
                  )}
                  Update Goal
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
             <DialogContent className="rounded-[2.5rem] p-8 border-none bg-white/95 backdrop-blur-xl shadow-2xl sm:max-w-[400px]">
               <DialogHeader>
                 <DialogTitle className="text-xl font-black text-center mb-1 text-slate-900 dark:text-white">Delete Piggy Bank</DialogTitle>
               </DialogHeader>
               <div className="text-center py-2">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Are you sure?</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">This action cannot be undone.</p>
               </div>
               <DialogFooter className="mt-4 flex flex-row gap-3">
                 <Button variant="outline" onClick={() => setDeleteOpen(false)} className="flex-1 h-12 rounded-xl font-bold bg-transparent">Cancel</Button>
                 <Button 
                   onClick={handleDelete} 
                   disabled={isDeleting}
                   variant="destructive"
                   className="flex-1 h-12 rounded-xl font-bold bg-red-500 hover:bg-red-600 focus:ring-red-500/20"
                 >
                   {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                   Delete
                 </Button>
               </DialogFooter>
             </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
