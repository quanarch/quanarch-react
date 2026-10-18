import { db } from '../../db/index.js';

/** The fields the quanar needs to fetch, verify and describe a quan. */
function toSource(row) {
  return {
    name: row.name,
    displayName: row.display_name,
    description: row.description,
    url: row.source_url,
    version: row.version,
    hash: row.hash,
    delivery: row.delivery,
    permissions: row.permissions,
  };
}

export const quanService = {
  /**
   * The active quans of one delivery that the user may load. Quans the user may
   * not load are never listed, so their code never reaches the browser.
   */
  listFor(user, delivery) {
    return db
      .read()
      .quans.filter((q) => q.active && q.delivery === delivery && q.source_url)
      .filter((q) => q.permissions.every((p) => user.permissions.includes(p)))
      .map(toSource);
  },
};
