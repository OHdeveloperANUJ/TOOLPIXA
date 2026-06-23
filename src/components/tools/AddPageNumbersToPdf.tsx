'use client';

import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { FileUp, Download, Settings2, CheckCircle, Plus } from 'lucide-react';

export default function AddPageNumbersToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'top-center' | 'top-right'>('bottom-center');
  const [size, setSize] = useState(12);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setDownloadUrl(null);
    }
  };

  const processPdf = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      const pages = pdfDoc.getPages();
      pages.forEach((page, idx) => {
        const { width, height } = page.getSize();
        const text = `${idx + 1}`;
        const textWidth = font.widthOfTextAtSize(text, size);
        
        let x = width / 2 - textWidth / 2;
        let y = 30;

        if (position === 'bottom-right') {
          x = width - 50 - textWidth;
          y = 30;
        } else if (position === 'top-center') {
          x = width / 2 - textWidth / 2;
          y = height - 40;
        } else if (position === 'top-right') {
          x = width - 50 - textWidth;
          y = height - 40;
        }

        page.drawText(text, {
          x,
          y,
          size,
          font,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error('Error adding page numbers:', error);
      alert('Error adding page numbers. Please check if the PDF is valid or password protected.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <div className="glass-card rounded-2xl p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 mb-4">
            <Plus className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Add Page Numbers to PDF</h2>
          <p className="text-gray-300">Easily add page numbers to your PDF documents.</p>
        </div>

        <div className="space-y-8">
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors bg-black/20">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-4"
            >
              <FileUp className="w-12 h-12 text-gray-400" />
              <div>
                <span className="text-blue-400 hover:text-blue-300 font-semibold">Click to upload</span>
                <span className="text-gray-400 ml-2">or drag and drop</span>
              </div>
              <p className="text-sm text-gray-500">PDF files only</p>
            </label>
            {file && (
              <div className="mt-4 p-3 bg-blue-500/10 rounded-lg text-blue-300 border border-blue-500/20 inline-flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>{file.name}</span>
              </div>
            )}
          </div>

          {file && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/20 p-6 rounded-xl border border-white/10">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                  <Settings2 className="w-4 h-4" />
                  <span>Position</span>
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value as any)}
                  className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="bottom-center">Bottom Center</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="top-center">Top Center</option>
                  <option value="top-right">Top Right</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                  <Settings2 className="w-4 h-4" />
                  <span>Font Size</span>
                </label>
                <input
                  type="number"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  min={8}
                  max={72}
                  className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          )}

          {file && !downloadUrl && (
            <button
              onClick={processPdf}
              disabled={processing}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Settings2 className="w-5 h-5" />
                  <span>Add Page Numbers</span>
                </>
              )}
            </button>
          )}

          {downloadUrl && (
            <div className="flex flex-col items-center space-y-4 pt-4 border-t border-gray-700">
              <div className="text-green-400 flex items-center space-x-2">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Successfully added page numbers!</span>
              </div>
              <a
                href={downloadUrl}
                download={`numbered_${file?.name || 'document.pdf'}`}
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-green-500/25"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </a>
              <button
                onClick={() => {
                  setFile(null);
                  setDownloadUrl(null);
                }}
                className="text-gray-400 hover:text-white text-sm underline"
              >
                Process another file
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// Indian Example: Aarav from Mumbai uses this tool to check variables.
