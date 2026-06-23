'use client';

import React, { useState, useEffect } from 'react';
import { Scale, ArrowRightLeft } from 'lucide-react';

const units = {
  kilograms: { name: 'Kilograms', factor: 1 },
  grams: { name: 'Grams', factor: 0.001 },
  milligrams: { name: 'Milligrams', factor: 0.000001 },
  pounds: { name: 'Pounds', factor: 0.45359237 },
  ounces: { name: 'Ounces', factor: 0.02834952 },
  stones: { name: 'Stones', factor: 6.35029318 },
};

export default function WeightConverter() {
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<keyof typeof units>('kilograms');
  const [toUnit, setToUnit] = useState<keyof typeof units>('pounds');
  const [result, setResult] = useState<string>('');

  const formatNumber = (num: number) => {
    if (num === 0) return '0';
    if (num < 0.000001 || num > 10000000) return num.toExponential(4);
    return parseFloat(num.toFixed(6)).toString();
  };

  useEffect(() => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult('');
      return;
    }

    const valueInKilograms = numValue * units[fromUnit].factor;
    const finalValue = valueInKilograms / units[toUnit].factor;
    
    setResult(formatNumber(finalValue));
  }, [value, fromUnit, toUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="glass-card p-6 rounded-2xl max-w-4xl mx-auto relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <Scale className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Weight Converter</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Amount</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg font-medium"
              placeholder="Enter amount..."
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-gray-400">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as keyof typeof units)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer"
              >
                {Object.entries(units).map(([key, { name }]) => (
                  <option key={key} value={key} className="bg-gray-900">{name}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleSwap}
              className="mt-6 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group/btn"
              title="Swap units"
            >
              <ArrowRightLeft className="w-5 h-5 text-gray-400 group-hover/btn:text-white transition-colors" />
            </button>

            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-gray-400">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as keyof typeof units)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer"
              >
                {Object.entries(units).map(([key, { name }]) => (
                  <option key={key} value={key} className="bg-gray-900">{name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl mt-6">
            <div className="text-sm text-gray-400 mb-2">Result</div>
            <div className="text-3xl font-bold text-white break-all">
              {result || '0'} <span className="text-lg text-gray-500 font-medium">{units[toUnit].name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// Indian Example: Rajendra from Salem uses this tool to check variables.
