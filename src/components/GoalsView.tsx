"use client";

import React, { useState, useEffect } from "react";
import { 
  PiggyBank, 
  Target, 
  Plus, 
  Loader2,
  Trophy,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GoalCard from "./goals/GoalCard";
import CreateGoalModal from "./goals/CreateGoalModal";
import { getGoals, GoalData } from "@/src/services/goalService";

interface GoalsViewProps {
  user?: any;
  setActiveTab?: (tab: string) => void;
}

export default function GoalsView({ user, setActiveTab }: GoalsViewProps) {
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

  const isPro = !!user?.isPro;
  const isLimitReached = !isPro && goals.length >= 2;

  const handleProUpgrade = () => {
    if (setActiveTab) {
      setActiveTab("pro");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary/30" />
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Syncing Targets...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 text-center md:text-left">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Your Financial Goals</h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium opacity-60">
            Define and track the landmarks of your wealth journey.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-3">
          <span className="text-[10px] sm:text-xs font-bold text-muted-foreground opacity-70">
            {isPro ? "Unlimited Banks ✨" : `${goals.length}/2 Free Banks Used`}
          </span>
          {isLimitReached ? (
            <Button 
              onClick={handleProUpgrade}
              className="w-full sm:w-auto rounded-xl sm:rounded-2xl bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 text-white px-6 py-5 sm:py-6 font-bold shadow-lg shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base"
            >
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
              Upgrade for More
            </Button>
          ) : (
            <CreateGoalModal onSuccess={fetchGoals} />
          )}
        </div>
      </div>

      {goals.length === 0 ? (
        <Card className="border-2 border-dashed border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 rounded-[2rem] sm:rounded-[3rem] overflow-hidden">
          <CardContent className="flex flex-col items-center justify-center text-center py-16 sm:py-24 px-6 sm:px-10">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mb-6 sm:mb-8 relative">
              <PiggyBank className="h-8 w-8 sm:h-10 sm:w-10 text-slate-400 dark:text-slate-500" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-emerald-500/10"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-slate-800 dark:text-white">Target-Less Intelligence Detected</h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-[320px] mx-auto mb-6 sm:mb-8 font-medium italic leading-relaxed">
              "Money without a purpose is just paper. Give your wealth a mission by creating your first Piggy Bank."
            </p>
            <CreateGoalModal 
              onSuccess={fetchGoals}
              trigger={
                <Button className="group rounded-xl sm:rounded-2xl bg-primary px-6 sm:px-8 py-5 sm:py-6 font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm">
                  Initialize First Goal
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              }
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {goals.map((goal, idx) => (
              <motion.div
                key={goal._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <GoalCard goal={goal} onUpdate={fetchGoals} isPro={isPro} />
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Rapid Add Placeholder */}
          {isLimitReached ? (
            <button 
              onClick={handleProUpgrade}
              className="flex flex-col items-center justify-center h-full min-h-[220px] rounded-3xl sm:rounded-[2.5rem] border-2 border-dashed border-indigo-500/20 bg-indigo-500/5 group hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all cursor-pointer"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-dashed border-indigo-500/30 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/50 transition-all">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-500/50 group-hover:text-indigo-500 transition-colors" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-indigo-600/80 dark:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                Unlock Pro for Unlimited Banks
              </span>
            </button>
          ) : (
            <CreateGoalModal 
              onSuccess={fetchGoals}
              trigger={
                <button className="flex flex-col items-center justify-center h-full min-h-[220px] rounded-3xl sm:rounded-[2.5rem] border-2 border-dashed border-muted-foreground/10 bg-muted/5 group hover:border-primary/30 hover:bg-muted/10 transition-all cursor-pointer">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-dashed border-muted-foreground/30 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-primary/5 group-hover:border-primary/50 transition-all">
                    <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-muted-foreground group-hover:text-primary/70 transition-colors">Add New Target</span>
                </button>
              }
            />
          )}
        </div>
      )}
    </div>
  );
}
