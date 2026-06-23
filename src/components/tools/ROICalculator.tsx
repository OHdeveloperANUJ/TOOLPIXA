'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { TrendingUp, PieChart as PieChartIcon, Info } from 'lucide-react';

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

export default function ROICalculator() {
  const { currency } = useStore();
  const [invested, setInvested] = useState<number>(10000);
  const [returned, setReturned] = useState<number>(12500);

  const { profit, roi, isLoss } = useMemo(() => {
    if (invested <= 0) return { profit: 0, roi: 0, isLoss: false };
    const p = returned - invested;
    return {
      profit: Math.abs(p),
      roi: (p / invested) * 100,
      isLoss: p < 0,
    };
  }, [invested, returned]);

  const animatedProfit = useAnimatedNumber(profit);
  const animatedROI = useAnimatedNumber(Math.abs(roi));
  const animatedInvested = useAnimatedNumber(invested);

  const fmt = (val: number) => val.toLocaleString(currency.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <section className="space-y-8 animate-fade-in-up font-inter max-w-6xl mx-auto">
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Input Section */}
        <div className="xl:col-span-5 space-y-6">
          <div className="glass-card p-8 rounded-3xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
                <TrendingUp className="text-emerald-500" /> ROI Calculator
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Calculate the Return on Investment (ROI) and profitability of your investments.</p>
            </div>

            <div className="space-y-6">
              {/* Invested Amount */}
              <div className="space-y-4 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Amount Invested
                  </label>
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"><CurrencySymbol fallback="$" /></span>
                    <input 
                      type="number" 
                      value={invested}
                      onChange={(e) => setInvested(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 pl-8 pr-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all rounded-lg text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Returned Amount */}
              <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Amount Returned
                  </label>
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"><CurrencySymbol fallback="$" /></span>
                    <input 
                      type="number" 
                      value={returned}
                      onChange={(e) => setReturned(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 pl-8 pr-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all rounded-lg text-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-3 text-slate-800 dark:text-slate-200">
              <Info size={18} className="text-emerald-500" /> Formula Used
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              <strong>ROI (%)</strong> = ((Amount Returned - Amount Invested) / Amount Invested) × 100
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <strong>Profit/Loss</strong> = Amount Returned - Amount Invested
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-7 space-y-6">
          <div className="glass-card p-8 rounded-3xl h-full flex flex-col">
            <h3 className="text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase text-xs mb-8 font-semibold flex items-center gap-2">
              <PieChartIcon size={16} /> ROI Breakdown
            </h3>
            
            <div className="mb-10 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 font-bold uppercase tracking-wider">Return on Investment (ROI)</p>
              <div className={`text-5xl md:text-7xl font-black drop-shadow-sm break-words ${isLoss ? 'text-red-500 dark:text-red-400' : 'text-emerald-500 dark:text-emerald-400'}`}>
                {isLoss ? '-' : '+'}{animatedROI.toFixed(2)}%
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold">Invested</p>
                <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200"><CurrencySymbol fallback="$" />{fmt(animatedInvested)}</p>
              </div>
              <div className={`p-5 rounded-2xl border text-center flex flex-col justify-center ${isLoss ? 'bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30' : 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/30'}`}>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold">{isLoss ? 'Total Loss' : 'Total Profit'}</p>
                <p className={`text-xl md:text-2xl font-bold ${isLoss ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {isLoss ? '-' : '+'}<CurrencySymbol fallback="$" />{fmt(animatedProfit)}
                </p>
              </div>
            </div>

            {/* Visual Breakdown */}
            {!isLoss && returned > 0 && invested > 0 && (
              <div className="mt-auto h-64 w-full bg-slate-50 dark:bg-[#0A0A14] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 relative flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Invested', value: invested },
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
                        <Cell fill="#64748b" /> {/* slate-500 */}
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
                       <span className="w-3 h-3 rounded-full bg-slate-500"></span>
                       <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Invested</span>
                     </div>
                     <p className="text-lg font-bold text-slate-700 dark:text-slate-300">
                       {((invested / returned) * 100).toFixed(1)}%
                     </p>
                   </div>
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                       <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Profit</span>
                     </div>
                     <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                       {((profit / returned) * 100).toFixed(1)}%
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


// Indian Example: Mohan from Dehradun uses this tool to check variables.
