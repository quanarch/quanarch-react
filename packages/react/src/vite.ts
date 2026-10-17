import { createRequire } from 'node:module';
import path from 'node:path';
import type { Plugin } from 'vite';
import { SHARED_GLOBAL, SHARED_MODULES } from './shared.js';

export interface QuanBuildOptions {
  /** The quan's entry file. Default: src/index.ts */
  entry?: string;
  /** Where the built quan is written. Default: dist */
  outDir?: string;
}

const PREFIX = '\0quanarch-shared:';
const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;

function isShared(id: string): boolean {
  return (SHARED_MODULES as readonly string[]).includes(id);
}

/**
 * Builds a quan as a single ES module that a quanar can load.
 *
 * React and `@quanarch/react` are not bundled: the quan takes the quanar's
 * copies at runtime (see `shareModules`). CSS is inlined into the module, so a
 * quan is always one file plus any assets it references.
 *
 * Applies only to `vite build`; `vite` (the dev server) runs the quan as a
 * normal app inside its development quanar.
 */
export function quan(options: QuanBuildOptions = {}): Plugin {
  let root = process.cwd();

  return {
    name: 'quanarch:quan',
    apply: 'build',
    // Shared modules must be claimed before Vite resolves them from node_modules.
    enforce: 'pre',

    config() {
      return {
        define: { 'process.env.NODE_ENV': JSON.stringify('production') },
        build: {
          outDir: options.outDir ?? 'dist',
          emptyOutDir: true,
          lib: {
            entry: options.entry ?? 'src/index.ts',
            formats: ['es'],
            fileName: () => 'index.js',
            cssFileName: 'index',
          },
        },
      };
    },

    configResolved(config) {
      root = config.root;
    },

    resolveId(id) {
      return isShared(id) ? PREFIX + id : null;
    },

    load(id) {
      if (!id.startsWith(PREFIX)) return null;
      const name = id.slice(PREFIX.length);
      const names = exportNames(root, name);
      const lines = [
        `const shared = globalThis[${JSON.stringify(SHARED_GLOBAL)}];`,
        `const m = shared && shared[${JSON.stringify(name)}];`,
        `if (!m) throw new Error(${JSON.stringify(`This quan must be loaded by a quanar: "${name}" is not shared.`)});`,
        `export default (m.default ?? m);`,
      ];
      if (names.length > 0) lines.push(`export const { ${names.join(', ')} } = m;`);
      return lines.join('\n');
    },

    generateBundle: {
      // After Vite has emitted the CSS, so it can be moved into the module.
      order: 'post',
      handler(_, bundle) {
        const styles: string[] = [];
        for (const [file, output] of Object.entries(bundle)) {
          if (output.type === 'asset' && file.endsWith('.css')) {
            styles.push(String(output.source));
            delete bundle[file];
          }
        }
        if (styles.length === 0) return;
        const entry = Object.values(bundle).find((o) => o.type === 'chunk' && o.isEntry);
        if (entry?.type !== 'chunk') return;
        const css = JSON.stringify(styles.join('\n'));
        entry.code = `(() => { const s = document.createElement("style"); s.textContent = ${css}; document.head.appendChild(s); })();\n${entry.code}`;
      },
    },
  };
}

/** The named exports of a module, as resolved from the quan's root. */
function exportNames(root: string, name: string): string[] {
  const require = createRequire(path.join(root, 'package.json'));
  const mod = require(name) as Record<string, unknown>;
  return Object.keys(mod).filter((key) => key !== 'default' && key !== '__esModule' && IDENTIFIER.test(key));
}
