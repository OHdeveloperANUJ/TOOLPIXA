'use client';

import React, { useState, useMemo } from 'react';
import { Save } from 'lucide-react';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

type CalculatorType = 'FD' | 'RD';

export default function FdCalculator() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    try {
      const existingHistory = JSON.parse(localStorage.getItem('toolpixa_history') || '[]');
      const newItem = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
        toolId: 'fd-calculator',
        inputData: { calcType, fdPrincipal, fdRate, fdYears, rdMonthly, rdRate, rdYears },
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
  const [calcType, setCalcType] = useState<CalculatorType>('FD');
  
  // FD Inputs
  const [fdPrincipal, setFdPrincipal] = useState<number>(100000);
  const [fdRate, setFdRate] = useState<number>(7.5);
  const [fdYears, setFdYears] = useState<number>(5);

  // RD Inputs
  const [rdMonthly, setRdMonthly] = useState<number>(5000);
  const [rdRate, setRdRate] = useState<number>(7.0);
  const [rdYears, setRdYears] = useState<number>(5);

  const { totalInvestment, totalMaturity, totalInterest } = useMemo(() => {
    if (calcType === 'FD') {
      const P = fdPrincipal;
      const r = fdRate / 100;
      const t = fdYears;
      const n = 4; // Quarterly compounding is standard for FD

      if (P <= 0 || r < 0 || t <= 0) return { totalInvestment: P, totalMaturity: P, totalInterest: 0 };

      const A = P * Math.pow(1 + r / n, n * t);
      const I = A - P;

      return {
        totalInvestment: Math.round(P),
        totalMaturity: Math.round(A),
        totalInterest: Math.round(I),
      };
    } else {
      const R = rdMonthly;
      const r = rdRate / 100;
      const t = rdYears;
      const months = t * 12;
      const i = r / 12; // Monthly interest rate

      if (R <= 0 || r < 0 || t <= 0) return { totalInvestment: R * months, totalMaturity: R * months, totalInterest: 0 };

      // Future value of an annuity due (since deposits are made at start of month)
      const A = R * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
      const investment = R * months;
      const I = A - investment;

      return {
        totalInvestment: Math.round(investment),
        totalMaturity: Math.round(A),
        totalInterest: Math.round(I),
      };
    }
  }, [calcType, fdPrincipal, fdRate, fdYears, rdMonthly, rdRate, rdYears]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-start">
      {/* Inputs Section */}
      <div className="glass-card p-xl rounded-xl space-y-md fade-in-up">
        <div className="flex bg-surface-container-low p-1 rounded-lg border border-glass-border mb-md">
          <button
            className={`flex-1 py-sm px-md text-label-lg font-label-lg rounded-md transition-all ${calcType === 'FD' ? 'bg-primary text-on-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
            onClick={() => setCalcType('FD')}
          >
            Fixed Deposit (FD)
          </button>
          <button
            className={`flex-1 py-sm px-md text-label-lg font-label-lg rounded-md transition-all ${calcType === 'RD' ? 'bg-primary text-on-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
            onClick={() => setCalcType('RD')}
          >
            Recurring Deposit (RD)
          </button>
        </div>

        <div className="flex justify-between items-center mb-sm">
          <h3 className="font-headline-md text-headline-md text-text-primary">
            {calcType === 'FD' ? 'FD Details' : 'RD Details'}
          </h3>
          <button 
            onClick={handleSave} 
            disabled={isSaving || (calcType === 'FD' ? fdPrincipal <= 0 || fdRate < 0 || fdYears <= 0 : rdMonthly <= 0 || rdRate < 0 || rdYears <= 0)}
            className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
          >
            <Save size={14} /> Save
          </button>
        </div>
        
        {calcType === 'FD' ? (
          <>
            <div className="space-y-sm">
              <label className="block font-label-md text-label-md text-text-secondary">Total Investment</label>
              <div className="relative group">
                <span className="absolute left-md top-1/2 -translate-y-1/2 text-primary font-bold"><CurrencySymbol fallback="$" /></span>
                <input 
                  className="w-full bg-surface-container-low border border-glass-border rounded-lg pl-xl pr-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  type="number" 
                  value={fdPrincipal}
                  onChange={(e) => setFdPrincipal(Number(e.target.value))}
                />
              </div>
              <input type="range" min="10000" max="10000000" step="10000" value={fdPrincipal} onChange={(e) => setFdPrincipal(Number(e.target.value))} className="w-full accent-primary" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-sm">
                <label className="block font-label-md text-label-md text-text-secondary">Interest Rate (%)</label>
                <input 
                  className="w-full bg-surface-container-low border border-glass-border rounded-lg px-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  step="0.1" 
                  type="number" 
                  value={fdRate}
                  onChange={(e) => setFdRate(Number(e.target.value))}
                />
                <input type="range" min="1" max="15" step="0.1" value={fdRate} onChange={(e) => setFdRate(Number(e.target.value))} className="w-full accent-primary" />
              </div>

              <div className="space-y-sm">
                <label className="block font-label-md text-label-md text-text-secondary">Time (Years)</label>
                <input 
                  className="w-full bg-surface-container-low border border-glass-border rounded-lg px-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  type="number" 
                  value={fdYears}
                  onChange={(e) => setFdYears(Number(e.target.value))}
                />
                <input type="range" min="1" max="30" step="1" value={fdYears} onChange={(e) => setFdYears(Number(e.target.value))} className="w-full accent-primary" />
              </div>
            </div>
            <p className="text-sm text-text-secondary italic mt-2">* Interest is compounded quarterly.</p>
          </>
        ) : (
          <>
            <div className="space-y-sm">
              <label className="block font-label-md text-label-md text-text-secondary">Monthly Investment</label>
              <div className="relative group">
                <span className="absolute left-md top-1/2 -translate-y-1/2 text-primary font-bold"><CurrencySymbol fallback="$" /></span>
                <input 
                  className="w-full bg-surface-container-low border border-glass-border rounded-lg pl-xl pr-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  type="number" 
                  value={rdMonthly}
                  onChange={(e) => setRdMonthly(Number(e.target.value))}
                />
              </div>
              <input type="range" min="500" max="100000" step="500" value={rdMonthly} onChange={(e) => setRdMonthly(Number(e.target.value))} className="w-full accent-primary" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-sm">
                <label className="block font-label-md text-label-md text-text-secondary">Interest Rate (%)</label>
                <input 
                  className="w-full bg-surface-container-low border border-glass-border rounded-lg px-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  step="0.1" 
                  type="number" 
                  value={rdRate}
                  onChange={(e) => setRdRate(Number(e.target.value))}
                />
                <input type="range" min="1" max="15" step="0.1" value={rdRate} onChange={(e) => setRdRate(Number(e.target.value))} className="w-full accent-primary" />
              </div>

              <div className="space-y-sm">
                <label className="block font-label-md text-label-md text-text-secondary">Time (Years)</label>
                <input 
                  className="w-full bg-surface-container-low border border-glass-border rounded-lg px-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  type="number" 
                  value={rdYears}
                  onChange={(e) => setRdYears(Number(e.target.value))}
                />
                <input type="range" min="1" max="30" step="1" value={rdYears} onChange={(e) => setRdYears(Number(e.target.value))} className="w-full accent-primary" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Results Section */}
      <div className="glass-card p-xl rounded-xl flex flex-col justify-center space-y-xl fade-in-up delay-100 h-full">
        <div className="text-center">
          <p className="font-label-md text-label-md text-text-secondary uppercase tracking-widest mb-xs">Total Maturity Value</p>
          <div className="font-display-lg text-display-lg text-primary font-bold break-words">
            <CurrencySymbol fallback="$" />{totalMaturity.toLocaleString(currency.locale)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-md">
          <div className="bg-surface-container p-md rounded-lg text-center border border-glass-border">
            <p className="font-body-md text-text-secondary mb-1">Total Investment</p>
            <p className="font-headline-md text-text-primary"><CurrencySymbol fallback="$" />{totalInvestment.toLocaleString(currency.locale)}</p>
          </div>
          <div className="bg-surface-container p-md rounded-lg text-center border border-glass-border">
            <p className="font-body-md text-text-secondary mb-1">Total Interest</p>
            <p className="font-headline-md text-secondary"><CurrencySymbol fallback="$" />{totalInterest.toLocaleString(currency.locale)}</p>
          </div>
        </div>

        <div className="h-64 mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Total Investment', value: totalInvestment },
                  { name: 'Total Interest', value: totalInterest }
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


// Indian Example: Shreya from Kalyan uses this tool to check variables.
