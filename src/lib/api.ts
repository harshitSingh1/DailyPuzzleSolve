import { API_BASE_URL } from "./constants";
import type { Puzzle, ShopItem, Tool, ContactFormData, ApiResponse } from "./types";

const TIMEOUT_MS = 10_000;

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
      return json;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      if (err instanceof Error && err.name === "AbortError") {
        lastError = new Error("Request timed out. The server may be starting up. Please try again.");
        break; // don't retry on timeout
      }

      if (attempt < retries) {
        // Brief pause before retry (exponential-lite: 500ms, 1000ms)
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
  const res = await fetchApi<ApiResponse<Puzzle[]>>(`/puzzles${query}`);
  const data = Array.isArray(res.data) ? res.data : [];

  // Client-side filter using normalized heading matching
  if (gameId && GAME_ID_KEYWORDS[gameId]) {
    const keywords = GAME_ID_KEYWORDS[gameId];
    const filtered = data.filter((p) => {
      const heading = normalize(p.heading || "");
      return keywords.some((kw) => heading.includes(kw));
    });
    if (filtered.length > 0 || filtered.length < data.length) return filtered;
  }

  return data;
}

export async function fetchShopItems(): Promise<ShopItem[]> {
  const res = await fetchApi<ApiResponse<ShopItem[]>>("/shops");
  return Array.isArray(res.data) ? res.data : [];
}

export async function fetchTools(): Promise<Tool[]> {
  const res = await fetchApi<ApiResponse<Tool[]>>("/tools");
  return Array.isArray(res.data) ? res.data : [];
}

export async function submitContact(data: ContactFormData): Promise<{ message: string }> {
  return fetchApi<{ message: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  }, 0); // no retry for POSTs
}
