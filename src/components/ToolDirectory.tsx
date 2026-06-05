import React, { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Plane, ShoppingCart, Coins, Sparkles, ExternalLink, ChevronUp, ChevronDown, ArrowRight, ArrowLeft, CheckCircle2, XCircle, ArrowBigUp, ArrowBigDown, BrainCircuit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import Markdown from 'react-markdown';
import { toast } from 'sonner';

type ToolCategory = 'Food & Dining Hacks' | 'Flight & Travel Engineering' | 'Cab & Transport Arbitrage' | 'Shopping & Cashback';

const CATEGORY_META = [
  {
    title: 'Food & Dining Hacks',
    slug: 'food-and-dining',
    description: 'Bypass platform fees, stack restaurant deals, and optimize delivery costs.',
    icon: ShoppingCart,
    gradient: 'from-indigo-500/20 to-violet-500/20',
    iconColor: 'text-indigo-500',
    tags: ['ONDC', 'Gift Cards', 'No Surge']
  },
  {
    title: 'Flight & Travel Engineering',
    slug: 'flight-and-travel',
    description: 'Master positioning flights, grid calendars, and reward multipliers.',
    icon: Plane,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
    tags: ['ITA Matrix', 'Points', 'Error Fares']
  },
  {
    title: 'Cab & Transport Arbitrage',
    slug: 'cab-and-transport',
    description: 'Hack surge pricing algorithms and negotiate directly with drivers.',
    icon: Sparkles,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-500',
    tags: ['Bidding', 'Zero-Surge', 'EV Fleets']
  },
  {
    title: 'Shopping & Cashback',
    slug: 'shopping-and-cashback',
    description: 'Expose fake sales, track historical pricing, and stack portal rewards.',
    icon: Coins,
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-500',
    tags: ['Price Graphs', 'Extensions', 'Stacking']
  }
];

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  score: number;
  icon: React.ElementType;
  userVote: 'up' | 'down' | null;
  affiliateUrl?: string;
}

function ToolVoter({ toolId, initialUpvotes, initialVote, onSync }: { toolId: string, initialUpvotes: number, initialVote: 'up' | 'down' | null, onSync?: () => void }) {
  const [vote, setVote] = useState<'up' | 'down' | null>(initialVote);
  const [score, setScore] = useState(initialUpvotes);
  const [showTeaser, setShowTeaser] = useState(false);

  useEffect(() => {
    if (vote !== null) {
      setShowTeaser(false);
      return;
    }

    // Initial appearance
    const initialTimer = setTimeout(() => {
      setShowTeaser(true);
      setTimeout(() => setShowTeaser(false), 3000);
    }, 2000);

    const interval = setInterval(() => {
      setShowTeaser(true);
      setTimeout(() => setShowTeaser(false), 3000);
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, [vote]);

  const handleVote = async (type: 'up' | 'down') => {
    if (vote === type) return; // Prevent double voting

    // Optimistic UI updates
    const scoreDiff = vote === null ? (type === 'up' ? 1 : -1) : (type === 'up' ? 2 : -2);
    setVote(type);
    setScore(score + scoreDiff);

    if (vote === null) {
      toast.success('+10 Financial IQ', {
        description: `You earned points for reviewing "${toolId}".`,
        icon: <BrainCircuit className="h-4 w-4" />
      });
    }

    try {
      const res = await fetch('/api/arsenal/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ toolId, voteType: type })
      });
      
      if (onSync) onSync();
      // Signal notification refresh
      window.dispatchEvent(new CustomEvent('refresh-notifications'));
    } catch (err) {
      console.error('Failed to rate tool', err);
    }
  };

  return (
    <div className="absolute top-8 right-8 flex items-center gap-4 z-10">
      <AnimatePresence>
        {showTeaser && vote === null && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 5, scale: 0.9, filter: "blur(4px)" }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="hidden md:flex relative items-center px-3.5 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl ring-1 ring-white/20 whitespace-nowrap"
          >
            <Sparkles className="w-3 h-3 mr-2 text-indigo-300 animate-pulse" />
            Get +10 on vote/downvote
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-600 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center justify-center p-1.5 rounded-full bg-white dark:bg-zinc-800 border-[1.5px] border-slate-200 dark:border-zinc-700 shadow-md w-[4.5rem] overflow-hidden transition-all hover:border-indigo-500/30 dark:hover:border-indigo-500/30">
        <motion.button 
          whileHover={{ y: -2, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); handleVote('up'); }}
          className={`p-2 rounded-full transition-all duration-300 ${vote === 'up' ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'text-slate-400 hover:text-emerald-500 hover:bg-slate-50 dark:hover:bg-zinc-700/50'}`}
        >
          <ArrowBigUp className={`h-7 w-7 transition-all ${vote === 'up' ? 'fill-emerald-500' : ''}`} />
        </motion.button>
        
        <span className={`py-1.5 text-base font-black tracking-tight ${vote === 'up' ? 'text-emerald-600 dark:text-emerald-400' : vote === 'down' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-200'}`}>
          {score}
        </span>
        
        <motion.button 
          whileHover={{ y: 2, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); handleVote('down'); }}
          className={`p-2 rounded-full transition-all duration-300 ${vote === 'down' ? 'text-rose-500 bg-rose-50 dark:bg-rose-500/10' : 'text-slate-400 hover:text-rose-500 hover:bg-slate-50 dark:hover:bg-zinc-700/50'}`}
        >
          <ArrowBigDown className={`h-7 w-7 transition-all ${vote === 'down' ? 'fill-rose-500' : ''}`} />
        </motion.button>
      </div>
    </div>
  );
}

export default function ToolDirectory({ onToolRated }: { onToolRated?: () => void }) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch('/api/arsenal/tools', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          const mappedTools = data.map((t: any) => ({
            ...t,
            icon: CATEGORY_META.find(c => c.title === t.category)?.icon || Sparkles
          })).sort((a: any, b: any) => b.score - a.score);
          setTools(mappedTools);
        }
      } catch (err) {
        console.error('Failed to fetch tools:', err);
      }
    };
    fetchTools();
  }, []);

  const handleVoteSync = async () => {
    try {
      const res = await fetch('/api/arsenal/tools', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        const mappedTools = data.map((t: any) => ({
          ...t,
          icon: CATEGORY_META.find(c => c.title === t.category)?.icon || Sparkles
        })).sort((a: any, b: any) => b.score - a.score);
        setTools(mappedTools);
        if (onToolRated) onToolRated();
      }
    } catch (err) {
      console.error('Failed to sync tools after vote', err);
    }
  };

  const selectedCategoryMeta = CATEGORY_META.find(c => c.slug === selectedCategorySlug);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {!selectedCategorySlug ? (
        <>
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Global Categories
            </h2>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Select an arbitrage discipline
            </span>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mt-2 mb-8 px-2">
            Deploy real-world arbitrage. Bypass pricing algorithms, stack hidden rewards, and systematically lower your daily living expenses using these community-sourced exploits.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORY_META.map((cat, idx) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => setSelectedCategorySlug(cat.slug)}
                className="group cursor-pointer h-full relative"
                role="link"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10`} />
                <Card className="h-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-slate-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden flex flex-col relative z-0">
                  <CardContent className="p-8 flex flex-col h-full space-y-6">
                    <div className="flex items-center justify-between">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${cat.gradient}`}>
                        <cat.icon className={`h-8 w-8 ${cat.iconColor}`} />
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-300 dark:text-zinc-700 group-hover:text-slate-900 dark:group-hover:text-white transition-colors group-hover:translate-x-1" />
                    </div>
                    
                    <div className="space-y-3 flex-1">
                      <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                        {cat.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {cat.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-zinc-800/60">
                      {cat.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-slate-300 border-none font-bold text-[10px] tracking-widest uppercase">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategorySlug}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between bg-white dark:bg-zinc-900/50 p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-emerald-500/5 dark:opacity-20"></div>
              <div className="relative">
                <button 
                  onClick={() => setSelectedCategorySlug(null)}
                  className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Arsenal
                </button>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
                    {selectedCategoryMeta?.title}
                  </span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                  {selectedCategoryMeta?.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              {(() => {
                const categoryTools = tools.filter(t => t.category === selectedCategoryMeta?.title);
                
                if (categoryTools.length === 0) {
                  return (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="py-16 px-6 bg-gradient-to-b from-slate-50/50 to-white dark:from-zinc-900/50 dark:to-zinc-950 rounded-[2rem] border border-slate-200/60 dark:border-zinc-800/60 text-center shadow-sm relative overflow-hidden"
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-zinc-700 to-transparent"></div>
                      <Sparkles className="h-10 w-10 mx-auto text-slate-300 dark:text-zinc-700 mb-4" />
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2">No Hacks Curated Yet</h4>
                      <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto">
                        The community is currently researching and verifying structural loopholes for this category.
                      </p>
                    </motion.div>
                  );
                }

                return categoryTools.map((tool, index) => {
                  const content = (tool as any).seoContent || `## Strategy\nComing soon for **${tool.name}**.`;
                  const comparison = (tool as any).comparison || {
                    features: ['Features mapped soon', 'Wait for update'],
                    main: { name: tool.name, checks: [true, true] },
                    competitors: [{ name: 'Alternative', checks: [false, false] }]
                  };

                  return (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="mb-12 p-8 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-sm relative overflow-hidden"
                  >
                    {/* Tool Header Area */}
                    <div className="flex flex-col md:flex-row justify-between mb-8 gap-6 border-b border-slate-100 dark:border-zinc-800/80 pb-6 pr-24">
                      <div className="flex-1">
                        <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-white/70 mb-3">
                          {tool.name}
                        </h3>
                        <p className="text-lg font-medium text-slate-500 dark:text-slate-400 max-w-2xl">
                          {tool.description}
                        </p>
                        
                        <div className="mt-8">
                          <a 
                             href={tool.affiliateUrl || "#"} 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white rounded-xl font-bold transition-all shadow-sm"
                          >
                            Launch Tool <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      {/* Gamification UI strictly in top right */}
                      <ToolVoter 
                        toolId={tool.id} 
                        initialUpvotes={tool.score} 
                        initialVote={tool.userVote} 
                        onSync={handleVoteSync} 
                      />
                    </div>

                    {/* Deep Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                      <div className="lg:col-span-7">
                         <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-h2:tracking-tight prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50 dark:prose-blockquote:bg-indigo-950/30 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300 prose-blockquote:font-medium prose-p:leading-relaxed prose-li:my-1">
                           <div className="markdown-body">
                             <Markdown>{content}</Markdown>
                           </div>
                         </article>
                      </div>

                      {/* Right Column (Comparison / Matrix) */}
                      <div className="lg:col-span-5 bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 lg:p-8 relative mt-4 lg:mt-0">
                        <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                           <Sparkles className="w-5 h-5 text-indigo-500" />
                           The Comparison
                        </h3>
                        
                        <div className="space-y-5">
                          {/* Main Tool Highlight */}
                          <div className="bg-white dark:bg-zinc-800/80 p-5 rounded-2xl border-2 border-indigo-500 shadow-sm relative overflow-hidden">
                             <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-bl-lg">
                               Winner
                             </div>
                             <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-zinc-700 mb-4 mt-2">
                                <span className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">{comparison.main.name}</span>
                             </div>
                             <div className="space-y-3">
                                {comparison.features.map((feat: string, i: number) => (
                                  <div key={i} className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-slate-600 dark:text-slate-300">{feat}</span>
                                    {comparison.main.checks[i] ? (
                                      <div className="flex items-center text-emerald-500">
                                         <CheckCircle2 className="w-5 h-5" />
                                      </div>
                                    ) : (
                                      <div className="flex items-center text-rose-500">
                                         <XCircle className="w-5 h-5" />
                                      </div>
                                    )}
                                  </div>
                                ))}
                             </div>
                          </div>

                          {/* Competitors */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {comparison.competitors.map((comp: any, idx: number) => (
                              <div key={idx} className="bg-white dark:bg-zinc-800/50 p-4 rounded-xl border border-slate-200 dark:border-zinc-700/80 shadow-sm">
                                 <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-zinc-700 mb-3">
                                    <span className="font-bold tracking-tight text-slate-900 dark:text-white">{comp.name}</span>
                                 </div>
                                 <div className="space-y-2">
                                    {comparison.features.map((feat: string, i: number) => (
                                      <div key={i} className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500 dark:text-slate-400 truncate pr-2">{feat}</span>
                                        {comp.checks[i] ? (
                                          <CheckCircle2 className="w-4 h-4 text-emerald-500/80 shrink-0" />
                                        ) : (
                                          <XCircle className="w-4 h-4 text-rose-400/80 shrink-0" />
                                        )}
                                      </div>
                                    ))}
                                 </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );});
              })()}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
