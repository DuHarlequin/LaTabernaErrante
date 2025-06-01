"use client";

import type { User, UserRole } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (mockRole?: UserRole) => void;
  logout: () => void;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockAdminUser: User = { id: 'admin1', email: 'admin@wanderersarchive.com', name: 'Archivist Prime', role: 'admin', avatarUrl: 'https://placehold.co/100x100.png' };
const mockPlayerUser: User = { id: 'player1', email: 'player@wanderersarchive.com', name: 'Brave Wanderer', role: 'player', avatarUrl: 'https://placehold.co/100x100.png' };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking for an existing session
    const storedUserRole = localStorage.getItem('mockUserRole');
    if (storedUserRole) {
      if (storedUserRole === 'admin') setUser(mockAdminUser);
      else if (storedUserRole === 'player') setUser(mockPlayerUser);
    }
    setLoading(false);
  }, []);

  const login = (mockRole: UserRole = 'player') => {
    setLoading(true);
    setTimeout(() => { // Simulate API call
      if (mockRole === 'admin') {
        setUser(mockAdminUser);
        localStorage.setItem('mockUserRole', 'admin');
      } else {
        setUser(mockPlayerUser);
        localStorage.setItem('mockUserRole', 'player');
      }
      setLoading(false);
      router.push('/');
    }, 500);
  };

  const logout = () => {
    setLoading(true);
    setTimeout(() => { // Simulate API call
      setUser(null);
      localStorage.removeItem('mockUserRole');
      setLoading(false);
      router.push('/auth/login');
    }, 300);
  };
  
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
