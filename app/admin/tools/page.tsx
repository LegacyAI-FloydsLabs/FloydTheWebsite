import { prisma } from '@/lib/db';
import { Wrench, Star, Clock, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';

function extractDescription(content: string): string {
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('*') && !trimmed.startsWith('-')) {
      return trimmed.slice(0, 200) + (trimmed.length > 200 ? '...' : '');
    }
  }
  return 'No description available';
}

function extractCategory(content: string): string {
  const match = content.match(/Category:\s*([\w\s]+)/i);
  return match ? match[1].trim() : 'General';
}

function extractQualityScore(content: string): number {
  const match = content.match(/Quality.*?:\s*(\d+)/i);
  return match ? parseInt(match[1]) : 85;
}

function formatSkillName(name: string): string {
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function getSkills() {
  return prisma.skills_cache.findMany({
    orderBy: { skill_name: 'asc' },
  });
}

export default async function AdminToolsPage() {
  const skills = await getSkills();

  return (
    <div>
      {/* Header */}
      <div className="glass-panel p-6 mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--floyd-text-heading)' }}
        >
          MCP Tools & Skills
        </h1>
        <p style={{ color: 'var(--floyd-text-body)' }}>
          {skills.length} skill{skills.length !== 1 ? 's' : ''} loaded from the MCP server
        </p>
        <p
          className="text-sm mt-2 p-3 rounded-lg inline-block font-medium"
          style={{
            background: 'rgba(255, 171, 0, 0.2)',
            color: 'var(--floyd-accent-orange)',
            border: '1px solid var(--floyd-accent-orange)',
          }}
        >
          \u26a0\ufe0f Skills are read-only and managed by the MCP server.
        </p>
      </div>

      {/* Skills Grid */}
      {skills.length === 0 ? (
        <div className="floyd-card p-12 text-center">
          <p style={{ color: 'var(--floyd-text-body)' }}>
            No skills loaded. Is the MCP server running?
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => {
            const description = extractDescription(skill.content);
            const category = extractCategory(skill.content);
            const quality = extractQualityScore(skill.content);
            const displayName = formatSkillName(skill.skill_name);

            return (
              <div
                key={skill.skill_name}
                className="floyd-card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        background: 'rgba(0, 229, 255, 0.1)',
                        color: 'var(--floyd-accent-cyan)',
                      }}
                    >
                      <Wrench size={20} />
                    </div>
                    <div>
                      <h3
                        className="font-bold"
                        style={{ color: 'var(--floyd-text-heading)' }}
                      >
                        {displayName}
                      </h3>
                      <p
                        className="text-xs"
                        style={{ color: 'var(--floyd-text-muted)' }}
                      >
                        {skill.skill_name}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: 'rgba(118, 255, 3, 0.1)',
                      color: 'var(--floyd-accent-green)',
                    }}
                  >
                    {category}
                  </span>
                </div>

                <p
                  className="text-sm mb-4"
                  style={{ color: 'var(--floyd-text-body)' }}
                >
                  {description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: 'var(--floyd-accent-orange)' }}
                    >
                      <Star size={14} />
                      {quality}%
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: 'var(--floyd-text-muted)' }}
                    >
                      <Clock size={14} />
                      {new Date(skill.last_updated).toLocaleDateString()}
                    </span>
                  </div>
                  <a
                    href={`/tools`}
                    target="_blank"
                    className="text-xs flex items-center gap-1"
                    style={{ color: 'var(--floyd-accent-cyan)' }}
                  >
                    View Public Page <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
