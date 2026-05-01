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

export default function CoachView() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the complete conversation history including the new user message
        body: JSON.stringify({ history: newMessages })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || "Failed to communicate with the financial ether.");
      }

      const data = await res.json();

      const aiMsg: Message = {
        id: `ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        role: "ai",
        content: data.text || "I am reflecting on the data. Pray, could you rephrase the inquiry?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
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

  return (
    <div className="flex flex-col bg-slate-50/50 dark:bg-slate-950/50 space-y-4">
      {/* Expanded height enforcement to maximize visibility while remaining scrollable in parent */}
      <Card className="flex flex-col h-[82vh] md:h-[calc(100vh-160px)] min-h-[700px] w-full max-w-full lg:max-w-[95%] xl:max-w-7xl mx-auto overflow-hidden bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 shadow-sm rounded-3xl">
        {/* Header (Fixed at the top) */}
        <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 shrink-0 space-y-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm">
                  <Bot className="h-7 w-7" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white dark:border-zinc-900 bg-emerald-500 shadow-sm" />
              </div>
              <div>
                <CardTitle className="text-lg font-black tracking-tight text-slate-900 dark:text-white">Stocrates</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-[0.15em] opacity-80">
                    Active Intelligence
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 border-none">
                <Zap className="h-3 w-3 text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">Pro Model</span>
              </div>
              <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Message Area (Expanding middle layer that handles scrolling) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-8 scrollbar-hide bg-slate-50/30 dark:bg-zinc-900/10">
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
                  <div className="mt-1 h-12 w-12 shrink-0 flex items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                    <Bot className="h-6 w-6" />
                  </div>
                )}
                <div className="max-w-[94%] md:max-w-[88%] space-y-3">
                  <div className={`
                    p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] text-sm md:text-base leading-relaxed break-words shadow-sm border border-slate-100 dark:border-zinc-800
                    ${msg.role === "user" 
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-tr-none border-transparent" 
                      : "bg-white dark:bg-zinc-900 text-slate-800 dark:text-slate-200 rounded-tl-none"}
                  `}>
                    {msg.role === 'ai' ? (
                      <div className="markdown-content space-y-3">
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
                className="flex justify-start items-center gap-4"
              >
                <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm border border-slate-100 dark:border-zinc-800">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="bg-white dark:bg-zinc-900 px-6 py-4 rounded-[1.5rem] rounded-tl-none border border-slate-100 dark:border-zinc-800 shadow-sm">
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
        </div>

        {/* Input Area (Fixed securely at the bottom) */}
        <div className="mt-auto p-4 md:p-6 bg-white dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800 shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="h-12 w-12 shrink-0 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-2xl border border-transparent">
                <PlusCircle className="h-6 w-6" />
              </Button>
              <div className="flex-1 relative">
                <Input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask Stocrates: 'Analyze my grocery bills' or 'Should I save for a car?'" 
                  className="pr-14 h-16 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 focus-visible:ring-emerald-500/20 rounded-[1.25rem] text-sm md:text-base px-6 shadow-none"
                  disabled={isLoading}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Button 
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim() || isLoading}
                    size="icon" 
                    className="h-11 w-11 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:brightness-110 rounded-xl transition-all shadow-md shadow-slate-900/10 dark:shadow-white/10"
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-6 w-6" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}


