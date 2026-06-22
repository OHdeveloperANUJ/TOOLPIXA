'use client';

import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState<string>('');
  const [errorLine, setErrorLine] = useState<string>('');

  const handlePress = (btn: string) => {
    setErrorLine('');
    if (btn === 'C') {
      setDisplay('');
    } else if (btn === 'DEL') {
      setDisplay(display.slice(0, -1));
    } else if (btn === '=') {
      evaluate(display);
    } else {
      // For some functions, prevent multiple operators or just append
      setDisplay(prev => prev + btn);
    }
  };

  const evaluate = (expr: string) => {
    if (!expr) return;
    try {
      let toEval = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(');
      
      // Basic safety check for brackets
      const openBrackets = (toEval.match(/\(/g) || []).length;
      const closeBrackets = (toEval.match(/\)/g) || []).length;
      if (openBrackets > closeBrackets) {
        toEval += ')'.repeat(openBrackets - closeBrackets);
      }

      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + toEval)();

      if (typeof result !== 'number' || !isFinite(result) || isNaN(result)) {
        setErrorLine('Invalid Expression');
      } else {
        // Fix floating point errors
        const fixed = Number(result.toPrecision(13)).toString();
        setDisplay(fixed);
      }
    } catch (err) {
      setErrorLine('Syntax Error');
    }
  };

  const buttons = [
    'sin(', 'cos(', 'tan(', 'log(', 'ln(',
    '(', ')', 'C', 'DEL', '÷',
    '7', '8', '9', '×', '√(',
    '4', '5', '6', '-', '^',
    '1', '2', '3', '+', 'π',
    '0', '.', '%', '=', 'e'
  ];

  return (
    <section className="space-y-8 animate-fade-in-up font-inter max-w-4xl mx-auto">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-3">
          <Calculator className="w-8 h-8 text-indigo-500" />
          Scientific Calculator
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          A powerful yet simple scientific calculator for standard math functions like trigonometry, logarithms, and more.
        </p>
      </div>

      <div className="glass-card p-6 rounded-3xl group shadow-lg max-w-4xl mx-auto transition-colors duration-500">
        
        {/* Display */}
        <div className="bg-slate-100 dark:bg-slate-900/80 rounded-2xl p-6 mb-6 shadow-inner border-2 border-slate-200 dark:border-slate-800 relative min-h-[120px] flex flex-col justify-end overflow-hidden">
          {errorLine && (
            <div className="text-rose-500 font-semibold text-sm absolute top-4 left-6">
              {errorLine}
            </div>
          )}
          <div className="text-right text-4xl font-black text-slate-900 dark:text-white tracking-wider break-all overflow-y-auto max-h-full">
            {display || '0'}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-5 gap-3">
          {buttons.map((btn, idx) => {
            const isOperator = ['÷', '×', '-', '+', '=', 'C', 'DEL'].includes(btn);
            const isMathFunc = ['sin(', 'cos(', 'tan(', 'log(', 'ln(', '√(', '^', 'π', 'e', '%'].includes(btn);
            const isEqual = btn === '=';
            const isClear = btn === 'C' || btn === 'DEL';

            let btnClass = "py-4 text-lg font-bold rounded-xl transition-all active:scale-95 ";

            if (isEqual) {
              btnClass += "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md";
            } else if (isClear) {
              btnClass += "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-800/50";
            } else if (isOperator) {
              btnClass += "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/50";
            } else if (isMathFunc) {
              btnClass += "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 text-sm md:text-base";
            } else {
              // Numbers & decimals
              btnClass += "bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800";
            }

            return (
              <button 
                key={idx} 
                onClick={() => handlePress(btn)}
                className={btnClass}
              >
                {btn.replace('(', '')}
              </button>
            );
          })}
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl max-w-4xl mx-auto mt-8">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Mathematical Functions Guide</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          This calculator supports standard JavaScript mathematical evaluation. Here's how the functions are processed:
        </p>
        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-5">
          <li><strong>Trigonometry:</strong> <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">sin()</code>, <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">cos()</code>, and <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">tan()</code> evaluate values based on radians.</li>
          <li><strong>Logarithms:</strong> <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">log()</code> represents base-10 logarithm, while <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">ln()</code> is the natural logarithm (base e).</li>
          <li><strong>Constants:</strong> Use <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">π</code> (Pi ≈ 3.14159) and <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">e</code> (Euler's number ≈ 2.71828) for precise calculations.</li>
          <li><strong>Exponents & Roots:</strong> Use <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">^</code> for powers (e.g., <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">2^3 = 8</code>) and <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">√()</code> for square roots.</li>
        </ul>
      </div>
    </section>
  );
}
