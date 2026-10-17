import { importQuan, type QuanLoader } from '@quanarch/react';

/**
 * Loads quans from this quanar's own public/quans folder:
 *
 *   public/quans/index.json          ["billing"]
 *   public/quans/billing/index.js    a built quan
 *
 * Running `npm run deliver -- <this quanar>` in a quan puts it there.
 */
const base = `${import.meta.env.BASE_URL}quans/`;

export const staticLoader: QuanLoader = {
  async list() {
    const res = await fetch(`${base}index.json`);
    const type = res.headers.get('content-type') ?? '';
    if (res.status === 404 || !type.includes('json')) return [];
    if (!res.ok) throw new Error(`Could not list quans: HTTP ${res.status}`);
    return (await res.json()) as string[];
  },

  load(name) {
    return importQuan(`${base}${encodeURIComponent(name)}/index.js`);
  },
};
