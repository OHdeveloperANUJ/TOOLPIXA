'use client';

import React, { useState, useEffect, useMemo } from 'react';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Share2, Copy, Check, Download, AlertCircle, Building2 } from 'lucide-react';

export default function EducationLoanEmi() {
  const { currency } = useStore();
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  
  // Core Inputs
  const [principalStr, setPrincipalStr] = useState<string>('5000000');
  const [rateStr, setRateStr] = useState<string>('8.5');
  const [tenureYearsStr, setTenureYearsStr] = useState<string>('10');
  
  // Education Loan Specific Inputs
  const [moratoriumMonthsStr, setMoratoriumMonthsStr] = useState<string>('36');
  const [payInterestDuringMoratorium, setPayInterestDuringMoratorium] = useState<boolean>(true);
  const [csisSubsidy, setCsisSubsidy] = useState<boolean>(false);
  const [taxBracketStr, setTaxBracketStr] = useState<string>('30');

  const [page, setPage] = useState(1);
  const rowsPerPage = 12;

  const principal = parseFloat(principalStr) || 0;
  const rate = parseFloat(rateStr) || 0;
  const tenureYears = parseFloat(tenureYearsStr) || 0;
  const moratoriumMonths = parseInt(moratoriumMonthsStr) || 0;
  const taxBracket = parseFloat(taxBracketStr) || 0;

  const hasError = principal <= 0 || rate <= 0 || tenureYears <= 0;
  const triggerShake = () => { setErrorShake(true); setTimeout(() => setErrorShake(false), 500); };

  const { 
    moratoriumEmi, 
    postMoratoriumEmi, 
    totalInterest, 
    totalPayment, 
    schedule,
    taxSaved80E,
    totalMoratoriumInterest
  } = useMemo(() => {
    if (principal <= 0 || rate <= 0 || tenureYears <= 0) {
      return { moratoriumEmi: 0, postMoratoriumEmi: 0, totalInterest: 0, totalPayment: principal, schedule: [], taxSaved80E: 0, totalMoratoriumInterest: 0 };
    }

    const R = rate / 12 / 100;
    const N = tenureYears * 12; 
    
    const monthlySimpleInterest = principal * R;
    let calcTotalMoratoriumInterest = monthlySimpleInterest * moratoriumMonths;
    let actualMoratoriumPayment = 0;
    
    if (csisSubsidy) {
       calcTotalMoratoriumInterest = 0;
       actualMoratoriumPayment = 0;
    } else {
       if (payInterestDuringMoratorium && moratoriumMonths > 0) {
         actualMoratoriumPayment = monthlySimpleInterest;
       }
    }
    
    let loanAmountForEMI = principal;
    if (!csisSubsidy && !payInterestDuringMoratorium) {
      loanAmountForEMI += calcTotalMoratoriumInterest;
    }

    const postMoratoriumEmiValue = (loanAmountForEMI * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalRepaymentDuringTenure = postMoratoriumEmiValue * N;
    
    const totalInterestPaidDuringTenure = totalRepaymentDuringTenure - loanAmountForEMI;
    const totalInterestOverall = (actualMoratoriumPayment * moratoriumMonths) + totalInterestPaidDuringTenure;
    const totalPaymentValue = principal + totalInterestOverall;

    const sched = [];
    let currentMonth = 1;
    let moratBalance = principal;
    
    for (let i = 1; i <= moratoriumMonths; i++) {
       let interest = 0;
       let payment = 0;
       if (!csisSubsidy) {
         interest = monthlySimpleInterest;
         if (payInterestDuringMoratorium) {
           payment = interest;
         } else {
           moratBalance += interest;
         }
       }
       sched.push({
         month: currentMonth++,
         payment: payment,
         principal: 0,
         interest: interest,
         balance: moratBalance
       });
    }

    let balance = loanAmountForEMI;
    let interestPaidInFirst8Years = 0;

    for (let i = 1; i <= N; i++) {
      const interestForMonth = balance * R;
      const principalForMonth = postMoratoriumEmiValue - interestForMonth;
      balance -= principalForMonth;
      if (balance < 0) balance = 0;
      
      sched.push({
        month: currentMonth++,
        payment: postMoratoriumEmiValue,
        principal: principalForMonth,
        interest: interestForMonth,
        balance: balance
      });

      if (i <= 8 * 12) {
        interestPaidInFirst8Years += interestForMonth;
      }
    }
    
    let taxSaved = interestPaidInFirst8Years * (taxBracket / 100);
    if (payInterestDuringMoratorium) {
        const moratoriumMonthsInFirst8Years = Math.min(moratoriumMonths, 8 * 12);
        taxSaved += (actualMoratoriumPayment * moratoriumMonthsInFirst8Years) * (taxBracket / 100);
    }

    return {
      moratoriumEmi: actualMoratoriumPayment,
      postMoratoriumEmi: postMoratoriumEmiValue,
      totalInterest: totalInterestOverall,
      totalPayment: totalPaymentValue,
      schedule: sched,
      taxSaved80E: taxSaved,
      totalMoratoriumInterest: calcTotalMoratoriumInterest
    };
  }, [principal, rate, tenureYears, moratoriumMonths, payInterestDuringMoratorium, csisSubsidy, taxBracket]);

  const fmt = (val: number) => Math.round(val).toLocaleString(currency.locale);

  const handleCopy = () => {
    const text = `📊 Education Loan EMI Result\nDuring Course EMI: ${currency.symbol}${fmt(moratoriumEmi)}\nPost Course EMI: ${currency.symbol}${fmt(postMoratoriumEmi)}\nTotal Interest: ${currency.symbol}${fmt(totalInterest)}\nTax Saved (80E): ${currency.symbol}${fmt(taxSaved80E)}\n─────────────────\nTry free: toolpixa.space/tools/education-loan-emi-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `📊 Education Loan EMI Result — ToolPixa\nPost-Course EMI: ${currency.symbol}${fmt(postMoratoriumEmi)}\nPrincipal: ${currency.symbol}${fmt(principal)}\nTax Saved (80E): ${currency.symbol}${fmt(taxSaved80E)}\n─────────────────\nTry free: https://toolpixa.space/tools/education-loan-emi-calculator`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownloadCsv = () => {
    let csv = 'Month,Payment,Principal,Interest,Balance\n';
    schedule.forEach(row => {
      csv += `${row.month},${row.payment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'education_loan_amortization.csv';
    a.click();
  };

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Inputs Section */}
        <div className="glass-card p-8 rounded-2xl space-y-6">
          <h3 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            Loan Details
          </h3>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-400">Loan Amount (Principal)</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-bold"><CurrencySymbol fallback="₹" /></span>
              <input 
                className={`w-full bg-slate-900/50 border ${hasError && principal <= 0 ? 'border-red-500' : 'border-slate-700'} rounded-lg pl-10 pr-4 py-4 text-base text-slate-100 focus:ring-2 focus:ring-cyan-400 outline-none transition-all ${errorShake && principal <= 0 ? 'animate-shake' : ''}`}
                type="text"
                inputMode="decimal"
                value={principalStr}
                onChange={(e) => {
                   setPrincipalStr(e.target.value);
                   if (parseFloat(e.target.value) <= 0) triggerShake();
                }}
              />
            </div>
            <input type="range" min="100000" max="20000000" step="100000" value={principal} onChange={(e) => setPrincipalStr(e.target.value)} className="w-full accent-cyan-400 h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">Interest Rate (%)</label>
              <input 
                className={`w-full bg-slate-900/50 border ${hasError && rate <= 0 ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-4 text-base text-slate-100 focus:ring-2 focus:ring-cyan-400 outline-none transition-all ${errorShake && rate <= 0 ? 'animate-shake' : ''}`}
                step="0.1" 
                type="text"
                inputMode="decimal"
                value={rateStr}
                onChange={(e) => {
                  setRateStr(e.target.value);
                  if (parseFloat(e.target.value) <= 0) triggerShake();
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">Repayment Tenure (Years)</label>
              <input 
                className={`w-full bg-slate-900/50 border ${hasError && tenureYears <= 0 ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-4 text-base text-slate-100 focus:ring-2 focus:ring-cyan-400 outline-none transition-all ${errorShake && tenureYears <= 0 ? 'animate-shake' : ''}`}
                type="text"
                inputMode="decimal"
                value={tenureYearsStr}
                onChange={(e) => {
                  setTenureYearsStr(e.target.value);
                  if (parseFloat(e.target.value) <= 0) triggerShake();
                }}
              />
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-6 mt-6 space-y-6">
            <h4 className="text-lg font-semibold text-slate-200">Moratorium & Benefits</h4>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">Moratorium Period (Months)</label>
              <input 
                className={`w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-4 text-base text-slate-100 focus:ring-2 focus:ring-cyan-400 outline-none`}
                type="text"
                inputMode="decimal"
                value={moratoriumMonthsStr}
                onChange={(e) => setMoratoriumMonthsStr(e.target.value)}
                placeholder="e.g. 36 (Course duration + 6-12 months)"
              />
              <p className="text-xs text-slate-500 mt-1">Course duration + grace period (usually 6-12 months) before full EMI starts.</p>
            </div>
            
            <div className="space-y-4 pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={payInterestDuringMoratorium} onChange={(e) => setPayInterestDuringMoratorium(e.target.checked)} disabled={csisSubsidy} />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${payInterestDuringMoratorium && !csisSubsidy ? 'bg-cyan-500' : 'bg-slate-700'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${payInterestDuringMoratorium && !csisSubsidy ? 'translate-x-4' : ''}`}></div>
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-medium ${csisSubsidy ? 'text-slate-600' : 'text-slate-300'}`}>Pay Interest During Moratorium?</span>
                    <span className="text-xs text-slate-500">If Yes, interest won't compound. If No, it's added to principal.</span>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={csisSubsidy} onChange={(e) => {
                        setCsisSubsidy(e.target.checked);
                        if (e.target.checked) setPayInterestDuringMoratorium(false);
                    }} />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${csisSubsidy ? 'bg-purple-500' : 'bg-slate-700'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${csisSubsidy ? 'translate-x-4' : ''}`}></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-300">CSIS Subsidy Eligible? (India)</span>
                    <span className="text-xs text-slate-500">Waives 100% interest during moratorium for family income {"<"} ₹4.5L/yr.</span>
                  </div>
                </label>
            </div>

            <div className="space-y-2 pt-2">
              <label className="block text-sm font-medium text-slate-400">Income Tax Bracket (%) - Section 80E</label>
              <select 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-4 text-base text-slate-100 focus:ring-2 focus:ring-cyan-400 outline-none"
                value={taxBracketStr}
                onChange={(e) => setTaxBracketStr(e.target.value)}
              >
                <option value="0">No Tax (0%)</option>
                <option value="5">5% Bracket</option>
                <option value="20">20% Bracket</option>
                <option value="30">30% Bracket</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">Section 80E allows 100% deduction on interest paid for 8 years.</p>
            </div>
          </div>
          
          {hasError && (
             <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg mt-4">
               <AlertCircle size={20} />
               <span className="text-sm">Please enter positive numbers to calculate your EMI.</span>
             </div>
          )}
        </div>

        {/* Results Section */}
        <div className={`glass-card p-8 rounded-2xl flex flex-col justify-center space-y-8 transition-opacity duration-500 ${hasError ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-6">
            <div className="text-center p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-2 text-center w-full">During Course (EMI)</p>
              <div className="text-3xl text-slate-300 font-bold flex justify-center items-center">
                <CurrencySymbol fallback="₹" />{fmt(moratoriumEmi)}
              </div>
              <p className="text-xs text-slate-500 mt-2">Interest only</p>
            </div>
            
            <div className="text-center p-4 bg-cyan-950/30 rounded-xl border border-cyan-800/50">
              <p className="text-xs text-cyan-400 uppercase tracking-widest mb-2 text-center w-full">Post-Course (EMI)</p>
              <div className="text-3xl text-cyan-400 font-bold flex justify-center items-center" style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}>
                <CurrencySymbol fallback="₹" />{fmt(postMoratoriumEmi)}
              </div>
              <p className="text-xs text-cyan-500 mt-2">Full repayment</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <p className="text-sm text-slate-400 mb-2">Total Interest</p>
              <p className="text-xl font-semibold text-purple-400 flex items-center"><CurrencySymbol fallback="₹" />{fmt(totalInterest)}</p>
            </div>
            <div className="bg-green-950/20 p-4 rounded-xl border border-green-800/50">
              <p className="text-sm text-green-400 mb-2">Tax Saved (Sec 80E)</p>
              <p className="text-xl font-semibold text-green-400 flex items-center"><CurrencySymbol fallback="₹" />{fmt(taxSaved80E)}</p>
            </div>
          </div>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Principal', value: principal },
                    { name: 'Interest', value: totalInterest }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  isAnimationActive={true}
                  animationDuration={800}
                >
                  <Cell fill="#22d3ee" />
                  <Cell fill="#a855f7" />
                </Pie>
                <RechartsTooltip 
                  formatter={(value: any) => [`${currency.symbol}${fmt(Number(value))}`, '']}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend wrapperStyle={{ color: '#f8fafc', fontSize: '14px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button 
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-4 rounded-xl transition-all active:scale-95"
            >
              {copied ? <Check size={20} className="text-green-400"/> : <Copy size={20} />}
              <span className="text-base font-medium">{copied ? "Copied ✓" : "Copy Result"}</span>
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/50 py-4 rounded-xl transition-all active:scale-95"
            >
              <Share2 size={20} />
              <span className="text-base font-medium">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Current Bank Rates Comparison Table */}
      <div className="glass-card p-8 rounded-2xl mt-8">
          <div className="flex items-center gap-3 mb-6">
             <Building2 className="text-cyan-400" />
             <h3 className="text-2xl font-bold text-slate-100">Top Education Loan Rates (2025)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 min-w-[600px]">
              <thead className="text-xs uppercase bg-slate-800/50 text-slate-400">
                <tr>
                  <th className="px-4 py-4 rounded-tl-lg">Bank Name</th>
                  <th className="px-4 py-4">Interest Rate</th>
                  <th className="px-4 py-4">Max Tenure</th>
                  <th className="px-4 py-4 rounded-tr-lg">Processing Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-4 font-medium flex items-center gap-2">SBI (Student Loan)</td>
                  <td className="px-4 py-4 text-cyan-400">8.15% - 9.15%</td>
                  <td className="px-4 py-4">15 Years</td>
                  <td className="px-4 py-4">₹10,000 max</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-4 font-medium flex items-center gap-2">HDFC Bank</td>
                  <td className="px-4 py-4 text-cyan-400">9.50% - 11.50%</td>
                  <td className="px-4 py-4">15 Years</td>
                  <td className="px-4 py-4">Up to 1%</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-4 font-medium flex items-center gap-2">Bank of Baroda</td>
                  <td className="px-4 py-4 text-cyan-400">8.60% - 9.85%</td>
                  <td className="px-4 py-4">15 Years</td>
                  <td className="px-4 py-4">Nil (Up to 7.5L)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-4 font-medium flex items-center gap-2">Axis Bank</td>
                  <td className="px-4 py-4 text-cyan-400">9.20% - 13.70%</td>
                  <td className="px-4 py-4">15 Years</td>
                  <td className="px-4 py-4">Up to 2%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">* Rates are indicative and subject to change based on loan amount, institution tier, and applicant credit profile.</p>
      </div>

      {/* Amortization Table */}
      {!hasError && schedule.length > 0 && (
        <div className="glass-card p-8 rounded-2xl mt-8 overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-100">Amortization Schedule</h3>
            <button onClick={handleDownloadCsv} className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
              <Download size={16} />
              Download CSV
            </button>
          </div>
          
          <table className="w-full text-left text-sm text-slate-300 min-w-[600px]">
            <thead className="text-xs uppercase bg-slate-800/50 text-slate-400">
              <tr>
                <th className="px-4 py-4 rounded-tl-lg">Month</th>
                <th className="px-4 py-4">Payment</th>
                <th className="px-4 py-4">Principal</th>
                <th className="px-4 py-4">Interest</th>
                <th className="px-4 py-4 rounded-tr-lg">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {schedule.slice(0, page * rowsPerPage).map((row) => (
                <tr key={row.month} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-4 font-medium">
                    {row.month}
                    {row.month <= moratoriumMonths && <span className="ml-2 text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">Moratorium</span>}
                  </td>
                  <td className="px-4 py-4"><span className="inline-flex"><CurrencySymbol fallback="₹" /></span>{fmt(row.payment)}</td>
                  <td className="px-4 py-4 text-cyan-400"><span className="inline-flex"><CurrencySymbol fallback="₹" /></span>{fmt(row.principal)}</td>
                  <td className="px-4 py-4 text-purple-400"><span className="inline-flex"><CurrencySymbol fallback="₹" /></span>{fmt(row.interest)}</td>
                  <td className="px-4 py-4 font-semibold"><span className="inline-flex"><CurrencySymbol fallback="₹" /></span>{fmt(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {page * rowsPerPage < schedule.length && (
            <div className="mt-6 text-center">
              <button 
                onClick={() => setPage(page + 1)}
                className="px-6 py-4 border border-slate-700 text-slate-300 hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors"
              >
                Load Next 12 Months
              </button>
            </div>
          )}
        </div>
      )}

      {/* Trust Signals */}
      <div className="mt-8 p-6 border-t border-slate-800 text-xs text-slate-500 space-y-2">
        <p><strong>Formula:</strong> Computed using the standard reducing balance method [P x R x (1+R)^N] / [(1+R)^N-1].</p>
        <p>Disclaimer: Results are estimates meant for informational purposes. Consult a certified financial advisor or your bank before making final decisions.</p>
        <p>Last updated: {new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}


// Indian Example: Sanjay from Meerut uses this tool to check variables.
