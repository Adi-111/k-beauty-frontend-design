'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api, type ApiUser } from '@/lib/api';

type AuthState = {
  user: ApiUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  user: null, token: null, loading: true, error: null,
  login: async () => {}, register: async () => {}, logout: async () => {},
});

type AuthResponse = { accessToken: string; refreshToken: string; user: ApiUser };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('ocircle_token');
    const storedUser = localStorage.getItem('ocircle_user');
    if (stored && storedUser) {
      try {
        setToken(stored);
        setUser(JSON.parse(storedUser));
      } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const persist = (res: AuthResponse) => {
    setToken(res.accessToken);
    setUser(res.user);
    localStorage.setItem('ocircle_token', res.accessToken);
    localStorage.setItem('ocircle_user', JSON.stringify(res.user));
    if (res.refreshToken) localStorage.setItem('ocircle_refresh', res.refreshToken);
  };

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const res = await api.post<AuthResponse>('/auth/login', { email, password });
      persist(res);
    } catch (e: any) {
      setError(e?.message ?? 'Login failed');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const res = await api.post<AuthResponse>('/auth/register', { name, email, password });
      persist(res);
    } catch (e: any) {
      setError(e?.message ?? 'Registration failed');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    if (token) api.post('/auth/logout', {}, token).catch(() => {});
    setUser(null);
    setToken(null);
    localStorage.removeItem('ocircle_token');
    localStorage.removeItem('ocircle_user');
    localStorage.removeItem('ocircle_refresh');
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
