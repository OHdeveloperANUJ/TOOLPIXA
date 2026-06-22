'use client';

import React, { useState, useEffect, useMemo } from 'react';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Share2, Copy, Check, Download, AlertCircle, Save, Flame } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

function useAnimatedNumber(value: number, duration: number = 800) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = currentValue;
    const endValue = value;
    if (startValue === endValue) {
      setCurrentValue(endValue);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const ease = 1 - Math.pow(1 - percentage, 4);
      
      setCurrentValue(startValue + (endValue - startValue) * ease);
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(endValue);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);

  return currentValue;
}

export default function BikeLoanEmi() {
  const { currency } = useStore();
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [usageCount, setUsageCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/stats?toolId=' + 'bike-loan-emi')
      .then(r => r.json())
      .then(d => { if (d.success) setUsageCount(d.count); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    if (!session) {
      signIn();
      return;
    }
    setIsSaving(true);
    try {
      await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: 'bike-loan-emi',
          inputData: { principal: principalStr, rate: rateStr, tenureYears: tenureYearsStr }
        })
      });
      alert('Calculation saved to your profile!');
    } catch (e) {
      alert('Failed to save.');
    }
    setIsSaving(false);
  };

  const [principalStr, setPrincipalStr] = useState<string>('5000000');
  const [rateStr, setRateStr] = useState<string>('8.5');
  const [tenureYearsStr, setTenureYearsStr] = useState<string>('20');
  const [copied, setCopied] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  
  const [page, setPage] = useState(1);
  const rowsPerPage = 12;

  const principal = parseFloat(principalStr) || 0;
  const rate = parseFloat(rateStr) || 0;
  const tenureYears = parseFloat(tenureYearsStr) || 0;

  const hasError = principal <= 0 || rate <= 0 || tenureYears <= 0;

  const { emi, totalInterest, totalPayment, schedule } = useMemo(() => {
    const P = principal;
    const R = rate / 12 / 100;
    const N = tenureYears * 12;

    if (P <= 0 || R <= 0 || N <= 0) return { emi: 0, totalInterest: 0, totalPayment: P, schedule: [] };

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPay = emiValue * N;
    const totalInt = totalPay - P;

    const sched = [];
    let balance = P;
    for (let i = 1; i <= N; i++) {
      const interestForMonth = balance * R;
      const principalForMonth = emiValue - interestForMonth;
      balance -= principalForMonth;
      if (balance < 0) balance = 0;
      
      sched.push({
        month: i,
        payment: emiValue,
        principal: principalForMonth,
        interest: interestForMonth,
        balance: balance
      });
    }

    return {
      emi: emiValue,
      totalInterest: totalInt,
      totalPayment: totalPay,
      schedule: sched
    };
  }, [principal, rate, tenureYears]);

  const animatedEmi = useAnimatedNumber(emi);
  const animatedInterest = useAnimatedNumber(totalInterest);

  const fmt = (val: number) => Math.round(val).toLocaleString(currency.locale);

  const handleCopy = () => {
    const text = `📊 Bike Loan EMI Result\nEMI: ${currency.symbol}${fmt(emi)}\nTotal Interest: ${currency.symbol}${fmt(totalInterest)}\nTotal Payment: ${currency.symbol}${fmt(totalPayment)}\n─────────────────\nTry free: toolpixa.space/tools/home-loan-emi`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `📊 Bike Loan EMI Result — ToolPixa\nEMI: ${currency.symbol}${fmt(emi)}\nPrincipal: ${currency.symbol}${fmt(principal)}\nTotal Interest: ${currency.symbol}${fmt(totalInterest)}\n─────────────────\nTry free: https://toolpixa.space/tools/home-loan-emi`;
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
    a.download = 'amortization_schedule.csv';
    a.click();
  };

  const triggerShake = () => {
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 500);
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
              <input type="range" min="1" max="20" step="0.1" value={rate} onChange={(e) => setRateStr(e.target.value)} className="w-full accent-cyan-400 h-2" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">Tenure (Years)</label>
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
              <input type="range" min="1" max="30" step="1" value={tenureYears} onChange={(e) => setTenureYearsStr(e.target.value)} className="w-full accent-cyan-400 h-2" />
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
          <div className="text-center">
            <p className="text-sm text-slate-400 uppercase tracking-widest mb-2">Monthly EMI</p>
            <div className="text-5xl md:text-6xl text-cyan-400 font-bold" style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}>
              <CurrencySymbol fallback="₹" />{fmt(animatedEmi)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <p className="text-sm text-slate-400 mb-2">Principal</p>
              <p className="text-2xl font-semibold text-slate-200"><CurrencySymbol fallback="₹" />{fmt(principal)}</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <p className="text-sm text-slate-400 mb-2">Total Interest</p>
              <p className="text-2xl font-semibold text-purple-400"><CurrencySymbol fallback="₹" />{fmt(animatedInterest)}</p>
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

      {/* Affiliate Placement */}
      <div className="affiliate-cta-box" style={{ marginTop: '24px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <h4 className="text-base font-semibold text-slate-200 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          Sponsored Recommendation
        </h4>
        <p className="text-sm text-slate-400 mb-4">Looking for the lowest home loan interest rates in India? Compare offers from 30+ top banks instantly and apply completely online.</p>
        <a href="https://www.bankbazaar.com/home-loan.html" rel="sponsored noopener noreferrer" target="_blank" className="inline-block px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          Compare Rates on BankBazaar
        </a>
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
                  <td className="px-4 py-4 font-medium">{row.month}</td>
                  <td className="px-4 py-4">{currency.symbol}{fmt(row.payment)}</td>
                  <td className="px-4 py-4 text-cyan-400">{currency.symbol}{fmt(row.principal)}</td>
                  <td className="px-4 py-4 text-purple-400">{currency.symbol}{fmt(row.interest)}</td>
                  <td className="px-4 py-4 font-semibold">{currency.symbol}{fmt(row.balance)}</td>
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
        <p><strong>Disclaimer:</strong> Results are estimates meant for informational purposes. Consult a certified financial advisor or your bank before making final decisions.</p>
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
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
