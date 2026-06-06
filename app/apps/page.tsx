import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import * as Icons from 'lucide-react';
import { Zap } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Applications | Floyd Labs',
  description: 'The Floyd Suite \u2014 a growing ecosystem of AI applications. Explore current tools and upcoming releases.',
};

// Static fallback apps data
const staticApps = [
  {
    name: 'Floyd CLI',
    slug: 'floyd-cli',
    status: 'available',
    icon: 'Terminal',
    color: 'cyan',
    tagline: 'The Original',
    description: 'The AI agent that started it all. Command-line interface with persistent memory, strong opinions, and zero corporate BS.',
    features: ['Persistent memory', 'Multi-agent coordination', 'Offline capable', 'Opinionated'],
    tag: 'Terminal',
  },
  {
    name: 'Floyd Desktop',
    slug: 'floyd-desktop',
    status: 'available',
    icon: 'Monitor',
    color: 'pink',
    tagline: 'Visual Layer',
    description: 'Visual interface for people who hate CLIs but still love Floyd. Desktop-native and fast.',
    features: ['Visual agent management', 'Drag-and-drop workflows', 'Desktop native', 'Agent swarms'],
    tag: 'GUI',
  },
  {
    name: 'Floyd IDE',
    slug: 'floyd-ide',
    status: 'available',
    icon: 'Code2',
    color: 'green',
    tagline: 'Code Whisperer',
    description: 'Code assistant that reviews your work without passive-aggression.',
    features: ['Code review', 'Style memory', 'Refactoring assist', 'No passive aggression'],
    tag: 'IDE',
  },
  {
    name: 'Floyd MCP Server',
    slug: 'floyd-mcp-server',
    status: 'available',
    icon: 'Server',
    color: 'orange',
    tagline: 'The Backbone',
    description: '13 Model Context Protocol servers running the skills ecosystem.',
    features: ['13 MCP servers', '73+ skills', '24/7 uptime', 'REST endpoints'],
    tag: 'Infrastructure',
  },
  {
    name: 'Floyd API Gateway',
    slug: 'floyd-api-gateway',
    status: 'beta',
    icon: 'Globe',
    color: 'purple',
    tagline: 'REST Interface',
    description: 'REST API interface for integrating Floyd capabilities into your own applications.',
    features: ['OpenAPI spec', 'Rate limiting', 'Auth tokens', 'Webhooks'],
    tag: 'API',
  },
  {
    name: 'Floyd Memory',
    slug: 'floyd-memory',
    status: 'available',
    icon: 'Brain',
    color: 'purple',
    tagline: 'Persistent Brain',
    description: 'The memory system that makes Floyd actually remember you.',
    features: ['Long-term memory', 'Context retrieval', 'Privacy-first', 'Local storage'],
    tag: 'Storage',
  },
  {
    name: 'Floyd Orchestrator',
    slug: 'floyd-orchestrator',
    status: 'coming-soon',
    icon: 'Cpu',
    color: 'cyan',
    tagline: 'Multi-Agent',
    description: 'Coordinate multiple Floyd agents working on complex tasks.',
    features: ['Task distribution', 'Agent coordination', 'Workflow automation', 'Parallel execution'],
    tag: 'Multi-Agent',
  },
  {
    name: 'Floyd Community',
    slug: 'floyd-community',
    status: 'coming-soon',
    icon: 'Users',
    color: 'pink',
    tagline: 'Coming Together',
    description: 'Share skills, workflows, and spite with other Floyd users.',
    features: ['Skill sharing', 'Workflow templates', 'Community support', 'No corporate oversight'],
    tag: 'Community',
  },
];

const statusConfig: Record<string, { label: string; bgColor: string; textColor: string }> = {
  available: {
    label: 'Available',
    bgColor: 'rgba(118, 255, 3, 0.15)',
    textColor: 'var(--floyd-accent-green)',
  },
  beta: {
    label: 'Beta',
    bgColor: 'rgba(255, 171, 0, 0.15)',
    textColor: 'var(--floyd-accent-orange)',
  },
  'coming-soon': {
    label: 'Coming Soon',
    bgColor: 'rgba(156, 39, 176, 0.15)',
    textColor: 'var(--floyd-glow-purple)',
  },
};

async function getApplications() {
  try {
    const dbApps = await prisma.application.findMany({
      orderBy: { sort_order: 'asc' },
    });
    
    if (dbApps.length > 0) {
      return dbApps.map(app => ({
        name: app.name,
        slug: app.slug,
        status: app.status,
        icon: app.icon,
        color: app.color,
        tagline: app.tagline || '',
        description: app.description || '',
        features: app.features,
        tag: app.tag || '',
        demo_url: app.demo_url,
        download_url: app.download_url,
      }));
    }
    
    return staticApps;
  } catch (error) {
    console.error('Error fetching applications:', error);
    return staticApps;
  }
}

export default async function AppsPage() {
  const apps = await getApplications();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-28 pb-16 px-4 text-center">
        <div className="glass-panel max-w-3xl mx-auto p-8 mb-8">
          <span
            className="text-xs font-mono px-3 py-1 rounded-full border mb-6 inline-block"
            style={{
              color: 'var(--floyd-accent-cyan)',
              borderColor: 'var(--floyd-accent-cyan)',
              backgroundColor: 'rgba(0,229,255,0.1)',
            }}
          >
            THE FLOYD SUITE
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 neon-heading">
            Applications
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--floyd-text-muted)' }}
          >
            A growing ecosystem of AI applications, all built with the same philosophy:
            ownership, opinions, and zero subscription fees.
          </p>
        </div>

        {/* Status Legend */}
        <div className="glass-panel inline-flex justify-center gap-6 flex-wrap px-6 py-3 mx-auto">
          {Object.entries(statusConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: config.textColor }}
              />
              <span className="text-sm font-medium" style={{ color: config.textColor }}>
                {config.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => {
              const IconComponent = (Icons as any)[app.icon] || Icons.Terminal;
              const colorVar = `var(--floyd-accent-${app.color})`;
              const status = statusConfig[app.status] || statusConfig['coming-soon'];
              const isComingSoon = app.status === 'coming-soon';

              return (
                <div
                  key={app.slug}
                  className="floyd-card p-6 flex flex-col"
                  style={{ opacity: isComingSoon ? 0.85 : 1 }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        backgroundColor: `${colorVar}15`,
                        border: `1px solid ${colorVar}40`,
                      }}
                    >
                      <IconComponent
                        size={28}
                        style={{
                          color: colorVar,
                          filter: `drop-shadow(0 0 8px ${colorVar})`,
                        }}
                      />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: status.bgColor,
                          color: status.textColor,
                        }}
                      >
                        {status.label}
                      </span>
                      {app.tag && (
                        <span
                          className="text-xs px-2 py-0.5 rounded font-mono"
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            color: 'var(--floyd-text-muted)',
                          }}
                        >
                          {app.tag}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <p
                    className="text-xs font-mono mb-1"
                    style={{ color: colorVar }}
                  >
                    {app.tagline}
                  </p>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: 'var(--floyd-text-heading)' }}
                  >
                    {app.name}
                  </h3>
                  <p
                    className="text-sm mb-4 flex-1"
                    style={{ color: 'var(--floyd-text-muted)' }}
                  >
                    {app.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {app.features.slice(0, 4).map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: 'var(--floyd-bg-secondary)',
                          color: 'var(--floyd-text-body)',
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Phase 2 CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="floyd-card p-8"
            style={{
              borderColor: 'var(--floyd-accent-cyan)',
              boxShadow: '0 0 30px rgba(0, 229, 255, 0.1)',
            }}
          >
            <Zap
              size={40}
              className="mx-auto mb-4"
              style={{
                color: 'var(--floyd-accent-cyan)',
                filter: 'drop-shadow(0 0 12px var(--floyd-accent-cyan))',
              }}
            />
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--floyd-text-heading)' }}
            >
              Phase 2: Interactive Demos
            </h2>
            <p
              className="mb-6"
              style={{ color: 'var(--floyd-text-muted)' }}
            >
              Coming soon: Try applications directly in your browser. No downloads,
              no signups, just pure Floyd experience.
            </p>
            <Link
              href="/contact"
              className="btn-neon-cyan px-6 py-3 rounded-lg font-medium inline-block"
            >
              Get Notified
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
