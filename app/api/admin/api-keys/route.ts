import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { generateApiKey } from '@/lib/mcp/auth';

export const dynamic = 'force-dynamic';

// GET - List all API keys
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKeys = await prisma.api_key.findMany({
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        key: true,
        name: true,
        tier: true,
        rate_limit: true,
        calls_today: true,
        calls_total: true,
        last_used: true,
        active: true,
        created_at: true,
        expires_at: true,
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    // Mask keys for security (show only first 10 and last 4 chars)
    const maskedKeys = apiKeys.map(k => ({
      ...k,
      key_masked: `${k.key.substring(0, 10)}...${k.key.substring(k.key.length - 4)}`,
    }));

    return NextResponse.json({ apiKeys: maskedKeys });
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new API key
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, tier = 'free', rate_limit = 100, expires_days } = body;

    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const key = generateApiKey();
    const expiresAt = expires_days
      ? new Date(Date.now() + expires_days * 24 * 60 * 60 * 1000)
      : null;

    const apiKey = await prisma.api_key.create({
      data: {
        key,
        name: name.trim(),
        tier,
        rate_limit: parseInt(rate_limit) || 100,
        expires_at: expiresAt,
        user_id: session.user?.id,
      },
    });

    // Return full key only on creation
    return NextResponse.json({
      apiKey: {
        id: apiKey.id,
        key: apiKey.key, // Full key shown only once
        name: apiKey.name,
        tier: apiKey.tier,
        rate_limit: apiKey.rate_limit,
        created_at: apiKey.created_at,
        expires_at: apiKey.expires_at,
      },
      message: 'API key created. Save this key - it will not be shown again.',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
