import { Metadata } from "next";
import GameLandingPage from "@/components/GameLandingPage";
import { PUZZLE_GAMES, SITE_URL, SITE_NAME } from "@/lib/constants";

const gameData = PUZZLE_GAMES.find((g) => g.id === "queens")!;

export const metadata: Metadata = {
  title: `${gameData.label} Answers - Daily Solutions & Archive`,
  description: `Find all ${gameData.label} answers and solutions. Daily updates with step-by-step guides, hints, and explanations. Complete archive of past puzzles.`,
  keywords: [
    ...gameData.keywords,
    "queens answers",
    "queens archive",
    "queens solutions",
    "all queens answers",
  ],
  alternates: {
    canonical: `${SITE_URL}/answers/queens`,
  },
  openGraph: {
    title: `${gameData.label} Answers - Daily Solutions`,
    description: `Complete archive of ${gameData.label} answers with step-by-step solutions`,
    url: `${SITE_URL}/answers/queens`,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}${gameData.image}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function QueensPage() {
  return <GameLandingPage gameId="queens" />;
}

export const revalidate = 3600;
