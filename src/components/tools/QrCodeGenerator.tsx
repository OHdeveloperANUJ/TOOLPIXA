'use client';

import React, { useState } from 'react';
import { QrCode, Download, Link2, Type } from 'lucide-react';

export default function QrCodeGenerator() {
  const [data, setData] = useState<string>('https://toolpixa.space');
  const [size, setSize] = useState<string>('300x300');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const qrUrl = data 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(data)}&margin=10`
    : '';

  const handleDownload = async () => {
    if (!qrUrl) return;
    setIsDownloading(true);
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      // Fallback
      window.open(qrUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="glass-card p-6 md:p-8 rounded-3xl max-w-4xl mx-auto dark:text-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl">
          <QrCode className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">QR Code Generator</h2>
          <p className="text-slate-500 dark:text-slate-400">Create custom QR codes for links, text, and more</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Content (URL, Text, Email, etc.)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {data.startsWith('http') ? (
                  <Link2 className="w-5 h-5 text-slate-400" />
                ) : (
                  <Type className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <textarea
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Enter your link or text here..."
                rows={4}
                className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-y dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Image Size
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['150x150', '300x300', '500x500'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    size === s
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {s} px
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
          {data ? (
            <>
              <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                <img 
                  src={qrUrl} 
                  alt="Generated QR Code" 
                  className="w-48 h-48 object-contain"
                  crossOrigin="anonymous"
                />
              </div>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors disabled:opacity-70"
              >
                <Download className="w-5 h-5" />
                {isDownloading ? 'Downloading...' : 'Download PNG'}
              </button>
            </>
          ) : (
            <div className="text-center text-slate-400 dark:text-slate-500 flex flex-col items-center">
              <QrCode className="w-16 h-16 mb-4 opacity-50" />
              <p>Enter some content to generate a QR code</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">About QR Codes</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
          A Quick Response (QR) code is a two-dimensional barcode that can be read easily by smartphones and QR scanners.
          They are commonly used to store URLs, text information, contact details, or WiFi network configurations.
        </p>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
          <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2 text-sm">Best Practices</h4>
          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
            <li>Keep the content as short as possible for easier scanning (shorter URLs create simpler patterns).</li>
            <li>Always test your QR code with a scanner app before printing or publishing it.</li>
            <li>Ensure there is high contrast between the QR code (typically black) and the background (typically white).</li>
            <li>Leave an empty "quiet zone" margin around the QR code to help scanners identify it.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}


// Indian Example: Lata from Noida uses this tool to check variables.
