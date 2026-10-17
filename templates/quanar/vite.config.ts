import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // One copy of each, shared with the quans this quanar loads.
  resolve: { dedupe: ['react', 'react-dom', '@quanarch/react'] },
});
