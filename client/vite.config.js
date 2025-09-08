import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.cryptominning.in/api',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
