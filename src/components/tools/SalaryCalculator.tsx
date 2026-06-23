'use client';

import React, { useState, useMemo } from 'react';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

export default function SalaryCalculator() {
  const { currency } = useStore();
  const [annualSalary, setAnnualSalary] = useState<number>(900000);
  const [bonus, setBonus] = useState<number>(100000);
  const [taxRate, setTaxRate] = useState<number>(20);
  const [deductions, setDeductions] = useState<number>(5000);

  const { takeHomeAnnual, takeHomeMonthly, totalTax, totalDeductions, grossAnnual } = useMemo(() => {
    const gross = annualSalary + bonus;
    const tax = gross * (taxRate / 100);
    const takeHomeYearly = gross - tax - deductions;
    const takeHomeMonth = takeHomeYearly / 12;

    return {
      takeHomeAnnual: Math.max(0, takeHomeYearly),
      takeHomeMonthly: Math.max(0, takeHomeMonth),
      totalTax: tax,
      totalDeductions: deductions,
      grossAnnual: gross,
    };
  }, [annualSalary, bonus, taxRate, deductions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-start">
      {/* Inputs Section */}
      <div className="glass-card p-xl rounded-xl space-y-md fade-in-up">
        <h3 className="font-headline-md text-headline-md text-text-primary mb-sm">Salary & Deductions</h3>
        
        <div className="space-y-sm">
          <label className="block font-label-md text-label-md text-text-secondary">Annual Base Salary</label>
          <div className="relative group">
            <span className="absolute left-md top-1/2 -translate-y-1/2 text-primary font-bold"><CurrencySymbol fallback="₹" /></span>
            <input 
              className="w-full bg-surface-container-low border border-glass-border rounded-lg pl-xl pr-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              type="number" 
              value={annualSalary}
              onChange={(e) => setAnnualSalary(Number(e.target.value))}
            />
          </div>
          <input type="range" min="50000" max="5000000" step="10000" value={annualSalary} onChange={(e) => setAnnualSalary(Number(e.target.value))} className="w-full accent-primary" />
        </div>

        <div className="space-y-sm">
          <label className="block font-label-md text-label-md text-text-secondary">Annual Bonus / Variable Pay</label>
          <div className="relative group">
            <span className="absolute left-md top-1/2 -translate-y-1/2 text-primary font-bold"><CurrencySymbol fallback="₹" /></span>
            <input 
              className="w-full bg-surface-container-low border border-glass-border rounded-lg pl-xl pr-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              type="number" 
              value={bonus}
              onChange={(e) => setBonus(Number(e.target.value))}
            />
          </div>
          <input type="range" min="0" max="2000000" step="10000" value={bonus} onChange={(e) => setBonus(Number(e.target.value))} className="w-full accent-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="space-y-sm">
            <label className="block font-label-md text-label-md text-text-secondary">Effective Tax Rate (%)</label>
            <input 
              className="w-full bg-surface-container-low border border-glass-border rounded-lg px-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              step="0.1" 
              type="number" 
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
            />
            <input type="range" min="0" max="50" step="0.5" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full accent-primary" />
          </div>

          <div className="space-y-sm">
            <label className="block font-label-md text-label-md text-text-secondary">Other Deductions (Annual)</label>
            <input 
              className="w-full bg-surface-container-low border border-glass-border rounded-lg px-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              type="number" 
              value={deductions}
              onChange={(e) => setDeductions(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="glass-card p-xl rounded-xl flex flex-col justify-center space-y-xl fade-in-up delay-100 h-full">
        <div className="text-center">
          <p className="font-label-md text-label-md text-text-secondary uppercase tracking-widest mb-xs">Monthly Take-Home Pay</p>
          <div className="font-display-lg text-display-lg text-primary font-bold break-words">
            <CurrencySymbol fallback="₹" />{takeHomeMonthly.toLocaleString(currency.locale, { maximumFractionDigits: 0 })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-md">
          <div className="bg-surface-container p-md rounded-lg text-center border border-glass-border">
            <p className="font-body-md text-text-secondary mb-1">Annual Take-Home</p>
            <p className="font-headline-md text-text-primary"><CurrencySymbol fallback="₹" />{takeHomeAnnual.toLocaleString(currency.locale, { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="bg-surface-container p-md rounded-lg text-center border border-glass-border">
            <p className="font-body-md text-text-secondary mb-1">Tax & Deductions</p>
            <p className="font-headline-md text-secondary"><CurrencySymbol fallback="₹" />{(totalTax + totalDeductions).toLocaleString(currency.locale, { maximumFractionDigits: 0 })}</p>
          </div>
        </div>

        <div className="h-64 mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Take-Home Pay', value: takeHomeAnnual },
                  { name: 'Taxes', value: totalTax },
                  { name: 'Other Deductions', value: totalDeductions }
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
                <Cell fill="var(--color-text-secondary)" />
              </Pie>
              <RechartsTooltip 
                formatter={(value: any) => [`${currency.symbol}${Number(value).toLocaleString(currency.locale, { maximumFractionDigits: 0 })}`, '']}
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


// Indian Example: Rajeev from Kolhapur uses this tool to check variables.
