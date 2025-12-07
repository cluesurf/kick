import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import express from "express";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [
    remix({
      appDirectory: "case",
      future: {
        v3_fetcherPersist: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
        v3_singleFetch: true,
        v3_throwAbortReason: true,
      },
    }),
    tailwindcss(),
    {
      name: 'serve-base-files',
      configureServer(server) {
        // Serve the base folder from the parent directory with caching headers
        server.middlewares.use('/base', express.static(join(__dirname, 'base'), {
          maxAge: '1y',
          immutable: true,
          setHeaders: (res, path) => {
            // Set cache headers for audio files
            if (path.endsWith('.wav') || path.endsWith('.mp3')) {
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            }
          }
        }));
      }
    }
  ],
  publicDir: join(__dirname, 'case/public'),
  server: {
    fs: {
      // Allow serving files from parent directory
      allow: ['..']
    },
    warmup: {
      clientFiles: ['case/entry.client.tsx'],
    }
  },
  optimizeDeps: {
    entries: ['case/entry.client.tsx'],
  }
});
