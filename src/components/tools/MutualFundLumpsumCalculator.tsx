'use client';

import React, { useState, useMemo } from 'react';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

export default function MutualFundLumpsumCalculator() {
  const { currency } = useStore();
  const [investment, setInvestment] = useState<number>(100000);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);

  const { totalInvestment, estimatedReturns, totalValue } = useMemo(() => {
    const P = investment;
    const r = returnRate / 100;
    const n = years;

    if (P <= 0 || r < 0 || n <= 0) return { totalInvestment: P, estimatedReturns: 0, totalValue: P };

    const A = P * Math.pow(1 + r, n);
    const I = A - P;

    return {
      totalInvestment: Math.round(P),
      estimatedReturns: Math.round(I),
      totalValue: Math.round(A),
    };
  }, [investment, returnRate, years]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-start">
      {/* Inputs Section */}
      <div className="glass-card p-xl rounded-xl space-y-md fade-in-up">
        <h3 className="font-headline-md text-headline-md text-text-primary mb-sm">Lumpsum Investment Details</h3>
        
        <div className="space-y-sm">
          <label className="block font-label-md text-label-md text-text-secondary">Total Investment</label>
          <div className="relative group">
            <span className="absolute left-md top-1/2 -translate-y-1/2 text-primary font-bold"><CurrencySymbol fallback="$" /></span>
            <input 
              className="w-full bg-surface-container-low border border-glass-border rounded-lg pl-xl pr-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              type="number" 
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
            />
          </div>
          <input type="range" min="5000" max="5000000" step="5000" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} className="w-full accent-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="space-y-sm">
            <label className="block font-label-md text-label-md text-text-secondary">Expected Return Rate (%)</label>
            <input 
              className="w-full bg-surface-container-low border border-glass-border rounded-lg px-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              step="0.1" 
              type="number" 
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value))}
            />
            <input type="range" min="1" max="30" step="0.1" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="w-full accent-primary" />
          </div>

          <div className="space-y-sm">
            <label className="block font-label-md text-label-md text-text-secondary">Time Period (Years)</label>
            <input 
              className="w-full bg-surface-container-low border border-glass-border rounded-lg px-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              type="number" 
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
            <input type="range" min="1" max="40" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-primary" />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="glass-card p-xl rounded-xl flex flex-col justify-center space-y-xl fade-in-up delay-100 h-full">
        <div className="text-center">
          <p className="font-label-md text-label-md text-text-secondary uppercase tracking-widest mb-xs">Total Value</p>
          <div className="font-display-lg text-display-lg text-primary font-bold break-words">
            <CurrencySymbol fallback="$" />{totalValue.toLocaleString(currency.locale)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-md">
          <div className="bg-surface-container p-md rounded-lg text-center border border-glass-border">
            <p className="font-body-md text-text-secondary mb-1">Total Investment</p>
            <p className="font-headline-md text-text-primary"><CurrencySymbol fallback="$" />{totalInvestment.toLocaleString(currency.locale)}</p>
          </div>
          <div className="bg-surface-container p-md rounded-lg text-center border border-glass-border">
            <p className="font-body-md text-text-secondary mb-1">Estimated Returns</p>
            <p className="font-headline-md text-secondary"><CurrencySymbol fallback="$" />{estimatedReturns.toLocaleString(currency.locale)}</p>
          </div>
        </div>

        <div className="h-64 mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Total Investment', value: totalInvestment },
                  { name: 'Estimated Returns', value: estimatedReturns }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                <Cell fill="var(--color-primary)" />
                <Cell fill="var(--color-secondary)" />
              </Pie>
              <RechartsTooltip 
                formatter={(value: any) => [`${currency.symbol}${Number(value).toLocaleString(currency.locale)}`, '']}
                contentStyle={{ backgroundColor: 'var(--color-surface-container)', border: '1px solid var(--color-glass-border)', borderRadius: '8px', color: 'var(--color-text-primary)' }}
                itemStyle={{ color: 'var(--color-text-primary)' }}
              />
              <Legend wrapperStyle={{ color: 'var(--color-text-primary)', fontSize: '14px', paddingTop: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
