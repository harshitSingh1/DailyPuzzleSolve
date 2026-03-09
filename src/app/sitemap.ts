import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://logicpuzzlehub.xyz';

  const staticPages = [
    '',
    '/memes',
    '/shop',
    '/tools',
    '/blog',
    '/about',
    '/contact',
    '/games',
    '/solutions',
    '/solutions/pinpoint',
    '/solutions/queens',
    '/solutions/tango',
    '/solutions/crossclimb',
    '/solutions/zip',
    '/solutions/mini-sudoku',
    '/answers/pinpoint',
    '/answers/queens',
    '/answers/tango',
    '/answers/crossclimb',
    '/answers/zip',
    '/answers/mini-sudoku',
    '/editorial-policy',
    '/privacy',
    '/terms',
    '/blog/how-to-solve-linkedin-pinpoint',
    '/blog/brain-training-techniques',
    '/blog/daily-puzzle-strategy-guide',
    '/blog/queens-puzzle-strategy',
    '/blog/tango-puzzle-tips',
    '/blog/how-to-solve-linkedin-zip',
    '/blog/linkedin-games-complete-guide',
    '/blog/linkedin-puzzle-guide',
    '/blog/best-strategies-for-linkedin-puzzles',
  ];

  const sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return sitemap;
}

