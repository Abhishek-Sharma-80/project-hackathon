'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/services/api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'ADMIN';
  profileId?: string | null;
  profileScore?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  demoLogin: (role: 'STUDENT' | 'ADMIN') => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('smartedu_token') : null;
      if (!token) {
        setLoading(false);
        return;
      }
      const res = await authApi.getMe();
      if (res.user) {
        setUser(res.user);
      } else {
        localStorage.removeItem('smartedu_token');
        setUser(null);
      }
    } catch {
      localStorage.removeItem('smartedu_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (data: any) => {
    const res = await authApi.login(data);
    localStorage.setItem('smartedu_token', res.token);
    setUser(res.user);
  };

  const register = async (data: any) => {
    const res = await authApi.register(data);
    localStorage.setItem('smartedu_token', res.token);
    setUser(res.user);
  };

  const demoLogin = async (role: 'STUDENT' | 'ADMIN') => {
    const res = await authApi.demoLogin(role);
    localStorage.setItem('smartedu_token', res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('smartedu_token');
    setUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, demoLogin, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
