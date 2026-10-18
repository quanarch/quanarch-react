// Installs, builds, then runs the server, the artifact store and the quanar together.
import { spawn } from 'node:child_process';
import path from 'node:path';
import { ROOT, log } from './lib.mjs';
import { setup } from './setup.mjs';
import { build } from './build.mjs';

await setup();
await build();

const processes = [
  { tag: 'server', command: 'node', args: ['src/index.js'], cwd: path.join(ROOT, 'server') },
  { tag: 'artifacts', command: 'node', args: ['server.mjs'], cwd: path.join(ROOT, 'artifacts') },
  { tag: 'quanar', command: 'npx', args: ['vite', '--strictPort'], cwd: path.join(ROOT, 'quanar') },
];

const children = processes.map(({ tag, command, args, cwd }) => {
  const child = spawn(command, args, { cwd, env: process.env, shell: process.platform === 'win32' });
  child.stdout.on('data', (d) => log(tag, d));
  child.stderr.on('data', (d) => log(tag, d));
  child.on('exit', (code) => {
    log(tag, `exited with code ${code}`);
    stop();
  });
  return child;
});

function stop() {
  for (const child of children) if (!child.killed) child.kill();
  process.exit();
}
process.on('SIGINT', stop);
process.on('SIGTERM', stop);

console.log(`
  Quanar     http://localhost:5173
  Server     http://localhost:4000
  Artifacts  http://localhost:4100

  Sign in as ada / ada123 (every quan) or alan / alan123 (some quans).
  Press Ctrl+C to stop.
`);
