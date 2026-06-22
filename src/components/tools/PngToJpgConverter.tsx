'use client';
import React, { useState, useRef } from 'react';
import { UploadCloud, Download, Image as ImageIcon, ArrowRight, RefreshCw, Sliders } from 'lucide-react';

export default function PngToJpgConverter() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [quality, setQuality] = useState<number>(0.9);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name.replace(/\.[^/.]+$/, ''));
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setConvertedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = () => {
    if (!selectedImage) return;

    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Fill white background for transparent PNGs
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        setConvertedImage(dataUrl);
      }
    };
  };

  const downloadImage = () => {
    if (!convertedImage) return;
    const link = document.createElement('a');
    link.download = `${fileName || 'converted'}.jpg`;
    link.href = convertedImage;
    link.click();
  };

  const reset = () => {
    setSelectedImage(null);
    setConvertedImage(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Re-convert if quality changes and image was already converted
  React.useEffect(() => {
    if (convertedImage) {
      convertImage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality]);

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <div className="glass-card p-8 rounded-2xl shadow-xl bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <ImageIcon className="w-8 h-8 text-green-400" />
            PNG to JPG Converter
          </h2>
          <p className="text-gray-400">Convert your PNG images to JPEG format with customizable quality.</p>
        </div>

        {!selectedImage ? (
          <div 
            className="border-2 border-dashed border-gray-500/50 rounded-xl p-12 text-center hover:border-green-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              accept=".png,image/png" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <UploadCloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-white mb-2">Click or drag PNG image here</p>
            <p className="text-sm text-gray-400">Supports transparent PNGs (background becomes white)</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-4 mb-2">
                <Sliders className="w-5 h-5 text-gray-400" />
                <label className="text-sm font-medium text-gray-300">JPG Quality: {Math.round(quality * 100)}%</label>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="1" 
                step="0.1" 
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full accent-green-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Original */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-gray-300">
                  <span>Original PNG</span>
                </div>
                <div className="aspect-video relative rounded-lg overflow-hidden bg-black/20 border border-white/10 flex items-center justify-center p-2 checkerboard-bg">
                  <img src={selectedImage} alt="Original" className="max-w-full max-h-full object-contain rounded" />
                </div>
              </div>

              {/* Converted */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-gray-300">
                  <span>Converted JPG</span>
                </div>
                <div className="aspect-video relative rounded-lg overflow-hidden bg-black/20 border border-white/10 flex items-center justify-center p-2 bg-white">
                  {convertedImage ? (
                    <img src={convertedImage} alt="Converted" className="max-w-full max-h-full object-contain rounded shadow-sm" />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center">
                      <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                      <span>Ready to convert</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={reset}
                className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium flex items-center gap-2 transition-all border border-gray-600"
              >
                <RefreshCw className="w-5 h-5" />
                Start Over
              </button>

              {!convertedImage ? (
                <button
                  onClick={convertImage}
                  className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium flex items-center gap-2 transition-all shadow-lg shadow-green-500/20"
                >
                  Convert to JPG
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={downloadImage}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                >
                  <Download className="w-5 h-5" />
                  Download JPG
                </button>
              )}
            </div>
          </div>
        )}

        <style dangerouslySetInnerHTML={{__html: `
          .checkerboard-bg {
            background-color: #1a1a1a;
            background-image: linear-gradient(45deg, #2a2a2a 25%, transparent 25%), 
                              linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), 
                              linear-gradient(45deg, transparent 75%, #2a2a2a 75%), 
                              linear-gradient(-45deg, transparent 75%, #2a2a2a 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
          }
        `}} />
      </div>
    </div>
  );
}
