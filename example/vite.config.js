import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      // '@wxik/react-form': path.resolve('../src'),
      '@wxik/react-form': path.resolve('../dist'),
    },
  },
});
