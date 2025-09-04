import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://crypto-mining-95zt.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
