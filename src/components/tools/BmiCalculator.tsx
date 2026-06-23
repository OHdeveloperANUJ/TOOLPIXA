'use client';

import React, { useState, useEffect } from 'react';
import { calculateHealthMetrics, BmiInputs, BmiResult } from '@/utils/bmiLogic';
import { Activity, ArrowRight, Info } from 'lucide-react';

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

export default function BmiCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [inputs, setInputs] = useState<BmiInputs>({
    heightCm: 170,
    weightKg: 70,
    age: 25,
    gender: 'male',
    activityLevel: 1.2
  });

  const result = calculateHealthMetrics(inputs);
  const animatedBmi = useAnimatedNumber(result?.bmi || 0);

  const updateInput = (field: keyof BmiInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const getGaugeColor = (cat: string) => {
    switch(cat) {
      case 'Underweight': return '#3b82f6'; // blue-500
      case 'Normal': return '#2dd4bf'; // teal-400
      case 'Overweight': return '#eab308'; // yellow-500
      case 'Obese': return '#f43f5e'; // rose-500
      default: return '#2dd4bf';
    }
  };

  const getRotation = (bmi: number) => {
    const clamped = Math.min(Math.max(bmi, 15), 40);
    return ((clamped - 15) / 25) * 180;
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Inputs */}
        <div className="glass-card p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Activity className="text-cyan-500" /> Biometrics
            </h3>
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
                  onClick={() => updateInput('gender', 'male')}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 ${inputs.gender === 'male' ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400'}`}
                >Male</button>
                <button 
                  onClick={() => updateInput('gender', 'female')}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 ${inputs.gender === 'female' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400'}`}
                >Female</button>
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Age (years)</label>
              <input 
                type="number" 
                inputMode="numeric"
                value={inputs.age} 
                onChange={(e) => updateInput('age', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-4 text-base text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-400 outline-none transition-all"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {[20, 25, 30, 40, 50].map(a => (
                  <button key={a} onClick={() => updateInput('age', a)} className="px-3 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors active:scale-95">
                    {a} Yrs
                  </button>
                ))}
              </div>
            </div>

            {/* Height */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400">Height</label>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                  {unit === 'metric' 
                    ? `${Math.round(inputs.heightCm)} cm` 
                    : `${Math.floor(inputs.heightCm / 2.54 / 12)} ft ${Math.round(inputs.heightCm / 2.54) % 12} in`}
                </span>
              </div>
              <input 
                type="range" 
                min={unit === 'metric' ? 100 : 39} 
                max={unit === 'metric' ? 250 : 98} 
                value={unit === 'metric' ? inputs.heightCm : Math.round(inputs.heightCm / 2.54)}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  updateInput('heightCm', unit === 'metric' ? val : val * 2.54);
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
                    ? `${Math.round(inputs.weightKg)} kg` 
                    : `${Math.round(inputs.weightKg * 2.20462)} lbs`}
                </span>
              </div>
              <input 
                type="range" 
                min={unit === 'metric' ? 30 : 66} 
                max={unit === 'metric' ? 200 : 440} 
                value={unit === 'metric' ? inputs.weightKg : Math.round(inputs.weightKg * 2.20462)}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  updateInput('weightKg', unit === 'metric' ? val : val / 2.20462);
                }}
                className="w-full accent-cyan-400 h-2"
              />
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Activity Level</label>
              <select 
                value={inputs.activityLevel}
                onChange={(e) => updateInput('activityLevel', parseFloat(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-4 text-base text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-400 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value={1.2}>Sedentary (Little or no exercise)</option>
                <option value={1.375}>Lightly Active (Exercise 1-3 days/week)</option>
                <option value={1.55}>Moderately Active (Exercise 3-5 days/week)</option>
                <option value={1.725}>Very Active (Exercise 6-7 days/week)</option>
                <option value={1.9}>Extra Active (Physical job + exercise)</option>
              </select>
              <div className="flex flex-wrap gap-2 mt-3">
                {[{l: 'Sedentary', v: 1.2}, {l: 'Moderate', v: 1.55}, {l: 'Athlete', v: 1.9}].map(a => (
                  <button key={a.l} onClick={() => updateInput('activityLevel', a.v)} className="px-3 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors active:scale-95">
                    {a.l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Dashboard */}
        <div className="glass-card p-8 rounded-2xl flex flex-col justify-center space-y-8 min-h-[500px]">
          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Health Dashboard</p>
          </div>
          
          {result ? (
            <div className="flex flex-col items-center w-full z-10 relative">
              {/* Premium BMI Gauge */}
              <div className="relative w-64 h-32 overflow-hidden mb-8">
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[16px] border-slate-100 dark:border-slate-800/50"></div>
                
                {/* Colored segments */}
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[16px] border-transparent border-t-[#3b82f6] border-l-[#3b82f6] -rotate-45" style={{clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%)', transform: 'rotate(-45deg)', opacity: result.bmiCategory === 'Underweight' ? 1 : 0.15}}></div>
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[16px] border-transparent border-t-[#2dd4bf] border-r-[#2dd4bf]" style={{clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%)', transform: 'rotate(-45deg)', opacity: result.bmiCategory === 'Normal' ? 1 : 0.15}}></div>
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[16px] border-transparent border-b-[#eab308] border-r-[#eab308] -rotate-45" style={{clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%)', transform: 'rotate(-45deg)', opacity: result.bmiCategory === 'Overweight' ? 1 : 0.15}}></div>
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[16px] border-transparent border-b-[#f43f5e] border-l-[#f43f5e] -rotate-45" style={{clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%)', transform: 'rotate(-45deg)', opacity: result.bmiCategory === 'Obese' ? 1 : 0.15}}></div>
                
                {/* Needle */}
                <div 
                  className="absolute bottom-0 left-1/2 w-1 h-32 origin-bottom transition-transform duration-1000 ease-out"
                  style={{ transform: `translateX(-50%) rotate(${getRotation(result.bmi) - 90}deg)` }}
                >
                  <div className="w-4 h-4 bg-slate-800 dark:bg-white rounded-full absolute top-0 -left-[6px] shadow-lg"></div>
                  <div className="w-1 h-full bg-slate-800 dark:bg-white opacity-40"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full text-center">
                  <div className="text-6xl font-black" style={{color: getGaugeColor(result.bmiCategory)}}>
                    {animatedBmi.toFixed(1)}
                  </div>
                </div>
              </div>
              
              <div 
                className="text-center font-bold text-2xl tracking-tight mb-8"
                style={{ color: getGaugeColor(result.bmiCategory) }}
              >
                {result.bmiCategory}
              </div>

              {/* Energy Needs Cards */}
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Basal Metabolic Rate</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-0">{result.bmr}</p>
                  <p className="text-xs text-slate-400">kcal / day</p>
                </div>
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-500/20 flex flex-col items-center justify-center relative overflow-hidden">
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-1 font-bold">Total Energy (TDEE)</p>
                  <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300 mb-0">{result.tdee}</p>
                  <p className="text-xs text-cyan-500 dark:text-cyan-400">kcal / day</p>
                </div>
              </div>

              {/* Trust Signals & Information */}
              <div className="w-full mt-8 p-4 bg-slate-100 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/50 flex gap-3 text-left">
                <Info className="text-slate-400 shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  <strong>Note:</strong> BMI does not distinguish between fat and muscle mass. Athletes and bodybuilders may have a high BMI but low body fat percentage. Always consult a healthcare provider for a complete health assessment.
                </p>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12 opacity-50">
              <Activity className="text-slate-400 w-16 h-16" />
              <p className="text-slate-500 dark:text-slate-400 max-w-4xl">Enter your details on the left to calculate your BMI and daily energy requirements.</p>
            </div>
          )}
          
        </div>
      </div>
      
      {/* Affiliate Placement */}
      <div className="affiliate-cta-box bg-slate-50 dark:bg-[#0A0A14] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          Sponsored Recommendation
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Looking to track your health metrics and get personalized diet plans? Join millions using HealthifyMe to achieve their fitness goals.</p>
        <a href="https://www.healthifyme.com" rel="sponsored noopener noreferrer" target="_blank" className="inline-block px-6 py-4 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors">
          Download HealthifyMe
        </a>
      </div>

    </div>
  );
}


// Indian Example: Ayush from Kolkata uses this tool to check variables.
