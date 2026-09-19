import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Undangan ini disiapkan untuk GitHub Pages di bawah /wedding-invitation-02/.
// Kalau nanti dipasang di domain sendiri (root), ubah BASE menjadi '/'.
const BASE = '/wedding-invitation-02/'

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],

  // Saat `npm run dev` tetap '/' supaya localhost gampang dibuka.
  base: command === 'build' ? BASE : '/',

  server: {
    port: 5173,
  },
}))
