import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Forge Capmoor — build configuration.
//
// Deliberately minimal: no CSS framework, no animation library, no analytics.
// The site is static, so everything below is about shipping the smallest
// possible critical path rather than about bundling plugins.
export default defineConfig({
  plugins: [react()],

  build: {
    target: 'es2020',
    cssCodeSplit: true,
    // Inline anything under 4 KB (the favicon, tiny SVG marks) to save
    // round-trips; larger assets stay as hashed files.
    assetsInlineLimit: 4096,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        // Keep React in its own long-lived chunk so it caches across deploys
        // independently of our own code.
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },

  server: {
    port: 5173,
    open: false,
  },
})
