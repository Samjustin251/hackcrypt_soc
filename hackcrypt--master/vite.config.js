import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: './', // Vital for Electron file:// protocol
  server: {
    port: 5173,
    strictPort: true, // Fail if port is busy instead of switching
  },
})
