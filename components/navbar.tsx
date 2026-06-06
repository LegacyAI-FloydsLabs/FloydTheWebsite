'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './theme-toggle';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { href: '/',        label: 'Home' },
  { href: '/about',   label: 'About' },
  { href: '/tools',   label: 'Tools' },
  { href: '/connect', label: 'Connect' },
  { href: '/blog',    label: 'Blog' },
  { href: '/apps',    label: 'Apps' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? 'rgba(20, 10, 30, 0.92)'
          : 'rgba(20, 10, 30, 0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${scrolled ? 'var(--floyd-glow-purple)' : 'transparent'}`,
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Zap
            size={22}
            className="transition-all duration-300 group-hover:scale-110"
            style={{ color: 'var(--floyd-accent-cyan)' }}
          />
          <span
            className="text-lg font-bold tracking-tight neon-heading"
            style={{ fontFamily: 'monospace' }}
          >
            Floyd<span style={{ color: 'var(--floyd-accent-pink)' }}>Labs</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive ? 'var(--floyd-accent-cyan)' : 'var(--floyd-text-muted)',
                  backgroundColor: isActive ? 'rgba(0,229,255,0.08)' : 'transparent',
                  textShadow: isActive ? '0 0 8px var(--floyd-accent-cyan)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.color = 'var(--floyd-text-body)';
                    (e.target as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.color = 'var(--floyd-text-muted)';
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md transition-colors"
            style={{ color: 'var(--floyd-text-muted)' }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: 'rgba(20, 10, 30, 0.95)',
            backdropFilter: 'blur(12px)',
            borderColor: 'var(--floyd-glow-purple)',
          }}
        >
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive ? 'var(--floyd-accent-cyan)' : 'var(--floyd-text-body)',
                    backgroundColor: isActive ? 'rgba(0,229,255,0.1)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
