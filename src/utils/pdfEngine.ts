import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import JSZip from 'jszip';

export interface PdfProcessResult {
  blob: Blob;
  url: string;
  fileName: string;
  originalSize: number;
  outputSize: number;
  pageCount: number;
  summary: string;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(sizes.length - 1, Math.floor(Math.log(bytes) / Math.log(k)));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Optimizes and rebuilds a PDF file in the browser using pdf-lib object streams
 * and clean page copying (stripping unused objects, XMP bloat, and metadata).
 */
export async function compressPdfInBrowser(
  file: File,
  targetKB?: number
): Promise<PdfProcessResult> {
  const arrayBuffer = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = srcDoc.getPageCount();

  // Create a fresh document to strip orphaned objects, thumbnails, and metadata bloat
  const outDoc = await PDFDocument.create();
  outDoc.setTitle('');
  outDoc.setAuthor('');
  outDoc.setSubject('');
  outDoc.setKeywords([]);
  outDoc.setProducer('ToolPixa PDF Engine');
  outDoc.setCreator('ToolPixa');

  const pageIndices = Array.from({ length: totalPages }, (_, i) => i);
  const copiedPages = await outDoc.copyPages(srcDoc, pageIndices);
  copiedPages.forEach((page) => outDoc.addPage(page));

  const pdfBytes = await outDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    objectsPerTick: 50,
  });

  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  const suffix = targetKB ? `_${targetKB}kb` : '_compressed';

  const savedBytes = Math.max(0, file.size - blob.size);
  const savedPct = file.size > 0 ? Math.round((savedBytes / file.size) * 100) : 0;

  return {
    blob,
    url,
    fileName: `${baseName}${suffix}.pdf`,
    originalSize: file.size,
    outputSize: blob.size,
    pageCount: totalPages,
    summary:
      savedBytes > 0
        ? `Optimized ${totalPages} page${totalPages > 1 ? 's' : ''} (${formatBytes(file.size)} → ${formatBytes(blob.size)}, saved ${savedPct}%)`
        : `Rebuilt & streamlined ${totalPages} page${totalPages > 1 ? 's' : ''} (${formatBytes(blob.size)})`,
  };
}

/**
 * Parses a page range string like "1-3, 5, 7-9" into 0-based page indices.
 */
export function parsePageRanges(rangeStr: string, maxPages: number): number[] {
  const result = new Set<number>();
  const parts = rangeStr
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  for (const part of parts) {
    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-').map((s) => s.trim());
      const start = Math.max(1, parseInt(startStr, 10) || 1);
      const end = Math.min(maxPages, parseInt(endStr, 10) || maxPages);
      for (let p = Math.min(start, end); p <= Math.max(start, end); p++) {
        result.add(p - 1);
      }
    } else {
      const pageNum = parseInt(part, 10);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPages) {
        result.add(pageNum - 1);
      }
    }
  }
  return Array.from(result).sort((a, b) => a - b);
}

/**
 * Extracts readable text from a PDF buffer in the browser by inspecting
 * uncompressed and FlateDecode-compressed content streams.
 */
export async function extractTextFromPdfBuffer(arrayBuffer: ArrayBuffer): Promise<{
  pageCount: number;
  pagesText: string[];
  fullText: string;
}> {
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();
  const rawBytes = new Uint8Array(arrayBuffer);
  const rawLatin1 = new TextDecoder('latin1').decode(rawBytes);

  const extractedChunks: string[] = [];

  // Helper to pull text literals from a PDF content stream string
  const parsePdfOperators = (streamContent: string): string => {
    const pieces: string[] = [];
    // Match (...) Tj and [(...)] TJ blocks
    const tjMatches = streamContent.matchAll(/\(([^()\\]*(?:\\.[^()\\]*)*)\)\s*Tj/g);
    for (const m of tjMatches) {
      pieces.push(unescapePdfString(m[1]));
    }
    const tjArrayMatches = streamContent.matchAll(/\[([\s\S]*?)\]\s*TJ/g);
    for (const m of tjArrayMatches) {
      const inner = m[1].matchAll(/\(([^()\\]*(?:\\.[^()\\]*)*)\)/g);
      let line = '';
      for (const im of inner) {
        line += unescapePdfString(im[1]);
      }
      if (line.trim()) pieces.push(line);
    }
    return pieces.join(' ').replace(/\s+/g, ' ').trim();
  };

  // Find stream ... endstream blocks
  const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let match: RegExpExecArray | null;
  while ((match = streamRegex.exec(rawLatin1)) !== null) {
    const body = match[1];
    // Try direct operator parsing first
    const direct = parsePdfOperators(body);
    if (direct.length > 3) {
      extractedChunks.push(direct);
      continue;
    }

    // Try DecompressionStream('deflate') if available in browser
    if (typeof DecompressionStream !== 'undefined') {
      try {
        const bytes = new Uint8Array(body.length);
        for (let i = 0; i < body.length; i++) {
          bytes[i] = body.charCodeAt(i) & 0xff;
        }
        const ds = new DecompressionStream('deflate');
        const writer = ds.writable.getWriter();
        writer.write(bytes).catch(() => {});
        writer.close().catch(() => {});
        const decompressedBuf = await new Response(ds.readable).arrayBuffer();
        const decoded = new TextDecoder('latin1').decode(decompressedBuf);
        const parsed = parsePdfOperators(decoded);
        if (parsed.length > 2) {
          extractedChunks.push(parsed);
        }
      } catch {
        // Ignore non-deflate streams (e.g. embedded images/fonts)
      }
    }
  }

  let pagesText: string[] = [];
  if (extractedChunks.length > 0) {
    // Group chunks roughly across pages
    const perPage = Math.max(1, Math.ceil(extractedChunks.length / pageCount));
    for (let p = 0; p < pageCount; p++) {
      const slice = extractedChunks.slice(p * perPage, (p + 1) * perPage).join('\n\n');
      pagesText.push(slice || `[Page ${p + 1}]`);
    }
  } else {
    // Fallback summary if PDF consists purely of scanned images/outlined fonts
    const pages = pdfDoc.getPages();
    pagesText = pages.map((pg, idx) => {
      const { width, height } = pg.getSize();
      return `Page ${idx + 1} (${Math.round(width)} × ${Math.round(height)} pt) — Document page ready. (Note: Scanned image-only PDFs do not contain selectable font streams; you can edit or add text below before exporting.)`;
    });
  }

  return {
    pageCount,
    pagesText,
    fullText: pagesText.map((t, i) => `--- Page ${i + 1} ---\n${t}`).join('\n\n'),
  };
}

function unescapePdfString(str: string): string {
  return str
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')')
    .replace(/\\\\/g, '\\');
}

/**
 * Extracts text from a .docx, .txt, .md, or .html file in the browser.
 */
export async function extractTextFromWordOrTextFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith('.docx')) {
    try {
      const zip = await JSZip.loadAsync(await file.arrayBuffer());
      const docXml = await zip.file('word/document.xml')?.async('string');
      if (docXml) {
        const paragraphs = docXml.split(/<\/w:p>/g);
        const lines: string[] = [];
        for (const p of paragraphs) {
          const texts = [...p.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map((m) => m[1]);
          const line = texts
            .join('')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'")
            .trim();
          if (line) lines.push(line);
        }
        if (lines.length > 0) return lines.join('\n\n');
      }
    } catch {
      // Fallback to raw text read
    }
  }
  const raw = await file.text();
  if (name.endsWith('.html') || name.endsWith('.htm')) {
    return raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }
  return raw;
}

/**
 * Generates a formatted multi-page A4 PDF from plain text using pdf-lib.
 */
export async function createPdfFromText(
  title: string,
  bodyText: string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595.28; // A4 width in pt
  const pageHeight = 841.89; // A4 height in pt
  const margin = 50;
  const maxWidth = pageWidth - margin * 2;
  const fontSize = 11;
  const lineHeight = 16;

  // Sanitize characters outside WinAnsi encoding
  const safeText = (str: string) =>
    str
      .replace(/[₹]/g, 'Rs.')
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/[—–]/g, '-')
      .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, '');

  const paragraphs = safeText(bodyText || 'Empty document').split(/\r?\n/);
  const wrappedLines: string[] = [];

  for (const para of paragraphs) {
    if (!para.trim()) {
      wrappedLines.push('');
      continue;
    }
    const words = para.split(/\s+/);
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width > maxWidth && currentLine) {
        wrappedLines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) wrappedLines.push(currentLine);
  }

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  // Title header on first page
  const cleanTitle = safeText(title).slice(0, 70);
  if (cleanTitle) {
    page.drawText(cleanTitle, {
      x: margin,
      y,
      size: 15,
      font: boldFont,
      color: rgb(0.08, 0.12, 0.22),
    });
    y -= 28;
  }

  for (const line of wrappedLines) {
    if (y < margin + lineHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
    if (line) {
      page.drawText(line, {
        x: margin,
        y,
        size: fontSize,
        font,
        color: rgb(0.15, 0.18, 0.24),
      });
    }
    y -= lineHeight;
  }

  return pdfDoc.save({ useObjectStreams: true });
}
