import React, { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';
import { quanService } from '../../services';
import type { QuanEntry } from '../../types';
import { useAuth } from '../use-auth-hook';

interface QuansContextValue {
  entries: QuanEntry[];
  loading: boolean;
  get: (name: string) => QuanEntry | undefined;
}

const QuansContext = createContext<QuansContextValue | null>(null);

/** Starts loading quans when someone signs in and unloads them when they sign out. */
export const QuansProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const state = useSyncExternalStore(quanService.subscribe, quanService.getState);

  useEffect(() => {
    if (user) void quanService.start(user);
    else quanService.stop();
  }, [user]);

  const value = useMemo<QuansContextValue>(() => {
    const entries = Object.values(state.entries).sort((a, b) => a.source.displayName.localeCompare(b.source.displayName));
    return {
      entries,
      loading: entries.some((e) => e.status === 'loading'),
      get: (name) => state.entries[name],
    };
  }, [state.entries]);

  return <QuansContext.Provider value={value}>{children}</QuansContext.Provider>;
};

export function useQuans(): QuansContextValue {
  const context = useContext(QuansContext);
  if (!context) throw new Error('useQuans must be used inside QuansProvider');
  return context;
}
