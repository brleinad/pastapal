import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: ['public/favicon.ico', 'public/pastapal.icon-512.png'],
      manifest: {
        name: 'PastaPal',
        short_name: 'PastaPal',
        description: 'PastaPal',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pastapal-icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
  ],
})
