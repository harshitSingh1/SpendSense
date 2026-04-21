"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  ChevronRight, 
  Trophy, 
  ArrowLeft,
  Share2,
  Bookmark,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Article } from "@/lib/data/education";
import Link from "next/link";

export default function LearnView({ articles }: { articles: Article[] }) {
  // Use first article as featured if available
  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="pb-20 pt-10 container mx-auto px-6">
      <div className="space-y-16">
        {/* Featured Hero */}
        {featuredArticle && (
          <Link href={`/learn/${featuredArticle.slug}`} className="block relative group cursor-pointer">
            <div className="aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] shadow-2xl relative">
              <img 
                src={`https://picsum.photos/seed/${featuredArticle.slug}/1200/600`} 
                alt={featuredArticle.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 p-12 text-white max-w-2xl">
                <Badge className="bg-secondary text-white border-none mb-4 px-3 py-1 uppercase font-black tracking-widest text-[10px]">
                  Featured Editorial
                </Badge>
                <h1 className="text-4xl md:text-5xl font-heading font-black leading-tight mb-4 drop-shadow-sm">
                  {featuredArticle.title}
                </h1>
                <p className="text-lg opacity-80 mb-6 font-medium leading-relaxed">
                  {featuredArticle.description}
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Clock className="h-4 w-4 text-secondary" />
                    {featuredArticle.readTime} reading
                  </div>
                  <Button variant="secondary" className="rounded-xl font-bold gap-2 bg-white text-primary hover:bg-white/90">
                    Read Analysis <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Category Filters */}
        <div className="flex items-center justify-between border-b border-border pb-6 overflow-x-auto gap-8 no-scrollbar">
           <div className="flex items-center gap-8">
              {['All Insights', 'Budgeting', 'Insurance', 'Savings'].map((cat, i) => (
                <button 
                  key={cat} 
                  className={`text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${i === 0 ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {remainingArticles.map((article) => (
            <Link 
              href={`/learn/${article.slug}`} 
              key={article.slug} 
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-lg shadow-black/5 bg-muted">
                <img 
                  src={`https://picsum.photos/seed/${article.slug}/600/400`} 
                  alt={article.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black uppercase text-secondary tracking-widest px-2 py-0.5 rounded bg-secondary/10">{article.category}</span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {article.readTime}
                </span>
              </div>
              <h2 className="text-2xl font-heading font-bold leading-tight mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                {article.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                {article.description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-6 border-t border-muted">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Trophy className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Earn 50 XP</span>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors translate-x-0 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
