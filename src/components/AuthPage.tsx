import React, { useState } from "react";
import { 
  TrendingUp, 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Bot, 
  Loader2, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Check, 
  Circle,
  ChevronRight,
  ShieldCheck,
  Zap,
  Star,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "./ui/Logo";

interface AuthPageProps {
  onBack: () => void;
  onGoogleSignIn: () => void;
  onForgotPassword?: () => void;
}

type AuthMode = "signin" | "signup" | "otp";

export default function AuthPage({ onBack, onGoogleSignIn, onForgotPassword }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValidPassword = (pwd: string) => {
    return pwd.length >= 8 && /[A-Za-z]/.test(pwd) && /\d/.test(pwd);
  };

  const isValidName = (str: string) => {
    return /^[a-zA-Z0-9 ]+$/.test(str);
  };

  const hasMinLength = password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const pwdStrength = [hasMinLength, hasLetter, hasNumber].filter(Boolean).length;

  const handleNextAuthSignIn = async (action: "signin" | "signup") => {
    const csrfRes = await fetch("/api/auth/csrf", { credentials: "include" });
    const { csrfToken } = await csrfRes.json();

    const res = await fetch("/api/auth/callback/credentials", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Auth-Return-Redirect": "1"
      },
      body: new URLSearchParams({
        csrfToken,
        email,
        password,
        name,
        action,
        redirect: "false"
      })
    });

    const data = await res.json();
    if (data?.url && !data.url.includes("error")) {
      window.postMessage({ type: 'AUTH_SUCCESS' }, "*");
    } else {
      const urlObj = new URL(data?.url || window.location.href);
      const errorParam = urlObj.searchParams.get("error");
      let errorStr = "Authentication failed. Please verify your credentials.";
      if (errorParam === "Configuration") {
         errorStr = "Failed to connect to database.";
      } else if (errorParam === "CredentialsSignin") {
         errorStr = action === "signup" ? "An account with this email already exists." : "Invalid email or password.";
      } else if (errorParam === "OAuthAccountNotLinked") {
         errorStr = "An account with this email already exists. Please sign in with that account.";
      }
      setErrorMsg(errorStr);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      if (mode === "signin") {
        await handleNextAuthSignIn("signin");
      } else if (mode === "signup") {
        if (!isValidName(name)) {
          setErrorMsg("Name can only contain alphabets and numbers.");
          setIsLoading(false);
          return;
        }
        if (!isValidPassword(password)) {
          setIsLoading(false);
          return;
        }

        // Step 1: Send OTP
        const res = await fetch("/api/local-auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (data.success) {
          setMode("otp");
        } else {
          setErrorMsg(data.error || "Failed to send verification code.");
        }
      } else if (mode === "otp") {
        // Step 2: Verify OTP
        const res = await fetch("/api/local-auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, otp })
        });
        const data = await res.json();
        if (data.success) {
          // Finish signup
          await handleNextAuthSignIn("signup");
        } else {
          setErrorMsg(data.error || "Invalid verification code.");
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent selection:text-accent-foreground">
      {/* Navigation - Same as Landing Page */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl shrink-0 h-16">
        <div className="container mx-auto max-w-7xl flex h-full items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
            <Logo className="h-8 w-8" />
            <span className="text-xl font-sonsie tracking-normal bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 dark:from-violet-400 dark:via-blue-400 dark:to-emerald-400">SpendSense</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack} className="flex gap-2 font-bold hover:bg-indigo-500/10 hover:text-indigo-600">
            <ArrowLeft className="h-4 w-4" /> Back Home
          </Button>
        </div>
      </header>

      <div className="flex-1 flex pt-16">
        {/* Left Column: Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 md:px-16 xl:px-24 bg-background relative overflow-hidden">
          {/* Subtle decorative background */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="w-full max-w-[420px] mx-auto z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 text-foreground">
                {mode === "signup" ? "Get Started." : mode === "signin" ? "Welcome Back." : "Check Email."}
              </h1>
              <p className="text-muted-foreground mb-10 text-base font-medium leading-relaxed">
                {mode === "signup" 
                  ? "Join institutional-grade intelligence to master your daily wealth." 
                  : mode === "signin" 
                    ? "Enter your details to access your AI financial dashboard."
                    : `We sent a 6-digit code to ${email}`}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-destructive/10 text-destructive text-sm font-bold p-4 rounded-2xl border border-destructive/20 text-center flex items-center justify-center gap-2"
                  >
                    <Circle className="h-3 w-3 fill-current" /> {errorMsg}
                  </motion.div>
                )}
                
                <AnimatePresence mode="popLayout">
                  {mode === "otp" && (
                    <motion.div
                      key="otp-form"
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2.5"
                    >
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Verification Code</label>
                      <div className="relative group">
                        <CheckCircle2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
                        <Input 
                          placeholder="000000" 
                          value={otp}
                          maxLength={6}
                          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                          className="h-14 pl-12 rounded-2xl bg-muted/30 border-border/60 focus:bg-background focus:ring-2 focus:ring-indigo-500 font-mono tracking-[0.5em] text-xl font-bold" 
                          required 
                        />
                      </div>
                    </motion.div>
                  )}

                  {(mode === "signup" || mode === "signin") && (
                    <motion.div
                      key="main-form"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      className="space-y-5"
                    >
                      {mode === "signup" && (
                        <div className="space-y-2.5">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
                            <Input 
                              placeholder="Harshit Singh" 
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="h-14 pl-12 rounded-2xl bg-muted/30 border-border/60 focus:bg-background focus:ring-2 focus:ring-indigo-500 font-semibold" 
                              required 
                            />
                          </div>
                        </div>
                      )}

                      <div className="space-y-2.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Address</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
                          <Input 
                            type="email" 
                            placeholder="harshit@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-14 pl-12 rounded-2xl bg-muted/30 border-border/60 focus:bg-background focus:ring-2 focus:ring-indigo-500 font-semibold" 
                            required 
                          />
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between ml-1">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Password</label>
                          {mode === "signin" && (
                            <button type="button" onClick={onForgotPassword} className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80 uppercase tracking-widest">Forgot?</button>
                          )}
                        </div>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-14 pl-12 pr-12 rounded-2xl bg-muted/30 border-border/60 focus:bg-background focus:ring-2 focus:ring-indigo-500 font-semibold" 
                            required 
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-indigo-500 transition-colors px-1"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        
                        {mode === "signup" && password.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-3 pt-2"
                          >
                            <div className="flex gap-1.5">
                              {[1, 2, 3].map((level) => (
                                <div
                                  key={level}
                                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                                    pwdStrength >= level
                                      ? pwdStrength === 3 ? "bg-emerald-500" : pwdStrength === 2 ? "bg-amber-400" : "bg-red-400"
                                      : "bg-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-[11px] font-bold grid grid-cols-2 gap-x-4 gap-y-2">
                              <div className="flex items-center gap-2">
                                {hasMinLength ? <Check className="h-3 w-3 text-emerald-500" /> : <Circle className="h-3 w-3 text-muted-foreground/30" />}
                                <span className={hasMinLength ? "text-emerald-500" : "text-muted-foreground"}>8+ Characters</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {hasLetter ? <Check className="h-3 w-3 text-emerald-500" /> : <Circle className="h-3 w-3 text-muted-foreground/30" />}
                                <span className={hasLetter ? "text-emerald-500" : "text-muted-foreground"}>Letters</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {hasNumber ? <Check className="h-3 w-3 text-emerald-500" /> : <Circle className="h-3 w-3 text-muted-foreground/30" />}
                                <span className={hasNumber ? "text-emerald-500" : "text-muted-foreground"}>Numbers</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button 
                  type="submit" 
                  disabled={isLoading || (mode === "signup" && (!isValidPassword(password) || !isValidName(name)))}
                  className="w-full h-14 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 font-black text-base shadow-xl shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (mode === "signup" ? "Create Account" : mode === "signin" ? "Sign In" : "Verify Code")}
                </Button>
              </form>

              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/60"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-black">
                  <span className="bg-background px-6 text-muted-foreground/60">Secure OAuth</span>
                </div>
              </div>

              <Button 
                type="button" 
                variant="outline" 
                onClick={onGoogleSignIn}
                className="w-full h-14 rounded-2xl bg-card border border-border/80 hover:bg-muted font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-4 group"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                  <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                  <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                </svg>
                <span>Continue with Google</span>
              </Button>

              <div className="mt-10 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  {mode === "signup" ? "Already using SpendSense?" : "New to SpendSense?"}{" "}
                  <button 
                    type="button"
                    onClick={() => {
                      setMode(mode === "signup" ? "signin" : "signup");
                      setErrorMsg("");
                    }}
                    className="font-black text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-all border-b-2 border-indigo-600/20 hover:border-indigo-600 pb-0.5"
                  >
                    {mode === "signup" ? "Sign in" : "Create one"}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Dynamic Visual Showcase */}
        <div className="hidden lg:flex lg:w-1/2 bg-slate-50 dark:bg-zinc-950 items-center justify-center p-12 relative overflow-hidden border-l border-border/40">
          {/* Animated Ambient Shapes */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/10 via-emerald-500/10 to-transparent rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none" 
          />
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(circle_at_center,#fff_1px,transparent_1px)]" />

          <div className="relative z-10 w-full max-w-xl space-y-12">
             <div className="flex flex-col gap-6">
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-zinc-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200/50 dark:border-white/5 relative group"
                >
                   <div className="flex items-center justify-between mb-8">
                      <div className="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                         <TrendingUp className="h-7 w-7" />
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Risk Adjusted Assets</p>
                         <p className="text-3xl font-black font-mono tracking-tighter">₹24,59,200</p>
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="h-[2px] w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400" 
                         />
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-bold">
                         <span className="text-muted-foreground uppercase tracking-widest">AI Efficiency Score</span>
                         <span className="text-indigo-500">92/100</span>
                      </div>
                   </div>

                   {/* Floating Intelligence Badge */}
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1 }}
                     className="absolute -bottom-6 -right-6 bg-slate-900 text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/10 group-hover:scale-105 transition-transform"
                   >
                      <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center shadow-inner">
                         <Bot className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">AI Insight</span>
                         <span className="text-sm font-bold">You saved ₹12,000 this month!</span>
                      </div>
                   </motion.div>
                </motion.div>

                <div className="grid grid-cols-2 gap-6">
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.4 }}
                     className="bg-emerald-500/10 backdrop-blur-md p-6 rounded-[2rem] border border-emerald-500/20"
                   >
                      <ShieldCheck className="h-8 w-8 text-emerald-500 mb-4" />
                      <p className="text-sm font-black uppercase tracking-widest text-emerald-600 mb-1">Defense</p>
                      <p className="text-xl font-bold text-emerald-800 dark:text-emerald-400 uppercase">Secure</p>
                   </motion.div>
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.6 }}
                     className="bg-indigo-500/10 backdrop-blur-md p-6 rounded-[2rem] border border-indigo-500/20"
                   >
                      <Zap className="h-8 w-8 text-indigo-500 mb-4" />
                      <p className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-1">Pulse</p>
                      <p className="text-xl font-bold text-indigo-800 dark:text-indigo-400 uppercase">Live</p>
                   </motion.div>
                </div>
             </div>

             <div className="space-y-4 px-2">
                <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">
                   <span className="h-px flex-1 bg-border/60"></span>
                   Security Standard
                   <span className="h-px flex-1 bg-border/60"></span>
                </div>
                <div className="flex justify-center gap-12 opacity-50 transition-all duration-500">
                   <Globe className="h-6 w-6" />
                   <Star className="h-6 w-6" />
                   <Globe className="h-6 w-6" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
