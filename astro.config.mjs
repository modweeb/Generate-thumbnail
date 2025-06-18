import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://modweeb.com", // بدون الشرطة المائلة في النهاية
  integrations: [sitemap()]
});
