import { NextResponse } from 'next/server';
import { isValidServer, getToolNamesForServer } from '@/lib/mcp/servers';
import { getAllSkills } from '@/lib/mcp/skills';
import { skillToMCPTool } from '@/lib/mcp/skills';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(
  _request: Request,
  { params }: { params: { server: string } }
) {
  const serverName = params.server;

  if (!isValidServer(serverName)) {
    return NextResponse.json(
      { message: `Server '${serverName}' not found`, error: 'Not Found', statusCode: 404 },
      { status: 404, headers: corsHeaders }
    );
  }

  const toolNames = getToolNamesForServer(serverName);
  const allSkills = await getAllSkills();

  // Match DB skills (hyphenated) to server tools (underscored)
  const matchedSkills = allSkills.filter(skill => {
    const normalized = skill.skill_name.replace(/-/g, '_');
    return toolNames.has(normalized);
  });

  const tools = matchedSkills.map(skill => {
    const mcpTool = skillToMCPTool(skill);
    // Use underscore format for tool names (matching standalone system)
    return {
      ...mcpTool,
      name: skill.skill_name.replace(/-/g, '_'),
    };
  });

  return NextResponse.json({ tools }, { headers: corsHeaders });
}
