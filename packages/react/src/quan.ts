import type { ComponentType } from 'react';
import type { Qua } from './qua.js';

/** What a quan declares about itself. */
export interface QuanDefinition {
  /** The quan's name, as in its conf.qu. */
  name: string;
  /** Every qua the quan uses. The quanar must plug in each of them. */
  quas: readonly Qua<unknown>[];
  /** The quan's root component. */
  component: ComponentType;
}

/** A quan as a quanar receives it: the default export of a built quan. */
export interface QuanModule extends QuanDefinition {
  /** Contract version, so a quanar can recognise quans it understands. */
  readonly quanarch: 1;
}

/**
 * Declares a quan. Make it the default export of the quan's entry file.
 *
 * ```ts
 * export default defineQuan({ name: 'billing', quas: [quaA], component: Billing });
 * ```
 */
export function defineQuan(definition: QuanDefinition): QuanModule {
  return Object.freeze({ ...definition, quas: Object.freeze([...definition.quas]), quanarch: 1 as const });
}

/** Reports whether value is a quan built against this contract. */
export function isQuanModule(value: unknown): value is QuanModule {
  if (typeof value !== 'object' || value === null) return false;
  const quan = value as Partial<QuanModule>;
  return quan.quanarch === 1 && typeof quan.name === 'string' && Array.isArray(quan.quas) && quan.component != null;
}
