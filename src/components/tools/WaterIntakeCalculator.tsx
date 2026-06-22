'use client';

import React, { useState } from 'react';

export default function WaterIntakeCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState<number>(70);
  const [exerciseMins, setExerciseMins] = useState<number>(30);
  const [weather, setWeather] = useState<'normal' | 'hot'>('normal');
  const [pregnancy, setPregnancy] = useState<'none' | 'pregnant' | 'nursing'>('none');

  // Logic: 
  // Base: 35ml per kg of body weight (or 0.5 oz per lb)
  // Exercise: Add 350ml (12oz) for every 30 mins
  // Hot weather: Add 500ml (16oz)
  // Pregnant: Add 300ml (10oz)
  // Nursing: Add 700ml (24oz)

  const wKg = unit === 'metric' ? weight : weight / 2.20462;
  
  let baseWaterMl = wKg * 35;
  const exerciseWaterMl = (exerciseMins / 30) * 350;
  baseWaterMl += exerciseWaterMl;

  if (weather === 'hot') baseWaterMl += 500;
  if (pregnancy === 'pregnant') baseWaterMl += 300;
  if (pregnancy === 'nursing') baseWaterMl += 700;

  const totalLiters = baseWaterMl / 1000;
  const totalOz = baseWaterMl / 29.5735;
  const totalCups = totalOz / 8;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl animate-fade-in-up">
      {/* Inputs */}
      <div className="lg:col-span-5 space-y-xl">
        <div className="glass-card p-xl rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-center mb-lg">
            <h2 className="font-headline-md text-2xl text-text-primary">Daily Factors</h2>
            <div className="bg-surface-container rounded-full p-1 flex">
              <button onClick={() => setUnit('metric')} className={`px-4 py-1 rounded-full text-sm font-bold transition-colors ${unit === 'metric' ? 'bg-primary text-background' : 'text-text-secondary'}`}>Metric</button>
              <button onClick={() => setUnit('imperial')} className={`px-4 py-1 rounded-full text-sm font-bold transition-colors ${unit === 'imperial' ? 'bg-primary text-background' : 'text-text-secondary'}`}>Imperial</button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
               <label className="text-sm font-bold text-text-secondary uppercase mb-2 block">Weight</label>
               <input type="number" value={weight} onChange={e => setWeight(parseFloat(e.target.value) || 0)} className="w-full bg-surface-container/50 border border-transparent focus:border-primary/50 rounded-xl py-3 px-4 text-text-primary focus:outline-none transition-all text-xl"/>
               <span className="text-xs text-text-secondary mt-1 block">{unit === 'metric' ? 'kg' : 'lbs'}</span>
            </div>

            <div>
               <div className="flex justify-between mb-2">
                 <label className="text-sm font-bold text-text-secondary uppercase block">Daily Exercise</label>
                 <span className="text-primary font-bold">{exerciseMins} mins</span>
               </div>
               <input type="range" min="0" max="180" step="15" value={exerciseMins} onChange={e => setExerciseMins(parseInt(e.target.value))} className="w-full accent-primary h-2 bg-surface-container rounded-lg appearance-none cursor-pointer"/>
            </div>

            <div>
               <label className="text-sm font-bold text-text-secondary uppercase mb-2 block">Climate</label>
               <div className="flex bg-surface-container rounded-xl p-1 border border-white/5">
                 <button onClick={() => setWeather('normal')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${weather === 'normal' ? 'bg-primary/20 text-primary shadow-sm' : 'text-text-secondary'}`}>Normal</button>
                 <button onClick={() => setWeather('hot')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${weather === 'hot' ? 'bg-primary/20 text-primary shadow-sm' : 'text-text-secondary'}`}>Hot / Humid</button>
               </div>
            </div>

            <div>
               <label className="text-sm font-bold text-text-secondary uppercase mb-2 block">Pregnancy / Nursing</label>
               <select value={pregnancy} onChange={e => setPregnancy(e.target.value as any)} className="w-full bg-surface-container/50 border border-transparent focus:border-primary/50 rounded-xl py-3 px-4 text-text-primary focus:outline-none transition-all appearance-none">
                  <option value="none">Not Applicable</option>
                  <option value="pregnant">Pregnant</option>
                  <option value="nursing">Nursing / Breastfeeding</option>
               </select>
            </div>
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="lg:col-span-7 relative">
        <div className="glass-card p-xl rounded-3xl sticky top-24 border border-blue-500/20 shadow-[0_0_50px_-10px_rgba(59,130,246,0.15)] overflow-hidden min-h-[500px] flex flex-col items-center">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <h3 className="font-label-md text-text-secondary uppercase tracking-widest mb-6 text-center relative z-10">Hydration Target</h3>
          
          <div className="flex flex-col items-center w-full z-10 relative mt-4 flex-1">
             <div className="relative mb-8 text-center">
                <div className="w-56 h-56 mx-auto rounded-full border-[8px] border-blue-500/20 flex flex-col items-center justify-center relative shadow-[0_0_40px_rgba(59,130,246,0.2)] bg-surface-container/30 overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full bg-blue-500/20" style={{ height: '60%' }}>
                     <div className="absolute top-0 left-0 w-full h-2 bg-blue-400/50 blur-[2px]"></div>
                  </div>
                  <span className="font-headline-lg text-6xl font-black text-blue-400 tracking-tight z-10" style={{textShadow: '0 0 20px rgba(59,130,246,0.5)'}}>
                    {totalLiters.toFixed(1)}
                  </span>
                  <span className="text-blue-300 text-sm mt-1 uppercase tracking-wider font-bold z-10">Liters / Day</span>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-surface-container/60 rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center">
                  <span className="text-text-secondary text-xs uppercase tracking-widest mb-1">Ounces</span>
                  <span className="font-headline-md text-3xl font-bold text-text-primary">{Math.round(totalOz)} oz</span>
                </div>
                <div className="bg-surface-container/60 rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center">
                  <span className="text-text-secondary text-xs uppercase tracking-widest mb-1">Cups (8oz)</span>
                  <span className="font-headline-md text-3xl font-bold text-text-primary">{Math.round(totalCups)} cups</span>
                </div>
             </div>

             <div className="mt-8 text-center text-sm text-text-secondary bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
               Drink a glass of water right when you wake up, before meals, and during exercise to easily hit this target.
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
