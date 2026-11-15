import { NextResponse } from 'next/server';
import { toolsRegistry } from '@/data/toolsRegistry';
import { blogPosts } from '@/data/blogData';
import tags from '../../../../tags.json';

const HOST = 'www.toolpixa.space';
const BASE_URL = `https://${HOST}`;
const KEY = 'toolpixa2026indexnow';

const CATEGORIES = ['finance', 'student', 'health', 'converter', 'developer', 'image', 'video', 'pdf'];
const COMPARISONS = [
  'home-loan-emi-vs-personal-loan-emi',
  'sip-vs-lumpsum',
  'ppf-vs-fd',
  'old-tax-regime-vs-new-tax-regime',
  'sbi-vs-hdfc-home-loan-emi',
  '50-lakh-home-loan-emi-10-15-20-years',
  '30-lakh-home-loan-emi-calculator',
  'direct-vs-regular-mutual-fund',
  '12-lakh-15-lakh-20-lakh-in-hand-salary',
  'vtu-anna-sppu-cbse-cgpa-to-percentage',
  'ssc-upsc-neet-photo-signature-size-20kb-50kb',
  'gold-loan-vs-personal-loan-emi',
];

export async function GET() {
  const urlList: string[] = [
    BASE_URL,
    `${BASE_URL}/categories`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/sitemap`,
    `${BASE_URL}/about`,
    `${BASE_URL}/contact`,
    ...CATEGORIES.map((c) => `${BASE_URL}/category/${c}`),
    ...Object.keys(toolsRegistry).map((s) => `${BASE_URL}/tools/${s}`),
    ...blogPosts.map((b) => `${BASE_URL}/blog/${b.slug}`),
    ...Object.keys(tags).map((t) => `${BASE_URL}/tag/${t}`),
    ...COMPARISONS.map((c) => `${BASE_URL}/compare/${c}`),
  ];

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `${BASE_URL}/${KEY}.txt`,
        urlList,
      }),
    });

    return NextResponse.json({
      ok: true,
      indexNowStatus: res.status,
      submittedCount: urlList.length,
      sampleUrls: urlList.slice(0, 8),
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      submittedCount: urlList.length,
      error: String(err),
    });
  }
}
