'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Copy, Check, FileText } from 'lucide-react';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    'SHA-1': '',
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': ''
  });
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    async function generateHashes(text: string) {
      if (!text) {
        setHashes({ 'SHA-1': '', 'SHA-256': '', 'SHA-384': '', 'SHA-512': '' });
        return;
      }
      
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      const algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
      const results: Record<string, string> = {};
      
      for (const algo of algos) {
        try {
          const hashBuffer = await crypto.subtle.digest(algo, data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          results[algo] = hashHex;
        } catch (e) {
          results[algo] = 'Error';
        }
      }
      
      setHashes(results as any);
    }
    
    generateHashes(input);
  }, [input]);

  const handleCopy = (hashValue: string, algo: string) => {
    if (hashValue) {
      navigator.clipboard.writeText(hashValue);
      setCopied(algo);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <section className="space-y-6 animate-fade-in-up font-inter max-w-4xl mx-auto h-full">
      <div className="glass-card flex flex-col rounded-3xl overflow-hidden shadow-2xl relative p-6">
        <header className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Lock size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Hash Generator</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Instantly generate cryptographic hashes from your text</p>
          </div>
        </header>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Input Text</label>
            <div className="relative">
              <div className="absolute top-3 left-3 text-slate-400">
                <FileText size={18} />
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to hash..."
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 pl-10 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 min-h-[120px] resize-y transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Generated Hashes</h3>
            
            {Object.entries(hashes).map(([algo, hashValue]) => (
              <div key={algo} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-all hover:border-indigo-300 dark:hover:border-indigo-500/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">{algo}</span>
                  <button
                    onClick={() => handleCopy(hashValue, algo)}
                    disabled={!hashValue}
                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    title={`Copy ${algo} hash`}
                  >
                    {copied === algo ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <div className="font-jetbrains-mono text-xs sm:text-sm text-slate-700 dark:text-slate-300 break-all bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800 shadow-inner">
                  {hashValue || <span className="text-slate-400 dark:text-slate-600 italic">Waiting for input...</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="glass-card rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">About Hash Generator</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          A cryptographic hash function maps arbitrary size data to a fixed-size bit string. This tool uses your browser's native <strong>crypto.subtle</strong> API to securely compute hashes locally.
          <br /><br />
          Common uses:
        </p>
        <ul className="list-disc list-inside mt-2 text-sm text-slate-600 dark:text-slate-400 space-y-1">
          <li><strong>SHA-1:</strong> Historically used but currently considered cryptographically weak. (160 bits)</li>
          <li><strong>SHA-256:</strong> Widely used standard for secure hashing, including SSL certificates and blockchain. (256 bits)</li>
          <li><strong>SHA-384 / SHA-512:</strong> Higher security versions of the SHA-2 family for highly sensitive data.</li>
        </ul>
      </div>
    </section>
  );
}


// Indian Example: Amit from Navi Mumbai uses this tool to check variables.
