'use client';

import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Download, UploadCloud, CheckCircle2, SlidersHorizontal, ArrowRight } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export default function ImageSizeReducer() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [quality, setQuality] = useState<number>(80);
  const [previewOriginal, setPreviewOriginal] = useState<string>('');
  const [previewCompressed, setPreviewCompressed] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      setCompressedFile(null);
      setPreviewOriginal(URL.createObjectURL(file));
      setPreviewCompressed('');
      await compressImage(file, quality);
    }
  };

  const compressImage = async (file: File, q: number) => {
    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: 5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: q / 100
      };
      const compressedBlob = await imageCompression(file, options);
      const compressedFileObj = new File([compressedBlob], `compressed_${file.name}`, {
        type: compressedBlob.type,
      });
      setCompressedFile(compressedFileObj);
      setPreviewCompressed(URL.createObjectURL(compressedBlob));
    } catch (error) {
      console.error(error);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuality = parseInt(e.target.value);
    setQuality(newQuality);
    if (originalFile) {
      compressImage(originalFile, newQuality);
    }
  };

  const handleDownload = () => {
    if (compressedFile && previewCompressed) {
      const link = document.createElement('a');
      link.href = previewCompressed;
      link.download = compressedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-4xl mx-auto shadow-xl border border-white/20 bg-white/10 backdrop-blur-lg">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-200/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400">
            <ImageIcon size={28} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Image Size Reducer</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Compress your JPG, PNG or WEBP images quickly without losing quality.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div 
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />
            <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="text-blue-500 dark:text-blue-400" size={28} />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Click or drag image to upload</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Supports JPG, PNG, WEBP up to 50MB</p>
          </div>

          {originalFile && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-200">
                <span className="flex items-center gap-2"><SlidersHorizontal size={16} /> Compression Quality</span>
                <span className="text-blue-500">{quality}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={handleQualityChange}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Smaller Size</span>
                <span>Better Quality</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[300px] flex flex-col justify-center relative overflow-hidden">
          {!originalFile ? (
            <div className="text-center text-gray-400 dark:text-gray-500 flex flex-col items-center gap-3">
              <ImageIcon size={48} className="opacity-20" />
              <p>Upload an image to see preview</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 text-center bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Original Size</p>
                  <p className="font-bold text-gray-800 dark:text-white">{formatSize(originalFile.size)}</p>
                </div>
                <ArrowRight className="text-gray-400" />
                <div className="flex-1 text-center bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-xl p-3">
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">New Size</p>
                  {isCompressing ? (
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  ) : (
                    <p className="font-bold text-blue-600 dark:text-blue-400">
                      {compressedFile ? formatSize(compressedFile.size) : '...'}
                    </p>
                  )}
                </div>
              </div>

              {previewCompressed && !isCompressing && compressedFile && (
                <div className="text-center">
                  <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium px-3 py-1 rounded-full mb-4">
                    Saved {formatSize(originalFile.size - compressedFile.size)}!
                  </div>
                  <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-4 h-48 bg-gray-100 dark:bg-gray-800">
                    <img src={previewCompressed} alt="Compressed" className="w-full h-full object-contain" />
                  </div>
                  <button
                    onClick={handleDownload}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/25"
                  >
                    <Download size={20} />
                    Download Compressed Image
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// Indian Example: Deepak from Coimbatore uses this tool to check variables.
