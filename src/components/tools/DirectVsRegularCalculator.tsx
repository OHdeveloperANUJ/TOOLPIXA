'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Save, Download, Table, BarChart as ChartIcon, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, CartesianGrid } from 'recharts';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';

export default function DirectVsRegularCalculator() {
  const [isSaving, setIsSaving] = useState(false);
  const { currency } = useStore();

  const handleSave = () => {
    setIsSaving(true);
    try {
      const existingHistory = JSON.parse(localStorage.getItem('toolpixa_history') || '[]');
      const newItem = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
        toolId: 'direct-vs-regular-calculator',
        inputData: { monthlyInvestment, years, baseReturn, directExpense, regularExpense },
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('toolpixa_history', JSON.stringify([newItem, ...existingHistory]));
      alert('Calculation saved to this device!');
    } catch (e) {
      console.error(e);
      alert('Failed to save calculation.');
    }
    setIsSaving(false);
  };

  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [years, setYears] = useState<number>(20);
  const [baseReturn, setBaseReturn] = useState<number>(12);
  const [directExpense, setDirectExpense] = useState<number>(0.2);
  const [regularExpense, setRegularExpense] = useState<number>(1.2);
  const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowResults(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const calculateSIPValue = (P: number, annualRate: number, yrs: number) => {
    if (P <= 0 || annualRate < 0 || yrs <= 0) return 0;
    const r = annualRate / 100 / 12;
    const n = yrs * 12;
    if (r === 0) return P * n;
    return P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  };

  const { directValue, regularValue, extraWealthGained, extraWealthPercent, totalInvested, yearlySchedule } = useMemo(() => {
    const directRate = baseReturn - directExpense;
    const regularRate = baseReturn - regularExpense;

    const dirVal = calculateSIPValue(monthlyInvestment, directRate, years);
    const regVal = calculateSIPValue(monthlyInvestment, regularRate, years);
    const extra = Math.max(0, dirVal - regVal);
    const extraPercent = regVal > 0 ? (extra / regVal) * 100 : 0;

    const invested = monthlyInvestment * years * 12;

    const schedule = [];
    const maxYears = Math.ceil(years);
    for (let y = 1; y <= maxYears; y++) {
      const dirYVal = calculateSIPValue(monthlyInvestment, directRate, y);
      const regYVal = calculateSIPValue(monthlyInvestment, regularRate, y);
      const yInvested = monthlyInvestment * y * 12;
      schedule.push({
        year: `Year ${y}`,
        invested: Math.round(yInvested),
        directValue: Math.round(dirYVal),
        regularValue: Math.round(regYVal),
        commissionPaid: Math.round(dirYVal - regYVal)
      });
    }

    return {
      directValue: Math.round(dirVal),
      regularValue: Math.round(regVal),
      extraWealthGained: Math.round(extra),
      extraWealthPercent: Number(extraPercent.toFixed(1)),
      totalInvested: Math.round(invested),
      yearlySchedule: schedule
    };
  }, [monthlyInvestment, years, baseReturn, directExpense, regularExpense]);

  const chartData = [
    { name: 'Regular Mutual Fund', 'Maturity Value': regularValue, 'Invested': totalInvested },
    { name: 'Direct Mutual Fund', 'Maturity Value': directValue, 'Invested': totalInvested }
  ];

  const handleDownloadCsv = () => {
    if (yearlySchedule.length === 0) return;
    let csv = 'Year,Invested Amount,Direct Fund Value,Regular Fund Value,Loss to Commissions (Regular Fund)\n';
    yearlySchedule.forEach(row => {
      csv += `${row.year},${row.invested},${row.directValue},${row.regularValue},${row.commissionPaid}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `direct_vs_regular_comparison_${currency.code}.csv`;
    a.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[80vh] p-4 lg:p-8 rounded-[32px] bg-[#05050A]">
      {/* Inputs Section */}
      <div className="lg:col-span-5 space-y-8 fade-in-up">
        <div className="flex justify-between items-start w-full">
          <div>
            <h2 className="font-headline-md font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 tracking-tight mb-2">
              Direct vs Regular
            </h2>
            <p className="text-white/40 font-body-md">Compare expense ratios and maximize returns.</p>
          </div>
          <button 
            onClick={handleSave} 
            disabled={isSaving || monthlyInvestment <= 0 || years <= 0}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 hover:border-blue-500/40 rounded-xl text-xs font-bold transition-all disabled:opacity-50 mt-2"
          >
            <Save size={14} /> Save
          </button>
        </div>

        <div className="space-y-6">
          {/* Monthly SIP Amount */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <label className="block text-xs uppercase tracking-[0.2em] text-blue-400 font-label-md mb-4 font-bold">Monthly SIP Amount</label>
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-3xl text-white/50 pb-1"><CurrencySymbol fallback="$" /></span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-5xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-blue-300" 
                type="number" 
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              />
            </div>
            <div className="mt-6 relative z-10">
              <input type="range" min="500" max="100000" step="500" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            </div>
          </div>

          {/* Investment Period (Years) */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <label className="block text-xs uppercase tracking-[0.2em] text-blue-400 font-label-md mb-4 font-bold">Investment Period (Years)</label>
            <div className="flex items-end gap-3 relative z-10">
              <input 
                className="bg-transparent border-none focus:ring-0 text-5xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-blue-300" 
                type="number" 
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
              <span className="text-3xl text-white/50 pb-1">Yr</span>
            </div>
            <div className="mt-6 relative z-10">
              <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            </div>
          </div>

          {/* Expected Return Rate */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <label className="block text-xs uppercase tracking-[0.2em] text-blue-400 font-label-md mb-4 font-bold">Base Return Rate (% p.a.)</label>
            <div className="flex items-end gap-3 relative z-10">
              <input 
                className="bg-transparent border-none focus:ring-0 text-5xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-blue-300" 
                type="number" 
                value={baseReturn}
                onChange={(e) => setBaseReturn(Number(e.target.value))}
              />
              <span className="text-3xl text-white/50 pb-1">%</span>
            </div>
            <div className="mt-6 relative z-10">
              <input type="range" min="1" max="30" step="0.5" value={baseReturn} onChange={(e) => setBaseReturn(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Direct Expense Ratio */}
            <div className="group relative bg-white/5 backdrop-blur-2xl p-4 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
              <label className="block text-xs uppercase tracking-[0.1em] text-blue-400 font-label-sm mb-2 font-bold">Direct Expense (%)</label>
              <div className="flex items-end gap-1.5 relative z-10">
                <input 
                  className="bg-transparent border-none focus:ring-0 text-3xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-blue-300" 
                  type="number" 
                  value={directExpense}
                  step="0.05"
                  onChange={(e) => setDirectExpense(Number(e.target.value))}
                />
                <span className="text-lg text-white/50 pb-0.5">%</span>
              </div>
            </div>

            {/* Regular Expense Ratio */}
            <div className="group relative bg-white/5 backdrop-blur-2xl p-4 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
              <label className="block text-xs uppercase tracking-[0.1em] text-blue-400 font-label-sm mb-2 font-bold">Regular Expense (%)</label>
              <div className="flex items-end gap-1.5 relative z-10">
                <input 
                  className="bg-transparent border-none focus:ring-0 text-3xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-blue-300" 
                  type="number" 
                  value={regularExpense}
                  step="0.05"
                  onChange={(e) => setRegularExpense(Number(e.target.value))}
                />
                <span className="text-lg text-white/50 pb-0.5">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outputs Section */}
      <div className="lg:col-span-7 space-y-6 fade-in-up" style={{ animationDelay: '100ms' }}>
        {showResults ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-center">
                <span className="text-xs text-white/40 block mb-1">Direct Fund Value</span>
                <span className="text-lg md:text-xl font-bold text-[#00d09c]">
                  <CurrencySymbol />{directValue.toLocaleString(currency.locale)}
                </span>
                <span className="text-[10px] text-white/45 block mt-0.5">@{(baseReturn - directExpense).toFixed(2)}% net return</span>
              </div>
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-center">
                <span className="text-xs text-white/40 block mb-1">Regular Fund Value</span>
                <span className="text-lg md:text-xl font-bold text-[#3b82f6]">
                  <CurrencySymbol />{regularValue.toLocaleString(currency.locale)}
                </span>
                <span className="text-[10px] text-white/45 block mt-0.5">@{(baseReturn - regularExpense).toFixed(2)}% net return</span>
              </div>
              <div className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 text-center">
                <span className="text-xs text-emerald-400 block mb-1 font-bold">Extra Wealth Gained</span>
                <span className="text-lg md:text-xl font-bold text-emerald-400">
                  <CurrencySymbol />{extraWealthGained.toLocaleString(currency.locale)}
                </span>
                <span className="text-[10px] text-emerald-400/80 block mt-0.5">+{extraWealthPercent}% higher growth</span>
              </div>
            </div>

            {/* Toggle tabs */}
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab('chart')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'chart' ? 'bg-indigo-600 text-white' : 'text-white/60 hover:text-white'}`}
              >
                <ChartIcon size={16} /> Wealth Comparison
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'table' ? 'bg-indigo-600 text-white' : 'text-white/60 hover:text-white'}`}
              >
                <Table size={16} /> Detailed Breakdown
              </button>
            </div>

            {activeTab === 'chart' ? (
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col items-center">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tickLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.5)" tickLine={false} tickFormatter={(val) => `${currency.symbol}${(val / 100000).toFixed(1)}L`} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} 
                        itemStyle={{ color: '#fff' }}
                        formatter={(value: any) => [`${currency.symbol}${Number(value).toLocaleString(currency.locale)}`, '']}
                      />
                      <Legend formatter={(value) => <span className="text-white/60 text-xs font-semibold">{value}</span>} />
                      <Bar dataKey="Invested" fill="#312e81" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="Maturity Value" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/40">Direct vs Regular Compounding Schedule</span>
                  <button 
                    onClick={handleDownloadCsv}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-xl text-xs font-bold transition-all"
                  >
                    <Download size={14} /> Export CSV
                  </button>
                </div>
                <div className="max-h-[300px] overflow-y-auto border border-white/10 rounded-2xl custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-white">
                        <th className="py-3 px-4">Year</th>
                        <th className="py-3 px-4 text-right">Invested</th>
                        <th className="py-3 px-4 text-right">Direct Value</th>
                        <th className="py-3 px-4 text-right">Regular Value</th>
                        <th className="py-3 px-4 text-right text-red-400">Total Commissions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlySchedule.map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5 text-white/60">
                          <td className="py-2.5 px-4 font-medium text-white">{row.year}</td>
                          <td className="py-2.5 px-4 text-right"><CurrencySymbol />{row.invested.toLocaleString(currency.locale)}</td>
                          <td className="py-2.5 px-4 text-right text-emerald-400"><CurrencySymbol />{row.directValue.toLocaleString(currency.locale)}</td>
                          <td className="py-2.5 px-4 text-right text-[#3b82f6]"><CurrencySymbol />{row.regularValue.toLocaleString(currency.locale)}</td>
                          <td className="py-2.5 px-4 text-right text-red-400 font-medium"><CurrencySymbol />{row.commissionPaid.toLocaleString(currency.locale)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="h-64 flex items-center justify-center bg-white/5 rounded-3xl border border-white/10">
            <span className="text-white/30 animate-pulse text-sm">Comparing funds...</span>
          </div>
        )}
      </div>
    </div>
  );
}
