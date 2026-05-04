import React, { useState } from "react";
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  ChevronRight, 
  Trophy, 
  ArrowLeft,
  Share2,
  Bookmark,
  MessageSquare,
  AlertCircle,
  Brain,
  Play,
  Lock,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Shield,
  PieChart,
  Sword
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DETAILED_ACADEMY_ARTICLES as ACADEMY_ARTICLES, DetailedArticle as Article } from "@/lib/data/academyContent";
import StocratesCheckpoint from "./StocratesCheckpoint";
import BudgetCalculator from "./BudgetCalculator";
import InflationErosion from "./InflationErosion";
import InsuranceGap from "./InsuranceGap";
import CompoundVisualizer from "./CompoundVisualizer";
import ToolDirectory from "./ToolDirectory";

const ProgressRing = ({ progress, locked }: { progress: number, locked?: boolean }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (locked) {
    return (
      <div className="h-14 w-14 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
        <Lock className="h-5 w-5 text-slate-400" />
      </div>
    );
  }

  return (
    <div className="relative h-14 w-14 flex items-center justify-center">
      <svg className="absolute inset-0 h-full w-full transform -rotate-90">
        <circle cx="28" cy="28" r={radius} className="stroke-slate-200 dark:stroke-zinc-800" strokeWidth="4" fill="none" />
        <circle 
          cx="28" cy="28" r={radius} 
          className="stroke-emerald-500 transition-all duration-1000 ease-out" 
          strokeWidth="4" 
          fill="none" 
          strokeDasharray={circumference} 
          strokeDashoffset={strokeDashoffset} 
          strokeLinecap="round"
        />
      </svg>
      {progress === 100 ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      ) : (
        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{progress}%</span>
      )}
    </div>
  );
};

import RankDashboard from "./RankDashboard";

export default function ArsenalView() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [financialIq, setFinancialIq] = useState<number>(100);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"core" | "tools">("core");

  const fetchProgress = async () => {
    try {
      const res = await fetch('/api/academy/progress', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setFinancialIq(data.financialIq);
        setCompletedModules(data.completedModules || []);
      }
    } catch (err) {
      console.error('Failed to fetch Academy progress', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProgress();
  }, []);

  const selectedArticle = ACADEMY_ARTICLES.find(a => a.slug === selectedSlug);

  const recommendationSlug = "the-50-30-20-rule-explained";

  const modules = [
    { slug: "why-inflation-is-stealing-your-money", title: "The Silent Thief: Defeating Inflation", category: "Economics", locked: false, icon: <TrendingUp className="h-5 w-5" />, duration: "8 min" },
    { slug: "term-life-vs-health-insurance", title: "The Armor: Advanced Liability Protection", category: "Risk Management", locked: false, icon: <Shield className="h-5 w-5" />, duration: "12 min" },
    { slug: "index-funds-guaranteed-way-to-wealth", title: "The Engine: Index Fund Mastery", category: "Investing", locked: completedModules.length < 2, icon: <PieChart className="h-5 w-5" />, duration: "15 min" }
  ].map(m => ({ ...m, progress: completedModules.includes(m.slug) ? 100 : 0 }));

  if (loading) {
    return <div className="h-64 flex items-center justify-center text-slate-500">Loading Arsenal Profile...</div>;
  }

  return (
    <div className="pb-20">
      <AnimatePresence mode="wait">
        {!selectedSlug ? (
          <motion.div 
            key="index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12 animate-in fade-in duration-1000"
          >
            {/* The Hero Header */}
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] rounded-3xl sm:rounded-[2.5rem] bg-indigo-950 text-white overflow-hidden relative pb-2 sm:pb-4">
              <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10 pointer-events-none">
                <Sword className="w-32 h-32 sm:w-64 sm:h-64" />
              </div>
              <CardContent className="p-6 sm:p-8 md:p-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10">
                
                {/* Title & Subtext */}
                <div className="space-y-3 sm:space-y-4 flex-1 w-full text-center lg:text-left">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">The Arsenal</h1>
                  <p className="text-sm sm:text-lg md:text-xl text-indigo-200 font-medium max-w-2xl mx-auto lg:mx-0">
                    Institutional knowledge and community-curated tools to maximize your purchasing power.
                  </p>
                </div>

                {/* Financial IQ score and rank progression bar */}
                <div className="w-full lg:w-auto shrink-0 relative z-10 scale-90 sm:scale-100">
                  <RankDashboard financialIq={financialIq} />
                </div>
              </CardContent>
            </Card>

            {/* Tabbed Navigation */}
            <div className="flex justify-center sm:justify-start">
              <div className="flex gap-1 p-1 bg-slate-100 dark:bg-zinc-900 rounded-full w-fit border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <button 
                  onClick={() => setActiveTab('core')}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-black tracking-tight transition-all truncate ${activeTab === 'core' ? 'bg-white dark:bg-zinc-800 shadow-sm text-indigo-700 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                >
                  Intelligence
                </button>
                <button 
                  onClick={() => setActiveTab('tools')}
                  className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-black tracking-tight transition-all truncate ${activeTab === 'tools' ? 'bg-white dark:bg-zinc-800 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
                >
                  Tools
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'core' ? (
              <div className="space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* AI 'Up Next' Recommendation */}
                <Card className="border border-indigo-500/20 shadow-xl shadow-indigo-500/5 rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 dark:from-indigo-500/20 dark:to-emerald-500/20 backdrop-blur-md overflow-hidden relative group">
                  <CardContent className="p-6 sm:p-8 md:p-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
                    <div className="space-y-2 sm:space-y-4 flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-700 dark:text-indigo-400">
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
                        <h2 className="text-[10px] sm:text-sm font-black uppercase tracking-widest">Stocrates Recommends</h2>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter text-slate-900 dark:text-white">
                        The 50/30/20 Blueprint
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mx-auto md:mx-0">
                        Based on your recent high expense ratio, we recommend mastering this module today. Learn how to architect a cash flow system that runs on autopilot.
                      </p>
                    </div>
                    <div className="shrink-0 w-full md:w-auto">
                      <Button 
                        onClick={() => setSelectedSlug(recommendationSlug)}
                        className="w-full md:w-auto h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)] transition-all group-hover:scale-105"
                      >
                        <Play className="h-4 w-4 mr-2 sm:mr-3" />
                        Start Session (6 min)
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* The Curriculum Grid */}
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white px-2">
                    Core Curriculum
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {modules.map((mod, i) => (
                      <motion.div 
                        key={i}
                        whileHover={mod.locked ? {} : { scale: 1.02 }}
                        className="group cursor-pointer"
                        onClick={() => !mod.locked && setSelectedSlug(mod.slug)}
                      >
                        <Card className={`h-full border ${mod.locked ? 'border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 opacity-80 filter grayscale-[0.2]' : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-xl transition-all duration-500'} rounded-2xl sm:rounded-3xl overflow-hidden`}>
                          <CardContent className="p-6 sm:p-8 space-y-4 sm:space-y-6 relative h-full flex flex-col justify-between">
                            <div className="space-y-3 sm:space-y-4">
                              <div className="flex items-start justify-between">
                                <Badge variant="outline" className={`text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-2 py-0.5 sm:py-1 rounded-lg ${mod.locked ? 'text-slate-500 border-slate-300' : 'text-blue-600 border-blue-200 bg-blue-50 dark:text-blue-400 dark:border-blue-900/50 dark:bg-blue-900/20'}`}>
                                  {mod.category}
                                </Badge>
                                <div className="scale-75 sm:scale-100 transform origin-right">
                                  <ProgressRing progress={mod.progress} locked={mod.locked} />
                                </div>
                              </div>
                              
                              <div className="space-y-1 sm:space-y-2 pt-1 sm:pt-2">
                                <h3 className="text-base sm:text-lg font-bold leading-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate sm:whitespace-normal">
                                  {mod.title}
                                </h3>
                                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
                                  <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                  <span>{mod.duration}</span>
                                </div>
                              </div>
                            </div>

                            {!mod.locked && (
                              <div className="pt-3 sm:pt-4 border-t border-slate-100 dark:border-zinc-800">
                                <span className="text-[10px] sm:text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer">
                                  {mod.progress === 100 ? 'Review Module' : 'Continue Module'} <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                </span>
                              </div>
                            )}
                            {mod.locked && (
                              <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-zinc-800">
                                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                  <Lock className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Unlocks at Level 3
                                </span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 px-1">
                <ToolDirectory onToolRated={fetchProgress} />
              </div>
            )}
          </motion.div>
        ) : (
          <motion.article 
            key="article"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full relative px-4 sm:px-6"
          >
            {/* Top Navigation */}
            <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedSlug(null)}
                className="pl-0 hover:bg-transparent hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-700 dark:text-slate-300 group-hover:text-indigo-600">Back to {activeTab === 'core' ? 'Core Intelligence' : 'The Arsenal'}</span>
              </Button>
            </div>

            <div className="max-w-7xl mx-auto pb-24 sm:pb-32">
              <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16">
                
                {/* Left Column (The Intelligence - 60%) */}
                <div className="w-full lg:w-3/5 space-y-8 sm:space-y-12 shrink-0">
                  <header className="space-y-4 sm:space-y-6 text-left">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Badge className="w-fit rounded-full px-3 sm:px-4 py-1 sm:py-1.5 border-indigo-200 text-indigo-700 font-black uppercase tracking-widest text-[8px] sm:text-[9px] bg-indigo-50 dark:border-indigo-900/50 dark:bg-indigo-900/20 dark:text-indigo-400">{selectedArticle?.category}</Badge>
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500">{selectedArticle?.readTime} Session</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-[1.2] sm:leading-[1.1] tracking-tighter text-slate-900 dark:text-white text-balance">
                      {selectedArticle?.title}
                    </h1>
                  </header>

                  {/* The Article Body */}
                  <div className="prose prose-slate dark:prose-invert prose-sm sm:prose-base lg:prose-xl max-w-none">
                    {selectedArticle?.sections?.map((section, idx) => {
                      if (section.type === 'header') {
                        const HeaderTag = `h${section.level}` as keyof React.JSX.IntrinsicElements;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <HeaderTag className="text-slate-900 dark:text-white font-black tracking-tight mt-8 mb-4 sm:mt-12 sm:mb-6">{section.text}</HeaderTag>
                          </motion.div>
                        );
                      }
                      if (section.type === 'paragraph') {
                        return (
                          <motion.p
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base lg:text-xl"
                          >
                            {section.text}
                          </motion.p>
                        );
                      }
                      if (section.type === 'blockquote') {
                        return (
                          <motion.blockquote
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="border-l-4 border-l-indigo-600 bg-indigo-50 dark:bg-indigo-900/10 p-4 sm:p-6 rounded-r-xl sm:rounded-r-2xl italic my-6 sm:my-8"
                          >
                            <p className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-200 m-0">{section.text}</p>
                            {section.author && (
                              <footer className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-3 sm:mt-4">- {section.author}</footer>
                            )}
                          </motion.blockquote>
                        );
                      }
                      if (section.type === 'takeaways') {
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200/50 dark:border-emerald-900/50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl my-8 sm:my-10 shadow-sm"
                          >
                            <h3 className="text-lg sm:text-xl font-bold text-emerald-900 dark:text-emerald-400 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 m-0">
                              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                              Key Takeaways
                            </h3>
                            <ul className="space-y-2 sm:space-y-3 m-0 list-none pl-0">
                              {section.items.map((item, idn) => (
                                <li key={idn} className="flex gap-2 sm:gap-3 text-slate-700 dark:text-slate-300 items-start">
                                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0 mt-1" />
                                  <span className="leading-relaxed text-xs sm:text-sm sm:text-base">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        );
                      }
                      return null;
                    })}
                  </div>
                  
                  {/* Disclaimer */}
                  <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-900/30 flex gap-4">
                     <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-amber-800 dark:text-amber-500/80">Protocol Warning</p>
                        <p className="text-xs text-amber-700/80 dark:text-amber-400/80 leading-relaxed font-medium">
                          Disclaimer: Educational purposes only. Not licensed financial advice. Always consult with a certified professional before committing capital.
                        </p>
                     </div>
                  </div>
                </div>

                {/* Right Column (The Reality Panel - 40%) */}
                <div className="w-full lg:w-2/5">
                  <div className="sticky top-6 lg:top-8 space-y-6">
                    {selectedArticle?.slug === "the-50-30-20-rule-explained" && <BudgetCalculator />}
                    {selectedArticle?.slug === "why-inflation-is-stealing-your-money" && <InflationErosion />}
                    {selectedArticle?.slug === "term-life-vs-health-insurance" && <InsuranceGap />}
                    {selectedArticle?.slug === "index-funds-guaranteed-way-to-wealth" && <CompoundVisualizer />}
                  </div>
                </div>

              </div>

              {/* Stocrates Checkpoint */}
              <StocratesCheckpoint 
                slug={selectedArticle?.slug} 
                onComplete={() => fetchProgress()}
                onNext={() => setSelectedSlug(null)}
              />
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
