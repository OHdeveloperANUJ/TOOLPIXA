'use client';

import React, { useState, useEffect } from 'react';
import { Baby, Calendar, Info } from 'lucide-react';

export default function PregnancyDueDateCalculator() {
  const [calcMethod, setCalcMethod] = useState<'lmp' | 'conception'>('lmp');
  const [dateStr, setDateStr] = useState<string>(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState<number>(28);

  const [result, setResult] = useState<{
    dueDate: Date;
    gestationalAgeWeeks: number;
    gestationalAgeDays: number;
    progressPercentage: number;
    trimester: number;
  } | null>(null);

  useEffect(() => {
    if (!dateStr) {
      setResult(null);
      return;
    }

    const inputDate = new Date(dateStr);
    if (isNaN(inputDate.getTime())) return;

    let dueDate = new Date(inputDate);
    let lmpDate = new Date(inputDate);

    if (calcMethod === 'lmp') {
      // Naegele's rule with cycle length adjustment
      dueDate.setDate(dueDate.getDate() + 280 + (cycleLength - 28));
    } else {
      // Conception date
      dueDate.setDate(dueDate.getDate() + 266);
      lmpDate.setDate(lmpDate.getDate() - 14); // approximate LMP for gestation math
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - lmpDate.getTime();
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Cap or floor progress
    if (diffDays < 0) diffDays = 0;
    if (diffDays > 294) diffDays = 294; // Past 42 weeks

    const gestationalAgeWeeks = Math.floor(diffDays / 7);
    const gestationalAgeDays = diffDays % 7;
    const progressPercentage = Math.min(100, Math.max(0, (diffDays / 280) * 100));

    let trimester = 1;
    if (gestationalAgeWeeks >= 13 && gestationalAgeWeeks < 27) trimester = 2;
    if (gestationalAgeWeeks >= 27) trimester = 3;

    setResult({
      dueDate,
      gestationalAgeWeeks,
      gestationalAgeDays,
      progressPercentage,
      trimester
    });

  }, [calcMethod, dateStr, cycleLength]);

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className="space-y-8 animate-fade-in-up">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Pregnancy Due Date Calculator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Inputs */}
        <div className="glass-card p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Baby className="text-pink-500" /> Details
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Calculation Method</label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setCalcMethod('lmp')}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 ${calcMethod === 'lmp' ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400'}`}
                >First Day of LMP</button>
                <button 
                  onClick={() => setCalcMethod('conception')}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 ${calcMethod === 'conception' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400'}`}
                >Conception Date</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                {calcMethod === 'lmp' ? 'First Day of Last Period' : 'Date of Conception'}
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="date" 
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg pl-12 pr-4 py-4 text-base text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-pink-400 outline-none transition-all appearance-none"
                />
              </div>
            </div>

            {calcMethod === 'lmp' && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400">Average Cycle Length</label>
                  <span className="text-pink-600 dark:text-pink-400 font-bold">{cycleLength} days</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="45" 
                  value={cycleLength}
                  onChange={(e) => setCycleLength(parseInt(e.target.value))}
                  className="w-full accent-pink-400 h-2"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>20</span>
                  <span>28</span>
                  <span>45</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Dashboard */}
        <div className="glass-card p-8 rounded-2xl flex flex-col justify-center space-y-8 min-h-[500px]">
          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Pregnancy Dashboard</p>
          </div>
          
          {result ? (
            <div className="flex flex-col items-center w-full z-10 relative">
              
              <div className="text-center mb-8">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Estimated Due Date</p>
                <div className="text-3xl md:text-4xl font-black text-pink-500 dark:text-pink-400">
                  {formatDate(result.dueDate)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full mb-8">
                <div className="flex justify-between text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                  <span>Week 0</span>
                  <span>Week 40</span>
                </div>
                <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${result.progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-center mt-3 font-bold text-slate-700 dark:text-slate-300">
                  {Math.round(result.progressPercentage)}% Complete
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 text-center">Gestational Age</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-0">
                    {result.gestationalAgeWeeks}<span className="text-sm text-slate-500">w</span> {result.gestationalAgeDays}<span className="text-sm text-slate-500">d</span>
                  </p>
                </div>
                <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-xl border border-pink-200 dark:border-pink-500/20 flex flex-col items-center justify-center">
                  <p className="text-xs text-pink-600 dark:text-pink-400 uppercase tracking-widest mb-1 font-bold text-center">Trimester</p>
                  <p className="text-2xl font-bold text-pink-700 dark:text-pink-300 mb-0">
                    {result.trimester}{result.trimester === 1 ? 'st' : result.trimester === 2 ? 'nd' : 'rd'}
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12 opacity-50">
              <Baby className="text-slate-400 w-16 h-16" />
              <p className="text-slate-500 dark:text-slate-400 max-w-4xl">Enter your details on the left to calculate your pregnancy due date and milestones.</p>
            </div>
          )}
          
        </div>
      </div>

      {/* Formula Explanation */}
      <div className="glass-card p-6 rounded-2xl mt-8">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Info className="text-pink-500" /> How It Works
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          The calculator primarily uses a modified version of <strong>Naegele's rule</strong> to estimate the due date (EDD).
        </p>
        <ul className="space-y-3 text-slate-600 dark:text-slate-300 list-disc list-inside">
          <li><strong>By First Day of LMP:</strong> We add 280 days (40 weeks) to the first day of your last menstrual period. If your average cycle length is longer or shorter than the standard 28 days, we adjust the due date by that difference.</li>
          <li><strong>By Conception Date:</strong> If you know the exact date of conception, we simply add 266 days (38 weeks) to calculate the estimated due date.</li>
        </ul>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <em>Disclaimer: This tool provides estimates for informational purposes only. Only about 4-5% of babies are born exactly on their estimated due date. Always consult your healthcare provider for medical advice.</em>
        </p>
      </div>
    </section>
  );
}


// Indian Example: Rekha from Bikaner uses this tool to check variables.
