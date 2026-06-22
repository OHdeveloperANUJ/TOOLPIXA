'use client';

import React, { useState } from 'react';
import { Calculator, Target, BookOpen, AlertCircle, CheckCircle2, Info } from 'lucide-react';

const AttendanceCalculator: React.FC = () => {
  const [attended, setAttended] = useState<number | ''>('');
  const [total, setTotal] = useState<number | ''>('');
  const [target, setTarget] = useState<number | ''>(75);

  const calculateResult = () => {
    if (attended === '' || total === '' || target === '') return null;
    if (total === 0 || attended > total || target < 1 || target > 100) return null;

    const currentPercentage = (attended / total) * 100;
    let message = '';
    let classesToAttend = 0;
    let classesToBunk = 0;
    let status: 'safe' | 'danger' | 'warning' = 'safe';

    if (currentPercentage >= target) {
      // Calculate how many classes can be bunked
      classesToBunk = Math.floor((attended * 100 - target * total) / target);
      if (classesToBunk > 0) {
        message = `You can safely miss the next ${classesToBunk} class${classesToBunk > 1 ? 'es' : ''}.`;
        status = 'safe';
      } else {
        message = "You are exactly on target. Don't miss the next class!";
        status = 'warning';
      }
    } else {
      // Calculate how many to attend
      classesToAttend = Math.ceil((target * total - 100 * attended) / (100 - target));
      message = `You need to attend ${classesToAttend} more consecutive class${classesToAttend > 1 ? 'es' : ''} to reach ${target}%.`;
      status = 'danger';
    }

    return { currentPercentage: currentPercentage.toFixed(2), message, status };
  };

  const result = calculateResult();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Calculator className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Attendance Calculator</h2>
        </div>

        <div className="space-y-6 relative z-10">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <BookOpen className="w-4 h-4" /> Classes Attended
            </label>
            <input
              type="number"
              min="0"
              value={attended}
              onChange={(e) => setAttended(e.target.value ? Number(e.target.value) : '')}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              placeholder="e.g. 45"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <BookOpen className="w-4 h-4" /> Total Classes Held
            </label>
            <input
              type="number"
              min="1"
              value={total}
              onChange={(e) => setTotal(e.target.value ? Number(e.target.value) : '')}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              placeholder="e.g. 60"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Target className="w-4 h-4" /> Target Percentage (%)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={target}
              onChange={(e) => setTarget(e.target.value ? Number(e.target.value) : '')}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              placeholder="e.g. 75"
            />
          </div>

          {result && (
            <div className={`mt-8 p-6 rounded-2xl border ${
              result.status === 'safe' ? 'bg-green-500/10 border-green-500/30' :
              result.status === 'danger' ? 'bg-red-500/10 border-red-500/30' :
              'bg-yellow-500/10 border-yellow-500/30'
            }`}>
              <div className="text-center mb-4">
                <span className="text-sm font-medium text-gray-400">Current Attendance</span>
                <div className={`text-4xl font-bold mt-1 ${
                  result.status === 'safe' ? 'text-green-400' :
                  result.status === 'danger' ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {result.currentPercentage}%
                </div>
              </div>
              
              <div className="flex items-start gap-3 mt-4 pt-4 border-t border-white/10">
                {result.status === 'safe' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                ) : result.status === 'danger' ? (
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                )}
                <p className="text-sm text-gray-300 leading-relaxed">
                  {result.message}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalculator;
