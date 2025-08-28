import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path';
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'Quick Rewards',
        short_name: 'Quick Rewards',
        description: 'Distributor & Retailer QR Code Scanner',
        theme_color: '#3B82F6',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable any'
          }
        ]
      }
    })
  ],
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})