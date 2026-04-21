"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Target, 
  Trash2, 
  Wallet, 
  Calendar,
  Loader2,
  CheckCircle2,
  TrendingUp,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { addGoal, deleteGoal, addFundsToGoal } from "@/lib/actions/goals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function GoalsView({ initialGoals = [] }: { initialGoals?: any[] }) {
  const [goals, setGoals] = useState<any[]>(initialGoals);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newGoal, setNewGoal] = useState({
    title: "",
    targetAmount: "",
    targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const handleCreateGoal = async () => {
    if (!newGoal.title || !newGoal.targetAmount) return;
    setIsSubmitting(true);
    const promise = addGoal({
      title: newGoal.title,
      targetAmount: parseFloat(newGoal.targetAmount),
      targetDate: newGoal.targetDate
    });

    toast.promise(promise, {
      loading: 'Architecting your goal...',
      success: (res: any) => {
        if (!res.success) throw new Error(res.error);
        setIsAddingGoal(false);
        setNewGoal({
          title: "",
          targetAmount: "",
          targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
        return "Financial goal established";
      },
      error: (err) => err.message || "Failed to create goal",
    });

    try {
      await promise;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteGoal = async (id: string) => {
    const promise = deleteGoal(id);
    toast.promise(promise, {
      loading: 'Dismantling goal...',
      success: "Goal removed from narrative",
      error: (err) => err.message || "Failed to delete goal",
    });
    await promise;
  };

  const handleAddFunds = async (goalId: string, amount: number) => {
    const promise = addFundsToGoal(goalId, amount);
    toast.promise(promise, {
      loading: 'Allocating funds...',
      success: "Wealth successfully redistributed to goal",
      error: (err) => err.message || "Allocation failed",
    });
    await promise;
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header with CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1">Financial Objectives</h2>
          <p className="text-muted-foreground">Architect your future milestones through disciplined allocation.</p>
        </div>
        <Button 
          onClick={() => setIsAddingGoal(!isAddingGoal)}
          className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 gap-2 font-bold px-6"
        >
          {isAddingGoal ? "Collapse" : <><Plus className="h-4 w-4" /> Define New Goal</>}
        </Button>
      </div>

      <AnimatePresence>
        {isAddingGoal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl bg-muted/20">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1 ml-1 leading-none">Objective Title</p>
                    <Input 
                      placeholder="e.g. Dream Retreat, Security Fund..." 
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                      className="rounded-2xl bg-background border-none h-14 px-5 focus:ring-2 focus:ring-secondary/20 shadow-inner font-semibold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1 ml-1 leading-none">Target Value ($ / € / ₹)</p>
                    <Input 
                      placeholder="100,000" 
                      type="number"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                      className="rounded-2xl bg-background border-none h-14 px-5 focus:ring-2 focus:ring-secondary/20 shadow-inner font-mono text-lg font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1 ml-1 leading-none">Target Horizon</p>
                    <Input 
                      type="date" 
                      value={newGoal.targetDate}
                      onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                      className="rounded-2xl bg-background border-none h-14 px-5 focus:ring-2 focus:ring-secondary/20 shadow-inner" 
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleCreateGoal}
                  disabled={isSubmitting || !newGoal.title || !newGoal.targetAmount}
                  className="w-full mt-8 h-14 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base shadow-xl shadow-secondary/10 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <TrendingUp className="mr-2 h-5 w-5" />}
                  Establish Objective
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goals Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {initialGoals.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 py-20 text-center">
            <div className="h-16 w-16 rounded-3xl bg-muted/30 flex items-center justify-center mx-auto mb-4 text-muted-foreground/40">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-muted-foreground/60 mb-2">No objectives defined.</h3>
            <p className="text-sm text-muted-foreground/40 max-w-sm mx-auto">Establish your first financial milestone to begin your intelligence-led savings journey.</p>
          </div>
        ) : (
          initialGoals.map((goal) => (
            <GoalCard 
              key={goal._id} 
              goal={goal} 
              onDelete={() => handleDeleteGoal(goal._id)}
              onAddFunds={(amount) => handleAddFunds(goal._id, amount)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function GoalCard({ goal, onDelete, onAddFunds }: { goal: any, onDelete: () => void, onAddFunds: (amount: number) => void }) {
  const [isContributing, setIsContributing] = useState(false);
  const [contributionAmount, setContributionAmount] = useState("");
  
  const progress = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
  const isCompleted = goal.status === 'completed' || progress >= 100;

  return (
    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
      <CardHeader className="pb-4 relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${isCompleted ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/5 text-primary'}`}>
            {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <Target className="h-6 w-6" />}
          </div>
          <div className="flex items-center gap-1">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={onDelete}
                className="h-9 w-9 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">{goal.title}</CardTitle>
        <CardDescription className="text-sm font-semibold flex items-center gap-1.5 text-muted-foreground/70">
          <Calendar className="h-3.5 w-3.5" />
          By {new Date(goal.targetDate).toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none opacity-40">Allocated</p>
              <p className="text-xl font-mono font-black tracking-tighter text-foreground italic">{goal.currentAmount.toLocaleString()}</p>
            </div>
            <div className="text-right space-y-0.5">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none opacity-40">Target</p>
              <p className="text-xl font-mono font-black tracking-tighter text-muted-foreground/40">{goal.targetAmount.toLocaleString()}</p>
            </div>
          </div>
          <div className="relative">
            <Progress value={progress} className="h-2.5 bg-muted rounded-full" />
            <div className="absolute -top-1.5 right-0 translate-x-1/2 h-3.5 w-1 bg-primary/20 rounded-full" />
          </div>
          <div className="flex justify-between items-center px-1">
             <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-30 italic">Progress Velocity</p>
             <p className={`text-xs font-black italic ${isCompleted ? 'text-emerald-600' : 'text-primary'}`}>{progress}%</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isContributing ? (
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="space-y-4"
            >
              <div className="flex gap-2">
                <Input 
                  placeholder="Amount" 
                  type="number"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(e.target.value)}
                  className="rounded-xl border-none bg-muted/50 h-11 font-mono font-bold"
                />
                <Button 
                  onClick={() => {
                    if (!contributionAmount) return;
                    onAddFunds(parseFloat(contributionAmount));
                    setIsContributing(false);
                    setContributionAmount("");
                  }}
                  className="rounded-xl bg-secondary text-secondary-foreground font-bold flex-1"
                >
                  Allocate
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setIsContributing(false)}
                  className="rounded-xl h-11"
                >
                  X
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Button 
                disabled={isCompleted}
                onClick={() => setIsContributing(true)}
                className={`w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isCompleted ? 'bg-muted text-muted-foreground opacity-50' : 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98]'}`}
              >
                {isCompleted ? "Objective Secured" : <><Wallet className="h-5 w-5" /> Distribute Wealth</>}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
