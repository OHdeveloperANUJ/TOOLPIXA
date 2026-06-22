import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const history = await prisma.calculationHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized. Please login to save.' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await req.json();
    const { toolId, inputData } = body;

    if (!toolId || !inputData) {
      return NextResponse.json({ error: 'Missing toolId or inputData' }, { status: 400 });
    }

    // Upsert or Create. For simplicity, we create a new entry every time they save.
    const newEntry = await prisma.calculationHistory.create({
      data: {
        userId,
        toolId,
        inputData: JSON.stringify(inputData),
      }
    });

    return NextResponse.json({ success: true, data: newEntry });
  } catch (error) {
    console.error('Error saving history:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
