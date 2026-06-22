'use client';

import React, { useState } from 'react';

export default function MacroNutrientCalculator() {
  const [targetCalories, setTarget] = useState<number>(2000);
  const [diet, setDiet] = useState<'balanced' | 'keto' | 'high-protein'>('balanced');
  
  const dietMacros = {
    'balanced': { p: 30, f: 30, c: 40 },
    'high-protein': { p: 40, f: 30, c: 30 },
    'keto': { p: 20, f: 75, c: 5 },
  };

  const plan = dietMacros[diet];
  const pGrams = Math.round((targetCalories * (plan.p / 100)) / 4);
  const fGrams = Math.round((targetCalories * (plan.f / 100)) / 9);
  const cGrams = Math.round((targetCalories * (plan.c / 100)) / 4);

  return (
    <div className="min-h-screen bg-[#030712] p-4 md:p-8 font-[Inter] text-slate-300 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 shadow-2xl shadow-black/50">
            <h2 className="font-[Outfit] text-3xl font-black text-white mb-8 tracking-tight">Macro Synthesizer</h2>
            
            <div className="space-y-8">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Energy Payload (KCAL)</label>
                <input type="number" value={targetCalories} onChange={e => setTarget(parseInt(e.target.value)||0)} className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-5 text-white text-2xl font-[Outfit] font-bold focus:border-blue-400/50 focus:shadow-[0_0_20px_rgba(59,130,246,0.2)] outline-none transition-all duration-300 text-center"/>
              </div>

              <div>
                <label className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 block">Configuration</label>
                <div className="space-y-3">
                  <button onClick={() => setDiet('balanced')} className={`w-full py-4 rounded-xl font-bold tracking-wider transition-all duration-300 border ${diet === 'balanced' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-black/30 border-white/5 text-slate-500 hover:border-white/20'}`}>BALANCED (30/30/40)</button>
                  <button onClick={() => setDiet('high-protein')} className={`w-full py-4 rounded-xl font-bold tracking-wider transition-all duration-300 border ${diet === 'high-protein' ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-black/30 border-white/5 text-slate-500 hover:border-white/20'}`}>HIGH PROTEIN (40/30/30)</button>
                  <button onClick={() => setDiet('keto')} className={`w-full py-4 rounded-xl font-bold tracking-wider transition-all duration-300 border ${diet === 'keto' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-black/30 border-white/5 text-slate-500 hover:border-white/20'}`}>KETOGENIC (20/75/5)</button>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-8 py-5 font-bold tracking-widest uppercase text-white hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all duration-500 hover:scale-[1.02] active:scale-95 border border-white/20">
                Synthesize Macros
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 lg:p-12 shadow-2xl shadow-blue-500/10 flex-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-center space-y-8">
              
              <div className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" style={{width: `${plan.p}%`}}></div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm block mb-1">Protein Sequence</span>
                    <span className="text-slate-400 text-xs">{plan.p}% Target</span>
                  </div>
                  <span className="font-[Outfit] text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">{pGrams}g</span>
                </div>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-indigo-400 shadow-[0_0_10px_#818cf8]" style={{width: `${plan.f}%`}}></div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm block mb-1">Fat Sequence</span>
                    <span className="text-slate-400 text-xs">{plan.f}% Target</span>
                  </div>
                  <span className="font-[Outfit] text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(129,140,248,0.3)]">{fGrams}g</span>
                </div>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-emerald-400 shadow-[0_0_10px_#34d399]" style={{width: `${plan.c}%`}}></div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm block mb-1">Carb Sequence</span>
                    <span className="text-slate-400 text-xs">{plan.c}% Target</span>
                  </div>
                  <span className="font-[Outfit] text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">{cGrams}g</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
