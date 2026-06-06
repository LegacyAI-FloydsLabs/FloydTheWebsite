'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';

export function DeleteAppButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/apps/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete application');
      }
    } catch (error) {
      alert('Error deleting application');
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
