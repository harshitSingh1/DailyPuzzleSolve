import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://logicpuzzlehub.xyz";

  const routes = [
    "",
    "/memes",
    "/shop",
    "/tools",
    "/blog",
    "/about",
    "/contact",
    "/games",
    "/solutions",
    "/solutions/pinpoint",
    "/solutions/queens",
    "/solutions/tango",
    "/solutions/crossclimb",
    "/solutions/zip",
    "/solutions/mini-sudoku",
    "/answers/pinpoint",
    "/answers/queens",
    "/answers/tango",
    "/answers/crossclimb",
    "/answers/zip",
    "/answers/mini-sudoku",
    "/editorial-policy",
    "/privacy",
    "/terms",
    "/blog/how-to-solve-linkedin-pinpoint",
    "/blog/brain-training-techniques",
    "/blog/daily-puzzle-strategy-guide",
    "/blog/queens-puzzle-strategy",
    "/blog/tango-puzzle-tips",
    "/blog/how-to-solve-linkedin-zip",
    "/blog/linkedin-games-complete-guide",
    "/blog/linkedin-puzzle-guide",
    "/blog/best-strategies-for-linkedin-puzzles",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-03-13"),
    changeFrequency: route.startsWith("/answers") ? "daily" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/answers") ? 0.9 : 0.7,
  }));
}