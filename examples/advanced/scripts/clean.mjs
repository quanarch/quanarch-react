// Removes every build. The hashes stay in the quans table until the next build.
import fs from 'node:fs';
import path from 'node:path';
import { QUA_DIR, QUANS, ROOT, log } from './lib.mjs';

const dirs = [
  path.join(ROOT, 'artifacts', 'quans'),
  path.join(ROOT, 'quanar', 'public', 'quans'),
  path.join(ROOT, 'quanar', 'dist'),
  path.join(QUA_DIR, 'dist'),
  ...QUANS.map((q) => path.join(ROOT, 'quans', q.name, 'dist')),
];
for (const dir of dirs) {
  fs.rmSync(dir, { recursive: true, force: true });
  log('build', `removed ${path.relative(ROOT, dir)}`);
}
