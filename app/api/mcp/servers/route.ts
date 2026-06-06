import { NextResponse } from 'next/server';
import { MCP_SERVERS } from '@/lib/mcp/servers';
import { getToolNamesForServer } from '@/lib/mcp/servers';

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
  const servers = Object.values(MCP_SERVERS).map(server => ({
    name: server.name,
    version: server.version,
    description: server.description,
    toolCount: getToolNamesForServer(server.name).size,
    capabilities: server.capabilities,
  }));

  return NextResponse.json(servers, { headers: corsHeaders });
}
