import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Resolve path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Set base path for deployment
  base: '/frontend/', // Path relative to your server root

  // Build options
  build: {
    // Split large chunks and increase chunk size limit if needed
    chunkSizeWarningLimit: 2000, // Increase the limit (in KB) if chunks are too large
    rollupOptions: {
      output: {
        manualChunks: {
          // Manually specify chunks for libraries or large files
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
