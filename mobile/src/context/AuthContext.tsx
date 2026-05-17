import React, { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthResponse } from '../types';

interface AuthState {
  user: AuthResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (data: AuthResponse) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null, isAuthenticated: false, isLoading: true,
  login: async () => {}, logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, isAuthenticated: false, isLoading: true });

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const user: AuthResponse = {
            accessToken: token,
            refreshToken: (await AsyncStorage.getItem('refreshToken')) || '',
            tokenType: 'Bearer',
            expiresIn: payload.exp - Date.now() / 1000,
            userId: 0, email: payload.sub, displayName: '', role: 'USER',
          };
          setState({ user, isAuthenticated: true, isLoading: false });
        } else {
          setState({ user: null, isAuthenticated: false, isLoading: false });
        }
      } catch {
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    })();
  }, []);

  const login = useCallback(async (data: AuthResponse) => {
    await AsyncStorage.setItem('accessToken', data.accessToken);
    await AsyncStorage.setItem('refreshToken', data.refreshToken);
    setState({ user: data, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
