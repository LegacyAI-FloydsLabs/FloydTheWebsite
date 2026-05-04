'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import { marked } from 'marked';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  date: Date;
  author: string;
  author_role: string | null;
  tags: string[];
  excerpt: string | null;
  content: string;
  published: boolean;
}

export function BlogEditForm({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: post.title,
    subtitle: post.subtitle || '',
    slug: post.slug,
    author: post.author,
    author_role: post.author_role || '',
    tags: post.tags.join(', '),
    excerpt: post.excerpt || '',
    content: post.content,
    published: post.published,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: 'PUT',
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
        alert(data.error || 'Failed to update post');
      }
    } catch (error) {
      alert('Error updating post');
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
              Edit Post
            </h1>
            <p style={{ color: 'var(--floyd-text-muted)' }}>
              Updating: {post.title}
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
                Published
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
              {loading ? 'Saving...' : 'Save Changes'}
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
