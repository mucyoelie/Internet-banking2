import { useState, useCallback } from 'react';
import type { User } from '@/types';
import { mockUser, mockAdmin } from '@/data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: mockUser, // Pre-populated for demo
    isAuthenticated: true, // Pre-authenticated for demo
    isLoading: false,
  });

  const login = useCallback(async (_email: string, _password: string, isAdmin: boolean = false) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setAuthState({
      user: isAdmin ? mockAdmin : mockUser,
      isAuthenticated: true,
      isLoading: false,
    });
    
    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setAuthState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }));
  }, []);

  return {
    ...authState,
    login,
    logout,
    updateUser,
    isAdmin: authState.user?.role === 'admin',
  };
};
