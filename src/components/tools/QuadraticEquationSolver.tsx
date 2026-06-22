"use client";

import React, { useState } from 'react';
import { Calculator, AlertCircle, Info } from 'lucide-react';

export default function QuadraticEquationSolver() {
  const [a, setA] = useState<number | ''>('');
  const [b, setB] = useState<number | ''>('');
  const [c, setC] = useState<number | ''>('');

  const calculateRoots = () => {
    if (a === '' || b === '' || c === '') return null;
    if (a === 0) return { error: "Coefficient 'a' cannot be zero in a quadratic equation." };
    
    const discriminant = b * b - 4 * a * c;
    if (discriminant > 0) {
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return { root1: root1.toFixed(4), root2: root2.toFixed(4), type: 'Two Real Roots' };
    } else if (discriminant === 0) {
      const root = -b / (2 * a);
      return { root1: root.toFixed(4), root2: root.toFixed(4), type: 'One Real Root (Repeated)' };
    } else {
      const realPart = (-b / (2 * a)).toFixed(4);
      const imaginaryPart = (Math.sqrt(Math.abs(discriminant)) / (2 * a)).toFixed(4);
      return { 
        root1: `${realPart} + ${imaginaryPart}i`, 
        root2: `${realPart} - ${imaginaryPart}i`, 
        type: 'Two Complex Roots' 
      };
    }
  };

  const result = calculateRoots();

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-on-surface">Quadratic Equation Solver</h2>
      </div>

      <div className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Coefficient a</label>
            <input 
              type="number" 
              value={a} 
              onChange={(e) => setA(e.target.value ? Number(e.target.value) : '')} 
              className="w-full px-4 py-2 rounded-lg border border-outline bg-surface text-on-surface focus:outline-none focus:border-primary dark:bg-surface-lowest transition-colors"
              placeholder="e.g. 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Coefficient b</label>
            <input 
              type="number" 
              value={b} 
              onChange={(e) => setB(e.target.value ? Number(e.target.value) : '')} 
              className="w-full px-4 py-2 rounded-lg border border-outline bg-surface text-on-surface focus:outline-none focus:border-primary dark:bg-surface-lowest transition-colors"
              placeholder="e.g. -3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Coefficient c</label>
            <input 
              type="number" 
              value={c} 
              onChange={(e) => setC(e.target.value ? Number(e.target.value) : '')} 
              className="w-full px-4 py-2 rounded-lg border border-outline bg-surface text-on-surface focus:outline-none focus:border-primary dark:bg-surface-lowest transition-colors"
              placeholder="e.g. 2"
            />
          </div>
        </div>

        {result && (
          <div className="mt-6 p-4 rounded-xl bg-primary-container text-on-primary-container dark:bg-primary/20 dark:text-primary-container border border-primary/20">
            {'error' in result ? (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                <p>{result.error}</p>
              </div>
            ) : (
              <div>
                <p className="font-semibold mb-2">{result.type}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-surface rounded-lg dark:bg-surface-lowest">
                    <span className="text-sm text-on-surface-variant block mb-1">Root 1 (x₁)</span>
                    <span className="text-lg font-mono text-on-surface">{result.root1}</span>
                  </div>
                  <div className="p-3 bg-surface rounded-lg dark:bg-surface-lowest">
                    <span className="text-sm text-on-surface-variant block mb-1">Root 2 (x₂)</span>
                    <span className="text-lg font-mono text-on-surface">{result.root2}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-lowest border border-border-subtle dark:bg-surface-container">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="text-sm text-on-surface-variant">
          <p className="font-semibold text-on-surface mb-1">Formula Used</p>
          <p>The quadratic formula is used to solve equations of the form ax² + bx + c = 0.</p>
          <p className="font-mono mt-2 p-2 bg-surface rounded dark:bg-surface-lowest text-center">
            x = [-b ± √(b² - 4ac)] / 2a
          </p>
        </div>
      </div>
    </section>
  );
}
