import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 44091,
  },
  base: "",
  resolve: {
    alias: {
      $font: resolve('./public/font')
    }
  }
})
