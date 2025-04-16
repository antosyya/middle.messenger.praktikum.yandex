import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    postcss: './postcss.config.cjs'
  },
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  }
})
