import React, { useState, useRef, useEffect } from "react";
import { 
  PlusCircle, 
  MoreVertical,
  Loader2,
  Zap,
  ArrowRight,
  Bot,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const StocratesIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="stocrates-mask">
      <rect width="24" height="24" fill="white" />
      <rect x="4.5" y="8" width="15" height="10" rx="4.5" fill="black" />
      <circle cx="12" cy="20.5" r="1.5" fill="black" />
    </mask>

    {/* Helmet */}
    <circle cx="12" cy="14" r="9" mask="url(#stocrates-mask)" />
    
    {/* Antenna */}
    <circle cx="12" cy="2.5" r="1.5" />
    <rect x="11.2" y="3.5" width="1.6" height="2" />
    
    {/* Ears */}
    <path d="M 2.5 10.5 A 2 5 0 0 0 2.5 17.5 A 2.5 6 0 0 1 2.5 10.5 Z" />
    <path d="M 21.5 10.5 A 2 5 0 0 1 21.5 17.5 A 2.5 6 0 0 0 21.5 10.5 Z" />

    {/* Eyes */}
    <rect x="8.5" y="10.5" width="2.5" height="4" rx="1.25" />
    <rect x="13" y="10.5" width="2.5" height="4" rx="1.25" />

    {/* Cute Mouth */}
    <path d="M 9.5 15 Q 12 17.5 14.5 15 Q 12 16.5 9.5 15 Z" />
  </svg>
);

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "ai",
    content: "Greetings. I am Stocrates. I've been analyzing the vectors of your current capital allocation. How shall we deepen your financial awareness today?",
    timestamp: new Date(),
  }
];

export default function CoachView({ 
  user, 
  setActiveTab, 
  initialQuery, 
  onQueryHandled 
}: { 
  user?: any, 
  setActiveTab?: any, 
  initialQuery?: string, 
  onQueryHandled?: () => void 
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [promptCount, setPromptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isPro = !!user?.isPro;

  useEffect(() => {
    let active = true;
    
    const doInit = async () => {
      try {
        const res = await fetch("/api/user/status", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (active) setPromptCount(data.promptCountToday || 0);
        }
      } catch (e) {
        console.error(e);
      }

      if (active) setIsLoadingHistory(true);
      try {
        const res = await fetch("/api/chat/history", { credentials: "include" });
        if (!active) return;
        if (res.ok) {
          const data = await res.json();
          if (data.history && data.history.length > 0) {
            const formattedHistory = data.history.map((m: any) => ({
              id: m._id || `msg-${Math.random()}`,
              role: m.role === "model" || m.role === "ai" ? "ai" : "user",
              content: m.content,
              timestamp: new Date(m.createdAt)
            }));
            if (active) setMessages(formattedHistory);
          } else {
            if (active) setMessages(INITIAL_MESSAGES);
          }
        } else {
          if (active) setMessages(INITIAL_MESSAGES);
        }
      } catch (e) {
        console.error(e);
        if (active) setMessages(INITIAL_MESSAGES);
      } finally {
        if (active) setIsLoadingHistory(false);
      }
    };
    
    doInit();
    
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get('q');
    const queryToSend = queryParam || initialQuery;

    if (queryToSend && !isLoading && !isLoadingHistory && !isLocked) {
      handleSend(queryToSend);
      onQueryHandled?.();

      if (queryParam) {
        params.delete('q');
        const newSearch = params.toString();
        const newUrl = window.location.pathname + (newSearch ? '?' + newSearch : '') + window.location.hash;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, [initialQuery, isLoading, isLoadingHistory, isLocked]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        // Send the complete conversation history including the new user message
        body: JSON.stringify({ history: [...messages, userMsg] })
      });

      if (res.status === 429) {
        setIsLocked(true);
        setIsLoading(false);
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        if (errData?.error === 'limit_reached') {
          setIsLocked(true);
          setIsLoading(false);
          return;
        }
        throw new Error(errData?.error || "Failed to communicate with the financial ether.");
      }

      const data = await res.json();
      
      setPromptCount(prev => prev + 1);

      const aiMsg: Message = {
        id: `ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        role: "ai",
        content: data.text || "I am reflecting on the data. Pray, could you rephrase the inquiry?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      // Remove fetchUserStatus as we do optimistic update
    } catch (error: any) {
      console.error('AI_CHAT_ERROR:', error);
      
      const errorMessage = error?.message || "connection error";
      const errorMsg: Message = {
        id: `error-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        role: "ai",
        content: `Error: ${errorMessage}. My connection has been momentarily severed.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const isLimitReached = isLocked || (!isPro && promptCount >= 3);

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-950">
      {/* Header (Minimal, sticky top, full width) */}
      <header className="px-4 md:px-8 py-3 md:py-4 border-b border-slate-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shrink-0 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm">
            <StocratesIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-base font-black tracking-tight text-slate-900 dark:text-white">Stocrates</h2>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest opacity-80">
                Active
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isPro ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-amber-600/10 border border-violet-500/20">
              <span className="text-[10px] font-bold uppercase bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-600 bg-clip-text text-transparent">✨ Pro Active</span>
            </div>
          ) : (
            <div className={`flex items-center px-3 py-1.5 rounded-full ${isLimitReached ? 'bg-red-500/10 text-red-500' : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300'}`}>
              <span className="text-[10px] font-bold uppercase tracking-wide">
                {promptCount}/3 Prompts 
              </span>
            </div>
          )}
          <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 rounded-xl">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Message Area */}
        <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 space-y-8 scrollbar-hide">
          <div className="w-full max-w-3xl mx-auto flex flex-col space-y-8">
          {isLoadingHistory ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium">Recalling past wisdom...</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start gap-4 md:gap-6`}
                >
                  {msg.role === "ai" && (
                    <div className="mt-1 h-10 w-10 shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-500 text-white shadow-lg">
                      <StocratesIcon className="h-5 w-5" />
                    </div>
                  )}
                  <div className="max-w-[90%] md:max-w-[80%] space-y-2">
                    <div className={`
                      p-4 md:p-5 text-sm md:text-base leading-relaxed break-words shadow-sm border
                      ${msg.role === "user" 
                        ? "bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white rounded-[1.5rem] rounded-tr-sm border-transparent" 
                        : "bg-transparent text-slate-800 dark:text-slate-200 border-none px-0 shadow-none -ml-2"}
                    `}>
                      {msg.role === 'ai' ? (
                        <div className="prose prose-sm md:prose-base dark:prose-invert prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:text-white max-w-none">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                    <p className={`px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div 
                  key="ai-loading-indicator"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex justify-start items-start gap-4 md:gap-6"
                >
                  <div className="mt-1 h-10 w-10 shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-500 text-white shadow-lg">
                    <StocratesIcon className="h-5 w-5" />
                  </div>
                  <div className="bg-transparent px-2 py-4">
                    <div className="flex gap-1.5 items-center">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }} 
                        transition={{ duration: 0.6, repeat: Infinity }} 
                        className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" 
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }} 
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} 
                        className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" 
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }} 
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} 
                        className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" 
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          )}
          </div>
        </div>

        {/* Input Area */}
        <div className="w-full shrink-0 bg-white dark:bg-zinc-950 px-4 pb-2 md:pb-3 pt-1">
          <div className="max-w-3xl mx-auto flex flex-col gap-2">
            {isLimitReached && !isPro && (
              <div className="flex justify-center mb-1">
                <Button 
                  onClick={() => setActiveTab && setActiveTab('pro')}
                  className="rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-600 text-white font-bold tracking-wide shadow-lg shadow-fuchsia-500/20 px-6 py-5 hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
                >
                  ✨ Upgrade to SpendSense Pro
                </Button>
              </div>
            )}
            <div className="relative flex items-end gap-2 bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 focus-within:ring-2 focus-within:ring-emerald-500/20 rounded-[1.5rem] p-2 shadow-sm transition-all">
              <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-xl">
                <PlusCircle className="h-6 w-6" />
              </Button>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (!isLimitReached) handleSend();
                  }
                }}
                rows={1}
                placeholder={isLimitReached ? "Daily limit reached. Upgrade to Pro." : "Message Stocrates..."} 
                className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none py-3 px-2 text-sm md:text-base outline-none disabled:opacity-50"
                disabled={isLoading || isLimitReached}
              />
              <Button 
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isLoading || isLimitReached}
                size="icon" 
                className="h-10 w-10 mb-0.5 shrink-0 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:brightness-110 rounded-xl transition-all shadow-md disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
              </Button>
            </div>
            <p className="text-center text-[10px] text-slate-400 dark:text-slate-600 hidden md:block opacity-60">
              Stocrates can make mistakes. Consider verifying important information.
            </p>
          </div>
        </div>
    </div>
  );
}


