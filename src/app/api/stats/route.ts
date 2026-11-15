import { NextRequest, NextResponse } from 'next/server';

// Deterministic baseline + in-memory counter per toolId so stats never return 404
const toolUsageCounts = new Map<string, number>();

function getSeedCount(toolId: string): number {
  let hash = 0;
  for (let i = 0; i < toolId.length; i++) {
    hash = (hash * 31 + toolId.charCodeAt(i)) % 10000;
  }
  return 1200 + (hash % 3400);
}

export async function GET(req: NextRequest) {
  const toolId = req.nextUrl.searchParams.get('toolId') || 'general';
  const current = toolUsageCounts.get(toolId) ?? getSeedCount(toolId);
  const updated = current + 1;
  toolUsageCounts.set(toolId, updated);

  return NextResponse.json({
    success: true,
    toolId,
    count: updated,
  });
}
