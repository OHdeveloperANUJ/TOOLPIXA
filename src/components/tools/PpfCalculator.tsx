'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Save, Download, Table, PieChart as ChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';

export default function PpfCalculator() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    try {
      const existingHistory = JSON.parse(localStorage.getItem('toolpixa_history') || '[]');
      const newItem = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
        toolId: 'ppf-calculator',
        inputData: { yearlyInvestment, years },
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

  const { currency } = useStore();
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(150000);
  const [years, setYears] = useState<number>(15);
  const returnRate = 7.1; // PPF fixed rate (as per typical standards, can be adjusted if needed, but fixed in UI)
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowResults(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const { totalInvested, interestEarned, totalValue } = useMemo(() => {
    const P = yearlyInvestment;
    const r = returnRate / 100;
    const n = years;

    if (P <= 0 || n <= 0) {
      return { totalInvested: P * Math.max(0, n), interestEarned: 0, totalValue: P * Math.max(0, n) };
    }

    // PPF compounded annually
    let A = 0;
    let invested = 0;
    
    // Future value of an annuity due (investments at start of year)
    A = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    invested = P * n;
    
    const interest = A - invested;

    return {
      totalInvested: Math.round(invested),
      interestEarned: Math.round(interest),
      totalValue: Math.round(A),
    };
  }, [yearlyInvestment, years]);

  const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart');

  const yearlySchedule = useMemo(() => {
    const schedule = [];
    const P = yearlyInvestment;
    const r = returnRate / 100;
    const n = years;
    if (P <= 0 || n <= 0) return [];
    
    let balance = 0;
    let totalInvestedAcc = 0;
    for (let y = 1; y <= n; y++) {
      // Deposit at start of year, interest compounded at end of year
      const openingBalance = balance;
      const deposit = P;
      const interest = (openingBalance + deposit) * r;
      balance = openingBalance + deposit + interest;
      totalInvestedAcc += deposit;
      
      schedule.push({
        year: `Year ${y}`,
        invested: Math.round(totalInvestedAcc),
        interest: Math.round(balance - totalInvestedAcc),
        total: Math.round(balance)
      });
    }
    return schedule;
  }, [yearlyInvestment, years]);

  const handleDownloadCsv = () => {
    if (yearlySchedule.length === 0) return;
    let csv = 'Year,Invested Amount,Interest Earned,Maturity Value\n';
    yearlySchedule.forEach(row => {
      csv += `${row.year},${row.invested},${row.interest},${row.total}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ppf_maturity_schedule_${currency.code}.csv`;
    a.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[80vh] p-4 lg:p-8 rounded-[32px] bg-[#05050A]">
      {/* Input Section - Left Side */}
      <div className="lg:col-span-5 space-y-8 fade-in-up">
        <div className="flex justify-between items-start w-full">
          <div>
            <h2 className="font-headline-md font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-tight mb-2">
              PPF Vault
            </h2>
            <p className="text-white/40 font-body-md">Calculate your secure, tax-free returns.</p>
          </div>
          <button 
            onClick={handleSave} 
            disabled={isSaving || yearlyInvestment <= 0 || years <= 0}
            className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 hover:border-cyan-500/40 rounded-xl text-xs font-bold transition-all disabled:opacity-50 mt-2"
          >
            <Save size={14} /> Save
          </button>
        </div>

        <div className="space-y-6">
          {/* Input Card */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-cyan-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <label className="block text-xs uppercase tracking-[0.2em] text-cyan-400 font-label-md mb-4 font-bold">Yearly Deposit</label>
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-3xl text-white/50 pb-1"><CurrencySymbol fallback="$" /></span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-5xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-cyan-300" 
                type="number" 
                value={yearlyInvestment}
                onChange={(e) => setYearlyInvestment(Number(e.target.value))}
              />
            </div>
            <div className="mt-6 relative z-10">
              <input type="range" min="500" max="150000" step="500" value={yearlyInvestment} onChange={(e) => setYearlyInvestment(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Fixed Rate */}
            <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] opacity-80 pointer-events-none">
              <label className="block text-xs uppercase tracking-[0.2em] text-purple-400 font-label-md mb-4 font-bold">Fixed Rate</label>
              <div className="flex items-end gap-2 relative z-10">
                <span className="bg-transparent border-none focus:ring-0 text-4xl font-headline-md font-bold text-white w-full p-0 outline-none text-left">
                  {returnRate}
                </span>
                <span className="text-2xl text-purple-400/50 pb-1">%</span>
              </div>
            </div>

            {/* Time Period */}
            <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <label className="block text-xs uppercase tracking-[0.2em] text-blue-400 font-label-md mb-4 font-bold">Horizon</label>
              <div className="flex items-end gap-2 relative z-10">
                <input 
                  className="bg-transparent border-none focus:ring-0 text-4xl font-headline-md font-bold text-white w-full p-0 outline-none focus:text-blue-300 text-left" 
                  type="number" 
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
                <span className="text-xl text-blue-400/50 pb-1 font-label-md">YRS</span>
              </div>
              <div className="mt-4 relative z-10">
                <input type="range" min="15" max="50" step="5" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Output Section - Right Side */}
      <div className={`lg:col-span-7 transition-all duration-700 ease-out h-full ${showResults ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
        <div className="relative bg-[#0A0A14]/80 backdrop-blur-3xl rounded-[40px] p-8 lg:p-12 border border-white/10 h-full overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,1)]">
          {/* Glowing Orbs for ambiance */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* Primary Result */}
            <div className="text-center mb-12">
              <p className="text-sm font-label-md uppercase tracking-[0.3em] text-white/40 mb-6 font-bold">Maturity Value</p>
              <div className="font-headline-md text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)] tracking-tighter">
                <CurrencySymbol fallback="$" />{totalValue.toLocaleString(currency.locale)}
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold mb-2">Total Invested</p>
                <p className="text-3xl font-headline-md font-bold text-white"><CurrencySymbol fallback="$" />{totalInvested.toLocaleString(currency.locale)}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold mb-2">Interest Earned</p>
                <p className="text-3xl font-headline-md font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]"><CurrencySymbol fallback="$" />{interestEarned.toLocaleString(currency.locale)}</p>
              </div>
            </div>

            {/* Chart */}
            
            {/* Tab Selection */}
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 my-md z-10 relative">
              <button
                onClick={() => setActiveTab('chart')}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'chart' ? 'bg-cyan-500 text-black' : 'text-white/60 hover:text-white'}`}
              >
                <ChartIcon size={14} /> Chart
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'table' ? 'bg-cyan-500 text-black' : 'text-white/60 hover:text-white'}`}
              >
                <Table size={14} /> Schedule
              </button>
            </div>

            {activeTab === 'chart' ? (
              <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Total Invested', value: totalInvested },
                      { name: 'Interest Earned', value: interestEarned }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={10}
                  >
                    <Cell fill="#1e3a8a" className="drop-shadow-[0_0_15px_rgba(30,58,138,0.8)]" />
                    <Cell fill="#06b6d4" className="drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: any) => [`${currency.symbol}${Number(value).toLocaleString(currency.locale)}`, '']}
                    contentStyle={{ backgroundColor: 'rgba(5, 5, 10, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', color: '#fff', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center text for chart */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-white/40 text-xs uppercase tracking-[0.2em] font-bold">Growth</span>
                <span className="text-2xl font-bold text-white">{(totalInvested > 0 ? (interestEarned/totalValue)*100 : 0).toFixed(0)}%</span>
              </div>
            </div>
            ) : (
              <div className="space-y-4 z-10 relative">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/40">Yearly breakdown</span>
                  <button 
                    onClick={handleDownloadCsv}
                    className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 rounded-xl text-xs font-bold transition-all"
                  >
                    <Download size={12} /> Export CSV
                  </button>
                </div>
                <div className="max-h-[220px] overflow-y-auto border border-white/10 rounded-2xl custom-scrollbar bg-black/40">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-white">
                        <th className="py-2.5 px-3">Year</th>
                        <th className="py-2.5 px-3 text-right">Invested</th>
                        <th className="py-2.5 px-3 text-right">Interest</th>
                        <th className="py-2.5 px-3 text-right">Maturity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlySchedule.map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5 text-white/60">
                          <td className="py-2 px-3 font-medium text-white">{row.year}</td>
                          <td className="py-2 px-3 text-right"><CurrencySymbol />{row.invested.toLocaleString(currency.locale)}</td>
                          <td className="py-2 px-3 text-right text-cyan-400"><CurrencySymbol />{row.interest.toLocaleString(currency.locale)}</td>
                          <td className="py-2 px-3 text-right text-white font-medium"><CurrencySymbol />{row.total.toLocaleString(currency.locale)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}


// Indian Example: Jyoti from Gorakhpur uses this tool to check variables.
