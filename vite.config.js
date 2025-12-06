import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // EKLENECEK: Custom domain kullandığın için kök dizini işaret etmeli.
  build: {
    outDir: 'docs', // Build çıktısını 'docs' klasörüne veriyoruz (GitHub ayarları için önemli)
  },
})