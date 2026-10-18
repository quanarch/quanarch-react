import fs from 'node:fs';
import { config } from '../config/index.js';

/**
 * A JSON file standing in for a database. Every read sees the file as it is
 * now, so editing db.json by hand takes effect immediately.
 */
export const db = {
  read() {
    return JSON.parse(fs.readFileSync(config.dbPath, 'utf8'));
  },

  write(data) {
    fs.writeFileSync(config.dbPath, JSON.stringify(data, null, 2) + '\n');
  },

  /** Calls listener whenever db.json changes on disk. Returns a function that stops listening. */
  onChange(listener) {
    let timer;
    const watcher = fs.watch(config.dbPath, () => {
      clearTimeout(timer);
      timer = setTimeout(listener, 100);
    });
    return () => watcher.close();
  },
};
