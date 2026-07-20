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

// The /writing/ blog. Posts are MDX so their prose can embed the <Engineers>
// and <Sidebar> aside components. `pubDate` is coerced from the YAML date to a
// JS Date so templates and the RSS feed can sort and format it; `draft`
// defaults to false so a post is only hidden when it explicitly opts in.
const writing = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    source: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { forge, writing };
