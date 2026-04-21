import { educationalArticles } from "@/lib/data/education";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2, Bookmark, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = educationalArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="relative pb-20">
      {/* Back Button */}
      <div className="container mx-auto px-6 pt-10">
        <Link 
          href="/learn"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest group mb-10"
        >
          <div className="h-8 w-8 rounded-full border border-border flex items-center justify-center group-hover:bg-muted transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back to Learn
        </Link>

        {/* Reading Column */}
        <div className="max-w-2xl mx-auto">
          <header className="mb-12 space-y-6">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="rounded-full px-4 border-secondary text-secondary font-bold uppercase tracking-widest text-[10px]">{article.category}</Badge>
              <span className="text-sm font-bold text-muted-foreground opacity-60">{article.readTime} read</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-black leading-[1.1] tracking-tight text-primary">
              {article.title}
            </h1>
            <div className="flex items-center justify-between border-y border-border py-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-secondary overflow-hidden flex items-center justify-center text-secondary-foreground font-bold italic">S</div>
                <div>
                  <p className="text-sm font-bold">Stocrates Editorial Team</p>
                  <p className="text-xs text-muted-foreground opacity-60">Published Apr 19, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                  <Bookmark className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>

          <div className="prose prose-slate max-w-none prose-lg prose-p:leading-relaxed prose-headings:font-heading prose-headings:font-black prose-p:text-slate-800 dark:prose-p:text-slate-300">
             <div className="markdown-body">
                <ReactMarkdown>{article.content}</ReactMarkdown>
             </div>
            
            {/* CTA Box */}
            <section className="mt-20 p-10 rounded-[2.5rem] bg-secondary text-white shadow-2xl shadow-secondary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                  <h3 className="text-3xl font-heading font-black leading-tight">Ready to verify your intelligence?</h3>
                  <p className="text-sm opacity-90 leading-relaxed font-medium">Join 24,000+ professionals using SpendSense AI to track, teach, and protect their future.</p>
                  <Button className="rounded-xl bg-white text-secondary hover:bg-white/90 font-black uppercase tracking-widest text-[10px] px-8">
                    Get Started Free
                  </Button>
                </div>
                <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <MessageSquare className="h-10 w-10" />
                </div>
              </div>
            </section>
          </div>

           <div className="mt-12 py-12 border-t border-border flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Share this Insight</p>
              <div className="flex gap-4">
                {['LinkedIn', 'Twitter', 'Link'].map(social => (
                  <button key={social} className="text-xs font-black uppercase text-secondary hover:underline underline-offset-4">{social}</button>
                ))}
              </div>
           </div>
        </div>
      </div>
    </article>
  );
}
