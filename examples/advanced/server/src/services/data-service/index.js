import { db } from '../../db/index.js';

/** The data the quans ask for: one table per quan in db.json. */
export const dataService = {
  invoices() {
    return db.read().invoices;
  },

  exportInvoices() {
    const count = db.read().invoices.length;
    return { message: `${count} invoices exported to invoices.csv.` };
  },

  stockItems() {
    return db.read().stock_items;
  },

  /** Brings every item below its reorder level up to twice that level. */
  restock() {
    const data = db.read();
    const low = data.stock_items.filter((i) => i.stock < i.reorderAt);
    low.forEach((i) => (i.stock = i.reorderAt * 2));
    db.write(data);
    return { message: low.length ? `Restocked ${low.map((i) => i.name).join(', ')}.` : 'Nothing was below its reorder level.' };
  },

  reports() {
    return db.read().reports;
  },

  summarize() {
    return { message: `Summary of ${db.read().reports.length} reports generated.` };
  },

  metrics() {
    return db.read().metrics;
  },

  /** Moves every metric a little, as if new traffic had come in. */
  refreshMetrics() {
    const data = db.read();
    data.metrics.forEach((m) => {
      const delta = Math.round(m.value * (Math.random() * 0.1 - 0.03));
      m.value += delta;
      m.change = Math.round((delta / Math.max(1, m.value - delta)) * 100);
    });
    db.write(data);
    return { message: 'Metrics refreshed.' };
  },
};
