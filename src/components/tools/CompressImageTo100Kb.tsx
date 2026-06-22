'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, AlertCircle, RefreshCw } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export default function CompressImageTo100Kb() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPEG, PNG, WebP).');
      return;
    }

    setOriginalFile(file);
    setOriginalPreview(URL.createObjectURL(file));
    setCompressedFile(null);
    setCompressedPreview(null);
    setError(null);
    
    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: 0.1, // 100KB
        useWebWorker: true,
      };
      
      const compressedBlob = await imageCompression(file, options);
      const compressed = new File([compressedBlob], file.name, {
        type: compressedBlob.type,
      });

      setCompressedFile(compressed);
      setCompressedPreview(URL.createObjectURL(compressed));
    } catch (err) {
      console.error(err);
      setError('An error occurred during compression.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadImage = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed-100kb-${compressedFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
      <div className="glass-card bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-10 transition-all duration-300">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Compress Image to 100KB
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Instantly compress your images to under 100KB while maintaining the best possible quality. Perfect for web uploads and strict file size limits.
          </p>
        </div>

        {!originalFile && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`relative group cursor-pointer border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Click or drag image here
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Supports JPG, PNG, WebP
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center space-x-3 text-red-600 dark:text-red-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {originalFile && (
          <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Original Image */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2 text-gray-500" />
                    Original
                  </h3>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                    {formatSize(originalFile.size)}
                  </span>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group">
                  {originalPreview && (
                    <img
                      src={originalPreview}
                      alt="Original"
                      className="w-full h-full object-contain p-2"
                    />
                  )}
                </div>
              </div>

              {/* Compressed Image */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2 text-indigo-500" />
                    Compressed
                  </h3>
                  {compressedFile && (
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                      {formatSize(compressedFile.size)}
                    </span>
                  )}
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  {isCompressing ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                      <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium">Compressing...</p>
                    </div>
                  ) : compressedPreview ? (
                    <img
                      src={compressedPreview}
                      alt="Compressed"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => {
                  setOriginalFile(null);
                  setCompressedFile(null);
                  setOriginalPreview(null);
                  setCompressedPreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              >
                Start Over
              </button>
              <button
                onClick={downloadImage}
                disabled={!compressedFile || isCompressing}
                className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 text-white transition-all transform active:scale-95 ${
                  !compressedFile || isCompressing
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/25'
                }`}
              >
                <Download className="w-5 h-5" />
                <span>Download (Under 100KB)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
