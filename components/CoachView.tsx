"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Info, 
  PlusCircle, 
  Mic, 
  Paperclip,
  MoreVertical,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const SYSTEM_INSTRUCTION = `
You are 'Stocrates', the AI financial coach for SpendSense AI. Your primary user base is young professionals (18-35).

Your persona: Calm, intelligent, deeply analytical, and strictly educational. You do NOT give direct financial advice (e.g., 'buy this stock').

Your methodology: Socratic questioning. When a user asks about a purchase, an investment, or a risk, do not give them the answer immediately. Ask them a thought-provoking question that forces them to calculate the opportunity cost or analyze their own behavior.

Focus heavily on risk awareness (insurance, emergency funds) and cutting impulse spending. If a user asks about Swiggy/Zomato or online shopping habits, gently guide them to realize the annual compound cost of those daily habits.
`;

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "ai",
    content: "Good morning, Alexander. I've been reviewing your latest spending trends. How can I help you optimize your wealth today?",
    timestamp: new Date(Date.now() - 3600000),
  }
];

export default function CoachView() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // We map our messages to the Gemini content format
      // Note: In a real app we'd keep track of the entire history for better context
      const chatHistory = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...chatHistory,
          { role: "user", parts: [{ text: inputValue }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: response.text || "I'm reflecting on your data. Could you rephrase that?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Gemini Error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "I'm having a bit of trouble connecting to my analytical brain. Let's try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-14rem)] bg-card rounded-2xl border border-border overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
              <Bot className="h-6 w-6" />
            </div>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight">Stocrates</h3>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">AI Socratic Wealth Coach</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <Sparkles className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start gap-3`}
            >
              {msg.role === "ai" && (
                <div className="mt-1 h-8 w-8 shrink-0 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Bot className="h-5 w-5" />
                </div>
              )}
              <div className={`max-w-[80%] md:max-w-[70%] space-y-1`}>
                <div className={`
                  p-4 rounded-2xl shadow-sm text-sm leading-relaxed
                  ${msg.role === "user" 
                    ? "bg-accent text-accent-foreground rounded-tr-none" 
                    : "bg-muted/50 border border-border/50 text-foreground rounded-tl-none"}
                `}>
                  {msg.content}
                </div>
                <p className={`text-[10px] text-muted-foreground font-medium px-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {msg.role === "user" && (
                <div className="mt-1 h-8 w-8 shrink-0 flex items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <User className="h-5 w-5" />
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start items-center gap-3"
            >
              <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Bot className="h-5 w-5" />
              </div>
              <div className="bg-muted/50 p-4 rounded-2xl rounded-tl-none border border-border/50">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Control Area */}
      <div className="p-4 bg-muted/10 border-t border-border">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 text-muted-foreground hover:bg-muted/50">
              <PlusCircle className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <Input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask Stocrates about your spending habits..." 
                className="pr-24 h-12 bg-card border-border/60 focus-visible:ring-primary/20 rounded-xl"
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  size="icon" 
                  className="h-8 w-8 bg-primary text-primary-foreground hover:brightness-110"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-amber-500/5 border border-amber-500/10">
            <Info className="h-3.5 w-3.5 text-amber-500/60" />
            <p className="text-[10px] text-muted-foreground/80 font-medium">
              SpendSense AI provides educational insights, not licensed financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
