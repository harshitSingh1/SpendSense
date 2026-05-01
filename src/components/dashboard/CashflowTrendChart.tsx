"use client";

import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Activity } from "lucide-react";

interface CashflowTrendChartProps {
  data: { date: string; income: number; expense: number }[];
}

export default function CashflowTrendChart({ data }: CashflowTrendChartProps) {
  const isEmpty = !data || data.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-center p-6 bg-muted/20 rounded-3xl border border-dashed border-border">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground/30">
          <Activity className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">No cashflow data available yet.</p>
        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/40 mt-1">Track income & expenses to view trends</p>
      </div>
    );
  }

  // Ensure data is sorted by date
  // the typical format is 'yyyy-MM-dd' from the server
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(item => {
    // format date for display on X Axis
    const d = new Date(item.date);
    const day = d.getDate();
    const month = d.toLocaleDateString("en-US", { month: "short" });
    return {
      ...item,
      displayDate: `${month} ${day}`,
    };
  });

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={sortedData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="displayDate" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            dy={10}
            minTickGap={20}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            tickFormatter={(value) => `₹${value.toLocaleString()}`}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Legend 
             verticalAlign="bottom" 
             align="center"
             iconType="circle"
             wrapperStyle={{ 
               fontSize: '11px', 
               paddingTop: '20px',
               fontWeight: 600,
               opacity: 0.8
             }} 
          />
          <Area 
            type="monotone" 
            dataKey="income" 
            name="Income"
            stroke="#10B981" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorIncome)" 
            activeDot={{ r: 4, strokeWidth: 0, fill: '#10B981' }}
          />
          <Area 
            type="monotone" 
            dataKey="expense" 
            name="Expenses"
            stroke="#EF4444" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorExpense)" 
            activeDot={{ r: 4, strokeWidth: 0, fill: '#EF4444' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-md border border-border/50 p-3 rounded-2xl shadow-xl min-w-[120px]">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60 mb-2">
          {label}
        </p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
             <div key={index} className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold capitalize flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                   {entry.name}
                </span>
                <span className="text-sm font-mono font-black tracking-tighter text-foreground">
                  ₹{(entry.value ?? 0).toLocaleString()}
                </span>
             </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}
