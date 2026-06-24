'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { GraduationCap, Percent, Calendar, Save, Download, Table, PieChart as ChartIcon, FileText } from 'lucide-react';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

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

export default function StudentLoanCalculator() {
  const { currency } = useStore();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart');
  
  const [principalStr, setPrincipalStr] = useState<string>('500000');
  const [rateStr, setRateStr] = useState<string>('10.5');
  const [yearsStr, setYearsStr] = useState<string>('7');

  const principal = parseFloat(principalStr) || 0;
  const rate = parseFloat(rateStr) || 0;
  const years = parseFloat(yearsStr) || 0;

  const hasError = principal <= 0 || rate <= 0 || years <= 0;

  const { emi, totalInterest, totalPayment, schedule } = useMemo(() => {
    const P = principal;
    const R = rate / 12 / 100;
    const N = Math.round(years * 12);

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
  }, [principal, rate, years]);

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

  const handleSave = () => {
    setIsSaving(true);
    try {
      const existingHistory = JSON.parse(localStorage.getItem('toolpixa_history') || '[]');
      const newItem = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
        toolId: 'student-loan-calculator',
        inputData: { principal: principalStr, rate: rateStr, years: yearsStr },
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

  const handleDownloadCsv = () => {
    if (yearlySchedule.length === 0) return;
    let csv = 'Year,Annual Payment,Principal Repaid,Interest Paid,Remaining Balance\n';
    yearlySchedule.forEach(row => {
      csv += `${row.year},${row.payment},${row.principal},${row.interest},${row.balance}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_loan_schedule_${currency.code}.csv`;
    a.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[80vh] p-4 lg:p-8 rounded-[32px] bg-[#05050A]">
      {/* Input Section - Left Side */}
      <div className="lg:col-span-5 space-y-8 fade-in-up">
        <div className="flex justify-between items-start w-full">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <GraduationCap className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="font-headline-md font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 tracking-tight">
                Student EMI
              </h2>
              <p className="text-white/40 text-xs mt-0.5">Plan your academic repayment schedule.</p>
            </div>
          </div>
          <button 
            onClick={handleSave} 
            disabled={isSaving || hasError}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl text-xs font-bold transition-all disabled:opacity-50 mt-2"
          >
            <Save size={14} /> Save
          </button>
        </div>

        <div className="space-y-6">
          {/* Loan Amount */}
          <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <label className="block text-xs uppercase tracking-[0.2em] text-emerald-400 font-label-md mb-4 font-bold">Loan Amount</label>
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-3xl text-white/50 pb-1"><CurrencySymbol /></span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-5xl font-headline-md font-bold text-white w-full p-0 outline-none placeholder:text-white/20 transition-all focus:text-emerald-300" 
                type="number" 
                value={principalStr}
                onChange={(e) => setPrincipalStr(e.target.value)}
              />
            </div>
            <div className="mt-6 relative z-10">
              <input 
                type="range" 
                min="50000" 
                max="5000000" 
                step="50000" 
                value={principal} 
                onChange={(e) => setPrincipalStr(e.target.value)} 
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Interest Rate */}
            <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <label className="block text-xs uppercase tracking-[0.2em] text-emerald-400 font-label-md mb-4 font-bold">Rate (p.a.)</label>
              <div className="flex items-end gap-2 relative z-10">
                <input 
                  className="bg-transparent border-none focus:ring-0 text-4xl font-headline-md font-bold text-white w-full p-0 outline-none focus:text-emerald-300 text-left" 
                  type="number" 
                  step="0.1"
                  value={rateStr}
                  onChange={(e) => setRateStr(e.target.value)}
                />
                <span className="text-2xl text-emerald-400/50 pb-1">%</span>
              </div>
              <div className="mt-4 relative z-10">
                <input 
                  type="range" 
                  min="5" 
                  max="20" 
                  step="0.1" 
                  value={rate} 
                  onChange={(e) => setRateStr(e.target.value)} 
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-400" 
                />
              </div>
            </div>

            {/* Time Period */}
            <div className="group relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <label className="block text-xs uppercase tracking-[0.2em] text-emerald-400 font-label-md mb-4 font-bold">Duration</label>
              <div className="flex items-end gap-2 relative z-10">
                <input 
                  className="bg-transparent border-none focus:ring-0 text-4xl font-headline-md font-bold text-white w-full p-0 outline-none focus:text-emerald-300 text-left" 
                  type="number" 
                  value={yearsStr}
                  onChange={(e) => setYearsStr(e.target.value)}
                />
                <span className="text-xl text-emerald-400/50 pb-1 font-label-md">YRS</span>
              </div>
              <div className="mt-4 relative z-10">
                <input 
                  type="range" 
                  min="1" 
                  max="15" 
                  step="1" 
                  value={years} 
                  onChange={(e) => setYearsStr(e.target.value)} 
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-400" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Output Section - Right Side */}
      <div className="lg:col-span-7 h-full">
        <div className="relative bg-[#0A0A14]/80 backdrop-blur-3xl rounded-[40px] p-8 lg:p-12 border border-white/10 h-full overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,1)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* Primary Result */}
            <div className="text-center mb-12">
              <p className="text-sm font-label-md uppercase tracking-[0.3em] text-white/40 mb-6 font-bold">Monthly Payment (EMI)</p>
              <div className="font-headline-md text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-emerald-100 to-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.4)] tracking-tighter">
                <CurrencySymbol />{fmt(animatedEmi)}
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50 shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold mb-2">Total Interest</p>
                <p className="text-3xl font-headline-md font-bold text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]"><CurrencySymbol />{fmt(animatedInterest)}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-white/20" />
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold mb-2">Total Payment</p>
                <p className="text-3xl font-headline-md font-bold text-white"><CurrencySymbol />{fmt(totalPayment)}</p>
              </div>
            </div>

            {/* Tab Selection */}
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 my-md z-10 relative">
              <button
                onClick={() => setActiveTab('chart')}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'chart' ? 'bg-emerald-500 text-black' : 'text-white/60 hover:text-white'}`}
              >
                <ChartIcon size={14} /> Chart
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${activeTab === 'table' ? 'bg-emerald-500 text-black' : 'text-white/60 hover:text-white'}`}
              >
                <Table size={14} /> Schedule
              </button>
            </div>

            {activeTab === 'chart' ? (
              <div className="h-[250px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Principal Loan Amount', value: principal },
                        { name: 'Total Interest Payable', value: totalInterest }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={10}
                    >
                      <Cell fill="#064e3b" className="drop-shadow-[0_0_15px_rgba(4,120,87,0.4)]" />
                      <Cell fill="#10b981" className="drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value: any) => [`${currency.symbol}${Number(value).toLocaleString(currency.locale)}`, '']}
                      contentStyle={{ backgroundColor: 'rgba(5, 5, 10, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', color: '#fff', backdropFilter: 'blur(10px)' }}
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-white/40 text-xs uppercase tracking-[0.2em] font-bold">Interest</span>
                  <span className="text-2xl font-bold text-white">{(totalPayment > 0 ? (totalInterest/totalPayment)*100 : 0).toFixed(0)}%</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4 z-10 relative animate-fade-in-up">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/40">Yearly breakdown</span>
                  <button 
                    onClick={handleDownloadCsv}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold transition-all"
                  >
                    <Download size={12} /> Export CSV
                  </button>
                </div>
                <div className="max-h-[220px] overflow-y-auto border border-white/10 rounded-2xl custom-scrollbar bg-black/40">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-white">
                        <th className="py-2.5 px-3">Year</th>
                        <th className="py-2.5 px-3 text-right">Payment</th>
                        <th className="py-2.5 px-3 text-right">Principal</th>
                        <th className="py-2.5 px-3 text-right">Interest</th>
                        <th className="py-2.5 px-3 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlySchedule.map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5 text-white/60">
                          <td className="py-2 px-3 font-medium text-white">{row.year}</td>
                          <td className="py-2 px-3 text-right"><CurrencySymbol />{fmt(row.payment)}</td>
                          <td className="py-2 px-3 text-right"><CurrencySymbol />{fmt(row.principal)}</td>
                          <td className="py-2 px-3 text-right text-emerald-400"><CurrencySymbol />{fmt(row.interest)}</td>
                          <td className="py-2 px-3 text-right text-white font-medium"><CurrencySymbol />{fmt(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
