'use client';

import React, { useState } from 'react';
import { Palette, Copy, CheckCircle2 } from 'lucide-react';

function hexToRgb(hex: string) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(x => x + x).join('');
  if (h.length !== 6) return null;
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(255 * f(0)), g: Math.round(255 * f(8)), b: Math.round(255 * f(4)) };
}

export default function ColorConverter() {
  const [hex, setHex] = useState<string>('#4F46E5');
  const [rgb, setRgb] = useState<string>('79, 70, 229');
  const [hsl, setHsl] = useState<string>('243, 76%, 59%');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleHexChange = (val: string) => {
    setHex(val);
    const parsed = hexToRgb(val);
    if (parsed) {
      setRgb(`${parsed.r}, ${parsed.g}, ${parsed.b}`);
      const hData = rgbToHsl(parsed.r, parsed.g, parsed.b);
      setHsl(`${hData.h}, ${hData.s}%, ${hData.l}%`);
    }
  };

  const handleRgbChange = (val: string) => {
    setRgb(val);
    const parts = val.replace(/[^\d,]/g, '').split(',').map(Number);
    if (parts.length === 3 && parts.every(n => !isNaN(n) && n >= 0 && n <= 255)) {
      setHex(rgbToHex(parts[0], parts[1], parts[2]));
      const hData = rgbToHsl(parts[0], parts[1], parts[2]);
      setHsl(`${hData.h}, ${hData.s}%, ${hData.l}%`);
    }
  };

  const handleHslChange = (val: string) => {
    setHsl(val);
    const parts = val.replace(/[^\d,]/g, '').split(',').map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      const rData = hslToRgb(parts[0], parts[1], parts[2]);
      setRgb(`${rData.r}, ${rData.g}, ${rData.b}`);
      setHex(rgbToHex(rData.r, rData.g, rData.b));
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section className="glass-card p-6 md:p-8 rounded-3xl max-w-4xl mx-auto dark:text-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-fuchsia-500/10 dark:bg-fuchsia-500/20 rounded-xl">
          <Palette className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Color Converter</h2>
          <p className="text-slate-500 dark:text-slate-400">Convert colors between HEX, RGB, and HSL formats instantly</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Color Preview & Picker */}
        <div className="flex flex-col gap-4">
          <div 
            className="w-full h-48 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-700 transition-colors"
            style={{ backgroundColor: hexToRgb(hex) ? hex : '#4F46E5' }}
          />
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Choose Color:</label>
            <input 
              type="color" 
              value={hexToRgb(hex) ? hex : '#000000'}
              onChange={(e) => handleHexChange(e.target.value.toUpperCase())}
              className="w-12 h-12 rounded cursor-pointer border-0 p-0 bg-transparent"
            />
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">HEX</label>
            <div className="relative">
              <input
                type="text"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all dark:text-white pr-12 font-mono uppercase"
              />
              <button
                onClick={() => copyToClipboard(hex, 'hex')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
              >
                {copiedField === 'hex' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">RGB</label>
            <div className="relative">
              <input
                type="text"
                value={rgb}
                onChange={(e) => handleRgbChange(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all dark:text-white pr-12 font-mono"
              />
              <button
                onClick={() => copyToClipboard(`rgb(${rgb})`, 'rgb')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
              >
                {copiedField === 'rgb' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">HSL</label>
            <div className="relative">
              <input
                type="text"
                value={hsl}
                onChange={(e) => handleHslChange(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all dark:text-white pr-12 font-mono"
              />
              <button
                onClick={() => copyToClipboard(`hsl(${hsl})`, 'hsl')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
              >
                {copiedField === 'hsl' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">About Color Spaces</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">HEX</h4>
            <p className="text-slate-600 dark:text-slate-400">
              A 6-digit hexadecimal number used in HTML/CSS. It represents Red, Green, and Blue components with 2 digits each.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">RGB</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Red, Green, Blue. Each channel has a value from 0 to 255. Widely used for digital screens.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">HSL</h4>
            <p className="text-slate-600 dark:text-slate-400">
              Hue, Saturation, Lightness. Hue is a degree on the color wheel (0-360), Saturation and Lightness are percentages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
