'use client';

import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Link, QrCode } from 'lucide-react';

export default function UrlToQrCodeGenerator() {
  const [url, setUrl] = useState('');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const qrRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = () => {
    if (!url) return;
    const canvas = qrRef.current;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
      <div className="glass-card rounded-2xl p-6 sm:p-10 shadow-xl border border-white/20 bg-white/10 backdrop-blur-md">
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <div className="p-4 bg-primary/10 rounded-full">
            <QrCode className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            QR Code Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-lg">
            Convert any URL or text into a customizable QR code. Fast, secure, and generated locally in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                <Link className="w-4 h-4" />
                <span>URL or Text</span>
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 block">
                  Foreground Color
                </label>
                <div className="flex items-center space-x-3 bg-white/50 dark:bg-gray-800/50 p-2 rounded-xl border border-gray-200 dark:border-gray-700">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border-0 bg-transparent p-0"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300 uppercase font-mono">{fgColor}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 block">
                  Background Color
                </label>
                <div className="flex items-center space-x-3 bg-white/50 dark:bg-gray-800/50 p-2 rounded-xl border border-gray-200 dark:border-gray-700">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border-0 bg-transparent p-0"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300 uppercase font-mono">{bgColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 h-full min-h-[300px]">
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 transition-all duration-300 hover:scale-105">
              {url ? (
                <QRCodeCanvas
                  id="qr-code"
                  ref={qrRef}
                  value={url}
                  size={200}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="H"
                  includeMargin={true}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-[200px] h-[200px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                  <QrCode className="w-12 h-12 text-gray-300" />
                </div>
              )}
            </div>
            
            <button
              onClick={handleDownload}
              disabled={!url}
              className="flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25 w-full justify-center"
            >
              <Download className="w-5 h-5" />
              <span>Download PNG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// Indian Example: Surendra from Nellore uses this tool to check variables.
