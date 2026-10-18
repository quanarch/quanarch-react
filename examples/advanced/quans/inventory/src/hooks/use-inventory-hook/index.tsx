import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { inventoryService } from '../../services';
import type { StockItem, Viewer } from '../../types';

interface InventoryContextValue {
  viewer: Viewer;
  items: StockItem[];
  loading: boolean;
  error: string | null;
  summary: string;
  count: number;
  formatCell: typeof inventoryService.formatCell;
  askToCount: () => void;
  act: () => Promise<void>;
  openLinked: () => void;
}

const InventoryContext = createContext<InventoryContextValue | null>(null);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await inventoryService.load());
      setError(null);
    } catch (e) {
      setError(inventoryService.errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const askToCount = useCallback(() => setCount((current) => inventoryService.count(current)), []);
  const act = useCallback(async () => {
    await inventoryService.act();
    await reload();
  }, [reload]);

  const value = useMemo<InventoryContextValue>(
    () => ({
      viewer: inventoryService.viewer(),
      items,
      loading,
      error,
      summary: inventoryService.summary(items),
      count,
      formatCell: inventoryService.formatCell,
      askToCount,
      act,
      openLinked: inventoryService.openLinked,
    }),
    [items, loading, error, count, askToCount, act]
  );

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};

export function useInventory(): InventoryContextValue {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used inside InventoryProvider');
  return context;
}
