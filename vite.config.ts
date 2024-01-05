import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import px2rem from 'postcss-plugin-px2rem';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [px2rem({ rootValue: 39 })],
    },
  },
});
