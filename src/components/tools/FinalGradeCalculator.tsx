'use client';

import React, { useState } from 'react';

export default function FinalGradeCalculator() {
  const [currentGrade, setCurrentGrade] = useState<number | ''>('');
  const [targetGrade, setTargetGrade] = useState<number | ''>('');
  const [finalWeight, setFinalWeight] = useState<number | ''>('');

  const calculateRequired = () => {
    if (currentGrade === '' || targetGrade === '' || finalWeight === '') return null;
    if (finalWeight === 0) return null;
    const current = Number(currentGrade);
    const target = Number(targetGrade);
    const weight = Number(finalWeight) / 100;
    return (target - current * (1 - weight)) / weight;
  };

  const requiredGrade = calculateRequired();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up font-inter">
      {/* Target Outcome Section - Massive Glowing Result */}
      <div className="bg-[#05080f]/80 backdrop-blur-3xl rounded-3xl p-12 border border-white/10 shadow-[0_0_50px_-10px_rgba(34,211,238,0.15)] relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>
        <h3 className="text-white/60 tracking-[0.2em] uppercase text-sm mb-6 font-semibold z-10">Target Outcome</h3>
        
        <div className="font-outfit text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)] z-10 flex items-baseline">
          {requiredGrade !== null ? requiredGrade.toFixed(1) : '--'}
          <span className="text-4xl md:text-5xl ml-2 text-cyan-400">%</span>
        </div>
        
        <p className="text-white/40 mt-6 text-sm max-w-4xl text-center z-10">
          Required score on your final exam to achieve your target class grade.
        </p>
      </div>

      {/* Inputs Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
          <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3 group-hover:text-cyan-300 transition-colors">Current Grade (%)</label>
          <input 
            type="number" 
            value={currentGrade}
            onChange={(e) => setCurrentGrade(e.target.value ? Number(e.target.value) : '')}
            placeholder="85"
            className="w-full bg-black/40 border-b-2 border-white/10 py-3 px-4 text-white text-xl font-outfit focus:outline-none focus:border-cyan-400 focus:bg-cyan-900/10 transition-all rounded-t-lg"
          />
        </div>
        
        <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
          <label className="block text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 group-hover:text-purple-300 transition-colors">Target Grade (%)</label>
          <input 
            type="number" 
            value={targetGrade}
            onChange={(e) => setTargetGrade(e.target.value ? Number(e.target.value) : '')}
            placeholder="90"
            className="w-full bg-black/40 border-b-2 border-white/10 py-3 px-4 text-white text-xl font-outfit focus:outline-none focus:border-purple-400 focus:bg-purple-900/10 transition-all rounded-t-lg"
          />
        </div>
        
        <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
          <label className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 group-hover:text-blue-300 transition-colors">Final Weight (%)</label>
          <input 
            type="number" 
            value={finalWeight}
            onChange={(e) => setFinalWeight(e.target.value ? Number(e.target.value) : '')}
            placeholder="20"
            className="w-full bg-black/40 border-b-2 border-white/10 py-3 px-4 text-white text-xl font-outfit focus:outline-none focus:border-blue-400 focus:bg-blue-900/10 transition-all rounded-t-lg"
          />
        </div>
      </div>
    </div>
  );
}
