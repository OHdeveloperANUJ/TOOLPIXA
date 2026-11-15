'use client';

import React, { useState, useEffect } from 'react';
import { CATEGORIES, UnitCategory, Unit, COUNTRY_DEFAULTS, convertValue } from '../../utils/converterLogic';
import { ArrowLeftRight, Ruler, Scale, Thermometer, Square, Droplet, Info, Globe2 } from 'lucide-react';

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('Length');
  const [country, setCountry] = useState<string>('Global');
  
  const [fromUnit, setFromUnit] = useState<string>(CATEGORIES['Length'][2].id); // km
  const [toUnit, setToUnit] = useState<string>(CATEGORIES['Length'][6].id); // mi
  
  const [fromValue, setFromValue] = useState<string>('1');
  const [toValue, setToValue] = useState<string>('');

  useEffect(() => {
    // When category or country changes, apply defaults
    const defaults = COUNTRY_DEFAULTS[country] || COUNTRY_DEFAULTS['Global'];
    const catDefaults = defaults[category];
    if (catDefaults) {
      setFromUnit(catDefaults.from);
      setToUnit(catDefaults.to);
    } else {
      setFromUnit(CATEGORIES[category][0].id);
      setToUnit(CATEGORIES[category][1].id);
    }
  }, [category, country]);

  useEffect(() => {
    calculateConversion(fromValue, fromUnit, toUnit);
  }, [fromValue, fromUnit, toUnit]);

  const calculateConversion = (val: string, fUnitId: string, tUnitId: string) => {
    if (!val || isNaN(Number(val))) {
      setToValue('');
      return;
    }
    
    const fUnit = CATEGORIES[category].find(u => u.id === fUnitId);
    const tUnit = CATEGORIES[category].find(u => u.id === tUnitId);
    
    if (fUnit && tUnit) {
      const result = convertValue(Number(val), fUnit, tUnit, category);
      // Format to avoid long decimals but keep precision if small
      const formatted = Math.abs(result) < 0.0001 ? result.toExponential(4) : parseFloat(result.toFixed(6)).toString();
      setToValue(formatted);
    }
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(toValue);
  };

  const currentCategoryUnits = CATEGORIES[category];
  const activeFromUnit = currentCategoryUnits.find(u => u.id === fromUnit);
  const activeToUnit = currentCategoryUnits.find(u => u.id === toUnit);

  const CatIcon = (cat: string) => {
    switch (cat) {
      case 'Length': return <Ruler size={16} />;
      case 'Weight': return <Scale size={16} />;
      case 'Temperature': return <Thermometer size={16} />;
      case 'Area': return <Square size={16} />;
      default: return <Droplet size={16} />;
    }
  };

  return (
    <section className="space-y-8 animate-fade-in-up font-inter max-w-4xl mx-auto">
      <div className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
              <ArrowLeftRight className="text-indigo-500" /> Smart Unit Converter
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Seamlessly convert units with region-aware defaults.</p>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            {(Object.keys(COUNTRY_DEFAULTS) as string[]).map((c) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className={`px-4 py-2 rounded-lg font-bold text-xs transition-all duration-300 flex items-center gap-2 ${
                  country === c ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {c === 'Global' ? <Globe2 size={14}/> : c === 'US' ? '🇺🇸' : c === 'UK' ? '🇬🇧' : '🇮🇳'} {c}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap gap-2 mb-10">
          {(Object.keys(CATEGORIES) as UnitCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 border ${
                category === cat 
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400' 
                  : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {CatIcon(cat)}
              {cat}
            </button>
          ))}
        </div>

        {/* Converter Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          
          {/* FROM */}
          <div className="bg-slate-50 dark:bg-[#0A0A14] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 transition-all focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/10">
            <label className="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-widest uppercase mb-4 block">From</label>
            
            <div className="flex items-center gap-4">
              <input
                type="text"
                inputMode="decimal"
                value={fromValue}
                onChange={handleFromChange}
                className="w-full bg-transparent text-4xl text-slate-900 dark:text-white font-black outline-none placeholder:text-slate-300 dark:placeholder:text-slate-700"
                placeholder="0"
              />
              <select 
                value={fromUnit} 
                onChange={(e) => setFromUnit(e.target.value)}
                className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border-none rounded-xl px-4 py-3 outline-none appearance-none cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors pr-10 shrink-0"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '16px' }}
              >
                {currentCategoryUnits.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          {/* SWAP BUTTON */}
          <div className="flex justify-center -my-4 md:my-0 relative z-10">
            <button 
              onClick={swapUnits}
              className="h-14 w-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:scale-110 hover:rotate-180 transition-all duration-500 border-4 border-white dark:border-[#0f172a]"
              aria-label="Swap units"
            >
              <ArrowLeftRight size={20} />
            </button>
          </div>

          {/* TO */}
          <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl p-6 transition-all relative overflow-hidden">
            <label className="text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase mb-4 block">To (Result)</label>
            
            <div className="flex items-center gap-4">
              <div className="w-full bg-transparent text-4xl text-slate-900 dark:text-white font-black overflow-hidden text-ellipsis">
                {toValue || '0'}
              </div>
              <select 
                value={toUnit} 
                onChange={(e) => setToUnit(e.target.value)}
                className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 font-bold text-sm border-none rounded-xl px-4 py-3 outline-none appearance-none cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-800/60 transition-colors pr-10 shrink-0"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236366f1%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '16px' }}
              >
                {currentCategoryUnits.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Formula Explanation */}
        {fromValue && toValue && activeFromUnit && activeToUnit && (
           <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Info size={16} />
              </div>
              <div>
                <p className="text-slate-800 dark:text-slate-200 font-bold text-sm mb-1">
                  1 {activeFromUnit.name} is equal to {parseFloat((Number(toValue) / Number(fromValue)).toFixed(6))} {activeToUnit.name}.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Formula: Multiply the value by the conversion factor.
                </p>
              </div>
           </div>
        )}
      </div>
    </section>
  );
}


// Indian Example: Jitendra from Siliguri uses this tool to check variables.
