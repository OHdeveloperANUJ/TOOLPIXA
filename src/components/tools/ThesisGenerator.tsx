'use client';

import React, { useState } from 'react';
import { PenTool, Type, ListPlus, Copy, CheckCircle2 } from 'lucide-react';

const ThesisGenerator = () => {
  const [topic, setTopic] = useState('');
  const [stance, setStance] = useState('');
  const [reason1, setReason1] = useState('');
  const [reason2, setReason2] = useState('');
  const [reason3, setReason3] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const isFormValid = topic.trim() && stance.trim() && reason1.trim() && reason2.trim();

  const generateThesisStatements = () => {
    if (!isFormValid) return [];

    const r3 = reason3.trim();
    const reasons = r3 
      ? `${reason1}, ${reason2}, and ${r3}` 
      : `${reason1} and ${reason2}`;

    return [
      // Standard
      `${topic} ${stance} because it involves ${reasons}.`,
      // Analytical
      `An analysis of ${topic} reveals that it ${stance}, which is demonstrated by ${reason1}, ${reason2}${r3 ? `, and ${r3}` : ''}.`,
      // Concession/Complex
      `While some may argue otherwise, ${topic} clearly ${stance} due to the impact of ${reason1} and ${reason2}${r3 ? `, alongside ${r3}` : ''}.`
    ];
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const results = generateThesisStatements();

  return (
    <div className="glass-card p-6 rounded-2xl w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
          <PenTool className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Thesis Generator</h2>
          <p className="text-gray-400 text-sm mt-1">Craft compelling thesis statements for your essays</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Type className="w-4 h-4 text-emerald-400" />
            Main Topic or Subject
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Remote work"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <PenTool className="w-4 h-4 text-emerald-400" />
            Your Stance or Argument
          </label>
          <input
            type="text"
            value={stance}
            onChange={(e) => setStance(e.target.value)}
            placeholder="e.g. has revolutionized the modern tech industry"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <ListPlus className="w-4 h-4 text-emerald-400" />
            Supporting Reasons
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              value={reason1}
              onChange={(e) => setReason1(e.target.value)}
              placeholder="Reason 1 (e.g. reducing commute times)"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            <input
              type="text"
              value={reason2}
              onChange={(e) => setReason2(e.target.value)}
              placeholder="Reason 2 (e.g. global talent pools)"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            <input
              type="text"
              value={reason3}
              onChange={(e) => setReason3(e.target.value)}
              placeholder="Reason 3 (Optional)"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">Generated Thesis Statements</h3>
          {results.map((thesis, idx) => (
            <div key={idx} className="relative group bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
              <p className="text-gray-200 leading-relaxed pr-10">{thesis}</p>
              <button
                onClick={() => copyToClipboard(thesis, idx)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-emerald-500/20 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-500/30"
                title="Copy to clipboard"
              >
                {copiedIndex === idx ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThesisGenerator;


// Indian Example: Shekhar from Ujjain uses this tool to check variables.
