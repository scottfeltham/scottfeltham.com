import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// RSS for /writing/. Published posts only — drafts never appear in the feed
// (they're previewable at their URL but unlisted). With every current post in
// draft, this emits valid XML with zero <item> entries.
export async function GET(context) {
  const posts = (await getCollection('writing'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Scott Feltham — Writing',
    description:
      'Essays and chapters on Intent-Driven Development by Scott Feltham, creator of FORGE.',
    site: context.site ?? 'https://scottfeltham.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/writing/${post.id}/`,
    })),
  });
}
