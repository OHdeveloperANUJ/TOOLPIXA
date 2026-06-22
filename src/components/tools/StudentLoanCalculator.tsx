'use client';

import React, { useState } from 'react';
import { GraduationCap, Percent, Calendar, IndianRupee, PieChart } from 'lucide-react';

const StudentLoanCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number | ''>(500000);
  const [rate, setRate] = useState<number | ''>(10.5);
  const [years, setYears] = useState<number | ''>(5);

  const calculateEMI = () => {
    if (principal === '' || rate === '' || years === '') return null;
    if (principal <= 0 || rate <= 0 || years <= 0) return null;

    const r = rate / 12 / 100;
    const n = years * 12;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    const totalAmount = emi * n;
    const totalInterest = totalAmount - principal;

    return {
      emi: emi.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
      totalAmount: totalAmount.toFixed(0)
    };
  };

  const result = calculateEMI();

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-IN').format(Number(amount));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 -ml-8 -mt-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 -mr-8 -mb-8 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-500/20 rounded-xl">
            <GraduationCap className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Student Loan EMI</h2>
        </div>

        <div className="space-y-6 relative z-10">
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-300 mb-2">
              <span className="flex items-center gap-2"><IndianRupee className="w-4 h-4" /> Loan Amount</span>
              {principal && <span className="text-emerald-400 font-semibold">₹{formatCurrency(principal.toString())}</span>}
            </label>
            <input
              type="range"
              min="100000"
              max="5000000"
              step="50000"
              value={principal || 0}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1L</span>
              <span>50L</span>
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-300 mb-2">
              <span className="flex items-center gap-2"><Percent className="w-4 h-4" /> Interest Rate (p.a)</span>
              {rate && <span className="text-emerald-400 font-semibold">{rate}%</span>}
            </label>
            <input
              type="range"
              min="5"
              max="20"
              step="0.1"
              value={rate || 0}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-300 mb-2">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Tenure (Years)</span>
              {years && <span className="text-emerald-400 font-semibold">{years} Yr</span>}
            </label>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={years || 0}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {result && (
            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center">
                <span className="text-sm font-medium text-emerald-200/70">Monthly EMI</span>
                <div className="text-4xl font-bold text-emerald-400 mt-1 flex items-center justify-center">
                  <IndianRupee className="w-8 h-8 -mr-1" />
                  {formatCurrency(result.emi)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <PieChart className="w-3 h-3" /> Total Interest
                  </div>
                  <div className="text-lg font-semibold text-gray-200">
                    ₹{formatCurrency(result.totalInterest)}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" /> Total Amount
                  </div>
                  <div className="text-lg font-semibold text-gray-200">
                    ₹{formatCurrency(result.totalAmount)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentLoanCalculator;
