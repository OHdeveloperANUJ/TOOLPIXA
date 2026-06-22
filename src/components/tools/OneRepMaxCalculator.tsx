'use client';

import React, { useState } from 'react';

export default function OneRepMaxCalculator() {
  const [weight, setWeight] = useState<number>(100);
  const [reps, setReps] = useState<number>(5);
  const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs');

  // Epley Formula
  const oneRmEpley = weight * (1 + (reps / 30));
  // Brzycki Formula
  const oneRmBrzycki = weight * (36 / (37 - reps));
  
  // Average
  let oneRm = (oneRmEpley + oneRmBrzycki) / 2;
  if (reps === 1) oneRm = weight;

  const percentages = [
    { p: 100, label: '100% (1RM)' },
    { p: 95, label: '95% (2RM)' },
    { p: 90, label: '90% (3-4RM)' },
    { p: 85, label: '85% (5-6RM)' },
    { p: 80, label: '80% (7-8RM)' },
    { p: 75, label: '75% (9-10RM)' },
    { p: 70, label: '70% (11-12RM)' },
    { p: 60, label: '60% (Endurance)' },
    { p: 50, label: '50% (Warmup)' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl animate-fade-in-up">
      {/* Inputs */}
      <div className="lg:col-span-5 space-y-xl">
        <div className="glass-card p-xl rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-center mb-lg">
            <h2 className="font-headline-md text-2xl text-text-primary">Your Lift</h2>
            <div className="bg-surface-container rounded-full p-1 flex">
              <button onClick={() => setUnit('lbs')} className={`px-4 py-1 rounded-full text-sm font-bold transition-colors ${unit === 'lbs' ? 'bg-primary text-background' : 'text-text-secondary'}`}>lbs</button>
              <button onClick={() => setUnit('kg')} className={`px-4 py-1 rounded-full text-sm font-bold transition-colors ${unit === 'kg' ? 'bg-primary text-background' : 'text-text-secondary'}`}>kg</button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
               <label className="text-sm font-bold text-text-secondary uppercase mb-2 block">Weight Lifted</label>
               <input type="number" value={weight} onChange={e => setWeight(parseFloat(e.target.value) || 0)} className="w-full bg-surface-container/50 border border-transparent focus:border-primary/50 rounded-xl py-3 px-4 text-text-primary focus:outline-none transition-all text-xl"/>
               <span className="text-xs text-text-secondary mt-1 block">The weight you successfully lifted</span>
            </div>

            <div>
               <div className="flex justify-between items-center mb-2">
                 <label className="text-sm font-bold text-text-secondary uppercase block">Reps Completed</label>
                 <span className="text-primary font-bold text-xl">{reps}</span>
               </div>
               <input type="range" min="1" max="15" value={reps} onChange={e => setReps(parseInt(e.target.value))} className="w-full accent-primary h-2 bg-surface-container rounded-lg appearance-none cursor-pointer"/>
               <span className="text-xs text-text-secondary mt-2 block">Calculations are most accurate for 1-10 reps.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="lg:col-span-7 relative">
        <div className="glass-card p-xl rounded-3xl sticky top-24 border border-primary/20 shadow-[0_0_50px_-10px_rgba(45,212,191,0.15)] overflow-hidden min-h-[500px] flex flex-col">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <h3 className="font-label-md text-text-secondary uppercase tracking-widest mb-6 text-center relative z-10">1RM Results</h3>
          
          {weight > 0 && reps > 0 ? (
            <div className="flex flex-col z-10 relative flex-1">
               <div className="bg-surface-container/60 rounded-3xl p-8 border border-primary/20 flex flex-col items-center justify-center mb-8 relative shadow-[0_0_30px_rgba(45,212,191,0.1)]">
                 <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4">
                   <span className="material-symbols-outlined">fitness_center</span>
                 </div>
                 <span className="text-primary text-sm uppercase tracking-widest mb-2 font-bold">Estimated 1 Rep Max</span>
                 <div className="font-headline-lg text-6xl font-black text-primary tracking-tight mb-2">
                   {Math.round(oneRm)}
                 </div>
                 <span className="text-text-secondary uppercase tracking-wider font-bold">{unit}</span>
               </div>

               <div className="bg-surface-container/50 rounded-2xl p-6 border border-white/5 flex-1">
                 <h4 className="text-text-primary font-bold mb-4 flex items-center gap-2">
                   <span className="material-symbols-outlined text-primary text-xl">view_list</span>
                   Weight Percentages
                 </h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   {percentages.map(item => (
                     <div key={item.p} className="flex justify-between items-center p-3 rounded-xl bg-surface-container border border-transparent hover:border-primary/30 transition-colors">
                        <span className="text-sm text-text-secondary font-bold">{item.label}</span>
                        <span className="font-black text-text-primary">
                          {Math.round(oneRm * (item.p / 100))} <span className="text-xs font-normal opacity-60">{unit}</span>
                        </span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12 opacity-50 z-10 flex-1">
              <span className="material-symbols-outlined text-6xl text-text-secondary">fitness_center</span>
              <p className="text-text-secondary font-body-md max-w-4xl">Enter your lift weight and reps to estimate your One Rep Max.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
