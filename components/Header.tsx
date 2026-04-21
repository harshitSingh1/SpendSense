"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { TrendingUp, LayoutDashboard, LogOut, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <TrendingUp className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">SpendSense AI</span>
        </Link>

        <nav className="flex items-center gap-4">
          {status === "loading" ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
          ) : session ? (
            <div className="flex items-center gap-4">
              <Link href="/learn">
                <Button variant="ghost" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Learn
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" className="gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 overflow-hidden rounded-full border border-border bg-muted">
                  {session.user?.image ? (
                    <img src={session.user.image} alt={session.user.name || ""} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-bold uppercase">
                      {session.user?.name?.[0]}
                    </div>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => signOut()}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => signIn("google")} className="bg-primary text-primary-foreground">
              Log In / Sign Up
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
