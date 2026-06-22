'use client';

import React, { useState } from 'react';

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 font-label-md text-sm ${
        copied 
          ? 'bg-green-500/10 border-green-500/30 text-green-400' 
          : 'bg-glass-surface border-glass-border text-text-secondary hover:text-text-primary hover:bg-glass-surface-hover'
      }`}
      title="Copy Link to Share"
    >
      <span className="material-symbols-outlined text-[18px]">
        {copied ? 'check_circle' : 'ios_share'}
      </span>
      {copied ? 'Link Copied!' : 'Share Tool'}
    </button>
  );
}
