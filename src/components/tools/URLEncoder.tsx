'use client';

import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check, Trash2, Link as LinkIcon } from 'lucide-react';

export default function URLEncoder() {
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
        setOutput(encodeURIComponent(text));
      } else {
        setOutput(decodeURIComponent(text));
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

  return (
    <section className="space-y-6 animate-fade-in-up font-inter max-w-7xl mx-auto h-full">
      <div className="glass-card flex flex-col min-h-[600px] rounded-3xl overflow-hidden shadow-2xl relative">
        <header className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center px-6 py-4 z-10 shrink-0 gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <LinkIcon size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-slate-100 text-lg">URL Encoder / Decoder</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Encode or decode URL parameters</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1 mr-2 border-r border-slate-200 dark:border-slate-800 pr-4">
              <button onClick={handleCopy} className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:text-sky-400 dark:hover:bg-sky-900/30 rounded-lg transition-all relative" title="Copy Output">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
              <button onClick={handleClear} className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:text-rose-400 dark:hover:bg-rose-900/30 rounded-lg transition-all" title="Clear All">
                <Trash2 size={18} />
              </button>
            </div>
            <button onClick={toggleMode} className="text-sm font-bold bg-sky-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-sky-500/30 hover:bg-sky-700 transition-all flex items-center gap-2">
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
              INPUT ({mode === 'encode' ? 'TEXT / URL' : 'ENCODED URL'})
            </div>
            <textarea value={input} onChange={handleInputChange} placeholder={`Enter ${mode === 'encode' ? 'text or URL components' : 'URL encoded string'} here...`} className="flex-1 w-full bg-transparent text-slate-800 dark:text-slate-200 p-6 resize-none focus:outline-none font-jetbrains-mono text-sm leading-relaxed" spellCheck="false" />
          </div>
          <div className="flex-1 flex flex-col relative group bg-slate-50 dark:bg-slate-900/30">
            <div className="absolute top-0 right-0 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-[10px] font-bold tracking-widest px-3 py-1 rounded-bl-lg border-b border-l border-sky-100 dark:border-sky-500/30 z-10">
              OUTPUT ({mode === 'encode' ? 'ENCODED URL' : 'TEXT / URL'})
            </div>
            <textarea value={output} readOnly placeholder="Result will appear here..." className="flex-1 w-full bg-transparent text-sky-900 dark:text-sky-300 p-6 resize-none focus:outline-none font-jetbrains-mono text-sm leading-relaxed" spellCheck="false" />
          </div>
        </div>
      </div>
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">About URL Encoding</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
          URL encoding (Percent-encoding) is a mechanism for encoding information in a Uniform Resource Identifier (URI). Allowed characters in a URI are either reserved or unreserved. Reserved characters are those characters that sometimes have special meaning, while unreserved characters have no such meaning. Using percent-encoding, reserved characters are translated into a percent sign followed by two hexadecimal digits.
        </p>
      </div>
    </section>
  );
}
