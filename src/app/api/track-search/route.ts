import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // In a real production app, you would log this to a database (e.g., Supabase, Vercel Postgres, or MongoDB).
    // For now, we simply console.log it so it appears in the Vercel Runtime Logs.
    console.log(`[SEARCH_ANALYTICS] User searched for: "${query}"`);

    return NextResponse.json({ success: true, message: 'Search tracked successfully.' });
  } catch (error) {
    console.error('Error tracking search:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
