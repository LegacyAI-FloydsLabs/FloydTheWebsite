import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, status, icon, color, tagline, description, features, tag, demo_url, download_url, sort_order } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.application.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: 'An application with this slug already exists' },
        { status: 400 }
      );
    }

    const app = await prisma.application.create({
      data: {
        name,
        slug,
        status: status || 'coming-soon',
        icon: icon || 'Terminal',
        color: color || 'cyan',
        tagline: tagline || null,
        description: description || null,
        features: features || [],
        tag: tag || null,
        demo_url: demo_url || null,
        download_url: download_url || null,
        sort_order: sort_order || 0,
      },
    });

    return NextResponse.json({ success: true, app }, { status: 201 });
  } catch (error) {
    console.error('Create application error:', error);
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
}
