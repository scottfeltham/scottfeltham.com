import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The forge docs live in the repo-root `forge/` directory and MUST stay there:
// the live Jekyll build still serves them until the Astro cutover. The glob
// loader reads them in place (base points outside src/), so a single source of
// truth feeds both builds during the dark launch.
const forge = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './forge' }),
  schema: z.object({
    layout: z.string().optional(),
    title: z.string(),
    nav_order: z.number().optional(),
    parent: z.string().optional(),
    has_children: z.boolean().optional(),
    permalink: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { forge };
