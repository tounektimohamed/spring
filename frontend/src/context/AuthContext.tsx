import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { AuthState, AuthResponse } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (data: AuthResponse) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const user: AuthResponse = {
          accessToken: token,
          refreshToken: localStorage.getItem('refreshToken') || '',
          tokenType: 'Bearer',
          expiresIn: payload.exp - Date.now() / 1000,
          userId: payload.userId || 0,
          email: payload.sub,
          displayName: payload.displayName || '',
          role: payload.role || 'USER',
        };
        setState({ user, isAuthenticated: true, isLoading: false });
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = useCallback((data: AuthResponse) => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setState({ user: data, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
