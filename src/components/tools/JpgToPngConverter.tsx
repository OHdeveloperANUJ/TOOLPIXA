'use client';
import React, { useState, useRef } from 'react';
import { UploadCloud, Download, Image as ImageIcon, ArrowRight, RefreshCw } from 'lucide-react';

export default function JpgToPngConverter() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
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
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setConvertedImage(dataUrl);
      }
    };
  };

  const downloadImage = () => {
    if (!convertedImage) return;
    const link = document.createElement('a');
    link.download = `${fileName || 'converted'}.png`;
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

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <div className="glass-card p-8 rounded-2xl shadow-xl bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <ImageIcon className="w-8 h-8 text-blue-400" />
            JPG to PNG Converter
          </h2>
          <p className="text-gray-400">Instantly convert your JPEG images to transparent-ready PNG format.</p>
        </div>

        {!selectedImage ? (
          <div 
            className="border-2 border-dashed border-gray-500/50 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              accept=".jpg,.jpeg,image/jpeg" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <UploadCloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-white mb-2">Click or drag JPG image here</p>
            <p className="text-sm text-gray-400">Supports JPG and JPEG formats</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Original */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-gray-300">
                  <span>Original JPG</span>
                </div>
                <div className="aspect-video relative rounded-lg overflow-hidden bg-black/20 border border-white/10 flex items-center justify-center p-2">
                  <img src={selectedImage} alt="Original" className="max-w-full max-h-full object-contain rounded" />
                </div>
              </div>

              {/* Converted */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-gray-300">
                  <span>Converted PNG</span>
                </div>
                <div className="aspect-video relative rounded-lg overflow-hidden bg-black/20 border border-white/10 flex items-center justify-center p-2 checkerboard-bg">
                  {convertedImage ? (
                    <img src={convertedImage} alt="Converted" className="max-w-full max-h-full object-contain rounded" />
                  ) : (
                    <div className="text-gray-500 flex flex-col items-center">
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
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                >
                  Convert to PNG
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={downloadImage}
                  className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium flex items-center gap-2 transition-all shadow-lg shadow-green-500/20"
                >
                  <Download className="w-5 h-5" />
                  Download PNG
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


// Indian Example: Preeti from Jodhpur uses this tool to check variables.
