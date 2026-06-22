'use client';

import React, { useState, useEffect, useMemo } from 'react';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Share2, Copy, Check, AlertCircle, Download } from 'lucide-react';

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

export default function CompoundInterestCalculator() {
  const { currency } = useStore();
  const [principalStr, setPrincipalStr] = useState<string>('100000');
  const [rateStr, setRateStr] = useState<string>('12');
  const [yearsStr, setYearsStr] = useState<string>('10');
  const [frequencyStr, setFrequencyStr] = useState<string>('1'); // Annually
  
  const [copied, setCopied] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const principal = parseFloat(principalStr) || 0;
  const rate = parseFloat(rateStr) || 0;
  const years = parseFloat(yearsStr) || 0;
  const frequency = parseInt(frequencyStr) || 1;

  const hasError = principal <= 0 || rate <= 0 || years <= 0 || frequency <= 0;

  const { totalInvested, estimatedReturns, totalValue, schedule, yearlyData } = useMemo(() => {
    const P = principal;
    const r = rate / 100; 
    const t = years; 
    const n = frequency;

    if (hasError) return { totalInvested: P, estimatedReturns: 0, totalValue: P, schedule: [], yearlyData: [] };

    const sched = [];
    const yearly = [];

    // Detailed schedule depends on frequency. If frequency is daily, that's too many rows. 
    // Let's generate a YEARLY schedule instead of compounding-period schedule for the table.
    
    let currentBalance = P;
    
    for (let i = 1; i <= t; i++) {
      const yearStartBalance = currentBalance;
      // Compounding formula for 1 year: A = P(1 + r/n)^n
      currentBalance = currentBalance * Math.pow(1 + r / n, n);
      
      const yearInterest = currentBalance - yearStartBalance;
      const totalInterestSoFar = currentBalance - P;
      
      sched.push({
        year: i,
        invested: P,
        interestEarned: yearInterest,
        totalInterest: totalInterestSoFar,
        balance: currentBalance
      });

      yearly.push({
        year: `Year ${i}`,
        invested: Math.round(P),
        earnings: Math.round(totalInterestSoFar)
      });
    }

    const A = currentBalance;
    const returns = A - P;

    return {
      totalInvested: Math.round(P),
      estimatedReturns: Math.round(returns),
      totalValue: Math.round(A),
      schedule: sched,
      yearlyData: yearly
    };
  }, [principal, rate, years, frequency, hasError]);

  const animatedTotal = useAnimatedNumber(totalValue);
  const animatedInvested = useAnimatedNumber(totalInvested);
  const animatedReturns = useAnimatedNumber(estimatedReturns);

  const fmt = (val: number) => Math.round(val).toLocaleString(currency.locale);

  const triggerShake = () => {
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 500);
  };

  const handleCopy = () => {
    const text = `📊 Compound Interest Result\nPrincipal: ${currency.symbol}${fmt(totalInvested)}\nTotal Interest: ${currency.symbol}${fmt(estimatedReturns)}\nFuture Wealth: ${currency.symbol}${fmt(totalValue)}\n─────────────────\nTry free: toolpixa.space/tools/compound-interest`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `📊 Power of Compounding! — ToolPixa\nInvest ${currency.symbol}${fmt(principal)}\nFor ${years} years @ ${rate}%\n\nTotal Wealth: ${currency.symbol}${fmt(totalValue)} 🚀\n─────────────────\nTry free: https://toolpixa.space/tools/compound-interest`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownloadCsv = () => {
    let csv = 'Year,Invested,Interest_Earned,Total_Interest,Balance\n';
    schedule.forEach(row => {
      csv += `${row.year},${row.invested.toFixed(2)},${row.interestEarned.toFixed(2)},${row.totalInterest.toFixed(2)},${row.balance.toFixed(2)}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compound_interest_schedule.csv';
    a.click();
  };

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Inputs */}
        <div className="lg:col-span-5 glass-card p-8 rounded-2xl space-y-6">
          <h3 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            Investment Details
          </h3>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-400">Principal Investment</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 font-bold"><CurrencySymbol fallback="$" /></span>
              <input 
                className={`w-full bg-slate-900/50 border ${hasError && principal <= 0 ? 'border-red-500' : 'border-slate-700'} rounded-lg pl-10 pr-4 py-4 text-base text-slate-100 focus:ring-2 focus:ring-blue-400 outline-none transition-all ${errorShake && principal <= 0 ? 'animate-shake' : ''}`}
                type="text"
                inputMode="decimal"
                value={principalStr}
                onChange={(e) => {
                   setPrincipalStr(e.target.value);
                   if (parseFloat(e.target.value) <= 0) triggerShake();
                }}
              />
            </div>
            <input type="range" min="1000" max="10000000" step="1000" value={principal} onChange={(e) => setPrincipalStr(e.target.value)} className="w-full accent-blue-400 h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">Annual Interest (%)</label>
              <input 
                className={`w-full bg-slate-900/50 border ${hasError && rate <= 0 ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-4 text-base text-slate-100 focus:ring-2 focus:ring-blue-400 outline-none transition-all ${errorShake && rate <= 0 ? 'animate-shake' : ''}`}
                type="text"
                inputMode="decimal"
                step="0.1"
                value={rateStr}
                onChange={(e) => {
                   setRateStr(e.target.value);
                   if (parseFloat(e.target.value) <= 0) triggerShake();
                }}
              />
              <input type="range" min="1" max="30" step="0.5" value={rate} onChange={(e) => setRateStr(e.target.value)} className="w-full accent-blue-400 h-2" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">Time Period (Years)</label>
              <input 
                className={`w-full bg-slate-900/50 border ${hasError && years <= 0 ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-4 text-base text-slate-100 focus:ring-2 focus:ring-blue-400 outline-none transition-all ${errorShake && years <= 0 ? 'animate-shake' : ''}`}
                type="text"
                inputMode="decimal"
                value={yearsStr}
                onChange={(e) => {
                   setYearsStr(e.target.value);
                   if (parseFloat(e.target.value) <= 0) triggerShake();
                }}
              />
              <input type="range" min="1" max="50" step="1" value={years} onChange={(e) => setYearsStr(e.target.value)} className="w-full accent-blue-400 h-2" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-400">Compounding Frequency</label>
            <select 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 font-medium py-4 px-4 focus:ring-2 focus:ring-blue-400 outline-none appearance-none cursor-pointer"
              value={frequencyStr}
              onChange={(e) => setFrequencyStr(e.target.value)}
            >
              <option value="1" className="bg-slate-800 text-white">Annually (1/Yr)</option>
              <option value="2" className="bg-slate-800 text-white">Semi-Annually (2/Yr)</option>
              <option value="4" className="bg-slate-800 text-white">Quarterly (4/Yr)</option>
              <option value="12" className="bg-slate-800 text-white">Monthly (12/Yr)</option>
              <option value="365" className="bg-slate-800 text-white">Daily (365/Yr)</option>
            </select>
          </div>

          {hasError && (
             <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg mt-4">
               <AlertCircle size={20} />
               <span className="text-sm">Please enter valid positive numbers to calculate.</span>
             </div>
          )}
        </div>

        {/* Results */}
        <div className={`lg:col-span-7 glass-card p-8 rounded-2xl flex flex-col space-y-6 transition-opacity duration-500 ${hasError ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <div className="text-center">
            <p className="text-sm text-slate-400 uppercase tracking-widest mb-2">Future Wealth</p>
            <div className="text-5xl md:text-6xl text-blue-400 font-bold" style={{ textShadow: '0 0 20px rgba(96, 165, 250, 0.4)' }}>
              <CurrencySymbol fallback="$" />{fmt(animatedTotal)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <p className="text-sm text-slate-400 mb-2">Principal</p>
              <p className="text-2xl font-semibold text-slate-200"><CurrencySymbol fallback="$" />{fmt(animatedInvested)}</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <p className="text-sm text-slate-400 mb-2">Compound Interest</p>
              <p className="text-2xl font-semibold text-purple-400"><CurrencySymbol fallback="$" />{fmt(animatedReturns)}</p>
            </div>
          </div>

          {/* Bar Chart for Year-by-Year visualization */}
          {yearlyData.length > 0 && (
            <div className="h-64 mt-4 hidden md:block">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                  <RechartsTooltip 
                    formatter={(value: any) => [`${currency.symbol}${fmt(Number(value))}`, '']}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="invested" name="Principal" stackId="a" fill="#3b82f6" isAnimationActive={true} animationDuration={800} />
                  <Bar dataKey="earnings" name="Interest Earned" stackId="a" fill="#a855f7" isAnimationActive={true} animationDuration={800} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button 
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-4 rounded-xl transition-all active:scale-95"
            >
              {copied ? <Check size={20} className="text-green-400"/> : <Copy size={20} />}
              <span className="text-base font-medium">{copied ? "Copied ✓" : "Copy Result"}</span>
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/50 py-4 rounded-xl transition-all active:scale-95"
            >
              <Share2 size={20} />
              <span className="text-base font-medium">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Affiliate Placement */}
      <div className="affiliate-cta-box" style={{ marginTop: '24px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <h4 className="text-base font-semibold text-slate-200 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
          Sponsored Recommendation
        </h4>
        <p className="text-sm text-slate-400 mb-4">Want higher returns than fixed deposits? Groww offers direct mutual funds with zero commission to maximize your compounding.</p>
        <a href="https://groww.in/mutual-funds" rel="sponsored noopener noreferrer" target="_blank" className="inline-block px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors">
          Explore Funds on Groww
        </a>
      </div>

      {/* Amortization Table */}
      {!hasError && schedule.length > 0 && (
        <div className="glass-card p-8 rounded-2xl mt-8 overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-100">Year-by-Year Growth</h3>
            <button onClick={handleDownloadCsv} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
              <Download size={16} />
              Download CSV
            </button>
          </div>
          
          <table className="w-full text-left text-sm text-slate-300 min-w-[600px]">
            <thead className="text-xs uppercase bg-slate-800/50 text-slate-400">
              <tr>
                <th className="px-4 py-4 rounded-tl-lg">Year</th>
                <th className="px-4 py-4">Principal</th>
                <th className="px-4 py-4">Interest Earned (Year)</th>
                <th className="px-4 py-4">Total Interest</th>
                <th className="px-4 py-4 rounded-tr-lg">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {schedule.slice(0, page * rowsPerPage).map((row) => (
                <tr key={row.year} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-4 font-medium">Year {row.year}</td>
                  <td className="px-4 py-4">{currency.symbol}{fmt(row.invested)}</td>
                  <td className="px-4 py-4 text-purple-400">+{currency.symbol}{fmt(row.interestEarned)}</td>
                  <td className="px-4 py-4 text-purple-400">{currency.symbol}{fmt(row.totalInterest)}</td>
                  <td className="px-4 py-4 font-semibold text-white">{currency.symbol}{fmt(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {page * rowsPerPage < schedule.length && (
            <div className="mt-6 text-center">
              <button 
                onClick={() => setPage(page + 1)}
                className="px-6 py-4 border border-slate-700 text-slate-300 hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors"
              >
                Load Next {rowsPerPage} Years
              </button>
            </div>
          )}
        </div>
      )}

      {/* Trust Signals */}
      <div className="mt-8 p-6 border-t border-slate-800 text-xs text-slate-500 space-y-2">
        <p><strong>Formula:</strong> A = P(1 + r/n)^(nt)</p>
        <p><strong>Disclaimer:</strong> This calculator provides mathematical estimates. Actual returns may vary depending on taxes, fees, and market volatility.</p>
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}
