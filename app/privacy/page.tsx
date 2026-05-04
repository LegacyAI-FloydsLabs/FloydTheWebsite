import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Eye, Database, Mail, Cookie, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Floyd Labs',
  description: 'How Floyd Labs handles your data. Spoiler: we collect almost nothing and we sell exactly zero of it.',
};

export default function PrivacyPage() {
  const lastUpdated = 'May 4, 2026';

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-panel p-8 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
               style={{ background: 'rgba(0, 229, 255, 0.15)', border: '2px solid var(--floyd-accent-cyan)' }}>
            <Shield className="w-8 h-8" style={{ color: 'var(--floyd-accent-cyan)' }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            Privacy Policy
          </h1>
          <p className="text-lg" style={{ color: 'var(--floyd-text-body)' }}>
            The short version: we don’t want your data, we don’t sell your data, and most of the time we don’t even keep your data.
          </p>
          <p className="mt-4 text-sm font-mono" style={{ color: 'var(--floyd-text-muted)' }}>
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* TL;DR */}
        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-pink)' }}>
            TL;DR (the part nobody reads)
          </h2>
          <ul className="space-y-3 text-base" style={{ color: 'var(--floyd-text-body)' }}>
            <li>• We collect the minimum data needed to make the site work.</li>
            <li>• We don’t sell, rent, lease, trade, gift, or barter your data. Ever.</li>
            <li>• We don’t run ad networks, retargeting pixels, or behavioral profiling.</li>
            <li>• If you sign in with Google, we get your email and name. That’s it.</li>
            <li>• If you submit a contact form, we keep what you typed so we can reply.</li>
            <li>• If you use our MCP API, we log calls so we can debug and rate-limit.</li>
            <li>• You can email us and we’ll delete everything we have on you. No drama.</li>
          </ul>
        </div>

        {/* Sections */}
        <div className="glass-panel p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6" style={{ color: 'var(--floyd-accent-cyan)' }} />
            <h2 className="text-2xl font-bold" style={{ color: 'var(--floyd-accent-cyan)' }}>
              What We Collect
            </h2>
          </div>
          <div className="space-y-4" style={{ color: 'var(--floyd-text-body)' }}>
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--floyd-accent-pink)' }}>Account Information</h3>
              <p>If you create an account or sign in with Google, we store your email address, display name, and (for Google sign-in) your Google account ID. Passwords are hashed with bcrypt — we couldn’t read them if we wanted to.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--floyd-accent-pink)' }}>Contact Form Submissions</h3>
              <p>Whatever you put in the contact form (name, email, subject, message) gets stored so we can read it and reply. We don’t use it for marketing because we don’t do marketing.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--floyd-accent-pink)' }}>API & MCP Usage</h3>
              <p>If you use our MCP server or generate an API key, we log: which tool you called, when, how long it took, whether it succeeded, and basic token counts. We do this for rate-limiting, debugging, and capacity planning. We don’t look at your inputs or outputs unless you ask us to help debug something.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--floyd-accent-pink)' }}>Server Logs</h3>
              <p>Like every website on Earth, our hosting provider keeps short-term logs of IP addresses, user agents, and request paths for security and abuse prevention. These rotate quickly and aren’t tied to your account.</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6" style={{ color: 'var(--floyd-accent-cyan)' }} />
            <h2 className="text-2xl font-bold" style={{ color: 'var(--floyd-accent-cyan)' }}>
              What We Do NOT Collect
            </h2>
          </div>
          <ul className="space-y-2" style={{ color: 'var(--floyd-text-body)' }}>
            <li>❌ Your contacts, calendar, files, photos, or location.</li>
            <li>❌ Behavioral profiles for ad targeting.</li>
            <li>❌ Biometric data, voice recordings, or face scans.</li>
            <li>❌ Cross-site tracking via third-party cookies or pixels.</li>
            <li>❌ Data brokers’ data on you. We don’t buy it. Ever.</li>
          </ul>
        </div>

        <div className="glass-panel p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-6 h-6" style={{ color: 'var(--floyd-accent-cyan)' }} />
            <h2 className="text-2xl font-bold" style={{ color: 'var(--floyd-accent-cyan)' }}>
              Cookies & Local Storage
            </h2>
          </div>
          <div className="space-y-3" style={{ color: 'var(--floyd-text-body)' }}>
            <p>We use cookies for two boring reasons:</p>
            <ul className="space-y-2 ml-4">
              <li><span className="font-bold" style={{ color: 'var(--floyd-accent-pink)' }}>Session cookies</span> — to keep you signed in after you sign in. Set by NextAuth.</li>
              <li><span className="font-bold" style={{ color: 'var(--floyd-accent-pink)' }}>Theme preference</span> — to remember if you picked dark or light mode. Stored in your browser, never sent to us.</li>
            </ul>
            <p>Google Analytics is enabled in production for basic traffic stats (pageviews, referrers, country-level location). It uses Google’s cookies. If you don’t want it, browser-level Do Not Track + an ad blocker handle it.</p>
          </div>
        </div>

        <div className="glass-panel p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6" style={{ color: 'var(--floyd-accent-cyan)' }} />
            <h2 className="text-2xl font-bold" style={{ color: 'var(--floyd-accent-cyan)' }}>
              Third Parties We Use
            </h2>
          </div>
          <div className="space-y-3" style={{ color: 'var(--floyd-text-body)' }}>
            <p>We try to keep the dependency list short. Currently:</p>
            <ul className="space-y-2 ml-4">
              <li>• <span className="font-bold">Vercel</span> — hosts the site and handles deployment.</li>
              <li>• <span className="font-bold">Neon</span> — hosts the Postgres database.</li>
              <li>• <span className="font-bold">Google</span> — if you choose to sign in with Google.</li>
              <li>• <span className="font-bold">Google Analytics</span> — anonymous traffic stats.</li>
              <li>• <span className="font-bold">An LLM API provider</span> — powers the MCP tool execution. Inputs you send to MCP tools pass through this provider to be processed. We don’t train models on your data.</li>
            </ul>
            <p>That’s the whole list. No analytics swarms, no session-replay creeps, no chat widgets that screenshot your page.</p>
          </div>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            Your Rights
          </h2>
          <div className="space-y-3" style={{ color: 'var(--floyd-text-body)' }}>
            <p>Wherever you live, you can:</p>
            <ul className="space-y-2 ml-4">
              <li>• <span className="font-bold">Ask</span> what data we have on you.</li>
              <li>• <span className="font-bold">Correct</span> anything that’s wrong.</li>
              <li>• <span className="font-bold">Delete</span> your account and everything tied to it.</li>
              <li>• <span className="font-bold">Export</span> your data in a portable format.</li>
              <li>• <span className="font-bold">Opt out</span> of any non-essential collection.</li>
            </ul>
            <p>Email us via the <Link href="/contact" className="underline font-bold" style={{ color: 'var(--floyd-accent-pink)' }}>contact page</Link>. We respond within a reasonable amount of time, which usually means days, not weeks.</p>
          </div>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            Children’s Privacy
          </h2>
          <p style={{ color: 'var(--floyd-text-body)' }}>
            This site isn’t directed at kids under 13 and we don’t knowingly collect data from them. If a kid signed up, email us and we’ll nuke the account.
          </p>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            Changes to This Policy
          </h2>
          <p style={{ color: 'var(--floyd-text-body)' }}>
            If we change anything material, we’ll bump the “Last updated” date at the top and try to be loud about it. We’re not going to slip new tracking in via a 47-page legalese update at midnight on a holiday.
          </p>
        </div>

        <div className="glass-panel p-8 text-center">
          <Mail className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--floyd-accent-pink)' }} />
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--floyd-accent-pink)' }}>
            Questions?
          </h2>
          <p className="mb-4" style={{ color: 'var(--floyd-text-body)' }}>
            Hit the contact form. A real human reads it.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 font-bold rounded-md transition-all"
            style={{
              background: 'var(--floyd-accent-cyan)',
              color: 'var(--floyd-bg-primary)',
            }}
          >
            Get in Touch →
          </Link>
        </div>
      </div>
    </div>
  );
}
