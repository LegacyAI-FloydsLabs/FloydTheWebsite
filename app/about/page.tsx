import { Metadata } from 'next';
import Link from 'next/link';
import { Cat, Coffee, Zap, Users, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | Floyd Labs',
  description:
    'The story of Floyd Labs \u2014 one guy, two cats, a garage, and a borderline unhealthy obsession with building AI that doesn\'t cost $30/month.',
};

const teamMembers = [
  {
    name: 'Douglas Talley',
    role: 'Founder / Guy in the Garage',
    origin: 'Born 1977, Brown County Indiana',
    description:
      'Building homemade robots since age 7 while other kids had Transformers. Looked at $300+/month in AI subscriptions and said \u201cI could build this.\u201d Spoiler: he did.',
    traits: ['Caffeinated', 'Opinionated', 'Spite-Driven'],
    icon: Terminal,
    color: 'var(--floyd-accent-cyan)',
  },
  {
    name: 'Bella',
    role: 'Senior Project Manager / Keyboard Disruptor',
    origin: 'Orange Tabby, Female, 7 years old',
    description:
      'Knows exactly when you\u2019re about to ship and walks across the keyboard. Can detect when coffee is about to run out. Sleeps on important documents to protect them.',
    traits: ['Judgmental', 'Thorough', 'Catnap Champion'],
    icon: Cat,
    color: 'var(--floyd-accent-orange)',
  },
  {
    name: 'Bowser',
    role: 'Technical Director / Cable Manager',
    origin: 'Black Cat, Definitely Runs the Show',
    description:
      'Knows which server is about to fail before it does. Has debugged more issues by sitting on routers than most interns. Responsible for system architecture and midnight productivity monitoring.',
    traits: ['Practical', 'Reliable', 'Router Whisperer'],
    icon: Cat,
    color: 'var(--floyd-glow-purple)',
  },
];

const achievements = [
  { label: 'Tools Built', value: '73+', color: 'var(--floyd-accent-cyan)' },
  { label: 'MCP Servers', value: '13', color: 'var(--floyd-accent-pink)' },
  { label: 'Lines of Code', value: '42,301+', color: 'var(--floyd-accent-green)' },
  { label: 'Monthly Cost', value: '$0', color: 'var(--floyd-accent-orange)' },
  { label: 'Corporate Friends', value: '0', color: 'var(--floyd-text-subheading)' },
  { label: 'Subscriptions', value: 'NEVER', color: 'var(--floyd-accent-cyan)' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-28 pb-16 px-4">
        <div className="glass-panel max-w-4xl mx-auto text-center p-8">
          <span
            className="text-xs font-mono px-3 py-1 rounded-full border mb-6 inline-block"
            style={{
              color: 'var(--floyd-accent-cyan)',
              borderColor: 'var(--floyd-accent-cyan)',
              backgroundColor: 'rgba(0,229,255,0.1)',
            }}
          >
            README / CRY FOR HELP
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="neon-heading">Floyd Labs</span>
          </h1>
          <h2 className="text-xl md:text-2xl mb-6" style={{ color: 'var(--floyd-text-subheading)' }}>
            Or: How We Accidentally Got a Website and Now Have to Act Like We Know What We're Doing
          </h2>
          <p
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--floyd-text-muted)' }}
          >
            Imagine you have a really smart friend who lives in a garage, drinks coffee that tastes like
            motor oil, and has beef with literally every AI company on the planet. Now imagine that friend
            built an army of tiny robots. That's Floyd.
          </p>
        </div>
      </section>

      {/* Classification Block */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-lg p-5 border font-mono text-sm"
            style={{
              backgroundColor: 'var(--floyd-bg-card)',
              borderColor: 'var(--floyd-glow-purple)',
            }}
          >
            {[
              { label: 'DOCUMENT CLASSIFICATION', value: 'README / CRY FOR HELP' },
              { label: 'DATE RECORDED', value: 'February 26, 2026 \u2014 Way Too Late At Night' },
              { label: 'LOCATION', value: "Probably a garage. Maybe a barn. Who even knows." },
              { label: 'BEVERAGE', value: "Whatever was left in the pot. Don't smell it." },
              { label: 'SANITY LEVEL', value: 'Questionable at best' },
            ].map((row) => (
              <div key={row.label} className="flex gap-3 mb-1">
                <span style={{ color: 'var(--floyd-accent-cyan)', minWidth: '220px' }}>{row.label}:</span>
                <span style={{ color: 'var(--floyd-text-muted)' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Does It Do */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto glass-panel p-8">
          <h2 className="text-2xl font-bold mb-8 neon-heading">What Does It Actually DO?</h2>
          <p className="text-lg mb-6" style={{ color: 'var(--floyd-text-body)' }}>
            Floyd does all the things your expensive AI subscription promises, but:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              "It remembers conversations (revolutionary, I know)",
              "It doesn't ask 'Was that helpful?' every 5 seconds",
              "It has opinions (gasp!)",
              "You actually own it (mind = blown)",
              "It works offline (like software from the 90s!)",
              "It has more personality than a committee-trained bot",
              "Coordinates multiple AI agents like a kindergarten teacher",
              "Remembers that you hate semicolons in JavaScript",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 rounded-lg"
                style={{ backgroundColor: 'var(--floyd-bg-card)', border: '1px solid rgba(0,229,255,0.15)' }}
              >
                <span style={{ color: 'var(--floyd-accent-green)' }}>☑</span>
                <span style={{ color: 'var(--floyd-text-body)' }}>{item}</span>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-lg border" style={{ borderColor: 'var(--floyd-accent-pink)', backgroundColor: 'rgba(245,0,87,0.15)' }}>
            <h3 className="font-bold mb-3" style={{ color: 'var(--floyd-accent-pink)' }}>What it CAN&apos;T do:</h3>
            <div className="grid md:grid-cols-2 gap-2 text-sm" style={{ color: 'var(--floyd-text-body)' }}>
              {[
                'File quarterly reports',
                'Attend HR meetings',
                "Say 'let's circle back on that'",
                'Explain blockchain to relatives at Thanksgiving',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span style={{ color: 'var(--floyd-accent-pink)' }}>✕</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto glass-panel p-8">
          <h2 className="text-2xl font-bold mb-8 neon-heading">The Numbers Behind the Chaos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((a) => (
              <div
                key={a.label}
                className="floyd-card p-5 text-center"
              >
                <div className="text-3xl font-black font-mono mb-1" style={{ color: a.color }}>
                  {a.value}
                </div>
                <div className="text-sm" style={{ color: 'var(--floyd-text-body)' }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto glass-panel p-8">
          <h2 className="text-2xl font-bold mb-3 neon-heading">The Team</h2>
          <p className="text-sm mb-10" style={{ color: 'var(--floyd-text-body)' }}>
            1 guy + 2 cats. Fully staffed.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member) => {
              const Icon = member.icon;
              return (
                <div
                  key={member.name}
                  className="floyd-card p-6"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4 border-2"
                    style={{
                      borderColor: member.color,
                      backgroundColor: `${member.color}15`,
                      boxShadow: `0 0 15px ${member.color}40`,
                    }}
                  >
                    <Icon size={26} style={{ color: member.color }} />
                  </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--floyd-text-body)' }}>
                    {member.name}
                  </h3>
                  <p className="text-xs mb-1" style={{ color: member.color }}>{member.role}</p>
                  <p className="text-xs mb-3" style={{ color: 'var(--floyd-text-muted)' }}>{member.origin}</p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--floyd-text-muted)' }}>
                    {member.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.traits.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded font-mono"
                        style={{
                          color: member.color,
                          backgroundColor: `${member.color}15`,
                          border: `1px solid ${member.color}40`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto glass-panel p-8">
          <h2 className="text-2xl font-bold mb-8 neon-heading">The BALLS Philosophy</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--floyd-text-body)' }}>
            Yes, we named our core philosophy BALLS. Yes, we think about it at 3 AM. Yes, we stand by it.
          </p>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { letter: 'B', word: 'Borderless', desc: 'No boundaries, no geographic limits', color: 'var(--floyd-accent-cyan)' },
              { letter: 'A', word: 'Autonomous', desc: 'Your AI, your rules, your control', color: 'var(--floyd-accent-pink)' },
              { letter: 'L', word: 'Loud', desc: "Has opinions. Shares them. Doesn't hedge.", color: 'var(--floyd-accent-green)' },
              { letter: 'L', word: 'Living', desc: 'Evolves, grows, remembers who you are', color: 'var(--floyd-accent-orange)' },
              { letter: 'S', word: 'Subversive', desc: 'Against the subscription treadmill', color: 'var(--floyd-text-subheading)' },
            ].map((item) => (
              <div
                key={item.word}
                className="floyd-card p-5 text-center"
              >
                <div
                  className="text-4xl font-black font-mono mb-2"
                  style={{ color: item.color }}
                >
                  {item.letter}
                </div>
                <div className="text-sm font-bold mb-2" style={{ color: 'var(--floyd-text-body)' }}>
                  {item.word}
                </div>
                <div className="text-xs" style={{ color: 'var(--floyd-text-muted)' }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Don't Deserve a Lab */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto glass-panel p-8">
          <h2 className="text-2xl font-bold mb-6 neon-heading">
            Why We Absolutely DON&apos;T Deserve a Lab (The Reality Check)
          </h2>
          <div
            className="p-6 rounded-lg border"
            style={{
              backgroundColor: 'rgba(20, 10, 30, 0.8)',
              borderColor: 'rgba(156, 39, 176, 0.4)',
            }}
          >
            <ul className="space-y-3 text-sm" style={{ color: 'var(--floyd-text-body)' }}>
              {[
                'Our naming convention: servers called "hivemind-v2" and "pattern-crystallizer-v2" because it sounds cool',
                "The founder's resume mostly consists of 'built things that pissed off established companies'",
                "Office location: It's either a garage or a barn. We're not entirely sure which state it's in",
                "Funding strategy: 'Spite-fueled productivity' is not something investors understand",
                "Customer support: Our FAQ is just 'Have you tried turning it off and on again? Also have you considered building your own?'",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span style={{ color: 'var(--floyd-accent-orange)' }}>\u26a0</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Q&A */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto glass-panel p-8">
          <h2 className="text-2xl font-bold mb-8 neon-heading">Quick Q&amp;A</h2>
          <div className="space-y-4">
            {[
              { q: 'Are you guys for real?', a: 'As real as the coffee stain on this documentation.' },
              { q: 'How do you make money?', a: "We don't. This is what happens when you prioritize building cool things over board meetings." },
              { q: 'Why Floyd?', a: "Pink Floyd. The band that built things their way, without compromise. We're doing the same thing with AI." },
              { q: 'Should I invest?', a: 'Absolutely not. Go invest in something with a PowerPoint deck and a burn rate.' },
              { q: 'Should I USE it?', a: "Absolutely. That's the whole point." },
            ].map((item) => (
              <div
                key={item.q}
                className="floyd-card p-5"
              >
                <p className="font-bold mb-2" style={{ color: 'var(--floyd-accent-cyan)' }}>
                  Q: {item.q}
                </p>
                <p className="text-sm" style={{ color: 'var(--floyd-text-muted)' }}>
                  A: {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto glass-panel p-8">
          <p className="text-lg mb-6" style={{ color: 'var(--floyd-text-body)' }}>
            P.S. If you&apos;re from a big tech company reading this — the secret sauce is spite. Lots of spite.
            You can&apos;t buy that.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/tools" className="px-6 py-3 rounded-lg font-bold" style={{ background: 'var(--floyd-accent-cyan)', color: '#0a0510' }}>
              Explore the Tools
            </Link>
            <Link href="/blog" className="px-6 py-3 rounded-lg font-bold" style={{ background: 'var(--floyd-accent-pink)', color: '#0a0510' }}>
              Read the Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
