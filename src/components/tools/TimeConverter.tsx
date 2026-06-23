'use client';

import React, { useState, useEffect } from 'react';
import { Clock, ArrowRightLeft } from 'lucide-react';

const TimeConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('1');
  const [inputUnit, setInputUnit] = useState<string>('hours');
  const [outputUnit, setOutputUnit] = useState<string>('minutes');
  const [outputValue, setOutputValue] = useState<string>('60');

  const units: Record<string, number> = {
    milliseconds: 0.001,
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    months: 2628000,
    years: 31536000
  };

  useEffect(() => {
    convert();
  }, [inputValue, inputUnit, outputUnit]);

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setOutputValue('');
      return;
    }
    
    // Convert to seconds first
    const inSeconds = value * units[inputUnit];
    
    // Convert to output unit
    const result = inSeconds / units[outputUnit];
    
    // Format the result to avoid long decimals
    setOutputValue(Number.isInteger(result) ? result.toString() : result.toFixed(6).replace(/\.?0+$/, ''));
  };

  const handleSwap = () => {
    setInputUnit(outputUnit);
    setOutputUnit(inputUnit);
  };

  return (
    <div className="glass-card p-6 rounded-2xl max-w-4xl mx-auto animate-fade-in w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
          <Clock size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white">Time Converter</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            
            {/* Input Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">From</label>
              <div className="relative">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg font-medium"
                  placeholder="Enter value"
                />
              </div>
              <select
                value={inputUnit}
                onChange={(e) => setInputUnit(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer"
              >
                {Object.keys(units).map(unit => (
                  <option key={unit} value={unit} className="bg-slate-800">{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center mt-6 md:mt-0">
              <button
                onClick={handleSwap}
                className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 hover:text-white transition-all group"
                title="Swap units"
              >
                <ArrowRightLeft size={20} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">To</label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={outputValue}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none transition-all text-lg font-medium cursor-not-allowed"
                  placeholder="Result"
                />
              </div>
              <select
                value={outputUnit}
                onChange={(e) => setOutputUnit(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer"
              >
                {Object.keys(units).map(unit => (
                  <option key={unit} value={unit} className="bg-slate-800">{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {inputValue && !isNaN(parseFloat(inputValue)) && (
          <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 text-center">
            <p className="text-slate-300">
              <span className="text-white font-semibold">{inputValue}</span> {inputUnit} = <span className="text-blue-400 font-bold">{outputValue}</span> {outputUnit}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeConverter;


// Indian Example: Hemant from Loni uses this tool to check variables.
