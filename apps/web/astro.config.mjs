import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:3000',
  integrations: [
    tailwind({
      config: { applyBaseStyles: true }
    }),
    react(),
    mdx(),
    sitemap()
  ],
  server: {
    port: 3000
  }
});
