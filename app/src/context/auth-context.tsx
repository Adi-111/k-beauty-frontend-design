'use client';
import { createContext, useCallback, useContext, useState } from 'react';
import { api, type ApiUser } from '@/lib/api';

type AuthState = {
  user: ApiUser | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
};

type AuthCtx = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx>({
  user: null, token: null, refreshToken: null, loading: false, error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null, token: null, refreshToken: null, loading: false, error: null,
  });

  const setAuth = useCallback((data: { user: ApiUser; accessToken: string; refreshToken: string }) => {
    setState(s => ({ ...s, user: data.user, token: data.accessToken, refreshToken: data.refreshToken, error: null }));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState(s => ({ ...s, loading: true, error: null }));
    try {
      const data = await api.post<{ user: ApiUser; accessToken: string; refreshToken: string }>(
        '/auth/login', { email, password },
      );
      setAuth(data);
    } catch (err: any) {
      setState(s => ({ ...s, error: err?.message ?? 'Login failed', loading: false }));
      throw err;
    }
    setState(s => ({ ...s, loading: false }));
  }, [setAuth]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setState(s => ({ ...s, loading: true, error: null }));
    try {
      const data = await api.post<{ user: ApiUser; accessToken: string; refreshToken: string }>(
        '/auth/register', { name, email, password },
      );
      setAuth(data);
    } catch (err: any) {
      setState(s => ({ ...s, error: err?.message ?? 'Registration failed', loading: false }));
      throw err;
    }
    setState(s => ({ ...s, loading: false }));
  }, [setAuth]);

  const logout = useCallback(() => {
    if (state.token) {
      api.post('/auth/logout', {}, state.token).catch(() => {});
    }
    setState({ user: null, token: null, refreshToken: null, loading: false, error: null });
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
