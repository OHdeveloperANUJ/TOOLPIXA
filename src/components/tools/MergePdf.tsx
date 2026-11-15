'use client';

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { UploadCloud, FileType2, Download, CheckCircle2, Trash2, ArrowUp, ArrowDown, Plus, AlertCircle } from 'lucide-react';
import { formatBytes } from '@/utils/pdfEngine';

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files;
    if (!selected || selected.length === 0) return;
    setFiles((prev) => [...prev, ...Array.from(selected)]);
    setDownloadUrl(null);
    setError(null);
  };

  const moveFile = (index: number, direction: -1 | 1) => {
    const next = [...files];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setFiles(next);
    setDownloadUrl(null);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setDownloadUrl(null);
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const mergedPdf = await PDFDocument.create();
      let count = 0;

      for (const file of files) {
        const buf = await file.arrayBuffer();
        const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
        copiedPages.forEach((p) => {
          mergedPdf.addPage(p);
          count++;
        });
      }

      const pdfBytes = await mergedPdf.save({ useObjectStreams: true });
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
      setTotalPages(count);
    } catch (err) {
      console.error(err);
      setError('Failed to merge one or more PDFs. Please ensure all files are valid, unlocked PDFs.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-4xl mx-auto shadow-xl border border-glass-border">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-glass-border">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-500/20 rounded-xl text-red-500">
            <FileType2 size={28} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Merge PDF Files</h2>
            <p className="text-sm text-text-secondary mt-1">
              Combine multiple PDF files in your preferred order 100% locally in your browser.
            </p>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,application/pdf"
        multiple
        className="hidden"
      />

      {files.length === 0 ? (
        <div
          className="border-2 border-dashed border-glass-border rounded-2xl p-12 text-center hover:border-primary transition-colors cursor-pointer group bg-surface-container/40"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="bg-red-500/15 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="text-red-500" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Select 2 or more PDF files to merge</h3>
          <p className="text-sm text-text-secondary">Click to upload multiple PDFs — reorder them freely before merging</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-2.5">
            {files.map((f, idx) => (
              <div
                key={`${f.name}-${idx}`}
                className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container border border-glass-border"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-primary/15 text-primary font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="truncate">
                    <p className="text-sm font-semibold text-text-primary truncate">{f.name}</p>
                    <p className="text-xs text-text-secondary font-mono">{formatBytes(f.size)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => moveFile(idx, -1)}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-background border border-glass-border text-text-secondary hover:text-text-primary disabled:opacity-30"
                    title="Move up"
                  >
                    <ArrowUp size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveFile(idx, 1)}
                    disabled={idx === files.length - 1}
                    className="p-1.5 rounded-lg bg-background border border-glass-border text-text-secondary hover:text-text-primary disabled:opacity-30"
                    title="Move down"
                  >
                    <ArrowDown size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    title="Remove file"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl border border-glass-border bg-surface-container hover:border-primary text-sm font-semibold text-text-primary inline-flex items-center gap-1.5"
            >
              <Plus size={16} /> Add More PDFs
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setFiles([]);
                  setDownloadUrl(null);
                }}
                className="px-4 py-2.5 text-sm text-text-secondary hover:text-red-500"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={mergePdfs}
                disabled={isProcessing || files.length < 2}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50"
              >
                {isProcessing ? 'Merging PDFs...' : `Merge ${files.length} PDFs`}
              </button>
            </div>
          </div>

          {downloadUrl && (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={24} />
                <div>
                  <p className="font-bold text-text-primary">
                    Merged {files.length} PDFs ({totalPages} total pages)
                  </p>
                  <p className="text-xs text-text-secondary">Combined locally with zero quality loss.</p>
                </div>
              </div>
              <a
                href={downloadUrl}
                download="merged_toolpixa.pdf"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold inline-flex items-center gap-2 shrink-0 shadow-lg"
              >
                <Download size={18} /> Download Merged PDF
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
