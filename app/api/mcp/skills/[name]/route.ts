import { NextResponse } from 'next/server';
import { getSkillByName } from '@/lib/mcp/skills';
import { getServerForSkill } from '@/lib/mcp/servers';

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
  { params }: { params: { name: string } }
) {
  try {
    const skill = await getSkillByName(params.name);

    if (!skill) {
      return NextResponse.json(
        { message: `Skill '${params.name}' not found`, error: 'Not Found', statusCode: 404 },
        { status: 404, headers: corsHeaders }
      );
    }

    const purposeMatch = skill.content.match(/## Purpose\n([^\n#]+)/);
    const purpose = purposeMatch ? purposeMatch[1].trim() : 'No description';
    const whenToUseMatch = skill.content.match(/## When to Use\n([^#]+)/);
    const whenNotToUseMatch = skill.content.match(/## When NOT to Use\n([^#]+)/);

    return NextResponse.json(
      {
        name: skill.skill_name,
        category: (skill.metadata as Record<string, unknown>)?.category || 'General',
        purpose,
        version: (skill.metadata as Record<string, unknown>)?.version || '2.0.0',
        server: getServerForSkill(skill.skill_name),
        whenToUse: whenToUseMatch ? whenToUseMatch[1].trim() : '',
        whenNotToUse: whenNotToUseMatch ? whenNotToUseMatch[1].trim() : '',
        schema: skill.schema,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Skill detail error:', error);
    return NextResponse.json(
      { message: 'Internal server error', statusCode: 500 },
      { status: 500, headers: corsHeaders }
    );
  }
}
