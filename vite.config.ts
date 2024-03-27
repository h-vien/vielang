import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      "@parser": path.resolve("./src"),
    },
  },
  test: {
    globals: true
  },
})