'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Download, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { extractTextFromPdfBuffer } from '@/utils/pdfEngine';

export default function PdfToTextConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setError(null);
    setIsProcessing(true);
    try {
      const buf = await selected.arrayBuffer();
      const res = await extractTextFromPdfBuffer(buf);
      setPageCount(res.pageCount);
      setExtractedText(res.fullText);
    } catch (err) {
      console.error(err);
      setError('Could not parse this PDF file. Please verify the file is a valid PDF document.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!extractedText) return;
    await navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(file?.name || 'document').replace(/\.[^/.]+$/, '')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-4xl mx-auto shadow-xl border border-glass-border">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-glass-border">
        <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500">
          <FileText size={28} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">PDF to Text Converter</h2>
          <p className="text-sm text-text-secondary mt-1">
            Extract selectable text streams from PDF documents locally in your browser.
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
          <div className="bg-blue-500/15 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="text-blue-500" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Upload a PDF to extract text</h3>
          <p className="text-sm text-text-secondary">Instantly parses PDF text streams and exports to .TXT</p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-container p-4 rounded-xl border border-glass-border">
            <div>
              <p className="text-sm font-semibold text-text-primary">{file.name}</p>
              <p className="text-xs text-text-secondary font-mono">
                {pageCount} page{pageCount !== 1 ? 's' : ''} · {extractedText.split(/\s+/).filter(Boolean).length} words extracted
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-xl bg-background border border-glass-border text-xs font-semibold text-text-primary inline-flex items-center gap-1.5 hover:border-primary"
              >
                {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadTxt}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <Download size={15} /> Download .TXT
              </button>
            </div>
          </div>

          {isProcessing ? (
            <div className="p-12 text-center text-text-secondary flex flex-col items-center gap-3">
              <RefreshCw size={28} className="animate-spin text-primary" />
              <p>Extracting text streams from PDF...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          ) : (
            <textarea
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              rows={12}
              className="w-full p-4 rounded-xl bg-surface-container border border-glass-border text-text-primary font-mono text-xs leading-relaxed focus:outline-none focus:border-primary"
            />
          )}

          <button
            type="button"
            onClick={() => {
              setFile(null);
              setExtractedText('');
            }}
            className="text-sm text-primary hover:underline"
          >
            ← Convert Another PDF File
          </button>
        </div>
      )}
    </div>
  );
}
