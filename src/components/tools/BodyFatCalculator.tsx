'use client';

import React, { useState } from 'react';

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [neck, setNeck] = useState<number>(38);
  const [waist, setWaist] = useState<number>(85);
  const [hip, setHip] = useState<number>(100);

  const wKg = weight;
  const hCm = height;
  const nCm = neck;
  const waistCm = waist;
  const hipCm = hip;

  let bfPercent = 0;
  if (hCm > 0 && nCm > 0 && waistCm > 0) {
    if (gender === 'male' && waistCm > nCm) {
      bfPercent = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - nCm) + 0.15456 * Math.log10(hCm)) - 450;
    } else if (gender === 'female' && (waistCm + hipCm > nCm)) {
      bfPercent = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - nCm) + 0.22100 * Math.log10(hCm)) - 450;
    }
  }

  bfPercent = Math.max(0, Math.min(100, bfPercent));
  const fatMass = wKg * (bfPercent / 100);
  const leanMass = wKg - fatMass;

  return (
    <div className="min-h-screen bg-[#050505] p-4 md:p-8 font-[Inter] text-slate-300 selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 shadow-2xl shadow-black/50">
            <h2 className="font-[Outfit] text-3xl font-black text-white mb-8 tracking-tight">Biometric Scanner</h2>
            
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Subject Gender</label>
                <div className="flex gap-4">
                  <button onClick={() => setGender('male')} className={`flex-1 py-3 rounded-xl font-bold tracking-wider transition-all duration-300 ${gender === 'male' ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-black/30 border border-white/5 text-slate-500'}`}>MALE</button>
                  <button onClick={() => setGender('female')} className={`flex-1 py-3 rounded-xl font-bold tracking-wider transition-all duration-300 ${gender === 'female' ? 'bg-rose-500/20 border border-rose-400/50 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]' : 'bg-black/30 border border-white/5 text-slate-500'}`}>FEMALE</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Weight (kg)</label>
                   <input type="number" value={weight} onChange={e => setWeight(parseFloat(e.target.value)||0)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-400/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)] outline-none transition-all"/>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Height (cm)</label>
                   <input type="number" value={height} onChange={e => setHeight(parseFloat(e.target.value)||0)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-400/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)] outline-none transition-all"/>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Neck (cm)</label>
                   <input type="number" value={neck} onChange={e => setNeck(parseFloat(e.target.value)||0)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-400/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)] outline-none transition-all"/>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Waist (cm)</label>
                   <input type="number" value={waist} onChange={e => setWaist(parseFloat(e.target.value)||0)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-400/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)] outline-none transition-all"/>
                 </div>
              </div>

              {gender === 'female' && (
                <div>
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Hip (cm)</label>
                   <input type="number" value={hip} onChange={e => setHip(parseFloat(e.target.value)||0)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-400/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)] outline-none transition-all"/>
                </div>
              )}

              <button className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl px-8 py-4 font-bold tracking-widest uppercase text-white hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-500 hover:scale-[1.02] active:scale-95 border border-white/20">
                Scan Composition
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 lg:p-12 shadow-2xl shadow-emerald-500/10 flex-1 relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-center items-center text-center">
              
              <div className="mb-16">
                <span className="text-emerald-400 font-bold tracking-[0.3em] text-sm uppercase mb-4 block">Body Fat Ratio</span>
                <span className="font-[Outfit] text-8xl md:text-[140px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.3)] leading-none block">
                  {bfPercent.toFixed(1)}<span className="text-6xl text-emerald-500">%</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
                <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                  <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-2 block">Lean Mass</span>
                  <span className="font-[Outfit] text-4xl font-black text-white">{leanMass.toFixed(1)}<span className="text-sm text-slate-500 ml-1">kg</span></span>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                  <span className="text-rose-400 font-bold uppercase tracking-widest text-xs mb-2 block">Fat Mass</span>
                  <span className="font-[Outfit] text-4xl font-black text-white">{fatMass.toFixed(1)}<span className="text-sm text-slate-500 ml-1">kg</span></span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


// Indian Example: Diya from Pune uses this tool to check variables.
