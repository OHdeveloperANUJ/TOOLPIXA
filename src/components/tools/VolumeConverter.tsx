'use client';

import React, { useState, useEffect } from 'react';
import { Beaker, ArrowRightLeft } from 'lucide-react';

const volumeUnits = {
  liters: { name: 'Liters (L)', factor: 1 },
  milliliters: { name: 'Milliliters (mL)', factor: 1000 },
  gallons: { name: 'Gallons (US)', factor: 0.264172 },
  quarts: { name: 'Quarts (US)', factor: 1.05669 },
  pints: { name: 'Pints (US)', factor: 2.11338 },
  cups: { name: 'Cups (US)', factor: 4.22675 },
  floz: { name: 'Fluid Ounces (US)', factor: 33.814 },
};

type UnitKey = keyof typeof volumeUnits;

const VolumeConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('1');
  const [inputUnit, setInputUnit] = useState<UnitKey>('liters');
  const [outputUnit, setOutputUnit] = useState<UnitKey>('gallons');
  const [outputValue, setOutputValue] = useState<string>('');

  useEffect(() => {
    if (inputValue === '') {
      setOutputValue('');
      return;
    }
    const val = parseFloat(inputValue);
    if (!isNaN(val)) {
      const baseVal = val / volumeUnits[inputUnit].factor;
      const outVal = baseVal * volumeUnits[outputUnit].factor;
      
      let formattedOut = '0';
      if (outVal !== 0) {
        if (Math.abs(outVal) < 0.000001 || Math.abs(outVal) >= 1000000) {
          formattedOut = outVal.toExponential(4);
        } else {
          formattedOut = parseFloat(outVal.toFixed(6)).toString();
        }
      }
      setOutputValue(formattedOut);
    } else {
      setOutputValue('');
    }
  }, [inputValue, inputUnit, outputUnit]);

  const handleSwap = () => {
    setInputUnit(outputUnit);
    setOutputUnit(inputUnit);
    setInputValue(outputValue);
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-4xl mx-auto flex flex-col gap-6 shadow-xl border border-white/20 bg-white/10 backdrop-blur-lg">
      <div className="flex items-center gap-3 border-b border-gray-200/20 pb-4">
        <div className="p-3 bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400">
          <Beaker size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Volume Converter</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">Convert liters, gallons, cups and more.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center mt-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
          <div className="flex bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-3 bg-transparent text-gray-800 dark:text-white outline-none"
              placeholder="Enter value"
            />
            <select
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value as UnitKey)}
              className="bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 px-3 text-sm text-gray-700 dark:text-gray-300 outline-none cursor-pointer"
            >
              {Object.entries(volumeUnits).map(([key, unit]) => (
                <option key={key} value={key}>{unit.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSwap}
          className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors mx-auto mt-6 md:mt-0 shadow-sm"
          title="Swap units"
        >
          <ArrowRightLeft size={20} className="text-gray-600 dark:text-gray-300" />
        </button>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
          <div className="flex bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <input
              type="text"
              readOnly
              value={outputValue}
              className="w-full px-4 py-3 bg-transparent text-gray-800 dark:text-white outline-none font-semibold"
              placeholder="Result"
            />
            <select
              value={outputUnit}
              onChange={(e) => setOutputUnit(e.target.value as UnitKey)}
              className="bg-gray-100 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 px-3 text-sm text-gray-700 dark:text-gray-300 outline-none cursor-pointer"
            >
              {Object.entries(volumeUnits).map(([key, unit]) => (
                <option key={key} value={key}>{unit.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {inputValue && outputValue && !isNaN(parseFloat(inputValue)) && (
        <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 text-center">
          <p className="text-gray-700 dark:text-gray-300 break-words">
            <span className="font-semibold text-gray-900 dark:text-white">{parseFloat(inputValue)}</span> {volumeUnits[inputUnit].name} = <span className="font-bold text-blue-600 dark:text-blue-400 text-lg sm:ml-2">{outputValue}</span> {volumeUnits[outputUnit].name}
          </p>
        </div>
      )}
    </div>
  );
};

export default VolumeConverter;
