import { prisma } from '@/lib/db';

export interface ApiKeyValidation {
  valid: boolean;
  apiKey?: {
    id: string;
    name: string;
    tier: string;
    rate_limit: number;
    calls_today: number;
  };
  error?: string;
}

export async function validateApiKey(key: string | null): Promise<ApiKeyValidation> {
  if (!key) {
    return { valid: false, error: 'API key required' };
  }

  // Handle Bearer token format
  const cleanKey = key.startsWith('Bearer ') ? key.slice(7) : key;

  try {
    const apiKey = await prisma.api_key.findUnique({
      where: { key: cleanKey },
    });

    if (!apiKey) {
      return { valid: false, error: 'Invalid API key' };
    }

    if (!apiKey.active) {
      return { valid: false, error: 'API key is inactive' };
    }

    if (apiKey.expires_at && new Date(apiKey.expires_at) < new Date()) {
      return { valid: false, error: 'API key has expired' };
    }

    // Check if we need to reset daily counter
    const now = new Date();
    const lastReset = new Date(apiKey.last_reset);
    const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
    
    let callsToday = apiKey.calls_today;
    if (daysSinceReset >= 1) {
      // Reset the counter
      await prisma.api_key.update({
        where: { id: apiKey.id },
        data: { calls_today: 0, last_reset: now },
      });
      callsToday = 0;
    }

    // Check rate limit
    if (callsToday >= apiKey.rate_limit) {
      return { valid: false, error: `Rate limit exceeded (${apiKey.rate_limit} calls/day)` };
    }

    return {
      valid: true,
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        tier: apiKey.tier,
        rate_limit: apiKey.rate_limit,
        calls_today: callsToday,
      },
    };
  } catch (error) {
    console.error('API key validation error:', error);
    return { valid: false, error: 'Internal error validating API key' };
  }
}

export async function incrementApiKeyUsage(keyId: string): Promise<void> {
  try {
    await prisma.api_key.update({
      where: { id: keyId },
      data: {
        calls_today: { increment: 1 },
        calls_total: { increment: 1 },
        last_used: new Date(),
      },
    });
  } catch (error) {
    console.error('Error incrementing API key usage:', error);
  }
}

export function generateApiKey(): string {
  const prefix = 'floyd_';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return prefix + key;
}
