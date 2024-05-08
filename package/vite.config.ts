import path from 'path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
export default defineConfig({
  resolve: {
    alias: {
      '@parser': path.resolve('./src')
    }
  },
  plugins: [
    dts({
      root: path.resolve(__dirname),
      entryRoot: path.resolve(__dirname, './src'),
      outDir: path.resolve(__dirname, './dist/types')
    })
  ],
  build: {
    emptyOutDir: false,
    lib: {
      name: 'vielang',
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
