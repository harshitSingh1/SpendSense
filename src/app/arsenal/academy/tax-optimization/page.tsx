import React, { useEffect, useState } from "react";
import { ArrowLeft, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StocratesCheckpoint from "../../../../components/StocratesCheckpoint";
import TaxOptimizerWidget from "../../../../components/academy/TaxOptimizerWidget";

export default function TaxOptimizationCourse({ onBack, onComplete }: { onBack: () => void, onComplete?: () => void }) {
  const [courseData, setCourseData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch("/api/academy/tax-course", {
          credentials: "include"
        });
        if (response.ok) {
          const data = await response.json();
          setCourseData(data);
        }
      } catch (error) {
        console.error("Failed to fetch tax course data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourseData();
  }, []);

  if (isLoading) {
    return (
       <div className="flex items-center justify-center h-64 text-slate-500">
         <Sparkles className="w-5 h-5 animate-pulse mr-2" />
         Loading Core Intelligence...
       </div>
    );
  }

  if (!courseData) {
    return (
       <div className="flex items-center justify-center p-8 text-center text-red-500">
         Failed to load course information. Please try again later.
       </div>
    );
  }

  return (
    <motion.article 
      key="tax-article"
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
          onClick={onBack}
          className="pl-0 hover:bg-transparent hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-700 dark:text-slate-300 group-hover:text-indigo-600">
            Back to Core Intelligence
          </span>
        </Button>
      </div>

      <div className="max-w-7xl mx-auto pb-24 sm:pb-32">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16">
          
          {/* Left Column (The Intelligence - 60%) */}
          <div className="w-full lg:w-3/5 space-y-8 sm:space-y-12 shrink-0">
            <header className="space-y-4 sm:space-y-6 text-left">
              <div className="flex items-center gap-3 sm:gap-4">
                <Badge className="w-fit rounded-full px-3 sm:px-4 py-1 sm:py-1.5 border-indigo-200 text-indigo-700 font-black uppercase tracking-widest text-[8px] sm:text-[9px] bg-indigo-50 dark:border-indigo-900/50 dark:bg-indigo-900/20 dark:text-indigo-400">
                  {courseData.category || "Tax Optimization"}
                </Badge>
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {courseData.readTime || "10 min"} Session
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-[1.2] sm:leading-[1.1] tracking-tighter text-slate-900 dark:text-white text-balance">
                {courseData.title}
              </h1>
            </header>

            {/* The Article Body */}
            <div className="prose prose-slate dark:prose-invert prose-sm sm:prose-base lg:prose-xl max-w-none">
              {courseData.sections?.map((section: any, idx: number) => {
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
                      <HeaderTag className="text-slate-900 dark:text-white font-black tracking-tight mt-8 mb-4 sm:mt-12 sm:mb-6">
                        {section.text}
                      </HeaderTag>
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
                        {section.items.map((item: string, idn: number) => (
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
                    Disclaimer: Educational purposes only. Not licensed financial advice.
                  </p>
               </div>
            </div>
          </div>

          {/* Right Column (The Reality Panel - 40%) */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-6 lg:top-8 space-y-6">
              <TaxOptimizerWidget region={courseData.region || "Global"} />
            </div>
          </div>

        </div>

        {/* Stocrates Checkpoint */}
        <StocratesCheckpoint 
          slug="tax-optimization" 
          onComplete={onComplete || (() => {})}
          onNext={onBack}
        />
      </div>
    </motion.article>
  );
}
