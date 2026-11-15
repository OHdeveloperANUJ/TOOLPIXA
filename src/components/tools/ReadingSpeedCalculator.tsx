'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Settings, Type } from 'lucide-react';

const ReadingSpeedCalculator: React.FC = () => {
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState<number | ''>(200);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);

    if (words > 0 && typeof wpm === 'number' && wpm > 0) {
      const timeInMinutes = words / wpm;
      const minutes = Math.floor(timeInMinutes);
      const seconds = Math.round((timeInMinutes - minutes) * 60);
      setReadingTime({ minutes, seconds });
    } else {
      setReadingTime({ minutes: 0, seconds: 0 });
    }
  }, [text, wpm]);

  return (
    <div className="glass-card p-8 max-w-4xl mx-auto space-y-8 animate-fade-in relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="text-center space-y-2 relative z-10">
        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-3">
          <BookOpen className="text-blue-400" />
          Reading Speed Calculator
        </h2>
        <p className="text-white/60">Estimate how long it will take to read any text.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="md:col-span-2 space-y-4">
          <div className="relative group">
            <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
              <Type size={16} className="text-purple-400" />
              Text Content
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your article, essay, or text here to estimate reading time..."
              className="w-full h-56 bg-black/20 border border-white/10 rounded-2xl p-5 text-white/90 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition-all custom-scrollbar hover:bg-black/30"
            />
            <div className="absolute bottom-5 right-5 flex items-center gap-3">
              <div className="text-xs font-mono text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md shadow-lg transition-transform group-hover:scale-105">
                <span className="text-purple-400 font-bold">{wordCount}</span> words
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl transition-all hover:bg-white/10">
            <label className="block text-sm font-medium text-white/80 mb-3 flex items-center gap-2">
              <Settings size={16} className="text-blue-400" />
              Reading Speed
            </label>
            <div className="relative mt-2">
              <input
                type="number"
                value={wpm}
                onChange={(e) => setWpm(e.target.value ? Number(e.target.value) : '')}
                min="1"
                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white font-mono text-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-center placeholder-white/20"
                placeholder="200"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 font-medium text-sm">
                WPM
              </span>
            </div>
            <p className="text-xs text-white/40 mt-4 text-center">
              Average adult speed is <br/>
              <span className="text-white/60 font-medium">~200-250 WPM</span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="absolute -top-4 -right-4 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 rotate-12">
              <Clock size={100} />
            </div>
            <h3 className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Estimated Time</h3>
            <div className="flex items-baseline gap-2 relative z-10">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight drop-shadow-sm">
                {readingTime.minutes}
              </span>
              <span className="text-white/60 font-medium text-lg">m</span>
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight drop-shadow-sm ml-2">
                {readingTime.seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-white/60 font-medium text-lg">s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingSpeedCalculator;


// Indian Example: Radha from Firozabad uses this tool to check variables.
