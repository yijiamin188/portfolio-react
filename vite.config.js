import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // 相对路径 base：保证部署到 GitHub Pages 任意仓库子路径下资源都能正确加载
  base: './',
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'ogl': ['ogl'],
          'gsap': ['gsap'],
          'react-vendor': ['react', 'react-dom']
        }
      }
    }
  }
})
