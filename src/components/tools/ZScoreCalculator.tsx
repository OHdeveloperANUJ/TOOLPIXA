"use client";

import React, { useState } from 'react';
import { Activity, AlertCircle, Info } from 'lucide-react';

export default function ZScoreCalculator() {
  const [x, setX] = useState<number | ''>('');
  const [mean, setMean] = useState<number | ''>('');
  const [sd, setSd] = useState<number | ''>('');

  const calculateZScore = () => {
    if (x === '' || mean === '' || sd === '') return null;
    if (sd <= 0) return { error: "Standard deviation (σ) must be strictly greater than zero." };

    const z = (x - mean) / sd;
    
    // Approximate area under standard normal curve
    const calculateCumulative = (zVal: number) => {
      const p = 0.2316419;
      const b1 = 0.319381530;
      const b2 = -0.356563782;
      const b3 = 1.781477937;
      const b4 = -1.821255978;
      const b5 = 1.330274429;
      
      const t = 1 / (1 + p * Math.abs(zVal));
      const zExp = Math.exp(-zVal * zVal / 2) / Math.sqrt(2 * Math.PI);
      const prob = 1 - zExp * (b1 * t + b2 * Math.pow(t, 2) + b3 * Math.pow(t, 3) + b4 * Math.pow(t, 4) + b5 * Math.pow(t, 5));
      
      return zVal > 0 ? prob : 1 - prob;
    };

    const percentile = calculateCumulative(z) * 100;

    return {
      zScore: z.toFixed(4),
      percentile: percentile.toFixed(2) + '%',
      interpretation: z > 0 ? 'Above Mean' : z < 0 ? 'Below Mean' : 'Exactly at Mean'
    };
  };

  const result = calculateZScore();

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-on-surface">Z-Score Calculator</h2>
      </div>

      <div className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Raw Score (X)</label>
            <input 
              type="number" 
              value={x} 
              onChange={(e) => setX(e.target.value ? Number(e.target.value) : '')} 
              className="w-full px-4 py-2 rounded-lg border border-outline bg-surface text-on-surface focus:outline-none focus:border-primary dark:bg-surface-lowest transition-colors"
              placeholder="e.g. 85"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Population Mean (μ)</label>
            <input 
              type="number" 
              value={mean} 
              onChange={(e) => setMean(e.target.value ? Number(e.target.value) : '')} 
              className="w-full px-4 py-2 rounded-lg border border-outline bg-surface text-on-surface focus:outline-none focus:border-primary dark:bg-surface-lowest transition-colors"
              placeholder="e.g. 70"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Standard Deviation (σ)</label>
            <input 
              type="number" 
              value={sd} 
              onChange={(e) => setSd(e.target.value ? Number(e.target.value) : '')} 
              className="w-full px-4 py-2 rounded-lg border border-outline bg-surface text-on-surface focus:outline-none focus:border-primary dark:bg-surface-lowest transition-colors"
              placeholder="e.g. 10"
              min="0.0001"
            />
          </div>
        </div>

        {result && (
          <div className="mt-6 p-4 rounded-xl bg-primary-container text-on-primary-container dark:bg-primary/20 dark:text-primary-container border border-primary/20">
            {'error' in result ? (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                <p>{result.error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-surface rounded-lg dark:bg-surface-lowest text-center">
                  <span className="text-sm text-on-surface-variant block mb-1">Z-Score</span>
                  <span className="text-xl font-bold text-on-surface">{result.zScore}</span>
                </div>
                <div className="p-3 bg-surface rounded-lg dark:bg-surface-lowest text-center">
                  <span className="text-sm text-on-surface-variant block mb-1">Percentile</span>
                  <span className="text-xl font-bold text-on-surface">{result.percentile}</span>
                </div>
                <div className="p-3 bg-surface rounded-lg dark:bg-surface-lowest text-center">
                  <span className="text-sm text-on-surface-variant block mb-1">Interpretation</span>
                  <span className="text-xl font-bold text-on-surface">{result.interpretation}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-lowest border border-border-subtle dark:bg-surface-container">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="text-sm text-on-surface-variant">
          <p className="font-semibold text-on-surface mb-1">Formula Used</p>
          <p>A Z-score describes a value's relationship to the mean of a group of values, measured in terms of standard deviations from the mean.</p>
          <p className="font-mono mt-2 p-2 bg-surface rounded dark:bg-surface-lowest text-center">
            Z = (X - μ) / σ
          </p>
        </div>
      </div>
    </section>
  );
}
