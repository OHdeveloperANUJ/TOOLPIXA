'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, ImageIcon, RefreshCw, FileImage } from 'lucide-react';

export default function ResizeImageTo300Kb() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setCompressedFile(null);
      setCompressedUrl(null);
    }
  };

  const compressImageCanvas = async (imageFile: File, maxSizeKB: number): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(imageFile);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No canvas context');

        let width = img.width;
        let height = img.height;
        let quality = 0.9;
        
        // Initial resize if the image is exceptionally large
        const MAX_DIMENSION = 2000;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const tryCompress = (currentQuality: number, currentWidth: number, currentHeight: number) => {
          canvas.width = currentWidth;
          canvas.height = currentHeight;
          
          // Use white background for potential transparency issues when converting to JPEG
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, currentWidth, currentHeight);
          ctx.drawImage(img, 0, 0, currentWidth, currentHeight);
          
          canvas.toBlob((blob) => {
            if (!blob) return reject('Compression failed');
            
            // Check if within bounds or quality/dimensions are getting too low
            if (blob.size / 1024 <= maxSizeKB || currentQuality <= 0.1 || currentWidth < 300) {
              const resultFile = new File([blob], imageFile.name.replace(/\.[^/.]+$/, "") + "_compressed.jpg", {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(resultFile);
            } else {
              // Reduce quality and dimensions slightly to continue compressing
              const newQuality = currentQuality - 0.1;
              const newWidth = Math.round(currentWidth * 0.9);
              const newHeight = Math.round(currentHeight * 0.9);
              tryCompress(newQuality, newWidth, newHeight);
            }
          }, 'image/jpeg', currentQuality);
        };

        tryCompress(quality, width, height);
      };
      img.onerror = () => reject('Image load failed');
    });
  };

  const handleCompress = async () => {
    if (!file) return;

    setIsCompressing(true);
    try {
      let compressed: File;
      try {
        // Attempt to use browser-image-compression if installed
        // @ts-ignore
        const imageCompression = (await import('browser-image-compression')).default;
        const options = {
          maxSizeMB: 0.3, // Precisely under 300KB
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        compressed = await imageCompression(file, options);
      } catch (err) {
        // Fallback to Canvas based compression
        compressed = await compressImageCanvas(file, 300);
      }
      
      setCompressedFile(compressed);
      setCompressedUrl(URL.createObjectURL(compressed));
    } catch (error) {
      console.error('Error compressing image:', error);
      alert('Error compressing image. Please try again.');
    } finally {
      setIsCompressing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-4 md:p-6">
      <div className="glass-card bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Compress Image to 300KB
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Ensure your images meet the strict size limits for forms, applications, and general web usage.
          </p>
        </div>

        {!file ? (
          <div 
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-16 text-center hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all cursor-pointer group bg-white/5 dark:bg-black/5"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            <div className="bg-blue-100 dark:bg-blue-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Upload className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Click to upload or drag & drop</h3>
            <p className="text-md text-gray-500 dark:text-gray-400">Supported formats: JPG, PNG, WEBP, GIF</p>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Original Image Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-500" /> Original
                  </h3>
                  <span className="text-sm font-bold font-mono bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-1.5 rounded-full shadow-inner">
                    {formatSize(file.size)}
                  </span>
                </div>
                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-inner group">
                  {preview && <img src={preview} alt="Original" className="object-contain w-full h-full p-2 group-hover:scale-[1.02] transition-transform duration-300" />}
                </div>
              </div>

              {/* Compressed Image Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <FileImage className="w-5 h-5 text-purple-500" /> Compressed
                  </h3>
                  {compressedFile && (
                    <span className={`text-sm font-bold font-mono px-4 py-1.5 rounded-full shadow-inner ${compressedFile.size <= 300 * 1024 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800'}`}>
                      {formatSize(compressedFile.size)}
                    </span>
                  )}
                </div>
                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-inner group">
                  {compressedUrl ? (
                    <img src={compressedUrl} alt="Compressed" className="object-contain w-full h-full p-2 group-hover:scale-[1.02] transition-transform duration-300" />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center animate-pulse">
                      <FileImage className="w-16 h-16 mb-4 opacity-50" />
                      <p className="font-medium">Compression preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setCompressedFile(null);
                  setCompressedUrl(null);
                }}
                className="px-8 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-semibold flex items-center gap-2"
              >
                Start Over
              </button>
              
              {!compressedFile ? (
                <button
                  onClick={handleCompress}
                  disabled={isCompressing}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 transition-all font-semibold flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  {isCompressing ? (
                    <><RefreshCw className="w-5 h-5 animate-spin" /> Compressing Image...</>
                  ) : (
                    <><RefreshCw className="w-5 h-5" /> Compress Now</>
                  )}
                </button>
              ) : (
                <a
                  href={compressedUrl!}
                  download={compressedFile.name}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25 transition-all font-semibold flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" /> Download Result
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// Indian Example: Ram from Nellore uses this tool to check variables.
