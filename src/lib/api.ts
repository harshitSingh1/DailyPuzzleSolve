// src\lib\api.ts

import { API_BASE_URL } from "./constants";
import type { Puzzle, ShopItem, Tool, ContactFormData, ApiResponse } from "./types";

const TIMEOUT_MS = 10_000;

// ── In-memory response cache ──────────────────────────────────────────
const memCache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL: Record<string, number> = {
  "/puzzles": 60_000,       // 60s for puzzles
  "/shops": 5 * 60_000,     // 5 min for shop
  "/tools": 5 * 60_000,     // 5 min for tools
};

function getCacheTtl(endpoint: string): number {
  for (const [prefix, ttl] of Object.entries(CACHE_TTL)) {
    if (endpoint.startsWith(prefix)) return ttl;
  }
  return 0;
}

async function fetchWithTimeout(url: string, options?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit, retries = 3): Promise<T> {
  // Check in-memory cache for GET requests
  const isGet = !options?.method || options.method === "GET";
  const ttl = getCacheTtl(endpoint);
  if (isGet && ttl > 0) {
    const cacheKey = endpoint;
    const cached = memCache.get(cacheKey);
    if (cached && Date.now() - cached.ts < ttl) {
      return cached.data as T;
    }
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const json = await res.json();

      // Store in cache
      if (isGet && ttl > 0) {
        memCache.set(endpoint, { data: json, ts: Date.now() });
      }

      return json;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      if (err instanceof Error && err.name === "AbortError") {
        lastError = new Error("Request timed out. The server may be starting up. Please try again.");
        break;
      }

      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
      }
    }
  }

  throw lastError ?? new Error("Unknown error");
}

// Map short game IDs to the gameType strings used in the database
// Keywords to match in normalized headings for each game ID
const GAME_ID_KEYWORDS: Record<string, string[]> = {
  pinpoint: ["pinpoint"],
  queens: ["queens"],
  tango: ["tango"],
  crossclimb: ["crossclimb"],
  zip: ["zip"],
  minisudoku: ["minisudoku", "mini sudoku"],
};

const normalize = (s: string) =>
  s.toLowerCase().replace(/-/g, " ").replace(/\s+/g, " ").trim();

// gameId is the short id like "pinpoint", "queens", etc.
export async function fetchPuzzles(gameId?: string): Promise<Puzzle[]> {

  const query = gameId ? `?game=${encodeURIComponent(gameId)}` : "";

  const res = await fetch(`${API_BASE_URL}/puzzles${query}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch puzzles");
  }

  const json: ApiResponse<Puzzle[]> = await res.json();

  const data = Array.isArray(json.data) ? json.data : [];

  if (gameId && GAME_ID_KEYWORDS[gameId]) {

    const keywords = GAME_ID_KEYWORDS[gameId];

    const filtered = data.filter((p) => {
      const heading = normalize(p.heading || "");
      return keywords.some((kw) => heading.includes(kw));
    });

    return filtered;
  }

  return data;
}

export async function fetchShopItems(): Promise<ShopItem[]> {
  const res = await fetch(`${API_BASE_URL}/shops`, {
    next: { revalidate: 3600 },
  });

  const json: ApiResponse<ShopItem[]> = await res.json();
  return json.data ?? [];
}

export async function fetchTools(): Promise<Tool[]> {
  const res = await fetch(`${API_BASE_URL}/tools`, {
    next: { revalidate: 3600 },
  });

  const json: ApiResponse<Tool[]> = await res.json();
  return json.data ?? [];
}


export async function submitContact(data: ContactFormData): Promise<{ message: string }> {
  return fetchApi<{ message: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  }, 0); // no retry for POSTs
}
