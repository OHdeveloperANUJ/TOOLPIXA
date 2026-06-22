"use client";

import React, { useState } from 'react';
import { Type, Hash, AlignLeft, BarChart2 } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;

  return (
    <section className="glass-card glass-bento p-6 flex flex-col gap-6">
      <header className="flex items-center gap-3">
        <div className="p-3 bg-primary-container text-on-primary-container rounded-xl">
          <Type size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Word Counter</h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Count words, characters, and paragraphs in real-time.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface-lowest border border-border-subtle flex flex-col items-center justify-center text-center">
          <Hash className="text-primary mb-2" size={20} />
          <span className="text-3xl font-bold text-on-surface">{words}</span>
          <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mt-1">Words</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-lowest border border-border-subtle flex flex-col items-center justify-center text-center">
          <Type className="text-primary mb-2" size={20} />
          <span className="text-3xl font-bold text-on-surface">{characters}</span>
          <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mt-1">Characters</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-lowest border border-border-subtle flex flex-col items-center justify-center text-center">
          <AlignLeft className="text-primary mb-2" size={20} />
          <span className="text-3xl font-bold text-on-surface">{charactersNoSpaces}</span>
          <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mt-1">No Spaces</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-lowest border border-border-subtle flex flex-col items-center justify-center text-center">
          <BarChart2 className="text-primary mb-2" size={20} />
          <span className="text-3xl font-bold text-on-surface">{paragraphs}</span>
          <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mt-1">Paragraphs</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="word-counter-input" className="text-sm font-semibold text-on-surface">
          Your Text
        </label>
        <textarea
          id="word-counter-input"
          className="w-full h-48 p-4 bg-surface-lowest border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-on-surface resize-none transition-all dark:bg-surface-lowest dark:text-on-surface"
          placeholder="Paste or type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      
      <div className="mt-2 p-4 bg-primary-container/30 border border-primary-container rounded-xl dark:bg-primary-container/20">
        <h3 className="text-sm font-bold text-on-surface mb-1">How it works</h3>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          The Word Counter analyzes your text instantly as you type. It splits words using standard whitespace characters, counts total characters (with and without spaces), and determines paragraphs by identifying line breaks. Perfect for SEO optimization, essays, and social media posts.
        </p>
      </div>
    </section>
  );
}
