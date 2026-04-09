import { MetadataRoute } from 'next';
import { fetchAvailableDates } from '@/lib/solutionUtils';

const baseUrl = 'https://www.logicpuzzlehub.xyz';

const games = [
  'pinpoint',
  'queens',
  'tango',
  'zip',
  'crossclimb',
  'minisudoku',
  'patches',
];

function getDates(days: number) {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }

  return dates;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '',
    '/blog',
    '/about',
    '/contact',
    '/games',
    '/tools',
    '/shop',
    '/memes',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/editorial-policy',
    '/solutions',
  ];

  const blogPages = [
    '/blog/how-to-solve-linkedin-pinpoint',
    '/blog/how-to-solve-linkedin-queens',
    '/blog/how-to-solve-linkedin-tango',
    '/blog/how-to-solve-linkedin-zip',
    '/blog/how-to-solve-linkedin-crossclimb',
    '/blog/how-to-solve-linkedin-minisudoku',
    '/blog/how-to-solve-linkedin-patches',
    '/blog/linkedin-games-complete-guide',
    '/blog/linkedin-puzzle-guide',
    '/blog/best-strategies-for-linkedin-puzzles',
    '/blog/brain-training-techniques',
    '/blog/daily-puzzle-strategy-guide',
  ];

  const urls: MetadataRoute.Sitemap = [];

  // Static pages
  staticPages.forEach((route) => {
    urls.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      priority: route === '' ? 1 : 0.8,
    });
  });

  // Blog pages
  blogPages.forEach((route) => {
    urls.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      priority: 0.8,
    });
  });

  // Game landing pages
  games.forEach((game) => {
    urls.push({
      url: `${baseUrl}/answers/${game}`,
      lastModified: new Date(),
      priority: 0.9,
    });
    // Also add archive pages
    urls.push({
      url: `${baseUrl}/answers/${game}/archive`,
      lastModified: new Date(),
      priority: 0.7,
    });
    // Add /today routes
    urls.push({
      url: `${baseUrl}/answers/${game}/today`,
      lastModified: new Date(),
      priority: 0.8,
    });
  });

  for (const game of games) {
    let dates: string[] = [];

    try {
      dates = await fetchAvailableDates(game);
    } catch (err) {
      console.error(`sitemap: failed to fetch dates for ${game}`, err);
      dates = getDates(10);
    }

    dates = [...new Set(dates)].sort((a, b) => b.localeCompare(a));

    for (const date of dates) {
      urls.push({
        url: `${baseUrl}/answers/${game}/${date}`,
        lastModified: new Date(date),
        priority: 0.7,
      });
    }
  }

  return urls;
}