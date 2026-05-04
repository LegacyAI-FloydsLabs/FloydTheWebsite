'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

const iconOptions = [
  'Terminal', 'Monitor', 'Code2', 'Server', 'Globe', 'Brain',
  'Cpu', 'Users', 'Zap', 'Database', 'Cloud', 'Shield',
  'Layers', 'Box', 'Package', 'Puzzle', 'Rocket', 'Sparkles',
];

const colorOptions = ['cyan', 'pink', 'green', 'orange', 'purple', 'yellow'];
const statusOptions = ['available', 'beta', 'coming-soon'];

interface Application {
  id: string;
  name: string;
  slug: string;
  status: string;
  icon: string;
  color: string;
  tagline: string | null;
  description: string | null;
  features: string[];
  tag: string | null;
  demo_url: string | null;
  download_url: string | null;
  sort_order: number;
}

export function AppEditForm({ app }: { app: Application }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: app.name,
    slug: app.slug,
    status: app.status,
    icon: app.icon,
    color: app.color,
    tagline: app.tagline || '',
    description: app.description || '',
    features: app.features.join('\n'),
    tag: app.tag || '',
    demo_url: app.demo_url || '',
    download_url: app.download_url || '',
    sort_order: app.sort_order,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/apps/${app.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          features: formData.features.split('\n').filter(Boolean),
          sort_order: parseInt(String(formData.sort_order)) || 0,
          tagline: formData.tagline || null,
          description: formData.description || null,
          tag: formData.tag || null,
          demo_url: formData.demo_url || null,
          download_url: formData.download_url || null,
        }),
      });

      if (res.ok) {
        router.push('/admin/apps');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update application');
      }
    } catch (error) {
      alert('Error updating application');
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
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/apps"
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
            Edit Application
          </h1>
          <p style={{ color: 'var(--floyd-text-muted)' }}>
            Updating: {app.name}
          </p>
        </div>
      </div>

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
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
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

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg outline-none"
                style={inputStyle}
              >
                {statusOptions.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Icon</label>
              <select
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg outline-none"
                style={inputStyle}
              >
                {iconOptions.map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Color</label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg outline-none"
                style={inputStyle}
              >
                {colorOptions.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Tagline</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Tag</label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg outline-none"
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-lg outline-none resize-none"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Features (one per line)</label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg outline-none resize-none font-mono text-sm"
              style={inputStyle}
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Demo URL</label>
              <input
                type="url"
                name="demo_url"
                value={formData.demo_url}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Download URL</label>
              <input
                type="url"
                name="download_url"
                value={formData.download_url}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--floyd-text-body)' }}>Sort Order</label>
              <input
                type="number"
                name="sort_order"
                value={formData.sort_order}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg outline-none"
                style={inputStyle}
              />
            </div>
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
            href="/admin/apps"
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
    </div>
  );
}
