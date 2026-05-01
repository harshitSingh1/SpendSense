"use client";

import React, { useState, useEffect } from "react";
import { 
  PiggyBank, 
  Target, 
  Plus, 
  Loader2,
  Trophy,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GoalCard from "./goals/GoalCard";
import CreateGoalModal from "./goals/CreateGoalModal";
import { getGoals, GoalData } from "@/src/services/goalService";

export default function GoalsView() {
  const [goals, setGoals] = useState<GoalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary/30" />
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Syncing Targets...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Your Financial Goals</h2>
          <p className="text-sm text-muted-foreground font-medium opacity-60">
            Define and track the landmarks of your wealth journey.
          </p>
        </div>
        <CreateGoalModal onSuccess={fetchGoals} />
      </div>

      {goals.length === 0 ? (
        <Card className="border-2 border-dashed border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 rounded-[3rem] overflow-hidden">
          <CardContent className="flex flex-col items-center justify-center text-center py-24 px-10">
            <div className="h-24 w-24 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mb-8 relative">
              <PiggyBank className="h-10 w-10 text-slate-400 dark:text-slate-500" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-emerald-500/10"
              />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Target-Less Intelligence Detected</h3>
            <p className="text-sm text-muted-foreground max-w-[320px] mx-auto mb-8 font-medium italic">
              "Money without a purpose is just paper. Give your wealth a mission by creating your first Piggy Bank."
            </p>
            <CreateGoalModal 
              onSuccess={fetchGoals}
              trigger={
                <Button className="group rounded-2xl bg-primary px-8 py-6 font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Initialize First Goal
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              }
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {goals.map((goal, idx) => (
              <motion.div
                key={goal._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <GoalCard goal={goal} onUpdate={fetchGoals} />
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Rapid Add Placeholder */}
          <CreateGoalModal 
            onSuccess={fetchGoals}
            trigger={
              <button className="flex flex-col items-center justify-center h-full min-h-[220px] rounded-[2.5rem] border-2 border-dashed border-muted-foreground/10 bg-muted/5 group hover:border-primary/30 hover:bg-muted/10 transition-all cursor-pointer">
                <div className="h-12 w-12 rounded-full border border-dashed border-muted-foreground/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/5 group-hover:border-primary/50 transition-all">
                  <Plus className="h-6 w-6 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-xs font-bold text-muted-foreground group-hover:text-primary/70 transition-colors">Add New Target</span>
              </button>
            }
          />
        </div>
      )}
    </div>
  );
}
