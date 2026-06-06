import { NextResponse } from 'next/server';
import { getAllSkills } from '@/lib/mcp/skills';
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

export async function GET() {
  try {
    const skills = await getAllSkills();

    const result = skills.map(skill => {
      // Extract purpose from content
      const purposeMatch = skill.content.match(/## Purpose\n([^\n#]+)/);
      const purpose = purposeMatch ? purposeMatch[1].trim() : 'No description';
      const category = (skill.schema as Record<string, unknown>)?.category ||
        (skill.metadata as Record<string, unknown>)?.category || 'General';

      return {
        name: skill.skill_name,
        category,
        purpose: purpose.substring(0, 300),
        version: (skill.metadata as Record<string, unknown>)?.version || '2.0.0',
        server: getServerForSkill(skill.skill_name),
        whenToUse: '',
        whenNotToUse: '',
        schema: skill.schema,
      };
    });

    return NextResponse.json(result, { headers: corsHeaders });
  } catch (error) {
    console.error('Skills list error:', error);
    return NextResponse.json(
      { message: 'Internal server error', statusCode: 500 },
      { status: 500, headers: corsHeaders }
    );
  }
}
