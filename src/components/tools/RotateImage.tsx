'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { Upload, Download, RotateCw, RotateCcw } from 'lucide-react';

export default function RotateImage() {
  const [image, setImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setRotation(0);
    };
    reader.readAsDataURL(file);
  };

  const drawImage = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate new dimensions after rotation
    const rads = rotation * Math.PI / 180;
    const c = Math.cos(rads);
    const s = Math.sin(rads);
    
    // When rotating, the bounding box changes size
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const newWidth = Math.abs(w * c) + Math.abs(h * s);
    const newHeight = Math.abs(w * s) + Math.abs(h * c);

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    
    // Move to center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // Rotate
    ctx.rotate(rads);
    // Draw image centered
    ctx.drawImage(img, -w / 2, -h / 2);
    
    ctx.restore();
  };

  React.useEffect(() => {
    if (image && imgRef.current) {
      if (imgRef.current.complete) {
        drawImage();
      }
    }
  }, [image, rotation]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'rotated-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const rotateLeft = () => setRotation(prev => (prev - 90) % 360);
  const rotateRight = () => setRotation(prev => (prev + 90) % 360);
  const resetRotation = () => setRotation(0);

  return (
    <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
      <div className="glass-card rounded-2xl p-6 sm:p-10 shadow-xl border border-white/20 bg-white/10 backdrop-blur-md">
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <div className="p-4 bg-purple-500/10 rounded-full">
            <RotateCw className="w-10 h-10 text-purple-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            Image Rotator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-lg">
            Rotate your images freely or by 90-degree increments. High quality browser-based processing.
          </p>
        </div>

        {!image ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm"
          >
            <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Click to upload image</p>
            <p className="text-sm text-gray-500 mt-2">PNG, JPG, WEBP up to 10MB</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
              <div className="flex space-x-2">
                <button
                  onClick={rotateLeft}
                  className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-all shadow-sm border border-gray-200 dark:border-gray-600"
                  title="Rotate Left 90°"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="hidden sm:inline">-90°</span>
                </button>
                <button
                  onClick={rotateRight}
                  className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-all shadow-sm border border-gray-200 dark:border-gray-600"
                  title="Rotate Right 90°"
                >
                  <RotateCw className="w-5 h-5" />
                  <span className="hidden sm:inline">+90°</span>
                </button>
              </div>

              <div className="flex-1 max-w-xs flex items-center space-x-4 w-full">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 min-w-[40px] text-right font-mono">{rotation}°</span>
                <input 
                  type="range" 
                  min="-180" 
                  max="180" 
                  value={rotation > 180 ? rotation - 360 : rotation < -180 ? rotation + 360 : rotation} 
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500 dark:bg-gray-700"
                />
              </div>

              <button
                onClick={resetRotation}
                className="px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-all border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
              >
                Reset
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
                className="flex items-center space-x-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-purple-500/25"
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


// Indian Example: Manoj from Asansol uses this tool to check variables.
