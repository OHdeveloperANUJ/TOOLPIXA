'use client';

import React, { useState } from 'react';

export default function PercentageCalculator() {
  const [val1A, setVal1A] = useState<number | ''>('');
  const [val1B, setVal1B] = useState<number | ''>('');
  
  const [val2A, setVal2A] = useState<number | ''>('');
  const [val2B, setVal2B] = useState<number | ''>('');
  
  const [val3A, setVal3A] = useState<number | ''>('');
  const [val3B, setVal3B] = useState<number | ''>('');

  const res1 = (val1A !== '' && val1B !== '') ? ((Number(val1A) / 100) * Number(val1B)) : null;
  const res2 = (val2A !== '' && val2B !== '' && Number(val2B) !== 0) ? ((Number(val2A) / Number(val2B)) * 100) : null;
  const res3 = (val3A !== '' && val3B !== '' && Number(val3A) !== 0) ? (((Number(val3B) - Number(val3A)) / Number(val3A)) * 100) : null;

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in-up font-inter">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Module 1 */}
        <div className="bg-[#05080f]/90 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 shadow-[0_0_30px_-10px_rgba(34,211,238,0.1)] transition-all duration-500 flex flex-col justify-between group">
          <div>
            <h3 className="text-cyan-400 text-sm font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
              Percentage Of
            </h3>
            <div className="space-y-4">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="text-white/40 text-xs font-semibold mb-1 block">What is</label>
                  <input 
                    type="number" value={val1A} onChange={e => setVal1A(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-black/50 border-b border-white/10 focus:border-cyan-400 py-2 px-3 text-white font-outfit text-xl focus:outline-none focus:bg-cyan-400/5 transition-all rounded-t"
                  />
                </div>
                <span className="text-white/40 font-outfit text-xl pb-2">% of</span>
                <div className="flex-1">
                  <label className="text-white/40 text-xs font-semibold mb-1 block">Value</label>
                  <input 
                    type="number" value={val1B} onChange={e => setVal1B(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-black/50 border-b border-white/10 focus:border-cyan-400 py-2 px-3 text-white font-outfit text-xl focus:outline-none focus:bg-cyan-400/5 transition-all rounded-t"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 relative">
            <span className="text-white/30 text-xs uppercase tracking-wider block mb-2">Outcome</span>
            <div className="font-outfit text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:text-cyan-100 transition-colors">
              {res1 !== null ? res1.toFixed(2) : '--'}
            </div>
          </div>
        </div>

        {/* Module 2 */}
        <div className="bg-[#05080f]/90 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 shadow-[0_0_30px_-10px_rgba(168,85,247,0.1)] transition-all duration-500 flex flex-col justify-between group">
          <div>
            <h3 className="text-purple-400 text-sm font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
              Find Percentage
            </h3>
            <div className="space-y-4">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="text-white/40 text-xs font-semibold mb-1 block">Value</label>
                  <input 
                    type="number" value={val2A} onChange={e => setVal2A(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-black/50 border-b border-white/10 focus:border-purple-400 py-2 px-3 text-white font-outfit text-xl focus:outline-none focus:bg-purple-400/5 transition-all rounded-t"
                  />
                </div>
                <span className="text-white/40 font-outfit text-xl pb-2">is what % of</span>
                <div className="flex-1">
                  <label className="text-white/40 text-xs font-semibold mb-1 block">Total</label>
                  <input 
                    type="number" value={val2B} onChange={e => setVal2B(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-black/50 border-b border-white/10 focus:border-purple-400 py-2 px-3 text-white font-outfit text-xl focus:outline-none focus:bg-purple-400/5 transition-all rounded-t"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 relative">
            <span className="text-white/30 text-xs uppercase tracking-wider block mb-2">Outcome</span>
            <div className="font-outfit text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:text-purple-100 transition-colors">
              {res2 !== null ? res2.toFixed(2) + '%' : '--'}
            </div>
          </div>
        </div>

        {/* Module 3 */}
        <div className="bg-[#05080f]/90 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 hover:border-blue-500/50 shadow-[0_0_30px_-10px_rgba(59,130,246,0.1)] transition-all duration-500 flex flex-col justify-between group">
          <div>
            <h3 className="text-blue-400 text-sm font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
              Percent Change
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <label className="text-white/40 text-xs font-semibold w-12">From</label>
                  <input 
                    type="number" value={val3A} onChange={e => setVal3A(e.target.value ? Number(e.target.value) : '')}
                    className="flex-1 bg-black/50 border-b border-white/10 focus:border-blue-400 py-2 px-3 text-white font-outfit text-xl focus:outline-none focus:bg-blue-400/5 transition-all rounded-t"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-white/40 text-xs font-semibold w-12">To</label>
                  <input 
                    type="number" value={val3B} onChange={e => setVal3B(e.target.value ? Number(e.target.value) : '')}
                    className="flex-1 bg-black/50 border-b border-white/10 focus:border-blue-400 py-2 px-3 text-white font-outfit text-xl focus:outline-none focus:bg-blue-400/5 transition-all rounded-t"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 relative">
            <span className="text-white/30 text-xs uppercase tracking-wider block mb-2">Outcome</span>
            <div className={`font-outfit text-5xl font-bold transition-colors ${res3 !== null && res3 < 0 ? 'text-rose-400 drop-shadow-[0_0_15px_rgba(251,113,133,0.4)]' : res3 !== null && res3 > 0 ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]' : 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'}`}>
              {res3 !== null ? (res3 > 0 ? '+' : '') + res3.toFixed(2) + '%' : '--'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
