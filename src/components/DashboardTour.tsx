import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TOUR_STEPS = [
  {
    title: 'The Pulse',
    text: 'Your financial goals and net worth at a glance.',
  },
  {
    title: 'The Arsenal',
    text: 'Access tactical tools and the Policy Auditor here.',
  },
  {
    title: 'Stocrates AI',
    text: 'Your 24/7 AI CFO. Ask it anything.',
  }
];

export default function DashboardTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isCompleted = localStorage.getItem('spendsense_tour_completed');
    if (!isCompleted) {
      setIsVisible(true);
    }
  }, []);

  const completeTour = () => {
    localStorage.setItem('spendsense_tour_completed', 'true');
    setIsVisible(false);
  };

  const nextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTour();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
        <Card className="bg-slate-900 border border-white/10 text-white rounded-[2rem] shadow-2xl overflow-hidden p-2">
          <CardHeader className="pb-4">
            <CardDescription className="text-emerald-400 font-bold mb-1 uppercase tracking-widest text-xs">
              Step {currentStep + 1} of {TOUR_STEPS.length}
            </CardDescription>
            <CardTitle className="text-2xl font-bold">{TOUR_STEPS[currentStep].title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              {TOUR_STEPS[currentStep].text}
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-between pt-0">
            <Button 
              variant="ghost" 
              onClick={completeTour}
              className="text-slate-400 hover:text-white"
            >
              Skip Tour
            </Button>
            <Button 
              onClick={nextStep}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
            >
              {currentStep === TOUR_STEPS.length - 1 ? 'Get Started' : 'Next'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
