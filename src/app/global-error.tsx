'use client';

import React from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex items-center justify-center bg-[#0d1323] text-slate-100 p-6 font-sans">
        <div className="max-w-md w-full rounded-2xl border border-white/10 bg-slate-900/90 p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-sm text-slate-400">
            {error?.message || 'An unexpected error occurred while rendering this page.'}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl border border-white/15 hover:border-blue-400 text-slate-200 text-sm font-semibold transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
