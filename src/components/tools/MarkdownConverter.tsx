"use client";

import React, { useState } from 'react';
import { FileText, Code, CheckCircle2, Copy } from 'lucide-react';

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState("# Hello World\n\nThis is a **bold** and *italic* text.\n\nHere is a [link](https://example.com).");
  const [copied, setCopied] = useState(false);

  // A basic Markdown to HTML parser using RegExp
  const parseMarkdown = (md: string) => {
    let html = md;

    // Headers
    html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
    html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>');

    // Paragraphs (basic wrapping of text not inside HTML tags)
    // First, split by double newlines
    const paragraphs = html.split(/\n\n+/);
    html = paragraphs.map(p => {
      if (p.trim().startsWith('<h') || p.trim().length === 0) {
        return p;
      }
      // replace single newlines with <br />
      const withBr = p.replace(/\n/g, '<br />');
      return `<p class="mb-2">${withBr}</p>`;
    }).join('\n');

    return html;
  };

  const htmlOutput = parseMarkdown(markdown);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy HTML");
    }
  };

  return (
    <section className="glass-card glass-bento p-6 flex flex-col gap-6">
      <header className="flex items-center gap-3">
        <div className="p-3 bg-primary-container text-on-primary-container rounded-xl">
          <FileText size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Markdown to HTML Converter</h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Convert standard Markdown into raw HTML instantly.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Markdown Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-on-surface flex items-center gap-2">
            <Code size={16} className="text-primary" /> Markdown Input
          </label>
          <textarea
            className="w-full h-64 p-4 bg-surface-lowest border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-on-surface font-mono text-sm resize-none transition-all dark:bg-surface-lowest dark:text-on-surface"
            placeholder="Type markdown here..."
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>

        {/* HTML Output preview / raw HTML */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-on-surface flex items-center gap-2">
              <FileText size={16} className="text-primary" /> HTML Output
            </label>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 bg-surface-container border border-border-subtle rounded-lg hover:border-primary text-xs font-medium transition-colors text-on-surface dark:bg-surface-container dark:border-border-subtle dark:hover:border-primary"
            >
              {copied ? <CheckCircle2 size={14} className="text-primary" /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy HTML'}
            </button>
          </div>
          <div className="w-full h-64 p-4 bg-surface-lowest border border-border-subtle rounded-xl overflow-y-auto text-on-surface font-mono text-sm whitespace-pre-wrap dark:bg-surface-lowest dark:text-on-surface">
            {htmlOutput}
          </div>
        </div>
      </div>

      <div className="mt-2 p-4 bg-primary-container/30 border border-primary-container rounded-xl dark:bg-primary-container/20">
        <h3 className="text-sm font-bold text-on-surface mb-1">Supported Syntax</h3>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          This converter supports basic Markdown formatting: <strong>Headers</strong> (<code># H1</code> to <code>###### H6</code>), <strong>Bold</strong> (<code>**text**</code>), <strong>Italic</strong> (<code>*text*</code>), and <strong>Links</strong> (<code>[text](url)</code>). Paragraphs are automatically created based on double line breaks.
        </p>
      </div>
    </section>
  );
}
