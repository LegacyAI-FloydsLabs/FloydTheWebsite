'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Zap, Terminal, ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: 'var(--floyd-gradient-bg)' }}
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="glass-panel p-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6 border"
              style={{
                borderColor: 'var(--floyd-accent-cyan)',
                color: 'var(--floyd-accent-cyan)',
                backgroundColor: 'rgba(0,229,255,0.1)',
                boxShadow: '0 0 10px rgba(0,229,255,0.2)',
              }}
            >
              <Zap size={12} />
              Garage-Born AI • Brown County, Indiana
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            >
              <span className="neon-heading">FLOYD</span>
              <br />
              <span style={{ color: 'var(--floyd-text-subheading)' }}>LABS</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <p
                className="text-xl md:text-2xl font-light mb-3"
                style={{ color: 'var(--floyd-text-body)' }}
              >
                AI that belongs to <span className="neon-cyan font-bold">you</span>,
                not to shareholders.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--floyd-text-muted)' }}
              >
                Built on spite. Powered by caffeine. Zero subscriptions. One garage.
                Two cats. 73+ tools and counting.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link
                href="/tools"
                className="btn-neon-solid-cyan px-7 py-3.5 rounded-lg font-semibold text-base flex items-center gap-2 justify-center"
              >
                <Terminal size={18} />
                Explore MCP Tools
              </Link>
              <Link
                href="/about"
                className="btn-neon-pink px-7 py-3.5 rounded-lg font-semibold text-base flex items-center gap-2 justify-center"
              >
                Our Story
              </Link>
            </motion.div>

            {/* Micro stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-6 flex-wrap text-sm"
            >
              {[
                { val: '73+', label: 'Tools' },
                { val: '13', label: 'MCP Servers' },
                { val: '$0', label: '/month' },
              ].map((s) => (
                <div key={s.label}>
                  <span className="font-bold text-lg" style={{ color: 'var(--floyd-accent-cyan)' }}>
                    {s.val}
                  </span>
                  <span className="ml-1" style={{ color: 'var(--floyd-text-muted)' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative animate-float">
              {/* Glow background */}
              <div
                className="absolute inset-0 rounded-2xl blur-2xl opacity-60"
                style={{
                  background: 'radial-gradient(ellipse, #9C27B0 0%, #6A1B9A 40%, transparent 70%)',
                  transform: 'scale(1.1)',
                }}
              />
              {/* Image container */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: '2px solid var(--floyd-accent-cyan)',
                  boxShadow:
                    '0 0 30px var(--floyd-accent-cyan), 0 0 60px rgba(0,229,255,0.3), inset 0 0 30px rgba(0,229,255,0.05)',
                }}
              >
                <Image
                  src="/FloydsLabs.png"
                  alt="Floyd Labs — Neon cyberpunk AI lab logo"
                  width={500}
                  height={500}
                  className="relative z-10 w-full max-w-md object-contain"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <ChevronDown size={24} style={{ color: 'var(--floyd-accent-cyan)' }} />
      </motion.div>
    </section>
  );
}
