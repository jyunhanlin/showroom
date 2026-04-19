import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    css: false,
    setupFiles: ['./__test__/setup.ts'],
    exclude: ['**/node_modules/**', '**/.next/**'],
    alias: [
      {
        find: /\.(gif|ttf|eot|svg|png)$/,
        replacement: path.resolve(__dirname, './__test__/__mocks__/fileMock.js'),
      },
    ],
  },
});
