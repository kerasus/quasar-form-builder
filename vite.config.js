import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: ['moment-jalaali', 'jalaali-js'], // Include specific dependencies
    // Forcing to use `module.exports` for specific packages
    allowNodeBuiltins: ['moment-jalaali']
  }
})
