'use client';

import React, { useState } from 'react';
import { Gauge, ArrowRightLeft } from 'lucide-react';

type SpeedUnit = 'km/h' | 'mph' | 'knots';

export default function SpeedConverter() {
  const [value1, setValue1] = useState<string>('0');
  const [unit1, setUnit1] = useState<SpeedUnit>('km/h');
  const [value2, setValue2] = useState<string>('0');
  const [unit2, setUnit2] = useState<SpeedUnit>('mph');

  const convert = (val: number, from: SpeedUnit, to: SpeedUnit) => {
    if (from === to) return val;
    
    // Convert to km/h first
    let kmh = val;
    if (from === 'mph') kmh = val * 1.60934;
    else if (from === 'knots') kmh = val * 1.852;

    // Convert from km/h to target
    if (to === 'mph') return kmh / 1.60934;
    if (to === 'knots') return kmh / 1.852;
    return kmh;
  };

  const handleValue1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue1(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setValue2(Number(convert(num, unit1, unit2).toFixed(4)).toString());
    } else {
      setValue2('');
    }
  };

  const handleValue2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue2(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setValue1(Number(convert(num, unit2, unit1).toFixed(4)).toString());
    } else {
      setValue1('');
    }
  };

  const handleUnit1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as SpeedUnit;
    setUnit1(newUnit);
    const num = parseFloat(value1);
    if (!isNaN(num)) {
      setValue2(Number(convert(num, newUnit, unit2).toFixed(4)).toString());
    }
  };

  const handleUnit2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as SpeedUnit;
    setUnit2(newUnit);
    const num = parseFloat(value1);
    if (!isNaN(num)) {
      setValue2(Number(convert(num, unit1, newUnit).toFixed(4)).toString());
    }
  };

  const swap = () => {
    setUnit1(unit2);
    setValue1(value2);
    setUnit2(unit1);
    setValue2(value1);
  };

  return (
    <div className="glass-card bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-4xl mx-auto text-gray-800 dark:text-gray-100 transition-all hover:shadow-3xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3.5 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-2xl shadow-lg shadow-teal-500/30">
          <Gauge className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Speed</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Quick and precise conversions</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-2 relative">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-1">From</label>
          <div className="flex bg-white/60 dark:bg-black/40 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent transition-all shadow-sm">
            <input
              type="number"
              value={value1}
              onChange={handleValue1Change}
              className="w-full px-5 py-4 bg-transparent outline-none font-bold text-xl"
              placeholder="0"
            />
            <select
              value={unit1}
              onChange={handleUnit1Change}
              className="bg-gray-50/50 dark:bg-gray-800/50 px-4 py-4 font-semibold border-l border-gray-200/50 dark:border-gray-700/50 outline-none cursor-pointer text-sm"
            >
              <option value="km/h" className="text-black dark:text-white">km/h</option>
              <option value="mph" className="text-black dark:text-white">mph</option>
              <option value="knots" className="text-black dark:text-white">knots</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center -my-3 relative z-10">
          <button 
            onClick={swap}
            className="p-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-700/50 rounded-full transition-transform hover:scale-110 active:scale-95 text-teal-500 dark:text-teal-400 shadow-lg"
          >
            <ArrowRightLeft className="w-5 h-5 rotate-90 sm:rotate-0" />
          </button>
        </div>

        <div className="flex flex-col gap-2 relative">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-1">To</label>
          <div className="flex bg-white/60 dark:bg-black/40 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent transition-all shadow-sm">
            <input
              type="number"
              value={value2}
              onChange={handleValue2Change}
              className="w-full px-5 py-4 bg-transparent outline-none font-bold text-xl"
              placeholder="0"
            />
            <select
              value={unit2}
              onChange={handleUnit2Change}
              className="bg-gray-50/50 dark:bg-gray-800/50 px-4 py-4 font-semibold border-l border-gray-200/50 dark:border-gray-700/50 outline-none cursor-pointer text-sm"
            >
              <option value="km/h" className="text-black dark:text-white">km/h</option>
              <option value="mph" className="text-black dark:text-white">mph</option>
              <option value="knots" className="text-black dark:text-white">knots</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}


// Indian Example: Satish from Ujjain uses this tool to check variables.
