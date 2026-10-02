"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  ["/", "Home"],
  ["/about", "About"],
  ["/tools", "Tools"],
  ["/connect", "Connect"],
  ["/blog", "Blog"],
  ["/apps", "Apps"],
  ["/open-source", "Open source"],
  ["/contact", "Contact"],
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="nav-wrap">
          <Link href="/" className="brand" aria-label="Floyd Labs home">
            <Image src={`/brand/logo-${theme}.svg`} width={36} height={36} unoptimized alt="" />
            <span>Floyd<span>Labs</span></span>
          </Link>
          <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
            {navLinks.map(([href, label]) => {
              const active = href === "/" ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  href={href}
                  key={href}
                  className={active ? "active" : ""}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="nav-actions">
            <button
              className="icon-button"
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
            <button
              className="icon-button menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "×" : "≡"}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>{children}</main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <div className="brand footer-brand"><Image src={`/brand/logo-${theme}.svg`} width={32} height={32} unoptimized alt="" /> Floyd<span>Labs</span></div>
            <p>Garage-born in Brown County. Built around real people, real work, and technology that earns its keep.</p>
            <p className="terminal-line">“I don&apos;t suck.” — Floyd</p>
          </div>
          <div>
            <h3>Navigate</h3>
            <div className="footer-links">
              <Link href="/about">About Us</Link>
              <Link href="/tools">MCP Tools</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/apps">Applications</Link>
              <Link href="/open-source">Public releases</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <h3>Ecosystem</h3>
            <div className="footer-links">
              <a href="https://www.LegacyAI.space" target="_blank" rel="noreferrer">LegacyAI.space ↗</a>
              <a href="https://github.com/CaptainPhantasy" target="_blank" rel="noreferrer">GitHub ↗</a>
              <Link href="/api-docs">API Docs</Link>
              <Link href="/connect">Connect (MCP)</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Floyd Labs / Legacy AI — Brown County, Indiana</span>
          <span>Built with ♥ and spite by Douglas Talley</span>
          <span className="terminal-line">Independent tools. Clear boundaries.</span>
        </div>
      </footer>
    </>
  );
}
