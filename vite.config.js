import { defineConfig } from 'vite'
import vitePluginRequire from 'vite-plugin-require'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginRequire.default()
  ],
  server: {
    proxy: {
      '/api':  {
        target: 'http://localhost:8080',
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
