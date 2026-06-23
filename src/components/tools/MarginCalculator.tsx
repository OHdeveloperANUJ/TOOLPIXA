'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { Briefcase, PieChart as PieChartIcon, Info } from 'lucide-react';

function useAnimatedNumber(value: number, duration: number = 800) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = currentValue;
    const endValue = value;
    if (startValue === endValue) {
      setCurrentValue(endValue);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - percentage, 4);
      setCurrentValue(startValue + (endValue - startValue) * ease);
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(endValue);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);

  return currentValue;
}

export default function MarginCalculator() {
  const { currency } = useStore();
  const [cost, setCost] = useState<number>(100);
  const [revenue, setRevenue] = useState<number>(150);

  const { profit, margin, markup, isLoss } = useMemo(() => {
    if (cost <= 0 || revenue <= 0) return { profit: 0, margin: 0, markup: 0, isLoss: false };
    const p = revenue - cost;
    return {
      profit: Math.abs(p),
      margin: (p / revenue) * 100,
      markup: (p / cost) * 100,
      isLoss: p < 0,
    };
  }, [cost, revenue]);

  const animatedProfit = useAnimatedNumber(profit);
  const animatedMargin = useAnimatedNumber(Math.abs(margin));
  const animatedCost = useAnimatedNumber(cost);

  const fmt = (val: number) => val.toLocaleString(currency.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <section className="space-y-8 animate-fade-in-up font-inter max-w-6xl mx-auto">
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Input Section */}
        <div className="xl:col-span-5 space-y-6">
          <div className="glass-card p-8 rounded-3xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
                <Briefcase className="text-indigo-500" /> Margin Calculator
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Calculate gross profit margin and markup percentage based on cost and revenue.</p>
            </div>

            <div className="space-y-6">
              {/* Cost Amount */}
              <div className="space-y-4 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    Cost of Goods
                  </label>
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"><CurrencySymbol fallback="$" /></span>
                    <input 
                      type="number" 
                      value={cost}
                      onChange={(e) => setCost(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 pl-8 pr-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all rounded-lg text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Revenue Amount */}
              <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    Revenue (Selling Price)
                  </label>
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"><CurrencySymbol fallback="$" /></span>
                    <input 
                      type="number" 
                      value={revenue}
                      onChange={(e) => setRevenue(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 pl-8 pr-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all rounded-lg text-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-3 text-slate-800 dark:text-slate-200">
              <Info size={18} className="text-indigo-500" /> Formulas Used
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              <strong>Gross Profit</strong> = Revenue - Cost
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              <strong>Gross Margin (%)</strong> = (Gross Profit / Revenue) × 100
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <strong>Markup (%)</strong> = (Gross Profit / Cost) × 100
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-7 space-y-6">
          <div className="glass-card p-8 rounded-3xl h-full flex flex-col">
            <h3 className="text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase text-xs mb-8 font-semibold flex items-center gap-2">
              <PieChartIcon size={16} /> Margin Breakdown
            </h3>
            
            <div className="mb-10 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 font-bold uppercase tracking-wider">Gross Margin</p>
              <div className={`text-5xl md:text-7xl font-black drop-shadow-sm break-words ${isLoss ? 'text-red-500 dark:text-red-400' : 'text-indigo-500 dark:text-indigo-400'}`}>
                {isLoss ? '-' : ''}{animatedMargin.toFixed(2)}%
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold">Markup</p>
                <p className={`text-xl md:text-2xl font-bold ${isLoss ? 'text-red-600 dark:text-red-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                  {isLoss ? '-' : ''}{Math.abs(markup).toFixed(2)}%
                </p>
              </div>
              <div className={`p-5 rounded-2xl border text-center flex flex-col justify-center ${isLoss ? 'bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30' : 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/30'}`}>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold">{isLoss ? 'Total Loss' : 'Gross Profit'}</p>
                <p className={`text-xl md:text-2xl font-bold ${isLoss ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {isLoss ? '-' : '+'}<CurrencySymbol fallback="$" />{fmt(animatedProfit)}
                </p>
              </div>
            </div>

            {/* Visual Breakdown */}
            {!isLoss && revenue > 0 && cost > 0 && (
              <div className="mt-auto h-64 w-full bg-slate-50 dark:bg-[#0A0A14] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 relative flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Cost', value: cost },
                          { name: 'Profit', value: profit }
                        ].filter(d => d.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        <Cell fill="#f43f5e" /> {/* rose-500 */}
                        <Cell fill="#10b981" /> {/* emerald-500 */}
                      </Pie>
                      <RechartsTooltip 
                        formatter={(value: any) => [`${currency.symbol}${fmt(Number(value))}`, '']}
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                        itemStyle={{ fontWeight: 'bold' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 flex flex-col justify-center space-y-4 px-4">
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                       <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Cost</span>
                     </div>
                     <p className="text-lg font-bold text-rose-600 dark:text-rose-400">
                       {((cost / revenue) * 100).toFixed(1)}%
                     </p>
                   </div>
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                       <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Profit</span>
                     </div>
                     <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                       {((profit / revenue) * 100).toFixed(1)}%
                     </p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


// Indian Example: Karthik from Chandigarh uses this tool to check variables.
