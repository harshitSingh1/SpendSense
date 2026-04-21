"use client";

import React from "react";
import { 
  ArrowRight, 
  ShieldCheck, 
  PieChart, 
  BrainCircuit, 
  BookOpen, 
  TrendingUp, 
  TrendingDown,
  AlertCircle
} from "lucide-react";
import { motion } from "motion/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Session } from "next-auth";

export default function LandingPage({ session }: { session: Session | null }) {
  const handleGetStarted = () => signIn("google");
  const isAuthenticated = !!session?.user;

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
          <div className="container mx-auto px-6 md:px-10">
            <div className="max-w-[800px] mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-semibold text-muted-foreground mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                  New: AI Financial Advisory is now live
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                  Stop Guessing. <br />
                  <span className="text-muted-foreground/40">Start Growing Your Money.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-[600px] mx-auto leading-relaxed">
                  AI that tracks, teaches, and protects your financial future. Experience the next generation of wealth management.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {isAuthenticated ? (
                    <Link 
                      href="/dashboard" 
                      className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "h-12 px-8 rounded-full text-base font-semibold transition-all hover:scale-105"
                      )}
                    >
                      Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  ) : (
                    <Button size="lg" className="h-12 px-8 rounded-full text-base font-semibold transition-all hover:scale-105" onClick={handleGetStarted}>
                      Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                  <Button variant="outline" size="lg" className="h-12 px-8 rounded-full text-base font-semibold">
                    Watch Demo
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="py-24 bg-muted/30">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">The Financial Friction</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Most people aren't bad with money; they're just fighting a system built to encourage spending. Traditional apps show you what happened—we show you what's possible.
                </p>
                <div className="space-y-6">
                  <ProblemStat 
                    percentage="78%" 
                    label="of workers live paycheck to paycheck" 
                    icon={<AlertCircle className="text-destructive h-5 w-5" />} 
                  />
                  <ProblemStat 
                    percentage="60%" 
                    label="struggle with impulse purchases daily" 
                    icon={<TrendingDown className="text-destructive h-5 w-5" />} 
                  />
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-primary/5 border border-border flex items-center justify-center p-10">
                  <div className="relative h-full w-full">
                    {/* Abstract Grid Visual */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 opacity-10">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className="border border-foreground rounded" />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="mb-6 rounded-full bg-primary/10 p-6">
                        <BrainCircuit className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">AI is the Bridge</h3>
                      <p className="text-sm text-muted-foreground max-w-[280px]">
                        Closing the gap between hard work and financial freedom through automated intelligence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-6 md:px-10 text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Precision-Engineered Intelligence</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              SpendSense AI provides a comprehensive ecosystem to manage and master your money ($ / € / ₹).
            </p>
          </div>
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<PieChart className="h-6 w-6" />}
                title="Tracker"
                description="Automated transaction logging with AI categorization. Gain total visibility into where your money flows every day."
              />
              <FeatureCard 
                icon={<BrainCircuit className="h-6 w-6" />}
                title="Coach"
                description="Your 24/7 AI financial mentor. Get real-time advice on savings, debt strategies, and wealth-building habits."
              />
              <FeatureCard 
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Shield"
                description="Advanced protection for your financial peace. Manage emergency funds, insurance optimization, and long-term risk."
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 border-t border-border">
          <div className="container mx-auto px-6 md:px-10">
            <div className="rounded-3xl bg-primary p-12 text-center text-primary-foreground relative overflow-hidden">
              <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
              
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Ready to redefine your <br /> financial narrative?</h2>
              <p className="text-lg opacity-80 mb-10 max-w-[500px] mx-auto font-light">
                Take the first step towards true financial freedom. Manage your money with intelligence today.
              </p>
              
              {isAuthenticated ? (
                <Link 
                  href="/dashboard" 
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "h-12 px-10 rounded-full font-bold hover:scale-105 transition-transform"
                  )}
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Button size="lg" variant="secondary" className="h-12 px-10 rounded-full font-bold hover:scale-105 transition-transform" onClick={handleGetStarted}>
                  Get Started Free
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-bold">SpendSense AI</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Cookies</a>
              <a href="#" className="hover:text-foreground">Contact</a>
            </div>
            <div className="text-sm text-muted-foreground/60">
              © 2026 SpendSense AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProblemStat({ percentage, label, icon }: { percentage: string, label: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card border border-border group-hover:border-accent/40 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold font-mono tracking-tighter">{percentage}</p>
        <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">{label}</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-none bg-card hover:bg-muted/50 transition-colors shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)]">
      <CardContent className="p-8">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
