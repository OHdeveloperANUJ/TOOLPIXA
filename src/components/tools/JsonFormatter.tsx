'use client';

import React, { useState, useEffect, useRef } from 'react';
import { processJSON, JsonProcessResult } from '@/utils/jsonLogic';
import { Code2, Copy, Check, Upload, Trash2, Maximize2, Minimize2, FileJson } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [result, setResult] = useState<JsonProcessResult | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-format when input changes after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim()) {
        const res = processJSON(input);
        setResult(res);
        if (res.isValid && res.formatted) {
          setOutput(res.formatted);
        } else {
          setOutput(input);
        }
      } else {
        setResult(null);
        setOutput('');
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [input]);

  const handleFormat = () => {
    const res = processJSON(input);
    setResult(res);
    if (res.isValid && res.formatted) {
      setInput(res.formatted);
      setOutput(res.formatted);
    }
  };

  const handleMinify = () => {
    const res = processJSON(input);
    setResult(res);
    if (res.isValid && res.minified) {
      setInput(res.minified);
      setOutput(res.minified);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setResult(null);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setInput(event.target.result as string);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <section className="space-y-6 animate-fade-in-up font-inter max-w-7xl mx-auto h-full">
      <div className="glass-card flex flex-col h-[calc(100vh-140px)] min-h-[600px] rounded-3xl overflow-hidden shadow-2xl relative">
        
        {/* TopNavBar (Toolbar) */}
        <header className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center px-6 py-4 z-10 shrink-0 gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <FileJson size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-slate-100 text-sm">JSON Studio</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Format, validate, and minify instantly</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            {/* Icon Actions */}
            <div className="flex items-center gap-1 mr-2 border-r border-slate-200 dark:border-slate-800 pr-4">
              <button 
                onClick={handleCopy}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30 rounded-lg transition-all relative" 
                title="Copy Output"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
              
              <label className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/30 rounded-lg transition-all cursor-pointer" title="Upload JSON File">
                <Upload size={18} />
                <input type="file" accept=".json,application/json" className="hidden" onChange={handleFileUpload} />
              </label>
              
              <button 
                onClick={handleClear}
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:text-rose-400 dark:hover:bg-rose-900/30 rounded-lg transition-all" 
                title="Clear All"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            {/* Primary/Secondary Actions */}
            <button 
              onClick={handleMinify}
              className="text-sm font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Minimize2 size={16} /> <span className="hidden sm:inline">Minify</span>
            </button>
            <button 
              onClick={handleFormat}
              className="text-sm font-bold bg-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              <Maximize2 size={16} /> <span className="hidden sm:inline">Format</span>
            </button>
          </div>
        </header>

        {/* Status Bar */}
        <div className={`px-6 py-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2 ${
          !input ? 'bg-slate-50 dark:bg-slate-900/30 text-slate-500' : 
          result?.isValid ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
        }`}>
          {!input ? (
            <>Waiting for input...</>
          ) : result?.isValid ? (
            <><Check size={14} /> Valid JSON</>
          ) : (
            <>⚠ Invalid JSON {result?.errorLine ? `at Line ${result.errorLine}` : ''} - {result?.errorMessage}</>
          )}
        </div>

        {/* Workspace Panels */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white/50 dark:bg-[#0A0A14]/50">
          
          {/* Left Panel: Input */}
          <div className="flex-1 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col relative group">
            <div className="absolute top-0 right-0 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold tracking-widest px-3 py-1 rounded-bl-lg border-b border-l border-slate-200 dark:border-slate-800 z-10">
              INPUT
            </div>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="flex-1 w-full bg-transparent text-slate-800 dark:text-slate-200 p-6 resize-none focus:outline-none focus:ring-inset focus:ring-1 focus:ring-indigo-500/30 selection:bg-indigo-500/20 font-jetbrains-mono text-sm leading-relaxed"
              spellCheck="false"
            />
          </div>

          {/* Right Panel: Output */}
          <div className="flex-1 flex flex-col relative group bg-slate-50 dark:bg-slate-900/30">
            <div className="absolute top-0 right-0 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold tracking-widest px-3 py-1 rounded-bl-lg border-b border-l border-indigo-100 dark:border-indigo-500/30 z-10">
              OUTPUT
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className="flex-1 w-full bg-transparent text-indigo-900 dark:text-indigo-300 p-6 resize-none focus:outline-none selection:bg-indigo-500/20 font-jetbrains-mono text-sm leading-relaxed"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
