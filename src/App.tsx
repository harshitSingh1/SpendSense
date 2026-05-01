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
  PanelLeftClose
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

import AuthPage from "./components/AuthPage";


const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [appView, setAppView] = useState<"landing" | "auth" | "dashboard" | "terms" | "privacy" | "contact" | "reset-password" | "new-password">(
    window.location.pathname === "/auth/new-password" ? "new-password" : "landing"
  );
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
    
    window.addEventListener('message', handleAuthMessage);
    window.addEventListener('navigate', handleNavigate as EventListener);
    
    return () => {
      window.removeEventListener('message', handleAuthMessage);
      window.removeEventListener('navigate', handleNavigate as EventListener);
    };
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
        setAppView("dashboard"); // Automatically load dashboard if logged in
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

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent selection:text-accent-foreground flex">
      {/* Sidebar / Navigation */}
      <nav className={`fixed left-0 top-0 hidden h-screen border-r border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 md:block transition-all duration-300 z-30 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute -right-3.5 top-24 z-40 h-7 w-7 rounded-full bg-background shadow-sm border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground hidden md:flex items-center justify-center p-0"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          {isSidebarCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
        <div className={`flex h-full flex-col py-6 ${isSidebarCollapsed ? 'px-3 items-center' : 'px-4'}`}>
          <div className="mb-10 flex items-center justify-between w-full px-2">
            <div className={`flex items-center gap-3 cursor-pointer ${isSidebarCollapsed ? 'mx-auto' : ''}`} onClick={() => setAppView("landing")}>
              <div className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm">
                <TrendingUp className="h-5 w-5" />
              </div>
              {!isSidebarCollapsed && <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">SpendSense</h1>}
            </div>
          </div>

          <div className={`flex flex-1 flex-col gap-2 w-full ${isSidebarCollapsed ? 'items-center' : ''}`}>
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
          </div>

          <div className={`mt-auto pt-6 w-full ${isSidebarCollapsed ? 'flex flex-col items-center' : ''}`}>
            {!user ? (
              <div className="space-y-4 w-full">
                <Button 
                  onClick={() => setAppView("auth")}
                  className={`w-full justify-center gap-3 rounded-xl bg-slate-900 border border-slate-800 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all ${isSidebarCollapsed ? 'px-2 py-4' : 'px-4 py-6'}`}
                  title={isSidebarCollapsed ? "Sign In" : undefined}
                >
                  <Bot className="h-5 w-5 text-emerald-400" />
                  {!isSidebarCollapsed && "Sign In"}
                </Button>
              </div>
            ) : (
              <div 
                onClick={() => setActiveTab("settings")}
                className={`group relative flex items-center rounded-xl bg-slate-100 dark:bg-zinc-900/80 p-3 transition-colors hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 cursor-pointer w-full ${isSidebarCollapsed ? 'justify-center p-2' : 'justify-between'}`}
                title={isSidebarCollapsed ? "Settings" : undefined}
              >
                <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-secondary">
                    {user.image ? (
                      <img src={user.image} alt={user.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                       <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=0D8ABC&color=fff`} className="h-full w-full" />
                    )}
                  </div>
                  {!isSidebarCollapsed && (
                    <div className="max-w-[120px] flex flex-col items-start text-left">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate w-full">{user.name}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate w-full">{user.email}</span>
                    </div>
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
      </nav>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950 transition-all duration-300 ${isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'} h-[100dvh]`}>
        {/* Header */}
        <header className="sticky top-0 z-10 shrink-0 border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-20 flex items-center">
          <div className="flex items-center justify-between px-6 md:px-8 w-full">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex h-full flex-col px-4 py-6">
                    <div className="mb-10 flex items-center justify-between w-full px-2 mt-2">
                       <div className="flex items-center gap-3 cursor-pointer" onClick={() => setAppView("landing")}>
                         <div className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm">
                           <TrendingUp className="h-5 w-5" />
                         </div>
                         <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">SpendSense</span>
                       </div>
                    </div>

                    <div className="space-y-2 flex-1">
                       <NavItem active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" />
                       <NavItem active={activeTab === "history"} onClick={() => setActiveTab("history")} icon={<History className="h-4 w-4" />} label="Omni-Tracker" />
                       <NavItem active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} icon={<Bot className="h-4 w-4" />} label="AI Coach" />
                       <NavItem active={activeTab === "goals"} onClick={() => setActiveTab("goals")} icon={<PiggyBank className="h-4 w-4" />} label="Piggy Banks" />
                       <NavItem active={activeTab === "wealth"} onClick={() => setActiveTab("wealth")} icon={<Coins className="h-4 w-4" />} label="Wealth Engine" />
                       <NavItem active={activeTab === "shield"} onClick={() => setActiveTab("shield")} icon={<ShieldCheck className="h-4 w-4" />} label="Protection" />
                       <NavItem active={activeTab === "arsenal"} onClick={() => setActiveTab("arsenal")} icon={<BookOpen className="h-4 w-4" />} label="The Arsenal" />
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-200 dark:border-zinc-800">
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
                </SheetContent>
              </Sheet>

              <div className="relative w-72 lg:w-96 hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  className="w-full h-10 bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800 rounded-full pl-10 pr-4 text-sm focus:outline-none placeholder:text-slate-500 shadow-none ring-offset-0 focus-visible:ring-1 focus-visible:ring-slate-300 dark:focus-visible:ring-slate-700" 
                  placeholder="Search transactions, insights..." 
                />
              </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-6">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full h-10 w-10">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <div className="relative">
                <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full h-10 w-10">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-950 pointer-events-none" />
              </div>
              <Button 
                className="hidden md:flex gap-2 items-center px-5 py-2.5 rounded-full font-bold text-sm bg-slate-900 dark:bg-white border border-slate-800 dark:border-slate-200 text-white dark:text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:bg-slate-900 shrink-0"
                onClick={() => setActiveTab("pro")}
              >
                <Sparkles className="h-4 w-4 text-emerald-400 dark:text-emerald-500 shrink-0" />
                <span>Unlock Pro</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Subheader and Content Area */}
        <div className="flex-1 flex flex-col bg-slate-50 dark:bg-zinc-950 overflow-y-auto">
          <div className="px-6 md:px-8 py-6 shrink-0 hidden md:flex items-center justify-between w-full">
            <div className="text-slate-600 dark:text-slate-400 font-medium text-sm">
                {getGreeting()}, {user?.name ? user.name.split(" ")[0] : "User"} <span className="mx-2 text-slate-300 dark:text-zinc-700">•</span> <span className="capitalize">{activeTab === 'analytics' ? 'AI Coach' : activeTab}</span>
            </div>
            <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm">
              AI Agent: Active
            </div>
          </div>

          <div className="flex-1 px-4 md:px-8 pb-10">
            {activeTab === "settings" ? (
              <ProfileView user={user} onSignOut={handleSignOut} />
            ) : activeTab === "dashboard" ? (
              <div><DashboardView /></div>
            ) : activeTab === "wealth" ? (
              <div><InvestView /></div>
            ) : activeTab === "shield" ? (
              <div><ShieldView /></div>
            ) : activeTab === "analytics" ? (
              <CoachView />
            ) : activeTab === "arsenal" ? (
              <div><ArsenalView /></div>
            ) : activeTab === "history" ? (
              <div><TrackerView /></div>
            ) : activeTab === "goals" ? (
              <div><GoalsView /></div>
            ) : activeTab === "pro" ? (
              <div><ProUpgradeView /></div>
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
      </main>
    </div>
  );
}


function NavItem({ icon, label, active, onClick, isCollapsed }: { icon: ReactNode, label: string, active?: boolean, onClick: () => void, isCollapsed?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors duration-200 w-full relative
        ${active ? 'bg-slate-200/50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-slate-100 font-semibold shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900 border border-transparent font-medium'}
        ${isCollapsed ? 'justify-center px-0 h-11' : 'h-11'}
      `}
      title={isCollapsed ? label : undefined}
    >
      <span className={active ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}>{icon}</span>
      {!isCollapsed && label}
      {!isCollapsed && active && <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-slate-200" />}
    </button>
  );
}
