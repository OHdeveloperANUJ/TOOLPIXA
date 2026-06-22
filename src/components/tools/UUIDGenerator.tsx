'use client';

import React, { useState, useCallback } from 'react';
import { Copy, RefreshCw, CheckCircle2, Hash } from 'lucide-react';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const generateUUIDs = useCallback(() => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(crypto.randomUUID());
    }
    setUuids(newUuids);
    setCopied(false);
  }, [count]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate on first load
  React.useEffect(() => {
    generateUUIDs();
  }, [generateUUIDs]);

  return (
    <section className="glass-card p-6 md:p-8 rounded-3xl max-w-4xl mx-auto dark:text-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl">
          <Hash className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">UUID / GUID Generator</h2>
          <p className="text-slate-500 dark:text-slate-400">Generate universally unique identifiers instantly</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-1">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Number of UUIDs
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
          />
        </div>
        <div className="md:col-span-3 flex items-end">
          <button
            onClick={generateUUIDs}
            className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Generate New UUIDs
          </button>
        </div>
      </div>

      <div className="relative mb-8">
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={copyToClipboard}
            className="p-2 bg-white/80 dark:bg-slate-700/80 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg transition-colors shadow-sm flex items-center gap-2 text-sm font-medium"
            title="Copy to clipboard"
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <textarea
          readOnly
          value={uuids.join('\n')}
          rows={Math.max(5, Math.min(20, count + 1))}
          className="w-full px-4 py-4 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-y dark:text-slate-300"
        />
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">About UUIDs (Version 4)</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
          A Universally Unique Identifier (UUID) or Globally Unique Identifier (GUID) is a 128-bit number used to identify information in computer systems. 
          The UUIDs generated above are <strong>Version 4</strong>, meaning they are randomly generated.
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
          <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2 text-sm">How it works</h4>
          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
            <li>Consists of 32 hexadecimal digits separated by hyphens (e.g., <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>).</li>
            <li>In Version 4 UUIDs, the 13th character is always <code>4</code>, and the 17th character is <code>8</code>, <code>9</code>, <code>A</code>, or <code>B</code>.</li>
            <li>With 122 random bits, the probability of generating a duplicate UUID is astronomically small (practically zero).</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
