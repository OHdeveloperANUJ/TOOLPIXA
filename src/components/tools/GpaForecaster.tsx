'use client';

import React, { useState } from 'react';
import { Calculator, Target, BookOpen, GraduationCap } from 'lucide-react';

const GpaForecaster = () => {
  const [currentGpa, setCurrentGpa] = useState<string>('');
  const [completedCredits, setCompletedCredits] = useState<string>('');
  const [targetGpa, setTargetGpa] = useState<string>('');
  const [remainingCredits, setRemainingCredits] = useState<string>('');

  const calculateRequiredGpa = () => {
    const current = parseFloat(currentGpa);
    const creditsDone = parseFloat(completedCredits);
    const target = parseFloat(targetGpa);
    const creditsLeft = parseFloat(remainingCredits);

    if (isNaN(current) || isNaN(creditsDone) || isNaN(target) || isNaN(creditsLeft) || creditsLeft === 0) {
      return null;
    }

    const currentPoints = current * creditsDone;
    const totalCredits = creditsDone + creditsLeft;
    const requiredPoints = target * totalCredits - currentPoints;
    const requiredGpa = requiredPoints / creditsLeft;

    return requiredGpa.toFixed(2);
  };

  const required = calculateRequiredGpa();
  
  const getMessage = () => {
    if (!required) return null;
    const val = parseFloat(required);
    if (val > 4.0) return "This target is mathematically impossible on a 4.0 scale.";
    if (val < 0) return "You could fail all remaining classes and still hit your target!";
    return `You need to average a ${required} GPA over your remaining ${remainingCredits} credits.`;
  };

  return (
    <div className="glass-card p-6 rounded-2xl w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">GPA Forecaster</h2>
          <p className="text-gray-400 text-sm mt-1">Calculate what it takes to reach your target GPA</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            Current GPA
          </label>
          <input
            type="number"
            min="0"
            max="4.0"
            step="0.01"
            value={currentGpa}
            onChange={(e) => setCurrentGpa(e.target.value)}
            placeholder="e.g. 3.2"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-400" />
            Completed Credits
          </label>
          <input
            type="number"
            min="0"
            value={completedCredits}
            onChange={(e) => setCompletedCredits(e.target.value)}
            placeholder="e.g. 60"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            Target GPA
          </label>
          <input
            type="number"
            min="0"
            max="4.0"
            step="0.01"
            value={targetGpa}
            onChange={(e) => setTargetGpa(e.target.value)}
            placeholder="e.g. 3.5"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            Remaining Credits
          </label>
          <input
            type="number"
            min="1"
            value={remainingCredits}
            onChange={(e) => setRemainingCredits(e.target.value)}
            placeholder="e.g. 60"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {required !== null && (
        <div className={`mt-8 p-6 rounded-xl border ${parseFloat(required) > 4.0 ? 'bg-red-500/10 border-red-500/20 text-red-200' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-200'}`}>
          <div className="text-center">
            <p className="text-sm uppercase tracking-wider font-semibold opacity-80 mb-2">Required Average GPA</p>
            <p className="text-5xl font-bold mb-4">{required}</p>
            <p className="text-sm font-medium">{getMessage()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GpaForecaster;
