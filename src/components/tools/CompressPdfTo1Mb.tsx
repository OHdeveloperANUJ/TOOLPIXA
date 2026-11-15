'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileType2, Download, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';
import { compressPdfInBrowser, formatBytes, PdfProcessResult } from '@/utils/pdfEngine';

export default function CompressPdfTo1Mb() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<PdfProcessResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setResult(null);
    setError(null);
  };

  const processFile = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      const res = await compressPdfInBrowser(file, 1024);
      setResult(res);
    } catch (err) {
      console.error(err);
      setError('Could not process this PDF. Please verify the file is a valid, unlocked PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-4xl mx-auto shadow-xl border border-glass-border">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-glass-border">
        <div className="p-3 bg-red-500/20 rounded-xl text-red-500">
          <FileType2 size={28} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Compress PDF to 1MB</h2>
          <p className="text-sm text-text-secondary mt-1">
            Optimize large reports, e-books, and scanned PDFs for 1MB email and portal attachments.
          </p>
        </div>
      </div>

      {!file ? (
        <div
          className="border-2 border-dashed border-glass-border rounded-2xl p-12 text-center hover:border-primary transition-colors cursor-pointer group bg-surface-container/40"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,application/pdf"
            className="hidden"
          />
          <div className="bg-red-500/15 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="text-red-500" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Upload PDF for 1MB Compression</h3>
          <p className="text-sm text-text-secondary">Fast, private client-side PDF optimization</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-surface-container border border-glass-border rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Document</span>
                <span className="font-semibold text-text-primary truncate max-w-[200px]">{file.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Target Limit</span>
                <span className="font-mono font-bold text-red-500">≤ 1 MB</span>
              </div>
              <button
                type="button"
                onClick={processFile}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" /> Compressing to 1MB...
                  </>
                ) : (
                  'Compress PDF to 1MB'
                )}
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setResult(null);
              }}
              className="text-sm text-red-500 hover:underline w-full text-center"
            >
              Choose Different PDF
            </button>
          </div>

          <div className="bg-surface-container border border-glass-border rounded-2xl p-6 flex flex-col justify-center items-center text-center">
            {error ? (
              <div className="text-red-500 flex flex-col items-center gap-2 text-sm">
                <AlertCircle size={32} />
                <p>{error}</p>
              </div>
            ) : result ? (
              <div className="space-y-4 w-full">
                <div className="inline-flex items-center gap-2 text-emerald-500 font-semibold">
                  <CheckCircle2 size={22} />
                  <span>1MB Optimization Complete!</span>
                </div>
                <p className="text-xs text-text-secondary">{result.summary}</p>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-background/60 p-3 rounded-xl border border-glass-border">
                  <div>
                    <span className="text-text-secondary block">Original</span>
                    <span className="text-text-primary font-bold">{formatBytes(result.originalSize)}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary block">Optimized</span>
                    <span className="text-emerald-500 font-bold">{formatBytes(result.outputSize)}</span>
                  </div>
                </div>
                <a
                  href={result.url}
                  download={result.fileName}
                  className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold inline-flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Download size={18} /> Download 1MB PDF
                </a>
              </div>
            ) : (
              <p className="text-sm text-text-secondary">
                Click &ldquo;Compress PDF to 1MB&rdquo; to optimize and download your PDF.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
