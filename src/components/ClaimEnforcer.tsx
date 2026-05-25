import React, { useState } from "react";
import { Loader2, FileType, CheckCircle2, FileText, Gavel, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";

export default function ClaimEnforcer({ user }: { user?: any }) {
  const isPro = !!user?.isPro;
  const [rejectionLetter, setRejectionLetter] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleEnforce = async () => {
    if (!rejectionLetter || !claimAmount) return;
    
    setResult(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/protection/enforce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          rejectionLetter,
          claimAmount
        })
      });

      if (!response.ok) {
        throw new Error("Failed to enforce claim.");
      }

      const data = await response.json();
      setResult(data.response);
    } catch (error) {
      console.error(error);
      setResult("### Error\nFailed to draft the grievance response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isPro) return null; // Fallback, shouldn't be rendered if not pro

  return (
    <Card className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-xl rounded-[2.5rem] overflow-hidden mt-8">
      <CardHeader className="bg-red-50/50 dark:bg-red-900/10 border-b border-red-100 dark:border-red-900/20 p-8">
        <CardTitle className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <Gavel className="h-6 w-6 text-red-500" />
          Claim Enforcer
        </CardTitle>
        <CardDescription className="text-base text-slate-500 font-medium mt-2 max-w-2xl">
          Enter the details of your denied claim and the rejection letter. Stocrates will draft a fierce, regulatory-backed Grievance Redressal response demanding your claim be honored.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="space-y-6 flex flex-col h-full">
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Original Claim Amount (₹)
              </label>
              <input
                type="number"
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                placeholder="e.g. 50000"
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-red-500/20 text-sm md:text-base"
              />
            </div>

            <div className="space-y-4 flex-grow flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                Paste your Claim Rejection Letter/Email here
              </label>
              <textarea
                value={rejectionLetter}
                onChange={(e) => setRejectionLetter(e.target.value)}
                placeholder="Paste the email or text from the insurance company..."
                className="w-full flex-grow min-h-[200px] p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-red-500/20 text-sm md:text-base resize-none"
              />
            </div>

            <Button 
              onClick={handleEnforce}
              disabled={isLoading || !rejectionLetter || !claimAmount}
              className="w-full h-14 rounded-2xl font-black text-base bg-red-600 hover:bg-red-700 text-white shadow-[0_0_30px_-5px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_-5px_rgba(220,38,38,0.5)] transition-all mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Drafting Legal Response...
                </>
              ) : (
                <>
                  <Gavel className="w-5 h-5 mr-2" />
                  Draft Grievance Response
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div className="h-full min-h-[400px] border border-slate-200 dark:border-zinc-800 rounded-3xl bg-slate-50 dark:bg-zinc-900 overflow-hidden relative">
            {!result && !isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-50">
                <FileText className="w-16 h-16 text-slate-400 mb-4" />
                <p className="text-sm font-bold text-slate-500">
                  Your Grievance Draft will appear here.
                </p>
              </div>
            )}
            
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-50/80 dark:bg-zinc-900/80 backdrop-blur-sm z-10">
                <Loader2 className="w-12 h-12 text-red-500 animate-spin mb-4" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 animate-pulse mt-2">
                  Activating Legal AI...
                </p>
              </div>
            )}
            
            {result && !isLoading && (
              <div className="p-8 prose prose-slate dark:prose-invert prose-headings:font-black prose-a:text-red-500 max-w-none h-full overflow-y-auto">
                <Markdown>{result}</Markdown>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
