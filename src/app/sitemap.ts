import { MetadataRoute } from "next";
import { fetchAvailableDates } from "@/lib/solutionUtils";

const SITE_URL = "https://www.logicpuzzlehub.xyz";
const GAMES = ["pinpoint", "queens", "tango", "crossclimb", "zip", "minisudoku", "patches"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const basePages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/solutions`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/games`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/editorial-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/memes`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.3,
    },
  ];

  // Generate solution pages for each game (today + last 30 days)
  const solutionPages: MetadataRoute.Sitemap = [];

  for (const game of GAMES) {
    try {
      const dates = await fetchAvailableDates(game);
      // Include today + up to 30 most recent dates
      const recentDates = dates.slice(0, 30);

      for (const date of recentDates) {
        solutionPages.push({
          url: `${SITE_URL}/answers/${game}/${date}`,
          lastModified: new Date(),
          changeFrequency: "daily" as const,
          priority: 0.8,
        });
      }

      // Also add the /solutions/[game] page
      solutionPages.push({
        url: `${SITE_URL}/solutions/${game}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      });
    } catch (error) {
      console.error(`Error generating sitemap for ${game}:`, error);
      // Fallback: add the game page without dates
      solutionPages.push({
        url: `${SITE_URL}/solutions/${game}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      });
    }
  }

  return [...basePages, ...solutionPages];
}