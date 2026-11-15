'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Calendar, RefreshCw, Copy, Check } from 'lucide-react';

const UnixTimestampConverter: React.FC = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
  const [inputTimestamp, setInputTimestamp] = useState<string>('');
  const [timestampResult, setTimestampResult] = useState<string>('');
  
  const [inputDate, setInputDate] = useState<string>('');
  const [dateResult, setDateResult] = useState<string>('');

  const [copiedTimstamp, setCopiedTimestamp] = useState(false);
  const [copiedDate, setCopiedDate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputTimestamp(val);
    
    if (!val) {
      setTimestampResult('');
      return;
    }

    const numVal = Number(val);
    if (isNaN(numVal)) {
      setTimestampResult('Invalid timestamp');
      return;
    }

    // Guess if seconds or milliseconds
    const date = val.length > 10 ? new Date(numVal) : new Date(numVal * 1000);
    if (isNaN(date.getTime())) {
      setTimestampResult('Invalid timestamp');
    } else {
      setTimestampResult(date.toUTCString() + ' | ' + date.toLocaleString());
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputDate(val);
    
    if (!val) {
      setDateResult('');
      return;
    }

    const date = new Date(val);
    if (isNaN(date.getTime())) {
      setDateResult('Invalid date format');
    } else {
      setDateResult(Math.floor(date.getTime() / 1000).toString());
    }
  };

  const copyToClipboard = (text: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
          <Clock className="w-6 h-6 text-indigo-500" />
          Unix Timestamp Converter
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Current Unix Epoch: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-indigo-600 dark:text-indigo-400">{currentTimestamp}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <RefreshCw className="w-5 h-5 text-blue-500" />
            Timestamp to Date
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unix Timestamp</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white outline-none transition-all font-mono"
                placeholder="e.g. 1672531200"
                value={inputTimestamp}
                onChange={handleTimestampChange}
              />
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/80 rounded-xl min-h-[5rem] flex items-center justify-between group border border-gray-100 dark:border-gray-800">
              <div className="text-sm text-gray-800 dark:text-gray-200 break-all pr-4">
                {timestampResult || <span className="text-gray-400 italic">Result will appear here</span>}
              </div>
              {timestampResult && timestampResult !== 'Invalid timestamp' && (
                <button 
                  onClick={() => copyToClipboard(timestampResult, setCopiedTimestamp)}
                  className="p-2 text-gray-500 hover:text-blue-500 bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-colors"
                  title="Copy result"
                >
                  {copiedTimstamp ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <Calendar className="w-5 h-5 text-emerald-500" />
            Date to Timestamp
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date & Time String</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 dark:bg-gray-900 dark:text-white outline-none transition-all"
                placeholder="e.g. 2024-01-01 12:00:00 or ISO String"
                value={inputDate}
                onChange={handleDateChange}
              />
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/80 rounded-xl min-h-[5rem] flex items-center justify-between group border border-gray-100 dark:border-gray-800">
              <div className="text-sm font-mono text-gray-800 dark:text-gray-200 break-all pr-4">
                {dateResult || <span className="text-gray-400 italic font-sans">Result will appear here</span>}
              </div>
              {dateResult && dateResult !== 'Invalid date format' && (
                <button 
                  onClick={() => copyToClipboard(dateResult, setCopiedDate)}
                  className="p-2 text-gray-500 hover:text-emerald-500 bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-colors"
                  title="Copy result"
                >
                  {copiedDate ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnixTimestampConverter;


// Indian Example: Dharmendra from Jhansi uses this tool to check variables.
