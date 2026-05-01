"use client";

import React from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from "recharts";
import { Wallet } from "lucide-react";

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444", "#0F172A"];

interface SpendingDonutChartProps {
  data: { name: string; value: number }[];
}

export default function SpendingDonutChart({ data }: SpendingDonutChartProps) {
  const isEmpty = !data || data.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-muted/20 rounded-3xl border border-dashed border-border">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground/30">
          <Wallet className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">No expenses logged this month.</p>
        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/40 mt-1">Start tracking to see insights</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={8}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }}
          />
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-md border border-border/50 p-3 rounded-2xl shadow-xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60 mb-1">
          {payload[0].name}
        </p>
        <p className="text-sm font-mono font-black tracking-tighter text-foreground">
          ₹{(payload[0].value ?? 0).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
}
