'use client';

import React, { useState } from 'react';

export default function WordsToPagesConverter() {
  const [words, setWords] = useState<number | ''>('');
  const [spacing, setSpacing] = useState<number>(1);
  const [fontSize, setFontSize] = useState<number>(12);

  const baseWordsPerPage = 500;
  
  const calculatePages = () => {
    if (words === '' || words === 0) return 0;
    let wordsPerPage = baseWordsPerPage / spacing;
    wordsPerPage = wordsPerPage * Math.pow(12 / fontSize, 2);
    return Number(words) / wordsPerPage;
  };

  const pages = calculatePages();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up font-inter">
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-[0_0_30px_-10px_rgba(59,130,246,0.1)] relative">
          <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <h2 className="text-xl font-bold text-white mb-8 tracking-wide">Document Metrics</h2>

          <div className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">Word Count</label>
              <input 
                type="number" 
                value={words}
                onChange={(e) => setWords(e.target.value ? Number(e.target.value) : '')}
                placeholder="1500"
                className="w-full bg-black/40 border-b-2 border-white/10 py-4 px-4 text-white text-3xl font-outfit focus:outline-none focus:border-cyan-400 focus:bg-cyan-400/5 transition-all rounded-t-lg"
              />
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <label className="text-xs font-bold text-purple-400 uppercase tracking-widest block">Line Spacing</label>
              <div className="flex gap-4">
                {[1, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpacing(s)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${spacing === s ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-black/30 border-white/5 text-white/50 hover:bg-white/5 hover:text-white/80'}`}
                  >
                    {s === 1 ? 'Single' : s === 1.5 ? '1.5' : 'Double'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <label className="text-xs font-bold text-blue-400 uppercase tracking-widest block">Font Size (pt)</label>
              <div className="flex gap-4">
                {[10, 11, 12, 14].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${fontSize === size ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-black/30 border-white/5 text-white/50 hover:bg-white/5 hover:text-white/80'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="bg-[#05080f]/90 backdrop-blur-3xl p-10 rounded-3xl sticky top-24 border border-white/10 shadow-[0_0_50px_-15px_rgba(34,211,238,0.2)] flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none"></div>
          
          <h3 className="text-white/50 tracking-[0.2em] uppercase text-xs mb-8 font-semibold z-10">Pages Output</h3>
          
          <div className="font-outfit text-8xl font-bold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] z-10">
            {pages > 0 ? pages.toFixed(1) : '0.0'}
          </div>
          
          <p className="text-cyan-400/80 text-sm mt-8 z-10 text-center max-w-[200px] font-medium">
            Calculated for standard academic margins.
          </p>

          <button className="mt-10 w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] z-10">
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
}
