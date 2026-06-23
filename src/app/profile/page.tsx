'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, Calculator, ArrowRight, Trash2 } from 'lucide-react';
import { toolsRegistry } from '@/data/toolsRegistry';

const getNormalizedToolId = (toolId: string): string => {
  const legacyMap: Record<string, string> = {
    'home-loan-emi': 'home-loan-emi-calculator',
    'bike-loan-emi': 'bike-loan-emi-calculator',
    'personal-loan-emi': 'personal-loan-emi-calculator',
  };
  return legacyMap[toolId] || toolId;
};

interface HistoryItem {
  id: string;
  toolId: string;
  inputData: any;
  createdAt: string;
}

export default function ProfilePage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load history from local storage
    const storedHistory = localStorage.getItem('toolpixa_history');
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    setLoading(false);
  }, []);

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear your entire calculation history?')) {
      localStorage.removeItem('toolpixa_history');
      setHistory([]);
    }
  };

  const deleteItem = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    localStorage.setItem('toolpixa_history', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-headline-lg font-bold text-text-primary tracking-tight">Your History</h1>
          <p className="text-text-secondary mt-2 font-body-md">Your saved calculations are stored securely on this device.</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors text-sm font-medium whitespace-nowrap"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Clear All</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-headline-sm font-semibold flex items-center gap-2 text-text-primary border-b border-glass-border pb-4">
          <Clock className="text-primary" size={24} />
          Saved Calculations
        </h2>

        {history.length === 0 ? (
          <div className="bg-surface-container border border-glass-border rounded-xl p-8 text-center">
            <Calculator className="mx-auto text-text-secondary/50 mb-4" size={48} />
            <p className="text-text-secondary font-body-md mb-6">You haven't saved any calculations on this device yet.</p>
            <Link 
              href="/tools/bike-loan-emi-calculator" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-medium hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
            >
              Try a Calculator <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {history.map((item) => {
              const normalizedToolId = getNormalizedToolId(item.toolId);
              const toolInfo = toolsRegistry[normalizedToolId];
              const date = new Date(item.createdAt);
              
              return (
                <div key={item.id} className="bg-surface-container border border-glass-border rounded-xl p-6 hover:border-primary/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-headline-sm font-semibold text-text-primary flex items-center gap-2">
                        {toolInfo?.title || 'Unknown Tool'}
                      </h3>
                      <span className="text-xs text-text-secondary font-mono">
                        {date.toLocaleDateString()} {date.toLocaleTimeString()}
                      </span>
                    </div>
                    
                    <div className="bg-surface-container-high rounded-lg p-3 mt-3 text-sm text-text-secondary grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {Object.entries(item.inputData).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-xs uppercase tracking-wider opacity-70 mb-1">{key}</span>
                          <span className="font-mono text-text-primary truncate">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-end">
                    <button 
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                      title="Delete saved calculation"
                    >
                      <Trash2 size={18} />
                    </button>
                    <Link 
                      href={`/tools/${normalizedToolId}`} 
                      className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-colors flex items-center gap-2 text-sm"
                    >
                      Open
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
