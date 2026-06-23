'use client';

import React, { useState } from 'react';
import { Download, Video as Youtube, Image as ImageIcon, AlertCircle } from 'lucide-react';

export default function YoutubeThumbnailDownloader() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const extractVideoId = (inputUrl: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = inputUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    
    if (!value) {
      setVideoId(null);
      setThumbnailUrl(null);
      setError(null);
      return;
    }

    const id = extractVideoId(value);
    if (id) {
      setVideoId(id);
      setThumbnailUrl(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
      setError(null);
    } else {
      setVideoId(null);
      setThumbnailUrl(null);
      setError('Invalid YouTube URL. Please enter a valid video link.');
    }
  };

  const handleDownload = async () => {
    if (!thumbnailUrl || !videoId) return;
    
    setIsDownloading(true);
    try {
      const response = await fetch(thumbnailUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `youtube-thumbnail-${videoId}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Fallback if CORS prevents fetching
      window.open(thumbnailUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto">
      <div className="glass-card rounded-2xl p-8 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-2xl">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-red-500/20 text-red-500 rounded-xl">
            <Youtube size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-rose-400">
              YouTube Thumbnail Downloader
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Extract and download high-resolution thumbnails from any YouTube video
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              YouTube Video URL
            </label>
            <div className="relative">
              <input
                id="youtube-url"
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-3 pl-12 bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all dark:text-white"
              />
              <Youtube className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
            {error && (
              <div className="flex items-center space-x-2 mt-3 text-red-500 text-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>

          {thumbnailUrl && (
            <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="aspect-video relative rounded-xl overflow-hidden border border-white/10 shadow-lg group bg-black/5 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnailUrl}
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to hqdefault if maxresdefault doesn't exist
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('maxresdefault')) {
                      target.src = target.src.replace('maxresdefault', 'hqdefault');
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <ImageIcon className="text-white w-12 h-12 opacity-50" />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl font-medium transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/25"
                >
                  <Download size={20} />
                  <span>{isDownloading ? 'Downloading...' : 'Download Max Resolution'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// Indian Example: Mahendra from Guntur uses this tool to check variables.
