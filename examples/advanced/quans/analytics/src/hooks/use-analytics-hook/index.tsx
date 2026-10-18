import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { analyticsService } from '../../services';
import type { Metric, Viewer } from '../../types';

interface AnalyticsContextValue {
  viewer: Viewer;
  items: Metric[];
  loading: boolean;
  error: string | null;
  summary: string;
  count: number;
  formatCell: typeof analyticsService.formatCell;
  askToCount: () => void;
  act: () => Promise<void>;
  openLinked: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await analyticsService.load());
      setError(null);
    } catch (e) {
      setError(analyticsService.errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const askToCount = useCallback(() => setCount((current) => analyticsService.count(current)), []);
  const act = useCallback(async () => {
    await analyticsService.act();
    await reload();
  }, [reload]);

  const value = useMemo<AnalyticsContextValue>(
    () => ({
      viewer: analyticsService.viewer(),
      items,
      loading,
      error,
      summary: analyticsService.summary(items),
      count,
      formatCell: analyticsService.formatCell,
      askToCount,
      act,
      openLinked: analyticsService.openLinked,
    }),
    [items, loading, error, count, askToCount, act]
  );

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};

export function useAnalytics(): AnalyticsContextValue {
  const context = useContext(AnalyticsContext);
  if (!context) throw new Error('useAnalytics must be used inside AnalyticsProvider');
  return context;
}
