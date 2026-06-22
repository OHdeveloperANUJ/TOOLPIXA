'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { Car, Info, PieChart as PieChartIcon } from 'lucide-react';

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

export default function CarLoanCalculator() {
  const { currency } = useStore();
  const [price, setPrice] = useState<number>(30000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [termMonths, setTermMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(5.5);

  const { monthlyPayment, totalInterest, totalCost, principal } = useMemo(() => {
    const p = Math.max(0, price - downPayment);
    if (p <= 0 || termMonths <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalCost: price, principal: 0 };
    }

    const r = interestRate / 100 / 12;
    const n = termMonths;
    
    let m = 0;
    if (r === 0) {
      m = p / n;
    } else {
      m = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalInt = Math.max(0, (m * n) - p);
    const totalCst = price + totalInt;

    return {
      monthlyPayment: m,
      totalInterest: totalInt,
      totalCost: totalCst,
      principal: p
    };
  }, [price, downPayment, termMonths, interestRate]);

  const animatedMonthly = useAnimatedNumber(monthlyPayment);
  const animatedInterest = useAnimatedNumber(totalInterest);
  const animatedCost = useAnimatedNumber(totalCost);

  const fmt = (val: number) => val.toLocaleString(currency.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <section className="space-y-8 animate-fade-in-up font-inter max-w-6xl mx-auto">
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Input Section */}
        <div className="xl:col-span-5 space-y-6">
          <div className="glass-card p-8 rounded-3xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
                <Car className="text-indigo-500" /> Car Loan Calculator
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Estimate your monthly auto loan payments and total interest.</p>
            </div>

            <div className="space-y-6">
              {/* Vehicle Price */}
              <div className="space-y-4 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Vehicle Price</label>
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"><CurrencySymbol fallback="$" /></span>
                    <input 
                      type="number" 
                      value={price || ''}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 pl-8 pr-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all rounded-lg text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Down Payment */}
              <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Down Payment</label>
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"><CurrencySymbol fallback="$" /></span>
                    <input 
                      type="number" 
                      value={downPayment || ''}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 pl-8 pr-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all rounded-lg text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Loan Term */}
              <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Loan Term (Months)</label>
                  <div className="relative w-1/3">
                    <input 
                      type="number" 
                      value={termMonths || ''}
                      onChange={(e) => setTermMonths(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 px-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all rounded-lg text-right"
                    />
                  </div>
                </div>
                <input 
                  type="range" min="12" max="120" step="12" 
                  value={termMonths} 
                  onChange={(e) => setTermMonths(Number(e.target.value))} 
                  className="w-full accent-amber-500" 
                />
                <div className="flex justify-between text-xs text-slate-400 font-bold px-1">
                  <span>12m</span>
                  <span>36m</span>
                  <span>60m</span>
                  <span>84m</span>
                  <span>120m</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6 group">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">Interest Rate (%)</label>
                  <div className="relative w-1/3">
                    <input 
                      type="number" 
                      step="0.1"
                      value={interestRate || ''}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 py-2 px-3 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all rounded-lg text-right"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                  </div>
                </div>
                <input 
                  type="range" min="0" max="25" step="0.25" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))} 
                  className="w-full accent-rose-500" 
                />
              </div>

            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="xl:col-span-7 space-y-6">
          <div className="glass-card p-8 rounded-3xl h-full flex flex-col">
            <h3 className="text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase text-xs mb-8 font-semibold flex items-center gap-2">
              <PieChartIcon size={16} /> Cost Breakdown
            </h3>
            
            <div className="mb-10 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 font-bold uppercase tracking-wider">Estimated Monthly Payment</p>
              <div className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white drop-shadow-sm break-words">
                <CurrencySymbol fallback="$" />{fmt(animatedMonthly)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold">Total Interest</p>
                <p className="text-xl md:text-2xl font-bold text-rose-600 dark:text-rose-400"><CurrencySymbol fallback="$" />{fmt(animatedInterest)}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold">Total Cost of Car</p>
                <p className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400"><CurrencySymbol fallback="$" />{fmt(animatedCost)}</p>
              </div>
            </div>

            {/* Visual Breakdown */}
            {principal > 0 && (
              <div className="mt-auto h-64 w-full bg-slate-50 dark:bg-[#0A0A14] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 relative flex items-center">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Principal Loan', value: principal },
                          { name: 'Total Interest', value: totalInterest }
                        ].filter(d => d.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        <Cell fill="#6366f1" /> {/* indigo-500 */}
                        <Cell fill="#f43f5e" /> {/* rose-500 */}
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
                       <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                       <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Principal</span>
                     </div>
                     <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                       {(((principal) / (principal + totalInterest)) * 100).toFixed(1)}%
                     </p>
                   </div>
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                       <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Interest</span>
                     </div>
                     <p className="text-lg font-bold text-rose-600 dark:text-rose-400">
                       {((totalInterest / (principal + totalInterest)) * 100).toFixed(1)}%
                     </p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    
      {/* Explanation Box */}
      <div className="glass-card bg-slate-50/50 dark:bg-[#0A0A14]/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mt-4 w-full">
        <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
          <Info size={18} className="text-blue-500" />
          How does the Car Loan Calculator work?
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
          The monthly payment is calculated using the standard amortized loan formula. This ensures that the loan is paid off in full by the end of the term, with a portion of each payment going towards the principal and the rest covering interest.
        </p>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-4 font-mono text-sm overflow-x-auto text-slate-800 dark:text-slate-200">
          <p className="mb-2"><span className="text-indigo-500 font-bold">M</span> = P × [r(1 + r)^n] / [(1 + r)^n - 1]</p>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Where <strong>M</strong> is the monthly payment, <strong>P</strong> is the principal loan amount (price minus down payment), <strong>r</strong> is the monthly interest rate (annual rate / 12), and <strong>n</strong> is the number of months. 
        </p>
      </div>
    </section>
  );
}
