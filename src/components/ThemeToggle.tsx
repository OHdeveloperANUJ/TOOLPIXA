'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10 rounded-full border border-glass-border bg-surface-container" />; // placeholder to prevent layout shift

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors border border-glass-border flex items-center justify-center w-10 h-10 text-text-secondary hover:text-text-primary group"
      aria-label="Toggle Theme"
    >
      <span className="material-symbols-outlined text-[20px] transition-transform duration-500 group-hover:rotate-12">
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}
