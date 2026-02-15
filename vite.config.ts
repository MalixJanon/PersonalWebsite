import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";


export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    // Optimization settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      format: {
        comments: false, // Remove comments
      },
    },
    // Code splitting for better caching and parallel downloads
    rollupOptions: {
      output: {
        // Keep all node_modules in a single vendor chunk to avoid circular chunk deps.
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // Performance hints
    chunkSizeWarningLimit: 500,
    // Source maps only for production debugging when needed
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: 'esnext',
    // Module preload for faster async chunk loading
    modulePreload: {
      polyfill: true,
    },
    // Compress smaller chunks
    cssCodeSplit: true,
  },
  server: {
    host: "0.0.0.0",
    fs: {
      strict: false,
      allow: ['..'],
    },
    middlewareMode: false,
  },
});
