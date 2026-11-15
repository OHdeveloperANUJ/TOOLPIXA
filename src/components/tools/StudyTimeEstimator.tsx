'use client';

import React, { useState } from 'react';

export default function StudyTimeEstimator() {
  const [pages, setPages] = useState<number | ''>('');
  const [words, setWords] = useState<number | ''>('');
  const [topics, setTopics] = useState<number | ''>('');

  const pagesTime = (Number(pages) || 0) * 3; // 3 mins per page
  const wordsTime = ((Number(words) || 0) / 100) * 15; // 15 mins per 100 words
  const topicsTime = (Number(topics) || 0) * 45; // 45 mins per topic

  const totalMinutes = pagesTime + wordsTime + topicsTime;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up font-inter">
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-[0_0_30px_-10px_rgba(168,85,247,0.1)] relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <h2 className="text-xl font-bold text-white mb-8 tracking-wide">Workload Parameters</h2>

          <div className="space-y-6 relative z-10">
            <div className="group">
              <label className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-purple-400 uppercase tracking-widest">Reading (Pages)</span>
                <span className="text-xs text-white/40">~3 min / page</span>
              </label>
              <input 
                type="number" 
                value={pages}
                onChange={(e) => setPages(e.target.value ? Number(e.target.value) : '')}
                placeholder="0"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-white text-xl font-outfit focus:outline-none focus:border-purple-400 focus:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all"
              />
            </div>

            <div className="group">
              <label className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Writing (Words)</span>
                <span className="text-xs text-white/40">~15 min / 100 words</span>
              </label>
              <input 
                type="number" 
                value={words}
                onChange={(e) => setWords(e.target.value ? Number(e.target.value) : '')}
                placeholder="0"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-white text-xl font-outfit focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all"
              />
            </div>

            <div className="group">
              <label className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-blue-400 uppercase tracking-widest">Review (Topics)</span>
                <span className="text-xs text-white/40">~45 min / topic</span>
              </label>
              <input 
                type="number" 
                value={topics}
                onChange={(e) => setTopics(e.target.value ? Number(e.target.value) : '')}
                placeholder="0"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-white text-xl font-outfit focus:outline-none focus:border-blue-400 focus:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="bg-[#05080f]/90 backdrop-blur-3xl p-10 rounded-3xl sticky top-24 border border-white/10 shadow-[0_0_50px_-15px_rgba(34,211,238,0.2)] flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 pointer-events-none"></div>
          
          <h3 className="text-white/50 tracking-[0.2em] uppercase text-xs mb-8 font-semibold z-10">Time Estimate</h3>
          
          <div className="font-outfit text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)] z-10 flex items-baseline gap-2 mb-10">
            {hours > 0 && (
              <>
                <span>{hours}</span><span className="text-3xl text-white/40 font-inter">h</span>
              </>
            )}
            <span>{minutes}</span><span className="text-3xl text-white/40 font-inter">m</span>
          </div>

          <div className="w-full space-y-3 z-10">
            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5">
              <span className="text-white/60 text-sm">Reading</span>
              <span className="font-bold text-purple-300 font-outfit text-lg">{Math.round(pagesTime)} m</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5">
              <span className="text-white/60 text-sm">Writing</span>
              <span className="font-bold text-cyan-300 font-outfit text-lg">{Math.round(wordsTime)} m</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5">
              <span className="text-white/60 text-sm">Reviewing</span>
              <span className="font-bold text-blue-300 font-outfit text-lg">{Math.round(topicsTime)} m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// Indian Example: Vinay from Ulhasnagar uses this tool to check variables.
