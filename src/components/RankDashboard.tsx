import React from 'react';
import { motion } from 'motion/react';

export interface RankDashboardProps {
  financialIq: number;
}

const RANKS = [
  { level: 1, name: "Iron Novice", threshold: 0, 
    colors: { text: "text-slate-400", border: "border-slate-500", glow: "shadow-slate-500/20", bg: "bg-slate-500/10", bar: "bg-slate-400" } },
  { level: 2, name: "Cobalt Scout", threshold: 80, 
    colors: { text: "text-blue-400", border: "border-blue-500", glow: "shadow-blue-500/20", bg: "bg-blue-500/10", bar: "bg-blue-400" } },
  { level: 3, name: "Silver Analyst", threshold: 170, 
    colors: { text: "text-zinc-300", border: "border-zinc-400", glow: "shadow-zinc-400/20", bg: "bg-zinc-400/10", bar: "bg-zinc-300" } },
  { level: 4, name: "Azure Strategist", threshold: 270, 
    colors: { text: "text-sky-400", border: "border-sky-500", glow: "shadow-sky-500/30", bg: "bg-sky-500/10", bar: "bg-sky-400" } },
  { level: 5, name: "Platinum Architect", threshold: 420, 
    colors: { text: "text-cyan-300", border: "border-cyan-400", glow: "shadow-cyan-400/30", bg: "bg-cyan-400/10", bar: "bg-cyan-300" } },
  { level: 6, name: "Teal Broker", threshold: 570, 
    colors: { text: "text-teal-400", border: "border-teal-500", glow: "shadow-teal-500/30", bg: "bg-teal-500/10", bar: "bg-teal-400" } },
  { level: 7, name: "Sapphire Quant", threshold: 720, 
    colors: { text: "text-indigo-400", border: "border-indigo-500", glow: "shadow-indigo-500/30", bg: "bg-indigo-500/10", bar: "bg-indigo-400" } },
  { level: 8, name: "Amethyst Oracle", threshold: 870, 
    colors: { text: "text-violet-400", border: "border-violet-500", glow: "shadow-violet-500/30", bg: "bg-violet-500/10", bar: "bg-violet-400" } },
  { level: 9, name: "Obsidian Apex", threshold: 1020, 
    colors: { text: "text-blue-300", border: "border-blue-900", glow: "shadow-blue-900/40", bg: "bg-slate-950", bar: "bg-blue-600" } },
  { level: 10, name: "Celestial CFO", threshold: 1170, 
    colors: { text: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 animate-pulse text-shadow-xl", border: "border-blue-500/50", glow: "shadow-indigo-500/40", bg: "bg-black", bar: "bg-gradient-to-r from-cyan-400 to-indigo-500" } },
];

export default function RankDashboard({ financialIq }: RankDashboardProps) {
  const currentRankIndex = [...RANKS].reverse().findIndex(r => financialIq >= r.threshold);
  const rankIndex = currentRankIndex !== -1 ? RANKS.length - 1 - currentRankIndex : 0;
  const rank = RANKS[rankIndex];
  const nextRank = rankIndex < RANKS.length - 1 ? RANKS[rankIndex + 1] : null;

  let progressPercent = 100;
  let pointsToNext = 0;
  if (nextRank) {
    progressPercent = Math.max(0, Math.min(100, ((financialIq - rank.threshold) / (nextRank.threshold - rank.threshold)) * 100));
    pointsToNext = nextRank.threshold - financialIq;
  }

  return (
    <div className={`p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 ${rank.colors.glow} shadow-xl flex flex-col md:flex-row items-center gap-8`}>
      {/* Badge UI */}
      <motion.div 
        animate={{ scale: [1, 1.02, 1] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className={`w-28 h-28 shrink-0 rounded-2xl border ${rank.colors.border} flex flex-col items-center justify-center ${rank.colors.bg} relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        <span className="text-xs uppercase tracking-widest text-white/50 font-bold mb-1">Level</span>
        <span className={`text-4xl font-black ${rank.colors.text}`}>{rank.level}</span>
      </motion.div>

      {/* Progress Track & Details */}
      <div className="flex-1 w-full space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <h2 className={`text-2xl font-black tracking-tight ${rank.colors.text}`}>{rank.name}</h2>
            <p className="text-sm text-white/50 font-medium mt-1">
              Financial IQ: <span className="text-white font-bold">{financialIq}</span>
            </p>
          </div>
          {nextRank && (
            <div className="text-right">
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Next Rank</span>
              <p className="text-sm font-medium text-white/80 mt-1">
                {pointsToNext} points to <span className={nextRank.colors.text}>{nextRank.name}</span>
              </p>
            </div>
          )}
        </div>

        {/* 4px-thin segmented line */}
        <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`absolute top-0 left-0 h-full rounded-full ${rank.colors.bar}`}
          />
        </div>
      </div>
    </div>
  );
}
