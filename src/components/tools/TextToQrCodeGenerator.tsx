'use client';
import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QrCode, Download, Settings, RefreshCw, Copy, Check } from 'lucide-react';

export default function TextToQrCodeGenerator() {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const copyToClipboard = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    });
  };

  const resetColors = () => {
    setFgColor('#000000');
    setBgColor('#ffffff');
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <div className="glass-card p-8 rounded-2xl shadow-xl bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <QrCode className="w-8 h-8 text-purple-400" />
            QR Code Generator
          </h2>
          <p className="text-gray-400">Generate customizable QR codes from text or URLs instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Content (Text or URL)</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL here..."
                className="w-full h-32 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
              />
            </div>

            <div className="space-y-4 bg-black/20 p-5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-2 text-gray-300 font-medium pb-2 border-b border-white/10">
                <Settings className="w-4 h-4" />
                Customization
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm text-gray-400">Size: {size}px</label>
                </div>
                <input
                  type="range"
                  min="128"
                  max="1024"
                  step="8"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Foreground</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="h-10 w-full rounded cursor-pointer bg-transparent border-none p-0"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Background</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-10 w-full rounded cursor-pointer bg-transparent border-none p-0"
                    />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={resetColors}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 mt-2 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset Colors
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center justify-center space-y-6 bg-black/20 p-8 rounded-xl border border-white/5">
            <div 
              ref={qrRef} 
              className="p-4 bg-white rounded-xl shadow-2xl transition-all duration-300 flex items-center justify-center min-h-[250px]"
              style={{ backgroundColor: bgColor }}
            >
              {text ? (
                <QRCodeCanvas
                  value={text}
                  size={size}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="H"
                  includeMargin={false}
                  style={{ width: '100%', height: 'auto', maxWidth: '250px' }}
                  className="rounded"
                />
              ) : (
                <div 
                  className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded"
                  style={{ width: Math.min(size, 250), height: Math.min(size, 250) }}
                >
                  <span className="text-gray-400 text-sm text-center px-4">Enter text to generate</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 w-full max-w-[250px]">
              <button
                onClick={downloadQRCode}
                disabled={!text}
                className="flex-1 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20"
              >
                <Download className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={copyToClipboard}
                disabled={!text}
                className="flex-1 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium flex items-center justify-center gap-2 transition-all border border-gray-600"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// Indian Example: Sudhir from Jamnagar uses this tool to check variables.
