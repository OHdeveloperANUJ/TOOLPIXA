'use client';

import React, { useState, useEffect } from 'react';
import { Beer, Info, Wine, GlassWater } from 'lucide-react';

export default function BloodAlcoholCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('imperial');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<number>(160); // lbs or kg depending on unit
  const [hours, setHours] = useState<number>(2);
  
  const [drinks, setDrinks] = useState({
    beer: 0, // 12oz, 5%
    wine: 0, // 5oz, 12%
    shot: 0  // 1.5oz, 40%
  });

  const [result, setResult] = useState<{
    bac: number;
    status: string;
    timeToSober: number;
    color: string;
  } | null>(null);

  useEffect(() => {
    // Widmark Formula
    // BAC = (Alcohol Consumed in grams / (Weight in grams * r)) * 100 - (0.015 * Hours)
    
    // Calculate total alcohol in grams
    // 1 standard US drink = 14 grams of alcohol
    const totalGrams = (drinks.beer * 14) + (drinks.wine * 14) + (drinks.shot * 14);

    if (totalGrams === 0) {
      setResult({ bac: 0, status: 'Sober', timeToSober: 0, color: '#2dd4bf' });
      return;
    }

    // Weight in grams
    const weightGrams = unit === 'imperial' ? weight * 453.592 : weight * 1000;
    
    // Gender constant (r)
    const r = gender === 'male' ? 0.68 : 0.55;

    let bac = ((totalGrams / (weightGrams * r)) * 100) - (0.015 * hours);
    if (bac < 0) bac = 0;

    let status = 'Sober';
    let color = '#2dd4bf'; // teal

    if (bac > 0 && bac < 0.04) {
      status = 'Mildly Relaxed';
      color = '#3b82f6'; // blue
    } else if (bac >= 0.04 && bac < 0.08) {
      status = 'Impaired';
      color = '#eab308'; // yellow
    } else if (bac >= 0.08 && bac < 0.25) {
      status = 'Legally Intoxicated';
      color = '#f97316'; // orange
    } else if (bac >= 0.25) {
      status = 'Dangerously Intoxicated';
      color = '#f43f5e'; // rose
    }

    const timeToSober = bac / 0.015;

    setResult({
      bac,
      status,
      timeToSober,
      color
    });

  }, [gender, weight, hours, drinks, unit]);

  const updateDrinks = (type: keyof typeof drinks, delta: number) => {
    setDrinks(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  const getRotation = (bac: number) => {
    const clamped = Math.min(Math.max(bac, 0), 0.3);
    return (clamped / 0.3) * 180;
  };

  return (
    <section className="space-y-8 animate-fade-in-up">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Blood Alcohol Calculator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Inputs */}
        <div className="glass-card p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Beer className="text-orange-500" /> Details
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
                  onClick={() => setGender('male')}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 ${gender === 'male' ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400'}`}
                >Male</button>
                <button 
                  onClick={() => setGender('female')}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-95 ${gender === 'female' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400'}`}
                >Female</button>
              </div>
            </div>

            {/* Weight */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400">Weight</label>
                <span className="text-orange-600 dark:text-orange-400 font-bold">
                  {weight} {unit === 'imperial' ? 'lbs' : 'kg'}
                </span>
              </div>
              <input 
                type="range" 
                min={unit === 'imperial' ? 80 : 36} 
                max={unit === 'imperial' ? 350 : 160} 
                value={weight}
                onChange={(e) => setWeight(parseInt(e.target.value))}
                className="w-full accent-orange-400 h-2"
              />
            </div>

            {/* Drinks */}
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Drinks Consumed</label>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                      <Beer size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Beer</p>
                      <p className="text-xs text-slate-500">12oz / 5% ABV</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateDrinks('beer', -1)} className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-700">-</button>
                    <span className="w-4 text-center font-bold">{drinks.beer}</span>
                    <button onClick={() => updateDrinks('beer', 1)} className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-700">+</button>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                      <Wine size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Wine</p>
                      <p className="text-xs text-slate-500">5oz / 12% ABV</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateDrinks('wine', -1)} className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-700">-</button>
                    <span className="w-4 text-center font-bold">{drinks.wine}</span>
                    <button onClick={() => updateDrinks('wine', 1)} className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-700">+</button>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <GlassWater size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Liquor / Shot</p>
                      <p className="text-xs text-slate-500">1.5oz / 40% ABV</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateDrinks('shot', -1)} className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-700">-</button>
                    <span className="w-4 text-center font-bold">{drinks.shot}</span>
                    <button onClick={() => updateDrinks('shot', 1)} className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-700">+</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Time */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400">Time since first drink</label>
                <span className="text-orange-600 dark:text-orange-400 font-bold">{hours} hours</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="12" 
                step="0.5"
                value={hours}
                onChange={(e) => setHours(parseFloat(e.target.value))}
                className="w-full accent-orange-400 h-2"
              />
            </div>

          </div>
        </div>

        {/* Right Side: Dashboard */}
        <div className="glass-card p-8 rounded-2xl flex flex-col justify-center space-y-8 min-h-[500px]">
          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">BAC Estimate</p>
          </div>
          
          {result ? (
            <div className="flex flex-col items-center w-full z-10 relative">
              
              {/* Premium BAC Gauge */}
              <div className="relative w-64 h-32 overflow-hidden mb-8">
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[16px] border-slate-100 dark:border-slate-800/50"></div>
                
                {/* Colored segments */}
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[16px] border-transparent border-t-[#2dd4bf] border-l-[#2dd4bf] -rotate-45" style={{clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%)', transform: 'rotate(-45deg)', opacity: result.bac < 0.04 ? 1 : 0.15}}></div>
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[16px] border-transparent border-t-[#eab308] border-r-[#eab308]" style={{clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%)', transform: 'rotate(-45deg)', opacity: result.bac >= 0.04 && result.bac < 0.08 ? 1 : 0.15}}></div>
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[16px] border-transparent border-b-[#f97316] border-r-[#f97316] -rotate-45" style={{clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%)', transform: 'rotate(-45deg)', opacity: result.bac >= 0.08 && result.bac < 0.25 ? 1 : 0.15}}></div>
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-[16px] border-transparent border-b-[#f43f5e] border-l-[#f43f5e] -rotate-45" style={{clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%)', transform: 'rotate(-45deg)', opacity: result.bac >= 0.25 ? 1 : 0.15}}></div>
                
                {/* Needle */}
                <div 
                  className="absolute bottom-0 left-1/2 w-1 h-32 origin-bottom transition-transform duration-1000 ease-out"
                  style={{ transform: `translateX(-50%) rotate(${getRotation(result.bac) - 90}deg)` }}
                >
                  <div className="w-4 h-4 bg-slate-800 dark:bg-white rounded-full absolute top-0 -left-[6px] shadow-lg"></div>
                  <div className="w-1 h-full bg-slate-800 dark:bg-white opacity-40"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full text-center">
                  <div className="text-5xl font-black" style={{color: result.color}}>
                    {result.bac.toFixed(3)}%
                  </div>
                </div>
              </div>

              <div 
                className="text-center font-bold text-2xl tracking-tight mb-8"
                style={{ color: result.color }}
              >
                {result.status}
              </div>

              {/* Time to Sober Card */}
              <div className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 text-center">Estimated Time to Sober (0.00%)</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-0">
                  {Math.floor(result.timeToSober)}<span className="text-sm font-normal text-slate-500 dark:text-slate-400">h</span> {Math.round((result.timeToSober % 1) * 60)}<span className="text-sm font-normal text-slate-500 dark:text-slate-400">m</span>
                </p>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12 opacity-50">
              <Beer className="text-slate-400 w-16 h-16" />
              <p className="text-slate-500 dark:text-slate-400 max-w-4xl">Enter your details on the left to estimate your BAC.</p>
            </div>
          )}
          
        </div>
      </div>

      {/* Formula Explanation */}
      <div className="glass-card p-6 rounded-2xl mt-8">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Info className="text-orange-500" /> How It Works
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          This calculator uses the widely accepted <strong>Widmark Formula</strong> to estimate Blood Alcohol Concentration (BAC).
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 mb-4 font-mono text-sm text-slate-800 dark:text-slate-200 overflow-x-auto">
          BAC = (Alcohol Consumed / (Weight × r)) × 100 - (0.015 × Hours)
        </div>
        <ul className="space-y-3 text-slate-600 dark:text-slate-300 list-disc list-inside">
          <li><strong>Alcohol Consumed:</strong> Total grams of alcohol ingested. We use standard drink sizes (14g per standard drink).</li>
          <li><strong>Weight & Gender (r):</strong> The distribution constant `r` is typically 0.68 for men and 0.55 for women due to differences in body water percentage.</li>
          <li><strong>Metabolism (-0.015 × Hours):</strong> The average human body metabolizes alcohol at a rate of roughly 0.015% BAC per hour.</li>
        </ul>
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-900/30">
          <p className="text-sm text-red-800 dark:text-red-300">
            <strong>IMPORTANT DISCLAIMER:</strong> This tool provides an <em>estimate</em> for informational and educational purposes only. Actual BAC depends on many factors including metabolism, food consumed, hydration, and genetics. Do not use this tool to determine if it is safe to drive. <strong>Never drink and drive.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}


// Indian Example: Arjun from Chennai uses this tool to check variables.
