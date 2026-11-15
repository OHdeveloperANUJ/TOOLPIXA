'use client';

import React, { useState, useMemo } from 'react';
import { Download, Printer, RefreshCw, Calculator, ShieldCheck, Scale, Coins } from 'lucide-react';
import CurrencySymbol from '@/components/CurrencySymbol';

const PURITY_RATES: Record<string, { label: string; factor: number }> = {
  '24K': { label: '24K (99.9% Pure)', factor: 1.0 },
  '22K': { label: '22K (91.6% Standard)', factor: 0.916 },
  '18K': { label: '18K (75.0% Jewelry)', factor: 0.75 },
  '14K': { label: '14K (58.3% Basic)', factor: 0.583 },
};

export default function GoldLoanEmiCalculator() {
  const [weightGrams, setWeightGrams] = useState<number>(50);
  const [purity, setPurity] = useState<string>('22K');
  const [goldRate24K, setGoldRate24K] = useState<number>(7500); // Default per gram for 24K
  const [ltvPercent, setLtvPercent] = useState<number>(75); // RBI max 75%
  const [interestRate, setInterestRate] = useState<number>(9.5); // Annual interest rate %
  const [tenureMonths, setTenureMonths] = useState<number>(12);
  const [repaymentType, setRepaymentType] = useState<'emi' | 'interest_only' | 'bullet'>('emi');

  // Math Calculations
  const purityFactor = PURITY_RATES[purity]?.factor || 0.916;
  const effectiveGoldRatePerGram = Math.round(goldRate24K * purityFactor);
  const totalGoldValue = Math.round(weightGrams * effectiveGoldRatePerGram);
  const maxEligibleLoan = Math.round(totalGoldValue * (ltvPercent / 100));

  const calculationResults = useMemo(() => {
    const loan = maxEligibleLoan;
    const r = interestRate / 12 / 100;
    const n = tenureMonths;

    if (loan <= 0 || n <= 0) {
      return { monthlyEmi: 0, totalInterest: 0, totalPayable: 0, schedule: [] };
    }

    if (repaymentType === 'emi') {
      const emi = r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const monthlyEmi = Math.round(emi);
      const totalPayable = monthlyEmi * n;
      const totalInterest = Math.max(0, totalPayable - loan);

      let balance = loan;
      const schedule = [];
      for (let m = 1; m <= n; m++) {
        const interest = Math.round(balance * r);
        const principal = monthlyEmi - interest;
        balance = Math.max(0, balance - principal);
        schedule.push({
          month: m,
          principal: Math.round(principal),
          interest,
          balance: Math.round(balance),
        });
      }

      return { monthlyEmi, totalInterest, totalPayable, schedule };
    } else if (repaymentType === 'interest_only') {
      const monthlyInterest = Math.round(loan * r);
      const totalInterest = monthlyInterest * n;
      const totalPayable = loan + totalInterest;

      const schedule = [];
      for (let m = 1; m <= n; m++) {
        schedule.push({
          month: m,
          principal: m === n ? loan : 0,
          interest: monthlyInterest,
          balance: m === n ? 0 : loan,
        });
      }

      return { monthlyEmi: monthlyInterest, totalInterest, totalPayable, schedule };
    } else {
      // Bullet Repayment (Pay everything at maturity)
      const totalInterest = Math.round(loan * (interestRate / 100) * (n / 12));
      const totalPayable = loan + totalInterest;

      return {
        monthlyEmi: 0,
        totalInterest,
        totalPayable,
        schedule: [
          {
            month: n,
            principal: loan,
            interest: totalInterest,
            balance: 0,
          },
        ],
      };
    }
  }, [maxEligibleLoan, interestRate, tenureMonths, repaymentType]);

  const downloadCSV = () => {
    if (!calculationResults.schedule.length) return;
    let csv = 'Month,Principal Payment,Interest Payment,Remaining Balance\n';
    calculationResults.schedule.forEach((row) => {
      csv += `${row.month},${row.principal},${row.interest},${row.balance}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gold_loan_emi_schedule_${weightGrams}g_${purity}.csv`;
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      {/* Header Badge */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest mb-2">
              <Coins size={16} /> Gold Loan Value Estimator (RBI LTV Compliant)
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Gold Loan EMI & Interest Calculator
            </h2>
            <p className="text-text-secondary text-sm mt-1 max-w-xl">
              Calculate maximum loan eligibility against your gold jewelry or coins, estimate monthly EMIs, and compare repayment options.
            </p>
          </div>
          <div className="flex items-center gap-2 no-print">
            <button
              onClick={downloadCSV}
              className="px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl hover:bg-amber-500/30 transition-all font-semibold text-xs flex items-center gap-1.5"
            >
              <Download size={14} /> Schedule CSV
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white/10 text-white border border-white/15 rounded-xl hover:bg-white/20 transition-all font-semibold text-xs flex items-center gap-1.5"
            >
              <Printer size={14} /> Print PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-2xl space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
            <Scale className="text-amber-400" size={20} /> Gold Ornament Details
          </h3>

          {/* Weight */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <label className="text-text-secondary">Gold Weight (Grams)</label>
              <span className="text-amber-400 font-bold">{weightGrams} grams</span>
            </div>
            <input
              type="range"
              min={1}
              max={500}
              step={1}
              value={weightGrams}
              onChange={(e) => setWeightGrams(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex gap-2">
              {[10, 25, 50, 100, 250].map((w) => (
                <button
                  key={w}
                  onClick={() => setWeightGrams(w)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    weightGrams === w
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-black/30 border-white/10 text-text-secondary hover:bg-white/10'
                  }`}
                >
                  {w}g
                </button>
              ))}
            </div>
          </div>

          {/* Purity & Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Gold Purity (Carat)
              </label>
              <select
                value={purity}
                onChange={(e) => setPurity(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 text-sm font-medium"
              >
                {Object.entries(PURITY_RATES).map(([key, info]) => (
                  <option key={key} value={key}>
                    {info.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                24K Market Rate (₹ / gram)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  value={goldRate24K}
                  onChange={(e) => setGoldRate24K(Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Loan Parameters */}
          <div className="pt-4 border-t border-white/10 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="text-amber-400" size={20} /> Loan & Interest Settings
            </h3>

            {/* LTV Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label className="text-text-secondary">Loan-to-Value (LTV %)</label>
                <span className="text-amber-400 font-bold">{ltvPercent}% (RBI Limit: 75%)</span>
              </div>
              <input
                type="range"
                min={25}
                max={75}
                step={5}
                value={ltvPercent}
                onChange={(e) => setLtvPercent(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Interest Rate & Tenure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Tenure (Months)
                </label>
                <select
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-amber-400"
                >
                  {[3, 6, 12, 18, 24, 36].map((m) => (
                    <option key={m} value={m}>
                      {m} Months ({m / 12} {m === 12 ? 'Year' : 'Years'})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Repayment Scheme */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Repayment Scheme
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'emi', label: 'Monthly EMI' },
                  { key: 'interest_only', label: 'Interest Only' },
                  { key: 'bullet', label: 'Bullet Pay' },
                ].map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setRepaymentType(type.key as any)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border ${
                      repaymentType === type.key
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : 'bg-black/30 border-white/10 text-text-secondary hover:bg-white/10'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Gold Valuation Box */}
          <div className="glass-card p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-black/60 relative overflow-hidden">
            <div className="space-y-4 text-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                  Market Valuation of Gold
                </p>
                <div className="text-3xl font-extrabold text-white mt-1">
                  <CurrencySymbol /> {totalGoldValue.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-amber-400/90 mt-1 font-medium">
                  {weightGrams}g @ ₹{effectiveGoldRatePerGram.toLocaleString('en-IN')}/g ({purity})
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Max Eligible Loan ({ltvPercent}% LTV)
                </p>
                <div className="text-4xl font-extrabold text-amber-300 mt-1">
                  <CurrencySymbol /> {maxEligibleLoan.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-[11px] text-text-secondary uppercase font-bold">
                    {repaymentType === 'bullet' ? 'Bullet Repayment' : 'Monthly Payment'}
                  </p>
                  <p className="text-xl font-bold text-white mt-1">
                    {repaymentType === 'bullet' ? 'At Maturity' : <><CurrencySymbol /> {calculationResults.monthlyEmi.toLocaleString('en-IN')}</>}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-text-secondary uppercase font-bold">Total Interest</p>
                  <p className="text-xl font-bold text-amber-400 mt-1">
                    <CurrencySymbol /> {calculationResults.totalInterest.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown summary */}
          <div className="glass-card p-6 rounded-2xl space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Loan Principal</span>
              <span className="text-white font-semibold">
                <CurrencySymbol /> {maxEligibleLoan.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Total Interest Charge</span>
              <span className="text-amber-400 font-semibold">
                <CurrencySymbol /> {calculationResults.totalInterest.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="h-px bg-white/10 my-2"></div>
            <div className="flex justify-between items-center text-base font-bold">
              <span className="text-white">Total Amount Repaid</span>
              <span className="text-amber-300">
                <CurrencySymbol /> {calculationResults.totalPayable.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      {calculationResults.schedule.length > 0 && (
        <div className="glass-card p-6 rounded-2xl overflow-hidden">
          <h3 className="text-lg font-bold text-white mb-4">Repayment Amortization Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-amber-400 text-xs uppercase font-bold border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Month</th>
                  <th className="py-3 px-4">Principal (₹)</th>
                  <th className="py-3 px-4">Interest (₹)</th>
                  <th className="py-3 px-4">Remaining Loan Balance (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-text-secondary">
                {calculationResults.schedule.map((row) => (
                  <tr key={row.month} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-bold text-white">Month {row.month}</td>
                    <td className="py-3 px-4 text-emerald-400 font-medium">₹{row.principal.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-amber-400 font-medium">₹{row.interest.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-white font-medium">₹{row.balance.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Indian Example: Ramesh from Jaipur uses this tool to estimate a loan against 50 grams of 22K gold ornaments.
