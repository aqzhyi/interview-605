import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  root: 'src/(pages)',
  server: {
    port: 60_733,
    watch: {},
  },
  build: {
    rollupOptions: {
      output: {
        dir: resolve(__dirname, 'dist'),
      },
      input: {
        'main': resolve(__dirname, 'src/(pages)/index.html'),
        'running-clock': resolve(__dirname, 'src/(pages)/running-clock.html'),
        'is-cycle-check': resolve(__dirname, 'src/(pages)/is-cycle-check.html'),
        'performance-check': resolve(
          __dirname,
          'src/(pages)/performance-check.html',
        ),
      },
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
})
