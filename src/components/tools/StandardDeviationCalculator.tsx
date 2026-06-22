'use client';

import React, { useState } from 'react';
import { Sigma } from 'lucide-react';

export default function StandardDeviationCalculator() {
  const [inputData, setInputData] = useState<string>('');

  let mean: number | null = null;
  let popSd: number | null = null;
  let sampSd: number | null = null;
  let variance: number | null = null;
  let count: number = 0;
  let sum: number | null = null;

  if (inputData.trim() !== '') {
    const nums = inputData
      .split(/[\s,]+/)
      .map(n => n.trim())
      .filter(n => n !== '')
      .map(Number)
      .filter(n => !isNaN(n));

    if (nums.length > 0) {
      count = nums.length;
      sum = nums.reduce((a, b) => a + b, 0);
      mean = sum / count;
      
      const squareDiffs = nums.map(n => Math.pow(n - mean!, 2));
      const sumSquareDiffs = squareDiffs.reduce((a, b) => a + b, 0);
      
      variance = sumSquareDiffs / count;
      popSd = Math.sqrt(variance);
      
      if (count > 1) {
        sampSd = Math.sqrt(sumSquareDiffs / (count - 1));
      }
    }
  }

  return (
    <section className="space-y-8 animate-fade-in-up font-inter max-w-4xl mx-auto">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-3">
          <Sigma className="w-8 h-8 text-fuchsia-500" />
          Standard Deviation Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Calculate the population and sample standard deviation, variance, and mean from a dataset.
        </p>
      </div>

      <div className="glass-card p-8 rounded-3xl group transition-colors duration-500">
        <div className="space-y-6">
          
          {/* Data Input */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold mb-2">
              Enter Data Set (comma or space separated)
            </label>
            <textarea
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder="e.g. 10, 20, 30, 40, 50"
              className="w-full bg-slate-100 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 focus:border-fuchsia-500 dark:focus:border-fuchsia-400 p-4 text-slate-900 dark:text-white font-medium rounded-2xl min-h-[120px] focus:outline-none transition-all resize-y"
            ></textarea>
          </div>

          {/* Results Display */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl">
              <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider font-bold block mb-2">Count (N)</span>
              <div className="text-3xl font-black text-slate-900 dark:text-white break-words">
                {count > 0 ? count : '--'}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl">
              <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider font-bold block mb-2">Sum (Σx)</span>
              <div className="text-3xl font-black text-slate-900 dark:text-white break-words">
                {sum !== null ? Number(sum.toFixed(4)) : '--'}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl">
              <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider font-bold block mb-2">Mean (μ)</span>
              <div className="text-3xl font-black text-slate-900 dark:text-white break-words">
                {mean !== null ? Number(mean.toFixed(4)) : '--'}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl">
              <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider font-bold block mb-2">Variance (σ²)</span>
              <div className="text-3xl font-black text-slate-900 dark:text-white break-words">
                {variance !== null ? Number(variance.toFixed(4)) : '--'}
              </div>
            </div>

            <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 p-6 rounded-2xl border-2 border-fuchsia-100 dark:border-fuchsia-800/50">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 text-xs uppercase tracking-wider font-bold block mb-2">Pop. Std Dev (σ)</span>
              <div className="text-3xl font-black text-fuchsia-700 dark:text-fuchsia-300 break-words">
                {popSd !== null ? Number(popSd.toFixed(4)) : '--'}
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border-2 border-indigo-100 dark:border-indigo-800/50">
              <span className="text-indigo-600 dark:text-indigo-400 text-xs uppercase tracking-wider font-bold block mb-2">Sample Std Dev (s)</span>
              <div className="text-3xl font-black text-indigo-700 dark:text-indigo-300 break-words">
                {sampSd !== null ? Number(sampSd.toFixed(4)) : '--'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Formulas Used</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Standard deviation measures the amount of variation or dispersion of a set of values. A low standard deviation indicates that the values tend to be close to the mean, while a high standard deviation indicates that the values are spread out over a wider range.
        </p>
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Population Standard Deviation (σ)</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Used when your data represents the entire population.</p>
            <code className="text-sm text-fuchsia-600 dark:text-fuchsia-400 font-bold block">
              σ = √[ Σ(x - μ)² / N ]
            </code>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Sample Standard Deviation (s)</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Used when your data represents a sample drawn from a larger population. (Bessel's correction)</p>
            <code className="text-sm text-indigo-600 dark:text-indigo-400 font-bold block">
              s = √[ Σ(x - x̄)² / (n - 1) ]
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
