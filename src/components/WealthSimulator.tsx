import React, { useState } from "react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function WealthSimulator({ defaultMonthlyInvestment = 20000, showTable = false }: { defaultMonthlyInvestment?: number, showTable?: boolean }) {
  const [monthlyInvestment, setMonthlyInvestment] = useState(defaultMonthlyInvestment); // Default to a safe 20% of an arbitrary surplus
  const [years, setYears] = useState(10);
  
  // Keep monthlyInvestment synced if defaultMonthlyInvestment changes, optionally
  React.useEffect(() => {
    if (defaultMonthlyInvestment > 0) {
      setMonthlyInvestment(defaultMonthlyInvestment);
    }
  }, [defaultMonthlyInvestment]);

  // Adjust max dynamically
  const sliderMax = Math.max(200000, Math.ceil(monthlyInvestment / 1000) * 1000 * 2);

  const calculateData = () => {
    let data = [];
    let currentInvested = 0;
    
    for (let yr = 0; yr <= years; yr++) {
      if (yr === 0) {
        data.push({
          year: 0,
          MarketGrowth: 0,
          InflationBleed: 0,
          rawLoss: 0,
          rawCash: 0
        });
        continue;
      }
      
      let yearlyContribution = monthlyInvestment * 12;
      for (let m = 1; m <= 12; m++) {
        currentInvested = (currentInvested + monthlyInvestment) * (1 + 0.12 / 12);
      }
      
      let mattressVal = 0;
      for (let i = 1; i <= yr; i++) {
          mattressVal += yearlyContribution * Math.pow(0.94, yr - i); // 6% inflation purchasing power reduction
      }
      
      let cashUnderMattress = yearlyContribution * yr;
      let inflationLoss = cashUnderMattress - mattressVal;
      
      data.push({
        year: yr,
        MarketGrowth: Math.round(currentInvested),
        InflationBleed: -Math.round(inflationLoss),
        rawLoss: inflationLoss,
        rawCash: cashUnderMattress
      });
    }
    return data;
  };

  const data = calculateData();
  const finalData = data[data.length - 1];
  
  const finalCash = finalData ? finalData.rawCash : 0;
  const finalInvested = finalData ? finalData.MarketGrowth : 0;
  const finalLoss = finalData ? finalData.rawLoss : 0;
  
  const lossPercent = finalCash > 0 ? (finalLoss / finalCash) * 100 : 0;
  
  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <Card className="w-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-xl rounded-[2.5rem] overflow-hidden">
      <CardHeader className="bg-slate-50/50 dark:bg-zinc-900/50 border-b border-slate-100 dark:border-zinc-800 p-8">
        <CardTitle className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Wealth Engine</CardTitle>
        <CardDescription className="text-base text-slate-500 font-medium mt-2">
          Interactive financial simulator. See the true cost of uninvested cash compared to market compound growth.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-8 space-y-12">
        {/* Dynamic Hook Text */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold leading-relaxed text-slate-700 dark:text-slate-300">
            In <span className="text-slate-900 dark:text-white font-black">{years} years</span>, your cash will lose <span className="text-red-500 font-black">{lossPercent.toFixed(1)}%</span> of its value to inflation. 
            <br className="hidden md:block" /> Invested, it could grow to <span className="text-emerald-500 font-black">{formatINR(finalInvested)}</span>.
          </h2>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto bg-slate-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-slate-100 dark:border-zinc-800">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Monthly Investment</label>
              <span className="text-xl font-black font-mono text-slate-900 dark:text-white">{formatINR(monthlyInvestment)}</span>
            </div>
            <Slider
              value={[monthlyInvestment]}
              onValueChange={(val) => setMonthlyInvestment(Array.isArray(val) ? val[0] : val as number)}
              min={1000}
              max={sliderMax}
              step={1000}
              className="[&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-6 [&_[data-slot=slider-thumb]]:bg-emerald-500 [&_[data-slot=slider-thumb]]:border-none [&_[data-slot=slider-thumb]]:shadow-lg [&_.bg-primary]:bg-emerald-500"
            />
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Time Horizon</label>
              <span className="text-xl font-black font-mono text-slate-900 dark:text-white">{years} Years</span>
            </div>
            <Slider
              value={[years]}
              onValueChange={(val) => setYears(Array.isArray(val) ? val[0] : val as number)}
              min={1}
              max={30}
              step={1}
              className="[&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-6 [&_[data-slot=slider-thumb]]:bg-indigo-500 [&_[data-slot=slider-thumb]]:border-none [&_[data-slot=slider-thumb]]:shadow-lg [&_.bg-primary]:bg-indigo-500"
            />
          </div>
        </div>

        {/* Chart */}
        <div className="h-[400px] w-full mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBleed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.4}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis 
                dataKey="year" 
                tickFormatter={(val) => `Yr ${val}`} 
                stroke="#64748b" 
                fontSize={12}
                tickMargin={10}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tickFormatter={(val) => {
                  if (val === 0) return "₹0";
                  const isNeg = val < 0;
                  const absVal = Math.abs(val);
                  let formatted = "";
                  if (absVal >= 10000000) {
                    formatted = `₹${(absVal / 10000000).toFixed(1)}Cr`;
                  } else if (absVal >= 100000) {
                    formatted = `₹${(absVal / 100000).toFixed(1)}L`;
                  } else if (absVal >= 1000) {
                    formatted = `₹${(absVal / 1000).toFixed(0)}K`;
                  } else {
                    formatted = `₹${absVal}`;
                  }
                  return isNeg ? `-${formatted}` : formatted;
                }}
                stroke="#64748b"
                fontSize={12}
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === "MarketGrowth") return [formatINR(value), "Market Growth"];
                  if (name === "InflationBleed") return [formatINR(Math.abs(value)), "Inflation Bleed (Loss)"];
                  return [value, name];
                }}
                labelFormatter={(label) => `Year ${label}`}
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              />
              <ReferenceLine y={0} stroke="#64748b" opacity={0.5} strokeWidth={2} />
              <Area 
                type="monotone" 
                dataKey="MarketGrowth" 
                stroke="#10B981" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorGrowth)" 
                activeDot={{ r: 8, fill: "#10B981", strokeWidth: 0, style: { filter: "drop-shadow(0 0 10px #10B981)" } }}
              />
              <Area 
                type="monotone" 
                dataKey="InflationBleed" 
                stroke="#EF4444" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorBleed)" 
                activeDot={{ r: 6, fill: "#EF4444", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Optional Data Table */}
        {showTable && (
          <div id="projection-table-section" className="mt-12 min-h-[400px] border border-slate-200 dark:border-zinc-800 rounded-3xl bg-slate-50 dark:bg-zinc-900 overflow-hidden relative shadow-inner animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="p-8 prose prose-slate dark:prose-invert prose-headings:font-black max-w-none h-full overflow-x-auto">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Yearly Projection Data</h3>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-zinc-800">
                    <th className="py-4 px-4 text-left font-bold uppercase tracking-widest text-slate-500 text-[10px]">Year</th>
                    <th className="py-4 px-4 text-right font-bold uppercase tracking-widest text-slate-500 text-[10px]">Principal</th>
                    <th className="py-4 px-4 text-right font-bold uppercase tracking-widest text-slate-500 text-[10px]">Inflation-Adjusted</th>
                    <th className="py-4 px-4 text-right font-bold uppercase tracking-widest text-slate-500 text-[10px]">Market Value (12%)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className="border-b border-slate-100 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                        {row.year === 0 ? "Now" : `Year ${row.year}`}
                      </td>
                      <td className="py-4 px-4 font-mono text-right text-slate-600 dark:text-slate-400">
                        {formatINR(row.rawCash)}
                      </td>
                      <td className="py-4 px-4 font-mono text-right text-red-500 font-bold">
                        {formatINR(row.rawCash - row.rawLoss)}
                      </td>
                      <td className="py-4 px-4 font-mono text-right text-emerald-500 font-black">
                        {formatINR(row.MarketGrowth)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
