'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Image as ImageIcon, Download, CheckCircle, Upload } from 'lucide-react';

export default function JpgToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
      setDownloadUrl(null);
    }
  };

  const processImages = async () => {
    if (files.length === 0) return;

    setProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let image;
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          continue; // Skip unsupported types
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error('Error converting images to PDF:', error);
      alert('Error converting images. Please ensure they are valid JPG or PNG files.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <div className="glass-card rounded-2xl p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mb-4">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">JPG to PDF</h2>
          <p className="text-gray-300">Convert JPG and PNG images to a single PDF document.</p>
        </div>

        <div className="space-y-8">
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors bg-black/20">
            <input
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-4"
            >
              <Upload className="w-12 h-12 text-gray-400" />
              <div>
                <span className="text-emerald-400 hover:text-emerald-300 font-semibold">Click to upload</span>
                <span className="text-gray-400 ml-2">or drag and drop images</span>
              </div>
              <p className="text-sm text-gray-500">JPG, JPEG, PNG (Multiple files supported)</p>
            </label>
            {files.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-300 border border-emerald-500/20 inline-flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>{files.length} image{files.length > 1 ? 's' : ''} selected</span>
                </div>
              </div>
            )}
          </div>

          {files.length > 0 && !downloadUrl && (
            <button
              onClick={processImages}
              disabled={processing}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5" />
                  <span>Convert to PDF</span>
                </>
              )}
            </button>
          )}

          {downloadUrl && (
            <div className="flex flex-col items-center space-y-4 pt-4 border-t border-gray-700">
              <div className="text-green-400 flex items-center space-x-2">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Successfully converted to PDF!</span>
              </div>
              <a
                href={downloadUrl}
                download={`images_converted.pdf`}
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-green-500/25"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </a>
              <button
                onClick={() => {
                  setFiles([]);
                  setDownloadUrl(null);
                }}
                className="text-gray-400 hover:text-white text-sm underline"
              >
                Convert more images
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
