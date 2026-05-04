'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Zap, Star, Clock } from 'lucide-react';

interface Skill {
  slug: string;
  name: string;
  description: string;
  category: string;
  version: string;
  quality: string;
  lastUpdated: string;
}

interface ToolsClientProps {
  skills: Skill[];
}

const categoryColors: Record<string, string> = {
  reasoning: 'var(--floyd-accent-cyan)',
  patterns: 'var(--floyd-accent-pink)',
  workflows: 'var(--floyd-accent-green)',
  general: 'var(--floyd-accent-orange)',
};

function getCategoryColor(cat: string): string {
  return categoryColors[cat?.toLowerCase() ?? ''] ?? 'var(--floyd-glow-purple)';
}

export function ToolsClient({ skills }: ToolsClientProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    (skills ?? []).forEach((s) => {
      if (s?.category) cats.add(s.category);
    });
    return ['all', ...Array.from(cats).sort()];
  }, [skills]);

  const filtered = useMemo(() => {
    return (skills ?? []).filter((s) => {
      if (!s) return false;
      const matchesSearch =
        search === '' ||
        (s.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (s.description ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (s.category ?? '').toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === 'all' || s.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [skills, search, activeCategory]);

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Search + Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--floyd-text-muted)' }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e?.target?.value ?? '')}
              placeholder="Search skills by name, description, or category..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border outline-none transition-all text-sm"
              style={{
                backgroundColor: 'var(--floyd-bg-card)',
                borderColor: 'var(--floyd-glow-purple)',
                color: 'var(--floyd-text-body)',
              }}
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor = 'var(--floyd-accent-cyan)';
                (e.target as HTMLInputElement).style.boxShadow = '0 0 8px rgba(0,229,255,0.3)';
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor = 'var(--floyd-glow-purple)';
                (e.target as HTMLInputElement).style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Category Filter */}
          <div className="glass-panel flex items-center gap-2 flex-wrap p-3">
            <Filter size={16} style={{ color: 'var(--floyd-text-body)' }} />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3 py-2 rounded-md text-xs font-mono transition-all capitalize font-bold"
                style={{
                  color: activeCategory === cat ? '#0a0510' : getCategoryColor(cat),
                  backgroundColor:
                    activeCategory === cat ? getCategoryColor(cat) : `${getCategoryColor(cat)}25`,
                  border: `2px solid ${getCategoryColor(cat)}80`,
                  boxShadow: activeCategory === cat ? `0 0 8px ${getCategoryColor(cat)}` : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="glass-panel inline-block px-4 py-2 mb-6">
          <p className="text-sm font-mono" style={{ color: 'var(--floyd-text-body)' }}>
            Showing <span className="font-bold" style={{ color: 'var(--floyd-accent-cyan)' }}>{filtered?.length ?? 0}</span> of{' '}
            <span className="font-bold" style={{ color: 'var(--floyd-accent-cyan)' }}>{skills?.length ?? 0}</span> skills
            {search && (
              <> matching &ldquo;<span style={{ color: 'var(--floyd-text-subheading)' }}>{search}</span>&rdquo;</>
            )}
          </p>
        </div>

        {/* Skills Grid */}
        {(filtered?.length ?? 0) === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl" style={{ color: 'var(--floyd-text-muted)' }}>
              No skills found. Even Floyd needs more coffee.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((skill, i) => {
              if (!skill) return null;
              const color = getCategoryColor(skill.category ?? '');
              return (
                <motion.div
                  key={skill.slug ?? i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.4) }}
                  className="floyd-card p-6 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${color}20`, border: `1px solid ${color}50` }}
                    >
                      <Zap size={18} style={{ color }} />
                    </div>
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded capitalize"
                      style={{ color, backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
                    >
                      {skill.category ?? 'general'}
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    className="text-base font-bold mb-2"
                    style={{ color: 'var(--floyd-text-heading)' }}
                  >
                    {skill.name ?? ''}
                  </h3>

                  {/* Slug */}
                  <p
                    className="text-xs font-mono mb-3"
                    style={{ color: 'var(--floyd-text-muted)' }}
                  >
                    floyd-skills://{skill.slug ?? ''}
                  </p>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed flex-1 mb-4"
                    style={{ color: 'var(--floyd-text-muted)' }}
                  >
                    {(skill.description ?? '').slice(0, 150)}
                    {(skill.description ?? '').length > 150 ? '...' : ''}
                  </p>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between pt-3 border-t text-xs font-mono"
                    style={{ borderColor: 'rgba(156, 39, 176, 0.3)' }}
                  >
                    <div className="flex items-center gap-1" title="Quality Score">
                      <Star size={12} style={{ color: 'var(--floyd-accent-orange)' }} fill="var(--floyd-accent-orange)" />
                      <span style={{ color: 'var(--floyd-text-subheading)' }}>
                        {skill.quality ?? 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} style={{ color: 'var(--floyd-text-muted)' }} />
                      <span style={{ color: 'var(--floyd-text-muted)' }}>
                        v{skill.version ?? '2.0.0'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Bottom note */}
        <div className="glass-panel text-center mt-16 p-6">
          <p className="font-mono text-sm" style={{ color: 'var(--floyd-text-body)' }}>
            More tools being built at 3 AM as you read this. Bella is supervising. Bowser is on the router.
          </p>
          <p className="font-mono text-xs mt-2 font-bold" style={{ color: 'var(--floyd-accent-cyan)' }}>
            All skills free. Forever. Because spite.
          </p>
        </div>
      </div>
    </section>
  );
}
