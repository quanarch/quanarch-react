import { isQuanModule, type QuanModule } from './quan.js';

/**
 * Where a quanar gets its quans from. Quanarch prescribes the shape, never the
 * source: a folder, a URL, an API, a database or object storage are all valid.
 */
export interface QuanLoader {
  /** Names of the quans this loader can provide. */
  list(): Promise<string[]>;
  /** Loads one quan by name. */
  load(name: string): Promise<QuanModule>;
}

/**
 * Imports a built quan from a URL and checks that it is one.
 * A building block for loaders; it decides nothing about where quans live.
 */
export async function importQuan(url: string): Promise<QuanModule> {
  const mod: { default?: unknown } = await import(/* @vite-ignore */ url);
  if (!isQuanModule(mod.default)) {
    throw new Error(`${url} is not a quan: its default export must come from defineQuan().`);
  }
  return mod.default;
}
