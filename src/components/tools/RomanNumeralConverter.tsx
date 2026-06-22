'use client';

import React, { useState, useEffect } from 'react';
import { Type, RefreshCw } from 'lucide-react';

const RomanNumeralConverter: React.FC = () => {
  const [mode, setMode] = useState<'toRoman' | 'toInteger'>('toRoman');
  const [inputValue, setInputValue] = useState<string>('');
  const [outputValue, setOutputValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const intToRoman = (num: number): string => {
    if (num <= 0 || num > 3999) return '';
    const romanMap: [number, string][] = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    let result = '';
    for (const [val, symbol] of romanMap) {
      while (num >= val) {
        result += symbol;
        num -= val;
      }
    }
    return result;
  };

  const romanToInt = (s: string): number => {
    const romanMap: Record<string, number> = {
      M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1
    };
    let result = 0;
    for (let i = 0; i < s.length; i++) {
      const current = romanMap[s[i]];
      const next = romanMap[s[i + 1]];
      if (current === undefined) return -1;
      
      if (next && current < next) {
        result -= current;
      } else {
        result += current;
      }
    }
    return result;
  };

  const isValidRoman = (s: string): boolean => {
    const regex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
    return regex.test(s);
  };

  useEffect(() => {
    setError('');
    if (!inputValue) {
      setOutputValue('');
      return;
    }

    if (mode === 'toRoman') {
      const num = parseInt(inputValue, 10);
      if (isNaN(num)) {
        setError('Please enter a valid number');
        setOutputValue('');
      } else if (num <= 0 || num > 3999) {
        setError('Number must be between 1 and 3999');
        setOutputValue('');
      } else {
        setOutputValue(intToRoman(num));
      }
    } else {
      const upperRoman = inputValue.toUpperCase();
      if (!isValidRoman(upperRoman)) {
        setError('Invalid Roman numeral');
        setOutputValue('');
      } else {
        const num = romanToInt(upperRoman);
        if (num === -1) {
          setError('Invalid Roman numeral');
          setOutputValue('');
        } else {
          setOutputValue(num.toString());
        }
      }
    }
  }, [inputValue, mode]);

  const handleSwap = () => {
    setMode(mode === 'toRoman' ? 'toInteger' : 'toRoman');
    setInputValue(outputValue);
  };

  return (
    <div className="glass-card p-6 rounded-2xl max-w-4xl mx-auto animate-fade-in w-full text-left">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
          <Type size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white">Roman Numeral Converter</h2>
      </div>

      <div className="flex items-center justify-between mb-6 p-1 bg-slate-800/50 rounded-xl border border-slate-700/50">
        <button
          onClick={() => { setMode('toRoman'); setInputValue(''); }}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${mode === 'toRoman' ? 'bg-purple-500/20 text-purple-400 shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'}`}
        >
          Integer to Roman
        </button>
        <button
          onClick={() => { setMode('toInteger'); setInputValue(''); }}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${mode === 'toInteger' ? 'bg-purple-500/20 text-purple-400 shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'}`}
        >
          Roman to Integer
        </button>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <label className="text-sm font-medium text-slate-300 block mb-2">
            {mode === 'toRoman' ? 'Enter Integer (1-3999)' : 'Enter Roman Numeral'}
          </label>
          <input
            type={mode === 'toRoman' ? 'number' : 'text'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`w-full bg-slate-800/50 border ${error ? 'border-red-500/50 focus:ring-red-500/50' : 'border-slate-700/50 focus:ring-purple-500/50'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all text-lg font-medium`}
            placeholder={mode === 'toRoman' ? 'e.g. 2024' : 'e.g. MMXXIV'}
          />
          {error && <p className="text-red-400 text-xs mt-2 absolute -bottom-5 left-1">{error}</p>}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 hover:text-white transition-all group"
            title="Swap conversion"
            disabled={!!error || !inputValue}
          >
            <RefreshCw size={20} className={`transition-transform duration-300 ${(!error && inputValue) ? 'group-hover:rotate-180' : 'opacity-50 cursor-not-allowed'}`} />
          </button>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300 block mb-2">Result</label>
          <div className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-4 min-h-[60px] flex items-center justify-center">
            {outputValue ? (
              <span className="text-3xl font-bold tracking-wider bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {outputValue}
              </span>
            ) : (
              <span className="text-slate-600 italic">Result will appear here</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RomanNumeralConverter;
