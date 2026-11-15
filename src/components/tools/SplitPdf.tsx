'use client';

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { UploadCloud, Scissors, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { parsePageRanges } from '@/utils/pdfEngine';

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [mode, setMode] = useState<'range' | 'all'>('range');
  const [rangeInput, setRangeInput] = useState<string>('1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>('split.pdf');
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
      setRangeInput(total > 1 ? `1-${Math.min(2, total)}` : '1');
    } catch {
      setError('Unable to read PDF page count. Ensure the file is a valid, unlocked PDF.');
    }
  };

  const splitPdf = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      const buf = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
      const total = srcDoc.getPageCount();
      const baseName = file.name.replace(/\.[^/.]+$/, '');

      if (mode === 'range') {
        const indices = parsePageRanges(rangeInput, total);
        if (indices.length === 0) {
          setError(`Please enter valid page numbers between 1 and ${total} (e.g., 1-3, 5).`);
          setIsProcessing(false);
          return;
        }
        const newDoc = await PDFDocument.create();
        const copied = await newDoc.copyPages(srcDoc, indices);
        copied.forEach((p) => newDoc.addPage(p));
        const pdfBytes = await newDoc.save({ useObjectStreams: true });
        const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
        setDownloadUrl(URL.createObjectURL(blob));
        setDownloadName(`${baseName}_pages_${rangeInput.replace(/[^0-9-]/g, '_')}.pdf`);
      } else {
        const zip = new JSZip();
        for (let i = 0; i < total; i++) {
          const singleDoc = await PDFDocument.create();
          const [copied] = await singleDoc.copyPages(srcDoc, [i]);
          singleDoc.addPage(copied);
          const bytes = await singleDoc.save({ useObjectStreams: true });
          zip.file(`${baseName}_page_${i + 1}.pdf`, bytes);
        }
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        setDownloadUrl(URL.createObjectURL(zipBlob));
        setDownloadName(`${baseName}_all_${total}_pages.zip`);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to split PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-4xl mx-auto shadow-xl border border-glass-border">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-glass-border">
        <div className="p-3 bg-red-500/20 rounded-xl text-red-500">
          <Scissors size={28} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Split PDF &amp; Extract Pages</h2>
          <p className="text-sm text-text-secondary mt-1">
            Extract custom page ranges or burst a PDF into individual pages in your browser.
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
          <h3 className="text-xl font-semibold text-text-primary mb-2">Upload a PDF to split</h3>
          <p className="text-sm text-text-secondary">Extract specific pages or download all pages as a ZIP archive</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="p-5 rounded-xl bg-surface-container border border-glass-border space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Document</span>
                <span className="font-semibold text-text-primary truncate max-w-[200px]">{file.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Total Pages Detected</span>
                <span className="font-mono font-bold text-primary">{pageCount} pages</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode('range');
                    setDownloadUrl(null);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-colors ${
                    mode === 'range'
                      ? 'bg-primary text-on-primary border-primary'
                      : 'bg-background text-text-secondary border-glass-border'
                  }`}
                >
                  Extract Page Range
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('all');
                    setDownloadUrl(null);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-colors ${
                    mode === 'all'
                      ? 'bg-primary text-on-primary border-primary'
                      : 'bg-background text-text-secondary border-glass-border'
                  }`}
                >
                  Burst All Pages (ZIP)
                </button>
              </div>

              {mode === 'range' && (
                <div>
                  <label className="text-xs font-semibold text-text-secondary block mb-1.5">
                    Pages to Extract (e.g. 1-3, 5)
                  </label>
                  <input
                    type="text"
                    value={rangeInput}
                    onChange={(e) => setRangeInput(e.target.value)}
                    placeholder="1-3, 5"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-glass-border text-text-primary font-mono text-sm"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={splitPdf}
                disabled={isProcessing}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50"
              >
                {isProcessing ? 'Splitting PDF...' : mode === 'range' ? 'Extract Selected Pages' : `Split All ${pageCount} Pages`}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setFile(null);
                setDownloadUrl(null);
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
            ) : downloadUrl ? (
              <div className="space-y-4 w-full">
                <div className="inline-flex items-center gap-2 text-emerald-500 font-semibold">
                  <CheckCircle2 size={22} />
                  <span>PDF Split Complete!</span>
                </div>
                <a
                  href={downloadUrl}
                  download={downloadName}
                  className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold inline-flex items-center justify-center gap-2 shadow-lg"
                >
                  <Download size={18} /> Download {mode === 'range' ? 'Extracted PDF' : 'ZIP Archive'}
                </a>
              </div>
            ) : (
              <p className="text-sm text-text-secondary">
                Choose your page range or select &ldquo;Burst All Pages&rdquo; and click the split button.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
