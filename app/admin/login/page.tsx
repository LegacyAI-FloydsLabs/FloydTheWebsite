'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Zap, Lock, Mail, AlertCircle } from 'lucide-react';
import Link from 'next/link';

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function AdminLoginPage() {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.replace('/admin');
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password. Did the cat change the credentials?');
      } else {
        router.replace('/admin');
      }
    } catch (err) {
      setError('Something went wrong. Probably the motor oil coffee.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    signIn('google', { redirect: true, callbackUrl: '/admin' });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="animate-pulse text-xl"
          style={{ color: 'var(--floyd-accent-cyan)' }}
        >
          Loading...
        </div>
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="floyd-card w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap
              size={40}
              style={{
                color: 'var(--floyd-accent-cyan)',
                filter: 'drop-shadow(0 0 12px var(--floyd-accent-cyan))',
              }}
            />
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--floyd-text-heading)' }}
          >
            Floyd Labs Admin
          </h1>
          <p style={{ color: 'var(--floyd-text-body)' }}>
            Enter the garage. Bring coffee.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="flex items-center gap-2 p-4 rounded-lg mb-6"
            style={{
              background: 'rgba(245, 0, 87, 0.1)',
              border: '1px solid var(--floyd-accent-pink)',
              color: 'var(--floyd-accent-pink)',
            }}
          >
            <AlertCircle size={20} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-3 mb-6 disabled:opacity-50"
          style={{
            background: '#fff',
            color: '#1f1f1f',
            border: '1px solid #dadce0',
          }}
        >
          <GoogleIcon />
          {googleLoading ? 'Connecting...' : 'Sign in with Google'}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px" style={{ background: 'var(--floyd-glow-purple)' }} />
          <span className="text-sm" style={{ color: 'var(--floyd-text-muted)' }}>
            or use email
          </span>
          <div className="flex-1 h-px" style={{ background: 'var(--floyd-glow-purple)' }} />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--floyd-text-body)' }}
            >
              Email
            </label>
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--floyd-text-muted)' }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@floydslabs.com"
                required
                className="w-full pl-12 pr-4 py-3 rounded-lg outline-none transition-all"
                style={{
                  background: 'rgba(20, 10, 30, 0.9)',
                  border: '1px solid var(--floyd-glow-purple)',
                  color: 'var(--floyd-text-body)',
                }}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--floyd-text-body)' }}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--floyd-text-muted)' }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                required
                className="w-full pl-12 pr-4 py-3 rounded-lg outline-none transition-all"
                style={{
                  background: 'rgba(20, 10, 30, 0.9)',
                  border: '1px solid var(--floyd-glow-purple)',
                  color: 'var(--floyd-text-body)',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold transition-all disabled:opacity-50"
            style={{
              background: 'var(--floyd-accent-cyan)',
              color: '#0a0510',
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)',
            }}
          >
            {loading ? 'Authenticating...' : 'Enter the Garage'}
          </button>
        </form>

        {/* Back to Site */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm transition-colors"
            style={{ color: 'var(--floyd-text-muted)' }}
          >
            ← Back to the main site
          </Link>
        </div>
      </div>
    </div>
  );
}
