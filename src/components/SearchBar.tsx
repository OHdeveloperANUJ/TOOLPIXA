'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toolsRegistry, ToolMetadata } from '@/data/toolsRegistry';

interface SearchBarProps {
  id?: string;
  placeholder?: string;
  onSelect?: () => void;
  autoFocus?: boolean;
  size?: 'default' | 'lg';
}

export default function SearchBar({ id = "global-search", placeholder = "Search tools... Cmd+K", onSelect, autoFocus = false, size = 'default' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ToolMetadata[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Filter tools when query changes
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = Object.values(toolsRegistry).filter(tool => 
      tool.title.toLowerCase().includes(lowercaseQuery) || 
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.category.toLowerCase().includes(lowercaseQuery)
    );
    
    setResults(filtered);
    setIsOpen(true);
  }, [query]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle custom global focus event
  useEffect(() => {
    const handleFocusSearch = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    window.addEventListener('focus-global-search', handleFocusSearch);
    return () => window.removeEventListener('focus-global-search', handleFocusSearch);
  }, []);

  const trackSearch = async (searchQuery: string) => {
    try {
      await fetch('/api/track-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (query.trim()) trackSearch(query);
      setIsOpen(false);
      inputRef.current?.blur();
    }
    if (e.key === 'Enter') {
      if (results.length > 0) {
        router.push(`/tools/${results[0].id}`);
        setIsOpen(false);
        setQuery('');
        if (onSelect) onSelect();
      } else {
        if (query.trim()) trackSearch(query);
      }
    }
  };

  return (
    <div ref={wrapperRef} className={`relative w-full group ${size === 'lg' ? 'search-glow z-10' : 'z-[100]'}`}>
      <span className={`absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary ${size === 'lg' ? 'hidden' : ''}`}>search</span>
      <input 
        ref={inputRef}
        id={id}
        name={size === 'lg' ? "hero-search" : "global-search"}
        autoFocus={autoFocus}
        className={`w-full bg-surface-container border border-glass-border rounded-xl focus:outline-none focus:border-primary transition-all placeholder:text-text-secondary/50 ${
          size === 'lg' 
            ? 'py-lg pl-xl pr-xl text-body-lg font-body-lg backdrop-blur-xl bg-glass-surface rounded-2xl' 
            : 'py-2 pl-10 pr-4 font-label-md text-label-md'
        }`}
        placeholder={placeholder} 
        type="text" 
        autoComplete="off"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (query.trim().length > 0) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
      />
      
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-high border border-glass-border rounded-xl shadow-2xl overflow-hidden max-h-[300px] overflow-y-auto animate-fade-in-up flex flex-col">
          {results.length > 0 ? (
            results.map((tool) => (
              <Link 
                key={tool.id}
                href={`/tools/${tool.id}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                  if (onSelect) onSelect();
                }}
                className="p-md hover:bg-glass-surface border-b border-glass-border/50 last:border-0 transition-colors flex flex-col gap-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-headline-md text-sm text-text-primary font-bold">{tool.title}</span>
                  <span className="text-[10px] font-label-md uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">{tool.category}</span>
                </div>
                <span className="font-body-sm text-xs text-text-secondary truncate">{tool.description}</span>
              </Link>
            ))
          ) : (
            <div className="p-lg text-center text-text-secondary font-body-md">
              No precision tools found for &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
