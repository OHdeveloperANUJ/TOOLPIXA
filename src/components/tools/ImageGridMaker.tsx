'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Download, Upload, Grid3X3, Settings2, Trash2 } from 'lucide-react';

export default function ImageGridMaker() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [lineColor, setLineColor] = useState('#ffffff');
  const [lineWidth, setLineWidth] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Draw grid
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();

      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;

      // Draw vertical lines
      for (let i = 1; i < cols; i++) {
        const x = i * cellWidth;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }

      // Draw horizontal lines
      for (let i = 1; i < rows; i++) {
        const y = i * cellHeight;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }

      ctx.stroke();
    };
    img.src = imageSrc;
  };

  useEffect(() => {
    drawGrid();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc, rows, cols, lineColor, lineWidth]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'grid-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="max-w-4xl w-full mx-auto">
      <div className="glass-card rounded-2xl p-8 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-2xl">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-blue-500/20 text-blue-500 rounded-xl">
            <Grid3X3 size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
              Image Grid Maker
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Overlay customizable drawing grids on your images instantly
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6 md:col-span-1 p-6 bg-white/5 rounded-xl border border-white/10 h-fit">
            <div className="flex items-center space-x-2 text-lg font-medium dark:text-white mb-4">
              <Settings2 size={20} className="text-blue-500" />
              <span>Grid Settings</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex justify-between">
                  <span>Rows</span>
                  <span className="text-blue-500 font-mono">{rows}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={rows}
                  onChange={(e) => setRows(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex justify-between">
                  <span>Columns</span>
                  <span className="text-blue-500 font-mono">{cols}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={cols}
                  onChange={(e) => setCols(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex justify-between">
                  <span>Line Thickness</span>
                  <span className="text-blue-500 font-mono">{lineWidth}px</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={lineWidth}
                  onChange={(e) => setLineWidth(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Line Color
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={lineColor}
                    onChange={(e) => setLineColor(e.target.value)}
                    className="h-10 w-full rounded cursor-pointer bg-transparent border-none p-0"
                  />
                  <div className="w-10 h-10 rounded-lg border border-white/20 shadow-inner" style={{ backgroundColor: lineColor }}></div>
                </div>
              </div>
            </div>

            {imageSrc && (
              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  onClick={() => setImageSrc(null)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl font-medium transition-colors"
                >
                  <Trash2 size={18} />
                  <span>Clear Image</span>
                </button>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="md:col-span-2">
            {!imageSrc ? (
              <label className="flex flex-col items-center justify-center w-full h-[400px] md:h-full min-h-[400px] border-2 border-dashed border-gray-300 dark:border-white/20 rounded-2xl cursor-pointer bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="p-4 bg-blue-500/10 text-blue-500 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <p className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                    Click to upload image
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            ) : (
              <div className="space-y-6">
                <div className="relative rounded-2xl overflow-hidden bg-black/5 border border-white/10 flex items-center justify-center max-h-[600px] group">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-[600px] object-contain shadow-lg rounded-xl"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleDownload}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
                  >
                    <Download size={20} />
                    <span>Download Grid Image</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
