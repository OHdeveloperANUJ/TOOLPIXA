'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, KeyRound, ShieldCheck } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState({ label: '', color: '', bg: '' });

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      setPassword('');
      return;
    }

    // ensure at least one of each selected type if possible
    const tempArr = [];
    if (includeUppercase) tempArr.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]);
    if (includeLowercase) tempArr.push('abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]);
    if (includeNumbers) tempArr.push('0123456789'[Math.floor(Math.random() * 10)]);
    if (includeSymbols) tempArr.push('!@#$%^&*()_+~`|}{[]:;?><,./-='[Math.floor(Math.random() * 29)]);

    for (let i = tempArr.length; i < length; i++) {
      tempArr.push(charset[Math.floor(Math.random() * charset.length)]);
    }

    // shuffle
    for (let i = tempArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
    }

    const finalPass = tempArr.join('').substring(0, length);
    setPassword(finalPass);
    calculateStrength(finalPass);
  };

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score += 1;
    if (pass.length > 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) {
      setStrength({ label: 'Weak', color: 'text-rose-500', bg: 'bg-rose-500' });
    } else if (score <= 4) {
      setStrength({ label: 'Medium', color: 'text-amber-500', bg: 'bg-amber-500' });
    } else {
      setStrength({ label: 'Strong', color: 'text-emerald-500', bg: 'bg-emerald-500' });
    }
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="space-y-6 animate-fade-in-up font-inter max-w-4xl mx-auto h-full">
      <div className="glass-card flex flex-col rounded-3xl overflow-hidden shadow-2xl relative">
        <header className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center px-6 py-4 z-10 shrink-0 gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <KeyRound size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Password Generator</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Create secure, random passwords</p>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 bg-white/50 dark:bg-[#0A0A14]/50">
          <div className="relative">
            <div className="absolute top-0 right-0 p-4 flex gap-2">
              <button onClick={generatePassword} className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/30 rounded-lg transition-all" title="Regenerate">
                <RefreshCw size={20} />
              </button>
              <button onClick={handleCopy} className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30 rounded-lg transition-all relative" title="Copy Password">
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
            <div className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 min-h-[120px] flex items-center justify-center break-all text-center">
              <span className={`text-3xl md:text-4xl font-jetbrains-mono tracking-wider font-bold ${password ? 'text-slate-800 dark:text-slate-100' : 'text-slate-300 dark:text-slate-700'}`}>
                {password || 'Select options'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className={strength.color} size={18} />
              <span className={`text-sm font-bold uppercase tracking-wider ${strength.color}`}>{strength.label} Password</span>
            </div>
            <div className="flex gap-1 h-2 w-32 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full ${strength.bg} transition-all duration-300`} style={{ width: strength.label === 'Strong' ? '100%' : strength.label === 'Medium' ? '66%' : '33%' }}></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-slate-700 dark:text-slate-300">
                <span>Password Length</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-lg">{length}</span>
              </div>
              <input 
                type="range" 
                min="4" 
                max="64" 
                value={length} 
                onChange={(e) => setLength(parseInt(e.target.value))} 
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'uppercase', label: 'Uppercase Letters (A-Z)', state: includeUppercase, setState: setIncludeUppercase },
                { id: 'lowercase', label: 'Lowercase Letters (a-z)', state: includeLowercase, setState: setIncludeLowercase },
                { id: 'numbers', label: 'Numbers (0-9)', state: includeNumbers, setState: setIncludeNumbers },
                { id: 'symbols', label: 'Symbols (!@#$...)', state: includeSymbols, setState: setIncludeSymbols },
              ].map((option) => (
                <label key={option.id} className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 cursor-pointer hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-colors group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      checked={option.state} 
                      onChange={(e) => {
                        // Prevent unchecking the last option
                        if (!e.target.checked && 
                            [includeUppercase, includeLowercase, includeNumbers, includeSymbols].filter(Boolean).length === 1) {
                          return;
                        }
                        option.setState(e.target.checked);
                      }}
                      className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-slate-600 rounded cursor-pointer checked:bg-emerald-600 checked:border-emerald-600 transition-all"
                    />
                    <Check className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" size={14} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">About Secure Passwords</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
          A strong password acts as the primary defense against unauthorized access to your accounts. It should be at least 12-16 characters long and include a mix of uppercase and lowercase letters, numbers, and symbols. Randomly generated passwords are significantly more resilient against dictionary and brute-force attacks than human-created ones, which often rely on predictable patterns, words, or personal information.
        </p>
      </div>
    </section>
  );
}


// Indian Example: Swati from Jalandhar uses this tool to check variables.
