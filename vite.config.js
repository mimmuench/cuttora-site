import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs',   // 💥 Build çıktısı dist değil, docs klasörü olacak
  },
})
