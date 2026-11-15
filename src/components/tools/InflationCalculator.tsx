'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { TrendingUp, TrendingDown, Info, LineChart } from 'lucide-react';

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

export default function InflationCalculator() {
  const { currency } = useStore();
  const [amount, setAmount] = useState<number>(10000);
  const [inflationRate, setInflationRate] = useState<number>(3);
  const [years, setYears] = useState<number>(10);
  const [mode, setMode] = useState<'FUTURE' | 'PAST'>('FUTURE');

  const { adjustedAmount, difference, chartData } = useMemo(() => {
    if (amount <= 0 || years <= 0 || inflationRate < 0) {
      return { adjustedAmount: amount, difference: 0, chartData: [] };
    }

    const rate = inflationRate / 100;
    let data = [];
    let finalAmount = amount;

    for (let i = 0; i <= years; i++) {
      let val = 0;
      if (mode === 'FUTURE') {
        val = amount * Math.pow(1 + rate, i);
      } else {
        val = amount / Math.pow(1 + rate, i);
      }
      data.push({
        year: `Year ${i}`,
        value: val
      });
      if (i === years) finalAmount = val;
    }

    return {
      adjustedAmount: finalAmount,
      difference: Math.abs(finalAmount - amount),
      chartData: data
    };
  }, [amount, inflationRate, years, mode]);

  const animatedAdjusted = useAnimatedNumber(adjustedAmount);
  const animatedDifference = useAnimatedNumber(difference);

  const fmt = (val: number) => val.toLocaleString(currency.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <section className="space-y-8 animate-fade-in-up font-inter max-w-6xl mx-auto">
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Input Section */}
        <div className="xl:col-span-5 space-y-6">
          <div className="glass-card p-8 rounded-3xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
                {mode === 'FUTURE' ? <TrendingUp className="text-rose-500" /> : <TrendingDown className="text-teal-500" />}
                Inflation Calculator
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">See how inflation impacts the purchasing power of your money over time.</p>
            </div>

            <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
              <button 
                className={`flex-1 py-2 font-bold text-sm rounded-lg transition-all duration-300 ${mode === 'FUTURE' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                onClick={() => setMode('FUTURE')}
              >
                Future Cost
              </button>
              <button 
                className={`flex-1 py-2 font-bold text-sm rounded-lg transition-all duration-300 ${mode === 'PAST' ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                onClick={() => setMode('PAST')}
              >
                Past Value
              </button>
            </div>

            <div className="space-y-6">
              {/* Amount */}
              <div className="space-y-4 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {mode === 'FUTURE' ? 'Current Amount' : 'Future Amount'}
                  </label>
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"><CurrencySymbol fallback="$" /></span>
                    <input 
                      type="number" 
                      value={amount || ''}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 pl-8 pr-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all rounded-lg text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Inflation Rate */}
              <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">Inflation Rate (%)</label>
                  <div className="relative w-1/3">
                    <input 
                      type="number" 
                      step="0.1"
                      value={inflationRate || ''}
                      onChange={(e) => setInflationRate(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 px-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all rounded-lg text-right"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                  </div>
                </div>
                <input 
                  type="range" min="0" max="20" step="0.5" 
                  value={inflationRate} 
                  onChange={(e) => setInflationRate(Number(e.target.value))} 
                  className="w-full accent-rose-500" 
                />
              </div>

              {/* Years */}
              <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Years</label>
                  <div className="relative w-1/3">
                    <input 
                      type="number" 
                      value={years || ''}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 px-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all rounded-lg text-right"
                    />
                  </div>
                </div>
                <input 
                  type="range" min="1" max="100" step="1" 
                  value={years} 
                  onChange={(e) => setYears(Number(e.target.value))} 
                  className="w-full accent-purple-500" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-7 space-y-6">
          <div className="glass-card p-8 rounded-3xl h-full flex flex-col">
            <h3 className="text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase text-xs mb-8 font-semibold flex items-center gap-2">
              <LineChart size={16} /> Purchasing Power Projection
            </h3>
            
            <div className="mb-10 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 font-bold uppercase tracking-wider">
                {mode === 'FUTURE' ? 'Equivalent Future Cost' : 'Equivalent Past Value'}
              </p>
              <div className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white drop-shadow-sm break-words">
                <CurrencySymbol fallback="$" />{fmt(animatedAdjusted)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold">Original Amount</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400"><CurrencySymbol fallback="$" />{fmt(amount)}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold">Difference</p>
                <p className="text-xl md:text-2xl font-bold text-rose-600 dark:text-rose-400"><CurrencySymbol fallback="$" />{fmt(animatedDifference)}</p>
              </div>
            </div>

            {/* Visual Breakdown */}
            {chartData.length > 0 && (
              <div className="mt-auto h-64 w-full bg-slate-50 dark:bg-[#0A0A14] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 relative flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={mode === 'FUTURE' ? '#f43f5e' : '#14b8a6'} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={mode === 'FUTURE' ? '#f43f5e' : '#14b8a6'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                      dy={10}
                      minTickGap={20}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                      tickFormatter={(value) => `${currency.symbol}${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
                      dx={-10}
                    />
                    <RechartsTooltip
                      formatter={(value: any) => [`${currency.symbol}${fmt(Number(value))}`, 'Value']}
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                      itemStyle={{ fontWeight: 'bold', color: mode === 'FUTURE' ? '#f43f5e' : '#14b8a6' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke={mode === 'FUTURE' ? '#f43f5e' : '#14b8a6'} 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    
      {/* Explanation Box */}
      <div className="glass-card bg-slate-50/50 dark:bg-[#0A0A14]/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mt-4 w-full">
        <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
          <Info size={18} className="text-blue-500" />
          How does the Inflation Calculator work?
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
          Inflation measures the rate at which the general level of prices for goods and services is rising, and subsequently, how purchasing power is falling.
          Our calculator uses the standard compound interest formula:
        </p>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-4 font-mono text-sm overflow-x-auto text-slate-800 dark:text-slate-200">
          <p className="mb-2"><span className="text-rose-500 font-bold">Future Cost</span> = Current Amount × (1 + Inflation Rate / 100) ^ Years</p>
          <p><span className="text-teal-500 font-bold">Past Value</span> = Future Amount / (1 + Inflation Rate / 100) ^ Years</p>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          For example, if the inflation rate is 3% per year, an item that costs {currency.symbol}100 today will cost approximately {currency.symbol}134.39 in 10 years. Conversely, {currency.symbol}100 in the future has the purchasing power of only {currency.symbol}74.41 today.
        </p>
      </div>
    </section>
  );
}


// Indian Example: Abhishek from Gwalior uses this tool to check variables.
