'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';

export default function NetWorthCalculator() {
  const { currency } = useStore();
  
  // Assets
  const [realEstate, setRealEstate] = useState<number>(500000);
  const [investments, setInvestments] = useState<number>(150000);
  const [cash, setCash] = useState<number>(50000);
  const [vehicles, setVehicles] = useState<number>(30000);

  // Liabilities
  const [mortgage, setMortgage] = useState<number>(300000);
  const [personalLoans, setPersonalLoans] = useState<number>(20000);
  const [creditCard, setCreditCard] = useState<number>(5000);
  
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowResults(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const { totalAssets, totalLiabilities, netWorth } = useMemo(() => {
    const assets = realEstate + investments + cash + vehicles;
    const liabilities = mortgage + personalLoans + creditCard;
    const worth = assets - liabilities;

    return {
      totalAssets: Math.round(assets),
      totalLiabilities: Math.round(liabilities),
      netWorth: Math.round(worth),
    };
  }, [realEstate, investments, cash, vehicles, mortgage, personalLoans, creditCard]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[80vh] p-4 lg:p-8 rounded-[32px] bg-[#05050A]">
      {/* Input Section - Left Side */}
      <div className="lg:col-span-5 space-y-8 fade-in-up">
        <div>
          <h2 className="font-headline-md font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-tight mb-2">
            Wealth Core
          </h2>
          <p className="text-white/40 font-body-md">Calculate your absolute net worth.</p>
        </div>

        <div className="space-y-6">
          {/* Assets Section */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-cyan-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <h3 className="block text-sm uppercase tracking-[0.2em] text-cyan-400 font-label-md mb-6 font-bold">Assets</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/70 font-body-sm">Real Estate</span>
                <div className="flex items-center gap-1">
                  <span className="text-white/40"><CurrencySymbol fallback="$" /></span>
                  <input className="bg-transparent text-right text-white font-headline-md font-bold w-24 outline-none focus:text-cyan-300" type="number" value={realEstate} onChange={(e) => setRealEstate(Number(e.target.value))} />
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/70 font-body-sm">Investments</span>
                <div className="flex items-center gap-1">
                  <span className="text-white/40"><CurrencySymbol fallback="$" /></span>
                  <input className="bg-transparent text-right text-white font-headline-md font-bold w-24 outline-none focus:text-cyan-300" type="number" value={investments} onChange={(e) => setInvestments(Number(e.target.value))} />
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/70 font-body-sm">Cash / Bank</span>
                <div className="flex items-center gap-1">
                  <span className="text-white/40"><CurrencySymbol fallback="$" /></span>
                  <input className="bg-transparent text-right text-white font-headline-md font-bold w-24 outline-none focus:text-cyan-300" type="number" value={cash} onChange={(e) => setCash(Number(e.target.value))} />
                </div>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-white/70 font-body-sm">Vehicles</span>
                <div className="flex items-center gap-1">
                  <span className="text-white/40"><CurrencySymbol fallback="$" /></span>
                  <input className="bg-transparent text-right text-white font-headline-md font-bold w-24 outline-none focus:text-cyan-300" type="number" value={vehicles} onChange={(e) => setVehicles(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </div>

          {/* Liabilities Section */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-red-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <h3 className="block text-sm uppercase tracking-[0.2em] text-red-400 font-label-md mb-6 font-bold">Liabilities</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/70 font-body-sm">Mortgage</span>
                <div className="flex items-center gap-1">
                  <span className="text-white/40"><CurrencySymbol fallback="$" /></span>
                  <input className="bg-transparent text-right text-white font-headline-md font-bold w-24 outline-none focus:text-red-300" type="number" value={mortgage} onChange={(e) => setMortgage(Number(e.target.value))} />
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/70 font-body-sm">Personal Loans</span>
                <div className="flex items-center gap-1">
                  <span className="text-white/40"><CurrencySymbol fallback="$" /></span>
                  <input className="bg-transparent text-right text-white font-headline-md font-bold w-24 outline-none focus:text-red-300" type="number" value={personalLoans} onChange={(e) => setPersonalLoans(Number(e.target.value))} />
                </div>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-white/70 font-body-sm">Credit Cards</span>
                <div className="flex items-center gap-1">
                  <span className="text-white/40"><CurrencySymbol fallback="$" /></span>
                  <input className="bg-transparent text-right text-white font-headline-md font-bold w-24 outline-none focus:text-red-300" type="number" value={creditCard} onChange={(e) => setCreditCard(Number(e.target.value))} />
                </div>
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
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* Primary Result */}
            <div className="text-center mb-12">
              <p className="text-sm font-label-md uppercase tracking-[0.3em] text-white/40 mb-6 font-bold">Total Net Worth</p>
              <div className={`font-headline-md text-7xl lg:text-8xl font-black text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(34,211,238,0.4)] tracking-tighter ${netWorth >= 0 ? 'bg-gradient-to-b from-white via-cyan-100 to-cyan-400' : 'bg-gradient-to-b from-white via-red-100 to-red-500'}`}>
                {netWorth < 0 ? '-' : ''}<CurrencySymbol fallback="$" />{Math.abs(netWorth).toLocaleString(currency.locale)}
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold mb-2">Total Assets</p>
                <p className="text-3xl font-headline-md font-bold text-white"><CurrencySymbol fallback="$" />{totalAssets.toLocaleString(currency.locale)}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold mb-2">Total Liabilities</p>
                <p className="text-3xl font-headline-md font-bold text-red-300 drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]"><CurrencySymbol fallback="$" />{totalLiabilities.toLocaleString(currency.locale)}</p>
              </div>
            </div>

            {/* Chart */}
            <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Assets', value: totalAssets },
                      { name: 'Liabilities', value: totalLiabilities }
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
                    <Cell fill="#06b6d4" className="drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                    <Cell fill="#ef4444" className="drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
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
                <span className="text-white/40 text-xs uppercase tracking-[0.2em] font-bold">Health</span>
                <span className="text-2xl font-bold text-white">{(totalAssets > 0 ? (totalAssets / (totalAssets + totalLiabilities)) * 100 : 0).toFixed(0)}%</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}


// Indian Example: Saurabh from Mysore uses this tool to check variables.
