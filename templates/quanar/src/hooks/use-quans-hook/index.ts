import { useEffect, useState } from 'react';
import { loader, selectQuans } from '../../core';
import type { LoadedQuan } from '../../types';
import { toMessage } from '../../utils';

/** Lists the quans this user receives and loads each of them. */
export function useQuans() {
  const [quans, setQuans] = useState<LoadedQuan[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const names = selectQuans(await loader.list());
        const results = await Promise.allSettled(names.map((name) => loader.load(name)));
        const loaded = results.map(
          (r, i): LoadedQuan =>
            r.status === 'fulfilled' ? { name: names[i], module: r.value } : { name: names[i], error: toMessage(r.reason) },
        );
        if (!cancelled) setQuans(loaded);
      } catch (e) {
        if (!cancelled) setError(toMessage(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { quans, error, loading: !quans && !error };
}
