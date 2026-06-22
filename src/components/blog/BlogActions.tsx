'use client';

import React, { useState } from 'react';

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-3">
      <button 
        onClick={handleShare}
        className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 hover:scale-110 active:scale-95 transition-all text-on-surface hover:text-primary shadow-lg"
        title="Share this post"
      >
        <span className="material-symbols-outlined text-[18px]">share</span>
      </button>
      <button 
        onClick={handleCopyLink}
        className="relative h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 hover:scale-110 active:scale-95 transition-all text-on-surface hover:text-primary shadow-lg"
        title="Copy link"
      >
        <span className="material-symbols-outlined text-[18px]">
          {copied ? 'check' : 'link'}
        </span>
        {copied && (
          <span className="absolute -top-8 bg-surface-bright text-on-surface text-xs font-label-md py-1 px-2 rounded-md shadow-xl border border-white/10">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}

export function FollowButton({ authorName }: { authorName: string }) {
  const [following, setFollowing] = useState(false);

  return (
    <button 
      onClick={() => setFollowing(!following)}
      className={`text-sm font-label-md flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        following 
          ? 'bg-white/10 text-on-surface border border-white/20' 
          : 'bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(var(--color-primary),0.5)]'
      }`}
    >
      <span className="material-symbols-outlined text-[16px]">
        {following ? 'check' : 'add'}
      </span>
      {following ? 'Following' : `Follow ${authorName.split(' ')[0]}`}
    </button>
  );
}
