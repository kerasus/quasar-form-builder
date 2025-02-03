import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: resolve(__dirname, './src/quasar-variables.sass')
    }),
  ],
  resolve: {
    alias: {
      'src': resolve(__dirname, './src'),
      '@': resolve(__dirname, './src') // Alias for src directory
    },
    extensions: ['.ts', '.js', '.vue', '.json'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'QuasarFormBuilder',
      fileName: (format) => `quasar-form-builder.${format}.js`,
      formats: ['es', 'cjs'],
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
