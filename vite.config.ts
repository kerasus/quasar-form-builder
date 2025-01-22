import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      // Enable reactivity transform (optional)
      reactivityTransform: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src') // Alias for src directory
    }
  },
  build: {
    lib: {
      // Entry point for the library
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'QuasarFormBuilder',
      fileName: (format) => `quasar-form-builder.${format}.js`,
      formats: ['es', 'cjs'] // Output both ES and CommonJS modules
    },
    rollupOptions: {
      // Externalize peer dependencies
      external: ['vue', 'quasar'],
      output: {
        globals: {
          vue: 'Vue',
          quasar: 'Quasar'
        }
      }
    },
    minify: true, // Minify the output
    sourcemap: true, // Generate source maps
    emptyOutDir: true // Clear the output directory before building
  }
})
