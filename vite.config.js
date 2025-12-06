import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: true,
    port: 3001,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'meet-lines.local',
      '.meet-lines.local', // Permite todos los subdominios
      'meet-lines.com',
      '.meet-lines.com', // Permite todos los subdominios en producción
      'proyecto1-9ehf.meet-lines.local',
      'proyecto1-kxs7.meet-lines.local',
      'proyecto2.meet-lines.local',
    ],
  },
})
