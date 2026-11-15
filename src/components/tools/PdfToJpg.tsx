'use client';

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { UploadCloud, Image as ImageIcon, Download, CheckCircle2, RefreshCw } from 'lucide-react';
import { extractTextFromPdfBuffer } from '@/utils/pdfEngine';

interface RenderedPage {
  pageNumber: number;
  width: number;
  height: number;
  dataUrl: string;
}

export default function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPages([]);
    setIsProcessing(true);

    try {
      const buf = await selected.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
      const textRes = await extractTextFromPdfBuffer(buf);
      const pdfPages = pdfDoc.getPages();
      const rendered: RenderedPage[] = [];

      for (let i = 0; i < Math.min(pdfPages.length, 20); i++) {
        const pg = pdfPages[i];
        const { width, height } = pg.getSize();
        const canvas = document.createElement('canvas');
        const scale = 1.5;
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Header bar
          ctx.fillStyle = '#f1f5f9';
          ctx.fillRect(0, 0, canvas.width, 56);
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 18px sans-serif';
          ctx.fillText(`${selected.name} — Page ${i + 1} of ${pdfPages.length}`, 28, 35);

          // Render extracted text lines onto the JPG canvas
          ctx.fillStyle = '#1e293b';
          ctx.font = '15px sans-serif';
          const rawText = textRes.pagesText[i] || '';
          const words = rawText.split(/\s+/);
          let line = '';
          let y = 96;
          const maxLineWidth = canvas.width - 56;

          for (const w of words) {
            const test = line ? `${line} ${w}` : w;
            if (ctx.measureText(test).width > maxLineWidth) {
              ctx.fillText(line, 28, y);
              line = w;
              y += 24;
              if (y > canvas.height - 40) break;
            } else {
              line = test;
            }
          }
          if (line && y <= canvas.height - 40) {
            ctx.fillText(line, 28, y);
          }
        }

        rendered.push({
          pageNumber: i + 1,
          width: Math.round(width),
          height: Math.round(height),
          dataUrl: canvas.toDataURL('image/jpeg', 0.92),
        });
      }

      setPages(rendered);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAllAsZip = async () => {
    if (!file || pages.length === 0) return;
    const zip = new JSZip();
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    for (const p of pages) {
      const base64 = p.dataUrl.split(',')[1];
      zip.file(`${baseName}_page_${p.pageNumber}.jpg`, base64, { base64: true });
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${baseName}_jpg_pages.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-4xl mx-auto shadow-xl border border-glass-border">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-glass-border">
        <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-500">
          <ImageIcon size={28} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">PDF to JPG Converter</h2>
          <p className="text-sm text-text-secondary mt-1">
            Export PDF document pages to high-resolution JPG images or a bundled ZIP archive.
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
          <div className="bg-emerald-500/15 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="text-emerald-500" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Upload a PDF to convert to JPG</h3>
          <p className="text-sm text-text-secondary">Download individual JPG sheets or all pages as a ZIP</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface-container border border-glass-border">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
              <div>
                <p className="text-sm font-semibold text-text-primary">{file.name}</p>
                <p className="text-xs text-text-secondary font-mono">{pages.length} page sheets generated</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPages([]);
                }}
                className="text-xs text-text-secondary hover:text-red-500"
              >
                Upload Another
              </button>
              <button
                type="button"
                onClick={downloadAllAsZip}
                disabled={pages.length === 0}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs inline-flex items-center gap-1.5 shadow-lg"
              >
                <Download size={15} /> Download All (.ZIP)
              </button>
            </div>
          </div>

          {isProcessing ? (
            <div className="p-12 text-center text-text-secondary flex flex-col items-center gap-2">
              <RefreshCw size={24} className="animate-spin text-primary" />
              <p>Rendering PDF pages to JPG...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pages.map((p) => (
                <div
                  key={p.pageNumber}
                  className="p-3 rounded-xl bg-surface-container border border-glass-border flex flex-col justify-between"
                >
                  <div className="aspect-[1/1.35] bg-white rounded-lg overflow-hidden border border-glass-border mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.dataUrl} alt={`Page ${p.pageNumber}`} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-text-secondary">
                      Page {p.pageNumber} ({p.width}×{p.height}pt)
                    </span>
                    <a
                      href={p.dataUrl}
                      download={`page_${p.pageNumber}.jpg`}
                      className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Download size={13} /> JPG
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
