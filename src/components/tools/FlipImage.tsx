'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { Upload, Download, FlipHorizontal, FlipVertical, RefreshCcw } from 'lucide-react';

export default function FlipImage() {
  const [image, setImage] = useState<string | null>(null);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setFlipH(false);
      setFlipV(false);
    };
    reader.readAsDataURL(file);
  };

  const drawImage = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    
    // Set scale based on flip state
    const scaleX = flipH ? -1 : 1;
    const scaleY = flipV ? -1 : 1;
    
    // Move to center, scale, then move back
    ctx.translate(
      flipH ? canvas.width : 0,
      flipV ? canvas.height : 0
    );
    ctx.scale(scaleX, scaleY);
    
    ctx.drawImage(img, 0, 0);
    ctx.restore();
  };

  React.useEffect(() => {
    if (image && imgRef.current) {
      if (imgRef.current.complete) {
        drawImage();
      }
    }
  }, [image, flipH, flipV]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'flipped-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const toggleFlipH = () => setFlipH(prev => !prev);
  const toggleFlipV = () => setFlipV(prev => !prev);
  const resetFlip = () => {
    setFlipH(false);
    setFlipV(false);
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
      <div className="glass-card rounded-2xl p-6 sm:p-10 shadow-xl border border-white/20 bg-white/10 backdrop-blur-md">
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <div className="p-4 bg-blue-500/10 rounded-full">
            <FlipHorizontal className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            Image Flipper
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-lg">
            Easily flip your images horizontally or vertically without losing quality. Completely browser-based for your privacy.
          </p>
        </div>

        {!image ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm"
          >
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Click to upload image</p>
            <p className="text-sm text-gray-500 mt-2">PNG, JPG, WEBP up to 10MB</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <button
                onClick={toggleFlipH}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${flipH ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}
              >
                <FlipHorizontal className="w-5 h-5" />
                <span>Flip Horizontal</span>
              </button>
              <button
                onClick={toggleFlipV}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${flipV ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}
              >
                <FlipVertical className="w-5 h-5" />
                <span>Flip Vertical</span>
              </button>
              <button
                onClick={resetFlip}
                className="flex items-center space-x-2 px-6 py-3 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium transition-all border border-gray-200 dark:border-gray-700"
              >
                <RefreshCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="relative w-full max-h-[500px] bg-white/30 dark:bg-gray-900/30 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center p-4 backdrop-blur-sm">
              <img 
                ref={imgRef}
                src={image} 
                alt="Original hidden" 
                className="hidden"
                onLoad={drawImage}
              />
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-[450px] object-contain rounded-lg"
                style={{ 
                  backgroundImage: 'repeating-conic-gradient(#f0f0f0 0% 25%, transparent 0% 50%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px'
                }}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setImage(null)}
                className="px-6 py-3 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-medium transition-all border border-gray-200 dark:border-gray-700"
              >
                Choose Another
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/25"
              >
                <Download className="w-5 h-5" />
                <span>Download Result</span>
              </button>
            </div>
          </div>
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}
