import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const toolId = searchParams.get('toolId');

    if (toolId) {
      // Just check how many times this specific tool was recorded in search logs or history
      // Note: As we move forward, we should log a specific "TOOL_USED" event in SearchLog,
      // but for now, we'll count how many histories exist as a proxy for usage, 
      // plus some artificial multiplier for social proof.
      const historyCount = await prisma.calculationHistory.count({
        where: { toolId }
      });

      // To bootstrap social proof, we'll add a base number for popular tools.
      // In production, you would track actual clicks/renders.
      const baseStats: Record<string, number> = {
        'home-loan-emi-calculator': 1200,
        'personal-loan-emi-calculator': 850,
        'bike-loan-emi-calculator': 600,
        'education-loan-emi-calculator': 450,
      };

      const totalCount = (baseStats[toolId] || 150) + historyCount;

      return NextResponse.json({ success: true, count: totalCount });
    }

    return NextResponse.json({ error: 'toolId is required' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
