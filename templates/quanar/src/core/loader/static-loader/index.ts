import { importQuan, type QuanLoader } from '@quanarch/react';
import { appConfig } from '../../../configs';

/**
 * Loads quans from a static folder, by default this quanar's public/quans:
 *
 *   quans/index.json          ["billing"]
 *   quans/billing/index.js    a built quan
 *
 * Running `npm run deliver -- <this quanar>` in a quan puts it there.
 */
export const staticLoader: QuanLoader = {
  async list() {
    const res = await fetch(`${appConfig.quansUrl}index.json`);
    const type = res.headers.get('content-type') ?? '';
    if (res.status === 404 || !type.includes('json')) return [];
    if (!res.ok) throw new Error(`Could not list quans: HTTP ${res.status}`);
    return (await res.json()) as string[];
  },

  load(name) {
    return importQuan(`${appConfig.quansUrl}${encodeURIComponent(name)}/index.js`);
  },
};
