import { prisma } from '@/lib/db';
import { FileText, AppWindow, Wrench, Mail, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getStats() {
  const [blogCount, appCount, skillCount, contactCount, recentContacts] = await Promise.all([
    prisma.blog_post.count(),
    prisma.application.count(),
    prisma.skills_cache.count(),
    prisma.contact_submission.count(),
    prisma.contact_submission.findMany({
      take: 5,
      orderBy: { created_at: 'desc' },
      select: { id: true, name: true, email: true, created_at: true, status: true },
    }),
  ]);

  return { blogCount, appCount, skillCount, contactCount, recentContacts };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    {
      label: 'Blog Posts',
      value: stats.blogCount,
      icon: FileText,
      href: '/admin/blog',
      color: 'cyan',
    },
    {
      label: 'Applications',
      value: stats.appCount,
      icon: AppWindow,
      href: '/admin/apps',
      color: 'pink',
    },
    {
      label: 'MCP Skills',
      value: stats.skillCount,
      icon: Wrench,
      href: '/admin/tools',
      color: 'green',
    },
    {
      label: 'Contact Messages',
      value: stats.contactCount,
      icon: Mail,
      href: '/admin/contacts',
      color: 'orange',
    },
  ];

  const colorMap: Record<string, string> = {
    cyan: 'var(--floyd-accent-cyan)',
    pink: 'var(--floyd-accent-pink)',
    green: 'var(--floyd-accent-green)',
    orange: 'var(--floyd-accent-orange)',
  };

  return (
    <div>
      {/* Header */}
      <div className="glass-panel p-6 mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--floyd-text-heading)' }}
        >
          Dashboard
        </h1>
        <p style={{ color: 'var(--floyd-text-body)' }}>
          Welcome back to the garage. Everything is running... probably.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="floyd-card p-6 transition-all hover:scale-105"
              style={{
                borderColor: `${colorMap[card.color]}60`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon
                  size={24}
                  style={{ color: colorMap[card.color] }}
                />
                <TrendingUp
                  size={16}
                  style={{ color: 'var(--floyd-text-muted)' }}
                />
              </div>
              <p
                className="text-3xl font-bold mb-1"
                style={{ color: colorMap[card.color] }}
              >
                {card.value}
              </p>
              <p style={{ color: 'var(--floyd-text-body)' }}>{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="floyd-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl font-bold"
            style={{ color: 'var(--floyd-text-heading)' }}
          >
            Recent Contact Messages
          </h2>
          <Link
            href="/admin/contacts"
            className="text-sm"
            style={{ color: 'var(--floyd-accent-cyan)' }}
          >
            View All \u2192
          </Link>
        </div>

        {stats.recentContacts.length === 0 ? (
          <p style={{ color: 'var(--floyd-text-muted)' }}>
            No messages yet. The inbox is as empty as the motor oil coffee pot.
          </p>
        ) : (
          <div className="space-y-4">
            {stats.recentContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ background: 'rgba(20, 10, 30, 0.9)' }}
              >
                <div>
                  <p
                    className="font-medium"
                    style={{ color: 'var(--floyd-text-body)' }}
                  >
                    {contact.name}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--floyd-text-muted)' }}
                  >
                    {contact.email}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background:
                        contact.status === 'new'
                          ? 'rgba(0, 229, 255, 0.2)'
                          : 'rgba(118, 255, 3, 0.2)',
                      color:
                        contact.status === 'new'
                          ? 'var(--floyd-accent-cyan)'
                          : 'var(--floyd-accent-green)',
                    }}
                  >
                    {contact.status}
                  </span>
                  <p
                    className="text-xs mt-1 flex items-center gap-1 justify-end"
                    style={{ color: 'var(--floyd-text-muted)' }}
                  >
                    <Clock size={12} />
                    {new Date(contact.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
