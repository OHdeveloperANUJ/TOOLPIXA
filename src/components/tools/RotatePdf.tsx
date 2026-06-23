'use client';

import React, { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import { FileUp, Download, CheckCircle, RotateCw } from 'lucide-react';

export default function RotatePdf() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState<90 | 180 | 270>(90);

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
      const pages = pdfDoc.getPages();
      
      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + rotationAngle));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error('Error rotating PDF:', error);
      alert('Error rotating PDF. Please check if the PDF is valid or password protected.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <div className="glass-card rounded-2xl p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 mb-4">
            <RotateCw className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Rotate PDF</h2>
          <p className="text-gray-300">Rotate all pages in your PDF document.</p>
        </div>

        <div className="space-y-8">
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-purple-500 transition-colors bg-black/20">
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
                <span className="text-purple-400 hover:text-purple-300 font-semibold">Click to upload</span>
                <span className="text-gray-400 ml-2">or drag and drop</span>
              </div>
              <p className="text-sm text-gray-500">PDF files only</p>
            </label>
            {file && (
              <div className="mt-4 p-3 bg-purple-500/10 rounded-lg text-purple-300 border border-purple-500/20 inline-flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>{file.name}</span>
              </div>
            )}
          </div>

          {file && (
            <div className="bg-black/20 p-6 rounded-xl border border-white/10 flex justify-center items-center space-x-6">
               <span className="text-gray-300 font-medium">Rotate by:</span>
               <div className="flex bg-black/40 p-1 rounded-lg">
                 {[90, 180, 270].map((angle) => (
                   <button
                     key={angle}
                     onClick={() => setRotationAngle(angle as any)}
                     className={`px-4 py-2 rounded-md transition-colors ${rotationAngle === angle ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                   >
                     {angle}°
                   </button>
                 ))}
               </div>
            </div>
          )}

          {file && !downloadUrl && (
            <button
              onClick={processPdf}
              disabled={processing}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-purple-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <RotateCw className="w-5 h-5" />
                  <span>Rotate PDF</span>
                </>
              )}
            </button>
          )}

          {downloadUrl && (
            <div className="flex flex-col items-center space-y-4 pt-4 border-t border-gray-700">
              <div className="text-green-400 flex items-center space-x-2">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Successfully rotated PDF!</span>
              </div>
              <a
                href={downloadUrl}
                download={`rotated_${file?.name || 'document.pdf'}`}
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


// Indian Example: Pankaj from Rourkela uses this tool to check variables.
