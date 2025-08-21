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
      chunkSizeWarningLimit: 2000, // Increase the limit (in KB) if chunks are too large
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
  });
  