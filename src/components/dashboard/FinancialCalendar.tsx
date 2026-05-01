import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { StickyNote, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface FinancialCalendarProps {
  dailyCashflow: { date: string; income: number; expense: number }[];
  calendarNotes: Record<string, string>;
  monthlyTransactions: any[];
  onSaveNote: (date: string, content: string) => Promise<void>;
}

export function FinancialCalendar({ dailyCashflow, calendarNotes, monthlyTransactions, onSaveNote }: FinancialCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [isPending, startTransition] = React.useTransition();
  const [isNoteSuccess, setIsNoteSuccess] = useState(false);

  const currentYearValue = new Date().getFullYear();
  const YEARS = Array.from({ length: 16 }).map((_, i) => currentYearValue - 5 + i);
  const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  // Generate days for the current month view
  const days = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    
    // Determine the day of the week the month starts on (0 = Sunday)
    const startDateDay = start.getDay();
    
    // Add prefix empty days
    const prefixDays = Array.from({ length: startDateDay }).fill(null);
    
    // Get actual days in month
    const monthDays = eachDayOfInterval({ start, end });
    
    return [...prefixDays, ...monthDays];
  }, [currentDate]);

  // Convert dailyCashflow array into a dictionary for fast lookup
  const cashflowDict = useMemo(() => {
    const dict: Record<string, { income: number; expense: number }> = {};
    dailyCashflow.forEach(item => {
      dict[item.date] = item;
    });
    return dict;
  }, [dailyCashflow]);

  // Update noteContent state when selecting a new date
  React.useEffect(() => {
    if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      setNoteContent(calendarNotes[dateStr] || "");
    } else {
      setNoteContent("");
    }
  }, [selectedDate, calendarNotes]);

  const handleSaveNote = () => {
    if (!selectedDate) return;
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    if (!noteContent && !calendarNotes[dateStr]) return; // Nothing to save

    startTransition(async () => {
      try {
        await onSaveNote(dateStr, noteContent);
        setIsNoteSuccess(true);
        setTimeout(() => setIsNoteSuccess(false), 2000);
      } catch (error) {
        console.error("Failed to save note:", error);
      }
    });
  };

  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const selectedCashflow = cashflowDict[selectedDateStr] || { income: 0, expense: 0 };
  
  const selectedTransactions = useMemo(() => {
    if (!selectedDateStr) return [];
    return monthlyTransactions.filter(tx => {
      // The transaction date might be a full ISO string. Compare just the YYYY-MM-DD part
      if (!tx.date) return false;
      const txDateStr = typeof tx.date === 'string' ? tx.date.split('T')[0] : format(new Date(tx.date), 'yyyy-MM-dd');
      return txDateStr === selectedDateStr;
    });
  }, [selectedDateStr, monthlyTransactions]);

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6">
      
      {/* LEFT: Calendar Grid */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex space-x-2">
            <select 
              value={currentDate.getMonth()} 
              onChange={handleMonthChange}
              className="bg-transparent text-lg font-bold outline-none cursor-pointer hover:bg-muted/30 py-1 px-2 rounded-lg transition-colors border border-transparent hover:border-border/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22lucide%20lucide-chevron-down%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-right pr-8"
              style={{ backgroundPosition: 'right 0.5rem center', backgroundSize: '1em' }}
            >
              {MONTHS.map((month, idx) => (
                <option key={month} value={idx} className="text-base font-medium">{month}</option>
              ))}
            </select>
            <select 
              value={currentDate.getFullYear()} 
              onChange={handleYearChange}
              className="bg-transparent text-lg font-bold outline-none cursor-pointer hover:bg-muted/30 py-1 px-2 rounded-lg transition-colors border border-transparent hover:border-border/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22lucide%20lucide-chevron-down%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-right pr-8"
              style={{ backgroundPosition: 'right 0.5rem center', backgroundSize: '1em' }}
            >
              {YEARS.map((year) => (
                <option key={year} value={year} className="text-base font-medium">{year}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full overflow-x-auto pb-4">
          <div className="min-w-[350px]">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-bold uppercase text-muted-foreground opacity-60 pointer-events-none">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, idx) => {
                if (!day) {
                  return <div key={`empty-${idx}`} className="bg-transparent" />;
                }

                const isDate = day as Date;
                const dateStr = format(isDate, 'yyyy-MM-dd');
                const data = cashflowDict[dateStr];
                const hasNote = !!calendarNotes[dateStr];
                const isSelected = selectedDate ? isSameDay(isDate, selectedDate) : false;
                const isCurrentToday = isToday(isDate);
                
                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(isDate)}
                    className={`
                      relative aspect-square p-1 rounded-xl flex items-center justify-center transition-all group
                      ${isSelected ? 'bg-primary/10 border-primary shadow-sm hover:bg-primary/20 scale-[1.02]' : 'bg-muted/30 border-transparent hover:bg-muted/60'}
                      border-2 overflow-hidden
                    `}
                  >
                    <span className={`text-sm font-semibold z-10 ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                       {format(isDate, 'd')}
                    </span>
                    
                    {/* Date Indicators Container */}
                    <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1">
                        {data?.income > 0 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
                        {data?.expense > 0 && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />}
                    </div>

                    {/* Sticky Note Indicator */}
                    {hasNote && (
                      <div className="absolute top-1 right-1 opacity-70 group-hover:opacity-100 transition-opacity">
                        <StickyNote className="w-3 h-3 text-amber-500 fill-amber-500/20" />
                      </div>
                    )}
                    
                    {/* Today Marker */}
                    {isCurrentToday && (
                       <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none pointer-events-none overflow-hidden rounded-xl">
                          <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rotate-45 transform" />
                       </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50 text-[10px] uppercase font-black tracking-widest text-muted-foreground opacity-60">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" /> Income</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400 shadow-sm" /> Expense</span>
            <span className="flex items-center gap-1.5"><StickyNote className="w-3 h-3 text-amber-500 fill-amber-500/20" /> Note Recorded</span>
        </div>
      </div>

      {/* RIGHT: Day Details Panel */}
      <div className="w-full lg:w-[320px] shrink-0 border-t lg:border-t-0 lg:border-l border-border/50 pt-6 lg:pt-0 lg:pl-6 flex flex-col">
        {!selectedDate ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-muted/20 rounded-[2rem] border border-dashed border-border/50">
             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <StickyNote className="w-8 h-8 opacity-50" />
             </div>
             <p className="text-sm font-bold text-muted-foreground">Select a date to view your financial pulse and journal entries.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
               <h4 className="text-xl font-bold">{format(selectedDate, 'MMMM do, yyyy')}</h4>
               <p className="text-xs uppercase font-black tracking-widest text-muted-foreground opacity-50 mt-1">Daily Summary</p>
            </div>

            <div className="space-y-3 mb-6">
               <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Inflow</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">+₹{(selectedCashflow.income || 0).toLocaleString()}</span>
               </div>
               <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-destructive/70 dark:text-destructive/80 uppercase tracking-widest">Outflow</span>
                  <span className="font-mono font-bold text-destructive/70 dark:text-destructive/80">-₹{(selectedCashflow.expense || 0).toLocaleString()}</span>
               </div>
            </div>

            {selectedTransactions.length > 0 && (
              <div className="mb-6 flex-1 min-h-0 overflow-y-auto pr-2">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-50 flex items-center gap-1.5 mb-3">
                  Transactions
                </span>
                <div className="space-y-2">
                  {selectedTransactions.map((tx, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-muted/20 p-2.5 rounded-xl border border-border/50">
                      <div className="flex flex-col truncate pr-2">
                        <span className="text-xs font-bold truncate">{tx.description || tx.category}</span>
                        <span className="text-[10px] text-muted-foreground uppercase opacity-80">{tx.category}</span>
                      </div>
                      <span className={`font-mono font-bold text-xs shrink-0 ${tx.type === 'income' ? 'text-emerald-500' : 'text-destructive'}`}>
                        {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col justify-end">
               <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-50 flex items-center gap-1.5">
                    <StickyNote className="w-3 h-3" /> Memo
                  </span>
               </div>
               
               <div className="relative flex-1 mb-4 min-h-[120px]">
                 <Textarea 
                   value={noteContent}
                   onChange={(e) => setNoteContent(e.target.value)}
                   placeholder="Log a significant purchase, reflection, or note for this day..."
                   className="w-full h-[120px] lg:h-full resize-none bg-amber-50/50 dark:bg-amber-900/10 border-amber-200/50 dark:border-amber-700/30 focus-visible:ring-amber-500/30 rounded-2xl p-4 text-sm font-medium transition-all"
                 />
               </div>
               
               <Button 
                 onClick={handleSaveNote} 
                 disabled={isPending || (!noteContent && !calendarNotes[selectedDateStr])}
                 className={`w-full rounded-xl font-bold shadow-md transition-all ${isNoteSuccess ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-primary shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]'}`}
               >
                 {isPending ? (
                   <span className="animate-pulse">Saving...</span>
                 ) : isNoteSuccess ? (
                   <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Memo Secured</span>
                 ) : (
                   <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> Save Memo</span>
                 )}
               </Button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
