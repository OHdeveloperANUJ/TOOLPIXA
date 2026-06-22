'use client';

import React, { useState, useMemo } from 'react';
import { Clock, BookOpen, Type, Settings2 } from 'lucide-react';

export default function ReadTimeCalculator() {
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState(225);

  const stats = useMemo(() => {
    const textTrimmed = text.trim();
    const characters = text.length;
    const words = textTrimmed === '' ? 0 : textTrimmed.split(/\s+/).length;
    
    const minutesRaw = words / wpm;
    const minutes = Math.floor(minutesRaw);
    const seconds = Math.round((minutesRaw - minutes) * 60);

    return { words, characters, minutes, seconds };
  }, [text, wpm]);

  return (
    <section className="space-y-6 animate-fade-in-up font-inter max-w-4xl mx-auto h-full">
      <div className="glass-card flex flex-col rounded-3xl overflow-hidden shadow-2xl relative p-6">
        <header className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Read Time Calculator</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Estimate how long it will take to read your text</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Type size={16} /> Text Content
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your article or text here..."
              className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[200px] resize-y transition-all"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                <Settings2 size={16} /> Reading Speed
              </label>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">Slow</span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{wpm} WPM</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Fast</span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                step="5"
                value={wpm}
                onChange={(e) => setWpm(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-3">
                Average adult speed is 200-250 WPM
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-500/30 rounded-xl p-5 text-center">
              <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-1">Estimated Time</h3>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                {stats.minutes > 0 && <span>{stats.minutes}m </span>}
                <span>{stats.seconds}s</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">WORDS</div>
                <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{stats.words.toLocaleString()}</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">CHARS</div>
                <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{stats.characters.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
          <BookOpen size={20} className="text-emerald-500" /> About Read Time Calculator
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The read time is based on the average reading speed of an adult, which is typically between <strong>200 and 250 words per minute (WPM)</strong>.
          <br /><br />
          <strong>Formula:</strong> <code>Total Words ÷ Reading Speed (WPM) = Reading Time (minutes)</code>
          <br /><br />
          This estimator is useful for writers, bloggers, and content creators to provide their audience with a realistic expectation of how long an article will take to consume. Reading speeds vary by individual and the complexity of the text. Technical documentation, for example, is generally read much slower than a novel.
        </p>
      </div>
    </section>
  );
}
