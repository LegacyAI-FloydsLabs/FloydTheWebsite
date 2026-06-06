import { Metadata } from 'next';
import Link from 'next/link';
import { Scroll, AlertTriangle, Skull, Wrench, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Floyd Labs',
  description: 'The legal-ish stuff. Use Floyd Labs sensibly, don’t be a jerk, don’t sue us.',
};

export default function TermsPage() {
  const lastUpdated = 'May 4, 2026';

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-panel p-8 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
               style={{ background: 'rgba(245, 0, 87, 0.15)', border: '2px solid var(--floyd-accent-pink)' }}>
            <Scroll className="w-8 h-8" style={{ color: 'var(--floyd-accent-pink)' }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--floyd-accent-pink)' }}>
            Terms of Service
          </h1>
          <p className="text-lg" style={{ color: 'var(--floyd-text-body)' }}>
            The rules of the road. We tried to keep them human.
          </p>
          <p className="mt-4 text-sm font-mono" style={{ color: 'var(--floyd-text-muted)' }}>
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* TL;DR */}
        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            TL;DR
          </h2>
          <ul className="space-y-3 text-base" style={{ color: 'var(--floyd-text-body)' }}>
            <li>• The site and the MCP tools are free. Use them for whatever you want, within reason.</li>
            <li>• Don’t use Floyd Labs to do illegal stuff, hurt people, or break things on purpose.</li>
            <li>• We can’t guarantee anything always works. Sometimes the LLM hallucinates. Sometimes Vercel sneezes.</li>
            <li>• You’re responsible for what you do with the output.</li>
            <li>• We’re not responsible for damages. Read the rest if you want details.</li>
          </ul>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            1. Acceptance
          </h2>
          <p style={{ color: 'var(--floyd-text-body)' }}>
            By using floydslabs.com, the MCP server, the API, or any related Floyd Labs project (collectively, the “Service”), you agree to these Terms. If you don’t agree, please don’t use it. There are entire other internets you can go to.
          </p>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            2. The Service
          </h2>
          <div className="space-y-3" style={{ color: 'var(--floyd-text-body)' }}>
            <p>Floyd Labs provides an experimental collection of AI-powered tools, an MCP server, blog content, and related projects. Some features may be added, removed, or break in interesting ways without notice. We try not to do this on purpose.</p>
            <p>The Service is provided <span className="font-bold">free of charge</span> for personal and reasonable commercial use. “Reasonable” means: don’t hammer the API in ways that make it stop working for everyone else.</p>
          </div>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            3. Accounts & API Keys
          </h2>
          <div className="space-y-3" style={{ color: 'var(--floyd-text-body)' }}>
            <p>If you create an account:</p>
            <ul className="space-y-2 ml-4">
              <li>• You’re responsible for keeping your password and API keys safe.</li>
              <li>• Don’t share your account or API keys.</li>
              <li>• You must be old enough to enter into a binding contract where you live (typically 13–18 depending on jurisdiction).</li>
              <li>• Tell us if you suspect your credentials are compromised so we can rotate them.</li>
            </ul>
          </div>
        </div>

        <div className="glass-panel p-8 mb-8" style={{ borderColor: 'rgba(245, 0, 87, 0.6)' }}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6" style={{ color: 'var(--floyd-accent-pink)' }} />
            <h2 className="text-2xl font-bold" style={{ color: 'var(--floyd-accent-pink)' }}>
              4. Acceptable Use
            </h2>
          </div>
          <div className="space-y-3" style={{ color: 'var(--floyd-text-body)' }}>
            <p>Don’t use the Service to:</p>
            <ul className="space-y-2 ml-4">
              <li>• Do anything illegal where you live or where the Service operates.</li>
              <li>• Generate content that exploits children, incites real-world violence, or facilitates harassment.</li>
              <li>• Build malware, ransomware, phishing kits, or scam infrastructure.</li>
              <li>• Generate content that violates someone else’s copyright, trademark, or privacy rights.</li>
              <li>• Attempt to break, overload, scrape aggressively, or disrupt the Service.</li>
              <li>• Reverse-engineer, resell, or rebrand the Service as your own.</li>
              <li>• Bypass rate limits, abuse free tiers, or run automated load that ruins it for everyone.</li>
              <li>• Train competing models specifically on Floyd Labs outputs without permission.</li>
            </ul>
            <p className="font-bold pt-2">If you do, we can suspend or terminate your access without warning. We don’t want to. Please don’t make us.</p>
          </div>
        </div>

        <div className="glass-panel p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-6 h-6" style={{ color: 'var(--floyd-accent-cyan)' }} />
            <h2 className="text-2xl font-bold" style={{ color: 'var(--floyd-accent-cyan)' }}>
              5. AI-Generated Content
            </h2>
          </div>
          <div className="space-y-3" style={{ color: 'var(--floyd-text-body)' }}>
            <p>The MCP tools, AI skills, and any output produced by them are generated by large language models. They:</p>
            <ul className="space-y-2 ml-4">
              <li>• May be wrong, biased, made up, outdated, or hilariously confident in nonsense.</li>
              <li>• Are not professional advice (legal, medical, financial, structural—none of it).</li>
              <li>• Should be reviewed by a human before being used in anything important.</li>
            </ul>
            <p><span className="font-bold">You’re responsible</span> for verifying outputs and for whatever you do with them. We are not responsible for code that crashes production, business decisions made on bad output, or anything else downstream.</p>
          </div>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            6. Intellectual Property
          </h2>
          <div className="space-y-3" style={{ color: 'var(--floyd-text-body)' }}>
            <p>The Floyd Labs name, logo, brand voice, blog posts, and original site content are ours. Don’t copy them wholesale or pretend you wrote them.</p>
            <p>Output you generate using our tools is yours to use, subject to acceptable use above. We claim no ownership over what you create.</p>
            <p>Open-source code we publish is licensed under whatever the repo’s LICENSE file says.</p>
          </div>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            7. Privacy
          </h2>
          <p style={{ color: 'var(--floyd-text-body)' }}>
            Our handling of your data is governed by the <Link href="/privacy" className="underline font-bold" style={{ color: 'var(--floyd-accent-pink)' }}>Privacy Policy</Link>. The very short version: we collect very little and we don’t sell anything.
          </p>
        </div>

        <div className="glass-panel p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Skull className="w-6 h-6" style={{ color: 'var(--floyd-accent-pink)' }} />
            <h2 className="text-2xl font-bold" style={{ color: 'var(--floyd-accent-pink)' }}>
              8. Disclaimers
            </h2>
          </div>
          <div className="space-y-3" style={{ color: 'var(--floyd-text-body)' }}>
            <p className="font-bold uppercase text-sm">The legal-shouting part:</p>
            <p>The Service is provided “AS IS” and “AS AVAILABLE” without warranties of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, non-infringement, accuracy, reliability, uptime, or that the LLM won’t confidently invent a function that doesn’t exist.</p>
            <p>We don’t guarantee the Service will be uninterrupted, error-free, secure, or free of viruses or other harmful components. Back up anything important.</p>
          </div>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-pink)' }}>
            9. Limitation of Liability
          </h2>
          <p style={{ color: 'var(--floyd-text-body)' }}>
            To the fullest extent permitted by law, Floyd Labs and anyone associated with it shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenues, data, or goodwill, resulting from your use of (or inability to use) the Service. Our total liability for any claim arising out of or relating to these Terms or the Service shall not exceed one hundred U.S. dollars ($100), or the amount you paid us in the past 12 months, whichever is greater. Since you probably paid us $0, that math is what it is.
          </p>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            10. Indemnification
          </h2>
          <p style={{ color: 'var(--floyd-text-body)' }}>
            You agree to defend, indemnify, and hold harmless Floyd Labs, its team, and contributors from any claims, damages, losses, or expenses (including reasonable attorneys’ fees) arising out of your use of the Service or your violation of these Terms.
          </p>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            11. Termination
          </h2>
          <p style={{ color: 'var(--floyd-text-body)' }}>
            We can suspend or terminate your access to the Service for any reason, including violations of these Terms. You can stop using the Service whenever. If you want your account and data deleted, hit the <Link href="/contact" className="underline font-bold" style={{ color: 'var(--floyd-accent-pink)' }}>contact page</Link>.
          </p>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            12. Changes
          </h2>
          <p style={{ color: 'var(--floyd-text-body)' }}>
            We may update these Terms occasionally. We’ll bump the “Last updated” date and, for material changes, do our best to be obvious about it. Continued use after changes means you accept the new Terms.
          </p>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            13. Governing Law
          </h2>
          <p style={{ color: 'var(--floyd-text-body)' }}>
            These Terms are governed by the laws of the State of Indiana, USA, without regard to conflict-of-law rules. Disputes shall be resolved in the state or federal courts located in Indiana, and you consent to that jurisdiction.
          </p>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--floyd-accent-cyan)' }}>
            14. Miscellaneous
          </h2>
          <div className="space-y-3" style={{ color: 'var(--floyd-text-body)' }}>
            <p>If any part of these Terms is found unenforceable, the rest still applies. Failure to enforce a provision isn’t a waiver. These Terms are the entire agreement between you and Floyd Labs about the Service.</p>
          </div>
        </div>

        <div className="glass-panel p-8 text-center">
          <Heart className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--floyd-accent-pink)' }} />
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--floyd-accent-pink)' }}>
            Thanks for reading
          </h2>
          <p className="mb-4" style={{ color: 'var(--floyd-text-body)' }}>
            You’re in the 0.4% who actually scrolled this far. Go build something.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/tools"
              className="inline-block px-6 py-3 font-bold rounded-md transition-all"
              style={{
                background: 'var(--floyd-accent-cyan)',
                color: 'var(--floyd-bg-primary)',
              }}
            >
              Browse the Tools →
            </Link>
            <Link
              href="/privacy"
              className="inline-block px-6 py-3 font-bold rounded-md transition-all border-2"
              style={{
                borderColor: 'var(--floyd-accent-pink)',
                color: 'var(--floyd-accent-pink)',
              }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
