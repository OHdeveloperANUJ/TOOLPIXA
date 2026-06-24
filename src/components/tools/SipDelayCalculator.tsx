'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Save, Download, Table, BarChart as ChartIcon, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, CartesianGrid } from 'recharts';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';

export default function SipDelayCalculator() {
  const [isSaving, setIsSaving] = useState(false);
  const { currency } = useStore();

  const handleSave = () => {
    setIsSaving(true);
    try {
      const existingHistory = JSON.parse(localStorage.getItem('toolpixa_history') || '[]');
      const newItem = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
        toolId: 'sip-delay-calculator',
        inputData: { monthlyInvestment, returnRate, duration, delayYears },
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
  const [returnRate, setReturnRate] = useState<number>(12);
  const [duration, setDuration] = useState<number>(20);
  const [delayYears, setDelayYears] = useState<number>(2);
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

  const { originalValue, delayedValue, costOfDelay, originalInvested, delayedInvested, delayComparisonList } = useMemo(() => {
    const origVal = calculateSIPValue(monthlyInvestment, returnRate, duration);
    const delVal = calculateSIPValue(monthlyInvestment, returnRate, Math.max(0, duration - delayYears));
    const cost = Math.max(0, origVal - delVal);

    const origInv = monthlyInvestment * duration * 12;
    const delInv = monthlyInvestment * Math.max(0, duration - delayYears) * 12;

    const list = [];
    for (let d = 1; d <= 10; d++) {
      if (duration - d < 0) break;
      const v = calculateSIPValue(monthlyInvestment, returnRate, duration - d);
      const inv = monthlyInvestment * (duration - d) * 12;
      list.push({
        delay: `${d} Yr Delay`,
        maturity: Math.round(v),
        loss: Math.round(origVal - v),
        invested: Math.round(inv),
        delayNum: d
      });
    }

    return {
      originalValue: Math.round(origVal),
      delayedValue: Math.round(delVal),
      costOfDelay: Math.round(cost),
      originalInvested: Math.round(origInv),
      delayedInvested: Math.round(delInv),
      delayComparisonList: list
    };
  }, [monthlyInvestment, returnRate, duration, delayYears]);

  const chartData = [
    { name: 'No Delay', 'Maturity Value': originalValue, 'Invested': originalInvested },
    { name: `Delayed by ${delayYears} Yr`, 'Maturity Value': delayedValue, 'Invested': delayedInvested }
  ];

  const handleDownloadCsv = () => {
    if (delayComparisonList.length === 0) return;
    let csv = 'Delay Duration,Invested Amount,Maturity Value,Wealth Lost (Cost of Delay)\n';
    delayComparisonList.forEach(row => {
      csv += `${row.delay},${row.invested},${row.maturity},${row.loss}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sip_delay_cost_analysis_${currency.code}.csv`;
    a.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[80vh] p-4 lg:p-8 rounded-[32px] bg-[#05050A]">
      {/* Inputs Section */}
      <div className="lg:col-span-5 space-y-8 fade-in-up">
        <div className="flex justify-between items-start w-full">
          <div>
            <h2 className="font-headline-md font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-500 to-pink-600 tracking-tight mb-2">
              SIP Delay Cost
            </h2>
            <p className="text-white/40 font-body-md">Visualize the high price of procrastination.</p>
          </div>
          <button 
            onClick={handleSave} 
            disabled={isSaving || monthlyInvestment <= 0 || duration <= 0}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 rounded-xl text-xs font-bold transition-all disabled:opacity-50 mt-2"
          >
            <Save size={14} /> Save
          </button>
        </div>

        <div className="space-y-6">
          {/* Monthly SIP Amount */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-red-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <label className="block text-xs uppercase tracking-[0.2em] text-red-400 font-label-md mb-4 font-bold">Monthly SIP Amount</label>
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-3xl text-white/50 pb-1"><CurrencySymbol fallback="$" /></span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-5xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-red-300" 
                type="number" 
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              />
            </div>
            <div className="mt-6 relative z-10">
              <input type="range" min="500" max="100000" step="500" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            </div>
          </div>

          {/* Expected Rate of Return */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-red-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <label className="block text-xs uppercase tracking-[0.2em] text-red-400 font-label-md mb-4 font-bold">Expected Return Rate (% p.a.)</label>
            <div className="flex items-end gap-3 relative z-10">
              <input 
                className="bg-transparent border-none focus:ring-0 text-5xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-red-300" 
                type="number" 
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
              />
              <span className="text-3xl text-white/50 pb-1">%</span>
            </div>
            <div className="mt-6 relative z-10">
              <input type="range" min="1" max="30" step="0.5" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            </div>
          </div>

          {/* Planned SIP Duration */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-red-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <label className="block text-xs uppercase tracking-[0.2em] text-red-400 font-label-md mb-4 font-bold">Planned Duration (Years)</label>
            <div className="flex items-end gap-3 relative z-10">
              <input 
                className="bg-transparent border-none focus:ring-0 text-5xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-red-300" 
                type="number" 
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
              <span className="text-3xl text-white/50 pb-1">Yr</span>
            </div>
            <div className="mt-6 relative z-10">
              <input type="range" min="2" max="40" step="1" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            </div>
          </div>

          {/* Delay Period */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-red-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <label className="block text-xs uppercase tracking-[0.2em] text-red-400 font-label-md mb-4 font-bold">Delay Period (Years)</label>
            <div className="flex items-end gap-3 relative z-10">
              <input 
                className="bg-transparent border-none focus:ring-0 text-5xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-red-300" 
                type="number" 
                value={delayYears}
                onChange={(e) => setDelayYears(Number(e.target.value))}
              />
              <span className="text-3xl text-white/50 pb-1">Yr</span>
            </div>
            <div className="mt-6 relative z-10">
              <input type="range" min="1" max={Math.min(10, duration - 1)} step="1" value={delayYears} onChange={(e) => setDelayYears(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
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
                <span className="text-xs text-white/40 block mb-1">Maturity (No Delay)</span>
                <span className="text-lg md:text-xl font-bold text-[#00d09c]">
                  <CurrencySymbol />{originalValue.toLocaleString(currency.locale)}
                </span>
              </div>
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-center">
                <span className="text-xs text-white/40 block mb-1">Maturity ({delayYears} Yr Delay)</span>
                <span className="text-lg md:text-xl font-bold text-[#3b82f6]">
                  <CurrencySymbol />{delayedValue.toLocaleString(currency.locale)}
                </span>
              </div>
              <div className="bg-red-500/10 p-5 rounded-2xl border border-red-500/20 text-center">
                <span className="text-xs text-red-400 block mb-1 font-bold">Cost of Delay</span>
                <span className="text-lg md:text-xl font-bold text-red-500">
                  <CurrencySymbol />{costOfDelay.toLocaleString(currency.locale)}
                </span>
              </div>
            </div>

            {/* Toggle tabs */}
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab('chart')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'chart' ? 'bg-red-500 text-black' : 'text-white/60 hover:text-white'}`}
              >
                <ChartIcon size={16} /> Comparison Chart
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'table' ? 'bg-red-500 text-black' : 'text-white/60 hover:text-white'}`}
              >
                <Table size={16} /> Delay Matrix
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
                      <Bar dataKey="Maturity Value" fill="#ef4444" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/40">SIP Delay Impact Analysis</span>
                  <button 
                    onClick={handleDownloadCsv}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold transition-all"
                  >
                    <Download size={14} /> Export CSV
                  </button>
                </div>
                <div className="max-h-[300px] overflow-y-auto border border-white/10 rounded-2xl custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-white">
                        <th className="py-3 px-4">Delay Period</th>
                        <th className="py-3 px-4 text-right">Invested</th>
                        <th className="py-3 px-4 text-right">Maturity Value</th>
                        <th className="py-3 px-4 text-right text-red-400">Wealth Lost (Cost)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {delayComparisonList.map((row, idx) => (
                        <tr key={idx} className={`border-b border-white/5 hover:bg-white/5 text-white/60 ${row.delayNum === delayYears ? 'bg-red-500/10 text-white' : ''}`}>
                          <td className="py-2.5 px-4 font-medium text-white">{row.delay}</td>
                          <td className="py-2.5 px-4 text-right"><CurrencySymbol />{row.invested.toLocaleString(currency.locale)}</td>
                          <td className="py-2.5 px-4 text-right"><CurrencySymbol />{row.maturity.toLocaleString(currency.locale)}</td>
                          <td className="py-2.5 px-4 text-right text-red-400 font-medium"><CurrencySymbol />{row.loss.toLocaleString(currency.locale)}</td>
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
            <span className="text-white/30 animate-pulse text-sm">Computing SIP Delay details...</span>
          </div>
        )}
      </div>
    </div>
  );
}
