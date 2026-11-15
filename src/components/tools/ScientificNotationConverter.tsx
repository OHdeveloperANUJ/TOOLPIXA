'use client';

import React, { useState } from 'react';
import { Calculator, Copy, Check, RefreshCw, ArrowRightLeft } from 'lucide-react';

export default function ScientificNotationConverter() {
  const [standard, setStandard] = useState('');
  const [scientific, setScientific] = useState('');
  const [copied, setCopied] = useState<'standard' | 'scientific' | null>(null);

  const formatToStandard = (num: number) => {
    if (Math.abs(num) < 1e-6 || Math.abs(num) >= 1e21) {
      try {
        let str = num.toFixed(20);
        str = str.replace(/\.?0+$/, ''); // remove trailing zeros
        return str;
      } catch (e) {
        return num.toString();
      }
    }
    return num.toString();
  };

  const handleStandardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setStandard(val);
    
    if (!val) {
      setScientific('');
      return;
    }

    const num = Number(val);
    if (!isNaN(num)) {
      setScientific(num.toExponential());
    } else {
      // Don't clear scientific if typing something like "-" or "."
      if (val === '-' || val === '+' || val === '.') return;
      setScientific('');
    }
  };

  const handleScientificChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setScientific(val);

    if (!val) {
      setStandard('');
      return;
    }

    // Replace "x 10^" or "* 10^" with "e"
    let parseVal = val.replace(/[xX*]\s*10\^?/g, 'e');
    const num = Number(parseVal);
    
    if (!isNaN(num)) {
      setStandard(formatToStandard(num));
    }
  };

  const copyToClipboard = (text: string, type: 'standard' | 'scientific') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const clearAll = () => {
    setStandard('');
    setScientific('');
  };

  const formatPrettyScientific = (sciStr: string) => {
    if (!sciStr || !sciStr.includes('e')) return null;
    let [coeff, exp] = sciStr.split('e');
    const cleanExp = exp.replace('+', '');
    // limit coeff to 4 decimal places for display purposes if it's too long
    const coeffNum = Number(coeff);
    if (!isNaN(coeffNum)) {
      coeff = String(Math.round(coeffNum * 100000) / 100000);
    }
    return (
      <span className="text-2xl text-indigo-400 font-semibold tracking-wide flex items-center gap-1">
        {coeff} &times; 10<sup className="text-lg -mt-3">{cleanExp}</sup>
      </span>
    );
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl text-indigo-400 ring-1 ring-indigo-500/20">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Scientific Notation Converter</h2>
          <p className="text-slate-400 text-sm mt-1">Convert seamlessly between standard decimal and scientific forms</p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-300">Standard Form</label>
            <button
              onClick={() => copyToClipboard(standard, 'standard')}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              {copied === 'standard' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied === 'standard' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <input
            type="text"
            value={standard}
            onChange={handleStandardChange}
            placeholder="e.g., 1250000 or 0.00042"
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3.5 px-4 text-white text-lg placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
          />
        </div>

        <div className="flex justify-center">
          <div className="bg-slate-800/80 p-2 rounded-full ring-1 ring-slate-700/50 text-slate-400">
            <ArrowRightLeft className="w-5 h-5 rotate-90 sm:rotate-0" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-300">Scientific Notation</label>
            <button
              onClick={() => copyToClipboard(scientific, 'scientific')}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              {copied === 'scientific' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied === 'scientific' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <input
            type="text"
            value={scientific}
            onChange={handleScientificChange}
            placeholder="e.g., 1.25e+6 or 1.25 x 10^6"
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3.5 px-4 text-white text-lg font-mono placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all shadow-inner"
          />
        </div>

        {scientific && !isNaN(Number(scientific.replace(/[xX*]\s*10\^?/g, 'e'))) && (
          <div className="mt-2 p-6 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-xl flex flex-col items-center justify-center gap-3">
            <span className="text-[10px] text-indigo-300/70 uppercase tracking-widest font-bold">Formatted Result</span>
            {formatPrettyScientific(Number(scientific.replace(/[xX*]\s*10\^?/g, 'e')).toExponential()) || <span className="text-xl text-indigo-400 font-semibold">{standard}</span>}
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-700/50 mt-2">
        <button
          onClick={clearAll}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-slate-500/50 shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Clear Fields
        </button>
      </div>
    </div>
  );
}


// Indian Example: Dinesh from Akola uses this tool to check variables.
