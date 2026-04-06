import Link from "next/link";
import type { Metadata } from "next";

import HeroSection from "@/components/home/HeroSection";
import TodaysPuzzles from "@/components/home/TodaysPuzzles";
import FAQSection from "@/components/home/FAQSection";
import WhatsNewSection from "@/components/home/WhatsNewSection";

import PuzzleCountdown from "@/components/PuzzleCountdown";
import PuzzleIcon from "@/components/PuzzleIcon";
import SocialShareButtons from "@/components/SocialShareButtons";
import JsonLd from "@/components/JsonLd";

import { Puzzle, Wrench, BookOpen, ShoppingCart, Smile } from "lucide-react";

import {
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_NAME,
  PUZZLE_GAMES,
} from "@/lib/constants";

import AdBlock from "@/components/ads/AdBlock";

/* ------------------------------------------------ */
/* Metadata */
/* ------------------------------------------------ */

const today = new Date().toISOString().split("T")[0];

export const metadata: Metadata = {
  title: `LinkedIn Puzzle Answers Today (${today})`,
  description:
    "Get today's LinkedIn puzzle answers: Pinpoint, Queens, Tango, Crossclimb, Zip & Mini Sudoku. Step-by-step solutions with screenshots updated daily.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `LinkedIn Puzzle Answers Today (${today})`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/hero.jpeg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

/* ------------------------------------------------ */
/* Page */
/* ------------------------------------------------ */

export default function HomePage() {

  const todayLong = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      alternateName: "DailyPuzzleSolve",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      dateModified: today,
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/logo1.png`,
        },
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/solutions/{search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <main>

        {/* HERO */}
        <HeroSection />

        {/* INTERACTIVE PUZZLE SECTION */}
        <div className="container pt-5 pb-2 text-center" id="puzzles">
          <h2 className="font-display text-xl font-extrabold sm:text-2xl">
            Today's LinkedIn Puzzle Answers
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Updated daily · <time dateTime={today}>{todayLong}</time>
          </p>

          <div className="mt-2 flex justify-center">
            <PuzzleCountdown />
          </div>
        </div>

        <TodaysPuzzles />

        {/* AD */}
        <AdBlock
          slot="5934836566"
          format="leaderboard"
          lazy={true}
          minHeight={90}
          className="my-3"
        />

        <WhatsNewSection />

        {/* SEO CONTENT */}
        <section className="py-8 sm:py-10">
          <div className="container max-w-4xl">

            <h2 className="mb-3 text-center font-display text-xl font-extrabold sm:text-2xl">
              What Are LinkedIn Puzzle Games?
            </h2>

            <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">

              <p>
                LinkedIn launched a collection of daily puzzle games in 2024, and they quickly became one of the platform's most popular features. Every day, millions of professionals take a break from their feeds to solve Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku. These games test vocabulary, logic, pattern recognition, and spatial reasoning, and each one resets at the same time every day.
              </p>

              <p>
                The appeal of LinkedIn puzzles goes beyond entertainment. They have become a social phenomenon where colleagues compete for streaks, share scores on their profiles, and use daily puzzle performance as an icebreaker in meetings. The games are designed to be quick, most take between two and five minutes but they reward careful thinking over speed.
              </p>

              <p>
                LogicPuzzleHub exists because we know that feeling of being stuck on a puzzle with no reliable help available. Most search results are either outdated, incomplete, or buried under ads. We built this site to be the resource we wished we had: fast, accurate daily solutions with real explanations, not just screenshots of the final answer.
              </p>

              <p>
                Whether you are a daily player looking to maintain your streak, a newcomer trying to understand how these puzzles work, or someone who enjoys the strategy behind solving them, LogicPuzzleHub is your daily companion.
              </p>

            </div>

            {/* Author */}
            <div className="mt-6 flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">
                PLH
              </div>

              <p>
                Updated daily by the {SITE_NAME} Editorial Team ·{" "}
                <time dateTime={today}>{todayLong}</time>
              </p>
            </div>

            {/* Trust Signals */}
            <div className="mt-6 grid gap-3 grid-cols-3">

              <div className="rounded-xl border border-border bg-card p-3 text-center shadow-sm">
                <p className="font-display text-xl font-extrabold text-primary">6</p>
                <p className="text-xs text-muted-foreground">Puzzles Daily</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-3 text-center shadow-sm">
                <p className="font-display text-xl font-extrabold text-primary">10 min</p>
                <p className="text-xs text-muted-foreground">Post Time</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-3 text-center shadow-sm">
                <p className="font-display text-xl font-extrabold text-primary">100%</p>
                <p className="text-xs text-muted-foreground">Free Access</p>
              </div>

            </div>

            {/* Explore */}
            <div className="mt-6">
              <h3 className="mb-2 text-center font-display text-base font-bold">
                Explore More
              </h3>

              <div className="flex flex-wrap justify-center gap-2">

                <Link href="/games" className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold flex items-center gap-1 hover:border-primary hover:text-primary">
                  <Puzzle className="h-3.5 w-3.5" /> More Puzzles
                </Link>

                <Link href="/tools" className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold flex items-center gap-1 hover:border-primary hover:text-primary">
                  <Wrench className="h-3.5 w-3.5" /> Tools
                </Link>

                <Link href="/blog" className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold flex items-center gap-1 hover:border-primary hover:text-primary">
                  <BookOpen className="h-3.5 w-3.5" /> Articles
                </Link>

                <Link href="/shop" className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold flex items-center gap-1 hover:border-primary hover:text-primary">
                  <ShoppingCart className="h-3.5 w-3.5" /> Shop
                </Link>

                <Link href="/memes" className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold flex items-center gap-1 hover:border-primary hover:text-primary">
                  <Smile className="h-3.5 w-3.5" /> Memes
                </Link>

              </div>
            </div>

          </div>
        </section>

        {/* STRATEGY ARTICLES */}
        <section className="py-8 sm:py-10 bg-muted/30">

          <div className="container max-w-5xl">

            <h2 className="mb-2 text-center font-display text-xl font-extrabold sm:text-2xl">
              Puzzle Strategy Articles
            </h2>

            <p className="mb-5 text-center text-sm text-muted-foreground">
              In-depth guides written by our editorial team
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {[
                {
                  title: "How to Solve LinkedIn Pinpoint Faster",
                  path: "/blog/how-to-solve-linkedin-pinpoint",
                  desc: "Master category thinking and elimination to guess in fewer clues.",
                  time: "8 min",
                },
                {
                  title: "Best Brain Training Techniques",
                  path: "/blog/brain-training-techniques",
                  desc: "Science-backed methods for memory, focus, and pattern recognition.",
                  time: "10 min",
                },
                {
                  title: "Daily Puzzle Strategy Guide",
                  path: "/blog/daily-puzzle-strategy-guide",
                  desc: "Complete strategies for all six LinkedIn puzzle games.",
                  time: "12 min",
                },
              ].map((a) => (
                <Link
                  key={a.path}
                  href={a.path}
                  className="rounded-xl border border-border bg-card p-4 shadow-sm hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="font-display text-base font-bold mb-1">
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {a.desc}
                  </p>
                  <span className="text-xs text-primary font-semibold">
                    {a.time} read →
                  </span>
                </Link>
              ))}

            </div>

          </div>
        </section>

        <FAQSection />


        {/* SHARE */}
        <section className="py-8 sm:py-10">
          <div className="container max-w-3xl text-center">

            <h2 className="mb-2 font-display text-lg font-bold">
              Share Today's Puzzle Answers
            </h2>

            <p className="mb-4 text-sm text-muted-foreground">
              Help your friends solve today's LinkedIn puzzles
            </p>

            <div className="flex justify-center">
              <SocialShareButtons
                url={SITE_URL}
                title={`LinkedIn Puzzle Answers Today (${today}) – Pinpoint, Queens, Tango Solutions`}
                className="flex justify-center gap-3"
              />
            </div>

          </div>
        </section>

        {/* INTERNAL LINKS FOR SEO (kept same as new version) */}
        <section className="py-6 bg-muted/30">
          <div className="container text-center">

            <h2 className="font-display text-lg font-bold mb-3">
              Popular LinkedIn Puzzle Answers
            </h2>

            <p className="text-sm text-muted-foreground mb-4">
              Looking for today's puzzle solutions? These pages provide hints,
              explanations, and direct links to the latest answers for each LinkedIn game.
            </p>

            <div className="flex flex-wrap justify-center gap-2">

              <Link href="/answers/pinpoint" className="rounded-full border px-3 py-1.5 text-sm hover:bg-accent">
                <PuzzleIcon icon="pinpoint" className="h-4 w-4 inline mr-1" />
                Pinpoint Answer Today
              </Link>

              <Link href="/answers/queens" className="rounded-full border px-3 py-1.5 text-sm hover:bg-accent">
                <PuzzleIcon icon="queens" className="h-4 w-4 inline mr-1" />
                Queens Answer Today
              </Link>

              <Link href="/answers/tango" className="rounded-full border px-3 py-1.5 text-sm hover:bg-accent">
                <PuzzleIcon icon="tango" className="h-4 w-4 inline mr-1" />
                Tango Answer Today
              </Link>

              <Link href="/answers/crossclimb" className="rounded-full border px-3 py-1.5 text-sm hover:bg-accent">
                <PuzzleIcon icon="crossclimb" className="h-4 w-4 inline mr-1" />
                Crossclimb Answer Today
              </Link>

              <Link href="/answers/zip" className="rounded-full border px-3 py-1.5 text-sm hover:bg-accent">
                <PuzzleIcon icon="zip" className="h-4 w-4 inline mr-1" />
                Zip Answer Today
              </Link>

              <Link href="/answers/mini-sudoku" className="rounded-full border px-3 py-1.5 text-sm hover:bg-accent">
                <PuzzleIcon icon="mini-sudoku" className="h-4 w-4 inline mr-1" />
                Mini Sudoku Answer Today
              </Link>

            </div>

          </div>
        </section>

      </main>
    </>
  );
}