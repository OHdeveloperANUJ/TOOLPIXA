'use client';

import React, { useState, useEffect, useMemo } from 'react';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Share2, Copy, Check, Download, AlertCircle, Save, Table, PieChart as ChartIcon, Plus, Info } from 'lucide-react';

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

export default function HomeLoanEmi() {
  const { currency } = useStore();
  const [isSaving, setIsSaving] = useState(false);
  const [usageCount, setUsageCount] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart');
  const [scheduleView, setScheduleView] = useState<'yearly' | 'monthly'>('yearly');
  
  const [principalStr, setPrincipalStr] = useState<string>('4000000');
  const [rateStr, setRateStr] = useState<string>('8.5');
  const [tenureYearsStr, setTenureYearsStr] = useState<string>('20');
  
  const [monthlyPage, setMonthlyPage] = useState(1);
  const rowsPerPage = 12;

  useEffect(() => {
    fetch('/api/stats?toolId=' + 'home-loan-emi')
      .then(r => r.json())
      .then(d => { if (d.success) setUsageCount(d.count); })
      .catch(() => {});
  }, []);

  const principal = parseFloat(principalStr) || 0;
  const rate = parseFloat(rateStr) || 0;
  const tenureYears = parseFloat(tenureYearsStr) || 0;

  const hasError = principal <= 0 || rate <= 0 || tenureYears <= 0;

  const { emi, totalInterest, totalPayment, schedule } = useMemo(() => {
    const P = principal;
    const R = rate / 12 / 100;
    const N = Math.round(tenureYears * 12);

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

  const yearlySchedule = useMemo(() => {
    if (schedule.length === 0) return [];
    const yearly = [];
    let yearNum = 1;
    let yearPrincipal = 0;
    let yearInterest = 0;
    let yearPayment = 0;
    
    for (let i = 0; i < schedule.length; i++) {
      const monthRow = schedule[i];
      yearPrincipal += monthRow.principal;
      yearInterest += monthRow.interest;
      yearPayment += monthRow.payment;
      
      if ((i + 1) % 12 === 0 || i === schedule.length - 1) {
        yearly.push({
          year: `Year ${yearNum}`,
          payment: yearPayment,
          principal: yearPrincipal,
          interest: yearInterest,
          balance: monthRow.balance
        });
        yearNum++;
        yearPrincipal = 0;
        yearInterest = 0;
        yearPayment = 0;
      }
    }
    return yearly;
  }, [schedule]);

  const animatedEmi = useAnimatedNumber(emi);
  const animatedInterest = useAnimatedNumber(totalInterest);

  const fmt = (val: number) => Math.round(val).toLocaleString(currency.locale);

  const handleQuickFill = (amountToAdd: number) => {
    const current = parseFloat(principalStr) || 0;
    setPrincipalStr(String(current + amountToAdd));
  };

  const handleSave = () => {
    setIsSaving(true);
    try {
      const existingHistory = JSON.parse(localStorage.getItem('toolpixa_history') || '[]');
      const newItem = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
        toolId: 'home-loan-emi-calculator',
        inputData: { principal: principalStr, rate: rateStr, tenureYears: tenureYearsStr },
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

  const handleCopy = () => {
    const text = `📊 Home Loan EMI Result — ToolPixa\nEMI: ${currency.symbol}${fmt(emi)}\nPrincipal: ${currency.symbol}${fmt(principal)}\nTotal Interest: ${currency.symbol}${fmt(totalInterest)}\nTotal Repayment: ${currency.symbol}${fmt(totalPayment)}\n─────────────────\nTry free: https://toolpixa.space/tools/home-loan-emi-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `📊 Home Loan EMI Result — ToolPixa\nEMI: ${currency.symbol}${fmt(emi)}\nPrincipal: ${currency.symbol}${fmt(principal)}\nTotal Interest: ${currency.symbol}${fmt(totalInterest)}\n─────────────────\nTry free: https://toolpixa.space/tools/home-loan-emi-calculator`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownloadCsv = () => {
    let csv = '';
    if (scheduleView === 'yearly') {
      csv = 'Year,Payment,Principal Paid,Interest Paid,Balance\n';
      yearlySchedule.forEach(row => {
        csv += `${row.year},${row.payment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;
      });
    } else {
      csv = 'Month,Payment,Principal Paid,Interest Paid,Balance\n';
      schedule.forEach(row => {
        csv += `${row.month},${row.payment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;
      });
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `home_loan_${scheduleView}_schedule_${currency.code}.csv`;
    a.click();
  };

  const triggerShake = () => {
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 500);
  };

  return (
    <div className="space-y-8">
      {usageCount !== null && (
        <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          Calculated {usageCount.toLocaleString()} times today
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Inputs Section */}
        <div className="lg:col-span-5 bg-white/5 backdrop-blur-2xl p-6 lg:p-8 rounded-[32px] border border-white/10 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              Loan Configuration
            </h3>
            <button 
              onClick={handleSave} 
              disabled={isSaving || hasError}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
            >
              <Save size={14} /> Save
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-[0.2em] text-cyan-400 font-bold">Loan Amount (Principal)</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-bold"><CurrencySymbol fallback="₹" /></span>
              <input 
                className={`w-full bg-slate-900/50 border ${hasError && principal <= 0 ? 'border-red-500' : 'border-slate-700'} rounded-2xl pl-10 pr-4 py-4 text-xl text-slate-100 focus:ring-2 focus:ring-cyan-400 outline-none transition-all ${errorShake && principal <= 0 ? 'animate-shake' : ''}`}
                type="text"
                inputMode="decimal"
                value={principalStr}
                onChange={(e) => {
                   setPrincipalStr(e.target.value);
                   if (parseFloat(e.target.value) <= 0) triggerShake();
                }}
              />
            </div>
            <input type="range" min="100000" max="50000000" step="100000" value={principal} onChange={(e) => setPrincipalStr(e.target.value)} className="w-full accent-cyan-400 h-1 cursor-pointer bg-white/10 rounded-full appearance-none" />
            
            {/* Quick Fill Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button 
                onClick={() => handleQuickFill(500000)}
                className="px-3 py-1 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 rounded-full text-xs text-cyan-300 font-bold transition-all flex items-center gap-0.5"
              >
                <Plus size={10} /> 5 Lakhs
              </button>
              <button 
                onClick={() => handleQuickFill(1000000)}
                className="px-3 py-1 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 rounded-full text-xs text-cyan-300 font-bold transition-all flex items-center gap-0.5"
              >
                <Plus size={10} /> 10 Lakhs
              </button>
              <button 
                onClick={() => handleQuickFill(2000000)}
                className="px-3 py-1 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 rounded-full text-xs text-cyan-300 font-bold transition-all flex items-center gap-0.5"
              >
                <Plus size={10} /> 20 Lakhs
              </button>
              <button 
                onClick={() => handleQuickFill(5000000)}
                className="px-3 py-1 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 rounded-full text-xs text-cyan-300 font-bold transition-all flex items-center gap-0.5"
              >
                <Plus size={10} /> 50 Lakhs
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-[0.2em] text-purple-400 font-bold">Interest Rate (%)</label>
              <input 
                className={`w-full bg-slate-900/50 border ${hasError && rate <= 0 ? 'border-red-500' : 'border-slate-700'} rounded-2xl px-4 py-4 text-lg text-slate-100 focus:ring-2 focus:ring-cyan-400 outline-none transition-all ${errorShake && rate <= 0 ? 'animate-shake' : ''}`}
                step="0.1" 
                type="text"
                inputMode="decimal"
                value={rateStr}
                onChange={(e) => {
                  setRateStr(e.target.value);
                  if (parseFloat(e.target.value) <= 0) triggerShake();
                }}
              />
              <input type="range" min="1" max="25" step="0.1" value={rate} onChange={(e) => setRateStr(e.target.value)} className="w-full accent-cyan-400 h-1 cursor-pointer bg-white/10 rounded-full appearance-none" />
            </div>

            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-[0.2em] text-blue-400 font-bold">Tenure (Years)</label>
              <input 
                className={`w-full bg-slate-900/50 border ${hasError && tenureYears <= 0 ? 'border-red-500' : 'border-slate-700'} rounded-2xl px-4 py-4 text-lg text-slate-100 focus:ring-2 focus:ring-cyan-400 outline-none transition-all ${errorShake && tenureYears <= 0 ? 'animate-shake' : ''}`}
                type="text"
                inputMode="decimal"
                value={tenureYearsStr}
                onChange={(e) => {
                  setTenureYearsStr(e.target.value);
                  if (parseFloat(e.target.value) <= 0) triggerShake();
                }}
              />
              <input type="range" min="1" max="35" step="1" value={tenureYears} onChange={(e) => setTenureYearsStr(e.target.value)} className="w-full accent-cyan-400 h-1 cursor-pointer bg-white/10 rounded-full appearance-none" />
            </div>
          </div>
          
          {hasError && (
             <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg mt-4">
               <AlertCircle size={20} />
               <span className="text-sm">Please enter positive numbers to calculate your EMI.</span>
             </div>
          )}
        </div>

        {/* Results Section - Right Side */}
        <div className={`lg:col-span-7 bg-[#0A0A14]/80 backdrop-blur-3xl rounded-[40px] p-6 lg:p-8 border border-white/10 relative overflow-hidden transition-opacity duration-500 ${hasError ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          {/* Glowing ambient background effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* Toggle Tab Headers */}
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('chart')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'chart' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-white/40 hover:text-white/80'}`}
                >
                  <ChartIcon size={16} /> Chart View
                </button>
                <button 
                  onClick={() => setActiveTab('table')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'table' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-white/40 hover:text-white/80'}`}
                >
                  <Table size={16} /> Amortization Schedule
                </button>
              </div>

              {activeTab === 'table' && schedule.length > 0 && (
                <button 
                  onClick={handleDownloadCsv}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg text-xs font-bold text-white transition-all"
                  title="Download Schedule as CSV"
                >
                  <Download size={14} /> Export CSV
                </button>
              )}
            </div>

            {activeTab === 'chart' ? (
              <>
                <div className="text-center mb-8">
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Monthly EMI</p>
                  <div className="text-5xl md:text-6xl text-cyan-400 font-bold drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                    <CurrencySymbol fallback="₹" />{fmt(animatedEmi)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-1">Principal</p>
                    <p className="text-xl font-semibold text-slate-200"><CurrencySymbol fallback="₹" />{fmt(principal)}</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-1">Total Interest</p>
                    <p className="text-xl font-semibold text-purple-400"><CurrencySymbol fallback="₹" />{fmt(animatedInterest)}</p>
                  </div>
                </div>

                <div className="h-56 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Principal Amount', value: principal },
                          { name: 'Interest Amount', value: totalInterest }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={8}
                      >
                        <Cell fill="#06b6d4" className="drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                        <Cell fill="#a855f7" className="drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                      </Pie>
                      <RechartsTooltip 
                        formatter={(value: any) => [`${currency.symbol}${fmt(Number(value))}`, '']}
                        contentStyle={{ backgroundColor: 'rgba(5, 5, 10, 0.95)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button 
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-xl transition-all active:scale-95 text-sm font-semibold"
                  >
                    {copied ? <Check size={16} className="text-green-400"/> : <Copy size={16} />}
                    <span>{copied ? "Copied ✓" : "Copy Result"}</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 bg-green-600/10 hover:bg-green-600/20 text-green-400 border border-green-600/30 py-3 rounded-xl transition-all active:scale-95 text-sm font-semibold"
                  >
                    <Share2 size={16} />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </>
            ) : (
              /* Schedule View */
              <div className="flex-grow flex flex-col h-full min-h-[380px]">
                <div className="flex justify-between items-center mb-4 bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-xs uppercase tracking-wider text-white/40 pl-2 font-bold">Breakdown view</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setScheduleView('yearly')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${scheduleView === 'yearly' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-white/40'}`}
                    >
                      Yearly
                    </button>
                    <button 
                      onClick={() => setScheduleView('monthly')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${scheduleView === 'monthly' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-white/40'}`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                <div className="overflow-y-auto max-h-[290px] custom-scrollbar border border-white/10 rounded-2xl bg-white/[0.01]">
                  {scheduleView === 'yearly' ? (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5 font-label-md text-[11px] uppercase tracking-wider text-cyan-400">
                          <th className="py-2.5 px-4">Timeline</th>
                          <th className="py-2.5 px-4">Principal Paid</th>
                          <th className="py-2.5 px-4">Interest Paid</th>
                          <th className="py-2.5 px-4">Total Paid</th>
                          <th className="py-2.5 px-4">Outstanding</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono text-xs text-white/80">
                        {yearlySchedule.map((row, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-2 px-4 font-semibold text-white">{row.year}</td>
                            <td className="py-2 px-4"><CurrencySymbol fallback="₹" />{fmt(row.principal)}</td>
                            <td className="py-2 px-4 text-purple-300"><CurrencySymbol fallback="₹" />{fmt(row.interest)}</td>
                            <td className="py-2 px-4"><CurrencySymbol fallback="₹" />{fmt(row.payment)}</td>
                            <td className="py-2 px-4 text-cyan-300 font-bold"><CurrencySymbol fallback="₹" />{fmt(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5 font-label-md text-[11px] uppercase tracking-wider text-cyan-400">
                          <th className="py-2.5 px-4">Month</th>
                          <th className="py-2.5 px-4">Principal</th>
                          <th className="py-2.5 px-4">Interest</th>
                          <th className="py-2.5 px-4">Total Paid</th>
                          <th className="py-2.5 px-4">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono text-xs text-white/80">
                        {schedule.slice(0, monthlyPage * rowsPerPage).map((row) => (
                          <tr key={row.month} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-2 px-4 font-semibold text-white">M {row.month}</td>
                            <td className="py-2 px-4"><CurrencySymbol fallback="₹" />{fmt(row.principal)}</td>
                            <td className="py-2 px-4 text-purple-300"><CurrencySymbol fallback="₹" />{fmt(row.interest)}</td>
                            <td className="py-2 px-4"><CurrencySymbol fallback="₹" />{fmt(row.payment)}</td>
                            <td className="py-2 px-4 text-cyan-300 font-bold"><CurrencySymbol fallback="₹" />{fmt(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {scheduleView === 'monthly' && monthlyPage * rowsPerPage < schedule.length && (
                  <div className="mt-3 text-center">
                    <button 
                      onClick={() => setMonthlyPage(monthlyPage + 1)}
                      className="px-3 py-1.5 border border-white/10 text-white/60 hover:text-white hover:bg-white/5 rounded-lg text-xs font-semibold transition-all"
                    >
                      Load Next 12 Months
                    </button>
                  </div>
                )}
                <div className="mt-3 flex items-center gap-1.5 text-white/30 text-[10px] px-2">
                  <Info size={10} />
                  <span>Reducing balance amortization applies: [P x R x (1+R)^N] / [(1+R)^N-1].</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Affiliate Placement */}
      <div className="mt-6 p-6 border border-white/10 rounded-2xl bg-white/[0.01] hover:border-primary/20 transition-all">
        <h4 className="text-base font-semibold text-slate-200 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          Compare Best Bank Rates
        </h4>
        <p className="text-sm text-slate-400 mb-4">Looking for the lowest home loan interest rates in India? Compare offers from 30+ top banks instantly and apply completely online.</p>
        <a href="https://www.bankbazaar.com/home-loan.html" rel="sponsored noopener noreferrer" target="_blank" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md">
          Compare Rates on BankBazaar
        </a>
      </div>

      {/* Trust Signals */}
      <div className="mt-8 p-6 border-t border-slate-800 text-xs text-slate-500 space-y-2">
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

// Indian Example: Rajesh from Allahabad uses this tool to check variables.
