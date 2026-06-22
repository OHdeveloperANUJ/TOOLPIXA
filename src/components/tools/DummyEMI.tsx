'use client';

import React, { useState } from 'react';

export default function DummyEMI() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(12);

  // Formula: EMI = P x R x (1+R)^N / [(1+R)^N-1]
  const calculateEMI = () => {
    const p = principal;
    const r = rate / 12 / 100;
    const n = tenure;
    if (r === 0) return p / n;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  return (
    <div className="glass-card p-xl rounded-2xl border border-glass-border">
      <h3 className="font-headline-md text-headline-md text-text-primary mb-lg">Calculate EMI</h3>
      
      <div className="space-y-md mb-xl">
        {/* Principal Input */}
        <div>
          <label className="block font-label-md text-label-md text-text-secondary mb-xs">Principal Amount ($)</label>
          <input 
            type="number" 
            value={principal} 
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full bg-surface-container border border-glass-border rounded-xl py-3 px-4 font-body-md text-text-primary focus:outline-none focus:border-primary transition-all"
          />
        </div>
        {/* Interest Rate */}
        <div>
          <label className="block font-label-md text-label-md text-text-secondary mb-xs">Annual Interest Rate (%)</label>
          <input 
            type="number" 
            value={rate} 
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full bg-surface-container border border-glass-border rounded-xl py-3 px-4 font-body-md text-text-primary focus:outline-none focus:border-primary transition-all"
          />
        </div>
        {/* Tenure */}
        <div>
          <label className="block font-label-md text-label-md text-text-secondary mb-xs">Tenure (Months)</label>
          <input 
            type="number" 
            value={tenure} 
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full bg-surface-container border border-glass-border rounded-xl py-3 px-4 font-body-md text-text-primary focus:outline-none focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="p-lg rounded-xl bg-primary/10 border border-primary/20 text-center">
        <p className="font-label-md text-label-md text-text-secondary mb-xs">Your Monthly EMI</p>
        <p className="font-display-lg text-[40px] font-bold text-primary">${calculateEMI().toLocaleString()}</p>
      </div>
    </div>
  );
}
