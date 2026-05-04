import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle2, ChevronRight, XCircle, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ACADEMY_QUIZZES } from "../../lib/data/academyQuizzes";

export default function StocratesCheckpoint({ slug, onComplete, onNext }: { slug?: string; onComplete?: () => void; onNext?: () => void }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [addedPoints, setAddedPoints] = useState(0);
  const [shake, setShake] = useState(false);

  const questions = slug && ACADEMY_QUIZZES[slug] ? ACADEMY_QUIZZES[slug] : [];
  
  if (questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isPassed = isQuizFinished && score === questions.length;

  const handleOptionClick = (index: number) => {
    if (isAnswerRevealed) return;

    setSelectedOptionIndex(index);
    setIsAnswerRevealed(true);

    if (currentQuestion.options[index].isCorrect) {
      setScore(s => s + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedOptionIndex(null);
      setIsAnswerRevealed(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setIsQuizFinished(true);
    if (score >= 4 && slug) {
      // Corrected here to use actual score + check if passed before finishing. Wait, it needs to evaluate score *including* the last question.
      // Wait, finishQuiz is called AFTER the last question has already been answered and score state has been updated.
    }
  };

  // Safe wrapper for finishing quiz to capture state immediately
  const finishQuizWithFinalScore = async (finalScore: number) => {
    setIsQuizFinished(true);
    if (slug) {
      try {
        const res = await fetch('/api/academy/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ slug, score: finalScore })
        });
        const data = await res.json();
        if (data.addedPoints !== undefined) {
           setAddedPoints(data.addedPoints);
        }
        onComplete?.();
        // Signal notification refresh
        window.dispatchEvent(new CustomEvent('refresh-notifications'));
      } catch (error) {
        console.error("Failed to record checkpoint completion", error);
      }
    }
  };

  const proceedOrFinish = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedOptionIndex(null);
      setIsAnswerRevealed(false);
    } else {
      // current score is updated immediately in react 18? Actually setScore is async. Let's compute final score 
      // wait, `handleOptionClick` updates score. The user clicks an option, THEN clicks "Next Question" which triggers `proceedOrFinish`.
      // At this point, `score` in state is fully updated.
      finishQuizWithFinalScore(score);
    }
  }

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOptionIndex(null);
    setIsAnswerRevealed(false);
    setIsQuizFinished(false);
  };

  return (
    <Card 
      className={`border transition-all duration-500 overflow-hidden relative ${
        isPassed 
          ? "border-emerald-500/50 bg-emerald-950 text-white shadow-[0_0_30px_rgba(16,185,129,0.1)]" 
          : "border-indigo-500/20 bg-indigo-950 text-white"
      } rounded-[2.5rem] mt-16`}
    >
      {/* Decorative background logo */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <Brain className="w-64 h-64" />
      </div>

      <CardHeader className="pb-4 relative z-10 p-8 md:p-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 mb-2">
            {isPassed ? (
               <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400">
                 <CheckCircle2 className="h-6 w-6" />
               </div>
            ) : (
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Brain className="h-5 w-5" />
              </div>
            )}
             <span className={`text-[10px] font-black uppercase tracking-widest ${isPassed ? 'text-emerald-400' : 'text-indigo-400'}`}>
              Stocrates Checkpoint
             </span>
          </div>
          {!isQuizFinished && (
            <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400/60">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          )}
        </div>
        <CardTitle className={`text-2xl md:text-3xl font-black tracking-tight text-white`}>
          {isQuizFinished ? (isPassed ? "Mastery Unlocked" : "Partial Mastery") : "Prove Your Intelligence"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8 relative z-10 px-8 pb-8 md:px-10 md:pb-10">
        {!isQuizFinished ? (
          <>
            <p className="text-lg font-medium text-slate-300 leading-relaxed font-serif italic">
              "{currentQuestion.text}"
            </p>
            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const isCorrect = opt.isCorrect;
                
                let buttonStateClasses = 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer';
                
                if (isAnswerRevealed) {
                  buttonStateClasses = 'border-white/10 bg-white/5 text-slate-500 opacity-50 cursor-default'; // Default for unselected wrong
                  if (isSelected && isCorrect) {
                    buttonStateClasses = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300';
                  } else if (isSelected && !isCorrect) {
                    buttonStateClasses = 'border-red-500/50 bg-red-500/10 text-red-300';
                  } else if (isCorrect) {
                     buttonStateClasses = 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400/80'; // highlight the correct one
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    animate={isSelected && !isCorrect && shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleOptionClick(idx)}
                    disabled={isAnswerRevealed}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${buttonStateClasses}`}
                  >
                    <span className="font-medium text-sm md:text-base">{opt.text}</span>
                    {isAnswerRevealed && isSelected && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 ml-4" />}
                    {isAnswerRevealed && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-400 shrink-0 ml-4" />}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {isAnswerRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className={`p-4 rounded-xl border text-sm font-medium flex items-start gap-3 ${
                    currentQuestion.options[selectedOptionIndex!].isCorrect 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
                      : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
                  }`}>
                    {currentQuestion.options[selectedOptionIndex!].isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-400" />
                    ) : (
                      <Brain className="h-5 w-5 shrink-0 mt-0.5 text-indigo-400" />
                    )}
                    <p>{currentQuestion.rationale}</p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={proceedOrFinish} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                       {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'} <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
             {isPassed ? (
               <>
                 <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-100/90 text-sm md:text-base font-medium flex gap-4 items-start">
                   <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                   <div className="space-y-1">
                     <p className="text-xl font-bold text-emerald-400">You scored {score}/{questions.length}!</p>
                     <p className="leading-relaxed">
                       Spot on. Your understanding of this module is complete. Recognizing these core laws is the next step to becoming a true financial architect.
                     </p>
                   </div>
                 </div>

                 <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-emerald-500/20">
                   <div className="text-center sm:text-left space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/60">Financial IQ Updated</p>
                     <p className="text-2xl font-black text-emerald-400">+{addedPoints} Points</p>
                   </div>
                   <Button 
                     onClick={onNext}
                     className="w-full sm:w-auto h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all group"
                   >
                     Proceed to Next Module
                     <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                   </Button>
                 </div>
               </>
             ) : (
               <>
                 <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-100/90 text-sm md:text-base font-medium flex gap-4 items-start">
                   <Brain className="h-6 w-6 text-indigo-400 shrink-0 mt-0.5" />
                   <div className="space-y-1">
                     <p className="text-xl font-bold text-indigo-400">You scored {score}/{questions.length}.</p>
                     <p className="leading-relaxed">
                       You earned partial points for this module. Stocrates suggests reviewing the material and trying again to unlock the remaining points.
                     </p>
                   </div>
                 </div>

                 <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-indigo-500/20">
                   <div className="text-center sm:text-left space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400/60">Financial IQ Updated</p>
                     <p className="text-2xl font-black text-indigo-400">+{addedPoints} Points</p>
                   </div>
                   <div className="flex items-center gap-3">
                     <Button 
                       onClick={handleRetry}
                       variant="outline"
                       className="w-full sm:w-auto h-12 rounded-xl border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200"
                     >
                       <RefreshCcw className="h-4 w-4 mr-2" />
                       Retry Module
                     </Button>
                     <Button 
                       onClick={onNext}
                       className="w-full sm:w-auto h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8"
                     >
                       Proceed Anyway
                       <ChevronRight className="h-5 w-5 ml-2" />
                     </Button>
                   </div>
                 </div>
               </>
             )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
