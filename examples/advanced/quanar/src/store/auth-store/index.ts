import { create } from 'zustand';
import type { AuthStatus, User } from '../../types';

interface AuthState {
  user: User | null;
  status: AuthStatus;
  error: string | null;
  setUser: (user: User) => void;
  setStatus: (status: AuthStatus) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: 'restoring',
  error: null,
  setUser: (user) => set({ user, status: 'authenticated', error: null }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  reset: () => set({ user: null, status: 'anonymous', error: null }),
}));
