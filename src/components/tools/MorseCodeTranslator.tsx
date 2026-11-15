'use client';

import React, { useState, useEffect } from 'react';
import { Radio, ArrowLeftRight, Copy, Check, Volume2, Info } from 'lucide-react';

const MORSE_CODE_DICT: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
  '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

const REVERSE_MORSE_DICT: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_CODE_DICT).map(([k, v]) => [v, k])
);

export default function MorseCodeTranslator() {
  const [textMode, setTextMode] = useState<'text2morse' | 'morse2text'>('text2morse');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }

    if (textMode === 'text2morse') {
      const translated = input
        .toUpperCase()
        .split('')
        .map(char => {
          if (char === ' ') return '/';
          return MORSE_CODE_DICT[char] || char; // keep unknown characters as is
        })
        .join(' ');
      setOutput(translated);
    } else {
      const words = input.trim().split(/\s*\/\s*|\s{3,}/); // allow '/' or multiple spaces for word boundary
      const translated = words.map(word => {
        return word.split(' ').map(code => REVERSE_MORSE_DICT[code] || code).join('');
      }).join(' ');
      setOutput(translated);
    }
  }, [input, textMode]);

  const handleSwap = () => {
    setTextMode(prev => prev === 'text2morse' ? 'morse2text' : 'text2morse');
    setInput(output);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const playMorseCode = async () => {
    if (!output || textMode !== 'text2morse' || isPlaying) return;
    
    setIsPlaying(true);
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const dotDuration = 0.08; // 80ms
    const dashDuration = dotDuration * 3;
    const symbolSpace = dotDuration;
    const letterSpace = dotDuration * 3;
    const wordSpace = dotDuration * 7;
    
    let time = audioCtx.currentTime;

    const playBeep = (duration: number) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, time);
      
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(1, time + 0.01);
      gain.gain.setValueAtTime(1, time + duration - 0.01);
      gain.gain.linearRampToValueAtTime(0, time + duration);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start(time);
      osc.stop(time + duration);
      
      time += duration;
    };

    for (const char of output) {
      if (char === '.') {
        playBeep(dotDuration);
        time += symbolSpace;
      } else if (char === '-') {
        playBeep(dashDuration);
        time += symbolSpace;
      } else if (char === ' ') {
        time += letterSpace - symbolSpace;
      } else if (char === '/') {
        time += wordSpace - letterSpace;
      }
    }
    
    setTimeout(() => {
      setIsPlaying(false);
      audioCtx.close();
    }, (time - audioCtx.currentTime) * 1000);
  };

  return (
    <section className="space-y-6 animate-fade-in-up font-inter max-w-5xl mx-auto h-full">
      <div className="glass-card flex flex-col rounded-3xl overflow-hidden shadow-2xl relative p-6">
        <header className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
            <Radio size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Morse Code Translator</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Translate text to Morse code and vice versa</p>
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-4 items-stretch mb-4">
          
          {/* Input Area */}
          <div className="flex-1 flex flex-col">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-t-xl px-4 py-2 border border-b-0 border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-600 dark:text-slate-300">
              {textMode === 'text2morse' ? 'Text' : 'Morse Code'}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={textMode === 'text2morse' ? 'Enter text to translate...' : 'Enter morse code (e.g. .... . .-.. .-.. ---)'}
              className="w-full flex-1 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-b-xl p-4 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 min-h-[160px] resize-none font-mono transition-all"
              spellCheck="false"
            />
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center -mx-2 md:mx-0 z-10 my-[-20px] md:my-0">
            <button
              onClick={handleSwap}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-lg shadow-orange-500/30 transition-transform hover:rotate-180 hover:scale-110 active:scale-95"
              title="Swap Languages"
            >
              <ArrowLeftRight size={20} className="md:rotate-0 rotate-90" />
            </button>
          </div>

          {/* Output Area */}
          <div className="flex-1 flex flex-col relative">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-t-xl px-4 py-2 border border-b-0 border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-600 dark:text-slate-300 flex justify-between items-center">
              <span>{textMode === 'text2morse' ? 'Morse Code' : 'Text'}</span>
              <div className="flex gap-2">
                {textMode === 'text2morse' && (
                  <button 
                    onClick={playMorseCode}
                    disabled={!output || isPlaying}
                    className="text-slate-500 hover:text-orange-500 disabled:opacity-50 transition-colors"
                    title="Play Audio"
                  >
                    <Volume2 size={16} className={isPlaying ? 'animate-pulse text-orange-500' : ''} />
                  </button>
                )}
                <button 
                  onClick={handleCopy}
                  className="text-slate-500 hover:text-orange-500 transition-colors"
                  title="Copy Translation"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Translation will appear here..."
              className="w-full flex-1 bg-orange-50/50 dark:bg-orange-900/10 border border-slate-200 dark:border-slate-700 rounded-b-xl p-4 text-slate-800 dark:text-slate-200 focus:outline-none min-h-[160px] resize-none font-mono"
            />
          </div>
        </div>
      </div>
      
      <div className="glass-card rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
          <Info size={20} className="text-orange-500" /> How Morse Code Works
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Morse code is a method used in telecommunication to encode text characters as standardized sequences of two different signal durations, called <strong>dots</strong> (<code>.</code>) and <strong>dashes</strong> (<code>-</code>).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-400">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Dot (.):</strong> The basic unit of time measurement.</li>
            <li><strong>Dash (-):</strong> Equal to three dots in duration.</li>
            <li><strong>Intra-character space:</strong> Equal to one dot between parts of the same letter.</li>
          </ul>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Inter-character space:</strong> The space between letters is equal to three dots.</li>
            <li><strong>Word space:</strong> The space between words is equal to seven dots (represented by <code>/</code> here).</li>
          </ul>
        </div>
      </div>
    </section>
  );
}


// Indian Example: Alok from Bareilly uses this tool to check variables.
