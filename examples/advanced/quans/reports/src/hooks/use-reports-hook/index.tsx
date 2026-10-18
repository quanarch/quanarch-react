import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { reportsService } from '../../services';
import type { Report, Viewer } from '../../types';

interface ReportsContextValue {
  viewer: Viewer;
  items: Report[];
  loading: boolean;
  error: string | null;
  summary: string;
  count: number;
  formatCell: typeof reportsService.formatCell;
  askToCount: () => void;
  act: () => Promise<void>;
  openLinked: () => void;
}

const ReportsContext = createContext<ReportsContextValue | null>(null);

export const ReportsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await reportsService.load());
      setError(null);
    } catch (e) {
      setError(reportsService.errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const askToCount = useCallback(() => setCount((current) => reportsService.count(current)), []);
  const act = useCallback(async () => {
    await reportsService.act();
    await reload();
  }, [reload]);

  const value = useMemo<ReportsContextValue>(
    () => ({
      viewer: reportsService.viewer(),
      items,
      loading,
      error,
      summary: reportsService.summary(items),
      count,
      formatCell: reportsService.formatCell,
      askToCount,
      act,
      openLinked: reportsService.openLinked,
    }),
    [items, loading, error, count, askToCount, act]
  );

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>;
};

export function useReports(): ReportsContextValue {
  const context = useContext(ReportsContext);
  if (!context) throw new Error('useReports must be used inside ReportsProvider');
  return context;
}
