'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, Crop, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export default function ResizeImageForPassport() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [passportUrl, setPassportUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setOriginalUrl(URL.createObjectURL(selectedFile));
      setPassportUrl(null);
    }
  };

  const processPassportImage = () => {
    if (!originalUrl || !canvasRef.current) return;
    
    setIsProcessing(true);
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = originalUrl;
    
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }
      
      // Standard Passport Size: 600x600 px (2x2 inches at 300 DPI)
      const targetSize = 600;
      canvas.width = targetSize;
      canvas.height = targetSize;
      
      // Fill with white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetSize, targetSize);
      
      // Calculate cropping to center the image (cover behavior)
      const scale = Math.max(targetSize / img.width, targetSize / img.height);
      const x = (targetSize - img.width * scale) / 2;
      const y = (targetSize - img.height * scale) / 2;
      
      // Smooth scaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      setPassportUrl(dataUrl);
      setIsProcessing(false);
    };
    
    img.onerror = () => {
      alert("Failed to load image for processing.");
      setIsProcessing(false);
    };
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-4 md:p-6">
      <div className="glass-card bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-indigo-500 to-cyan-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Create Passport Photo
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Automatically crop and resize your image to standard passport size (2x2 inches / 600x600px).
          </p>
        </div>

        {/* Hidden Canvas for processing */}
        <canvas ref={canvasRef} className="hidden" />

        {!file ? (
          <div 
            className="border-2 border-dashed border-indigo-300 dark:border-indigo-700/50 rounded-2xl p-16 text-center hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all cursor-pointer group bg-white/5 dark:bg-black/5"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            <div className="bg-indigo-100 dark:bg-indigo-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Upload className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Upload your photo</h3>
            <p className="text-md text-gray-500 dark:text-gray-400">Use a high-quality, front-facing image</p>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Original Preview */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-full flex justify-between items-center px-2">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-indigo-500" /> Original
                  </h3>
                </div>
                <div className="w-full relative aspect-square rounded-2xl overflow-hidden bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-inner">
                  {originalUrl && <img src={originalUrl} alt="Original" className="object-contain w-full h-full p-2" />}
                </div>
              </div>

              {/* Passport Output */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-full flex justify-between items-center px-2">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500" /> Passport Size (600x600)
                  </h3>
                </div>
                <div className="w-full relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center shadow-lg">
                  {passportUrl ? (
                    <img src={passportUrl} alt="Passport" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center animate-pulse">
                      <div className="w-32 h-32 border-4 border-gray-200 dark:border-gray-700 rounded-full mb-4 flex items-center justify-center">
                        <Crop className="w-12 h-12 opacity-50" />
                      </div>
                      <p className="font-medium text-center px-4">Standard 2x2 dimensions</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
              <button
                onClick={() => {
                  setFile(null);
                  setOriginalUrl(null);
                  setPassportUrl(null);
                }}
                className="px-8 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-semibold flex items-center gap-2"
              >
                Upload Different Photo
              </button>
              
              {!passportUrl ? (
                <button
                  onClick={processPassportImage}
                  disabled={isProcessing}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg shadow-indigo-500/25 transition-all font-semibold flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  {isProcessing ? (
                    <><Crop className="w-5 h-5 animate-pulse" /> Processing...</>
                  ) : (
                    <><Crop className="w-5 h-5" /> Generate Passport Photo</>
                  )}
                </button>
              ) : (
                <a
                  href={passportUrl}
                  download={`passport_${file?.name || 'photo.jpg'}`}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/25 transition-all font-semibold flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" /> Download Passport Image
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// Indian Example: Krishna from Kochi uses this tool to check variables.
