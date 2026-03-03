import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Play, Image as ImageIcon, AlertCircle, Gamepad2, Lightbulb, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import AdBlock from "@/components/ads/AdBlock";
import InContentAd from "@/components/ads/InContentAd";
import SocialShareButtons from "@/components/SocialShareButtons";
import PuzzleIcon from "@/components/PuzzleIcon";
import PuzzleCountdown from "@/components/PuzzleCountdown";
import { fetchPuzzles } from "@/lib/api";
import { PUZZLE_GAMES, SITE_URL, SITE_NAME } from "@/lib/constants";
import type { Puzzle } from "@/lib/types";

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
  const navigate = useNavigate();
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
  const relatedGames = PUZZLE_GAMES.filter((g) => g.id !== game);

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
        ]
      : undefined;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={`Today's ${formattedGameName} answer with step-by-step screenshots, video walkthrough, and hints. Updated daily within 30 minutes. Free LinkedIn puzzle solutions.`}
        path={`/solutions/${game}`}
        type="article"
        image={`${SITE_URL}${gameInfo?.image || "/images/hero.jpeg"}`}
        datePublished="2025-01-01"
        dateModified={today}
        breadcrumbs={[
          { name: "Solutions", url: `${SITE_URL}/solutions` },
          { name: `${formattedGameName} Answer Today`, url: canonicalUrl },
        ]}
        jsonLd={jsonLd}
      />

      <main className="py-6 sm:py-10">
        <div className="container">
          <div className="flex gap-6">
            {/* Left Sidebar Ad - xl only */}
            <aside className="hidden xl:block w-[160px] shrink-0" aria-label="Advertisement">
              <div className="sticky top-24">
                <AdBlock slot="5934836566" format="auto" minHeight={600} lazy={true} className="my-0 w-[160px]" />
              </div>
            </aside>

            {/* Main Content */}
            <div className="min-w-0 flex-1 max-w-4xl mx-auto">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/solutions" className="hover:text-foreground">Solutions</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{formattedGameName} Answer Today</span>
          </nav>

          {/* Page Header */}
          <div className="mb-6 text-center">
            <h1 className="mb-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              {formattedGameName} Answer Today ({todayFormatted})
            </h1>

            {/* Intro paragraph for SEO - 150-200 words */}
            <p className="mt-3 mx-auto max-w-2xl text-sm text-muted-foreground leading-relaxed text-left">
              Looking for today's {formattedGameName.toLowerCase()} answer? You have come to the right place. Every day, our team solves the {formattedGameName.toLowerCase()} puzzle as soon as it goes live and publishes a complete solution within 15 minutes. Below you will find today's answer with annotated screenshots showing each step, a video walkthrough for visual learners, and progressive hints if you prefer to solve it yourself with just a small nudge. We explain the reasoning behind each move so you can improve your solving skills over time. Whether you are trying to maintain your daily streak or simply stuck on a tricky step, our {formattedGameName.toLowerCase()} solution page has everything you need. Bookmark this page and check back daily for fresh answers.
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

            {/* Author byline – E-E-A-T trust signal */}
            <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm shadow-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">PLH</div>
              <div className="text-left">
                <p className="font-medium text-foreground">By the {SITE_NAME} Editorial Team</p>
                <p className="text-xs text-muted-foreground">Verified solution · Published <time dateTime={today}>{todayLong}</time></p>
              </div>
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
                          <Button variant="outline" size="sm" className="gap-1.5 rounded-full" onClick={() => navigate("/contact")}>
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

              {/* How to Solve section */}
              <div className="mt-10 rounded-lg border border-border bg-card p-6 sm:p-8">
                <h2 className="mb-3 font-display text-xl font-bold">
                  How to Solve {formattedGameName} Puzzles
                </h2>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Mastering {formattedGameName.toLowerCase()} requires understanding the core mechanics and recognizing
                  recurring patterns. Here are the key strategies that will help you solve {formattedGameName.toLowerCase()} puzzles consistently:
                </p>
                <ul className="mb-6 space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Start by scanning the entire puzzle before making any moves</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Look for forced moves and constraints that narrow possibilities</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Use elimination to reduce options systematically</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Practice pattern recognition with our daily solutions</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Review the step-by-step screenshots to understand the logic</li>
                </ul>

                <h2 className="mb-2 font-display text-lg font-semibold">Strategy Tips to Improve Your Score</h2>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  The best {formattedGameName.toLowerCase()} solvers share a few common habits. They approach each puzzle methodically rather than guessing, they learn from past solutions to spot recurring patterns, and they use hints strategically when stuck rather than spending too long on a single step. Our daily solutions are designed to teach you these habits by showing not just what the answer is, but why each step follows logically from the one before it.
                </p>

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
                    <p className="mt-0.5">A: Yes! <Link to="/contact" className="text-primary underline">Contact us</Link> with your puzzle request and we will prioritize it.</p>
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
                      to={`/solutions/${g.id}`}
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
                  {SITE_NAME} Editorial Team. "{formattedGameName} Answer Today ({todayLong})." {SITE_NAME}, {todayLong}. {canonicalUrl}
                </p>
              </div>
            </div>
          )}

          {/* Bottom rectangle ad */}
          <AdBlock slot="5934836566" format="rectangle" lazy={true} minHeight={250} className="mt-8" />
            </div>

            {/* Right Sidebar Ad - xl only */}
            <aside className="hidden xl:block w-[160px] shrink-0" aria-label="Advertisement">
              <div className="sticky top-24">
                <AdBlock slot="5934836566" format="auto" minHeight={600} lazy={true} className="my-0 w-[160px]" />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default SolutionDetail;