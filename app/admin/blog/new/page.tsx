'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import { marked } from 'marked';

export default function NewBlogPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    author: 'Douglas Talley',
    author_role: 'Founder, Floyd Labs',
    tags: '',
    excerpt: '',
    content: '',
    published: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });

      if (res.ok) {
        router.push('/admin/blog');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create post');
      }
    } catch (error) {
      alert('Error creating post');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'rgba(20, 10, 30, 0.9)',
    border: '1px solid var(--floyd-glow-purple)',
    color: 'var(--floyd-text-body)',
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 rounded-lg transition-all"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <ArrowLeft size={20} style={{ color: 'var(--floyd-text-muted)' }} />
          </Link>
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ color: 'var(--floyd-text-heading)' }}
            >
              New Blog Post
            </h1>
            <p style={{ color: 'var(--floyd-text-muted)' }}>
              Another manifesto enters the archives
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg"
          style={{
            background: 'rgba(255,255,255,0.05)',
            color: 'var(--floyd-text-body)',
          }}
        >
          <Eye size={18} />
          {showPreview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {showPreview ? (
        <div
          className="p-8 rounded-xl"
          style={{
            background: 'var(--floyd-bg-card)',
            border: '1px solid var(--floyd-glow-purple)',
          }}
        >
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--floyd-text-heading)' }}
          >
            {formData.title || 'Untitled Post'}
          </h1>
          {formData.subtitle && (
            <p className="text-xl mb-4" style={{ color: 'var(--floyd-text-body)' }}>
              {formData.subtitle}
            </p>
          )}
          <div
            className="blog-content prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: marked.parse(formData.content || '*No content yet*') }}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className="p-6 rounded-xl space-y-6"
            style={{
              background: 'var(--floyd-bg-card)',
              border: '1px solid var(--floyd-glow-purple)',
            }}
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg outline-none"
                  style={inputStyle}
                  placeholder="The Epic Manifesto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg outline-none"
                  style={inputStyle}
                  placeholder="the-epic-manifesto"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg outline-none"
                style={inputStyle}
                placeholder="Or: Why Coffee Tastes Like Motor Oil at 3 AM"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg outline-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Author Role</label>
                <input
                  type="text"
                  name="author_role"
                  value={formData.author_role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg outline-none"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg outline-none"
                style={inputStyle}
                placeholder="manifesto, spite, coffee, ai"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 rounded-lg outline-none resize-none"
                style={inputStyle}
                placeholder="A brief summary for the blog listing..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Content (Markdown) *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={20}
                className="w-full px-4 py-3 rounded-lg outline-none resize-none font-mono text-sm"
                style={inputStyle}
                placeholder="# Your Manifesto Starts Here\n\nWrite in markdown..."
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5 rounded"
              />
              <label htmlFor="published" style={{ color: 'var(--floyd-text-body)' }}>
                Publish immediately
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
              style={{
                background: 'var(--floyd-accent-cyan)',
                color: '#000',
              }}
            >
              <Save size={20} />
              {loading ? 'Saving...' : 'Save Post'}
            </button>
            <Link
              href="/admin/blog"
              className="px-6 py-3 rounded-lg"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--floyd-text-muted)',
              }}
            >
              Cancel
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
