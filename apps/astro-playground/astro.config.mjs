import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://jyunhanlin.github.io',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
});
