import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // ← Burası önemli! Custom domain için / olmalı
  build: {
    outDir: 'docs'
  }
})