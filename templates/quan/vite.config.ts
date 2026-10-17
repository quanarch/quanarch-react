import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { quan } from '@quanarch/react/vite';

export default defineConfig({
  // `vite` runs the development quanar in dev/; `vite build` builds the quan
  // into dist/index.js, using the quanar's React at runtime.
  plugins: [react(), quan()],
  resolve: { dedupe: ['react', 'react-dom', '@quanarch/react'] },
});
