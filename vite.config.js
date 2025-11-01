import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isSSR = process.argv.includes('--ssr');

// Плагин для добавления preload стилей в index.html
function preloadStylesPlugin() {
  return {
    name: 'preload-styles',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const stylesDir = path.resolve(__dirname, 'public/styles');
        
        if (!fs.existsSync(stylesDir)) {
          return html;
        }
        
        const styleFiles = fs.readdirSync(stylesDir)
          .filter(f => f.endsWith('.css'))
          .map(f => `    <link rel="preload" as="style" href="/styles/${f}">
    <link rel="stylesheet" href="/styles/${f}" />`)
          .join('\n');
        
        return html.replace('<!--preload-css-->', styleFiles);
      }
    }
  };
}

export default defineConfig({
  root: './client',
  plugins: [react(), preloadStylesPlugin()],
  
  build: isSSR ? {
    ssr: true,
    outDir: '../dist/server',
    emptyOutDir: true,
    rollupOptions: {
      input: '../src/entry-server.jsx',
      output: {
        format: 'module',
        entryFileNames: 'entry-server.js',
      },
    },
  } : {
    outDir: '../dist/client',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: path.resolve(__dirname, './client/index.html'),
    },
  },

  server: {
    port: 3000,
    strictPort: false,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
    },
  },

  publicDir: isSSR ? false : '../public',
});
