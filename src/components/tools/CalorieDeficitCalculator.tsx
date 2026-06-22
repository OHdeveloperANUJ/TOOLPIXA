'use client';

import React, { useState } from 'react';

export default function CalorieDeficitCalculator() {
  const [tdee, setTdee] = useState<number>(2500);
  const [goal, setGoal] = useState<'cut' | 'bulk'>('cut');
  const [deficit, setDeficit] = useState<number>(500);
  
  const target = goal === 'cut' ? tdee - deficit : tdee + deficit;
  const p = Math.round((target * 0.3) / 4);
  const f = Math.round((target * 0.3) / 9);
  const c = Math.round((target * 0.4) / 4);

  return (
    <div className="min-h-screen bg-[#050505] p-4 md:p-8 font-[Inter] text-slate-300 selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 shadow-2xl shadow-black/50">
            <h2 className="font-[Outfit] text-3xl font-black text-white mb-8 tracking-tight">Phase Architect</h2>
            
            <div className="space-y-8">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Baseline (TDEE)</label>
                <div className="relative">
                  <input type="number" value={tdee} onChange={e => setTdee(parseInt(e.target.value)||0)} className="w-full bg-black/50 border border-white/10 rounded-2xl pl-6 pr-20 py-4 text-white text-2xl font-[Outfit] font-bold focus:border-purple-400/50 focus:shadow-[0_0_20px_rgba(168,85,247,0.2)] outline-none transition-all duration-300"/>
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold tracking-widest">KCAL</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 block">Protocol</label>
                <div className="flex gap-4 p-2 bg-black/40 rounded-2xl border border-white/5">
                  <button onClick={() => setGoal('cut')} className={`flex-1 py-4 rounded-xl font-bold tracking-wider transition-all duration-300 ${goal === 'cut' ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'text-slate-500 hover:text-slate-300'}`}>SHRED</button>
                  <button onClick={() => setGoal('bulk')} className={`flex-1 py-4 rounded-xl font-bold tracking-wider transition-all duration-300 ${goal === 'bulk' ? 'bg-rose-500/20 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]' : 'text-slate-500 hover:text-slate-300'}`}>MASS</button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex justify-between">
                  <span>Aggression (Pace)</span>
                  <span className="text-white">{deficit} kcal</span>
                </label>
                <input type="range" min="100" max="1000" step="50" value={deficit} onChange={e => setDeficit(parseInt(e.target.value))} className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer accent-purple-400"/>
                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-widest">
                  <span>Mild</span>
                  <span>Extreme</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-rose-500 rounded-2xl px-8 py-5 font-bold tracking-widest uppercase text-white hover:shadow-[0_0_40px_rgba(217,70,239,0.4)] transition-all duration-500 hover:scale-[1.02] active:scale-95 border border-white/20">
                Initialize Protocol
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 lg:p-12 shadow-2xl shadow-purple-500/10 flex-1 relative overflow-hidden group">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-40 pointer-events-none transition-colors duration-1000 ${goal === 'cut' ? 'bg-cyan-500' : 'bg-rose-500'}`}></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              
              <div className="text-center mt-8">
                <span className="text-slate-400 font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Target Output</span>
                <span className={`font-[Outfit] text-8xl md:text-[120px] font-black text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] leading-none block ${goal === 'cut' ? 'bg-gradient-to-b from-white to-cyan-400' : 'bg-gradient-to-b from-white to-rose-400'}`}>
                  {target}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-16">
                <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col items-center">
                  <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px] mb-2">Protein</span>
                  <span className="font-[Outfit] text-4xl font-black text-white">{p}<span className="text-lg text-slate-500">g</span></span>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col items-center">
                  <span className="text-purple-400 font-bold uppercase tracking-widest text-[10px] mb-2">Fats</span>
                  <span className="font-[Outfit] text-4xl font-black text-white">{f}<span className="text-lg text-slate-500">g</span></span>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col items-center">
                  <span className="text-rose-400 font-bold uppercase tracking-widest text-[10px] mb-2">Carbs</span>
                  <span className="font-[Outfit] text-4xl font-black text-white">{c}<span className="text-lg text-slate-500">g</span></span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
