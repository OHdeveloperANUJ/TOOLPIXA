'use client';

import React, { useState, useMemo } from 'react';

type Spacing = 'single' | '1.5' | 'double';
type FontType = 'times' | 'arial' | 'calibri' | 'courier';

interface FontConfig {
  label: string;
  baseWpp: number; // words per page (single spaced)
}

const FONT_CONFIG: Record<FontType, FontConfig> = {
  times:   { label: 'Times New Roman', baseWpp: 500 },
  arial:   { label: 'Arial',           baseWpp: 450 },
  calibri: { label: 'Calibri',         baseWpp: 550 },
  courier: { label: 'Courier New',     baseWpp: 390 },
};

const SPACING_MULTIPLIERS: Record<Spacing, number> = {
  single: 1,
  '1.5':  1.5,
  double: 2,
};

// Approx. reading speed for academic content
const WORDS_PER_MIN = 230;

function calcWordsPerPage(font: FontType, spacing: Spacing): number {
  const base = FONT_CONFIG[font].baseWpp;
  return Math.round(base / SPACING_MULTIPLIERS[spacing]);
}

const EssayLengthEstimator = () => {
  const [wordCount, setWordCount] = useState<string>('');
  const [spacing, setSpacing] = useState<Spacing>('double');
  const [font, setFont] = useState<FontType>('times');
  const [fontSize, setFontSize] = useState<number>(12);

  // Font size adjustment: word density scales roughly with square of relative font size
  const wordsPerPage = useMemo(() => {
    const base = calcWordsPerPage(font, spacing);
    // Baseline is 12pt; adjust proportionally
    return Math.round(base * Math.pow(12 / fontSize, 2));
  }, [font, spacing, fontSize]);

  const words = useMemo(() => {
    const n = parseInt(wordCount, 10);
    return isNaN(n) || n < 0 ? 0 : n;
  }, [wordCount]);

  const pages = useMemo(() => {
    if (words <= 0) return 0;
    return words / wordsPerPage;
  }, [words, wordsPerPage]);

  const paragraphs   = useMemo(() => Math.ceil(words / 100), [words]);
  const readingMins  = useMemo(() => (words / WORDS_PER_MIN), [words]);

  const formatPages  = (p: number) => p > 0 ? p.toFixed(1) : '0.0';
  const formatTime   = (m: number) => {
    if (m <= 0)  return '—';
    if (m < 1)   return '< 1 min';
    if (m < 60)  return `${Math.round(m)} min`;
    return `${Math.floor(m / 60)}h ${Math.round(m % 60)}m`;
  };

  const pageLabel = (p: number) => {
    const n = Math.ceil(p);
    if (n === 0) return 'Enter a word count';
    if (n === 1) return `~1 page`;
    return `~${n} pages`;
  };

  const SPACINGS: { value: Spacing; label: string }[] = [
    { value: 'single', label: 'Single' },
    { value: '1.5',    label: '1.5x'   },
    { value: 'double', label: 'Double'  },
  ];

  const FONT_SIZES = [10, 11, 12, 14, 16];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Main card */}
      <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 space-y-8">

          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400">
              <span className="material-symbols-outlined text-indigo-400 text-3xl bg-clip-text" style={{ backgroundClip: 'initial', WebkitTextFillColor: '#818cf8' }}>
                description
              </span>
              Essay Length Estimator
            </h2>
            <p className="text-text-secondary mt-1 text-sm">
              Instantly estimate how many pages your essay will span based on word count, font, and spacing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ─── Inputs ──────────────────────────────── */}
            <div className="space-y-6">

              {/* Word Count */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  Word Count
                </label>
                <input
                  type="number"
                  min={0}
                  value={wordCount}
                  onChange={(e) => setWordCount(e.target.value)}
                  placeholder="e.g. 1500"
                  className="w-full bg-gray-900/50 dark:bg-black/30 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-lg"
                />
              </div>

              {/* Line Spacing */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-purple-400 uppercase tracking-widest">
                  Line Spacing
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SPACINGS.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setSpacing(value)}
                      className={`py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                        spacing === value
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                          : 'bg-gray-800/40 text-gray-400 border-transparent hover:bg-gray-800/70'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-fuchsia-400 uppercase tracking-widest">
                  Font (12 pt baseline)
                </label>
                <select
                  value={font}
                  onChange={(e) => setFont(e.target.value as FontType)}
                  className="w-full bg-gray-900/50 dark:bg-black/30 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer"
                >
                  {(Object.keys(FONT_CONFIG) as FontType[]).map((f) => (
                    <option key={f} value={f}>
                      {FONT_CONFIG[f].label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  Font Size (pt)
                </label>
                <div className="flex gap-2 flex-wrap">
                  {FONT_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                        fontSize === size
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                          : 'bg-gray-800/40 text-gray-400 border-transparent hover:bg-gray-800/70'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reference density */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-text-secondary text-xs">
                Reference: <span className="text-indigo-300 font-bold">{wordsPerPage}</span> words per page
                using <span className="text-purple-300 font-semibold">{FONT_CONFIG[font].label} {fontSize}pt</span> ({spacing}-spaced)
              </div>
            </div>

            {/* ─── Results ─────────────────────────────── */}
            <div className="flex flex-col gap-4">

              {/* Main result */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20 flex-1 flex flex-col items-center justify-center relative overflow-hidden min-h-[180px]">
                <div className="absolute top-0 right-0 opacity-5 pointer-events-none select-none">
                  <span className="material-symbols-outlined" style={{ fontSize: 120 }}>description</span>
                </div>
                <p className="text-text-secondary text-xs font-bold uppercase tracking-widest mb-3">Estimated Pages</p>
                <div className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 leading-none">
                  {formatPages(pages)}
                </div>
                <p className="text-gray-500 text-xs mt-3 text-center">{pageLabel(pages)}</p>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center gap-1">
                  <p className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">Paragraphs</p>
                  <p className="text-2xl font-bold text-purple-400">{words > 0 ? paragraphs : '—'}</p>
                  <p className="text-text-secondary text-[10px]">~100 words each</p>
                </div>
                <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center gap-1">
                  <p className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">Read Time</p>
                  <p className="text-2xl font-bold text-cyan-400">{formatTime(readingMins)}</p>
                  <p className="text-text-secondary text-[10px]">@230 wpm</p>
                </div>
              </div>

              {/* Essay type guide */}
              <div className="glass-card p-4 rounded-xl space-y-2">
                <p className="text-text-secondary text-xs font-bold uppercase tracking-widest mb-3">Common Essay Lengths</p>
                {[
                  { type: 'Short Essay',       words: 500,   pages: '1–2' },
                  { type: '5-Paragraph Essay',  words: 1000,  pages: '2–4' },
                  { type: 'Research Paper',     words: 2500,  pages: '5–10' },
                  { type: 'Term Paper',         words: 5000,  pages: '10–20' },
                  { type: 'Thesis / Dissertation', words: 20000, pages: '50–80' },
                ].map(({ type, words: w, pages: p }) => (
                  <div key={type} className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">{type}</span>
                    <span className={`font-bold ${words > 0 && words >= w * 0.8 && words <= w * 1.2 ? 'text-indigo-400' : 'text-text-secondary'}`}>
                      ~{w.toLocaleString('en-IN')} words ({p} pages)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EssayLengthEstimator;

// Indian Example: Priya from Pune uses this tool to estimate how many pages her 2000-word college essay will span.
