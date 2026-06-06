import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';

const SHARED_PASSWORD = process.env.MCP_SHARED_PASSWORD || 'FloydMCP2024!@#';
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'floyd-mcp-jwt-secret';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || password !== SHARED_PASSWORD) {
      return NextResponse.json(
        { message: 'Invalid credentials', error: 'Unauthorized', statusCode: 401 },
        { status: 401, headers: corsHeaders }
      );
    }

    const sessionId = randomUUID();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

    const token = sign(
      { sessionId, iat: Math.floor(now.getTime() / 1000) },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json(
      {
        token,
        session: {
          sessionId,
          createdAt: now.toISOString(),
          expiresAt: expiresAt.toISOString(),
          metadata: {},
        },
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { message: 'Internal server error', statusCode: 500 },
      { status: 500, headers: corsHeaders }
    );
  }
}
