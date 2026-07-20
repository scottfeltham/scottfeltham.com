// @ts-check
import { defineConfig } from 'astro/config';
import remarkKramdown from './src/lib/remark-kramdown.mjs';

// Astro is being introduced alongside the existing Jekyll build.
// Until the deploy cutover, GitHub Pages still serves the Jekyll output;
// this config only powers local dev and the CI artifact build.
// public/ is generated from the root static dirs by `npm run sync-static`.
export default defineConfig({
  site: 'https://scottfeltham.com',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  markdown: {
    // Reproduce kramdown-specific syntax (IALs, `{:toc}`) used by the forge
    // docs so they render identically to the live Jekyll build.
    remarkPlugins: [remarkKramdown],
  },
});
