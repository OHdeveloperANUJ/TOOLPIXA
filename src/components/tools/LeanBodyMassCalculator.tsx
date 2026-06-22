'use client';

import React, { useState } from 'react';
import { Activity, Dumbbell, Info } from 'lucide-react';

export default function LeanBodyMassCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(170);

  // Boer Formula
  const calculateLBM = () => {
    if (gender === 'male') {
      return (0.407 * weightKg) + (0.267 * heightCm) - 19.2;
    } else {
      return (0.252 * weightKg) + (0.473 * heightCm) - 48.3;
    }
  };

  const lbm = calculateLBM();
  const validLbm = lbm > 0 ? lbm : 0;
  const bodyFat = weightKg > 0 && validLbm > 0 ? weightKg - validLbm : 0;
  const bodyFatPercentage = weightKg > 0 ? (bodyFat / weightKg) * 100 : 0;

  return (
    <section className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: Inputs */}
        <div className="glass-card p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Dumbbell className="text-cyan-500" /> Lean Body Mass
            </h2>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-1 flex">
              <button 
                onClick={() => setUnit('metric')}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${unit === 'metric' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
              >Metric</button>
              <button 
                onClick={() => setUnit('imperial')}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${unit === 'imperial' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
              >Imperial</button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Biological Sex</label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setGender('male')}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 ${gender === 'male' ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400'}`}
                >Male</button>
                <button 
                  onClick={() => setGender('female')}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 ${gender === 'female' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400'}`}
                >Female</button>
              </div>
            </div>

            {/* Height */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400">Height</label>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                  {unit === 'metric' 
                    ? `${Math.round(heightCm)} cm` 
                    : `${Math.floor(heightCm / 2.54 / 12)} ft ${Math.round(heightCm / 2.54) % 12} in`}
                </span>
              </div>
              <input 
                type="range" 
                min={unit === 'metric' ? 100 : 39} 
                max={unit === 'metric' ? 250 : 98} 
                value={unit === 'metric' ? heightCm : Math.round(heightCm / 2.54)}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setHeightCm(unit === 'metric' ? val : val * 2.54);
                }}
                className="w-full accent-cyan-400 h-2"
              />
            </div>

            {/* Weight */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400">Weight</label>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                  {unit === 'metric' 
                    ? `${Math.round(weightKg)} kg` 
                    : `${Math.round(weightKg * 2.20462)} lbs`}
                </span>
              </div>
              <input 
                type="range" 
                min={unit === 'metric' ? 30 : 66} 
                max={unit === 'metric' ? 200 : 440} 
                value={unit === 'metric' ? weightKg : Math.round(weightKg * 2.20462)}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setWeightKg(unit === 'metric' ? val : val / 2.20462);
                }}
                className="w-full accent-cyan-400 h-2"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Dashboard */}
        <div className="glass-card p-8 rounded-2xl flex flex-col justify-center space-y-8 min-h-[400px]">
          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Results Dashboard</p>
          </div>
          
          <div className="flex flex-col items-center w-full z-10 relative">
            <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center mb-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold">Lean Body Mass</p>
              <div className="text-5xl font-black text-cyan-500 mb-2">
                {unit === 'metric' ? validLbm.toFixed(1) : (validLbm * 2.20462).toFixed(1)} <span className="text-2xl text-slate-400">{unit === 'metric' ? 'kg' : 'lbs'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Body Fat Weight</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-0">
                  {unit === 'metric' ? bodyFat.toFixed(1) : (bodyFat * 2.20462).toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                </p>
              </div>
              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-500/20 flex flex-col items-center justify-center">
                <p className="text-xs text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-1 font-bold">Body Fat %</p>
                <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300 mb-0">{Math.max(0, bodyFatPercentage).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 rounded-2xl">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Info className="text-cyan-500" /> About the Formula
        </h2>
        <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
          <p>
            Lean Body Mass (LBM) is the total weight of your body minus all the weight due to your fat mass. This calculator uses the <strong>Boer Formula</strong>, which is widely considered one of the most accurate equations for estimating LBM:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Male:</strong> <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-cyan-600 dark:text-cyan-400">LBM = 0.407 × W + 0.267 × H - 19.2</code></li>
            <li><strong>Female:</strong> <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-cyan-600 dark:text-cyan-400">LBM = 0.252 × W + 0.473 × H - 48.3</code></li>
          </ul>
          <p className="text-xs text-slate-500 mt-4">
            <em>W = Weight in kg, H = Height in cm. Note that these formulas are estimations. For precise body fat and lean mass measurements, clinical methods like DEXA scans are recommended.</em>
          </p>
        </div>
      </div>
    </section>
  );
}
