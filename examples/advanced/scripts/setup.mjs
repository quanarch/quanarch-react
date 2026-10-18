// Installs the dependencies of every part that does not have them yet.
import fs from 'node:fs';
import path from 'node:path';
import { QUA_DIR, QUANS, ROOT, log, run } from './lib.mjs';

export async function setup() {
  const dirs = [QUA_DIR, path.join(ROOT, 'quanar'), ...QUANS.map((q) => path.join(ROOT, 'quans', q.name))];
  for (const dir of dirs) {
    if (fs.existsSync(path.join(dir, 'node_modules'))) continue;
    log('setup', `npm install in ${path.relative(ROOT, dir)}`);
    await run('npm', ['install', '--no-audit', '--no-fund'], dir, 'setup');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  setup().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
