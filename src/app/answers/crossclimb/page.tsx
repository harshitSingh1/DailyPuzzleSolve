import { Metadata } from "next";
import GameLandingPage from "@/components/GameLandingPage";
import { PUZZLE_GAMES, SITE_URL, SITE_NAME } from "@/lib/constants";

const gameData = PUZZLE_GAMES.find((g) => g.id === "crossclimb")!;

export const metadata: Metadata = {
  title: `${gameData.label} Answers - Daily Solutions & Archive`,
  description: `Find all ${gameData.label} answers and solutions. Daily updates with step-by-step guides, hints, and explanations. Complete archive of past puzzles.`,
  keywords: [
    ...gameData.keywords,
    "crossclimb answers",
    "crossclimb archive",
    "crossclimb solutions",
  ],
  alternates: {
    canonical: `${SITE_URL}/answers/crossclimb`,
  },
  openGraph: {
    title: `${gameData.label} Answers - Daily Solutions`,
    description: `Complete archive of ${gameData.label} answers with step-by-step solutions`,
    url: `${SITE_URL}/answers/crossclimb`,
    siteName: SITE_NAME,
    images: [{ url: `${SITE_URL}${gameData.image}`, width: 1200, height: 630 }],
  },
};

export default function CrossclimbPage() {
  return <GameLandingPage gameId="crossclimb" />;
}

export const revalidate = 3600;
