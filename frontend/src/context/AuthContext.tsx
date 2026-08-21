import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, StudentProfile, UserRole } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  profile: StudentProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isRecruiter: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<void>;
  demoLogin: (role?: UserRole) => Promise<void>;
  logout: () => void;
  updateProfileState: (updatedProfile: StudentProfile) => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('interndisha_token'));
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCurrentUser = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }
      const data = await api.getMe();
      if (data.success) {
        setUser(data.user);
        setProfile(data.profile || null);
      } else {
        logout();
      }
    } catch (e) {
      console.warn('Session verification fallback to stored session');
      const storedUser = localStorage.getItem('interndisha_user');
      const storedProfile = localStorage.getItem('interndisha_profile');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        if (storedProfile) setProfile(JSON.parse(storedProfile));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await api.login({ email, password });
      if (data.success) {
        localStorage.setItem('interndisha_token', data.token);
        localStorage.setItem('interndisha_user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        setProfile(data.profile || null);
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole = 'student') => {
    setLoading(true);
    try {
      const data = await api.register({ name, email, password, role });
      if (data.success) {
        localStorage.setItem('interndisha_token', data.token);
        localStorage.setItem('interndisha_user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        if (role === 'student') {
          await refreshProfile();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async (role: UserRole = 'student') => {
    setLoading(true);
    try {
      const data = await api.demoLogin(role);
      if (data.success) {
        localStorage.setItem('interndisha_token', data.token);
        localStorage.setItem('interndisha_user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        setProfile(data.profile || null);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('interndisha_token');
    localStorage.removeItem('interndisha_user');
    setToken(null);
    setUser(null);
    setProfile(null);
  };

  const updateProfileState = (updatedProfile: StudentProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem('interndisha_profile', JSON.stringify(updatedProfile));
  };

  const refreshProfile = async () => {
    try {
      const data = await api.getProfile();
      if (data.success) {
        setProfile(data.profile);
        localStorage.setItem('interndisha_profile', JSON.stringify(data.profile));
      }
    } catch (err) {
      console.error('Failed to refresh profile:', err);
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    token,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isRecruiter: user?.role === 'recruiter',
    loading,
    login,
    register,
    demoLogin,
    logout,
    updateProfileState,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
