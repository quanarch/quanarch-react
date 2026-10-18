import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { billingService } from '../../services';
import type { Invoice, Viewer } from '../../types';

interface BillingContextValue {
  viewer: Viewer;
  items: Invoice[];
  loading: boolean;
  error: string | null;
  summary: string;
  count: number;
  formatCell: typeof billingService.formatCell;
  askToCount: () => void;
  act: () => Promise<void>;
  openLinked: () => void;
}

const BillingContext = createContext<BillingContextValue | null>(null);

export const BillingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await billingService.load());
      setError(null);
    } catch (e) {
      setError(billingService.errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const askToCount = useCallback(() => setCount((current) => billingService.count(current)), []);
  const act = useCallback(async () => {
    await billingService.act();
    await reload();
  }, [reload]);

  const value = useMemo<BillingContextValue>(
    () => ({
      viewer: billingService.viewer(),
      items,
      loading,
      error,
      summary: billingService.summary(items),
      count,
      formatCell: billingService.formatCell,
      askToCount,
      act,
      openLinked: billingService.openLinked,
    }),
    [items, loading, error, count, askToCount, act]
  );

  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
};

export function useBilling(): BillingContextValue {
  const context = useContext(BillingContext);
  if (!context) throw new Error('useBilling must be used inside BillingProvider');
  return context;
}
