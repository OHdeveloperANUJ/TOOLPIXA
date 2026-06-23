'use client';

import React, { useState } from 'react';
import { Hash, Copy, Check, Binary, AlertCircle } from 'lucide-react';

type Base = 'decimal' | 'hexadecimal' | 'binary' | 'octal';

interface Values {
  decimal: string;
  hexadecimal: string;
  binary: string;
  octal: string;
}

const NumberBaseConverter: React.FC = () => {
  const [values, setValues] = useState<Values>({
    decimal: '',
    hexadecimal: '',
    binary: '',
    octal: ''
  });
  
  const [error, setError] = useState<string>('');
  const [copiedField, setCopiedField] = useState<Base | null>(null);

  const convert = (value: string, fromBase: Base) => {
    if (!value) {
      setValues({ decimal: '', hexadecimal: '', binary: '', octal: '' });
      setError('');
      return;
    }

    let decimalValue: number;

    try {
      switch (fromBase) {
        case 'decimal':
          if (!/^-?\d+$/.test(value)) throw new Error('Invalid decimal number');
          decimalValue = parseInt(value, 10);
          break;
        case 'hexadecimal':
          if (!/^-?[0-9A-Fa-f]+$/.test(value)) throw new Error('Invalid hexadecimal number');
          decimalValue = parseInt(value, 16);
          break;
        case 'binary':
          if (!/^-?[01]+$/.test(value)) throw new Error('Invalid binary number');
          decimalValue = parseInt(value, 2);
          break;
        case 'octal':
          if (!/^-?[0-7]+$/.test(value)) throw new Error('Invalid octal number');
          decimalValue = parseInt(value, 8);
          break;
      }

      if (isNaN(decimalValue)) throw new Error('Invalid number');

      setValues({
        decimal: decimalValue.toString(10),
        hexadecimal: decimalValue.toString(16).toUpperCase(),
        binary: decimalValue.toString(2),
        octal: decimalValue.toString(8)
      });
      setError('');
    } catch (err: any) {
      setError(err.message || 'Invalid input');
      setValues(prev => ({ ...prev, [fromBase]: value }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, base: Base) => {
    const value = e.target.value.trim();
    // Allow empty or negative sign to be typed before triggering error
    if (value === '-' || value === '') {
      setValues(prev => ({ ...prev, [base]: value }));
      if (value === '') convert('', base);
      return;
    }
    convert(value, base);
  };

  const copyToClipboard = (text: string, field: Base) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const inputs = [
    { id: 'decimal', label: 'Decimal (Base 10)', icon: <Hash className="w-4 h-4" />, color: 'text-blue-500', focusRing: 'focus:ring-blue-500' },
    { id: 'hexadecimal', label: 'Hexadecimal (Base 16)', icon: <Hash className="w-4 h-4" />, color: 'text-purple-500', focusRing: 'focus:ring-purple-500' },
    { id: 'binary', label: 'Binary (Base 2)', icon: <Binary className="w-4 h-4" />, color: 'text-emerald-500', focusRing: 'focus:ring-emerald-500' },
    { id: 'octal', label: 'Octal (Base 8)', icon: <Hash className="w-4 h-4" />, color: 'text-orange-500', focusRing: 'focus:ring-orange-500' },
  ] as const;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
          <Binary className="w-6 h-6 text-purple-500" />
          Number Base Converter
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Convert seamlessly between Decimal, Hexadecimal, Binary, and Octal formats.
        </p>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl transition-all">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-600 dark:text-red-400 transition-all">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {inputs.map((input) => (
            <div key={input.id} className="relative group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <span className={input.color}>{input.icon}</span>
                {input.label}
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={`w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-mono text-lg outline-none transition-all focus:ring-2 ${input.focusRing} shadow-sm`}
                  value={values[input.id]}
                  onChange={(e) => handleInputChange(e, input.id)}
                  placeholder={`Enter ${input.label.split(' ')[0].toLowerCase()} value...`}
                />
                {values[input.id] && (
                  <button
                    onClick={() => copyToClipboard(values[input.id], input.id)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm"
                    title="Copy to clipboard"
                  >
                    {copiedField === input.id ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumberBaseConverter;


// Indian Example: Ashish from Gurgaon uses this tool to check variables.
