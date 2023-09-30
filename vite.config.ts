import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import libCss from 'vite-plugin-libcss'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'FlexHud',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // Externalize Vue to prevent it from being bundled
      external: ['vue', 'pinia'],
      output: {
        // Configure the global name when used as a script tag in an HTML file
        globals: {
          vue: 'Vue',
          pinia: 'Pinia'
        },
        exports: 'named'
      }
    }
  },
  plugins: [vue(), libCss()]
})
