'use client';

import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Images, Download, UploadCloud, SlidersHorizontal, Settings, FileArchive } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function BulkImageCompressor() {
  const [files, setFiles] = useState<File[]>([]);
  const [compressedFiles, setCompressedFiles] = useState<{file: File, oldSize: number, newSize: number}[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [quality, setQuality] = useState<number>(80);
  const [progress, setProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const compressAll = async () => {
    if (files.length === 0) return;
    setIsCompressing(true);
    setProgress(0);
    const results = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const options = {
          maxSizeMB: 5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          initialQuality: quality / 100
        };
        const compressedBlob = await imageCompression(file, options);
        const compressedFile = new File([compressedBlob], file.name, { type: compressedBlob.type });
        results.push({
          file: compressedFile,
          oldSize: file.size,
          newSize: compressedFile.size
        });
      } catch (error) {
        console.error(error);
      }
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setCompressedFiles(results);
    setIsCompressing(false);
  };

  const downloadZip = async () => {
    if (compressedFiles.length === 0) return;
    const zip = new JSZip();
    compressedFiles.forEach(({ file }) => {
      zip.file(file.name, file);
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'compressed_images.zip');
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setCompressedFiles([]);
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-4xl mx-auto shadow-xl border border-white/20 bg-white/10 backdrop-blur-lg">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-200/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400">
            <Images size={28} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Bulk Image Compressor</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Compress multiple images at once and download them as a ZIP.</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {files.length === 0 ? (
          <div 
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload} 
              accept="image/*" 
              multiple
              className="hidden" 
            />
            <div className="bg-purple-100 dark:bg-purple-900/30 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="text-purple-500 dark:text-purple-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Upload multiple images</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Drop files here or click to browse</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Settings size={18} className="text-gray-500 dark:text-gray-400" />
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200">Settings</h3>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <span>Quality</span>
                    <span className="text-purple-500 font-bold">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    disabled={isCompressing}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
                <button
                  onClick={compressAll}
                  disabled={isCompressing || files.length === 0}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCompressing ? 'Compressing...' : 'Start Compression'}
                </button>
              </div>

              {compressedFiles.length > 0 && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5 text-center">
                  <FileArchive className="w-10 h-10 text-green-500 mx-auto mb-2" />
                  <h3 className="text-lg font-bold text-green-600 dark:text-green-400 mb-1">Compression Complete!</h3>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                    Saved {formatSize(compressedFiles.reduce((acc, curr) => acc + (curr.oldSize - curr.newSize), 0))} in total.
                  </p>
                  <button
                    onClick={downloadZip}
                    className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-green-500/25"
                  >
                    <Download size={20} />
                    Download ZIP
                  </button>
                </div>
              )}
            </div>

            <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-200">Uploaded Files ({files.length})</h3>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                >
                  + Add more
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  multiple
                  className="hidden" 
                />
              </div>

              {isCompressing && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1 text-purple-600 dark:text-purple-400">
                    <span>Compressing...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {files.map((file, idx) => {
                  const compressed = compressedFiles[idx];
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center shrink-0">
                          <ImageIcon size={18} className="text-gray-500" />
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{file.name}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-gray-500">{formatSize(file.size)}</span>
                            {compressed && (
                              <>
                                <span className="text-gray-400">→</span>
                                <span className="text-green-500 font-semibold">{formatSize(compressed.newSize)}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {!isCompressing && !compressedFiles.length && (
                        <button 
                          onClick={() => removeFile(idx)}
                          className="text-red-500 hover:text-red-600 p-2 shrink-0"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
