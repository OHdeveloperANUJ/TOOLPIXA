'use client';

import React, { useState } from 'react';
import { calculateHealthMetrics, BmiInputs } from '@/utils/bmiLogic';

export default function BmrCalculator() {
  const [inputs, setInputs] = useState<BmiInputs>({ heightCm: 170, weightKg: 70, age: 25, gender: 'male', activityLevel: 1.2 });
  const result = calculateHealthMetrics(inputs);
  const updateInput = (f: keyof BmiInputs, v: any) => setInputs(p => ({ ...p, [f]: v }));

  return (
    <div className="min-h-screen bg-[#050505] p-4 md:p-8 font-[Inter] text-slate-300 selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 shadow-2xl shadow-black/50">
            <h2 className="font-[Outfit] text-3xl font-black text-white mb-8 tracking-tight">Metabolic Engine</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3 block">Gender</label>
                <div className="flex gap-4">
                  <button onClick={() => updateInput('gender', 'male')} className={`flex-1 py-4 rounded-2xl font-bold transition-all duration-300 ${inputs.gender === 'male' ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10'}`}>MALE</button>
                  <button onClick={() => updateInput('gender', 'female')} className={`flex-1 py-4 rounded-2xl font-bold transition-all duration-300 ${inputs.gender === 'female' ? 'bg-purple-500/20 border border-purple-400/50 text-purple-300 shadow-[0_0_20px_rgba(192,38,211,0.2)]' : 'bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10'}`}>FEMALE</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Age</label>
                   <input type="number" value={inputs.age} onChange={e => updateInput('age', parseInt(e.target.value)||0)} className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white text-lg focus:border-cyan-400/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)] outline-none transition-all duration-300"/>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Height (cm)</label>
                   <input type="number" value={inputs.heightCm} onChange={e => updateInput('heightCm', parseInt(e.target.value)||0)} className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white text-lg focus:border-cyan-400/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)] outline-none transition-all duration-300"/>
                 </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex justify-between">
                  <span>Weight (kg)</span>
                  <span className="text-cyan-400">{inputs.weightKg} kg</span>
                </label>
                <input type="range" min="40" max="150" value={inputs.weightKg} onChange={e => updateInput('weightKg', parseInt(e.target.value))} className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer accent-cyan-400"/>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Activity Matrix</label>
                <select value={inputs.activityLevel} onChange={e => updateInput('activityLevel', parseFloat(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white text-lg focus:border-cyan-400/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)] outline-none transition-all duration-300 appearance-none">
                  <option value={1.2}>Level 1: Sedentary</option>
                  <option value={1.375}>Level 2: Lightly Active</option>
                  <option value={1.55}>Level 3: Moderately Active</option>
                  <option value={1.725}>Level 4: Very Active</option>
                  <option value={1.9}>Level 5: Elite Athlete</option>
                </select>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl px-8 py-5 font-bold tracking-widest uppercase text-white hover:shadow-[0_0_40px_rgba(56,189,248,0.4)] transition-all duration-500 hover:scale-[1.02] active:scale-95 border border-white/20">
                Calibrate Output
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Output */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 lg:p-12 shadow-2xl shadow-cyan-500/10 flex-1 relative overflow-hidden group">
            {/* Glowing orb background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] opacity-50 group-hover:opacity-80 transition-opacity duration-1000 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-center items-center text-center">
              <span className="text-cyan-400 font-bold tracking-[0.2em] text-sm uppercase mb-6">Total Daily Energy Expenditure</span>
              
              <div className="mb-12 relative">
                <span className="font-[Outfit] text-8xl md:text-[140px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)] leading-none block">
                  {result?.tdee || 0}
                </span>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-cyan-300/60 font-bold tracking-widest text-lg">KCAL / DAY</span>
              </div>

              <div className="w-full max-w-4xl bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex justify-between items-center mt-8 hover:border-purple-500/30 transition-colors duration-500">
                <div className="text-left">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">Basal Metabolic Rate</span>
                  <span className="text-purple-400 font-[Outfit] text-3xl font-black">{result?.bmr || 0}</span>
                </div>
                <div className="h-12 w-px bg-white/10"></div>
                <div className="text-right">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">Activity Delta</span>
                  <span className="text-blue-400 font-[Outfit] text-3xl font-black">+{(result?.tdee || 0) - (result?.bmr || 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
