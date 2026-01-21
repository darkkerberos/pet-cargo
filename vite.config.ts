import { fileURLToPath, URL } from 'url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type ConfigEnv, type UserConfig } from 'vite'
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => ({
  // Otomatis deteksi mode production untuk GitHub Pages
  base: mode === 'production' ? '/pet-cargo/' : '/',
  
  logLevel: 'error',
  build: {
    emptyOutDir: true,
    sourcemap: false,
    // Diubah ke true agar file lebih ringan (penting untuk production)
    minify: mode === 'production', 
    outDir: 'dist',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  plugins: [
    react(),
    tailwindcss(),
    svgr()
  ],
  resolve: {
    alias: [
      {
        find: 'declarations',
        replacement: fileURLToPath(new URL('../declarations', import.meta.url))
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      }
    ],
    dedupe: ['@dfinity/agent']
  }
}))