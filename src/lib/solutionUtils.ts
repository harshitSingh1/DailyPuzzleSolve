// src\lib\solutionUtils.ts
import { API_BASE_URL } from "./constants";
import { fetchPuzzles as fetchPuzzlesFromApi } from "./api";
import type { Puzzle } from "./types";

export interface SolutionData {
  date: string;
  answer: string;
  hints?: string[];
  explanation?: string;
  isFallback?: boolean;
  requestedDate?: string;
  puzzle?: Puzzle;
}

// Normalize date to YYYY-MM-DD format
function normalizeDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0];
}

// Extract date from puzzle createdAt
function getPuzzleDate(puzzle: Puzzle): string {
  return normalizeDate(puzzle.createdAt);
}

// Fetch all puzzles for a game
export async function fetchPuzzles(game: string): Promise<Puzzle[]> {
  return fetchPuzzlesFromApi(game);
}

// Fetch available dates for a game (extracted from puzzles)
export async function fetchAvailableDates(game: string): Promise<string[]> {
  const puzzles = await fetchPuzzles(game);
  const dates = puzzles.map(puzzle => getPuzzleDate(puzzle));
  
  // Remove duplicates and sort descending (newest first)
  return [...new Set(dates)].sort((a, b) => b.localeCompare(a));
}

// Find closest previous date from available dates
export function findClosestPreviousDate(
  requestedDate: string,
  availableDates: string[]
): string | null {
  if (availableDates.length === 0) return null;

  // Sort dates in descending order (newest first)
  const sortedDates = [...availableDates].sort((a, b) => b.localeCompare(a));

  // Find the closest date that is <= requested date
  const closestDate = sortedDates.find((date) => date <= requestedDate);

  return closestDate || null;
}

// Get latest available date
export function getLatestAvailableDate(availableDates: string[]): string | null {
  if (availableDates.length === 0) return null;
  return availableDates[0]; // Already sorted newest first
}

// Check if date is in the future
export function isFutureDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  return date > today;
}

// Find puzzle for a specific date
function findPuzzleForDate(puzzles: Puzzle[], targetDate: string): Puzzle | null {
  // First try exact match
  const exactMatch = puzzles.find(puzzle => getPuzzleDate(puzzle) === targetDate);
  if (exactMatch) return exactMatch;

  // If no exact match, find the closest previous date
  const puzzleDates = puzzles.map(puzzle => ({
    puzzle,
    date: getPuzzleDate(puzzle)
  }));

  // Filter puzzles with date <= targetDate and sort descending
  const previousPuzzles = puzzleDates
    .filter(({ date }) => date <= targetDate)
    .sort((a, b) => b.date.localeCompare(a.date));

  return previousPuzzles.length > 0 ? previousPuzzles[0].puzzle : null;
}

// Fetch solution with fallback logic
export async function fetchSolutionWithFallback(
  game: string,
  requestedDate: string
): Promise<SolutionData | null> {
  try {
    const puzzles = await fetchPuzzles(game);
    
    if (puzzles.length === 0) {
      return null;
    }

    const targetDate = normalizeDate(requestedDate);
    const matchedPuzzle = findPuzzleForDate(puzzles, targetDate);

    if (!matchedPuzzle) {
      // No puzzle found (even for previous dates)
      return null;
    }

    const actualDate = getPuzzleDate(matchedPuzzle);
    const isFallback = actualDate !== targetDate;

    // Extract answer from puzzle data
    // Note: The backend doesn't have separate answer/hints fields yet
    // We'll extract from heading or use placeholder
    const answer = extractAnswerFromPuzzle(matchedPuzzle);
    const hints = extractHintsFromPuzzle(matchedPuzzle);
    const explanation = extractExplanationFromPuzzle(matchedPuzzle);

    return {
      date: actualDate,
      answer,
      hints,
      explanation,
      isFallback,
      requestedDate: isFallback ? requestedDate : undefined,
      puzzle: matchedPuzzle,
    };
  } catch (error) {
    console.error(`Error fetching solution for ${game} on ${requestedDate}:`, error);
    return null;
  }
}

// Helper functions to extract data from puzzle
function extractAnswerFromPuzzle(puzzle: Puzzle): string {
  // Try to extract answer from heading
  const heading = puzzle.heading.toLowerCase();
  
  // Simple extraction logic - can be improved
  if (heading.includes("answer:")) {
    const match = heading.match(/answer:\s*([^.,]+)/i);
    if (match) return match[1].trim();
  }
  
  if (heading.includes("solution:")) {
    const match = heading.match(/solution:\s*([^.,]+)/i);
    if (match) return match[1].trim();
  }
  
  // Default fallback
  return "Check the video solution above";
}

function extractHintsFromPuzzle(puzzle: Puzzle): string[] {
  // Placeholder - in production, this would come from backend
  return [
    "Look for patterns in the puzzle layout",
    "Consider all possible connections",
    "Start with the most obvious clues first",
    "Use process of elimination for difficult parts"
  ];
}

function extractExplanationFromPuzzle(puzzle: Puzzle): string {
  // Placeholder - in production, this would come from backend
  return `Watch the video solution above for a complete walkthrough of today's puzzle. The solution involves identifying patterns and making logical connections between the elements.`;
}

// Fetch latest solution (for "today" page)
export async function fetchLatestSolution(game: string): Promise<SolutionData | null> {
  try {
    const puzzles = await fetchPuzzles(game);
    
    if (puzzles.length === 0) {
      return null;
    }

    // Sort puzzles by date (newest first)
    const sortedPuzzles = [...puzzles].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const latestPuzzle = sortedPuzzles[0];
    const latestDate = getPuzzleDate(latestPuzzle);

    const answer = extractAnswerFromPuzzle(latestPuzzle);
    const hints = extractHintsFromPuzzle(latestPuzzle);
    const explanation = extractExplanationFromPuzzle(latestPuzzle);

    return {
      date: latestDate,
      answer,
      hints,
      explanation,
      isFallback: false,
      puzzle: latestPuzzle,
    };
  } catch (error) {
    console.error(`Error fetching latest solution for ${game}:`, error);
    return null;
  }
}
