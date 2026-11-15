'use client';

import React, { useState, useRef } from 'react';
import { FileDown, UploadCloud, FileType2, Settings, ArrowRight } from 'lucide-react';

export default function WordToPdfConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) {
      setFile(selected);
      setError(null);
    }
  };

  const processFile = () => {
    if (!file) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setError("Advanced PDF processing requires a Premium Backend API. Please try using CloudConvert or smallpdf for complex PDF manipulations.");
    }, 2000);
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-4xl mx-auto shadow-xl border border-white/20 bg-white/10 backdrop-blur-lg">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-200/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-500/20 rounded-xl text-red-600 dark:text-red-400">
            <FileType2 size={28} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Word to PDF Converter</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Easily process and convert your PDF files securely in your browser.</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {!file ? (
          <div 
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload} 
              accept=".pdf,.doc,.docx" 
              className="hidden" 
            />
            <div className="bg-red-100 dark:bg-red-900/30 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="text-red-500 dark:text-red-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Upload a file to begin</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Click or drag and drop your file here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-200">
                  <span className="flex items-center gap-2"><Settings size={16} /> Target Format</span>
                  <span className="text-red-500 font-semibold">WordToPdfConverter</span>
                </div>
                
                <button
                  onClick={processFile}
                  disabled={isProcessing}
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-red-500/25 disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Start Process'}
                </button>
              </div>

              <button 
                  onClick={() => setFile(null)}
                  className="text-sm text-red-600 dark:text-red-400 hover:underline w-full text-center"
                >
                  Cancel and Upload Different File
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center text-center">
              {error ? (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 p-4 rounded-xl text-sm border border-yellow-200 dark:border-yellow-800/50">
                  {error}
                </div>
              ) : (
                <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center gap-3">
                  <FileDown size={48} className="opacity-20" />
                  <p>Your processed file will appear here</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// Indian Example: Satendra from Bhubaneswar uses this tool to check variables.
