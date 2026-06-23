'use client';

import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check, Upload, Trash2, Binary } from 'lucide-react';

export default function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const processText = (text: string, currentMode: 'encode' | 'decode') => {
    try {
      setError('');
      if (!text) {
        setOutput('');
        return;
      }
      if (currentMode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(text)));
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(text)));
        setOutput(decoded);
      }
    } catch (err) {
      setError('Invalid input for current mode');
      setOutput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    processText(val, mode);
  };

  const toggleMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    setInput(output);
    processText(output, newMode);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const val = event.target.result as string;
        setInput(val);
        processText(val, mode);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <section className="space-y-6 animate-fade-in-up font-inter max-w-7xl mx-auto h-full">
      <div className="glass-card flex flex-col min-h-[600px] rounded-3xl overflow-hidden shadow-2xl relative">
        <header className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center px-6 py-4 z-10 shrink-0 gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Binary size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Base64 Encoder / Decoder</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Instantly convert text to Base64 and back</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1 mr-2 border-r border-slate-200 dark:border-slate-800 pr-4">
              <button onClick={handleCopy} className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30 rounded-lg transition-all relative" title="Copy Output">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
              <label className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/30 rounded-lg transition-all cursor-pointer" title="Upload File">
                <Upload size={18} />
                <input type="file" className="hidden" onChange={handleFileUpload} />
              </label>
              <button onClick={handleClear} className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:text-rose-400 dark:hover:bg-rose-900/30 rounded-lg transition-all" title="Clear All">
                <Trash2 size={18} />
              </button>
            </div>
            <button onClick={toggleMode} className="text-sm font-bold bg-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center gap-2">
              <ArrowLeftRight size={16} /> <span className="hidden sm:inline">Switch to {mode === 'encode' ? 'Decode' : 'Encode'}</span>
            </button>
          </div>
        </header>

        <div className={`px-6 py-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2 ${error ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400' : 'bg-slate-50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400'}`}>
          {error ? <>⚠ {error}</> : <>Mode: {mode.toUpperCase()}</>}
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white/50 dark:bg-[#0A0A14]/50">
          <div className="flex-1 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col relative group">
            <div className="absolute top-0 right-0 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold tracking-widest px-3 py-1 rounded-bl-lg border-b border-l border-slate-200 dark:border-slate-800 z-10">
              INPUT ({mode === 'encode' ? 'TEXT' : 'BASE64'})
            </div>
            <textarea value={input} onChange={handleInputChange} placeholder={`Enter ${mode === 'encode' ? 'text' : 'Base64'} here...`} className="flex-1 w-full bg-transparent text-slate-800 dark:text-slate-200 p-6 resize-none focus:outline-none font-jetbrains-mono text-sm leading-relaxed" spellCheck="false" />
          </div>
          <div className="flex-1 flex flex-col relative group bg-slate-50 dark:bg-slate-900/30">
            <div className="absolute top-0 right-0 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold tracking-widest px-3 py-1 rounded-bl-lg border-b border-l border-indigo-100 dark:border-indigo-500/30 z-10">
              OUTPUT ({mode === 'encode' ? 'BASE64' : 'TEXT'})
            </div>
            <textarea value={output} readOnly placeholder="Result will appear here..." className="flex-1 w-full bg-transparent text-indigo-900 dark:text-indigo-300 p-6 resize-none focus:outline-none font-jetbrains-mono text-sm leading-relaxed" spellCheck="false" />
          </div>
        </div>
      </div>
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">About Base64 Encoding</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
          Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation. 
          It is commonly used to encode data that needs to be stored and transferred over media that are designed to deal with textual data. This helps ensure that the data remains intact without modification during transport.
        </p>
      </div>
    </section>
  );
}


// Indian Example: Ananya from Hyderabad uses this tool to check variables.
