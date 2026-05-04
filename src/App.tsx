import React, { useState, useEffect, ReactNode } from "react";
import { 
  TrendingUp, 
  ArrowUpRight, 
  Plus, 
  Moon, 
  Sun, 
  LayoutDashboard, 
  PieChart, 
  History, 
  Settings as SettingsIcon,
  Bell,
  Search,
  Menu,
  Coins,
  PiggyBank,
  Bot,
  ShieldCheck,
  BookOpen,
  Sparkles,
  PanelLeft,
  PanelLeftClose,
  Terminal,
} from "lucide-react";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./components/ui/sheet";
import LandingPage from "./components/LandingPage";
import DashboardView from "./components/DashboardView";
import CoachView from "./components/CoachView";
import TrackerView from "./components/TrackerView";
import InvestView from "./components/InvestView";
import ShieldView from "./components/ShieldView";
import ArsenalView from "./components/ArsenalView";
import ProfileView from "./components/ProfileView";
import GoalsView from "./components/GoalsView";
import ProUpgradeView from "./components/ProUpgradeView";
import TermsPage from "./components/TermsPage";
import PrivacyPage from "./components/PrivacyPage";
import ContactPage from "./components/ContactPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import NewPasswordPage from "./components/NewPasswordPage";
import AdminPanel from "./components/AdminPanel";
import CheckoutPage from "./components/CheckoutPage";
import NotFoundPage from "./components/NotFoundPage";
import CommandPalette from "./components/CommandPalette";
import NotificationInbox from "./components/NotificationInbox";

import AuthPage from "./components/AuthPage";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

import { Logo } from './components/ui/Logo';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [appView, setAppView] = useState<"landing" | "auth" | "dashboard" | "terms" | "privacy" | "contact" | "reset-password" | "new-password" | "admin" | "checkout" | "not-found">(
    window.location.pathname === "/auth/new-password" ? "new-password" : 
    window.location.pathname === "/admin" ? "admin" : 
    window.location.pathname === "/checkout" ? "checkout" : "landing"
  );
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Track window size for responsive layout
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch session on mount
  useEffect(() => {
    checkSession();
    
    const handleAuthMessage = (event: MessageEvent) => {
      if (event.data?.type === 'AUTH_SUCCESS') {
        checkSession();
      }
    };

    const handleNavigate = (event: CustomEvent) => {
      if (event.detail) {
        setActiveTab(event.detail);
      }
    };
    
    const handleNavigateView = (event: CustomEvent) => {
      if (event.detail) {
        setAppView(event.detail);
      }
    };
    
    window.addEventListener('message', handleAuthMessage);
    window.addEventListener('navigate', handleNavigate as EventListener);
    window.addEventListener('navigate-view', handleNavigateView as EventListener);
    
    return () => {
      window.removeEventListener('message', handleAuthMessage);
      window.removeEventListener('navigate', handleNavigate as EventListener);
      window.removeEventListener('navigate-view', handleNavigateView as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/session", { 
        credentials: "include",
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const session = await res.json();
      if (session?.user) {
        setUser(session.user);
        if (window.location.pathname === "/admin") {
          if (session.user.isAdmin) {
            setAppView("admin");
          } else {
            setAppView("not-found");
          }
        } else if (window.location.pathname === "/checkout") {
          setAppView("checkout");
        } else {
          setAppView("dashboard"); // Automatically load dashboard if logged in
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Session check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    const width = 600;
    const height = 700;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    
    // Open immediately inside the click handler to prevent popup blockers
    const popup = window.open(
      'about:blank',
      '_blank',
      `width=${width},height=${height},top=${top},left=${left}`
    );

    try {
      const csrfRes = await fetch("/api/auth/csrf", { credentials: "include" });
      const { csrfToken } = await csrfRes.json();

      const res = await fetch("/api/auth/signin/google", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Auth-Return-Redirect": "1"
        },
        body: new URLSearchParams({ 
          csrfToken, 
          callbackUrl: window.location.origin + "/auth-success"
        })
      });

      const data = await res.json();
      if (data.url && popup) {
        popup.location.href = data.url;
      } else if (popup) {
        console.error("No redirect URL returned for signin");
        popup.close();
      }
    } catch (e) {
      console.error("Sign in initialization failed:", e);
      if (popup) popup.close();
    }
  };

  const handleSignOut = async () => {
    try {
      const csrfRes = await fetch("/api/auth/csrf", { credentials: "include" });
      const { csrfToken } = await csrfRes.json();

      await fetch("/api/auth/signout", { 
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ csrfToken })
      });
      
      setUser(null);
      setAppView("landing");
      if (activeTab !== "dashboard" && activeTab !== "arsenal") {
        setActiveTab("dashboard");
      }
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!isLoading && !user && appView === "dashboard") {
      const protectedTabs = ["dashboard", "wealth", "history", "shield", "analytics", "settings"];
      if (protectedTabs.includes(activeTab)) {
        setAppView("auth");
      }
    }
  }, [user, activeTab, appView, isLoading]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleGetStarted = () => {
    if (user) {
      setAppView("dashboard");
    } else {
      setAppView("auth");
    }
  };

  if (appView === "landing") {
    return <LandingPage 
      user={user} 
      onGetStarted={handleGetStarted} 
      onViewTerms={() => setAppView("terms")}
      onViewPrivacy={() => setAppView("privacy")}
      onViewContact={() => setAppView("contact")}
    />;
  }

  if (appView === "auth") {
    return <AuthPage 
      onBack={() => setAppView("landing")} 
      onGoogleSignIn={handleSignIn} 
      onForgotPassword={() => setAppView("reset-password")}
    />;
  }

  if (appView === "reset-password") {
    return <ResetPasswordPage onBack={() => setAppView("auth")} />;
  }

  if (appView === "new-password") {
    return <NewPasswordPage onLoginClick={() => {
      // clear the URL so it doesn't stay on /auth/new-password
      window.history.replaceState({}, document.title, "/");
      setAppView("auth")
    }} />;
  }

  if (appView === "terms") {
    return <TermsPage onBack={() => setAppView("landing")} />;
  }

  if (appView === "privacy") {
    return <PrivacyPage onBack={() => setAppView("landing")} />;
  }

  if (appView === "contact") {
    return <ContactPage onBack={() => setAppView("landing")} />;
  }

  if (appView === "admin") {
    return <AdminPanel user={user} onBack={() => {
      setAppView("dashboard");
      setActiveTab("dashboard");
    }} />;
  }

  if (appView === "checkout") {
    return <CheckoutPage 
      onBack={() => {
        setAppView("dashboard");
      }} 
      onSuccess={async () => {
        await checkSession();
        setAppView("dashboard");
      }} 
    />;
  }

  if (appView === "not-found") {
    return <NotFoundPage onBack={() => {
      setAppView("dashboard");
      setActiveTab("dashboard");
    }} />;
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent selection:text-accent-foreground">
      {/* Top Navbar - Full Width */}
      <header className="fixed top-0 left-0 right-0 z-50 shrink-0 border-b border-slate-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md h-20 flex items-center">
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-8 w-full">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Logo in Navbar */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer mr-2 sm:mr-4" onClick={() => setAppView("landing")}>
              <Logo className="h-8 w-8 sm:h-10 sm:w-10 shrink-0" />
              <h1 className="hidden sm:block text-lg md:text-xl font-sonsie tracking-normal bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 dark:from-violet-400 dark:via-blue-400 dark:to-emerald-400 whitespace-nowrap">
                SpendSense
              </h1>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 flex flex-col h-full bg-slate-50 dark:bg-zinc-950">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                  <div className="mb-8 flex items-center justify-between w-full mt-2">
                     <div className="flex items-center gap-3 cursor-pointer" onClick={() => setAppView("landing")}>
                       <Logo className="h-8 w-8 shrink-0" />
                       <span className="font-sonsie tracking-normal text-lg bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 dark:from-violet-400 dark:via-blue-400 dark:to-emerald-400 whitespace-nowrap">SpendSense</span>
                     </div>
                  </div>

                  <div className="space-y-1.5">
                     <NavItem active={activeTab === "dashboard"} onClick={() => { setActiveTab("dashboard"); }} icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" />
                     <NavItem active={activeTab === "history"} onClick={() => { setActiveTab("history"); }} icon={<History className="h-4 w-4" />} label="Omni-Tracker" />
                     <NavItem active={activeTab === "analytics"} onClick={() => { setActiveTab("analytics"); }} icon={<Bot className="h-4 w-4" />} label="AI Coach" />
                     <NavItem active={activeTab === "goals"} onClick={() => { setActiveTab("goals"); }} icon={<PiggyBank className="h-4 w-4" />} label="Piggy Banks" />
                     <NavItem active={activeTab === "wealth"} onClick={() => { setActiveTab("wealth"); }} icon={<Coins className="h-4 w-4" />} label="Wealth Engine" />
                     <NavItem active={activeTab === "shield"} onClick={() => { setActiveTab("shield"); }} icon={<ShieldCheck className="h-4 w-4" />} label="Protection" />
                     <NavItem active={activeTab === "arsenal"} onClick={() => { setActiveTab("arsenal"); }} icon={<BookOpen className="h-4 w-4" />} label="The Arsenal" />
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-zinc-800">
                    <Button 
                       variant="default" 
                       className="w-full justify-start gap-3 rounded-xl border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary shadow-sm h-12"
                       onClick={() => { setActiveTab("pro"); }}
                    >
                       <Sparkles className="h-5 w-5" />
                       <span className="font-bold">Upgrade to Pro</span>
                    </Button>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shrink-0">
                  {!user ? (
                    <Button 
                      onClick={() => setAppView("auth")}
                      className="w-full justify-center gap-3 rounded-xl bg-slate-900 border border-slate-800 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 h-14"
                    >
                      <Bot className="h-5 w-5 text-emerald-400 shrink-0" />
                      <span className="whitespace-nowrap font-bold">Sign In</span>
                    </Button>
                  ) : (
                    <div 
                      onClick={() => { setActiveTab("settings"); }}
                      className="group flex items-center justify-between rounded-xl bg-slate-100 dark:bg-zinc-900 p-3 transition-colors hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 cursor-pointer w-full overflow-hidden"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-secondary">
                          {user.image ? (
                            <img src={user.image} alt={user.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                             <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=0D8ABC&color=fff`} className="h-full w-full" alt="Avatar" />
                          )}
                        </div>
                        <div className="min-w-0 flex flex-col items-start text-left">
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate w-full">{user.name}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate w-full">{user.email}</span>
                        </div>
                      </div>
                      <Button 
                        onClick={(e) => { e.stopPropagation(); handleSignOut(); }}
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 shrink-0 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <div className="relative w-72 lg:w-96 hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <div 
                className="w-full h-10 bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800 rounded-full pl-10 pr-4 text-sm flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
                onClick={() => setIsCommandPaletteOpen(true)}
              >
                <span className="text-slate-500">Search features, insights...</span>
                <div className="flex items-center gap-1 scale-90">
                  <kbd className="px-2 py-0.5 rounded border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-[10px] font-bold text-slate-400">⌘</kbd>
                  <kbd className="px-2 py-0.5 rounded border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-[10px] font-bold text-slate-400">K</kbd>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full h-10 w-10">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNotificationOpen(!isNotificationOpen);
                }}
                className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full h-10 w-10 relative"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <div className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-zinc-950 pointer-events-none" />
                )}
              </Button>
              
              <NotificationInbox 
                 isOpen={isNotificationOpen} 
                 onClose={() => setIsNotificationOpen(false)}
                 onUnreadCountChange={setUnreadCount}
              />
            </div>
            {!user?.isPro ? (
              <div className="hidden md:flex flex-col items-center relative gap-1">
                <Button 
                  className="gap-2 items-center px-5 py-2.5 rounded-full font-bold text-sm bg-slate-900 dark:bg-white border border-slate-800 dark:border-slate-200 text-white dark:text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:bg-slate-800 dark:hover:bg-slate-200 shrink-0"
                  onClick={() => setActiveTab("pro")}
                >
                  <Sparkles className="h-4 w-4 text-emerald-400 dark:text-emerald-500 shrink-0" />
                  <span>Unlock Pro</span>
                </Button>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider absolute -bottom-5 whitespace-nowrap">Free: Limited</span>
              </div>
            ) : (
              <div 
                className="hidden md:flex relative group cursor-pointer"
                onClick={() => setActiveTab("pro")}
              >
                <div className="relative flex items-center px-5 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 dark:from-violet-500 dark:via-blue-500 dark:to-emerald-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] shrink-0 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-1.5 font-bold tracking-tight">
                    <Sparkles className="h-4 w-4 text-emerald-200" /> SpendSense Pro
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap z-50">
                  Unlimited Access
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-sm border-transparent border-b-slate-900 dark:border-b-white border-l-[4px] border-r-[4px] border-b-[4px]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex pt-20 h-screen overflow-hidden">
        {/* Sidebar / Navigation */}
        <motion.nav 
          initial={false}
          animate={{ width: isSidebarCollapsed ? 80 : 256 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="hidden md:block h-full border-r border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 relative z-30 shrink-0"
        >
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute -right-3.5 top-6 z-40 h-7 w-7 rounded-full bg-background shadow-sm border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground hidden md:flex items-center justify-center p-0"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
          <div className={`flex h-full flex-col py-4 md:py-6 overflow-y-auto overflow-x-hidden custom-scrollbar ${isSidebarCollapsed ? 'px-2 items-center' : 'px-4'}`}>
            <div className={`flex flex-1 flex-col gap-1.5 w-full ${isSidebarCollapsed ? 'items-center' : ''}`}>
            <NavItem 
              active={activeTab === "dashboard"} 
              onClick={() => setActiveTab("dashboard")} 
              icon={<LayoutDashboard className="h-4 w-4" />} 
              label="Dashboard" 
              isCollapsed={isSidebarCollapsed}
            />
            <NavItem 
              active={activeTab === "history"} 
              onClick={() => setActiveTab("history")} 
              icon={<History className="h-4 w-4" />} 
              label="Omni-Tracker"
              isCollapsed={isSidebarCollapsed}
            />
            <NavItem 
              active={activeTab === "analytics"} 
              onClick={() => setActiveTab("analytics")} 
              icon={<Bot className="h-4 w-4" />} 
              label="AI Coach" 
              isCollapsed={isSidebarCollapsed}
            />
            <NavItem 
              active={activeTab === "goals"} 
              onClick={() => setActiveTab("goals")} 
              icon={<PiggyBank className="h-4 w-4" />} 
              label="Piggy Banks" 
              isCollapsed={isSidebarCollapsed}
            />
            <NavItem 
              active={activeTab === "wealth"} 
              onClick={() => setActiveTab("wealth")} 
              icon={<Coins className="h-4 w-4" />} 
              label="Wealth Engine" 
              isCollapsed={isSidebarCollapsed}
            />
            <NavItem 
              active={activeTab === "shield"} 
              onClick={() => setActiveTab("shield")} 
              icon={<ShieldCheck className="h-4 w-4" />} 
              label="Protection" 
              isCollapsed={isSidebarCollapsed}
            />
            <NavItem 
              active={activeTab === "arsenal"} 
              onClick={() => setActiveTab("arsenal")} 
              icon={<BookOpen className="h-4 w-4" />} 
              label="The Arsenal" 
              isCollapsed={isSidebarCollapsed}
            />
            {user?.isAdmin && (
              <NavItem 
                active={false} 
                onClick={() => setAppView("admin")} 
                icon={<ShieldCheck className="h-4 w-4 text-rose-500" />} 
                label="Admin Panel" 
                isCollapsed={isSidebarCollapsed}
              />
            )}
          </div>

          <div className={`mt-auto pt-6 w-full ${isSidebarCollapsed ? 'flex flex-col items-center' : ''}`}>
            {!user ? (
              <div className="space-y-4 w-full">
                <Button 
                  onClick={() => setAppView("auth")}
                  className={`w-full justify-center gap-3 rounded-xl bg-slate-900 border border-slate-800 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all overflow-hidden ${isSidebarCollapsed ? 'px-2 py-4' : 'px-4 py-6'}`}
                  title={isSidebarCollapsed ? "Sign In" : undefined}
                >
                  <Bot className="h-5 w-5 text-emerald-400 shrink-0" />
                  {!isSidebarCollapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">Sign In</motion.span>
                  )}
                </Button>
              </div>
            ) : (
              <div 
                onClick={() => setActiveTab("settings")}
                className={`group relative flex items-center rounded-xl bg-slate-100 dark:bg-zinc-900/80 p-3 transition-colors hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 cursor-pointer w-full overflow-hidden ${isSidebarCollapsed ? 'justify-center p-2' : 'justify-between'}`}
                title={isSidebarCollapsed ? "Settings" : undefined}
              >
                <div className={`flex items-center min-w-0 ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-secondary">
                    {user.image ? (
                      <img src={user.image} alt={user.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                       <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=0D8ABC&color=fff`} className="h-full w-full" />
                    )}
                  </div>
                  {!isSidebarCollapsed && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-0 flex flex-col items-start text-left">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate w-full">{user.name}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate w-full">{user.email}</span>
                    </motion.div>
                  )}
                </div>
                {!isSidebarCollapsed && (
                  <Button 
                    onClick={(e) => { e.stopPropagation(); handleSignOut(); }}
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 shrink-0 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.nav>

        {/* Main Content */}
        <motion.main 
          initial={false}
          className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950 overflow-y-auto overflow-x-hidden"
        >
          {/* Subheader and Content Area */}
          <div className={`flex-1 flex flex-col bg-slate-50 dark:bg-zinc-950 px-3 sm:px-4 md:px-0 ${activeTab === 'analytics' ? 'overflow-hidden' : ''}`}>
          {activeTab !== 'analytics' && (
            <div className="px-1 sm:px-4 md:px-8 py-4 sm:py-6 shrink-0 hidden sm:flex items-center justify-between w-full">
              <div className="text-slate-600 dark:text-slate-400 font-medium text-sm">
                  {getGreeting()}, {user?.name ? user.name.split(" ")[0] : "User"} <span className="mx-2 text-slate-300 dark:text-zinc-700">•</span> <span className="capitalize">{activeTab}</span>
              </div>
            </div>
          )}

          <div className={`flex-1 ${activeTab === 'analytics' ? 'flex flex-col min-h-0' : 'px-1 sm:px-4 md:px-8 pb-10'}`}>
            {activeTab === "settings" ? (
              <ProfileView user={user} onSignOut={handleSignOut} />
            ) : activeTab === "dashboard" ? (
              <div><DashboardView /></div>
            ) : activeTab === "wealth" ? (
              <div><InvestView user={user} setActiveTab={setActiveTab} /></div>
            ) : activeTab === "shield" ? (
              <div><ShieldView user={user} setActiveTab={setActiveTab} /></div>
            ) : activeTab === "analytics" ? (
              <CoachView user={user} setActiveTab={setActiveTab} initialQuery={searchQuery} onQueryHandled={() => setSearchQuery("")} />
            ) : activeTab === "arsenal" ? (
              <div><ArsenalView /></div>
            ) : activeTab === "history" ? (
              <div><TrackerView /></div>
            ) : activeTab === "goals" ? (
              <div><GoalsView user={user} setActiveTab={setActiveTab} /></div>
            ) : activeTab === "pro" ? (
              <div><ProUpgradeView user={user} /></div>
            ) : (
              <div className="flex h-[400px] items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">The {activeTab} view is being optimized by AI.</p>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("dashboard")} className="mt-4">
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.main>
    </div>

      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(tab, query) => {
          if (query) setSearchQuery(query);
          setActiveTab(tab);
        }}
      />
    </div>
  );
}


function NavItem({ icon, label, active, onClick, isCollapsed }: { icon: ReactNode, label: string, active?: boolean, onClick: () => void, isCollapsed?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`
        group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-all duration-300 w-full relative overflow-hidden
        ${active 
          ? 'bg-slate-200/50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-slate-100 font-bold shadow-sm' 
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900 border border-transparent font-medium'}
        ${isCollapsed ? 'justify-center h-14' : 'h-14'}
      `}
      title={isCollapsed ? label : undefined}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className={`
          relative flex items-center justify-center shrink-0 w-10 h-10 rounded-xl shadow-lg transition-all duration-300
          ${active 
            ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-indigo-500/20' 
            : 'bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-400 group-hover:text-indigo-500 group-hover:border-indigo-200 shadow-black/5'}
        `}
      >
        <div className="relative z-10 w-5 h-5 flex items-center justify-center">{icon}</div>
        
        {/* Glow effect for active icon */}
        {active && (
          <motion.div 
            layoutId="iconGlow"
            className="absolute inset-0 bg-indigo-500 blur-md opacity-40 rounded-xl"
          />
        )}

        {/* Shine effect on hover */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>

      {!isCollapsed && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="whitespace-nowrap flex-1 text-left font-semibold"
        >
          {label}
        </motion.span>
      )}

      {!isCollapsed && active && (
        <motion.div 
          layoutId="activeTabIndicator"
          className="absolute right-4 w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shadow-[0_0_8px_rgba(79,70,229,0.6)]" 
        />
      )}
    </button>
  );
}
