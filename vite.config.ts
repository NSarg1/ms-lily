import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // base: '/health-hub',
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-react-compiler',
            {
              // Enable the compiler in development and production
              target: '19',
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  css: {
    modules: {
      localsConvention: 'dashes',
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables.scss" as *;
          @use "@/styles/mixins.scss" as *;
        `,
      },
    },
  },
});
