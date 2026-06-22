'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { Tag, PieChart as PieChartIcon, Info } from 'lucide-react';

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

export default function DiscountCalculator() {
  const { currency } = useStore();
  const [originalPrice, setOriginalPrice] = useState<number>(150);
  const [discountPercent, setDiscountPercent] = useState<number>(20);

  const { finalPrice, savings } = useMemo(() => {
    if (originalPrice <= 0 || discountPercent < 0) return { finalPrice: originalPrice, savings: 0 };
    const saved = originalPrice * (discountPercent / 100);
    return {
      finalPrice: Math.max(0, originalPrice - saved),
      savings: saved,
    };
  }, [originalPrice, discountPercent]);

  const animatedFinalPrice = useAnimatedNumber(finalPrice);
  const animatedSavings = useAnimatedNumber(savings);
  const animatedOriginalPrice = useAnimatedNumber(originalPrice);

  const fmt = (val: number) => val.toLocaleString(currency.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <section className="space-y-8 animate-fade-in-up font-inter max-w-6xl mx-auto">
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Input Section */}
        <div className="xl:col-span-5 space-y-6">
          <div className="glass-card p-8 rounded-3xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
                <Tag className="text-amber-500" /> Discount Calculator
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Find out exactly how much you'll save and the final price after applying a discount.</p>
            </div>

            <div className="space-y-6">
              {/* Original Price */}
              <div className="space-y-4 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Original Price
                  </label>
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"><CurrencySymbol fallback="$" /></span>
                    <input 
                      type="number" 
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 pl-8 pr-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all rounded-lg text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Discount Percentage */}
              <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Discount (%)</label>
                  <div className="relative w-1/3">
                    <input 
                      type="number" 
                      step="1"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 px-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all rounded-lg text-right"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                  </div>
                </div>
                <input 
                  type="range" min="0" max="100" step="1" 
                  value={discountPercent} 
                  onChange={(e) => setDiscountPercent(Number(e.target.value))} 
                  className="w-full accent-pink-500" 
                />
                <div className="flex flex-wrap gap-2 pt-1 justify-between">
                  {[10, 15, 20, 25, 50].map(rate => (
                    <button 
                      key={rate} 
                      onClick={() => setDiscountPercent(rate)} 
                      className="px-3 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400 transition-colors flex-1"
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-3 text-slate-800 dark:text-slate-200">
              <Info size={18} className="text-amber-500" /> Formulas Used
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              <strong>Savings Amount</strong> = Original Price × (Discount % / 100)
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <strong>Final Price</strong> = Original Price - Savings Amount
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-7 space-y-6">
          <div className="glass-card p-8 rounded-3xl h-full flex flex-col">
            <h3 className="text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase text-xs mb-8 font-semibold flex items-center gap-2">
              <PieChartIcon size={16} /> Discount Breakdown
            </h3>
            
            <div className="mb-10 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 font-bold uppercase tracking-wider">Final Price</p>
              <div className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white drop-shadow-sm break-words">
                <CurrencySymbol fallback="$" />{fmt(animatedFinalPrice)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold">Original Price</p>
                <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 line-through opacity-70"><CurrencySymbol fallback="$" />{fmt(animatedOriginalPrice)}</p>
              </div>
              <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/30 text-center flex flex-col justify-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold">You Save</p>
                <p className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  <CurrencySymbol fallback="$" />{fmt(animatedSavings)}
                </p>
              </div>
            </div>

            {/* Visual Breakdown */}
            {originalPrice > 0 && (
              <div className="mt-auto h-64 w-full bg-slate-50 dark:bg-[#0A0A14] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 relative flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Final Price', value: finalPrice },
                          { name: 'Savings', value: savings }
                        ].filter(d => d.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        <Cell fill="#f59e0b" /> {/* amber-500 */}
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
                       <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                       <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Final Price</span>
                     </div>
                     <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                       {((finalPrice / originalPrice) * 100).toFixed(1)}%
                     </p>
                   </div>
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                       <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Savings</span>
                     </div>
                     <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                       {((savings / originalPrice) * 100).toFixed(1)}%
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
