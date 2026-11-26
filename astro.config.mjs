import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mtdbackoffice.co.uk',
  output: 'static',
  integrations: [sitemap()],
});
