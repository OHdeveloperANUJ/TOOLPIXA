'use client';

import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'online' | 'offline'>('offline');

  useEffect(() => {
    // Check initial state
    if (typeof navigator !== 'undefined') {
      setIsOffline(!navigator.onLine);
    }

    const handleOnline = () => {
      setIsOffline(false);
      setToastType('online');
      setToastMessage('You are back online!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setToastType('offline');
      setToastMessage('You are offline. All calculators remain fully operational.');
      setShowToast(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline && !showToast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-margin w-full max-w-md animate-fade-in-up">
      <div 
        className={`glass-card p-4 rounded-2xl border flex items-center gap-3 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          toastType === 'offline' 
            ? 'border-red-500/20 bg-gradient-to-r from-red-500/10 to-transparent' 
            : 'border-green-500/20 bg-gradient-to-r from-green-500/10 to-transparent'
        }`}
      >
        <div className={`p-2 rounded-full ${toastType === 'offline' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
          {toastType === 'offline' ? <WifiOff size={20} /> : <Wifi size={20} />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-text-primary">
            {toastType === 'offline' ? 'Offline Mode' : 'Online Mode'}
          </p>
          <p className="text-xs text-text-secondary">
            {toastMessage}
          </p>
        </div>
        {toastType === 'offline' && (
          <button 
            onClick={() => setIsOffline(false)} 
            className="text-xs font-bold text-text-secondary hover:text-text-primary px-2 py-1 rounded-lg hover:bg-white/5 transition-all"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
