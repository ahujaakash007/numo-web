// Tiny fetch wrapper to Numo backend. JWT token kept in memory + localStorage.

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://numo-backend-production.up.railway.app/api/v1';
const TOKEN_KEY = 'numo_web_token';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === 'undefined') return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({} as any));
    throw new Error(body?.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

function headers(): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  const t = getToken();
  if (t) h['Authorization'] = `Bearer ${t}`;
  return h;
}

export const api = {
  get<T>(path: string): Promise<T> {
    return fetch(API_BASE + path, { headers: headers() }).then((r) => handle<T>(r));
  },
  post<T>(path: string, body?: unknown): Promise<T> {
    return fetch(API_BASE + path, {
      method: 'POST',
      headers: headers(),
      body: body ? JSON.stringify(body) : undefined,
    }).then((r) => handle<T>(r));
  },
};

export interface ApiResponse<T> {
  data: T;
}
