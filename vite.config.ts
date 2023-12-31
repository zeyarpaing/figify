import preact from '@preact/preset-vite';
import { bundlePlugin } from './bundle';
import { resolve } from 'path';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      assetsDir: '',
      cssCodeSplit: false,
      rollupOptions: {
        input: {
          plugin: 'src/plugin/index.ts',
          ui: resolve(__dirname, 'index.html'),
        },
        output: {
          entryFileNames: '[name].js',
        },
      },
    },
    plugins: [preact(), bundlePlugin()],
  };
});
