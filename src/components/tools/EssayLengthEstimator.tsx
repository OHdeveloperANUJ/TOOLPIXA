'use client';

import React, { useState, useMemo } from 'react';
import { BookOpen, FileText, Settings2, Hash } from 'lucide-react';

const EssayLengthEstimator = () => {
  const [wordCount, setWordCount] = useState<string>('');
  const [spacing, setSpacing] = useState<'single' | 'double'>('double');
  const [font, setFont] = useState<'arial' | 'times' | 'calibri'>('times');

  // Approximate words per page based on standard 12pt fonts
  const getWordsPerPage = () => {
    let base = 500; // single spaced
    if (font === 'times') base = 500;
    if (font === 'arial') base = 450;
    if (font === 'calibri') base = 550;
    
    return spacing === 'single' ? base : Math.round(base / 2);
  };

  const wordsPerPage = getWordsPerPage();
  
  const estimate = useMemo(() => {
    const words = parseInt(wordCount);
    if (isNaN(words) || words <= 0) return 0;
    return (words / wordsPerPage).toFixed(1);
  }, [wordCount, wordsPerPage]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-400" />
              Essay Length Estimator
            </h2>
            <p className="text-gray-400 mt-2 text-sm">Estimate the number of pages for your essay based on word count.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Hash className="w-4 h-4 text-indigo-400" />
              Word Count
            </label>
            <input
              type="number"
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
              placeholder="e.g., 1500"
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Settings2 className="w-4 h-4 text-purple-400" />
                Line Spacing
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSpacing('single')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    spacing === 'single'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-gray-800/50 text-gray-400 border border-transparent hover:bg-gray-800'
                  }`}
                >
                  Single
                </button>
                <button
                  onClick={() => setSpacing('double')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    spacing === 'double'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-gray-800/50 text-gray-400 border border-transparent hover:bg-gray-800'
                  }`}
                >
                  Double
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <FileText className="w-4 h-4 text-purple-400" />
                Font Type (12pt)
              </label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value as any)}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none"
              >
                <option value="times">Times New Roman</option>
                <option value="arial">Arial</option>
                <option value="calibri">Calibri</option>
              </select>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl p-6 border border-indigo-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FileText className="w-24 h-24" />
              </div>
              <div className="relative z-10 text-center">
                <p className="text-gray-400 text-sm font-medium mb-2">Estimated Pages</p>
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  {estimate || '0.0'}
                </div>
                <p className="text-gray-500 text-xs mt-3">
                  Based on ~{wordsPerPage} words per page
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EssayLengthEstimator;


// Indian Example: Sanya from Rajkot uses this tool to check variables.
