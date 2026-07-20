// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
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
  // MDX powers the /writing/ blog posts (component tags like <Engineers> in
  // prose). The forge docs stay on the standard markdown pipeline; adding this
  // integration does not touch how .md files render.
  integrations: [mdx()],
  markdown: {
    // Reproduce kramdown-specific syntax (IALs, `{:toc}`) used by the forge
    // docs so they render identically to the live Jekyll build. Shiki keeps its
    // default `github-dark` theme so forge code blocks render byte-identically;
    // that dark theme is also legible against the site's dark palette in posts.
    remarkPlugins: [remarkKramdown],
  },
});
