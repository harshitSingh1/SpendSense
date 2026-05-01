"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Loader2, 
  PiggyBank, 
  Target, 
  Flame, 
  Heart, 
  ShoppingBag, 
  Briefcase, 
  Car, 
  Home, 
  Plane, 
  Gift 
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createGoal, GoalData } from "@/src/services/goalService";

const ICONS = [
  { name: 'PiggyBank', icon: <PiggyBank className="h-5 w-5" /> },
  { name: 'Target', icon: <Target className="h-5 w-5" /> },
  { name: 'Flame', icon: <Flame className="h-5 w-5" /> },
  { name: 'Heart', icon: <Heart className="h-5 w-5" /> },
  { name: 'ShoppingBag', icon: <ShoppingBag className="h-5 w-5" /> },
  { name: 'Briefcase', icon: <Briefcase className="h-5 w-5" /> },
  { name: 'Car', icon: <Car className="h-5 w-5" /> },
  { name: 'Home', icon: <Home className="h-5 w-5" /> },
  { name: 'Plane', icon: <Plane className="h-5 w-5" /> },
  { name: 'Gift', icon: <Gift className="h-5 w-5" /> },
];

interface CreateGoalModalProps {
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

export default function CreateGoalModal({ onSuccess, trigger }: CreateGoalModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    targetDate: "",
    icon: "PiggyBank"
  });

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'create') {
      const amount = params.get('amount');
      const category = params.get('category');
      
      setFormData(prev => ({
        ...prev,
        title: category === 'Investment' ? 'Investment Portfolio' : (category || prev.title),
        targetAmount: amount ? amount : prev.targetAmount,
      }));
      setOpen(true);
      
      // Clear URL params without reloading page
      const currentUrl = new URL(window.location.href);
      currentUrl.search = '?tab=goals';
      window.history.replaceState({}, '', currentUrl.toString());
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.targetAmount || !formData.targetDate) return;

    setIsSubmitting(true);
    try {
      await createGoal({
        title: formData.title,
        targetAmount: parseFloat(formData.targetAmount),
        targetDate: formData.targetDate,
        icon: formData.icon as any
      });
      setOpen(false);
      setFormData({
        title: "",
        targetAmount: "",
        targetDate: "",
        icon: "PiggyBank"
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to create goal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={(trigger as React.ReactElement) || (
        <Button className="rounded-2xl bg-primary px-6 py-6 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
          <Plus className="h-5 w-5 mr-1" />
          Set New Goal
        </Button>
      )} />
      <DialogContent className="rounded-3xl p-8 border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black mb-1 text-slate-800 dark:text-white">Target Intelligence</DialogTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400">Define your next milestone on the pulse of wealth.</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40 ml-1">Goal Definition</label>
            <Input 
              placeholder="e.g. Dream Retreat 2026" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="h-14 rounded-2xl bg-muted/30 border-none px-6 font-bold"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40 ml-1">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold opacity-30 text-emerald-500">₹</span>
                <Input 
                  type="number"
                  placeholder="0.00" 
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({...formData, targetAmount: e.target.value})}
                  className="h-14 rounded-2xl bg-muted/30 border-none pl-8 font-mono font-bold"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40 ml-1">Deadline</label>
              <Input 
                type="date"
                value={formData.targetDate}
                onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
                className="h-14 rounded-2xl bg-muted/30 border-none px-4 font-bold"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40 ml-1">Visual Anchor</label>
            <div className="grid grid-cols-5 gap-2 bg-muted/20 p-3 rounded-2xl">
              {ICONS.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setFormData({...formData, icon: item.name})}
                  className={`h-11 rounded-xl flex items-center justify-center transition-all ${
                    formData.icon === item.name 
                    ? 'bg-primary text-primary-foreground shadow-lg scale-110' 
                    : 'bg-card/50 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {isSubmitting ? (
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
              ) : (
                <Plus className="h-6 w-6 mr-2" />
              )}
              Initialize Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
