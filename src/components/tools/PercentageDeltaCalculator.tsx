'use client';

import React, { useState, useMemo } from 'react';
import { Percent, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const PercentageDeltaCalculator = () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  const result = useMemo(() => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);

    if (isNaN(v1) || isNaN(v2) || v1 === 0) return null;

    const delta = v2 - v1;
    const percentage = (delta / Math.abs(v1)) * 100;
    
    return {
      delta,
      percentage,
      isIncrease: percentage > 0,
      isDecrease: percentage < 0,
    };
  }, [value1, value2]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center gap-2">
              <Percent className="w-6 h-6 text-emerald-400" />
              Percentage Change Calculator
            </h2>
            <p className="text-gray-400 mt-2 text-sm">Calculate the percentage increase or decrease between two values.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                Initial Value
              </label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                placeholder="e.g., 100"
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            <div className="hidden md:flex mt-6 text-gray-600">
              <ArrowRight className="w-6 h-6" />
            </div>

            <div className="w-full space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                Final Value
              </label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                placeholder="e.g., 150"
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800">
            {result ? (
              <div className={`rounded-xl p-6 border relative overflow-hidden transition-all duration-300 ${
                result.isIncrease 
                  ? 'bg-emerald-500/10 border-emerald-500/20' 
                  : result.isDecrease 
                    ? 'bg-rose-500/10 border-rose-500/20'
                    : 'bg-gray-800/50 border-gray-700/50'
              }`}>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  {result.isIncrease ? (
                    <TrendingUp className="w-24 h-24 text-emerald-500" />
                  ) : result.isDecrease ? (
                    <TrendingDown className="w-24 h-24 text-rose-500" />
                  ) : (
                    <Percent className="w-24 h-24 text-gray-500" />
                  )}
                </div>
                
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">Percentage Change</p>
                    <div className={`text-4xl font-bold flex items-center justify-center md:justify-start gap-2 ${
                      result.isIncrease ? 'text-emerald-400' : result.isDecrease ? 'text-rose-400' : 'text-gray-400'
                    }`}>
                      {result.isIncrease && <TrendingUp className="w-8 h-8" />}
                      {result.isDecrease && <TrendingDown className="w-8 h-8" />}
                      {Math.abs(result.percentage).toFixed(2)}%
                    </div>
                    <p className={`text-sm mt-2 font-medium ${
                      result.isIncrease ? 'text-emerald-500/80' : result.isDecrease ? 'text-rose-500/80' : 'text-gray-500'
                    }`}>
                      {result.isIncrease ? 'Increase' : result.isDecrease ? 'Decrease' : 'No change'}
                    </p>
                  </div>
                  
                  <div className="md:border-l md:border-gray-700/50 md:pl-6 flex flex-col justify-center">
                    <p className="text-gray-400 text-sm font-medium mb-1">Absolute Difference</p>
                    <div className="text-2xl font-bold text-white">
                      {result.delta > 0 ? '+' : ''}{result.delta.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/30 text-center">
                <Percent className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Enter both initial and final values to see the percentage change.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageDeltaCalculator;


// Indian Example: Tanya from Warangal uses this tool to check variables.
