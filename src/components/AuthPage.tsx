import React, { useState } from "react";
import { TrendingUp, ArrowLeft, Mail, Lock, User, Bot, Loader2, CheckCircle2, Eye, EyeOff, Check, Circle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div className="min-h-screen flex selection:bg-accent selection:text-accent-foreground">
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 xl:px-24 bg-background relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="absolute top-8 left-6 md:left-16 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="w-full max-w-md mx-auto z-10 mt-16 md:mt-0">
          <div className="flex items-center gap-2 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm">
              <TrendingUp className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">SpendSense</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {mode === "signup" ? "Create your account" : mode === "signin" ? "Welcome back" : "Check your email"}
            </h1>
            <p className="text-muted-foreground mb-8 text-sm md:text-base">
              {mode === "signup" 
                ? "Start optimizing your wealth with AI today." 
                : mode === "signin" 
                  ? "Enter your details to access your dashboard."
                  : `We sent a 6-digit code to ${email}`}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="bg-destructive/15 text-destructive text-sm font-medium p-3 rounded-xl border border-destructive/20 text-center">
                  {errorMsg}
                </div>
              )}
              
              <AnimatePresence mode="popLayout">
                {mode === "otp" && (
                  <motion.div
                    key="otp-form"
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Verification Code</label>
                      <div className="relative">
                        <CheckCircle2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          placeholder="123456" 
                          value={otp}
                          maxLength={6}
                          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                          className="h-12 pl-11 rounded-xl bg-muted/50 border-border focus:bg-background focus:ring-2 focus:ring-indigo-500 font-mono tracking-widest text-lg" 
                          required 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {(mode === "signup" || mode === "signin") && (
                  <motion.div
                    key="main-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    {mode === "signup" && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            placeholder="Alexander Wright" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-12 pl-11 rounded-xl bg-muted/50 border-border focus:bg-background focus:ring-2 focus:ring-indigo-500" 
                            required 
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          type="email" 
                          placeholder="alex@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 pl-11 rounded-xl bg-muted/50 border-border focus:bg-background focus:ring-2 focus:ring-indigo-500" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
                        {mode === "signin" && (
                          <button type="button" onClick={onForgotPassword} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Forgot password?</button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-12 pl-11 pr-11 rounded-xl bg-muted/50 border-border focus:bg-background focus:ring-2 focus:ring-indigo-500" 
                          required 
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      
                      {/* Password Strength Meter */}
                      <AnimatePresence>
                        {mode === "signup" && password.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="space-y-3 overflow-hidden"
                          >
                            <div className="flex gap-1.5">
                              {[1, 2, 3].map((level) => (
                                <div
                                  key={level}
                                  className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                                    pwdStrength >= level
                                      ? pwdStrength === 3
                                        ? "bg-emerald-500"
                                        : pwdStrength === 2
                                        ? "bg-amber-400"
                                        : "bg-red-400"
                                      : "bg-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-xs space-y-1.5">
                              <div className="flex items-center gap-2 transition-colors duration-300">
                                {hasMinLength ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Circle className="h-3.5 w-3.5 text-muted-foreground/30" />}
                                <span className={hasMinLength ? "text-emerald-500" : "text-muted-foreground"}>At least 8 characters</span>
                              </div>
                              <div className="flex items-center gap-2 transition-colors duration-300">
                                {hasLetter ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Circle className="h-3.5 w-3.5 text-muted-foreground/30" />}
                                <span className={hasLetter ? "text-emerald-500" : "text-muted-foreground"}>Contains letters</span>
                              </div>
                              <div className="flex items-center gap-2 transition-colors duration-300">
                                {hasNumber ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Circle className="h-3.5 w-3.5 text-muted-foreground/30" />}
                                <span className={hasNumber ? "text-emerald-500" : "text-muted-foreground"}>Contains numbers</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button 
                type="submit" 
                disabled={isLoading || (mode === "signup" && (!isValidPassword(password) || !isValidName(name)))}
                className="w-full h-12 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-bold mt-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (mode === "signup" ? "Continue" : mode === "signin" ? "Sign In" : "Verify Code")}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="bg-background px-4 text-muted-foreground font-bold">Or continue with</span>
              </div>
            </div>

            <Button 
              type="button" 
              variant="outline" 
              onClick={onGoogleSignIn}
              className="w-full h-12 rounded-xl bg-card border border-border hover:bg-muted font-bold transition-transform active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
              </svg>
              <span>Google</span>
            </Button>

            {mode !== "otp" && (
              <p className="mt-8 text-center text-sm text-muted-foreground">
                {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
                <button 
                  type="button"
                  onClick={() => {
                    setMode(mode === "signup" ? "signin" : "signup");
                    setErrorMsg("");
                  }}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
                >
                  {mode === "signup" ? "Sign in" : "Create one"}
                </button>
              </p>
            )}
            
            {mode === "otp" && (
              <p className="mt-8 text-center text-sm text-muted-foreground">
                <button 
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMsg("");
                    setOtp("");
                  }}
                  className="font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back to sign up
                </button>
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Right Column: Visual Showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-muted items-center justify-center p-12 relative overflow-hidden">
        {/* Dynamic Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute h-full w-full bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
        
        {/* Visual Content */}
        <div className="relative z-10 w-full max-w-lg aspect-square flex flex-col">
          <div className="bg-card shadow-2xl rounded-3xl p-8 border border-border/50 relative transform translate-x-8 translate-y-8 rotate-3 transition-transform hover:rotate-0 hover:translate-x-0 hover:translate-y-0 duration-700">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Net Worth</p>
                <p className="text-4xl font-black font-mono tracking-tighter">₹24,59,200</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold">
                +14%
              </div>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-2xl bg-muted/40 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 rounded-2xl shadow-xl shadow-slate-900/20 dark:shadow-white/20 backdrop-blur-sm border border-slate-800 dark:border-slate-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
              <Bot className="h-6 w-6 text-indigo-400 dark:text-indigo-600" />
              <div>
                <p className="text-[10px] uppercase font-bold opacity-80">AI Insight</p>
                <p className="text-sm font-semibold">You saved ₹12,000 this month!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
