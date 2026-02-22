import { useState, memo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Image as ImageIcon, Loader2, AlertCircle, Share2, Flag, Gamepad2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import AdBlock from "@/components/ads/AdBlock";
import InContentAd from "@/components/ads/InContentAd";
import { fetchPuzzles } from "@/lib/api";
import { PUZZLE_GAMES, SITE_URL, SITE_NAME } from "@/lib/constants";
import type { Puzzle } from "@/lib/types";

const getVideoId = (url: string) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  return match ? match[1] : null;
};

const today = new Date().toISOString().split("T")[0];
const todayLong = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

const SolutionDetail = () => {
  const { game } = useParams<{ game: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"video" | "images">("images");

  const gameInfo = PUZZLE_GAMES.find((g) => g.id === game);
  const gameLabel = gameInfo?.label || game || "Puzzle";

  const formattedGameName = gameLabel
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace("Linkedin", "LinkedIn");

  const { data: puzzles, isLoading, error } = useQuery({
    queryKey: ["puzzles", game],
    queryFn: () => fetchPuzzles(game),
    enabled: !!game,
    retry: 2,
  });

  const canonicalUrl = `${SITE_URL}/solutions/${game}`;

  // Related puzzles (all except current)
  const relatedGames = PUZZLE_GAMES.filter((g) => g.id !== game);

  const jsonLd = puzzles && puzzles.length > 0
    ? [
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${formattedGameName} Puzzle Solutions – ${today}`,
          url: canonicalUrl,
          dateModified: today,
          numberOfItems: puzzles.length,
          itemListElement: puzzles.map((puzzle, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "HowTo",
              name: puzzle.heading,
              description: `Step-by-step solution for ${puzzle.heading}`,
              datePublished: today,
              dateModified: today,
              author: { "@type": "Organization", name: SITE_NAME },
              image: puzzle.screenshots?.[0] || `${SITE_URL}${gameInfo?.image || "/images/hero.jpeg"}`,
              step: puzzle.screenshots?.map((img, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                text: `Step ${i + 1} of the ${formattedGameName} solution`,
                image: img,
              })),
              ...(puzzle.ytVideo && {
                video: {
                  "@type": "VideoObject",
                  name: `${puzzle.heading} – Video Solution`,
                  thumbnailUrl: `https://img.youtube.com/vi/${getVideoId(puzzle.ytVideo)}/hqdefault.jpg`,
                  embedUrl: `https://www.youtube.com/embed/${getVideoId(puzzle.ytVideo)}`,
                  uploadDate: today,
                },
              }),
            },
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: `What is today's ${formattedGameName} solution?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Today's ${formattedGameName} solution (${todayLong}) is provided above with step-by-step screenshots and a video walkthrough.`,
              },
            },
            {
              "@type": "Question",
              name: `How do I solve the ${formattedGameName} puzzle?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Use the step-by-step image guide or video walkthrough on this page to solve today's ${formattedGameName} puzzle.`,
              },
            },
          ],
        },
      ]
    : undefined;

  return (
    <>
      <SEOHead
        title={`${formattedGameName} Solution Today (${today}) – Step-by-Step Guide`}
        description={`Today's ${formattedGameName} puzzle solution (${todayLong}). Step-by-step screenshots, video walkthrough, and expert tips. Updated daily – never lose your streak!`}
        path={`/solutions/${game}`}
        type="article"
        image={`${SITE_URL}${gameInfo?.image || "/images/hero.jpeg"}`}
        datePublished="2025-01-01"
        dateModified={today}
        breadcrumbs={[
          { name: "Solutions", url: `${SITE_URL}/solutions` },
          { name: `${formattedGameName} Solution`, url: canonicalUrl },
        ]}
        jsonLd={jsonLd}
      />

      <main className="py-8 sm:py-12">
        <div className="container max-w-4xl">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/solutions" className="hover:text-foreground">Solutions</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{formattedGameName}</span>
          </nav>

          {/* Page Header */}
          <div className="mb-6 text-center">
            <h1 className="mb-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              {formattedGameName} Solution Today
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="secondary" className="gap-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse inline-block" />
                Updated Today
              </Badge>
              <time dateTime={today} className="text-sm text-muted-foreground">{todayLong}</time>
            </div>
            <p className="mt-2 text-muted-foreground">
              Step-by-step guide to master today's {formattedGameName.toLowerCase()} puzzle
            </p>
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
              <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
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
              <Accordion type="single" collapsible defaultValue={puzzles[0]?._id} className="space-y-3">
                {puzzles.map((puzzle, puzzleIndex) => (
                  <>
                    <AccordionItem
                      key={puzzle._id}
                      value={puzzle._id}
                      className="overflow-hidden rounded-lg border border-border"
                    >
                      <AccordionTrigger className="bg-primary/10 px-5 py-4 font-display text-sm font-bold hover:no-underline data-[state=open]:bg-primary data-[state=open]:text-primary-foreground sm:text-base">
                        {puzzle.heading}
                      </AccordionTrigger>
                      <AccordionContent className="bg-card px-5 pt-5 pb-6">
                        {/* View Mode Toggle */}
                        <div className="mb-5 flex gap-2">
                          <Button
                            variant={viewMode === "video" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewMode("video")}
                            className="gap-1.5 rounded-full"
                          >
                            <Play className="h-3.5 w-3.5" /> Video Solution
                          </Button>
                          <Button
                            variant={viewMode === "images" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewMode("images")}
                            className="gap-1.5 rounded-full"
                          >
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
                          <div className="mb-5 grid gap-4 sm:grid-cols-2">
                            {puzzle.screenshots.map((src, i) => (
                              <img
                                key={i}
                                src={src}
                                alt={`${puzzle.heading} – step ${i + 1} solution screenshot`}
                                className="w-full rounded-lg border border-border shadow-sm"
                                loading={i > 1 ? "lazy" : "eager"}
                              />
                            ))}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 rounded-full"
                            onClick={() => navigate("/contact")}
                          >
                            <Flag className="h-3.5 w-3.5" /> Report Problem
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 rounded-full"
                            asChild
                          >
                            <a href="/games">
                              <Gamepad2 className="h-3.5 w-3.5" /> Play Game
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 rounded-full ml-auto"
                            onClick={() => {
                              navigator.clipboard.writeText(window.location.href);
                              toast({ title: "Link copied!", description: "Solution URL copied to clipboard." });
                            }}
                          >
                            <Share2 className="h-3.5 w-3.5" /> Share Solution
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* In-article ad after first solution */}
                    {puzzleIndex === 0 && (
                      <InContentAd key="after-first-solution" className="my-4" />
                    )}
                  </>
                ))}
              </Accordion>

              {/* SEO Content block */}
              <div className="mt-10 rounded-lg border border-border bg-card p-6 sm:p-8">
                <h2 className="mb-3 font-display text-xl font-bold">
                  How to Solve {formattedGameName} Puzzles
                </h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  Mastering {formattedGameName.toLowerCase()} requires understanding the core mechanics and patterns. Our daily solutions provide:
                </p>
                <ul className="mb-6 space-y-1.5 text-sm text-muted-foreground">
                  <li>✅ Visual step-by-step screenshots for every puzzle</li>
                  <li>✅ Video walkthroughs for visual learners</li>
                  <li>✅ Multiple solving strategies explained</li>
                  <li>✅ Updated daily so you never lose your streak</li>
                </ul>
                <h3 className="mb-2 font-display text-lg font-semibold">Frequently Asked Questions</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div>
                    <p><strong>Q: How often are new {formattedGameName} solutions added?</strong></p>
                    <p className="mt-0.5">A: We update our solutions daily, within 30 minutes of each new puzzle going live.</p>
                  </div>
                  <div>
                    <p><strong>Q: Can I request a specific puzzle solution?</strong></p>
                    <p className="mt-0.5">A: Yes! <Link to="/contact" className="text-primary underline">Contact us</Link> with your puzzle request and we'll prioritize it.</p>
                  </div>
                </div>
              </div>

              {/* Related Puzzles */}
              <div className="rounded-lg border border-border bg-muted/30 p-5">
                <h2 className="mb-3 font-display text-base font-bold">Related Puzzle Solutions</h2>
                <div className="flex flex-wrap gap-2">
                  {relatedGames.map((g) => (
                    <Link
                      key={g.id}
                      to={`/solutions/${g.id}`}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary"
                    >
                      {g.emoji} {g.label} Solution Today
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom rectangle ad */}
          <AdBlock slot="5934836566" format="rectangle" lazy={true} minHeight={250} className="mt-8" />
        </div>
      </main>
    </>
  );
};

export default SolutionDetail;
