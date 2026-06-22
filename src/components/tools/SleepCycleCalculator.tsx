'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Info, Clock, CheckCircle2 } from 'lucide-react';

export default function SleepCycleCalculator() {
  const [mode, setMode] = useState<'wake' | 'sleep'>('wake');
  const [time, setTime] = useState<string>('07:00');

  const [results, setResults] = useState<{
    time: string;
    cycles: number;
    hours: number;
    recommended: boolean;
  }[]>([]);

  useEffect(() => {
    if (!time) return;

    const [hours, minutes] = time.split(':').map(Number);
    const baseDate = new Date();
    baseDate.setHours(hours, minutes, 0, 0);

    const calculatedTimes: { time: string; cycles: number; hours: number; recommended: boolean }[] = [];

    // Fall asleep takes ~15 minutes
    const FALL_ASLEEP_MS = 15 * 60 * 1000;
    const CYCLE_MS = 90 * 60 * 1000;

    if (mode === 'wake') {
      // If I want to wake up at X, I need to sleep at...
      // Working backwards from wake time.
      for (let cycles = 6; cycles >= 3; cycles--) {
        const sleepTime = new Date(baseDate.getTime() - (cycles * CYCLE_MS) - FALL_ASLEEP_MS);
        calculatedTimes.push({
          time: sleepTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
          cycles,
          hours: (cycles * 90) / 60,
          recommended: cycles === 5 || cycles === 6
        });
      }
    } else {
      // If I sleep at X, I should wake up at...
      // Working forwards from sleep time.
      for (let cycles = 3; cycles <= 6; cycles++) {
        const wakeTime = new Date(baseDate.getTime() + (cycles * CYCLE_MS) + FALL_ASLEEP_MS);
        calculatedTimes.push({
          time: wakeTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
          cycles,
          hours: (cycles * 90) / 60,
          recommended: cycles === 5 || cycles === 6
        });
      }
      // Reversing to show the latest wake up times first or keep it ascending? Ascending makes sense, but we want 6 cycles first usually.
      // Let's reverse so 6 cycles is at the top.
      calculatedTimes.reverse();
    }

    setResults(calculatedTimes);

  }, [mode, time]);

  return (
    <section className="space-y-8 animate-fade-in-up">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Sleep Cycle Calculator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Inputs */}
        <div className="glass-card p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="text-indigo-500" /> Schedule
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">I want to...</label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setMode('wake')}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${mode === 'wake' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400'}`}
                >
                  <Sun size={18} /> Wake up at
                </button>
                <button 
                  onClick={() => setMode('sleep')}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${mode === 'sleep' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400'}`}
                >
                  <Moon size={18} /> Sleep at
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                Time
              </label>
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-4 text-2xl font-bold text-center text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
              />
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
              <p className="text-sm text-indigo-800 dark:text-indigo-300 flex items-start gap-2">
                <Info size={18} className="shrink-0 mt-0.5" />
                <span>We factor in an average of <strong>15 minutes</strong> to fall asleep. If you take longer, consider adjusting your time.</span>
              </p>
            </div>

          </div>
        </div>

        {/* Right Side: Dashboard */}
        <div className="glass-card p-8 rounded-2xl flex flex-col justify-center min-h-[400px]">
          <div className="text-center mb-6">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
              {mode === 'wake' ? 'You should head to bed at' : 'You should set your alarm for'}
            </p>
          </div>
          
          <div className="space-y-4 w-full relative z-10">
            {results.map((res, i) => (
              <div 
                key={i} 
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${res.recommended ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-md transform hover:scale-[1.02]' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                <div className="flex flex-col">
                  <span className={`text-2xl font-black ${res.recommended ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {res.time}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {res.cycles} cycles ({res.hours} hours of sleep)
                  </span>
                </div>
                {res.recommended && (
                  <div className="flex flex-col items-end gap-1">
                    <span className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 text-[10px] uppercase font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={12} /> Recommended
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
        </div>
      </div>

      {/* Formula Explanation */}
      <div className="glass-card p-6 rounded-2xl mt-8">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Info className="text-indigo-500" /> How It Works
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          Human sleep is organized into cycles consisting of non-REM and REM sleep. A typical sleep cycle lasts about <strong>90 minutes</strong>.
        </p>
        <ul className="space-y-3 text-slate-600 dark:text-slate-300 list-disc list-inside">
          <li><strong>Sleep Inertia:</strong> Waking up in the middle of a sleep cycle can leave you feeling groggy and disoriented (known as sleep inertia).</li>
          <li><strong>Optimal Waking:</strong> Waking up at the end of a cycle—when you are in a lighter sleep stage—helps you feel refreshed and alert immediately.</li>
          <li><strong>The Math:</strong> The calculator adds a 15-minute buffer (the average time it takes to fall asleep) and counts backward or forward in 90-minute blocks to find the perfect sleep or wake times.</li>
        </ul>
      </div>
    </section>
  );
}
