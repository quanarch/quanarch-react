/**
 * A quanar and the quans it loads must share one copy of React and of this
 * package, or hooks and context break. The quanar publishes its copies on a
 * global; quans built with `@quanarch/react/vite` read them from there instead
 * of bundling their own.
 */

/** The global the shared modules live on. */
export const SHARED_GLOBAL = '__QUANARCH_SHARED__';

/** Modules a quanar shares with its quans. */
export const SHARED_MODULES = ['react', 'react/jsx-runtime', 'react-dom', '@quanarch/react'] as const;

export type SharedModule = (typeof SHARED_MODULES)[number];

/**
 * Publishes the quanar's modules to the quans it loads. Call it once, before
 * loading any quan.
 *
 * ```ts
 * import * as React from 'react';
 * import * as JsxRuntime from 'react/jsx-runtime';
 * import * as ReactDOM from 'react-dom';
 * import * as Quanarch from '@quanarch/react';
 *
 * shareModules({ react: React, 'react/jsx-runtime': JsxRuntime, 'react-dom': ReactDOM, '@quanarch/react': Quanarch });
 * ```
 */
export function shareModules(modules: Record<SharedModule, unknown>): void {
  const target = globalThis as Record<string, unknown>;
  target[SHARED_GLOBAL] = Object.freeze({ ...modules });
}
