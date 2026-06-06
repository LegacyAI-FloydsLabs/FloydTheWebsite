import { NextResponse } from 'next/server';
import { getSkillByName } from '@/lib/mcp/skills';
import { executeSkill } from '@/lib/mcp/executor';
import { validateApiKey, incrementApiKeyUsage } from '@/lib/mcp/auth';

export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    // Validate API key
    const apiKey = request.headers.get('Authorization') || request.headers.get('X-API-Key');
    const validation = await validateApiKey(apiKey);
    if (!validation.valid) {
      return NextResponse.json(
        { message: validation.error || 'Authentication failed', statusCode: 401 },
        { status: 401, headers: corsHeaders }
      );
    }

    const skill = await getSkillByName(params.name);
    if (!skill) {
      return NextResponse.json(
        { message: `Skill '${params.name}' not found`, error: 'Not Found', statusCode: 404 },
        { status: 404, headers: corsHeaders }
      );
    }

    const body = await request.json().catch(() => ({}));
    const input = body.input || {};

    await incrementApiKeyUsage(validation.apiKey!.id);
    const result = await executeSkill(skill, input, validation.apiKey!.id);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          duration_ms: result.duration_ms,
        },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        output: result.output,
        duration_ms: result.duration_ms,
        tokens_used: result.tokens_used,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Skill execute error:', error);
    return NextResponse.json(
      { message: 'Internal server error', statusCode: 500 },
      { status: 500, headers: corsHeaders }
    );
  }
}
