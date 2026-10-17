/**
 * A qua: the contract a quan uses to reach its quanar.
 *
 * A qua carries no behaviour. It names an API and pins its version; the quanar
 * supplies the implementation and the quan only ever sees the type.
 */
export interface Qua<Api> {
  readonly name: string;
  readonly version: string;
  /** Type-only marker; never set at runtime. */
  readonly __api?: Api;
}

/** The API type of a qua. */
export type QuaApi<Q> = Q extends Qua<infer Api> ? Api : never;

const NAME = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

/**
 * Declares a qua.
 *
 * ```ts
 * export interface QuaA { getUser(): Promise<User> }
 * export const quaA = defineQua<QuaA>('qua-a', '1');
 * ```
 */
export function defineQua<Api>(name: string, version: string): Qua<Api> {
  if (!NAME.test(name)) {
    throw new Error(`Invalid qua name "${name}": use lowercase kebab-case, for example "qua-a".`);
  }
  if (!version) {
    throw new Error(`Qua "${name}" needs a version.`);
  }
  return Object.freeze({ name, version });
}

/** A stable key for a qua: "qua-a@1". */
export function quaKey(qua: Qua<unknown>): string {
  return `${qua.name}@${qua.version}`;
}
