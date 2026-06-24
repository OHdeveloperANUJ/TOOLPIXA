'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Save, Download, Table, PieChart as ChartIcon, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';

export default function StepUpSipCalculator() {
  const [isSaving, setIsSaving] = useState(false);
  const { currency } = useStore();

  const handleSave = () => {
    setIsSaving(true);
    try {
      const existingHistory = JSON.parse(localStorage.getItem('toolpixa_history') || '[]');
      const newItem = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
        toolId: 'step-up-sip-calculator',
        inputData: { monthlyInvestment, stepUpPercent, returnRate, years },
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
  const [stepUpPercent, setStepUpPercent] = useState<number>(10);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowResults(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const { totalInvested, estimatedReturns, totalValue, yearlySchedule } = useMemo(() => {
    const P_init = monthlyInvestment;
    const step = stepUpPercent / 100;
    const r = returnRate / 100 / 12; // Monthly rate
    const totalYears = Math.ceil(years);

    if (P_init <= 0 || returnRate < 0 || years <= 0) {
      return { totalInvested: 0, estimatedReturns: 0, totalValue: 0, yearlySchedule: [] };
    }

    let balance = 0;
    let investedAccumulator = 0;
    const schedule = [];

    // Monthly calculation
    for (let y = 1; y <= totalYears; y++) {
      // Monthly investment for this year
      const monthlyContribution = P_init * Math.pow(1 + step, y - 1);
      let yearInvested = 0;
      let yearStartingBalance = balance;

      for (let m = 1; m <= 12; m++) {
        // Only run up to the total months if fractional years
        if ((y - 1) * 12 + m > years * 12) break;
        
        balance = (balance + monthlyContribution) * (1 + r);
        yearInvested += monthlyContribution;
      }
      
      investedAccumulator += yearInvested;

      schedule.push({
        year: `Year ${y}`,
        invested: Math.round(investedAccumulator),
        returns: Math.round(balance - investedAccumulator),
        total: Math.round(balance),
        monthlySIP: Math.round(monthlyContribution),
      });
    }

    return {
      totalInvested: Math.round(investedAccumulator),
      estimatedReturns: Math.round(balance - investedAccumulator),
      totalValue: Math.round(balance),
      yearlySchedule: schedule,
    };
  }, [monthlyInvestment, stepUpPercent, returnRate, years]);

  const chartData = [
    { name: 'Invested Amount', value: totalInvested },
    { name: 'Est. Returns', value: estimatedReturns }
  ];

  const COLORS = ['#3b82f6', '#00d09c'];

  const handleDownloadCsv = () => {
    if (yearlySchedule.length === 0) return;
    let csv = 'Year,Monthly SIP Amount,Invested Amount,Estimated Returns,Maturity Value\n';
    yearlySchedule.forEach(row => {
      csv += `${row.year},${row.monthlySIP},${row.invested},${row.returns},${row.total}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `step_up_sip_schedule_${currency.code}.csv`;
    a.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[80vh] p-4 lg:p-8 rounded-[32px] bg-[#05050A]">
      {/* Inputs Section */}
      <div className="lg:col-span-5 space-y-8 fade-in-up">
        <div className="flex justify-between items-start w-full">
          <div>
            <h2 className="font-headline-md font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 tracking-tight mb-2">
              Step-Up SIP
            </h2>
            <p className="text-white/40 font-body-md">Step up your investing game annually.</p>
          </div>
          <button 
            onClick={handleSave} 
            disabled={isSaving || monthlyInvestment <= 0 || years <= 0}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl text-xs font-bold transition-all disabled:opacity-50 mt-2"
          >
            <Save size={14} /> Save
          </button>
        </div>

        <div className="space-y-6">
          {/* Monthly SIP Amount */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <label className="block text-xs uppercase tracking-[0.2em] text-emerald-400 font-label-md mb-4 font-bold">Monthly SIP Amount</label>
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-3xl text-white/50 pb-1"><CurrencySymbol fallback="$" /></span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-5xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-emerald-300" 
                type="number" 
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              />
            </div>
            <div className="mt-6 relative z-10">
              <input type="range" min="500" max="200000" step="500" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>
          </div>

          {/* Annual Step-Up Percentage */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <label className="block text-xs uppercase tracking-[0.2em] text-emerald-400 font-label-md mb-4 font-bold">Annual Step-Up (%)</label>
            <div className="flex items-end gap-3 relative z-10">
              <input 
                className="bg-transparent border-none focus:ring-0 text-5xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-emerald-300" 
                type="number" 
                value={stepUpPercent}
                onChange={(e) => setStepUpPercent(Number(e.target.value))}
              />
              <span className="text-3xl text-white/50 pb-1">%</span>
            </div>
            <div className="mt-6 relative z-10">
              <input type="range" min="1" max="50" step="1" value={stepUpPercent} onChange={(e) => setStepUpPercent(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>
          </div>

          {/* Expected Rate of Return */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <label className="block text-xs uppercase tracking-[0.2em] text-emerald-400 font-label-md mb-4 font-bold">Expected Return Rate (% p.a.)</label>
            <div className="flex items-end gap-3 relative z-10">
              <input 
                className="bg-transparent border-none focus:ring-0 text-5xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-emerald-300" 
                type="number" 
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
              />
              <span className="text-3xl text-white/50 pb-1">%</span>
            </div>
            <div className="mt-6 relative z-10">
              <input type="range" min="1" max="30" step="0.5" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>
          </div>

          {/* Investment Period (Years) */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <label className="block text-xs uppercase tracking-[0.2em] text-emerald-400 font-label-md mb-4 font-bold">Tenure (Years)</label>
            <div className="flex items-end gap-3 relative z-10">
              <input 
                className="bg-transparent border-none focus:ring-0 text-5xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-emerald-300" 
                type="number" 
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
              <span className="text-3xl text-white/50 pb-1">Yr</span>
            </div>
            <div className="mt-6 relative z-10">
              <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Outputs Section */}
      <div className="lg:col-span-7 space-y-6 fade-in-up" style={{ animationDelay: '100ms' }}>
        {showResults ? (
          <>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-center">
                <span className="text-xs text-white/40 block mb-1">Total Invested</span>
                <span className="text-lg md:text-2xl font-bold text-white">
                  <CurrencySymbol /><span className="text-emerald-400">{totalInvested.toLocaleString(currency.locale)}</span>
                </span>
              </div>
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-center">
                <span className="text-xs text-white/40 block mb-1">Est. Returns</span>
                <span className="text-lg md:text-2xl font-bold text-white">
                  <CurrencySymbol /><span className="text-teal-400">{estimatedReturns.toLocaleString(currency.locale)}</span>
                </span>
              </div>
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-center">
                <span className="text-xs text-white/40 block mb-1">Total Value</span>
                <span className="text-lg md:text-2xl font-bold text-white">
                  <CurrencySymbol /><span className="text-[#3b82f6]">{totalValue.toLocaleString(currency.locale)}</span>
                </span>
              </div>
            </div>

            {/* Toggle tabs */}
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab('chart')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'chart' ? 'bg-emerald-500 text-black' : 'text-white/60 hover:text-white'}`}
              >
                <ChartIcon size={16} /> Chart
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'table' ? 'bg-emerald-500 text-black' : 'text-white/60 hover:text-white'}`}
              >
                <Table size={16} /> Schedule
              </button>
            </div>

            {activeTab === 'chart' ? (
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col items-center">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} 
                        itemStyle={{ color: '#fff' }}
                        formatter={(value: any) => [`${currency.symbol}${Number(value).toLocaleString(currency.locale)}`, '']}
                      />
                      <Legend formatter={(value) => <span className="text-white/60 text-xs font-semibold">{value}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 mt-4 text-xs text-white/50">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#3b82f6]" /> Invested</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#00d09c]" /> Est. Returns</span>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/40">Step-Up SIP schedule</span>
                  <button 
                    onClick={handleDownloadCsv}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold transition-all"
                  >
                    <Download size={14} /> Export CSV
                  </button>
                </div>
                <div className="max-h-[300px] overflow-y-auto border border-white/10 rounded-2xl custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-white">
                        <th className="py-3 px-4">Year</th>
                        <th className="py-3 px-4 text-right">Monthly SIP</th>
                        <th className="py-3 px-4 text-right">Invested</th>
                        <th className="py-3 px-4 text-right">Returns</th>
                        <th className="py-3 px-4 text-right">Maturity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlySchedule.map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5 text-white/60">
                          <td className="py-2.5 px-4 font-medium text-white">{row.year}</td>
                          <td className="py-2.5 px-4 text-right"><CurrencySymbol />{row.monthlySIP.toLocaleString(currency.locale)}</td>
                          <td className="py-2.5 px-4 text-right"><CurrencySymbol />{row.invested.toLocaleString(currency.locale)}</td>
                          <td className="py-2.5 px-4 text-right text-emerald-400"><CurrencySymbol />{row.returns.toLocaleString(currency.locale)}</td>
                          <td className="py-2.5 px-4 text-right text-[#3b82f6] font-medium"><CurrencySymbol />{row.total.toLocaleString(currency.locale)}</td>
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
            <span className="text-white/30 animate-pulse text-sm">Computing Step-Up SIP details...</span>
          </div>
        )}
      </div>
    </div>
  );
}
