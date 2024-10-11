import { defineConfig } from 'vite';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  plugins: [
    visualizer({
      filename: './dist/stats.html',
      open: true,
    }),
  ],
});
