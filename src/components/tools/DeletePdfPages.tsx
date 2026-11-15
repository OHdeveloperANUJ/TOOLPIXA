'use client';

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { UploadCloud, Trash2, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { parsePageRanges } from '@/utils/pdfEngine';

export default function DeletePdfPages() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pagesToDelete, setPagesToDelete] = useState<string>('1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [remainingCount, setRemainingCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setDownloadUrl(null);
    setError(null);
    try {
      const buf = await selected.arrayBuffer();
      const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
      const total = doc.getPageCount();
      setPageCount(total);
      setPagesToDelete(total > 1 ? String(total) : '1');
    } catch {
      setError('Could not read this PDF. Please upload a valid, unlocked PDF document.');
    }
  };

  const togglePageNumber = (pageNum1Based: number) => {
    const currentSet = new Set(parsePageRanges(pagesToDelete, pageCount).map((i) => i + 1));
    if (currentSet.has(pageNum1Based)) {
      currentSet.delete(pageNum1Based);
    } else {
      currentSet.add(pageNum1Based);
    }
    setPagesToDelete(Array.from(currentSet).sort((a, b) => a - b).join(', '));
    setDownloadUrl(null);
  };

  const deleteSelectedPages = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      const buf = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
      const total = srcDoc.getPageCount();
      const deleteIndices = new Set(parsePageRanges(pagesToDelete, total));

      if (deleteIndices.size === 0) {
        setError('Please select at least 1 page number to delete.');
        setIsProcessing(false);
        return;
      }
      if (deleteIndices.size >= total) {
        setError('You cannot delete all pages from a PDF. Keep at least 1 page.');
        setIsProcessing(false);
        return;
      }

      const keepIndices = Array.from({ length: total }, (_, i) => i).filter((i) => !deleteIndices.has(i));
      const outDoc = await PDFDocument.create();
      const copied = await outDoc.copyPages(srcDoc, keepIndices);
      copied.forEach((p) => outDoc.addPage(p));

      const pdfBytes = await outDoc.save({ useObjectStreams: true });
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
      setRemainingCount(keepIndices.length);
    } catch (err) {
      console.error(err);
      setError('Failed to delete pages from PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedZeroBased = new Set(parsePageRanges(pagesToDelete, Math.max(1, pageCount)));

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-4xl mx-auto shadow-xl border border-glass-border">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-glass-border">
        <div className="p-3 bg-red-500/20 rounded-xl text-red-500">
          <Trash2 size={28} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Delete PDF Pages</h2>
          <p className="text-sm text-text-secondary mt-1">
            Remove unwanted pages from any PDF document 100% locally in your browser.
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
          <h3 className="text-xl font-semibold text-text-primary mb-2">Upload a PDF to remove pages</h3>
          <p className="text-sm text-text-secondary">Click page tiles or enter page ranges to delete</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-surface-container border border-glass-border space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="font-semibold text-text-primary">{file.name}</span>
              <span className="font-mono text-primary font-bold">{pageCount} total pages</span>
            </div>

            {pageCount > 0 && pageCount <= 60 && (
              <div>
                <p className="text-xs text-text-secondary mb-2">
                  Click pages to mark for deletion (red = will be deleted):
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: pageCount }, (_, i) => {
                    const isMarked = selectedZeroBased.has(i);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => togglePageNumber(i + 1)}
                        className={`w-10 h-10 rounded-lg font-mono text-xs font-bold border transition-all ${
                          isMarked
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-background text-text-primary border-glass-border hover:border-primary'
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-text-secondary block mb-1.5">
                Pages to Delete (e.g. 2, 4-6)
              </label>
              <input
                type="text"
                value={pagesToDelete}
                onChange={(e) => {
                  setPagesToDelete(e.target.value);
                  setDownloadUrl(null);
                }}
                placeholder="e.g. 2, 4-5"
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-glass-border text-text-primary font-mono text-sm"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setDownloadUrl(null);
                }}
                className="text-sm text-text-secondary hover:text-red-500"
              >
                Upload Different PDF
              </button>
              <button
                type="button"
                onClick={deleteSelectedPages}
                disabled={isProcessing}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50"
              >
                {isProcessing ? 'Removing Pages...' : 'Delete Selected Pages'}
              </button>
            </div>
          </div>

          {downloadUrl && (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={24} />
                <div>
                  <p className="font-bold text-text-primary">
                    Pages Removed! ({remainingCount} page{remainingCount > 1 ? 's' : ''} remaining)
                  </p>
                  <p className="text-xs text-text-secondary">Your cleaned PDF is ready for download.</p>
                </div>
              </div>
              <a
                href={downloadUrl}
                download={`cleaned_${file.name}`}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold inline-flex items-center gap-2 shrink-0 shadow-lg"
              >
                <Download size={18} /> Download Cleaned PDF
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
