import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { MCP_SERVERS, getToolNamesForServer } from '@/lib/mcp/servers';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
  try {
    // Total requests
    const totalRequests = await prisma.mcp_call_log.count();

    // Average execution time
    const avgResult = await prisma.mcp_call_log.aggregate({
      _avg: { duration_ms: true },
    });
    const avgExecutionTime = avgResult._avg.duration_ms || 0;

    // Success rate
    const successCount = await prisma.mcp_call_log.count({ where: { success: true } });
    const successRate = totalRequests > 0 ? successCount / totalRequests : 1;

    // Top tools
    const topTools = await prisma.mcp_call_log.groupBy({
      by: ['skill_name'],
      _count: true,
      orderBy: { _count: { skill_name: 'desc' } },
      take: 10,
    });

    // Active sessions (API keys used in last 24h)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const activeSessions = await prisma.api_key.count({
      where: { last_used: { gte: oneDayAgo } },
    });

    // Server tool counts
    const servers: Record<string, { tools: number }> = {};
    let totalTools = 0;
    for (const name of Object.keys(MCP_SERVERS)) {
      const count = getToolNamesForServer(name).size;
      servers[name] = { tools: count };
      totalTools += count;
    }

    return NextResponse.json(
      {
        totalRequests,
        avgExecutionTime: Math.round(avgExecutionTime) / 1000, // Convert to seconds
        successRate,
        activeSessions,
        topTools: topTools.map(t => ({
          _count: t._count,
          tool_name: t.skill_name,
          server: 'floyd-core', // Simplified
        })),
        timestamp: new Date().toISOString(),
        servers,
        totalTools,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Metrics error:', error);
    return NextResponse.json(
      { message: 'Internal server error', statusCode: 500 },
      { status: 500, headers: corsHeaders }
    );
  }
}
