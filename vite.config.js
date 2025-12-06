import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",   // <<< BUNU EKLEDİK — GITHUB PAGES İÇİN ŞART
})
