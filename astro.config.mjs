import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: "https://modweeb.com",
  base: "/generate-thumbnail",
  integrations: [sitemap()],
  output: 'server',
  adapter: vercel(),
  vite: {
    define: {
      'import.meta.env.BASE_URL': JSON.stringify('/generate-thumbnail')
    }
  }
});
