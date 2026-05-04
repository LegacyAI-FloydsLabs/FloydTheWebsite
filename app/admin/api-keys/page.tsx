'use client';

import { useState, useEffect } from 'react';
import { Key, Plus, Trash2, Copy, Check, Eye, EyeOff, Activity, Clock, Zap } from 'lucide-react';

interface ApiKey {
  id: string;
  key: string;
  key_masked: string;
  name: string;
  tier: string;
  rate_limit: number;
  calls_today: number;
  calls_total: number;
  last_used: string | null;
  active: boolean;
  created_at: string;
  expires_at: string | null;
  user: { email: string; name: string | null } | null;
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyData, setNewKeyData] = useState({ name: '', tier: 'free', rate_limit: 100, expires_days: '' });
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const res = await fetch('/api/admin/api-keys');
      const data = await res.json();
      setApiKeys(data.apiKeys || []);
    } catch (error) {
      console.error('Error fetching API keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async () => {
    try {
      const res = await fetch('/api/admin/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newKeyData),
      });
      const data = await res.json();
      if (data.apiKey) {
        setCreatedKey(data.apiKey.key);
        fetchApiKeys();
      }
    } catch (error) {
      console.error('Error creating API key:', error);
    }
  };

  const toggleKeyStatus = async (id: string, active: boolean) => {
    try {
      await fetch(`/api/admin/api-keys/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      });
      fetchApiKeys();
    } catch (error) {
      console.error('Error toggling key status:', error);
    }
  };

  const deleteApiKey = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key? This cannot be undone.')) return;
    try {
      await fetch(`/api/admin/api-keys/${id}`, { method: 'DELETE' });
      fetchApiKeys();
    } catch (error) {
      console.error('Error deleting API key:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleReveal = (id: string) => {
    setRevealedKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const tierColors: Record<string, string> = {
    free: 'var(--floyd-accent-cyan)',
    pro: 'var(--floyd-accent-pink)',
    enterprise: 'var(--floyd-accent-green)',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--floyd-text-heading)' }}>
            <Key className="inline-block mr-2 w-6 h-6" style={{ color: 'var(--floyd-accent-cyan)' }} />
            API Keys
          </h1>
          <p style={{ color: 'var(--floyd-text-body)' }}>Manage MCP server access keys</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all"
          style={{
            background: 'var(--floyd-accent-cyan)',
            color: '#0a0510',
          }}
        >
          <Plus className="w-4 h-4" />
          Create API Key
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Keys', value: apiKeys.length, icon: Key },
          { label: 'Active Keys', value: apiKeys.filter(k => k.active).length, icon: Zap },
          { label: 'Total Calls', value: apiKeys.reduce((sum, k) => sum + k.calls_total, 0), icon: Activity },
          { label: 'Calls Today', value: apiKeys.reduce((sum, k) => sum + k.calls_today, 0), icon: Clock },
        ].map((stat, i) => (
          <div key={i} className="floyd-card p-4">
            <div className="flex items-center gap-3">
              <stat.icon className="w-5 h-5" style={{ color: 'var(--floyd-accent-cyan)' }} />
              <div>
                <div className="text-2xl font-bold" style={{ color: 'var(--floyd-text-heading)' }}>
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-sm" style={{ color: 'var(--floyd-text-muted)' }}>{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* API Keys List */}
      <div className="floyd-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center" style={{ color: 'var(--floyd-text-muted)' }}>Loading...</div>
        ) : apiKeys.length === 0 ? (
          <div className="p-8 text-center" style={{ color: 'var(--floyd-text-muted)' }}>
            No API keys yet. Create one to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: 'var(--floyd-bg-secondary)', borderBottom: '1px solid var(--floyd-border)' }}>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--floyd-text-muted)' }}>Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--floyd-text-muted)' }}>Key</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--floyd-text-muted)' }}>Tier</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--floyd-text-muted)' }}>Usage</th>
                  <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--floyd-text-muted)' }}>Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium" style={{ color: 'var(--floyd-text-muted)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map(key => (
                  <tr key={key.id} style={{ borderBottom: '1px solid var(--floyd-border)' }}>
                    <td className="px-4 py-3">
                      <div className="font-medium" style={{ color: 'var(--floyd-text-heading)' }}>{key.name}</div>
                      <div className="text-xs" style={{ color: 'var(--floyd-text-muted)' }}>
                        Created {new Date(key.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <code className="text-sm px-2 py-1 rounded" style={{ background: 'var(--floyd-bg-tertiary)', color: 'var(--floyd-accent-cyan)' }}>
                          {revealedKeys.has(key.id) ? key.key : key.key_masked}
                        </code>
                        <button
                          onClick={() => toggleReveal(key.id)}
                          className="p-1 rounded hover:bg-white/10"
                          title={revealedKeys.has(key.id) ? 'Hide' : 'Reveal'}
                        >
                          {revealedKeys.has(key.id) ? (
                            <EyeOff className="w-4 h-4" style={{ color: 'var(--floyd-text-muted)' }} />
                          ) : (
                            <Eye className="w-4 h-4" style={{ color: 'var(--floyd-text-muted)' }} />
                          )}
                        </button>
                        {revealedKeys.has(key.id) && (
                          <button
                            onClick={() => copyToClipboard(key.key)}
                            className="p-1 rounded hover:bg-white/10"
                            title="Copy"
                          >
                            <Copy className="w-4 h-4" style={{ color: 'var(--floyd-text-muted)' }} />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium uppercase"
                        style={{ background: `${tierColors[key.tier]}20`, color: tierColors[key.tier] }}
                      >
                        {key.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm" style={{ color: 'var(--floyd-text-body)' }}>
                        {key.calls_today} / {key.rate_limit} today
                      </div>
                      <div className="text-xs" style={{ color: 'var(--floyd-text-muted)' }}>
                        {key.calls_total.toLocaleString()} total
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleKeyStatus(key.id, key.active)}
                        className={`px-2 py-1 rounded text-xs font-medium transition-all ${key.active ? '' : 'opacity-50'}`}
                        style={{
                          background: key.active ? 'var(--floyd-accent-green)20' : 'var(--floyd-text-muted)20',
                          color: key.active ? 'var(--floyd-accent-green)' : 'var(--floyd-text-muted)',
                        }}
                      >
                        {key.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => deleteApiKey(key.id)}
                        className="p-2 rounded hover:bg-red-500/20 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" style={{ color: 'var(--floyd-accent-pink)' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="floyd-card p-6 w-full max-w-md m-4">
            {createdKey ? (
              <>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--floyd-text-heading)' }}>
                  <Check className="inline-block mr-2 w-5 h-5" style={{ color: 'var(--floyd-accent-green)' }} />
                  API Key Created
                </h2>
                <p className="mb-4" style={{ color: 'var(--floyd-text-muted)' }}>
                  Save this key now. You won&apos;t be able to see it again!
                </p>
                <div className="flex items-center gap-2 p-3 rounded-lg mb-4" style={{ background: 'var(--floyd-bg-tertiary)' }}>
                  <code className="flex-1 text-sm break-all" style={{ color: 'var(--floyd-accent-cyan)' }}>
                    {createdKey}
                  </code>
                  <button
                    onClick={() => copyToClipboard(createdKey)}
                    className="p-2 rounded hover:bg-white/10"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" style={{ color: 'var(--floyd-accent-green)' }} />
                    ) : (
                      <Copy className="w-4 h-4" style={{ color: 'var(--floyd-text-muted)' }} />
                    )}
                  </button>
                </div>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setCreatedKey(null);
                    setNewKeyData({ name: '', tier: 'free', rate_limit: 100, expires_days: '' });
                  }}
                  className="w-full py-2 rounded-lg font-medium"
                  style={{ background: 'var(--floyd-accent-cyan)', color: '#0a0510' }}
                >
                  Done
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--floyd-text-heading)' }}>
                  Create API Key
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1" style={{ color: 'var(--floyd-text-muted)' }}>Name</label>
                    <input
                      type="text"
                      value={newKeyData.name}
                      onChange={e => setNewKeyData({ ...newKeyData, name: e.target.value })}
                      placeholder="My App Key"
                      className="w-full px-3 py-2 rounded-lg"
                      style={{ background: 'var(--floyd-bg-tertiary)', border: '1px solid var(--floyd-border)', color: 'var(--floyd-text-body)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: 'var(--floyd-text-muted)' }}>Tier</label>
                    <select
                      value={newKeyData.tier}
                      onChange={e => setNewKeyData({ ...newKeyData, tier: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg"
                      style={{ background: 'var(--floyd-bg-tertiary)', border: '1px solid var(--floyd-border)', color: 'var(--floyd-text-body)' }}
                    >
                      <option value="free">Free (100 calls/day)</option>
                      <option value="pro">Pro (1000 calls/day)</option>
                      <option value="enterprise">Enterprise (Unlimited)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: 'var(--floyd-text-muted)' }}>Rate Limit (calls/day)</label>
                    <input
                      type="number"
                      value={newKeyData.rate_limit}
                      onChange={e => setNewKeyData({ ...newKeyData, rate_limit: parseInt(e.target.value) || 100 })}
                      className="w-full px-3 py-2 rounded-lg"
                      style={{ background: 'var(--floyd-bg-tertiary)', border: '1px solid var(--floyd-border)', color: 'var(--floyd-text-body)' }}
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowCreateModal(false);
                        setNewKeyData({ name: '', tier: 'free', rate_limit: 100, expires_days: '' });
                      }}
                      className="flex-1 py-2 rounded-lg font-medium"
                      style={{ background: 'var(--floyd-bg-tertiary)', color: 'var(--floyd-text-body)' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={createApiKey}
                      disabled={!newKeyData.name.trim()}
                      className="flex-1 py-2 rounded-lg font-medium disabled:opacity-50"
                      style={{ background: 'var(--floyd-accent-cyan)', color: '#0a0510' }}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
