"use client";

import React, { useState } from 'react';
import { Dices, AlertCircle, Info } from 'lucide-react';

export default function ProbabilityCalculator() {
  const [favorable, setFavorable] = useState<number | ''>('');
  const [total, setTotal] = useState<number | ''>('');

  const calculateProbability = () => {
    if (favorable === '' || total === '') return null;
    if (total <= 0) return { error: "Total outcomes must be greater than zero." };
    if (favorable < 0) return { error: "Favorable outcomes cannot be negative." };
    if (favorable > total) return { error: "Favorable outcomes cannot exceed total outcomes." };

    const prob = favorable / total;
    return {
      decimal: prob.toFixed(4),
      percentage: (prob * 100).toFixed(2) + '%',
      odds: `${favorable} : ${total - favorable}`
    };
  };

  const result = calculateProbability();

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Dices className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-on-surface">Probability Calculator</h2>
      </div>

      <div className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Favorable Outcomes</label>
            <input 
              type="number" 
              value={favorable} 
              onChange={(e) => setFavorable(e.target.value ? Number(e.target.value) : '')} 
              className="w-full px-4 py-2 rounded-lg border border-outline bg-surface text-on-surface focus:outline-none focus:border-primary dark:bg-surface-lowest transition-colors"
              placeholder="e.g. 1"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Total Outcomes</label>
            <input 
              type="number" 
              value={total} 
              onChange={(e) => setTotal(e.target.value ? Number(e.target.value) : '')} 
              className="w-full px-4 py-2 rounded-lg border border-outline bg-surface text-on-surface focus:outline-none focus:border-primary dark:bg-surface-lowest transition-colors"
              placeholder="e.g. 6"
              min="1"
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
                  <span className="text-sm text-on-surface-variant block mb-1">Decimal</span>
                  <span className="text-xl font-bold text-on-surface">{result.decimal}</span>
                </div>
                <div className="p-3 bg-surface rounded-lg dark:bg-surface-lowest text-center">
                  <span className="text-sm text-on-surface-variant block mb-1">Percentage</span>
                  <span className="text-xl font-bold text-on-surface">{result.percentage}</span>
                </div>
                <div className="p-3 bg-surface rounded-lg dark:bg-surface-lowest text-center">
                  <span className="text-sm text-on-surface-variant block mb-1">Odds (Win : Lose)</span>
                  <span className="text-xl font-bold text-on-surface">{result.odds}</span>
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
          <p>Probability is the measure of the likelihood that an event will occur.</p>
          <p className="font-mono mt-2 p-2 bg-surface rounded dark:bg-surface-lowest text-center">
            P(Event) = Number of Favorable Outcomes / Total Number of Possible Outcomes
          </p>
        </div>
      </div>
    </section>
  );
}
