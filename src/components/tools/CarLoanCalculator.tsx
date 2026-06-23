'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import CurrencySymbol from '@/components/CurrencySymbol';
import { useStore } from '@/store/useStore';
import { Car, Info, PieChart as PieChartIcon, Table, Download, Plus, AlertCircle } from 'lucide-react';

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

export default function CarLoanCalculator() {
  const { currency } = useStore();
  const [priceStr, setPriceStr] = useState<string>('800000');
  const [downPaymentStr, setDownPaymentStr] = useState<string>('150000');
  const [termMonthsStr, setTermMonthsStr] = useState<string>('60');
  const [interestRateStr, setInterestRateStr] = useState<string>('9.5');
  const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart');
  const [scheduleView, setScheduleView] = useState<'yearly' | 'monthly'>('yearly');
  const [monthlyPage, setMonthlyPage] = useState(1);
  const rowsPerPage = 12;

  const price = parseFloat(priceStr) || 0;
  const downPayment = parseFloat(downPaymentStr) || 0;
  const termMonths = parseFloat(termMonthsStr) || 0;
  const interestRate = parseFloat(interestRateStr) || 0;

  const hasError = price <= 0 || interestRate <= 0 || termMonths <= 0 || price < downPayment;

  const { monthlyPayment, totalInterest, totalCost, principal, schedule } = useMemo(() => {
    const p = Math.max(0, price - downPayment);
    if (p <= 0 || termMonths <= 0 || interestRate < 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalCost: price, principal: 0, schedule: [] };
    }

    const r = interestRate / 100 / 12;
    const n = Math.round(termMonths);
    
    let m = 0;
    if (r === 0) {
      m = p / n;
    } else {
      m = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalInt = Math.max(0, (m * n) - p);
    const totalCst = price + totalInt;

    const sched = [];
    let balance = p;
    for (let i = 1; i <= n; i++) {
      const interestForMonth = balance * r;
      const principalForMonth = m - interestForMonth;
      balance -= principalForMonth;
      if (balance < 0) balance = 0;

      sched.push({
        month: i,
        payment: m,
        principal: principalForMonth,
        interest: interestForMonth,
        balance: balance
      });
    }

    return {
      monthlyPayment: m,
      totalInterest: totalInt,
      totalCost: totalCst,
      principal: p,
      schedule: sched
    };
  }, [price, downPayment, termMonths, interestRate]);

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

  const animatedMonthly = useAnimatedNumber(monthlyPayment);
  const animatedInterest = useAnimatedNumber(totalInterest);
  const animatedCost = useAnimatedNumber(totalCost);

  const fmt = (val: number) => Math.round(val).toLocaleString(currency.locale);

  const handleQuickFillPrice = (amountToAdd: number) => {
    const current = parseFloat(priceStr) || 0;
    setPriceStr(String(current + amountToAdd));
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
    a.download = `car_loan_${scheduleView}_schedule_${currency.code}.csv`;
    a.click();
  };

  return (
    <section className="space-y-8 animate-fade-in-up font-inter max-w-6xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Input Section */}
        <div className="xl:col-span-5 space-y-6">
          <div className="glass-card p-6 lg:p-8 rounded-[32px] border border-white/10 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 mb-2">
                <Car className="text-indigo-500" /> Car Loan Details
              </h2>
              <p className="text-sm text-slate-400">Configure your car loan values below.</p>
            </div>

            <div className="space-y-5">
              {/* Vehicle Price */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.2em] text-cyan-400 font-bold">Vehicle Price</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-bold"><CurrencySymbol fallback="₹" /></span>
                  <input 
                    type="text" 
                    inputMode="decimal"
                    value={priceStr}
                    onChange={(e) => setPriceStr(e.target.value)}
                    className={`w-full bg-slate-900/50 border ${hasError && price <= 0 ? 'border-red-500' : 'border-slate-700'} rounded-2xl pl-10 pr-4 py-4 text-xl text-slate-100 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:ring-offset-0 outline-none transition-all`}
                  />
                </div>
                <input 
                  type="range" min="100000" max="10000000" step="50000" 
                  value={price} 
                  onChange={(e) => setPriceStr(e.target.value)} 
                  className="w-full accent-indigo-500 h-1 cursor-pointer bg-white/10 rounded-full appearance-none" 
                />

                {/* Quick Fills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <button 
                    onClick={() => handleQuickFillPrice(100000)}
                    className="px-3 py-1 bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/30 rounded-full text-xs text-indigo-300 font-bold transition-all flex items-center gap-0.5"
                  >
                    <Plus size={10} /> 1 Lakh
                  </button>
                  <button 
                    onClick={() => handleQuickFillPrice(500000)}
                    className="px-3 py-1 bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/30 rounded-full text-xs text-indigo-300 font-bold transition-all flex items-center gap-0.5"
                  >
                    <Plus size={10} /> 5 Lakhs
                  </button>
                  <button 
                    onClick={() => handleQuickFillPrice(1000000)}
                    className="px-3 py-1 bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/30 rounded-full text-xs text-indigo-300 font-bold transition-all flex items-center gap-0.5"
                  >
                    <Plus size={10} /> 10 Lakhs
                  </button>
                </div>
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.2em] text-emerald-400 font-bold">Down Payment</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 font-bold"><CurrencySymbol fallback="₹" /></span>
                  <input 
                    type="text" 
                    inputMode="decimal"
                    value={downPaymentStr}
                    onChange={(e) => setDownPaymentStr(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl pl-10 pr-4 py-4 text-xl text-slate-100 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:ring-offset-0 outline-none transition-all"
                  />
                </div>
                <input 
                  type="range" min="0" max={price} step="10000" 
                  value={downPayment} 
                  onChange={(e) => setDownPaymentStr(e.target.value)} 
                  className="w-full accent-emerald-500 h-1 cursor-pointer bg-white/10 rounded-full appearance-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Loan Term */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.2em] text-amber-400 font-bold">Term (Months)</label>
                  <input 
                    type="text" 
                    inputMode="decimal"
                    value={termMonthsStr}
                    onChange={(e) => setTermMonthsStr(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-4 py-4 text-lg text-slate-100 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:ring-offset-0 outline-none transition-all"
                  />
                  <input 
                    type="range" min="12" max="120" step="12" 
                    value={termMonths} 
                    onChange={(e) => setTermMonthsStr(e.target.value)} 
                    className="w-full accent-amber-500 h-1 cursor-pointer bg-white/10 rounded-full appearance-none" 
                  />
                </div>

                {/* Interest Rate */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.2em] text-rose-400 font-bold">Rate (%)</label>
                  <input 
                    type="text" 
                    inputMode="decimal"
                    value={interestRateStr}
                    onChange={(e) => setInterestRateStr(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-4 py-4 text-lg text-slate-100 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 focus:ring-offset-0 outline-none transition-all"
                  />
                  <input 
                    type="range" min="1" max="25" step="0.25" 
                    value={interestRate} 
                    onChange={(e) => setInterestRateStr(e.target.value)} 
                    className="w-full accent-rose-500 h-1 cursor-pointer bg-white/10 rounded-full appearance-none" 
                  />
                </div>
              </div>

              {hasError && (
                 <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg mt-4">
                   <AlertCircle size={20} />
                   <span className="text-sm">Please check inputs. Down payment cannot exceed vehicle price.</span>
                 </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className={`xl:col-span-7 bg-[#0A0A14]/80 backdrop-blur-3xl rounded-[40px] p-6 lg:p-8 border border-white/10 relative overflow-hidden transition-opacity duration-500 ${hasError ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* Toggle Tab Headers */}
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('chart')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'chart' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-white/40 hover:text-white/80'}`}
                >
                  <PieChartIcon size={16} /> Cost Analysis
                </button>
                <button 
                  onClick={() => setActiveTab('table')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'table' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-white/40 hover:text-white/80'}`}
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
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Estimated Monthly Payment</p>
                  <div className="text-5xl md:text-6xl text-indigo-400 font-bold drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                    <CurrencySymbol fallback="₹" />{fmt(animatedMonthly)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-1">Total Interest</p>
                    <p className="text-xl font-semibold text-rose-400"><CurrencySymbol fallback="₹" />{fmt(animatedInterest)}</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
                    <p className="text-xs text-slate-400 mb-1">Total Cost (Car + Interest)</p>
                    <p className="text-xl font-semibold text-indigo-300"><CurrencySymbol fallback="₹" />{fmt(animatedCost)}</p>
                  </div>
                </div>

                {principal > 0 && (
                  <div className="h-52 mt-4 relative flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl p-2">
                    <div className="w-1/2 h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Principal Loan', value: principal },
                              { name: 'Total Interest', value: totalInterest }
                            ].filter(d => d.value > 0)}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={68}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            <Cell fill="#6366f1" className="drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                            <Cell fill="#f43f5e" className="drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                          </Pie>
                          <RechartsTooltip 
                            formatter={(value: any) => [`${currency.symbol}${fmt(Number(value))}`, '']}
                            contentStyle={{ backgroundColor: 'rgba(5, 5, 10, 0.95)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#fff' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-1/2 flex flex-col justify-center space-y-3 px-4">
                       <div>
                         <div className="flex items-center gap-2 mb-0.5">
                           <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Principal</span>
                         </div>
                         <p className="text-base font-bold text-indigo-300">
                           {(((principal) / (principal + totalInterest)) * 100).toFixed(0)}%
                         </p>
                       </div>
                       <div>
                         <div className="flex items-center gap-2 mb-0.5">
                           <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interest</span>
                         </div>
                         <p className="text-base font-bold text-rose-400">
                           {((totalInterest / (principal + totalInterest)) * 100).toFixed(0)}%
                         </p>
                       </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Table Schedule View */
              <div className="flex-grow flex flex-col h-full min-h-[380px]">
                <div className="flex justify-between items-center mb-4 bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-xs uppercase tracking-wider text-white/40 pl-2 font-bold">Breakdown view</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setScheduleView('yearly')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${scheduleView === 'yearly' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-white/40'}`}
                    >
                      Yearly
                    </button>
                    <button 
                      onClick={() => setScheduleView('monthly')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${scheduleView === 'monthly' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-white/40'}`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                <div className="overflow-y-auto max-h-[290px] custom-scrollbar border border-white/10 rounded-2xl bg-white/[0.01]">
                  {scheduleView === 'yearly' ? (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5 font-label-md text-[11px] uppercase tracking-wider text-indigo-400">
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
                            <td className="py-2 px-4 text-rose-300"><CurrencySymbol fallback="₹" />{fmt(row.interest)}</td>
                            <td className="py-2 px-4"><CurrencySymbol fallback="₹" />{fmt(row.payment)}</td>
                            <td className="py-2 px-4 text-indigo-300 font-bold"><CurrencySymbol fallback="₹" />{fmt(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5 font-label-md text-[11px] uppercase tracking-wider text-indigo-400">
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
                            <td className="py-2 px-4 text-rose-300"><CurrencySymbol fallback="₹" />{fmt(row.interest)}</td>
                            <td className="py-2 px-4"><CurrencySymbol fallback="₹" />{fmt(row.payment)}</td>
                            <td className="py-2 px-4 text-indigo-300 font-bold"><CurrencySymbol fallback="₹" />{fmt(row.balance)}</td>
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
    
      {/* Explanation Box */}
      <div className="glass-card bg-white/[0.01] p-6 rounded-2xl border border-white/10 mt-4 w-full">
        <h4 className="text-base font-semibold text-slate-200 mb-2 flex items-center gap-2">
          <Info size={18} className="text-blue-500" />
          How does the Car Loan Calculator work?
        </h4>
        <p className="text-sm text-slate-400 mb-4 leading-relaxed">
          The monthly payment is calculated using the standard amortized loan formula. This ensures that the loan is paid off in full by the end of the term, with a portion of each payment going towards the principal and the rest covering interest.
        </p>
        <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 mb-4 font-mono text-sm overflow-x-auto text-slate-300">
          <p className="mb-2"><span className="text-indigo-400 font-bold">M</span> = P × [r(1 + r)^n] / [(1 + r)^n - 1]</p>
        </div>
        <p className="text-sm text-slate-400">
          Where <strong>M</strong> is the monthly payment, <strong>P</strong> is the principal loan amount (price minus down payment), <strong>r</strong> is the monthly interest rate (annual rate / 12), and <strong>n</strong> is the number of months. 
        </p>
      </div>
    </section>
  );
}

// Indian Example: Karan from Nagpur uses this tool to check variables.
