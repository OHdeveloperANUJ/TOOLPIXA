'use client';

import React, { useState } from 'react';
import { TrendingUp, Info, RefreshCw, Calculator } from 'lucide-react';

export default function RuleOf72Calculator() {
  const [rate, setRate] = useState<string>('8');
  const [years, setYears] = useState<string>('9');
  const [lastEdited, setLastEdited] = useState<'rate' | 'years'>('rate');

  const exactYears = parseFloat(rate) > 0 ? (Math.log(2) / Math.log(1 + parseFloat(rate) / 100)).toFixed(2) : '-';
  const exactRate = parseFloat(years) > 0 ? ((Math.pow(2, 1 / parseFloat(years)) - 1) * 100).toFixed(2) : '-';

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRate(val);
    setLastEdited('rate');
    const r = parseFloat(val);
    if (r > 0) {
      setYears((72 / r).toFixed(2).replace(/\.00$/, ''));
    } else {
      setYears('');
    }
  };

  const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setYears(val);
    setLastEdited('years');
    const y = parseFloat(val);
    if (y > 0) {
      setRate((72 / y).toFixed(2).replace(/\.00$/, ''));
    } else {
      setRate('');
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl text-emerald-400 ring-1 ring-emerald-500/20">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Rule of 72 Calculator</h2>
          <p className="text-slate-400 text-sm mt-1">Estimate how fast your investment will double</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-300 flex justify-between">
            <span>Annual Interest Rate (%)</span>
            {lastEdited === 'rate' && <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded font-medium border border-emerald-500/20">Input</span>}
          </label>
          <div className="relative">
            <input
              type="number"
              value={rate}
              onChange={handleRateChange}
              placeholder="e.g., 8"
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 px-4 text-white text-lg placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all shadow-inner"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">%</span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-300 flex justify-between">
            <span>Years to Double</span>
            {lastEdited === 'years' && <span className="text-xs text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded font-medium border border-teal-500/20">Input</span>}
          </label>
          <div className="relative">
            <input
              type="number"
              value={years}
              onChange={handleYearsChange}
              placeholder="e.g., 9"
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 px-4 text-white text-lg placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all shadow-inner"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Yrs</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-2">
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center gap-2 text-emerald-400 mb-2 relative z-10">
            <Calculator className="w-4 h-4" />
            <h3 className="font-semibold text-sm">Rule of 72 Estimate</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1 relative z-10">
             {lastEdited === 'rate' ? `${years || 0} years` : `${rate || 0}%`}
          </div>
          <p className="text-xs text-slate-400 relative z-10">
            {lastEdited === 'rate' 
              ? `To double your money at ${rate || 0}%` 
              : `To double your money in ${years || 0} years`}
          </p>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div className="flex items-center gap-2 text-blue-400 mb-2 relative z-10">
            <Info className="w-4 h-4" />
            <h3 className="font-semibold text-sm">Exact Math Value</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1 relative z-10">
             {lastEdited === 'rate' ? `${exactYears} years` : `${exactRate}%`}
          </div>
          <p className="text-xs text-slate-400 relative z-10">
             Calculated using logarithmic formula
          </p>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-4 mt-2">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-200/80 leading-relaxed">
          <strong className="text-blue-300 font-semibold">How it works:</strong> The Rule of 72 is a quick, useful formula that is popularly used to estimate the number of years required to double the invested money at a given annual rate of return. Just divide 72 by the interest rate!
        </div>
      </div>
      
      <div className="flex justify-end pt-4 border-t border-slate-700/50 mt-2">
        <button
          onClick={() => { setRate(''); setYears(''); setLastEdited('rate'); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-slate-500/50 shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
