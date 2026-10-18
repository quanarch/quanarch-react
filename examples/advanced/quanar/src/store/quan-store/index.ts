import { create } from 'zustand';
import type { QuanEntry } from '../../types';

interface QuanState {
  entries: Record<string, QuanEntry>;
  upsert: (entry: QuanEntry) => void;
  patch: (name: string, changes: Partial<QuanEntry>) => void;
  remove: (name: string) => void;
  clear: () => void;
}

export const useQuanStore = create<QuanState>((set) => ({
  entries: {},
  upsert: (entry) => set((s) => ({ entries: { ...s.entries, [entry.source.name]: entry } })),
  patch: (name, changes) =>
    set((s) => (s.entries[name] ? { entries: { ...s.entries, [name]: { ...s.entries[name], ...changes } } } : s)),
  remove: (name) =>
    set((s) => {
      const entries = { ...s.entries };
      delete entries[name];
      return { entries };
    }),
  clear: () => set({ entries: {} }),
}));
