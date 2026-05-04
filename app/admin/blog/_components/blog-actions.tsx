'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2, Eye, EyeOff } from 'lucide-react';

export function DeleteBlogButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      alert('Error deleting post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 rounded-lg transition-all disabled:opacity-50"
      style={{
        background: 'rgba(245, 0, 87, 0.1)',
        color: 'var(--floyd-accent-pink)',
      }}
      title="Delete"
    >
      <Trash2 size={18} />
    </button>
  );
}

export function TogglePublishButton({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !published }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to update post');
      }
    } catch (error) {
      alert('Error updating post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="p-2 rounded-lg transition-all disabled:opacity-50"
      style={{
        background: published
          ? 'rgba(255, 171, 0, 0.1)'
          : 'rgba(118, 255, 3, 0.1)',
        color: published
          ? 'var(--floyd-accent-orange)'
          : 'var(--floyd-accent-green)',
      }}
      title={published ? 'Unpublish' : 'Publish'}
    >
      {published ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );
}
