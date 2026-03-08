import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import PuzzleCountdown from "@/components/PuzzleCountdown";
import PuzzleIcon from "@/components/PuzzleIcon";
import AdBlock from "@/components/ads/AdBlock";

import { PUZZLE_GAMES, SITE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "LinkedIn Puzzle Answers Today",
  description:
    "Today's LinkedIn puzzle answers: Pinpoint, Queens, Tango, Crossclimb, Zip & Mini Sudoku.",
  alternates: { canonical: `${SITE_URL}/solutions` },
};

export default function SolutionsPage() {
  const today = new Date().toISOString().split("T")[0];

  const todayLong = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="py-10">
      <div className="container">

        <div className="text-center mb-6">
          <h1 className="font-display text-3xl font-extrabold">
            LinkedIn Puzzle Answers Today
          </h1>

          <p className="text-muted-foreground mt-2">
            Updated daily · {todayLong}
          </p>

          <div className="mt-3 flex justify-center">
            <PuzzleCountdown />
          </div>
        </div>

        <AdBlock
          slot="5934836566"
          format="leaderboard"
          minHeight={90}
        />

        <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {PUZZLE_GAMES.map((game) => (
            <div
              key={game.id}
              className="rounded-xl border bg-card overflow-hidden"
            >
              <Image
                src={game.image}
                alt={game.label}
                width={400}
                height={225}
                className="w-full h-44 object-cover"
              />

              <div className="p-5">
                <h2 className="font-bold text-lg">
                  <PuzzleIcon icon={game.icon} className="inline mr-1 h-4 w-4" />
                  {game.label}
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  {game.description}
                </p>

                <Link
                  href={`/solutions/${game.id}`}
                  className="mt-4 inline-block w-full text-center rounded-full bg-primary text-white py-2"
                >
                  View Today's Answer
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}