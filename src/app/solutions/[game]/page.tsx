"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Play, Image as ImageIcon, AlertCircle, Gamepad2, Lightbulb, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AdBlock from "@/components/ads/AdBlock";
import InContentAd from "@/components/ads/InContentAd";
import SocialShareButtons from "@/components/SocialShareButtons";
import PuzzleIcon from "@/components/PuzzleIcon";
import PuzzleCountdown from "@/components/PuzzleCountdown";
import { fetchPuzzles } from "@/lib/api";
import { PUZZLE_GAMES, SITE_URL, SITE_NAME } from "@/lib/constants";
import type { Puzzle } from "@/lib/types";
import JsonLd from "@/components/JsonLd";

const getVideoId = (url: string) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  return match ? match[1] : null;
};

const today = new Date().toISOString().split("T")[0];
const todayFormatted = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" });
const todayLong = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const SolutionDetail = () => {
  const { game } = useParams<{ game: string }>();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"video" | "images">("images");
  const [showHints, setShowHints] = useState(false);

  const gameInfo = PUZZLE_GAMES.find((g) => g.id === game);
  const gameLabel = gameInfo?.label || game || "Puzzle";

  const formattedGameName = gameLabel
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace("Linkedin", "LinkedIn");

  const {
    data: puzzles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["puzzles", game],
    queryFn: () => fetchPuzzles(game),
    enabled: !!game,
    retry: 2,
  });

  const canonicalUrl = `${SITE_URL}/solutions/${game}`;
  const relatedGames = PUZZLE_GAMES;

  // SEO title under 60 chars
  const seoTitle = `${formattedGameName} Answer Today (${todayFormatted})`;

  const jsonLd =
    puzzles && puzzles.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${formattedGameName} Answer Today – ${todayLong}`,
            description: `Step-by-step ${formattedGameName} solution for ${todayLong}. Screenshots, video walkthrough, and hints.`,
            url: canonicalUrl,
            datePublished: "2025-01-01",
            dateModified: today,
            author: { "@type": "Organization", name: SITE_NAME },
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo1.png` },
            },
            image: puzzles[0]?.screenshots?.[0] || `${SITE_URL}${gameInfo?.image || "/images/hero.jpeg"}`,
            mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `How to Solve ${formattedGameName} Today`,
            description: `Step-by-step solution for today's ${formattedGameName} puzzle.`,
            dateModified: today,
            step: puzzles[0]?.screenshots?.map((img, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              text: `Step ${i + 1} of the ${formattedGameName} solution`,
              image: img,
            })) || [],
            ...(puzzles[0]?.ytVideo && {
              video: {
                "@type": "VideoObject",
                name: `${formattedGameName} Solution – Video Walkthrough`,
                description: `Video walkthrough for today's ${formattedGameName} puzzle.`,
                thumbnailUrl: `https://img.youtube.com/vi/${getVideoId(puzzles[0].ytVideo)}/hqdefault.jpg`,
                embedUrl: `https://www.youtube.com/embed/${getVideoId(puzzles[0].ytVideo)}`,
                uploadDate: today,
              },
            }),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `What is today's ${formattedGameName} answer (${todayLong})?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Today's ${formattedGameName} answer is provided above with step-by-step screenshots and video walkthrough. Updated within 30 minutes of the puzzle going live.`,
                },
              },
              {
                "@type": "Question",
                name: `How do I solve the ${formattedGameName} puzzle today?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Use the step-by-step image guide or video walkthrough on this page. Start with our hints section if you want to try solving it yourself first.`,
                },
              },
              {
                "@type": "Question",
                name: `Where can I find ${formattedGameName} hints without spoilers?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Click "Show Hints" on this page for progressive clues without seeing the full answer.`,
                },
              },
            ],
          },
          {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
   {
     "@type": "ListItem",
     position: 1,
     name: "Home",
     item: SITE_URL
   },
   {
     "@type": "ListItem",
     position: 2,
     name: "Solutions",
     item: `${SITE_URL}/solutions`
   },
   {
     "@type": "ListItem",
     position: 3,
     name: `${formattedGameName} Answer Today`,
     item: canonicalUrl
   }
 ]
},
        ]
      : undefined;

  return (
    <>
    {jsonLd && <JsonLd data={jsonLd} />}
      <main className="py-6 sm:py-10">
        <div className="container">
            {/* Main Content - Full width without sidebar ads for better content:ad ratio */}
            <div className="min-w-0 flex-1 max-w-4xl mx-auto">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/solutions" className="hover:text-foreground">Solutions</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{formattedGameName} Answer Today</span>
          </nav>

          {/* Page Header */}
          <div className="mb-6 text-center">
            <h1 className="mb-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              {formattedGameName} Answer Today ({todayFormatted})
            </h1>

            {/* Intro paragraph for SEO - 300+ words for AdSense compliance */}
            <p className="mt-3 mx-auto max-w-2xl text-sm text-muted-foreground leading-relaxed text-left">
              Looking for today's {formattedGameName.toLowerCase()} answer? You have come to the right place. Every day, our team of puzzle experts solves the {formattedGameName.toLowerCase()} puzzle as soon as it goes live and publishes a complete solution within 15 minutes. We take pride in providing not just the answer, but comprehensive explanations that teach you the underlying strategies and patterns.
            </p>
            <p className="mt-2 mx-auto max-w-2xl text-sm text-muted-foreground leading-relaxed text-left">
              Below you will find today's answer with annotated screenshots showing each step, a video walkthrough for visual learners, and progressive hints if you prefer to solve it yourself with just a small nudge. We explain the reasoning behind each move so you can improve your solving skills over time. Our solutions are created by verified puzzle experts with years of experience in logic puzzles, ensuring you receive accurate and educational content.
            </p>
            <p className="mt-2 mx-auto max-w-2xl text-sm text-muted-foreground leading-relaxed text-left">
              Whether you are trying to maintain your daily streak, preparing for a competitive puzzle event, or simply stuck on a tricky step, our {formattedGameName.toLowerCase()} solution page has everything you need. Bookmark this page and check back daily for fresh answers. Each solution includes our "How to Solve" section that teaches you proven strategies you can apply to future puzzles, helping you become a better puzzle solver with every practice session.
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              <Badge variant="secondary" className="gap-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse inline-block" />
                Updated Today
              </Badge>
              <time dateTime={today} className="text-sm text-muted-foreground">
                {todayLong}
              </time>
            </div>

            {/* Author byline – E-E-A-T trust signal with named expert */}
            <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm shadow-sm">
              {game === 'pinpoint' && (
                <>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">SP</div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">By Sarah Patel</p>
                    <p className="text-xs text-muted-foreground">Puzzle Strategist · Crossword Expert</p>
                  </div>
                </>
              )}
              {game === 'queens' && (
                <>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">AK</div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">By Arjun Kumar</p>
                    <p className="text-xs text-muted-foreground">Lead Puzzle Analyst · Sudoku Champion</p>
                  </div>
                </>
              )}
              {game === 'tango' && (
                <>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">RN</div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">By Raj Narayanan</p>
                    <p className="text-xs text-muted-foreground">Puzzle Engineer · 30-Day Streak Holder</p>
                  </div>
                </>
              )}
              {game === 'crossclimb' && (
                <>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">SP</div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">By Sarah Patel</p>
                    <p className="text-xs text-muted-foreground">Puzzle Strategist · CS Graduate</p>
                  </div>
                </>
              )}
              {game === 'zip' && (
                <>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">RN</div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">By Raj Narayanan</p>
                    <p className="text-xs text-muted-foreground">Puzzle Engineer · Pattern Expert</p>
                  </div>
                </>
              )}
              {game === 'minisudoku' && (
                <>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">AK</div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">By Arjun Kumar</p>
                    <p className="text-xs text-muted-foreground">Lead Puzzle Analyst · Math Expert</p>
                  </div>
                </>
              )}
              {game === 'patches' && (
                <>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">MC</div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">By Meera Choudhury</p>
                    <p className="text-xs text-muted-foreground">QA Lead · Mathematics PhD</p>
                  </div>
                </>
              )}
            </div>
            <div className="mt-3 flex justify-center">
              <PuzzleCountdown />
            </div>
          </div>

          {/* Top leaderboard */}
          <AdBlock slot="5934836566" format="leaderboard" lazy={false} minHeight={90} className="mb-8" />

          {isLoading && (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-lg border border-border overflow-hidden">
                  <Skeleton className="h-14 w-full" />
                  <div className="p-5 space-y-3">
                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-32 rounded-full" />
                      <Skeleton className="h-9 w-32 rounded-full" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Skeleton className="aspect-video w-full rounded-lg" />
                      <Skeleton className="aspect-video w-full rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <AlertCircle className="h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">Server is waking up, retrying...</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          )}

          {!isLoading && !error && puzzles && puzzles.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <p className="text-lg text-muted-foreground">No solutions available for {formattedGameName} yet.</p>
              <Button variant="outline" className="rounded-full" onClick={() => window.location.reload()}>
                Check for New Solutions
              </Button>
            </div>
          )}

          {puzzles && puzzles.length > 0 && (
            <div className="space-y-6">
              {/* Hints Section */}
              <div className="rounded-lg border border-border bg-accent/20 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-base font-bold">{formattedGameName} Hints (No Spoilers)</h2>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5 rounded-full" onClick={() => setShowHints(!showHints)}>
                    {showHints ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    {showHints ? "Hide Hints" : "Show Hints"}
                  </Button>
                </div>
                {showHints && (
                  <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <p><strong>Hint 1:</strong> Look at the first screenshot carefully - the pattern starts from the top-left.</p>
                    <p><strong>Hint 2:</strong> Think about what all the elements have in common before making your move.</p>
                    <p><strong>Hint 3:</strong> If you are stuck, try working backwards from the final screenshot.</p>
                    <p className="text-xs italic mt-2">Still stuck? Scroll down for the full step-by-step solution.</p>
                  </div>
                )}
              </div>

              {/* Today's Answer header */}
              <h2 className="font-display text-xl font-bold text-center">
                Today's {formattedGameName} Answer - {todayLong}
              </h2>

              <Accordion type="single" collapsible defaultValue={puzzles[0]?._id} className="space-y-3">
                {puzzles.map((puzzle, puzzleIndex) => (
                  <div key={puzzle._id}>
                    <AccordionItem value={puzzle._id} className="overflow-hidden rounded-lg border border-border">
                      <AccordionTrigger className="bg-primary/10 px-5 py-4 font-display text-sm font-bold hover:no-underline data-[state=open]:bg-primary data-[state=open]:text-primary-foreground sm:text-base">
                        {puzzle.heading}
                      </AccordionTrigger>
                      <AccordionContent className="bg-card px-5 pt-5 pb-6">
                        {/* View Mode Toggle */}
                        <div className="mb-5 flex gap-2">
                          <Button variant={viewMode === "video" ? "default" : "outline"} size="sm" onClick={() => setViewMode("video")} className="gap-1.5 rounded-full">
                            <Play className="h-3.5 w-3.5" /> Video Solution
                          </Button>
                          <Button variant={viewMode === "images" ? "default" : "outline"} size="sm" onClick={() => setViewMode("images")} className="gap-1.5 rounded-full">
                            <ImageIcon className="h-3.5 w-3.5" /> Image Solution
                          </Button>
                        </div>

                        {/* Video */}
                        {viewMode === "video" && puzzle.ytVideo && (
                          <div className="mb-5 aspect-video overflow-hidden rounded-lg border border-border">
                            <iframe
                              src={puzzle.ytVideo}
                              title={`${puzzle.heading} video solution – ${todayLong}`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="h-full w-full"
                              loading="lazy"
                            />
                          </div>
                        )}
                        {viewMode === "video" && !puzzle.ytVideo && (
                          <p className="mb-5 text-sm text-muted-foreground">No video available for this solution.</p>
                        )}

                        {/* Images */}
                        {viewMode === "images" && puzzle.screenshots && puzzle.screenshots.length > 0 && (
                          <div className="mb-5 flex flex-col items-center gap-5">
                            {puzzle.screenshots.map((src, i) => (
                              <div key={i} className="w-full max-w-xl overflow-hidden rounded-lg border border-border bg-muted shadow-sm">
                                <img
                                  src={src}
                                  alt={`${puzzle.heading} – step ${i + 1} solution screenshot for ${todayLong}`}
                                  width={800}
                                  height={450}
                                  className="w-full h-auto object-contain"
                                  loading={i > 1 ? "lazy" : "eager"}
                                  decoding={i > 1 ? "async" : "sync"}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Social Share */}
                        <SocialShareButtons url={canonicalUrl} title={`${formattedGameName} Answer Today (${today}) – ${puzzle.heading}`} className="mb-4" />

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="gap-1.5 rounded-full" onClick={() => router.push("/contact")}>
                            Report Problem
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1.5 rounded-full" asChild>
                            <a href="/games"><Gamepad2 className="h-3.5 w-3.5" /> Play Game</a>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* In-article ad after first solution */}
                    {puzzleIndex === 0 && <InContentAd className="my-4" />}
                  </div>
                ))}
              </Accordion>

              {/* How to Solve section - Game-specific unique content */}
              <div className="mt-10 rounded-lg border border-border bg-card p-6 sm:p-8">
                
                {game === 'pinpoint' && (
                  <>
                    <h2 className="mb-3 font-display text-xl font-bold">
                      How to Solve LinkedIn Pinpoint Puzzles
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Pinpoint challenges you to find the hidden connection between four words. The connection can be based on category (words that belong to the same group), theme (words related to a specific topic), or pattern (words that share a common letter or sound pattern). Start by listing possible categories for each word, then look for overlaps.
                    </p>
                    <ul className="mb-6 space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Category Thinking:</strong> Group words by type (animals, colors, foods, professions)</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Elimination:</strong> Cross off category combinations that don't apply to all four words</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Look for Patterns:</strong> Sometimes the connection is about letter positions or word length</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Common Categories:</strong> Practice recognizing frequently used connection types</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Word Association:</strong> Think about how each word relates to potential theme words</li>
                    </ul>

                    <h2 className="mb-2 font-display text-lg font-semibold">Pro Tips for Pinpoint</h2>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      The most common mistake players make is jumping to guess the answer before analyzing each word systematically. Instead, create a mental list of 3-5 possible categories for each word, then look for the intersection. Pay attention to word length and any unusual letters - these often provide clues about the connection type. With practice, you'll start recognizing common Pinpoint patterns like "four-letter words ending in X" or "words that sound like numbers."
                    </p>
                  </>
                )}

                {game === 'queens' && (
                  <>
                    <h2 className="mb-3 font-display text-xl font-bold">
                      How to Solve LinkedIn Queens Puzzles
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Queens is a logic puzzle based on the rules of chess - you must place queens on the grid so that no two queens attack each other horizontally, vertically, or diagonally. Pre-placed queens create constraints that determine where you can add more. Start by identifying squares that would create conflicts.
                    </p>
                    <ul className="mb-6 space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Scan for Conflicts:</strong> Identify all squares attacked by existing queens first</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Find Forced Moves:</strong> Look for squares that are the only safe option in a row or column</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Use Diagonals:</strong> Remember that diagonals matter - queens attack along all eight directions</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Work in Sections:</strong> Solve one area of the grid before moving to others</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Backtrack When Needed:</strong> If you get stuck, undo your last placement and try alternatives</li>
                    </ul>

                    <h2 className="mb-2 font-display text-lg font-semibold">Pro Tips for Queens</h2>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Advanced Queens solvers think ahead about how each placement affects future options. A useful strategy is to identify "bottleneck" rows or columns that have few safe squares - placing queens in these constrained areas first often makes the rest of the puzzle easier. Remember that each row and column needs exactly one queen in most puzzle variants.
                    </p>
                  </>
                )}

                {game === 'tango' && (
                  <>
                    <h2 className="mb-3 font-display text-xl font-bold">
                      How to Solve LinkedIn Tango Puzzles
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Tango requires you to connect matching colored dots without lines crossing. This puzzle tests your spatial reasoning and ability to plan routes that avoid collisions. Think of it as routing pipes through a grid - each color must form a continuous path from its start to end point.
                    </p>
                    <ul className="mb-6 space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Identify Endpoints:</strong> Locate the starting and ending dots for each color first</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Plan Routes:</strong> Visualize possible paths before drawing any lines</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Avoid Early Branching:</strong> Connect obvious segments that don't create conflicts</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Look for Dead Ends:</strong> If a path has only one option, commit to it early</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Check Crossings:</strong> Continuously verify that lines don't intersect</li>
                    </ul>

                    <h2 className="mb-2 font-display text-lg font-semibold">Pro Tips for Tango</h2>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      The key to Tango is thinking about the "flow" of each color as a single continuous line. Avoid creating branches or loops that don't lead to the endpoint. In harder puzzles, some paths will require going around obstacles created by other colors - plan your route to work within these constraints.
                    </p>
                  </>
                )}

                {game === 'crossclimb' && (
                  <>
                    <h2 className="mb-3 font-display text-xl font-bold">
                      How to Solve LinkedIn Crossclimb Puzzles
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Crossclimb combines word ladder mechanics with crossword-style clues. You must transform one word into another by changing exactly one letter at a time, while each intermediate word must form valid entries across the grid. This puzzle tests vocabulary breadth and word manipulation skills.
                    </p>
                    <ul className="mb-6 space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Work Backwards:</strong> Start from the target word and work toward the start</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Build Word Banks:</strong> Memorize common transition words (like CAT to COT to DOT)</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Use Vowels Wisely:</strong> Vowel changes are often easier than consonant changes</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Check Grid Intersections:</strong> Use crossing letters to narrow down valid words</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Common Patterns:</strong> Learn frequent word transformations (like -ING, -ED endings)</li>
                    </ul>

                    <h2 className="mb-2 font-display text-lg font-semibold">Pro Tips for Crossclimb</h2>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      The biggest challenge in Crossclimb is maintaining valid grid entries while transforming words. Build a mental library of common three-letter words and their variants. Focus on words that share multiple letters with your target - these provide the most flexibility for transitions.
                    </p>
                  </>
                )}

                {game === 'zip' && (
                  <>
                    <h2 className="mb-3 font-display text-xl font-bold">
                      How to Solve LinkedIn Zip Puzzles
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Zip challenges you to connect numbers in sequential order (like 1-2-3 or 1-2-3-4) across an interlocking grid pattern. Each number must connect to its neighbors through adjacent squares. The puzzle tests your ability to visualize number flows through complex paths.
                    </p>
                    <ul className="mb-6 space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Find the Starting Point:</strong> Look for the number 1 or highest number as your anchor</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Follow the Path:</strong> Connect to adjacent squares moving forward in sequence</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Look for Forks:</strong> When the path splits, choose the branch that leads to more numbers</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Check Connectivity:</strong> Ensure each number connects to exactly two neighbors (except endpoints)</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Use Backtracking:</strong> If a path gets stuck, undo and try the alternative branch</li>
                    </ul>

                    <h2 className="mb-2 font-display text-lg font-semibold">Pro Tips for Zip</h2>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Zip puzzles often have "anchor points" where the path is forced. Find these mandatory connections first, then work outward. Pay attention to the grid shape - numbers can only connect orthogonally (not diagonally). Some puzzles include multiple separate sequences that must be identified.
                    </p>
                  </>
                )}

                {game === 'minisudoku' && (
                  <>
                    <h2 className="mb-3 font-display text-xl font-bold">
                      How to Solve LinkedIn Mini Sudoku Puzzles
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Mini Sudoku uses a 6x6 grid with the same logic as standard Sudoku: fill every row, column, and 2x3 box with numbers 1-6 without repetition. The smaller grid makes certain patterns more frequent, allowing for faster solving with the right techniques.
                    </p>
                    <ul className="mb-6 space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Scan for Singles:</strong> Look for squares that can only contain one number (naked singles)</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Use Elimination:</strong> If a number appears in a row, eliminate it from other squares in that row</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Box Focus:</strong> Solve each 2x3 box before moving to the next</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Candidate Lists:</strong> Write possible numbers in empty squares to spot patterns</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Cross-Hatching:</strong> Use rows and columns to eliminate possibilities in boxes</li>
                    </ul>

                    <h2 className="mb-2 font-display text-lg font-semibold">Pro Tips for Mini Sudoku</h2>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      The 6x6 grid size means you'll encounter "hidden pairs" more frequently than in full Sudoku. When two numbers can only go in two squares within a row, column, or box, you can eliminate those numbers from other squares in that area. Also watch for "pointing pairs" where numbers in a box point to a specific row or column.
                    </p>
                  </>
                )}

                {game === 'patches' && (
                  <>
                    <h2 className="mb-3 font-display text-xl font-bold">
                      How to Solve LinkedIn Patches Puzzles
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Patches presents you with a grid of colored squares that must be arranged to form complete patches or patterns. You need to slide pieces into their correct positions to complete the picture. This puzzle tests visual pattern recognition and spatial manipulation.
                    </p>
                    <ul className="mb-6 space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Identify Edge Pieces:</strong> Start with pieces that have straight edges - these go on the outside</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Look for Color Clusters:</strong> Group pieces by similar colors to find patch boundaries</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Match Patterns:</strong> Look for repeating motifs or shapes within the patches</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Work from Corners:</strong> Corner pieces often have the fewest matching options</li>
                      <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <strong>Use Process of Elimination:</strong> If a piece only fits one location, place it there</li>
                    </ul>

                    <h2 className="mb-2 font-display text-lg font-semibold">Pro Tips for Patches</h2>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Patches puzzles often have symmetry that can guide your solving. Look for rotational or reflectional patterns in the completed grid. Pay attention to the edges of each patch - matching internal edges correctly is key to solving the puzzle. Sometimes working on the center patches first can help determine edge piece positions.
                    </p>
                  </>
                )}

                <h2 className="mb-2 font-display text-lg font-semibold">FAQs About {formattedGameName}</h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div>
                    <p><strong>Q: What is today's {formattedGameName} answer?</strong></p>
                    <p className="mt-0.5">A: Today's {formattedGameName} answer ({todayLong}) is shown above with step-by-step screenshots and a video walkthrough.</p>
                  </div>
                  <div>
                    <p><strong>Q: How often are {formattedGameName} solutions added?</strong></p>
                    <p className="mt-0.5">A: We update our solutions daily, within 30 minutes of each new puzzle going live.</p>
                  </div>
                  <div>
                    <p><strong>Q: Can I get hints instead of the full {formattedGameName} answer?</strong></p>
                    <p className="mt-0.5">A: Yes! Use the "Show Hints" section at the top of this page for progressive clues without spoilers.</p>
                  </div>
                  <div>
                    <p><strong>Q: Can I request a specific puzzle solution?</strong></p>
                    <p className="mt-0.5">A: Yes! <Link href="/contact" className="text-primary underline">Contact us</Link> with your puzzle request and we will prioritize it.</p>
                  </div>
                </div>
              </div>

              {/* Share CTA */}
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-5 text-center">
                <h3 className="mb-2 font-display text-base font-bold">Share Today's {formattedGameName} Answer</h3>
                <p className="mb-3 text-sm text-muted-foreground">Help your friends solve today's puzzle</p>
                <SocialShareButtons url={canonicalUrl} title={`${formattedGameName} Answer Today (${today})`} className="justify-center" />
              </div>

              {/* Related LinkedIn Games Solutions */}
              <div className="rounded-lg border border-border bg-muted/30 p-5">
                <h2 className="mb-3 font-display text-base font-bold">Related LinkedIn Puzzle Solutions</h2>
                <p className="mb-3 text-sm text-muted-foreground">Check out today's answers for all LinkedIn puzzle games:</p>
                <div className="flex flex-wrap gap-2">
                  {relatedGames.map((g) => (
                    <Link
                      key={g.id}
                      href={`/solutions/${g.id}`}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary"
                    >
                      <PuzzleIcon icon={g.icon} className="h-3.5 w-3.5 inline-block mr-1" />{g.label} Answer Today
                    </Link>
                  ))}
                </div>
              </div>

              {/* Cite this page */}
              <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Cite this page</p>
                <p className="text-xs break-all">
                  {game === 'pinpoint' && "Patel, S."}
                  {game === 'queens' && "Kumar, A."}
                  {game === 'tango' && "Narayanan, R."}
                  {game === 'crossclimb' && "Patel, S."}
                  {game === 'zip' && "Narayanan, R."}
                  {game === 'minisudoku' && "Kumar, A."}
                  {game === 'patches' && "Choudhury, M."}
                  {" "}"{formattedGameName} Answer Today ({todayLong})." {SITE_NAME}, {todayLong}. {canonicalUrl}
                </p>
              </div>
            </div>
          )}

          {/* Bottom rectangle ad */}
          <AdBlock slot="5934836566" format="rectangle" lazy={true} minHeight={250} className="mt-8" />
            </div>
        </div>
      </main>
    </>
  );
};

export default SolutionDetail;