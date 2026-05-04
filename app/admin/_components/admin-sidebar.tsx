'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  LayoutDashboard,
  FileText,
  AppWindow,
  Wrench,
  Mail,
  LogOut,
  Zap,
  ExternalLink,
  Key,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/api-keys', label: 'API Keys', icon: Key },
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { href: '/admin/apps', label: 'Applications', icon: AppWindow },
  { href: '/admin/tools', label: 'MCP Tools', icon: Wrench },
  { href: '/admin/contacts', label: 'Contact Messages', icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession() || {};

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 flex flex-col"
      style={{
        background: 'rgba(30, 15, 45, 0.95)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid var(--floyd-glow-purple)',
      }}
    >
      {/* Logo */}
      <div
        className="p-6 border-b"
        style={{ borderColor: 'var(--floyd-glow-purple)' }}
      >
        <Link href="/admin" className="flex items-center gap-2">
          <Zap
            size={28}
            style={{
              color: 'var(--floyd-accent-cyan)',
              filter: 'drop-shadow(0 0 8px var(--floyd-accent-cyan))',
            }}
          />
          <span
            className="text-xl font-bold"
            style={{ color: 'var(--floyd-text-heading)' }}
          >
            Floyd Admin
          </span>
        </Link>
        <p
          className="text-xs mt-1"
          style={{ color: 'var(--floyd-text-muted)' }}
        >
          Command Center
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
              style={{
                background: active ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                borderLeft: active
                  ? '3px solid var(--floyd-accent-cyan)'
                  : '3px solid transparent',
                color: active
                  ? 'var(--floyd-accent-cyan)'
                  : 'var(--floyd-text-body)',
              }}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info & Actions */}
      <div
        className="p-4 border-t"
        style={{ borderColor: 'var(--floyd-glow-purple)' }}
      >
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 rounded-lg mb-2 transition-all"
          style={{
            color: 'var(--floyd-text-muted)',
            background: 'rgba(255,255,255,0.05)',
          }}
        >
          <ExternalLink size={16} />
          <span className="text-sm">View Site</span>
        </Link>

        {session?.user && (
          <div
            className="px-4 py-2 mb-2 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <p
              className="text-sm font-medium truncate"
              style={{ color: 'var(--floyd-text-body)' }}
            >
              {session.user.name || session.user.email}
            </p>
            <p
              className="text-xs truncate"
              style={{ color: 'var(--floyd-text-muted)' }}
            >
              {session.user.email}
            </p>
          </div>
        )}

        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-all"
          style={{
            color: 'var(--floyd-accent-pink)',
            background: 'rgba(245, 0, 87, 0.1)',
          }}
        >
          <LogOut size={16} />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
