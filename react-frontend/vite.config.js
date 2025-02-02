import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 3000, // Specify the port you want to use
    strictPort: true, // Exit if the port is already in use
  },
  plugins: [react()],
})
