import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // Library build configuration
  build: {
    lib: {
      entry: resolve(__dirname, 'src/http-component.js'),
      name: 'HTTPComponent',
      fileName: 'http-component',
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },

  // Dev server configuration
  server: {
    port: 5174,
    strictPort: true,
    open: false,
  },

  // Preview server configuration
  preview: {
    port: 5174,
    open: '/docs/index.html',
  },
});
