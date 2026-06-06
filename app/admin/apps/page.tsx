import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink, GripVertical } from 'lucide-react';
import { DeleteAppButton } from './_components/app-actions';
import * as Icons from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getApplications() {
  return prisma.application.findMany({
    orderBy: { sort_order: 'asc' },
  });
}

const statusColors: Record<string, { bg: string; text: string }> = {
  available: { bg: 'rgba(118, 255, 3, 0.2)', text: 'var(--floyd-accent-green)' },
  beta: { bg: 'rgba(255, 171, 0, 0.2)', text: 'var(--floyd-accent-orange)' },
  'coming-soon': { bg: 'rgba(156, 39, 176, 0.2)', text: 'var(--floyd-glow-purple)' },
};

export default async function AdminAppsPage() {
  const apps = await getApplications();

  return (
    <div>
      {/* Header */}
      <div className="glass-panel p-6 flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--floyd-text-heading)' }}
          >
            Applications
          </h1>
          <p style={{ color: 'var(--floyd-text-body)' }}>
            {apps.length} application{apps.length !== 1 ? 's' : ''} in the Floyd Suite
          </p>
        </div>
        <Link
          href="/admin/apps/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all"
          style={{
            background: 'var(--floyd-accent-cyan)',
            color: '#0a0510',
          }}
        >
          <Plus size={20} />
          New App
        </Link>
      </div>

      {/* Apps List */}
      {apps.length === 0 ? (
        <div className="floyd-card p-12 text-center">
          <p
            className="text-xl mb-4"
            style={{ color: 'var(--floyd-text-body)' }}
          >
            No applications yet. Time to build something.
          </p>
          <Link
            href="/admin/apps/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold"
            style={{
              background: 'var(--floyd-accent-cyan)',
              color: '#0a0510',
            }}
          >
            <Plus size={20} />
            Add Your First App
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {apps.map((app) => {
            const IconComponent = (Icons as any)[app.icon] || Icons.Terminal;
            const colorVar = `var(--floyd-accent-${app.color})`;
            const status = statusColors[app.status] || statusColors['coming-soon'];

            return (
              <div
                key={app.id}
                className="floyd-card p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      background: `${colorVar}20`,
                      color: colorVar,
                    }}
                  >
                    <IconComponent size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3
                        className="text-lg font-bold"
                        style={{ color: 'var(--floyd-text-heading)' }}
                      >
                        {app.name}
                      </h3>
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: status.bg,
                          color: status.text,
                        }}
                      >
                        {app.status}
                      </span>
                      {app.tag && (
                        <span
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: 'var(--floyd-text-muted)',
                          }}
                        >
                          {app.tag}
                        </span>
                      )}
                    </div>
                    {app.tagline && (
                      <p
                        className="text-sm"
                        style={{ color: 'var(--floyd-text-body)' }}
                      >
                        {app.tagline}
                      </p>
                    )}
                    <p
                      className="text-xs mt-1"
                      style={{ color: 'var(--floyd-text-muted)' }}
                    >
                      /{app.slug}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {app.demo_url && (
                    <a
                      href={app.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        color: 'var(--floyd-text-muted)',
                      }}
                      title="Demo URL"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  <Link
                    href={`/admin/apps/${app.id}`}
                    className="p-2 rounded-lg transition-all"
                    style={{
                      background: 'rgba(0, 229, 255, 0.1)',
                      color: 'var(--floyd-accent-cyan)',
                    }}
                    title="Edit"
                  >
                    <Edit size={18} />
                  </Link>
                  <DeleteAppButton id={app.id} name={app.name} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
