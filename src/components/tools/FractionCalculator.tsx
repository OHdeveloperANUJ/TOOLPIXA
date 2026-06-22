'use client';

import React, { useState } from 'react';
import { Divide } from 'lucide-react';

export default function FractionCalculator() {
  const [num1, setNum1] = useState<string>('');
  const [den1, setDen1] = useState<string>('');
  const [op, setOp] = useState<string>('+');
  const [num2, setNum2] = useState<string>('');
  const [den2, setDen2] = useState<string>('');

  function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
  }

  let resNum: number | null = null;
  let resDen: number | null = null;
  let resDec: number | null = null;
  let mixedWhole: number | null = null;
  let mixedNum: number | null = null;

  if (num1 && den1 && num2 && den2 && Number(den1) !== 0 && Number(den2) !== 0) {
    const n1 = Number(num1);
    const d1 = Number(den1);
    const n2 = Number(num2);
    const d2 = Number(den2);

    let rn = 0;
    let rd = 1;
    if (op === '+') {
      rn = n1 * d2 + n2 * d1;
      rd = d1 * d2;
    } else if (op === '-') {
      rn = n1 * d2 - n2 * d1;
      rd = d1 * d2;
    } else if (op === '*') {
      rn = n1 * n2;
      rd = d1 * d2;
    } else if (op === '/') {
      rn = n1 * d2;
      rd = d1 * n2;
    }

    if (rd !== 0) {
      const g = Math.abs(gcd(rn, rd));
      resNum = rn / g;
      resDen = rd / g;
      if (resDen < 0) {
        resNum = -resNum;
        resDen = -resDen;
      }
      resDec = resNum / resDen;

      if (Math.abs(resNum) >= resDen && resDen !== 1) {
        mixedWhole = Math.trunc(resNum / resDen);
        mixedNum = Math.abs(resNum % resDen);
      }
    }
  }

  return (
    <section className="space-y-8 animate-fade-in-up font-inter max-w-4xl mx-auto">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-3">
          <Divide className="w-8 h-8 text-cyan-500" />
          Fraction Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Add, subtract, multiply, and divide fractions easily. Calculates simplified fractions and decimals.
        </p>
      </div>

      <div className="glass-card p-8 rounded-3xl group transition-colors duration-500">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
          
          {/* Fraction 1 */}
          <div className="flex flex-col gap-2 w-24">
            <input 
              type="number" 
              value={num1} 
              onChange={e => setNum1(e.target.value)}
              placeholder="Num 1"
              className="w-full bg-slate-100 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-cyan-400 p-3 text-center text-slate-900 dark:text-white font-bold text-xl rounded-xl focus:outline-none transition-all"
            />
            <div className="h-1 bg-slate-300 dark:bg-slate-700 rounded-full w-full"></div>
            <input 
              type="number" 
              value={den1} 
              onChange={e => setDen1(e.target.value)}
              placeholder="Den 1"
              className="w-full bg-slate-100 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-cyan-400 p-3 text-center text-slate-900 dark:text-white font-bold text-xl rounded-xl focus:outline-none transition-all"
            />
          </div>

          {/* Operator */}
          <div className="w-20">
            <select 
              value={op} 
              onChange={e => setOp(e.target.value)}
              className="w-full appearance-none bg-cyan-100 dark:bg-cyan-900/30 border-2 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 p-4 text-center font-black text-3xl rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              <option value="+">+</option>
              <option value="-">−</option>
              <option value="*">×</option>
              <option value="/">÷</option>
            </select>
          </div>

          {/* Fraction 2 */}
          <div className="flex flex-col gap-2 w-24">
            <input 
              type="number" 
              value={num2} 
              onChange={e => setNum2(e.target.value)}
              placeholder="Num 2"
              className="w-full bg-slate-100 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-cyan-400 p-3 text-center text-slate-900 dark:text-white font-bold text-xl rounded-xl focus:outline-none transition-all"
            />
            <div className="h-1 bg-slate-300 dark:bg-slate-700 rounded-full w-full"></div>
            <input 
              type="number" 
              value={den2} 
              onChange={e => setDen2(e.target.value)}
              placeholder="Den 2"
              className="w-full bg-slate-100 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-cyan-400 p-3 text-center text-slate-900 dark:text-white font-bold text-xl rounded-xl focus:outline-none transition-all"
            />
          </div>

          {/* Equals sign */}
          <div className="text-4xl font-black text-slate-400 dark:text-slate-500 mx-2">=</div>

          {/* Result Display */}
          <div className="flex items-center gap-6 min-w-[120px] justify-center bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-inner">
            {resNum !== null && resDen !== null ? (
              <>
                <div className="flex flex-col gap-2 w-20">
                  <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{resNum}</div>
                  {resDen !== 1 && (
                    <>
                      <div className="h-1 bg-cyan-200 dark:bg-cyan-800/50 rounded-full w-full"></div>
                      <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{resDen}</div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <span className="text-slate-400 dark:text-slate-600 font-bold text-xl">--</span>
            )}
          </div>
        </div>

        {/* Detailed Results */}
        {resDec !== null && (
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl">
              <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider font-bold block mb-2">Decimal Value</span>
              <div className="text-3xl font-black text-slate-900 dark:text-white break-words">
                {resDec % 1 === 0 ? resDec : resDec.toFixed(4).replace(/\.?0+$/, '')}
              </div>
            </div>
            
            {mixedWhole !== null && mixedNum !== null && resDen !== null && (
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl flex flex-col justify-center">
                <span className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider font-bold block mb-2">Mixed Number</span>
                <div className="flex items-center gap-3 text-3xl font-black text-slate-900 dark:text-white">
                  <span>{mixedWhole}</span>
                  <div className="flex flex-col items-center gap-1 text-xl">
                    <span>{mixedNum}</span>
                    <div className="h-0.5 bg-slate-400 w-full"></div>
                    <span>{resDen}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">How it works</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          Fractions represent a part of a whole, consisting of a numerator (top number) and a denominator (bottom number). 
        </p>
        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-5">
          <li><strong>Addition / Subtraction:</strong> Find a common denominator, then add/subtract the numerators. Formula: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">a/b ± c/d = (ad ± bc) / bd</code></li>
          <li><strong>Multiplication:</strong> Multiply the numerators together, and the denominators together. Formula: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">a/b × c/d = (a × c) / (b × d)</code></li>
          <li><strong>Division:</strong> Multiply the first fraction by the reciprocal of the second. Formula: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">a/b ÷ c/d = a/b × d/c = (a × d) / (b × c)</code></li>
        </ul>
      </div>
    </section>
  );
}
