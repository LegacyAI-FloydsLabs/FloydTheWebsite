'use client';

import Link from 'next/link';
import { Zap, Heart, Github, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer
      className="border-t mt-20"
      style={{
        backgroundColor: 'var(--floyd-bg-card)',
        borderColor: 'var(--floyd-glow-purple)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={20} style={{ color: 'var(--floyd-accent-cyan)' }} />
              <span
                className="text-lg font-bold neon-heading"
                style={{ fontFamily: 'monospace' }}
              >
                Floyd<span style={{ color: 'var(--floyd-accent-pink)' }}>Labs</span>
              </span>
            </div>
            <p className="text-sm text-floyd-muted leading-relaxed">
              Garage-born. Spite-driven. Caffeine-powered.
              Building AI that belongs to you, not shareholders.
            </p>
            <p
              className="text-xs mt-2 font-mono"
              style={{ color: 'var(--floyd-accent-green)' }}
            >
              &ldquo;I don&rsquo;t suck.&rdquo; — Floyd
            </p>
          </div>

          {/* Links */}
          <div>
            <h3
              className="text-sm font-semibold mb-3 uppercase tracking-wider"
              style={{ color: 'var(--floyd-text-heading)' }}
            >
              Navigate
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/about',   label: 'About Us' },
                { href: '/tools',   label: 'MCP Tools' },
                { href: '/blog',    label: 'Blog' },
                { href: '/apps',    label: 'Applications' },
                { href: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--floyd-text-muted)' }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = 'var(--floyd-accent-cyan)')
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = 'var(--floyd-text-muted)')
                    }
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h3
              className="text-sm font-semibold mb-3 uppercase tracking-wider"
              style={{ color: 'var(--floyd-text-heading)' }}
            >
              Ecosystem
            </h3>
            <ul className="space-y-2">
              {[
                { href: 'https://www.LegacyAI.space', label: 'LegacyAI.space', external: true },
                { href: 'https://github.com/LegacyAI-FloydsLabs', label: 'GitHub', external: true, icon: true },
                { href: '/api-docs', label: 'API Docs', external: false },
                { href: '/connect', label: 'Connect (MCP)', external: false },
              ].map((l) => (
                <li key={l.href}>
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors inline-flex items-center gap-1"
                      style={{ color: 'var(--floyd-text-muted)' }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = 'var(--floyd-accent-cyan)')
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = 'var(--floyd-text-muted)')
                      }
                    >
                      {l.icon && <Github size={14} />}
                      {l.label}
                      <ExternalLink size={10} />
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      className="text-sm transition-colors"
                      style={{ color: 'var(--floyd-text-muted)' }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = 'var(--floyd-accent-cyan)')
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = 'var(--floyd-text-muted)')
                      }
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal links */}
        <div
          className="pt-6 border-t flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs"
          style={{ borderColor: 'var(--floyd-glow-purple)' }}
        >
          <Link
            href="/privacy"
            className="transition-colors"
            style={{ color: 'var(--floyd-text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--floyd-accent-cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--floyd-text-muted)')}
          >
            Privacy Policy
          </Link>
          <span style={{ color: 'var(--floyd-text-muted)' }}>·</span>
          <Link
            href="/terms"
            className="transition-colors"
            style={{ color: 'var(--floyd-text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--floyd-accent-cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--floyd-text-muted)')}
          >
            Terms of Service
          </Link>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ color: 'var(--floyd-text-muted)' }}
        >
          <p>
            © 2026 Floyd Labs / Legacy AI — Brown County, Indiana
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart size={12} style={{ color: 'var(--floyd-accent-pink)' }} /> and spite by Douglas Talley
          </p>
          <p style={{ color: 'var(--floyd-accent-green)', fontFamily: 'monospace' }}>
            $0 subscriptions. Always.
          </p>
        </div>
      </div>
    </footer>
  );
}
