'use client';

import React, { useState, useMemo } from 'react';
import { Save } from 'lucide-react';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

export default function RetirementCalculator() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    try {
      const existingHistory = JSON.parse(localStorage.getItem('toolpixa_history') || '[]');
      const newItem = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
        toolId: 'retirement-calculator',
        inputData: { currentAge, retirementAge, monthlyExpenses, inflationRate, postRetirementReturn },
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
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [postRetirementReturn, setPostRetirementReturn] = useState<number>(8);

  const { futureMonthlyExpenses, requiredCorpus } = useMemo(() => {
    const yearsToRetire = Math.max(0, retirementAge - currentAge);
    const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge);

    if (yearsToRetire <= 0 && yearsInRetirement <= 0) {
      return { futureMonthlyExpenses: monthlyExpenses, requiredCorpus: 0 };
    }

    const inflation = inflationRate / 100;
    const postReturn = postRetirementReturn / 100;

    // Calculate future monthly expenses
    const futureExpense = monthlyExpenses * Math.pow(1 + inflation, yearsToRetire);
    const futureAnnualExpense = futureExpense * 12;

    // Calculate required corpus using real rate of return
    let corpus = 0;
    if (inflation === postReturn) {
      corpus = futureAnnualExpense * yearsInRetirement;
    } else {
      const realRate = (1 + postReturn) / (1 + inflation) - 1;
      corpus = futureAnnualExpense * ((1 - Math.pow(1 + realRate, -yearsInRetirement)) / realRate);
      
      // Assume expenses are drawn at the beginning of the year, so multiply by (1 + realRate)
      corpus = corpus * (1 + realRate);
    }

    return {
      futureMonthlyExpenses: Math.round(futureExpense),
      requiredCorpus: Math.round(Math.max(0, corpus)),
    };
  }, [currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflationRate, postRetirementReturn]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-start">
      {/* Inputs Section */}
      <div className="glass-card p-xl rounded-xl space-y-md fade-in-up">
        <div className="flex justify-between items-center mb-sm">
          <h3 className="font-headline-md text-headline-md text-text-primary">Retirement Planning</h3>
          <button 
            onClick={handleSave} 
            disabled={isSaving || monthlyExpenses <= 0 || inflationRate < 0 || postRetirementReturn < 0}
            className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
          >
            <Save size={14} /> Save
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div className="space-y-sm">
            <label className="block font-label-md text-label-md text-text-secondary">Current Age</label>
            <input 
              className="w-full bg-surface-container-low border border-glass-border rounded-lg px-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              type="number" 
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
            />
          </div>
          <div className="space-y-sm">
            <label className="block font-label-md text-label-md text-text-secondary">Retirement Age</label>
            <input 
              className="w-full bg-surface-container-low border border-glass-border rounded-lg px-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              type="number" 
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
            />
          </div>
          <div className="space-y-sm">
            <label className="block font-label-md text-label-md text-text-secondary">Life Expectancy</label>
            <input 
              className="w-full bg-surface-container-low border border-glass-border rounded-lg px-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              type="number" 
              value={lifeExpectancy}
              onChange={(e) => setLifeExpectancy(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-sm">
          <label className="block font-label-md text-label-md text-text-secondary">Current Monthly Expenses</label>
          <div className="relative group">
            <span className="absolute left-md top-1/2 -translate-y-1/2 text-primary font-bold"><CurrencySymbol fallback="$" /></span>
            <input 
              className="w-full bg-surface-container-low border border-glass-border rounded-lg pl-xl pr-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              type="number" 
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
            />
          </div>
          <input type="range" min="10000" max="500000" step="5000" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="w-full accent-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="space-y-sm">
            <label className="block font-label-md text-label-md text-text-secondary">Inflation Rate (%)</label>
            <input 
              className="w-full bg-surface-container-low border border-glass-border rounded-lg px-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              step="0.1" 
              type="number" 
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
            />
          </div>

          <div className="space-y-sm">
            <label className="block font-label-md text-label-md text-text-secondary">Post-Retirement Return (%)</label>
            <input 
              className="w-full bg-surface-container-low border border-glass-border rounded-lg px-md py-md font-label-md text-label-md text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              step="0.1" 
              type="number" 
              value={postRetirementReturn}
              onChange={(e) => setPostRetirementReturn(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="glass-card p-xl rounded-xl flex flex-col justify-center space-y-xl fade-in-up delay-100 h-full">
        <div className="text-center">
          <p className="font-label-md text-label-md text-text-secondary uppercase tracking-widest mb-xs">Required Retirement Corpus</p>
          <div className="font-display-lg text-display-lg text-primary font-bold break-words">
            <CurrencySymbol fallback="$" />{requiredCorpus.toLocaleString(currency.locale)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="bg-surface-container p-md rounded-lg text-center border border-glass-border">
            <p className="font-body-md text-text-secondary mb-1">Monthly Expenses At Retirement</p>
            <p className="font-headline-md text-secondary"><CurrencySymbol fallback="$" />{futureMonthlyExpenses.toLocaleString(currency.locale)}</p>
          </div>
          <div className="bg-surface-container p-md rounded-lg text-center border border-glass-border">
            <p className="font-body-md text-text-secondary mb-1">Years in Retirement</p>
            <p className="font-headline-md text-text-primary">{Math.max(0, lifeExpectancy - retirementAge)} Years</p>
          </div>
        </div>

        <div className="bg-surface-container-low p-md rounded-lg border border-glass-border mt-4">
          <h4 className="font-label-lg text-text-primary mb-sm">Why this corpus?</h4>
          <p className="text-body-sm text-text-secondary leading-relaxed">
            Due to an inflation rate of {inflationRate}%, your current monthly expenses of <CurrencySymbol fallback="$" />{monthlyExpenses.toLocaleString(currency.locale)} will grow to <CurrencySymbol fallback="$" />{futureMonthlyExpenses.toLocaleString(currency.locale)} by the time you retire at age {retirementAge}. 
            To sustain this lifestyle for {Math.max(0, lifeExpectancy - retirementAge)} years in retirement (assuming a {postRetirementReturn}% return on your investments), you will need a total corpus of <CurrencySymbol fallback="$" />{requiredCorpus.toLocaleString(currency.locale)}.
          </p>
        </div>
      </div>
    </div>
  );
}


// Indian Example: Shyam from Bhavnagar uses this tool to check variables.
