import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Bot, 
  PiggyBank, 
  ShieldCheck, 
  Sparkles, 
  X,
  Command,
  ArrowRight
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, query?: string) => void;
}

export default function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // Toggle is handled by parent, but this prevents default browser behavior
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onNavigate("analytics", query.trim());
      onClose();
    }
  };

  const quickActions = [
    { id: "analytics", icon: <Bot className="h-5 w-5 text-emerald-500" />, label: "Ask Stocrates", sub: "Instant AI answers", route: "analytics" },
    { id: "goals", icon: <PiggyBank className="h-5 w-5 text-indigo-500" />, label: "Manage Piggy Banks", sub: "Savings & Goals", route: "goals" },
    { id: "shield", icon: <ShieldCheck className="h-5 w-5 text-rose-500" />, label: "Policy Auditor", sub: "Scan for red flags", route: "shield" },
    { id: "pro", icon: <Sparkles className="h-5 w-5 text-amber-500" />, label: "Upgrade / View Pro", sub: "Unlock all features", route: "pro" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-zinc-950/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-[20%] z-[101] w-full max-w-2xl -translate-x-1/2 p-4"
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl shadow-black/20">
              <form onSubmit={handleSubmit} className="flex items-center border-b border-slate-100 dark:border-zinc-800 p-4">
                <Search className="h-5 w-5 text-slate-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask Stocrates or search features..."
                  className="flex-1 bg-transparent border-none outline-none text-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                />
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 px-2 py-1 text-[10px] font-bold text-slate-400">
                    <Command className="h-3 w-3" />
                    <span>ENTER</span>
                  </div>
                  <button type="button" onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg text-slate-400 transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </form>

              <div className="p-4">
                <div className="px-2 mb-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Quick Navigation</h3>
                </div>
                <div className="grid gap-1">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => {
                        onNavigate(action.route);
                        onClose();
                      }}
                      className="group flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors">
                          {action.icon}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{action.label}</p>
                          <p className="text-xs text-slate-500">{action.sub}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors opacity-0 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>

              {query && (
                <div className="p-4 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/30">
                  <p className="text-xs text-slate-500 italic flex items-center gap-2">
                    <Bot className="h-3 w-3" />
                    Press Enter to ask Stocrates: "{query}"
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
