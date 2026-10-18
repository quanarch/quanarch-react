import { create } from 'zustand';
import type { Toast } from '../../types';

interface UiState {
  toasts: Toast[];
  push: (toast: Toast) => void;
  dismiss: (id: number) => void;
}

export const useUiStore = create<UiState>((set) => ({
  toasts: [],
  push: (toast) => set((s) => ({ toasts: [...s.toasts, toast] })),
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
