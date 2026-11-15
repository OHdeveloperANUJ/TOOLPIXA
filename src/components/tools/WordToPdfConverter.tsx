'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileType2, Download, CheckCircle2, RefreshCw } from 'lucide-react';
import { extractTextFromWordOrTextFile, createPdfFromText } from '@/utils/pdfEngine';

export default function WordToPdfConverter() {
  const [title, setTitle] = useState<string>('Document Report');
  const [bodyText, setBodyText] = useState<string>(
    'Paste your document content here or upload a .DOCX, .TXT, or .MD file above to generate a formatted A4 PDF locally in your browser.'
  );
  const [fileName, setFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setFileName(selected.name);
    setTitle(selected.name.replace(/\.[^/.]+$/, ''));
    setDownloadUrl(null);
    setIsProcessing(true);
    try {
      const extracted = await extractTextFromWordOrTextFile(selected);
      setBodyText(extracted || 'Document loaded.');
    } finally {
      setIsProcessing(false);
    }
  };

  const generatePdf = async () => {
    setIsProcessing(true);
    try {
      const pdfBytes = await createPdfFromText(title, bodyText);
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-4xl mx-auto shadow-xl border border-glass-border">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-glass-border">
        <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-500">
          <FileType2 size={28} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Word to PDF Converter</h2>
          <p className="text-sm text-text-secondary mt-1">
            Convert .DOCX, .TXT, or .MD files (or typed text) into paginated A4 PDF documents in your browser.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-glass-border rounded-2xl p-6 text-center hover:border-primary transition-colors cursor-pointer bg-surface-container/40"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".docx,.doc,.txt,.md,.html"
            className="hidden"
          />
          <UploadCloud className="text-indigo-500 mx-auto mb-2" size={28} />
          <p className="text-sm font-semibold text-text-primary">
            {fileName ? `Loaded: ${fileName} (Click to change)` : 'Click to upload .DOCX, .TXT, or .MD file'}
          </p>
          <p className="text-xs text-text-secondary mt-1">Or edit/paste your document content directly below</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1.5">Document Heading</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setDownloadUrl(null);
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-glass-border text-text-primary font-semibold text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1.5">Document Body</label>
            <textarea
              value={bodyText}
              onChange={(e) => {
                setBodyText(e.target.value);
                setDownloadUrl(null);
              }}
              rows={9}
              className="w-full p-4 rounded-xl bg-surface-container border border-glass-border text-text-primary text-sm leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={generatePdf}
              disabled={isProcessing}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg"
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={16} className="animate-spin" /> Generating PDF...
                </>
              ) : (
                'Convert to A4 PDF'
              )}
            </button>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download={`${(title || 'document').replace(/[^a-z0-9-_]/gi, '_')}.pdf`}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg"
              >
                <CheckCircle2 size={18} />
                <Download size={18} />
                <span>Download PDF</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
