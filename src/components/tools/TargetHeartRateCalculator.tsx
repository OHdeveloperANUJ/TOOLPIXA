'use client';

import React, { useState } from 'react';
import { HeartPulse, Info } from 'lucide-react';

export default function TargetHeartRateCalculator() {
  const [age, setAge] = useState(30);
  const [restingHR, setRestingHR] = useState(70);

  // Karvonen Formula
  const mhr = 220 - age;
  const hrr = mhr - restingHR;

  const calculateZone = (minPercent: number, maxPercent: number) => {
    const minHR = Math.round(restingHR + (hrr * (minPercent / 100)));
    const maxHR = Math.round(restingHR + (hrr * (maxPercent / 100)));
    return { minHR, maxHR };
  };

  const zones = [
    { name: 'Zone 1: Warm Up', desc: '50-60% - Very light, for recovery', ...calculateZone(50, 60), color: 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200' },
    { name: 'Zone 2: Fat Burn', desc: '60-70% - Light, endurance training', ...calculateZone(60, 70), color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
    { name: 'Zone 3: Aerobic', desc: '70-80% - Moderate, cardio fitness', ...calculateZone(70, 80), color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
    { name: 'Zone 4: Anaerobic', desc: '80-90% - Hard, interval training', ...calculateZone(80, 90), color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' },
    { name: 'Zone 5: VO2 Max', desc: '90-100% - Maximum effort', ...calculateZone(90, 100), color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' },
  ];

  return (
    <section className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: Inputs */}
        <div className="glass-card p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <HeartPulse className="text-rose-500" /> Target Heart Rate
            </h2>
          </div>

          <div className="space-y-6">
            {/* Age */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400">Age (years)</label>
                <span className="text-rose-600 dark:text-rose-400 font-bold">{age}</span>
              </div>
              <input 
                type="range" 
                min={10} 
                max={100} 
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                className="w-full accent-rose-400 h-2"
              />
            </div>

            {/* Resting Heart Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400">Resting Heart Rate (bpm)</label>
                <span className="text-rose-600 dark:text-rose-400 font-bold">{restingHR}</span>
              </div>
              <input 
                type="range" 
                min={40} 
                max={120} 
                value={restingHR}
                onChange={(e) => setRestingHR(parseInt(e.target.value) || 0)}
                className="w-full accent-rose-400 h-2"
              />
            </div>
            
            {/* Static Stats Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Max HR</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{mhr} <span className="text-sm font-normal text-slate-500">bpm</span></p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">HR Reserve</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{hrr} <span className="text-sm font-normal text-slate-500">bpm</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Zones Dashboard */}
        <div className="glass-card p-8 rounded-2xl flex flex-col justify-center space-y-6">
          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Training Zones</p>
          </div>
          
          <div className="space-y-3">
            {zones.map((zone, idx) => (
              <div key={idx} className={`p-4 rounded-xl border border-transparent flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 ${zone.color}`}>
                <div>
                  <h3 className="font-bold">{zone.name}</h3>
                  <p className="text-xs opacity-80">{zone.desc}</p>
                </div>
                <div className="text-xl font-black tabular-nums tracking-tight">
                  {zone.minHR} - {zone.maxHR} <span className="text-sm font-medium opacity-70">bpm</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-8 rounded-2xl">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Info className="text-rose-500" /> About the Formula
        </h2>
        <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
          <p>
            This calculator uses the <strong>Karvonen Formula</strong>, which factors in your Resting Heart Rate (RHR) to determine your Target Heart Rate (THR). This method is considered more accurate than simply taking a percentage of your maximum heart rate because it accounts for individual fitness levels.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Maximum Heart Rate (MHR):</strong> <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-rose-600 dark:text-rose-400">220 - Age</code></li>
            <li><strong>Heart Rate Reserve (HRR):</strong> <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-rose-600 dark:text-rose-400">MHR - Resting Heart Rate</code></li>
            <li><strong>Target Heart Rate:</strong> <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-rose-600 dark:text-rose-400">(HRR × Intensity %) + Resting Heart Rate</code></li>
          </ul>
          <p className="text-xs text-slate-500 mt-4">
            <em>Measure your resting heart rate right after waking up in the morning before getting out of bed for the most accurate results. Consult with your doctor before beginning any new exercise program.</em>
          </p>
        </div>
      </div>
    </section>
  );
}


// Indian Example: Abhay from Jammu uses this tool to check variables.
