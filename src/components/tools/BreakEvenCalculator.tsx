'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line } from 'recharts';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { Target, Info, LineChart } from 'lucide-react';

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

export default function BreakEvenCalculator() {
  const { currency } = useStore();
  const [fixedCosts, setFixedCosts] = useState<number>(10000);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(20);
  const [revenuePerUnit, setRevenuePerUnit] = useState<number>(50);

  const { breakEvenUnits, breakEvenRevenue, chartData } = useMemo(() => {
    if (fixedCosts < 0 || variableCostPerUnit < 0 || revenuePerUnit <= variableCostPerUnit) {
      return { breakEvenUnits: 0, breakEvenRevenue: 0, chartData: [] };
    }

    const units = Math.ceil(fixedCosts / (revenuePerUnit - variableCostPerUnit));
    const revenue = units * revenuePerUnit;

    let data = [];
    // Generate data points up to 2x the break-even units for a nice chart
    const maxUnits = units === 0 ? 100 : units * 2;
    const step = Math.ceil(maxUnits / 10) || 1;

    for (let i = 0; i <= maxUnits; i += step) {
      data.push({
        units: i,
        totalCost: fixedCosts + (variableCostPerUnit * i),
        totalRevenue: revenuePerUnit * i
      });
    }

    return {
      breakEvenUnits: units,
      breakEvenRevenue: revenue,
      chartData: data
    };
  }, [fixedCosts, variableCostPerUnit, revenuePerUnit]);

  const animatedUnits = useAnimatedNumber(breakEvenUnits);
  const animatedRevenue = useAnimatedNumber(breakEvenRevenue);

  const fmt = (val: number) => val.toLocaleString(currency.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtUnits = (val: number) => val.toLocaleString(currency.locale, { maximumFractionDigits: 0 });

  return (
    <section className="space-y-8 animate-fade-in-up font-inter max-w-6xl mx-auto">
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Input Section */}
        <div className="xl:col-span-5 space-y-6">
          <div className="glass-card p-8 rounded-3xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
                <Target className="text-fuchsia-500" /> Break-Even Calculator
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Determine how many units you need to sell to cover all your costs.</p>
            </div>

            <div className="space-y-6">
              {/* Fixed Costs */}
              <div className="space-y-4 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Fixed Costs</label>
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"><CurrencySymbol fallback="$" /></span>
                    <input 
                      type="number" 
                      value={fixedCosts || ''}
                      onChange={(e) => setFixedCosts(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 pl-8 pr-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all rounded-lg text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Variable Cost per Unit */}
              <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">Variable Cost (Per Unit)</label>
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"><CurrencySymbol fallback="$" /></span>
                    <input 
                      type="number" 
                      value={variableCostPerUnit || ''}
                      onChange={(e) => setVariableCostPerUnit(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 pl-8 pr-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all rounded-lg text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Revenue per Unit */}
              <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Revenue (Per Unit)</label>
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"><CurrencySymbol fallback="$" /></span>
                    <input 
                      type="number" 
                      value={revenuePerUnit || ''}
                      onChange={(e) => setRevenuePerUnit(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 pl-8 pr-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all rounded-lg text-right"
                    />
                  </div>
                </div>
              </div>
              
              {revenuePerUnit <= variableCostPerUnit && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
                  Revenue per unit must be greater than variable cost per unit to calculate a break-even point.
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-7 space-y-6">
          <div className="glass-card p-8 rounded-3xl h-full flex flex-col">
            <h3 className="text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase text-xs mb-8 font-semibold flex items-center gap-2">
              <LineChart size={16} /> Profitability Projection
            </h3>
            
            <div className="mb-10 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 font-bold uppercase tracking-wider">Break-Even Units</p>
              <div className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white drop-shadow-sm break-words">
                {fmtUnits(animatedUnits)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold">Contribution Margin</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400"><CurrencySymbol fallback="$" />{fmt(Math.max(0, revenuePerUnit - variableCostPerUnit))}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold">Break-Even Revenue</p>
                <p className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400"><CurrencySymbol fallback="$" />{fmt(animatedRevenue)}</p>
              </div>
            </div>

            {/* Visual Breakdown */}
            {chartData.length > 0 && (
              <div className="mt-auto h-64 w-full bg-slate-50 dark:bg-[#0A0A14] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 relative flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                    <XAxis 
                      dataKey="units" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                      tickFormatter={(value) => `${currency.symbol}${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
                      dx={-10}
                    />
                    <RechartsTooltip
                      formatter={(value: any, name: any) => [
                        `${currency.symbol}${fmt(Number(value))}`, 
                        name === 'totalCost' ? 'Total Cost' : 'Total Revenue'
                      ]}
                      labelFormatter={(label) => `${label} Units`}
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="totalCost" 
                      stroke="#f43f5e" 
                      strokeWidth={3} 
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="totalRevenue" 
                      stroke="#10b981" 
                      strokeWidth={3} 
                      dot={false}
                    />
                  </RechartsLineChart>
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
          How does the Break-Even Calculator work?
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
          The break-even point is the point at which total cost and total revenue are equal. It helps businesses determine the minimum number of sales required to avoid losing money.
        </p>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-4 font-mono text-sm overflow-x-auto text-slate-800 dark:text-slate-200">
          <p className="mb-2"><span className="text-fuchsia-500 font-bold">Break-Even (Units)</span> = Fixed Costs / (Revenue Per Unit - Variable Cost Per Unit)</p>
          <p><span className="text-emerald-500 font-bold">Break-Even (Revenue)</span> = Break-Even (Units) × Revenue Per Unit</p>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          The difference between Revenue Per Unit and Variable Cost Per Unit is known as the <strong>Contribution Margin</strong>. This represents the portion of each sale that contributes to covering your fixed costs.
        </p>
      </div>
    </section>
  );
}
