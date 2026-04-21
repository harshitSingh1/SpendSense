"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { addTransaction } from "@/lib/actions/transactions";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  MessageSquare, 
  Mic, 
  PlusCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  MoreHorizontal,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function TrackerView({ initialTransactions = [] }: { initialTransactions?: any[] }) {
  const [transactions, setTransactions] = useState<any[]>(initialTransactions);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [parsedResponse, setParsedResponse] = useState<null | { type: string, category: string, amount: number, description: string }>(null);

  // Manual Form State
  const [manualForm, setManualForm] = useState({
    type: 'expense',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  useEffect(() => {
    setTransactions(initialTransactions);
  }, [initialTransactions]);

  const handleChatParse = () => {
    const lowerInput = chatInput.toLowerCase();
    if (lowerInput.includes("spent") && lowerInput.includes("swiggy")) {
      setParsedResponse({ 
        type: "expense", 
        category: "Food", 
        amount: 500, 
        description: "Swiggy" 
      });
    } else if (lowerInput.includes("paid") && lowerInput.includes("salary")) {
        setParsedResponse({ 
          type: "income", 
          category: "Salary", 
          amount: 50000, 
          description: "Monthly Salary" 
        });
    }
  };

  const logTransaction = async (data: any) => {
    setIsSyncing(true);
    const promise = addTransaction(data);

    toast.promise(promise, {
      loading: 'Logging transaction to ledger...',
      success: (res: any) => {
        if (!res.success) throw new Error(res.error);
        setChatInput("");
        setParsedResponse(null);
        setManualForm({
           type: 'expense',
           category: '',
           amount: '',
           date: new Date().toISOString().split('T')[0],
           description: ''
        });
        return "Transaction synchronized successfully";
      },
      error: (err) => err.message || "Failed to synchronize",
    });

    try {
      await promise;
    } catch (error) {
      console.error("Log failed:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleManualSubmit = () => {
    if (!manualForm.amount || !manualForm.category) return;
    
    logTransaction({
      ...manualForm,
      amount: parseFloat(manualForm.amount)
    });
  };

  return (
    <div className="space-y-10 pb-10">
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden">
        <CardHeader className="bg-primary/5 pb-8">
          <CardTitle className="text-xl font-bold">Omni-Input Tracker</CardTitle>
          <CardDescription>Log your finances using AI, Voice, or Manual entry</CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <Tabs defaultValue="ai" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-12 rounded-xl bg-muted/50 p-1 border border-border/10">
              <TabsTrigger value="ai" className="rounded-lg gap-2 text-xs font-bold uppercase transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">
                <MessageSquare className="h-4 w-4" />
                AI Chat
              </TabsTrigger>
              <TabsTrigger value="voice" className="rounded-lg gap-2 text-xs font-bold uppercase transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">
                <Mic className="h-4 w-4" />
                Voice Note
              </TabsTrigger>
              <TabsTrigger value="manual" className="rounded-lg gap-2 text-xs font-bold uppercase transition-all data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">
                <PlusCircle className="h-4 w-4" />
                Manual Entry
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="ai" className="space-y-6">
                <div className="relative group">
                  <Input 
                    placeholder="Type: 'Spent ₹500 on Swiggy...'" 
                    className="h-14 px-6 rounded-2xl bg-muted/30 border-none ring-offset-background placeholder:text-muted-foreground transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 shadow-inner group-hover:bg-muted/40"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChatParse()}
                  />
                  <Button 
                    onClick={handleChatParse}
                    className="absolute right-2 top-2 h-10 rounded-xl bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/20"
                  >
                    Parse AI
                  </Button>
                </div>
                {parsedResponse && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                        <SparklesIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none">AI Intent: {parsedResponse.type === "income" ? "Income" : "Expense"}</p>
                          <div className="flex gap-0.5">
                            <div className="h-1 w-3 rounded-full bg-emerald-500/40" />
                            <div className="h-1 w-3 rounded-full bg-emerald-500/40" />
                            <div className="h-1 w-3 rounded-full bg-emerald-500/20" />
                          </div>
                        </div>
                        <p className="text-sm font-semibold">{parsedResponse.category} - {parsedResponse.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-emerald-500/10">
                      <div className="text-left md:text-right">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-40 leading-none mb-1">Impact Agent</p>
                        <p className="text-xs font-bold text-emerald-600/80 italic">-0.4% Savings Goal</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-mono font-bold text-emerald-600">
                          {parsedResponse.type === 'income' ? '+' : '-'} ₹{parsedResponse.amount.toLocaleString()}
                        </p>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          disabled={isSyncing}
                          onClick={() => logTransaction(parsedResponse)}
                          className="h-7 px-2 text-[10px] uppercase font-black text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700"
                        >
                          {isSyncing ? <Loader2 className="h-3 w-3 animate-spin" /> : "Log Instant"}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="voice" className="flex flex-col items-center justify-center py-10 space-y-8">
                <div className="relative">
                  {voiceActive && (
                    <>
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [1, 2.2, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                      />
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [1.2, 2.8, 1.2], opacity: [0.2, 0, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 bg-primary/10 rounded-full blur-2xl"
                      />
                    </>
                  )}
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={`relative z-10 h-28 w-28 rounded-full border-none shadow-2xl transition-all duration-500 ${voiceActive ? 'bg-primary text-white scale-110 shadow-primary/40' : 'bg-muted/50 text-primary hover:bg-muted hover:scale-105'}`}
                    onClick={() => setVoiceActive(!voiceActive)}
                  >
                    <Mic className={`h-12 w-12 ${voiceActive ? 'animate-pulse' : ''}`} />
                  </Button>
                </div>
                <div className="text-center">
                  <motion.p 
                    animate={voiceActive ? { opacity: [1, 0.5, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-base font-bold text-foreground"
                  >
                    {voiceActive ? 'Listening to your finances...' : 'Tap for Voice Logging'}
                  </motion.p>
                  <p className="text-xs text-muted-foreground mt-2 max-w-[200px] mx-auto leading-relaxed italic opacity-70">
                    "Got paid ₹50,000 salary today"
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="manual" className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1 ml-1 leading-none">Type</p>
                  <select 
                    value={manualForm.type}
                    onChange={(e) => setManualForm({...manualForm, type: e.target.value as any})}
                    className="flex h-14 w-full items-center justify-between rounded-2xl bg-muted/30 px-5 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 border-none appearance-none cursor-pointer"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
                <div className="space-y-2.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1 ml-1 leading-none">Category</p>
                  <Input 
                    value={manualForm.category}
                    onChange={(e) => setManualForm({...manualForm, category: e.target.value})}
                    placeholder="e.g. Food, Salary..." 
                    className="rounded-2xl bg-muted/30 border-none h-14 px-5 focus:bg-background shadow-inner" 
                  />
                </div>
                <div className="space-y-2.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1 ml-1 leading-none">Amount</p>
                  <Input 
                    value={manualForm.amount}
                    onChange={(e) => setManualForm({...manualForm, amount: e.target.value})}
                    placeholder="₹ 0.00" 
                    type="number"
                    className="rounded-2xl bg-muted/30 border-none h-14 px-5 font-mono text-lg focus:bg-background shadow-inner" 
                  />
                </div>
                <div className="space-y-2.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1 ml-1 leading-none">Date</p>
                  <Input 
                    type="date" 
                    value={manualForm.date}
                    onChange={(e) => setManualForm({...manualForm, date: e.target.value})}
                    className="rounded-2xl bg-muted/30 border-none h-14 px-5 focus:bg-background shadow-inner" 
                  />
                </div>
                <div className="space-y-2.5 md:col-span-2">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1 ml-1 leading-none">Description</p>
                  <Input 
                    value={manualForm.description}
                    onChange={(e) => setManualForm({...manualForm, description: e.target.value})}
                    placeholder="What was this for?" 
                    className="rounded-2xl bg-muted/30 border-none h-14 px-5 focus:bg-background shadow-inner" 
                  />
                </div>
                <Button 
                  onClick={handleManualSubmit}
                  disabled={isSyncing || !manualForm.amount || !manualForm.category}
                  className="md:col-span-2 h-14 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/10 hover:brightness-110 text-base mt-2 transition-transform active:scale-[0.98]"
                >
                  {isSyncing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <CheckCircle2 className="mr-2 h-5 w-5" />}
                  Confirm Transaction
                </Button>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>

      <div className="space-y-5">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-xl font-bold tracking-tight">Recent Activity</h3>
          </div>
          <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-accent font-bold uppercase tracking-wider hover:bg-accent/5">
            Full Ledger <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="text-[10px] font-bold uppercase tracking-widest py-5 pl-8">Flow</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Description</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Timestamp</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest">Metadata</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-right pr-8">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground/30" />
                    <p className="text-xs font-bold text-muted-foreground mt-4 uppercase tracking-widest animate-pulse">Syncing Ledger...</p>
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center text-muted-foreground/60">
                    <p className="text-sm font-medium">No transactions yet. Add your first income or expense above.</p>
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((tx) => (
                  <TableRow key={tx._id} className="group border-b border-muted/30 transition-all duration-300 hover:bg-muted/20">
                    <TableCell className="py-5 pl-8">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-muted text-muted-foreground opacity-60'}`}>
                        {tx.type === 'income' ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-bold">{tx.category}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight opacity-50">{tx.description || 'SpendSense Protected'}</p>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-bold tracking-tight">
                      {new Date(tx.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1.5">
                        <span className="text-[9px] font-black uppercase px-2.5 py-1 rounded-lg bg-muted text-muted-foreground/60 group-hover:bg-primary/5 group-hover:text-primary/60 transition-colors">
                          {tx.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className={`text-right font-mono text-base font-black tracking-tighter pr-8 ${tx.type === 'income' ? 'text-emerald-600' : 'text-primary'}`}>
                      {tx.type === 'income' ? '+' : '-'} ₹{tx.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

function History(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
      <path d="M3.3 7a9 9 0 1 1-1.3 5" />
      <polyline points="2 7 3 7 3 2" />
    </svg>
  );
}
