// src\lib\prefetcher.ts
import { QueryClient } from "@tanstack/react-query";
import { fetchPuzzles, fetchShopItems, fetchTools } from "./api";
import { PUZZLE_GAMES, API_BASE_URL } from "./constants";

/**
 * Prefetch all major data after idle so navigation is instant.
 */
export function prefetchGlobalData(queryClient: QueryClient) {
  const run = () => {
    // Prefetch all puzzles (combined)
    queryClient.prefetchQuery({ queryKey: ["puzzles", undefined], queryFn: () => fetchPuzzles() });

    // Prefetch each game's puzzles
    PUZZLE_GAMES.forEach((g) => {
      queryClient.prefetchQuery({ queryKey: ["puzzles", g.id], queryFn: () => fetchPuzzles(g.id) });
    });

    // Prefetch shop + tools
    queryClient.prefetchQuery({ queryKey: ["shop"], queryFn: fetchShopItems });
    queryClient.prefetchQuery({ queryKey: ["tools"], queryFn: fetchTools });
  };

  // Use requestIdleCallback for non-blocking prefetch
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(run, { timeout: 3000 });
  } else {
    setTimeout(run, 1500);
  }
}

/**
 * Keep-alive ping to prevent Render cold starts.
 * Pings every 4 minutes while the tab is visible.
 */
let keepAliveInterval: ReturnType<typeof setInterval> | null = null;

export function startKeepAlive() {
  if (keepAliveInterval) return;

  const ping = () => {
    if (document.visibilityState === "visible") {
      fetch(`${API_BASE_URL}/puzzles`, { method: "HEAD", mode: "no-cors" }).catch(() => {});
    }
  };

  // Initial ping immediately
  ping();

  // Ping every 4 minutes
  keepAliveInterval = setInterval(ping, 4 * 60 * 1000);

  // Stop when tab hidden, resume when visible
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      ping();
    }
  });
}
