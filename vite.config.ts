import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));

/** index → index.html ، notfound → 404.html ، بقیه → <dir>/index.html */
const entryFile = (p: string): string =>
  p === 'notfound' ? '404.html' : p === 'index' ? 'index.html' : `${p}/index.html`;

/**
 * پروژه چندصفحه‌ای است (MPA) تا هر آدرس روی GitHub Pages بدون نیاز به
 * بازنویسی مسیر، فایل index.html مستقل خودش را داشته باشد.
 */
const htmlPages = [
  'index',
  'notfound',
  'servers',
  'store',
  'order',
  'leaderboard',
  'donate',
  'faq',
  'terms',
  'blog',
  'blog/ping-lag',
  'blog/hypixel-setup',
];

export default defineConfig({
  // در GitHub Pages پروژه زیر مسیر /<repo>/ سرو می‌شود
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssMinify: 'lightningcss',
    rollupOptions: {
      input: Object.fromEntries(
        htmlPages.map((p) => [p === 'notfound' ? '404' : p, resolve(ROOT, entryFile(p))]),
      ),
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
      },
    },
  },
});
