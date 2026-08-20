import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // El sitio vive en una subcarpeta: sin esto se rompen assets, rutas y canonical.
  base: '/olivergOG/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Vite prefija los assets con /olivergOG/, así que los archivos tienen que
    // quedar FÍSICAMENTE dentro de una carpeta olivergOG/ del directorio que se
    // publica. Se publica `dist`; el sitio vive en `dist/olivergOG`.
    outDir: 'dist/olivergOG',
    emptyOutDir: true,
    assetsDir: 'assets',
    sourcemap: false,
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Rollup 4 solo acepta la forma de función.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils'))
            return 'motion'
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id))
            return 'vendor'
        },
      },
    },
  },
  preview: { port: 4173 },
})
