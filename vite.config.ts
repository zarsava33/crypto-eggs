import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/crypto-eggs/', // Base path for GitHub Pages
  optimizeDeps: {
    exclude: ['lucide-react', '@prisma/client'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@headlessui/react', '@heroicons/react', 'tailwindcss'],
        },
      },
      external: ['@prisma/client']
    },
    chunkSizeWarningLimit: 600, // Set chunk size warning limit
  },
  define: {
    'process.env': {}, // Enable environment variable support
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
