import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { HeroSection } from './_components/hero-section';
import { StatsSection } from './_components/stats-section';

export default function HomePage() {
  const latestPosts = blogPosts?.slice(0, 3) ?? [];

  return (
    <div className="">
      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <StatsSection />

      {/* What Is Floyd Labs */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-panel text-center mb-14 p-8 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="neon-heading">What Even</span>{' '}
              <span className="neon-yellow">IS This?</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--floyd-text-muted)' }}>
              Imagine you have a really smart friend who lives in a garage, drinks coffee that tastes like
              motor oil, and has beef with literally every AI company on the planet.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔧',
                title: 'Ownership',
                color: 'var(--floyd-accent-cyan)',
                desc: 'You own it. You host it. You control it. When the company dies, your AI and your data survive. This is not a subscription.',
              },
              {
                icon: '🧠',
                title: 'Personality',
                color: 'var(--floyd-accent-pink)',
                desc: 'It has opinions. It remembers stuff. It doesn\'t ask "Was that helpful?" every 5 seconds. It\'s not trained by a committee.',
              },
              {
                icon: '🚫',
                title: '$0/Month',
                color: 'var(--floyd-accent-green)',
                desc: 'Not $20/month. Not $30/month. Not a tiered pricing structure with a "premium" plan that unlocks the useful stuff. Zero. Dollars.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="floyd-card p-6 text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: item.color }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--floyd-text-muted)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-panel p-6 mb-14 max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-center">
              <span className="neon-heading">The FLOYD Suite</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Floyd CLI', tag: 'Terminal', desc: 'The original AI agent. Opinionated, remembers everything, doesn\'t suffer fools.', color: 'var(--floyd-accent-cyan)' },
              { name: 'Floyd Desktop', tag: 'GUI', desc: 'Visual interface for people who hate CLIs but still love Floyd.', color: 'var(--floyd-accent-pink)' },
              { name: 'Floyd IDE', tag: 'Code', desc: 'Code assistant that reviews your work without passive-aggression (mostly).', color: 'var(--floyd-accent-green)' },
              { name: '13 MCP Servers', tag: 'Infrastructure', desc: 'Model Context Protocol servers running 24/7, because spite doesn\'t take days off.', color: 'var(--floyd-accent-orange)' },
              { name: '73+ Skills', tag: 'Capabilities', desc: 'Specialized AI skills covering everything from code review to consensus algorithms.', color: 'var(--floyd-text-subheading)' },
              { name: 'Memory System', tag: 'Persistence', desc: 'Remembers what you told it yesterday. Revolutionary? In 2026, apparently yes.', color: 'var(--floyd-glow-purple)' },
            ].map((feat) => (
              <div
                key={feat.name}
                className="floyd-card p-5"
              >
                <span
                  className="text-xs font-mono px-2 py-1 rounded mb-3 inline-block"
                  style={{
                    color: feat.color,
                    backgroundColor: `${feat.color}18`,
                    border: `1px solid ${feat.color}40`,
                  }}
                >
                  {feat.tag}
                </span>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--floyd-text-body)' }}>
                  {feat.name}
                </h3>
                <p className="text-sm" style={{ color: 'var(--floyd-text-muted)' }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Quote */}
      <section className="py-16 px-4">
        <div className="glass-panel max-w-4xl mx-auto text-center p-10">
          <blockquote
            className="text-2xl md:text-3xl font-bold leading-relaxed mb-6"
            style={{ color: 'var(--floyd-text-subheading)' }}
          >
            &ldquo;Would a guy in a garage with a Pink Floyd shirt say this at 3 AM while drinking
            coffee that tastes like motor oil?&rdquo;
          </blockquote>
          <p style={{ color: 'var(--floyd-text-muted)' }}>
            If yes → ship it &nbsp;&nbsp; If no → rewrite it &nbsp;&nbsp; If unsure → add more coffee
          </p>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-panel p-6 mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-bold neon-heading">Latest from the Garage</h2>
            <Link
              href="/blog"
              className="btn-neon-cyan px-4 py-2 rounded-lg text-sm font-medium"
            >
              All Posts →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link key={post?.slug} href={`/blog/${post?.slug ?? ''}`}>
                <div className="floyd-card p-6 h-full cursor-pointer">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {(post?.tags ?? []).slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded font-mono"
                        style={{
                          color: 'var(--floyd-accent-cyan)',
                          backgroundColor: 'rgba(0,229,255,0.1)',
                          border: '1px solid rgba(0,229,255,0.3)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: 'var(--floyd-text-heading)' }}>
                    {post?.title ?? ''}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--floyd-text-muted)' }}>
                    {(post?.excerpt ?? '').slice(0, 120)}...
                  </p>
                  <div className="flex items-center justify-between text-xs" style={{ color: 'var(--floyd-text-muted)' }}>
                    <span>{post?.author ?? ''}</span>
                    <span>{post?.date ?? ''}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="glass-panel max-w-3xl mx-auto text-center p-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text-neon">Ready to Own Your AI?</span>
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--floyd-text-muted)' }}>
            We&apos;re not a company. We&apos;re a problem. And you&apos;re welcome to be part of it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools" className="btn-neon-solid-cyan px-8 py-3 rounded-lg font-semibold">
              Explore Tools
            </Link>
            <Link href="/contact" className="btn-neon-pink px-8 py-3 rounded-lg font-semibold">
              Get in Touch
            </Link>
          </div>
          <p className="text-xs mt-6 font-mono" style={{ color: 'var(--floyd-accent-green)' }}>
            Bella and Bowser have approved this message.
          </p>
        </div>
      </section>
    </div>
  );
}
