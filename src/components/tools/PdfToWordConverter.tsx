'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileType2, Download, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';
import { extractTextFromPdfBuffer } from '@/utils/pdfEngine';

export default function PdfToWordConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [docText, setDocText] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
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
      setDocText(res.fullText);
    } catch (err) {
      console.error(err);
      setError('Could not process this PDF file. Please verify it is a valid, unlocked PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadWordDoc = () => {
    if (!file) return;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const paragraphsHtml = docText
      .split(/\r?\n/)
      .map((line) => `<p style="font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.5;">${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`)
      .join('');

    const wordHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>${baseName}</title></head><body>${paragraphsHtml}</body></html>`;
    const blob = new Blob(['\ufeff', wordHtml], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${baseName}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-4xl mx-auto shadow-xl border border-glass-border">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-glass-border">
        <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500">
          <FileType2 size={28} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">PDF to Word Converter</h2>
          <p className="text-sm text-text-secondary mt-1">
            Convert PDF documents into editable Microsoft Word (.DOC) files locally in your browser.
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
          <h3 className="text-xl font-semibold text-text-primary mb-2">Upload a PDF to convert to Word</h3>
          <p className="text-sm text-text-secondary">Preview and edit extracted content before downloading as Word (.DOC)</p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface-container border border-glass-border">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
              <div>
                <p className="text-sm font-semibold text-text-primary">{file.name}</p>
                <p className="text-xs text-text-secondary font-mono">{pageCount} pages processed</p>
              </div>
            </div>
            <button
              type="button"
              onClick={downloadWordDoc}
              disabled={isProcessing}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm inline-flex items-center gap-2 shadow-lg"
            >
              <Download size={16} /> Download Word (.DOC)
            </button>
          </div>

          {isProcessing ? (
            <div className="p-10 text-center text-text-secondary flex flex-col items-center gap-2">
              <RefreshCw size={24} className="animate-spin text-primary" />
              <p>Converting PDF pages to editable Word format...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold text-text-secondary block mb-1.5">
                Editable Document Preview (you can edit text before downloading):
              </label>
              <textarea
                value={docText}
                onChange={(e) => setDocText(e.target.value)}
                rows={10}
                className="w-full p-4 rounded-xl bg-surface-container border border-glass-border text-text-primary text-sm leading-relaxed focus:outline-none focus:border-primary"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setFile(null);
              setDocText('');
            }}
            className="text-sm text-primary hover:underline"
          >
            ← Convert Another PDF
          </button>
        </div>
      )}
    </div>
  );
}
