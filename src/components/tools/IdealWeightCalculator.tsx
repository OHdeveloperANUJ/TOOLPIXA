'use client';

import React, { useState } from 'react';
import { Scale, Info } from 'lucide-react';

export default function IdealWeightCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState(170);

  const calculateIBW = () => {
    // Devine Formula
    const heightInInches = heightCm / 2.54;
    const over5Feet = heightInInches - 60;
    
    let baseWeight = gender === 'male' ? 50.0 : 45.5;
    
    // Extrapolate for under 5 feet or apply standard Devine for over 5 feet
    let ibw = baseWeight + (2.3 * over5Feet);
    return ibw > 0 ? ibw : 0;
  };

  const ibw = calculateIBW();
  
  // Healthy BMI range (18.5 to 24.9)
  const heightM = heightCm / 100;
  const minWeight = 18.5 * (heightM * heightM);
  const maxWeight = 24.9 * (heightM * heightM);

  return (
    <section className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: Inputs */}
        <div className="glass-card p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Scale className="text-cyan-500" /> Ideal Weight
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
          </div>
        </div>

        {/* Right Side: Dashboard */}
        <div className="glass-card p-8 rounded-2xl flex flex-col justify-center space-y-8 min-h-[400px]">
          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Results Dashboard</p>
          </div>
          
          <div className="flex flex-col items-center w-full z-10 relative">
            <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center mb-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold text-center">Ideal Body Weight (Devine)</p>
              <div className="text-5xl font-black text-cyan-500 mb-2">
                {unit === 'metric' ? ibw.toFixed(1) : (ibw * 2.20462).toFixed(1)} <span className="text-2xl text-slate-400">{unit === 'metric' ? 'kg' : 'lbs'}</span>
              </div>
            </div>

            <div className="w-full bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-xl border border-cyan-200 dark:border-cyan-500/20 flex flex-col items-center justify-center">
              <p className="text-sm text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-2 font-bold text-center">Healthy Weight Range (BMI)</p>
              <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300 mb-0">
                {unit === 'metric' ? minWeight.toFixed(1) : (minWeight * 2.20462).toFixed(1)} - {unit === 'metric' ? maxWeight.toFixed(1) : (maxWeight * 2.20462).toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
              </p>
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
            The Ideal Weight Calculator uses the <strong>Devine Formula (1974)</strong>, which is the most widely used formula in medicine for calculating Ideal Body Weight (IBW). It was originally designed to determine the proper dosage of certain medications.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Male:</strong> 50.0 kg + 2.3 kg for every inch over 5 feet</li>
            <li><strong>Female:</strong> 45.5 kg + 2.3 kg for every inch over 5 feet</li>
          </ul>
          <p className="text-xs text-slate-500 mt-4">
            <em>Note: "Ideal" weight is a statistical construct and may not reflect your personal healthiest weight. We also provide a Healthy Weight Range based on a standard BMI of 18.5 to 24.9 for comparison.</em>
          </p>
        </div>
      </div>
    </section>
  );
}
