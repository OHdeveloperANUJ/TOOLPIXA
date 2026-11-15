'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, Trash2, Activity, CheckCircle2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export default function CompressImageTo50Kb() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    setError(null);
    setOriginalFile(file);
    setOriginalPreview(URL.createObjectURL(file));
    setCompressedFile(null);
    setCompressedPreview(null);

    await compressImage(file);
  };

  const compressImage = async (file: File) => {
    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: 0.05, // 50KB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        alwaysKeepResolution: true
      };

      const compressed = await imageCompression(file, options);
      
      setCompressedFile(compressed);
      setCompressedPreview(URL.createObjectURL(compressed));
    } catch (err) {
      console.error(err);
      setError('Error compressing image. Please try another image.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadCompressed = () => {
    if (compressedFile && compressedPreview) {
      const link = document.createElement('a');
      link.href = compressedPreview;
      link.download = `compressed_50kb_${originalFile?.name || 'image.jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const reset = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setCompressedFile(null);
    setCompressedPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-4 md:p-6">
      <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 mb-4 ring-1 ring-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            <Activity className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Compress Image to 50KB</h2>
          <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
            Optimize your images to exactly under 50KB. Get the best possible quality while maintaining strict file size limits for online portals and applications.
          </p>
        </div>

        {!originalFile ? (
          <div
            className={`relative group border-2 border-dashed rounded-2xl p-12 transition-all duration-300 text-center cursor-pointer ${
              isDragging 
                ? 'border-purple-400 bg-purple-500/10' 
                : 'border-white/20 bg-white/5 hover:border-purple-400/50 hover:bg-white/10'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-white/5 rounded-full group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors duration-300 text-gray-400">
                <Upload className="w-10 h-10" />
              </div>
              <div>
                <p className="text-lg font-medium text-white mb-1">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-400">PNG, JPG, JPEG up to 10MB</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original Image Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-purple-400" />
                    Original Image
                  </span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white">
                    {formatSize(originalFile.size)}
                  </span>
                </div>
                <div className="relative aspect-square md:aspect-video rounded-xl overflow-hidden bg-black/40 flex items-center justify-center border border-white/5">
                  {originalPreview && (
                    <img 
                      src={originalPreview} 
                      alt="Original" 
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>
              </div>

              {/* Compressed Image Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 overflow-hidden flex flex-col relative">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Compressed Image
                  </span>
                  {compressedFile && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${compressedFile.size <= 51200 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                      {formatSize(compressedFile.size)}
                    </span>
                  )}
                </div>
                
                <div className="relative aspect-square md:aspect-video rounded-xl overflow-hidden bg-black/40 flex items-center justify-center border border-white/5">
                  {isCompressing ? (
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-10 h-10 border-3 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                      <span className="text-sm text-purple-400 font-medium animate-pulse">Compressing to 50KB...</span>
                    </div>
                  ) : compressedPreview ? (
                    <img 
                      src={compressedPreview} 
                      alt="Compressed" 
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : null}
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-white/10">
              <button
                onClick={reset}
                className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 gap-2 focus:ring-2 focus:ring-white/20 outline-none"
              >
                <Trash2 className="w-4 h-4" />
                Start Over
              </button>
              
              <button
                onClick={downloadCompressed}
                disabled={!compressedFile || isCompressing}
                className={`flex items-center justify-center w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition-all duration-300 gap-2 shadow-[0_0_15px_rgba(168,85,247,0.2)]
                  ${(!compressedFile || isCompressing)
                    ? 'bg-purple-500/20 text-purple-400/50 cursor-not-allowed border border-purple-500/10'
                    : 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-[0.98] border border-purple-400/50'
                  }
                `}
              >
                <Download className="w-5 h-5" />
                {isCompressing ? 'Processing...' : 'Download Image'}
              </button>
            </div>
            
            {compressedFile && !isCompressing && (
              <div className="text-center text-xs text-gray-400 mt-2">
                Saved {formatSize(originalFile.size - compressedFile.size)} ({Math.round(((originalFile.size - compressedFile.size) / originalFile.size) * 100)}% reduction)
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


// Indian Example: Pooja from Patna uses this tool to check variables.
