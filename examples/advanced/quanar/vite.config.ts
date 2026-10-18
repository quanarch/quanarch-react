import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // The quanar calls the server as /api; in development Vite forwards it.
    proxy: { '/api': 'http://localhost:4000' },
  },
});
