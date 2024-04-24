import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@parser': path.resolve('./src')
    }
  },
  build: {
    emptyOutDir: false,
    lib: {
      name: '@vietscript/parser',
      entry: path.resolve('./src/index.ts'),
      formats: ['es', 'cjs', 'umd'],
      fileName: 'index'
    },
    rollupOptions: {
      external: [],

      output: {
        exports: 'named',
        globals: {}
      }
    }
  },
  test: {
    globals: true
  }
})
