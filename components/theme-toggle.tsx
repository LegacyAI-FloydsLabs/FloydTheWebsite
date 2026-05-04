'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg border border-gray-600 flex items-center justify-center opacity-50" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-10 h-10 rounded-lg border transition-all duration-300 flex items-center justify-center group"
      style={{
        borderColor: isDark ? 'var(--floyd-accent-cyan)' : 'var(--floyd-accent-pink)',
        boxShadow: isDark
          ? '0 0 8px var(--floyd-accent-cyan)'
          : '0 0 8px var(--floyd-accent-pink)',
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun
          size={18}
          style={{ color: 'var(--floyd-accent-cyan)' }}
          className="group-hover:scale-110 transition-transform"
        />
      ) : (
        <Moon
          size={18}
          style={{ color: 'var(--floyd-accent-pink)' }}
          className="group-hover:scale-110 transition-transform"
        />
      )}
    </button>
  );
}
