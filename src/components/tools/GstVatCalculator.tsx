'use client';

import React, { useState, useMemo } from 'react';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

export default function GstVatCalculator() {
  const { currency } = useStore();
  const [amount, setAmount] = useState<number>(1000);
  const [taxRate, setTaxRate] = useState<number>(18);
  const [mode, setMode] = useState<'ADD' | 'SUBTRACT'>('ADD');

  const { baseAmount, taxAmount, totalAmount } = useMemo(() => {
    if (amount <= 0 || taxRate < 0) return { baseAmount: amount, taxAmount: 0, totalAmount: amount };

    if (mode === 'ADD') {
      const tax = amount * (taxRate / 100);
      return {
        baseAmount: amount,
        taxAmount: tax,
        totalAmount: amount + tax,
      };
    } else {
      // Amount includes tax, so we need to extract it
      const base = amount / (1 + taxRate / 100);
      const tax = amount - base;
      return {
        baseAmount: base,
        taxAmount: tax,
        totalAmount: amount,
      };
    }
  }, [amount, taxRate, mode]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-start">
      {/* Inputs Section */}
      <div className="glass-card p-xl rounded-xl space-y-md fade-in-up">
        <div className="flex bg-surface-container-low p-1 rounded-lg border border-glass-border mb-md">
          <button
            className={`flex-1 py-sm px-md text-label-lg font-label-lg rounded-md transition-all ${mode === 'ADD' ? 'bg-primary text-on-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
            onClick={() => setMode('ADD')}
          >
            Add Tax (Exclusive)
          </button>
          <button
            className={`flex-1 py-sm px-md text-label-lg font-label-lg rounded-md transition-all ${mode === 'SUBTRACT' ? 'bg-primary text-on-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
            onClick={() => setMode('SUBTRACT')}
          >
            Remove Tax (Inclusive)
          </button>
        </div>

        <h3 className="font-headline-md text-headline-md text-text-primary mb-sm">Tax Details</h3>
        
        <div className="space-y-sm">
          <label className="block font-label-md text-label-md text-text-secondary">
            {mode === 'ADD' ? 'Base Amount (Before Tax)' : 'Total Amount (After Tax)'}
          </label>
          <div className="relative group">
            <span className="absolute left-md top-1/2 -translate-y-1/2 text-primary font-bold"><CurrencySymbol fallback="$" /></span>
            <input 
              className="w-full bg-surface-container-low border border-glass-border rounded-lg pl-xl pr-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-sm">
          <label className="block font-label-md text-label-md text-text-secondary">GST / VAT Rate (%)</label>
          <input 
            className="w-full bg-surface-container-low border border-glass-border rounded-lg px-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
            step="0.1" 
            type="number" 
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
          />
          <input type="range" min="0" max="40" step="0.5" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full accent-primary mt-2" />
        </div>
        
        <div className="grid grid-cols-4 gap-2 mt-2">
            {[5, 12, 18, 28].map(rate => (
              <button 
                key={rate}
                className="bg-surface-container border border-glass-border rounded-md py-xs text-label-sm text-text-secondary hover:bg-surface-container-high transition-colors"
                onClick={() => setTaxRate(rate)}
              >
                {rate}%
              </button>
            ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="glass-card p-xl rounded-xl flex flex-col justify-center space-y-xl fade-in-up delay-100 h-full">
        <div className="text-center">
          <p className="font-label-md text-label-md text-text-secondary uppercase tracking-widest mb-xs">Final Net Price</p>
          <div className="font-display-lg text-display-lg text-primary font-bold break-words">
            <CurrencySymbol fallback="$" />{totalAmount.toLocaleString(currency.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-md">
          <div className="bg-surface-container p-md rounded-lg text-center border border-glass-border">
            <p className="font-body-md text-text-secondary mb-1">Base Amount</p>
            <p className="font-headline-md text-text-primary"><CurrencySymbol fallback="$" />{baseAmount.toLocaleString(currency.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="bg-surface-container p-md rounded-lg text-center border border-glass-border">
            <p className="font-body-md text-text-secondary mb-1">Tax Amount</p>
            <p className="font-headline-md text-secondary"><CurrencySymbol fallback="$" />{taxAmount.toLocaleString(currency.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="h-64 mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Base Amount', value: baseAmount },
                  { name: 'Tax Amount', value: taxAmount }
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
                formatter={(value: any) => [`${currency.symbol}${Number(value).toLocaleString(currency.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, '']}
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
