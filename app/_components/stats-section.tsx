'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsSection() {
  const stats = [
    { label: 'Tools Built', value: 73, suffix: '+', color: 'var(--floyd-accent-cyan)', icon: '🔧' },
    { label: 'MCP Servers', value: 13, suffix: '', color: 'var(--floyd-accent-pink)', icon: '🖥️' },
    { label: 'Lines of Code', value: 42301, suffix: '+', color: 'var(--floyd-accent-green)', icon: '💻' },
    { label: 'Subscriptions', value: 0, suffix: '', color: 'var(--floyd-accent-orange)', icon: '🚫', prefix: '$' },
  ];

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: 'var(--floyd-bg-card)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-xl border"
              style={{
                borderColor: `${stat.color}40`,
                backgroundColor: `${stat.color}08`,
              }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div
                className="text-3xl md:text-4xl font-black mb-1 font-mono"
                style={{ color: stat.color }}
              >
                {stat.prefix ?? ''}<Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm" style={{ color: 'var(--floyd-text-muted)' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
        <p
          className="text-center text-xs mt-6 font-mono"
          style={{ color: 'var(--floyd-text-muted)' }}
        >
          99.8% uptime. Powered by spite and caffeine. Bella and Bowser not included.
        </p>
      </div>
    </section>
  );
}
