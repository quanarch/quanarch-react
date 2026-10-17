import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { quaKey, type Qua, type QuaApi } from './qua.js';
import type { QuanModule } from './quan.js';

/** A qua together with the quanar's implementation of it. */
export interface Plug<Q extends Qua<unknown> = Qua<unknown>> {
  readonly qua: Q;
  readonly implementation: QuaApi<Q>;
}

/**
 * Pairs a qua with its implementation. The implementation is type-checked
 * against the qua's API.
 */
export function plug<Q extends Qua<unknown>>(qua: Q, implementation: QuaApi<Q>): Plug<Q> {
  return { qua, implementation };
}

type Plugged = ReadonlyMap<string, unknown>;

const PluggedContext = createContext<Plugged | null>(null);

/**
 * Returns the quanar's implementation of a qua. Only quas the quan declared
 * and the quanar plugged in are available.
 */
export function useQua<Api>(qua: Qua<Api>): Api {
  const plugged = useContext(PluggedContext);
  if (plugged === null) {
    throw new Error(`useQua(${quaKey(qua)}) was called outside a quanar.`);
  }
  if (!plugged.has(quaKey(qua))) {
    throw new Error(`Qua ${quaKey(qua)} is not plugged in. Declare it in the quan and plug it in the quanar.`);
  }
  return plugged.get(quaKey(qua)) as Api;
}

/** The quas a quan declared but the quanar did not plug in. */
export function missingQuas(quan: QuanModule, plugs: readonly Plug[]): Qua<unknown>[] {
  const available = new Set(plugs.map((p) => quaKey(p.qua)));
  return quan.quas.filter((q) => !available.has(quaKey(q)));
}

export interface QuanHostProps {
  quan: QuanModule;
  /** The quas this quanar offers. The quan only receives the ones it declared. */
  plugs: readonly Plug[];
  /** Rendered instead of the quan when a declared qua is not plugged in. */
  fallback?: (missing: Qua<unknown>[]) => ReactNode;
}

/**
 * Gives a quan a place to live: renders it with exactly the quas it declared.
 */
export function QuanHost({ quan, plugs, fallback }: QuanHostProps) {
  const missing = missingQuas(quan, plugs);

  const plugged = useMemo(() => {
    const declared = new Set(quan.quas.map(quaKey));
    const map = new Map<string, unknown>();
    for (const p of plugs) {
      const key = quaKey(p.qua);
      if (declared.has(key)) map.set(key, p.implementation);
    }
    return map;
  }, [quan, plugs]);

  if (missing.length > 0) {
    if (fallback) return <>{fallback(missing)}</>;
    throw new Error(`Quan ${quan.name} needs ${missing.map(quaKey).join(', ')}, which the quanar does not plug in.`);
  }

  const Component = quan.component;
  return (
    <PluggedContext.Provider value={plugged}>
      <Component />
    </PluggedContext.Provider>
  );
}
