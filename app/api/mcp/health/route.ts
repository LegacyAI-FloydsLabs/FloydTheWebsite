import { NextResponse } from 'next/server';
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
  const servers: Record<string, { status: string; tools: number }> = {};
  for (const [name] of Object.entries(MCP_SERVERS)) {
    servers[name] = {
      status: 'online',
      tools: getToolNamesForServer(name).size,
    };
  }

  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      servers,
    },
    { headers: corsHeaders }
  );
}
