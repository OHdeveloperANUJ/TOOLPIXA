import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user ? (session.user as any).id : null;

    await prisma.searchLog.create({
      data: {
        query,
        userId: userId || null,
      }
    });

    return NextResponse.json({ success: true, message: 'Search tracked successfully.' });
  } catch (error) {
    console.error('Error tracking search:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
