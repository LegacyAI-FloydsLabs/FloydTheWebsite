'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e?.target ?? {};
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value ?? '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res?.json?.().catch(() => ({}));

      if (res?.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data?.error ?? 'Something went wrong. Try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Are you offline? (Impressive timing.)');
    }
  };

  const inputBase = {
    backgroundColor: 'var(--floyd-bg-card)',
    border: '1px solid var(--floyd-glow-purple)',
    color: 'var(--floyd-text-body)',
    borderRadius: '8px',
    padding: '12px 16px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontSize: '14px',
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.target as HTMLElement).style.borderColor = 'var(--floyd-accent-cyan)';
    (e.target as HTMLElement).style.boxShadow = '0 0 8px rgba(0,229,255,0.25)';
  };

  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.target as HTMLElement).style.borderColor = 'var(--floyd-glow-purple)';
    (e.target as HTMLElement).style.boxShadow = 'none';
  };

  if (status === 'success') {
    return (
      <div
        className="floyd-card p-10 text-center"
        style={{ borderColor: 'var(--floyd-accent-green)' }}
      >
        <CheckCircle
          size={56}
          className="mx-auto mb-4"
          style={{ color: 'var(--floyd-accent-green)' }}
        />
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--floyd-accent-green)' }}>
          Message Received!
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--floyd-text-muted)' }}>
          We\'ve saved your message. It will be read by Douglas (or Bella, whoever gets to the
          keyboard first). Response time: eventually.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-neon-cyan px-5 py-2 rounded-lg text-sm font-medium"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="floyd-card p-7">
      <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--floyd-text-heading)' }}>
        Send a Message
      </h2>

      {status === 'error' && (
        <div
          className="flex items-center gap-3 p-4 rounded-lg mb-5 text-sm"
          style={{
            backgroundColor: 'rgba(245,0,87,0.1)',
            border: '1px solid rgba(245,0,87,0.3)',
            color: 'var(--floyd-accent-pink)',
          }}
        >
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-mono mb-2"
              style={{ color: 'var(--floyd-text-muted)' }}
            >
              Your Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              placeholder="Nick Beard"
              style={inputBase}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-mono mb-2"
              style={{ color: 'var(--floyd-text-muted)' }}
            >
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              onFocus={focusStyle}
              onBlur={blurStyle}
              placeholder="you@somewhere.dev"
              style={inputBase}
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-xs font-mono mb-2"
            style={{ color: 'var(--floyd-text-muted)' }}
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            onFocus={focusStyle}
            onBlur={blurStyle}
            placeholder="Re: Building things despite all reasonable advice"
            style={inputBase}
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-mono mb-2"
            style={{ color: 'var(--floyd-text-muted)' }}
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            onFocus={focusStyle}
            onBlur={blurStyle}
            placeholder="Your manifesto, question, insult, or business proposal (we'll ignore the last one)..."
            style={{ ...inputBase, resize: 'vertical' }}
          />
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between">
          <p className="text-xs" style={{ color: 'var(--floyd-text-muted)' }}>
            * Required fields. No spam. No newsletters. Just vibes.
          </p>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-neon-solid-cyan px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 disabled:opacity-50"
          >
            {status === 'loading' ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
