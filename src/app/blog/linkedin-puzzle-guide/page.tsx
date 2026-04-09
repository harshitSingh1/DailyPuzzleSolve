import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME, PUZZLE_GAMES } from "@/lib/constants";

import PuzzleIcon from "@/components/PuzzleIcon";
import AdBlock from "@/components/ads/AdBlock";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "LinkedIn Puzzle Games Guide – Rules, Tips & Strategy",
  description:
    "Complete guide to all LinkedIn puzzle games: Pinpoint, Queens, Tango, Crossclimb, Zip & Mini Sudoku. Learn rules, strategies and expert tips to improve your scores.",
  alternates: {
    canonical: `${SITE_URL}/blog/linkedin-puzzle-guide`,
  },
  openGraph: {
    title: "LinkedIn Puzzle Games: Complete Guide",
    description:
      "Learn how to play and master all six LinkedIn puzzle games with expert strategies.",
    url: `${SITE_URL}/linkedin-puzzle-guide`,
    images: [`${SITE_URL}/images/hero.jpeg`],
  },
};

export default function LinkedinPuzzleGuidePage() {
  const today = new Date().toISOString().split("T")[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "LinkedIn Puzzle Games: Complete Guide to Rules, Tips & Strategy",
    description:
      "Learn how to play and master all six LinkedIn puzzle games with expert strategies.",
    url: `${SITE_URL}/linkedin-puzzle-guide`,
    datePublished: "2025-03-01",
    dateModified: today,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo1.png`,
      },
    },
    image: `${SITE_URL}/images/hero.jpeg`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="py-8 sm:py-12">
        <div className="container max-w-4xl">

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-4 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>{" "}
            / <span className="text-foreground">LinkedIn Puzzle Guide</span>
          </nav>

          {/* Title */}
          <h1 className="mb-4 font-display text-3xl font-extrabold sm:text-4xl">
            LinkedIn Puzzle Games: Complete Guide
          </h1>

          {/* Author */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">
              PLH
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground">
                By {SITE_NAME} Editorial Team
              </p>
              <p className="text-xs text-muted-foreground">
                Updated regularly · 12 min read
              </p>
            </div>
          </div>

          {/* Article */}
          <div className="prose-custom space-y-6 text-muted-foreground leading-relaxed">

            <p>
              LinkedIn introduced a suite of daily puzzle games in 2024 that quickly became one of the platform's most engaging features. These games — Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku — are designed to challenge your vocabulary, logical thinking, pattern recognition, and spatial reasoning. Each puzzle resets daily, encouraging players to build streaks and compete informally with colleagues.
            </p>

            <p>
              This comprehensive guide covers everything you need to know about LinkedIn puzzle games: how each game works, proven strategies for solving them efficiently, common mistakes to avoid, and how to track your progress. Whether you are a complete beginner or an experienced solver looking to refine your approach, this guide will help you get more out of your daily puzzle sessions.
            </p>

            <AdBlock
              slot="5934836566"
              format="in-article"
              layoutKey="-fb+5w+4e-db+86"
              lazy={true}
              minHeight={280}
              className="my-6"
            />

            <h2 className="font-display text-xl font-bold text-foreground">
              Understanding Each LinkedIn Puzzle Game
            </h2>

            <p>
              LinkedIn currently offers six distinct puzzle games, each targeting different cognitive skills. Here is what makes each one unique and how they challenge your brain in different ways:
            </p>

            <h3 className="font-display text-lg font-semibold text-foreground">
              Pinpoint
            </h3>

            <p>
              Pinpoint tests your ability to identify connections between seemingly unrelated words. You are given four clues one at a time, and your goal is to identify the single category that connects all four words. The fewer clues you need, the better your score. This game rewards broad vocabulary, cultural knowledge, and lateral thinking.
            </p>

            <h3 className="font-display text-lg font-semibold text-foreground">
              Queens
            </h3>

            <p>
              Queens is a constraint-based placement puzzle where you must position queens on a grid so that no two queens share the same row, column, or colored region. It requires systematic elimination and careful spatial reasoning. The key is to identify cells that can only contain one possible queen placement.
            </p>

            <h3 className="font-display text-lg font-semibold text-foreground">
              Tango
            </h3>

            <p>
              Tango challenges you to fill a grid with two types of symbols (typically suns and moons) following strict adjacency rules. No more than two identical symbols can appear in a row or column consecutively, and each row and column must contain an equal number of both symbols. This game builds logical deduction and pattern recognition skills.
            </p>

            <h3 className="font-display text-lg font-semibold text-foreground">
              Crossclimb
            </h3>

            <p>
              Crossclimb is a hybrid puzzle that combines crossword-style word clues with a word ladder mechanic. Each row is a word that differs from the one above it by exactly one letter. You must solve the clue definitions while maintaining the letter-change chain from top to bottom.
            </p>

            <h3 className="font-display text-lg font-semibold text-foreground">
              Zip
            </h3>

            <p>
              Zip asks you to draw a continuous path through a numbered grid, connecting numbers in sequence. The path must visit every cell exactly once. This game tests spatial planning and the ability to think several moves ahead, similar to solving a maze.
            </p>

            <h3 className="font-display text-lg font-semibold text-foreground">
              Mini Sudoku
            </h3>

            <p>
              Mini Sudoku is a compact version of the classic number puzzle. Using a smaller grid, you must fill every row, column, and block with the correct digits without repetition. The reduced size makes it faster to solve but still requires solid logical deduction.
            </p>

            <AdBlock
              slot="5934836566"
              format="in-article"
              layoutKey="-fb+5w+4e-db+86"
              lazy={true}
              minHeight={280}
              className="my-6"
            />

            <h2 className="font-display text-xl font-bold text-foreground">
              General Strategies That Work Across All Games
            </h2>

            <p>
              While each puzzle has its own specific techniques, several universal strategies will improve your performance across all LinkedIn games:
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Scan before you solve:</strong> Take 10 to 15 seconds to look at the entire puzzle before making any moves.
              </li>
              <li>
                <strong>Identify forced moves first:</strong> In most puzzles, some positions have only one valid option.
              </li>
              <li>
                <strong>Work from constraints:</strong> Focus on the most constrained areas first.
              </li>
              <li>
                <strong>Track your time:</strong> LinkedIn shows your solving time.
              </li>
              <li>
                <strong>Learn from mistakes:</strong> Review solutions when you get a puzzle wrong.
              </li>
              <li>
                <strong>Build a daily habit:</strong> Consistency builds pattern recognition over time.
              </li>
            </ul>

            <h2 className="font-display text-xl font-bold text-foreground">
              Why LinkedIn Puzzles Are Trending
            </h2>

            <p>
              LinkedIn puzzle games have become a cultural phenomenon in the professional networking space. They provide a productive break from scrolling feeds, create social bonding through shared puzzle experiences, and allow professionals to showcase their problem-solving skills.
            </p>

            <h2 className="font-display text-xl font-bold text-foreground">
              How LogicPuzzleHub Helps
            </h2>

            <p>
              At LogicPuzzleHub, we publish complete daily solutions for all six LinkedIn puzzle games within 30 minutes of each puzzle going live. Every solution includes annotated screenshots, video walkthroughs, hints, and strategy explanations.
            </p>

          </div>

          {/* Internal Links */}
          <div className="mt-10 rounded-lg border border-border bg-muted/30 p-5">
            <h2 className="mb-3 font-display text-base font-bold text-foreground">
              Today's LinkedIn Puzzle Answers
            </h2>

            <div className="flex flex-wrap gap-2">
              {PUZZLE_GAMES.map((game) => (
                <Link
                  key={game.id}
                  href={`/solutions/${game.id}`}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium transition-all hover:border-primary hover:text-primary"
                >
                  <PuzzleIcon
                    icon={game.icon}
                    className="h-3.5 w-3.5 inline-block mr-1"
                  />
                  {game.label} Answer Today
                </Link>
              ))}
            </div>
          </div>

          {/* Strategy links */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/blog/how-to-solve-linkedin-zip"
              className="text-sm text-primary hover:underline"
            >
              How to Solve Zip
            </Link>

            <span className="text-muted-foreground">·</span>

            <Link
              href="/blog/how-to-solve-linkedin-pinpoint"
              className="text-sm text-primary hover:underline"
            >
              How to Solve Pinpoint
            </Link>

            <span className="text-muted-foreground">·</span>

            <Link
              href="/blog/linkedin-games-complete-guide"
              className="text-sm text-primary hover:underline"
            >
              Complete Games Guide
            </Link>

            <span className="text-muted-foreground">·</span>

            <Link
              href="/blog/best-strategies-for-linkedin-puzzles"
              className="text-sm text-primary hover:underline"
            >
              Best Strategies
            </Link>
          </div>

          <AdBlock
            slot="5934836566"
            format="rectangle"
            lazy={true}
            minHeight={250}
            className="mt-8"
          />

        </div>
      </main>
    </>
  );
}