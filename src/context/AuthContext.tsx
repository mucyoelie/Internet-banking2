import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '@/types';
import { mockUser, mockAdmin } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUser); // Pre-populated for demo
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Pre-authenticated for demo
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (_email: string, password: string, isAdmin: boolean = false) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation for demo
    if (password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Invalid credentials' };
    }
    
    setUser(isAdmin ? mockAdmin : mockUser);
    setIsAuthenticated(true);
    setIsLoading(false);
    
    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
