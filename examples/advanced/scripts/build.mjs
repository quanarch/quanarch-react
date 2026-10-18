// Builds the qua and every quan, then writes the hash of each registered quan
// into the server's quans table, where the quanar checks it before loading.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { ARTIFACTS_URL, QUA_DIR, QUANS, ROOT, log, run } from './lib.mjs';

const DB = path.join(ROOT, 'server', 'data', 'db.json');

function outDir(quan, version) {
  return quan.target === 'artifacts'
    ? path.join(ROOT, 'artifacts', 'quans', quan.name, version)
    : path.join(ROOT, 'quanar', 'public', 'quans', quan.name);
}

export async function build() {
  log('build', 'qua');
  await run('npm', ['run', 'build'], QUA_DIR, 'build');

  const db = JSON.parse(fs.readFileSync(DB, 'utf8'));
  for (const quan of QUANS) {
    const dir = path.join(ROOT, 'quans', quan.name);
    const { version } = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
    const out = outDir(quan, version);
    log('build', `${quan.name} ${version} → ${path.relative(ROOT, out)}`);
    await run('npx', ['vite', 'build', '--logLevel', 'warn'], dir, 'build', { QUAN_OUT_DIR: out });

    if (!quan.registered) continue;
    const file = path.join(out, `${quan.name}.js`);
    const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
    const row = db.quans.find((q) => q.name === quan.name);
    Object.assign(row, {
      version,
      hash,
      source_url: `${ARTIFACTS_URL}/quans/${quan.name}/${version}/${quan.name}.js`,
      updated_at: new Date().toISOString(),
    });
    log('build', `${quan.name} sha256 ${hash.slice(0, 16)}… saved to the quans table`);
  }
  fs.writeFileSync(DB, JSON.stringify(db, null, 2) + '\n');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  build().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
