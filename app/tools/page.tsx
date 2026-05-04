import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { ToolsClient } from './_components/tools-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'MCP Tools & Skills | Floyd Labs',
  description:
    '73+ AI skills and tools built with Model Context Protocol. Search and explore Floyd Labs\u2019 capabilities.',
};

function extractDescription(content: string): string {
  if (!content) return 'A Floyd Labs AI skill.';
  const lines = content.split('\n').filter((l) => l.trim() !== '');
  // Skip heading lines (#) and metadata lines
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      !trimmed.startsWith('#') &&
      !trimmed.startsWith('>') &&
      !trimmed.startsWith('**') &&
      trimmed.length > 30
    ) {
      return trimmed.slice(0, 200);
    }
  }
  return 'A Floyd Labs AI skill.';
}

function extractCategory(content: string): string {
  if (!content) return 'general';
  const match = content.match(/## Category\s*\n([^\n]+)/);
  if (match?.[1]) {
    return match[1].trim().split('.')?.[0] ?? 'general';
  }
  return 'general';
}

function extractVersion(content: string): string {
  if (!content) return '2.0.0';
  const match = content.match(/## Version\s*\n([^\n]+)/);
  return match?.[1]?.trim() ?? '2.0.0';
}

function extractQualityScore(content: string): string {
  if (!content) return 'N/A';
  // Find any line containing "Quality Score"
  const qualityLine = content.split('\n').find(l => l.toLowerCase().includes('quality score'));
  if (!qualityLine) return 'N/A';
  
  // Extract number/100 format -> convert to X.X/10
  const match100 = qualityLine.match(/([\d.]+)\/100/);
  if (match100) {
    const score = parseFloat(match100[1]) / 10;
    return `${score.toFixed(1)}/10`;
  }
  
  // Extract number/10 format
  const match10 = qualityLine.match(/([\d.]+)\/10/);
  if (match10) {
    return `${match10[1]}/10`;
  }
  
  return 'N/A';
}

function formatSkillName(slug: string): string {
  return (slug ?? '')
    .split('-')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
    .join(' ');
}

export default async function ToolsPage() {
  let skills: {
    slug: string;
    name: string;
    description: string;
    category: string;
    version: string;
    quality: string;
    lastUpdated: string;
  }[] = [];

  try {
    const raw = await prisma.skills_cache.findMany({
      orderBy: { skill_name: 'asc' },
    });

    skills = (raw ?? []).map((r) => ({
      slug: r?.skill_name ?? '',
      name: formatSkillName(r?.skill_name ?? ''),
      description: extractDescription(r?.content ?? ''),
      category: extractCategory(r?.content ?? ''),
      version: extractVersion(r?.content ?? ''),
      quality: extractQualityScore(r?.content ?? ''),
      lastUpdated: r?.last_updated?.toISOString().split('T')?.[0] ?? '',
    }));
  } catch (err) {
    console.error('Failed to fetch skills:', err);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-28 pb-16 px-4 text-center">
        <div className="glass-panel max-w-3xl mx-auto p-8">
          <span
            className="text-xs font-mono px-3 py-1 rounded-full border mb-6 inline-block"
            style={{
              color: 'var(--floyd-accent-cyan)',
              borderColor: 'var(--floyd-accent-cyan)',
              backgroundColor: 'rgba(0,229,255,0.1)',
            }}
          >
            MODEL CONTEXT PROTOCOL
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 neon-heading">
            MCP Tools &amp; Skills
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto mb-4"
            style={{ color: 'var(--floyd-text-muted)' }}
          >
            Specialized AI skills running on Floyd Labs&rsquo; 13 MCP servers. Each tool is a weapon
            in the fight against overpriced AI subscriptions.
          </p>
        </div>
        <div className="glass-panel inline-flex items-center justify-center gap-6 text-sm font-mono px-6 py-3 mx-auto">
          <span style={{ color: 'var(--floyd-accent-cyan)' }}>{skills.length} skills loaded</span>
          <span style={{ color: 'var(--floyd-text-body)' }}>|</span>
          <span style={{ color: 'var(--floyd-accent-green)' }}>All v2.0.0</span>
          <span style={{ color: 'var(--floyd-text-body)' }}>|</span>
          <span style={{ color: 'var(--floyd-accent-orange)' }}>$0/month</span>
        </div>
      </section>

      {/* Interactive Client */}
      <ToolsClient skills={skills} />
    </div>
  );
}
