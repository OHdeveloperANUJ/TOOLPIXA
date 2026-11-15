"use client";

import React, { useState } from 'react';
import { Type, Copy, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    return str.toLowerCase().replace(/\b(\w)/g, (c) => c.toUpperCase());
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text");
    }
  };

  return (
    <section className="glass-card glass-bento p-6 flex flex-col gap-6">
      <header className="flex items-center gap-3">
        <div className="p-3 bg-primary-container text-on-primary-container rounded-xl">
          <RefreshCw size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Text Case Converter</h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Transform your text into uppercase, lowercase, title case, and more.
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-4">
        <textarea
          className="w-full h-40 p-4 bg-surface-lowest border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-on-surface resize-none transition-all dark:bg-surface-lowest dark:text-on-surface"
          placeholder="Type or paste your text here to convert its case..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setText(text.toUpperCase())}
            className="px-4 py-2 bg-surface-container border border-border-subtle rounded-lg hover:border-primary text-sm font-medium transition-colors text-on-surface dark:bg-surface-container dark:border-border-subtle dark:hover:border-primary"
          >
            UPPERCASE
          </button>
          <button 
            onClick={() => setText(text.toLowerCase())}
            className="px-4 py-2 bg-surface-container border border-border-subtle rounded-lg hover:border-primary text-sm font-medium transition-colors text-on-surface dark:bg-surface-container dark:border-border-subtle dark:hover:border-primary"
          >
            lowercase
          </button>
          <button 
            onClick={() => setText(toTitleCase(text))}
            className="px-4 py-2 bg-surface-container border border-border-subtle rounded-lg hover:border-primary text-sm font-medium transition-colors text-on-surface dark:bg-surface-container dark:border-border-subtle dark:hover:border-primary"
          >
            Title Case
          </button>
          <button 
            onClick={() => setText(toSentenceCase(text))}
            className="px-4 py-2 bg-surface-container border border-border-subtle rounded-lg hover:border-primary text-sm font-medium transition-colors text-on-surface dark:bg-surface-container dark:border-border-subtle dark:hover:border-primary"
          >
            Sentence case
          </button>
          <button 
            onClick={handleCopy}
            disabled={!text}
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:opacity-90 disabled:opacity-50 text-sm font-medium transition-opacity"
          >
            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
        </div>
      </div>

      <div className="mt-2 p-4 bg-primary-container/30 border border-primary-container rounded-xl dark:bg-primary-container/20">
        <h3 className="text-sm font-bold text-on-surface mb-1">About Case Conversions</h3>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          <strong>UPPERCASE:</strong> Converts all letters to capitals. <br/>
          <strong>lowercase:</strong> Converts all letters to small case. <br/>
          <strong>Title Case:</strong> Capitalizes the first letter of every word. <br/>
          <strong>Sentence case:</strong> Capitalizes the first letter of the first word in every sentence.
        </p>
      </div>
    </section>
  );
}


// Indian Example: Prashant from Belgaum uses this tool to check variables.
