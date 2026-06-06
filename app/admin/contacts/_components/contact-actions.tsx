'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2, CheckCircle, Mail, Eye } from 'lucide-react';

export function ContactActions({
  id,
  status,
  email,
}: {
  id: string;
  status: string;
  email: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      alert('Error updating status');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this message? This cannot be undone.')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete message');
      }
    } catch (error) {
      alert('Error deleting message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {status === 'new' && (
        <button
          onClick={() => updateStatus('read')}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all disabled:opacity-50"
          style={{
            background: 'rgba(255, 171, 0, 0.1)',
            color: 'var(--floyd-accent-orange)',
          }}
        >
          <Eye size={16} />
          Mark as Read
        </button>
      )}

      {status !== 'responded' && (
        <button
          onClick={() => updateStatus('responded')}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all disabled:opacity-50"
          style={{
            background: 'rgba(118, 255, 3, 0.1)',
            color: 'var(--floyd-accent-green)',
          }}
        >
          <CheckCircle size={16} />
          Mark as Responded
        </button>
      )}

      <a
        href={`mailto:${email}`}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all"
        style={{
          background: 'rgba(0, 229, 255, 0.1)',
          color: 'var(--floyd-accent-cyan)',
        }}
      >
        <Mail size={16} />
        Reply
      </a>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all disabled:opacity-50"
        style={{
          background: 'rgba(245, 0, 87, 0.1)',
          color: 'var(--floyd-accent-pink)',
        }}
      >
        <Trash2 size={16} />
        Delete
      </button>
    </div>
  );
}
