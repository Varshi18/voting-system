import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      // Allow custom import syntax if needed
      cssPath: './src/index.css',
      // Disable strict PostCSS requirement
      postcss: false
    })
  ],
});