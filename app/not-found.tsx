import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <div className="glass-panel p-12">
        <div
          className="text-8xl font-black font-mono mb-4"
          style={{ color: 'var(--floyd-accent-cyan)' }}
        >
          404
        </div>
        <h1
          className="text-2xl font-bold mb-3"
          style={{ color: 'var(--floyd-text-heading)' }}
        >
          Page Not Found
        </h1>
        <p
          className="text-sm mb-8 max-w-sm mx-auto"
          style={{ color: 'var(--floyd-text-muted)' }}
        >
          Either this page doesn&apos;t exist, Bella walked across the keyboard, or you&apos;re looking
          for something we haven&apos;t built yet (give us until 3 AM).
        </p>
        <Link
          href="/"
          className="btn-neon-solid-cyan px-6 py-3 rounded-lg font-semibold text-sm inline-flex items-center gap-2"
        >
          <Zap size={16} />
          Back to the Garage
        </Link>
      </div>
    </div>
  );
}
