import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cuttora/', // Repo adınızı buraya yazın
  build: {
    outDir: 'docs'
  }
})
