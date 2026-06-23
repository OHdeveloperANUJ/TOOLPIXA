'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { Download, Table, PieChart as ChartIcon, Plus, Info } from 'lucide-react';

export default function SipCalculator() {
  const { currency } = useStore();
  const [monthlyInvestmentStr, setMonthlyInvestmentStr] = useState<string>('5000');
  const [returnRateStr, setReturnRateStr] = useState<string>('12');
  const [yearsStr, setYearsStr] = useState<string>('10');
  const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowResults(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const monthlyInvestment = parseFloat(monthlyInvestmentStr) || 0;
  const returnRate = parseFloat(returnRateStr) || 0;
  const years = parseFloat(yearsStr) || 0;

  const { totalInvested, estimatedReturns, totalValue, yearlySchedule } = useMemo(() => {
    const P = monthlyInvestment;
    const r = returnRate / 100 / 12; // monthly rate
    const n = Math.round(years * 12); // total months

    if (P <= 0 || returnRate < 0 || years <= 0) {
      return { totalInvested: 0, estimatedReturns: 0, totalValue: 0, yearlySchedule: [] };
    }

    let A = 0;
    if (r === 0) {
      A = P * n;
    } else {
      A = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    }
    
    const investment = P * n;
    const returns = A - investment;

    // Calculate yearly schedule
    const schedule = [];
    const maxYears = Math.ceil(years);
    for (let y = 1; y <= maxYears; y++) {
      const months = y * 12;
      let val = 0;
      if (r === 0) {
        val = P * months;
      } else {
        val = P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
      }
      const inv = P * months;
      schedule.push({
        year: `Year ${y}`,
        invested: Math.round(inv),
        returns: Math.round(val - inv),
        total: Math.round(val),
      });
    }

    return {
      totalInvested: Math.round(investment),
      estimatedReturns: Math.round(returns),
      totalValue: Math.round(A),
      yearlySchedule: schedule,
    };
  }, [monthlyInvestment, returnRate, years]);

  const fmt = (val: number) => Math.round(val).toLocaleString(currency.locale);

  const handleQuickFill = (amountToAdd: number) => {
    const current = parseFloat(monthlyInvestmentStr) || 0;
    setMonthlyInvestmentStr(String(current + amountToAdd));
  };

  const handleDownloadCsv = () => {
    if (yearlySchedule.length === 0) return;
    let csv = 'Year,Invested Amount,Estimated Returns,Total Wealth\n';
    yearlySchedule.forEach(row => {
      csv += `${row.year},${row.invested},${row.returns},${row.total}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sip_wealth_schedule_${currency.code}.csv`;
    a.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[85vh] p-4 lg:p-8 rounded-[32px] bg-[#05050A]">
      {/* Input Section - Left Side */}
      <div className="lg:col-span-5 space-y-8 fade-in-up">
        <div>
          <h2 className="font-headline-md font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-tight mb-2">
            SIP Engine
          </h2>
          <p className="text-white/40 font-body-md">Precision wealth projection matrix.</p>
        </div>

        <div className="space-y-6">
          {/* Monthly Investment Input Card */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-cyan-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <label className="block text-xs uppercase tracking-[0.2em] text-cyan-400 font-label-md mb-4 font-bold">Monthly Deployment</label>
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-3xl text-white/50 pb-1"><CurrencySymbol fallback="₹" /></span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-5xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-cyan-300" 
                type="text" 
                inputMode="decimal"
                value={monthlyInvestmentStr}
                onChange={(e) => setMonthlyInvestmentStr(e.target.value)}
              />
            </div>
            <div className="mt-6 relative z-10">
              <input 
                type="range" 
                min="500" 
                max="1000000" 
                step="500" 
                value={monthlyInvestment} 
                onChange={(e) => setMonthlyInvestmentStr(e.target.value)} 
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
              />
            </div>

            {/* Quick Fill Chips */}
            <div className="mt-4 flex flex-wrap gap-2 relative z-10">
              <button 
                onClick={() => handleQuickFill(1000)}
                className="px-3 py-1 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 rounded-full text-xs text-cyan-300 font-bold transition-all flex items-center gap-0.5"
              >
                <Plus size={10} /> <CurrencySymbol fallback="₹" />1k
              </button>
              <button 
                onClick={() => handleQuickFill(5000)}
                className="px-3 py-1 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 rounded-full text-xs text-cyan-300 font-bold transition-all flex items-center gap-0.5"
              >
                <Plus size={10} /> <CurrencySymbol fallback="₹" />5k
              </button>
              <button 
                onClick={() => handleQuickFill(10000)}
                className="px-3 py-1 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 rounded-full text-xs text-cyan-300 font-bold transition-all flex items-center gap-0.5"
              >
                <Plus size={10} /> <CurrencySymbol fallback="₹" />10k
              </button>
              <button 
                onClick={() => handleQuickFill(50000)}
                className="px-3 py-1 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 rounded-full text-xs text-cyan-300 font-bold transition-all flex items-center gap-0.5"
              >
                <Plus size={10} /> <CurrencySymbol fallback="₹" />50k
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Yield Rate Input Card */}
            <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <label className="block text-xs uppercase tracking-[0.2em] text-purple-400 font-label-md mb-4 font-bold">Expected Return</label>
              <div className="flex items-end gap-2 relative z-10">
                <input 
                  className="bg-transparent border-none focus:ring-0 text-4xl font-headline-md font-bold text-white w-full p-0 outline-none focus:text-purple-300 text-left" 
                  type="text" 
                  inputMode="decimal"
                  value={returnRateStr}
                  onChange={(e) => setReturnRateStr(e.target.value)}
                />
                <span className="text-2xl text-purple-400/50 pb-1">% p.a.</span>
              </div>
              <div className="mt-4">
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="0.5" 
                  value={returnRate} 
                  onChange={(e) => setReturnRateStr(e.target.value)} 
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500" 
                />
              </div>
            </div>

            {/* Time Period Input Card */}
            <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <label className="block text-xs uppercase tracking-[0.2em] text-blue-400 font-label-md mb-4 font-bold">Time Horizon</label>
              <div className="flex items-end gap-2 relative z-10">
                <input 
                  className="bg-transparent border-none focus:ring-0 text-4xl font-headline-md font-bold text-white w-full p-0 outline-none focus:text-blue-300 text-left" 
                  type="text" 
                  inputMode="decimal"
                  value={yearsStr}
                  onChange={(e) => setYearsStr(e.target.value)}
                />
                <span className="text-xl text-blue-400/50 pb-1 font-label-md">YRS</span>
              </div>
              <div className="mt-4">
                <input 
                  type="range" 
                  min="1" 
                  max="40" 
                  step="1" 
                  value={years} 
                  onChange={(e) => setYearsStr(e.target.value)} 
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Output Section - Right Side */}
      <div className={`lg:col-span-7 transition-all duration-700 ease-out h-full ${showResults ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
        <div className="relative bg-[#0A0A14]/80 backdrop-blur-3xl rounded-[40px] p-6 lg:p-8 border border-white/10 h-full overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,1)]">
          {/* Glowing Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            
            {/* Toggle Tab Headers */}
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('chart')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'chart' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-white/40 hover:text-white/80'}`}
                >
                  <ChartIcon size={16} /> Chart Projections
                </button>
                <button 
                  onClick={() => setActiveTab('table')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'table' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-white/40 hover:text-white/80'}`}
                >
                  <Table size={16} /> Yearly Schedule
                </button>
              </div>

              {activeTab === 'table' && yearlySchedule.length > 0 && (
                <button 
                  onClick={handleDownloadCsv}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg text-xs font-bold text-white transition-all"
                  title="Download Schedule as CSV"
                >
                  <Download size={14} /> Export CSV
                </button>
              )}
            </div>

            {activeTab === 'chart' ? (
              <>
                {/* Primary Result */}
                <div className="text-center mb-8">
                  <p className="text-xs font-label-md uppercase tracking-[0.3em] text-white/40 mb-3 font-bold">Projected Net Worth</p>
                  <div className="font-headline-md text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)] tracking-tighter">
                    <CurrencySymbol fallback="₹" />{fmt(totalValue)}
                  </div>
                </div>

                {/* Breakdown Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Total Invested</p>
                    <p className="text-2xl font-headline-md font-bold text-white"><CurrencySymbol fallback="₹" />{fmt(totalInvested)}</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-2xl p-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Compound Growth</p>
                    <p className="text-2xl font-headline-md font-bold text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]"><CurrencySymbol fallback="₹" />{fmt(estimatedReturns)}</p>
                  </div>
                </div>

                {/* Double Chart View */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[220px]">
                  {/* Pie Chart */}
                  <div className="h-full relative flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl p-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Deployed Capital', value: totalInvested },
                            { name: 'Compound Growth', value: estimatedReturns }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={75}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                          cornerRadius={8}
                        >
                          <Cell fill="#1e3a8a" className="drop-shadow-[0_0_10px_rgba(30,58,138,0.5)]" />
                          <Cell fill="#a855f7" className="drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                        </Pie>
                        <RechartsTooltip 
                          formatter={(value: any) => [`${currency.symbol}${Number(value).toLocaleString(currency.locale)}`, '']}
                          contentStyle={{ backgroundColor: 'rgba(5, 5, 10, 0.95)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#fff', backdropFilter: 'blur(10px)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-bold">Growth Ratio</span>
                      <span className="text-xl font-bold text-white">{(totalInvested > 0 ? (estimatedReturns/totalInvested)*100 : 0).toFixed(0)}%</span>
                    </div>
                  </div>

                  {/* Growth Bar Chart */}
                  <div className="h-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-xs uppercase tracking-wider text-white/40 font-bold block mb-2">Growth Trend</span>
                    <div className="flex-1 h-full min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={yearlySchedule.filter((_, i) => i % Math.max(1, Math.floor(yearlySchedule.length/5)) === 0 || i === yearlySchedule.length - 1)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="year" stroke="rgba(255,255,255,0.3)" fontSize={9} />
                          <YAxis stroke="rgba(255,255,255,0.3)" fontSize={9} tickFormatter={(v) => `${currency.symbol}${Math.round(v/1000)}k`} />
                          <Tooltip 
                            formatter={(value: any) => [`${currency.symbol}${Number(value).toLocaleString(currency.locale)}`, '']}
                            contentStyle={{ backgroundColor: 'rgba(5, 5, 10, 0.95)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#fff' }}
                          />
                          <Bar dataKey="total" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
                          <defs>
                            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#06b6d4" />
                              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
                            </linearGradient>
                          </defs>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Yearly Schedule Table View */
              <div className="flex-1 overflow-hidden flex flex-col min-h-[380px]">
                <div className="overflow-y-auto max-h-[360px] custom-scrollbar border border-white/10 rounded-2xl bg-white/[0.01]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 font-label-md text-[11px] uppercase tracking-wider text-cyan-400">
                        <th className="py-3 px-4">Timeline</th>
                        <th className="py-3 px-4">Invested</th>
                        <th className="py-3 px-4">Returns</th>
                        <th className="py-3 px-4">Total Wealth</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-sm text-white/80">
                      {yearlySchedule.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-2.5 px-4 font-semibold text-white">{row.year}</td>
                          <td className="py-2.5 px-4"><CurrencySymbol fallback="₹" />{fmt(row.invested)}</td>
                          <td className="py-2.5 px-4 text-purple-300"><CurrencySymbol fallback="₹" />{fmt(row.returns)}</td>
                          <td className="py-2.5 px-4 text-cyan-300 font-bold"><CurrencySymbol fallback="₹" />{fmt(row.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-white/30 text-xs px-2">
                  <Info size={12} />
                  <span>Projections are calculated based on standard compound interest formulas.</span>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
