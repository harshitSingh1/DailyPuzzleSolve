// src\app\answers\[game]\[date]\page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Lightbulb, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import JsonLd from "@/components/JsonLd";
import SocialShareButtons from "@/components/SocialShareButtons";
import PuzzleCountdown from "@/components/PuzzleCountdown";
import AdBlock from "@/components/ads/AdBlock";
import InContentAd from "@/components/ads/InContentAd";
import { API_BASE_URL, PUZZLE_GAMES, SITE_URL, SITE_NAME } from "@/lib/constants";
import {
  fetchAvailableDates,
  fetchSolutionWithFallback,
  findClosestPreviousDate,
  getLatestAvailableDate,
  isFutureDate,
  type SolutionData
} from "@/lib/solutionUtils";

type Props = {
  params: Promise<{
    game: string;
    date: string;
  }>;
};

// 🔥 Generate date navigation
function getAdjacentDates(dateStr: string) {
  const date = new Date(dateStr);
  
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return {
    yesterday: yesterday.toISOString().split("T")[0],
    tomorrow: tomorrow.toISOString().split("T")[0],
    isToday: date.toISOString().split("T")[0] === today.toISOString().split("T")[0],
    isFuture: date > today,
  };
}

// 🔥 Format date for display
function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// 🔥 SEO Metadata (CRITICAL FOR RANKING)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game, date } = await params;
  const gameData = PUZZLE_GAMES.find((g) => g.id === game);

  if (!gameData) return {};

  // Get available dates to determine actual date to show
  const availableDates = await fetchAvailableDates(game);
  let actualDate = date;
  
  // If requested date not available, find closest previous date
  if (!availableDates.includes(date)) {
    const closestDate = findClosestPreviousDate(date, availableDates);
    if (closestDate) {
      actualDate = closestDate;
    } else if (availableDates.length > 0) {
      // If no previous date, use latest available
      actualDate = getLatestAvailableDate(availableDates) || date;
    }
  }

  const formattedDate = formatDate(actualDate);
  const dateObj = new Date(actualDate);
  const isToday = dateObj.toISOString().split("T")[0] === new Date().toISOString().split("T")[0];
  
  const title = isToday
    ? `${gameData.label} Answer Today (${actualDate}) – Solution & Hints`
    : `${gameData.label} Answer ${actualDate} – Solution & Explanation`;

  const description = `Find today's ${gameData.label} answer for ${formattedDate}. Get step-by-step solution, hints, clues, and expert tips to solve the puzzle and maintain your streak.`;

  return {
    title,
    description,
    keywords: [
      ...gameData.keywords,
      `${gameData.id} answer ${actualDate}`,
      `${gameData.id} solution today`,
      `linkedin ${gameData.id} answer today`,
      `${gameData.id} hints ${actualDate}`,
      `how to solve ${gameData.id}`,
    ],
    alternates: {
      canonical: `${SITE_URL}/answers/${game}/${actualDate}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/answers/${game}/${actualDate}`,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}${gameData.image}`,
          width: 1200,
          height: 630,
          alt: `${gameData.label} Answer`,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: actualDate,
      modifiedTime: new Date().toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}${gameData.image}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// 🔥 MAIN PAGE COMPONENT
export default async function AnswerPage({ params }: Props) {
  const { game, date } = await params;

  const gameData = PUZZLE_GAMES.find((g) => g.id === game);
  if (!gameData) return notFound();

  // Fetch solution with fallback logic
  const solutionData = await fetchSolutionWithFallback(game, date);
  
  if (!solutionData) {
    // No solution available at all
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">No Solutions Available Yet</h1>
        <p className="text-gray-600 mb-8">
          We haven't published any solutions for {gameData.label} yet. Check back soon!
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  const { date: actualDate, isFallback, requestedDate, puzzle, ...solution } = solutionData;
  
  // Use puzzle data if available
  const hasPuzzleData = !!puzzle;
  const displayAnswer = solution.answer || (puzzle?.heading || "Check video solution");
  const displayHints = solution.hints || [];
  const displayExplanation = solution.explanation || "";

  const { yesterday, tomorrow, isToday, isFuture } = getAdjacentDates(actualDate);
  const formattedDate = formatDate(actualDate);
  const relatedGames = PUZZLE_GAMES.filter((g) => g.id !== game);

  // Show fallback message if needed
  const showFallbackMessage = isFallback && requestedDate;

  // 🔥 JSON-LD Structured Data
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${gameData.label} Answer ${actualDate} – Today's Solution`,
      description: `Complete solution for ${gameData.label} puzzle on ${formattedDate}. Step-by-step guide with hints and explanations.`,
      image: `${SITE_URL}${gameData.image}`,
      datePublished: actualDate,
      dateModified: new Date().toISOString(),
      author: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/logo1.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/answers/${game}/${actualDate}`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `What is today's ${gameData.label} answer?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: solution.answer || "Check the solution above for today's answer.",
          },
        },
        {
          "@type": "Question",
          name: `How do I solve ${gameData.label} puzzle?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Follow our step-by-step guide above with hints and detailed explanations to solve ${gameData.label} puzzle.`,
          },
        },
        {
          "@type": "Question",
          name: `Where can I find ${gameData.label} hints?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Scroll down to the hints section for progressive clues that help you solve ${gameData.label} without spoiling the answer.`,
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
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Answers",
          item: `${SITE_URL}/answers`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: gameData.label,
          item: `${SITE_URL}/answers/${game}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: actualDate,
          item: `${SITE_URL}/answers/${game}/${actualDate}`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      
      <main className="min-h-screen bg-background">
        {/* Ad Banner */}
        <AdBlock slot="top-banner" className="mb-6" />

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/answers/${game}`} className="hover:text-foreground transition-colors">
              {gameData.label}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{actualDate}</span>
          </nav>

          {/* Fallback Message */}
          {showFallbackMessage && (
            <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg text-sm text-yellow-800">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4" />
                <strong>Note:</strong>
              </div>
              <p>
                Solution for {requestedDate} is not available yet. Showing latest available solution ({actualDate}).
              </p>
            </div>
          )}

          {/* Future Date Message */}
          {isFutureDate(date) && !isFallback && (
            <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-lg text-sm text-blue-800">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4" />
                <strong>Upcoming Puzzle:</strong>
              </div>
              <p>
                This puzzle hasn't been released yet. Check back on {date} for the solution!
              </p>
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={isToday ? "default" : "secondary"} className="text-sm">
                {isToday ? "🔥 Today" : isFuture ? "Upcoming" : "Archive"}
              </Badge>
              <Badge variant="outline">{gameData.difficulty}</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {gameData.label} Answer {isToday ? "Today" : ""} ({actualDate})
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {formattedDate}
            </p>

            {/* Countdown Timer */}
            {isToday && (
              <div className="mb-6">
                <PuzzleCountdown />
              </div>
            )}

            {/* Social Share */}
            <SocialShareButtons
              url={`${SITE_URL}/answers/${game}/${actualDate}`}
              title={`${gameData.label} Answer ${actualDate}`}
            />
          </header>

          {/* Introduction (SEO Content) */}
          <section className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <p className="text-lg leading-relaxed">
              Looking for the <strong>{gameData.label} answer for {formattedDate}</strong>? 
              You've come to the right place! This page provides the complete solution, 
              step-by-step hints, and expert strategies to help you solve today's puzzle 
              and maintain your winning streak.
            </p>
            <p className="text-lg leading-relaxed">
              {gameData.description} Whether you're stuck on a tricky clue or just want 
              to verify your answer, we've got you covered with detailed explanations 
              and solving techniques.
            </p>
          </section>


          <InContentAd className="my-8" />

          {/* Hints Section */}
          {displayHints && displayHints.length > 0 && (
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
                Hints & Clues
              </h2>
              <p className="text-muted-foreground mb-4">
                Try these progressive hints before revealing the full answer:
              </p>
              <Accordion type="single" collapsible className="w-full">
                {displayHints.map((hint: string, i: number) => (
                  <AccordionItem key={i} value={`hint-${i}`}>
                    <AccordionTrigger className="text-left">
                      <span className="font-semibold">Hint {i + 1}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-lg">{hint}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

          {/* Detailed Explanation */}
          {displayExplanation && (
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-8 h-8 text-green-500" />
                Step-by-Step Solution
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none bg-card p-6 rounded-xl border">
                <p className="text-lg leading-relaxed whitespace-pre-wrap">
                  {displayExplanation}
                </p>
              </div>
            </section>
          )}

          {/* Screenshots if available */}
          {hasPuzzleData && puzzle?.screenshots && puzzle.screenshots.length > 0 && (
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Solution Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {puzzle.screenshots.map((screenshot: string, i: number) => (
                  <div key={i} className="rounded-lg overflow-hidden border">
                    <img
                      src={screenshot}
                      alt={`Step ${i + 1} solution`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Strategy Tips */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">How to Solve {gameData.label}</h2>
            <div className="bg-card p-6 rounded-xl border space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-500" />
                  Understanding the Puzzle
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {gameData.description} The key is to approach it systematically 
                  and look for patterns that connect the elements together.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Common Strategies</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Start by analyzing all available clues carefully</li>
                  <li>Look for obvious patterns or connections first</li>
                  <li>Eliminate impossible options to narrow down choices</li>
                  <li>Use the process of elimination when stuck</li>
                  <li>Take breaks if you're feeling frustrated</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Common Mistakes to Avoid</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Rushing through without reading all clues</li>
                  <li>Overthinking simple connections</li>
                  <li>Ignoring the difficulty level indicator</li>
                  <li>Not using the hint system when available</li>
                </ul>
              </div>
            </div>
          </section>

          <InContentAd className="my-8" />

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq-1">
                <AccordionTrigger>What is today's {gameData.label} answer?</AccordionTrigger>
                <AccordionContent>
                  <p>Today's {gameData.label} answer for {actualDate} is revealed in the answer section above.
                  Click the "Reveal Answer" button to see the solution.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq-2">
                <AccordionTrigger>How do I solve {gameData.label} puzzle?</AccordionTrigger>
                <AccordionContent>
                  <p>Follow our step-by-step guide above with progressive hints. Start with Hint 1 
                  and work your way through the clues. The detailed explanation section shows 
                  the complete solving process.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq-3">
                <AccordionTrigger>When does {gameData.label} reset?</AccordionTrigger>
                <AccordionContent>
                  <p>LinkedIn puzzles reset daily at midnight in your local timezone. Check the 
                  countdown timer above to see when the next puzzle will be available.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq-4">
                <AccordionTrigger>Can I see previous {gameData.label} answers?</AccordionTrigger>
                <AccordionContent>
                  <p>Yes! Visit our <Link href={`/answers/${game}/archive`} className="text-primary hover:underline">
                  {gameData.label} archive page</Link> to browse all past solutions and answers.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Date Navigation */}
          <nav className="flex items-center justify-between gap-4 mb-8 p-4 bg-card rounded-xl border">
            <Link
              href={`/answers/${game}/${yesterday}`}
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Day</span>
            </Link>
            
            <Link
              href={`/answers/${game}/today`}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Today's Answer</span>
            </Link>
            
            {!isFuture && (
              <Link
                href={`/answers/${game}/${tomorrow}`}
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <span>Next Day</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </nav>

          {/* Related Games */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Other LinkedIn Puzzles</h2>
            <p className="text-muted-foreground mb-4">
              Check out today's answers for other LinkedIn puzzle games:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedGames.map((relatedGame) => (
                <Link
                  key={relatedGame.id}
                  href={`/answers/${relatedGame.id}/today`}
                  className="p-4 bg-card rounded-xl border hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold mb-2">{relatedGame.label}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedGame.description}
                  </p>
                  <Badge variant="outline" className="mt-2">
                    {relatedGame.difficulty}
                  </Badge>
                </Link>
              ))}
            </div>
          </section>

          {/* Internal Links */}
          <section className="mb-8 p-6 bg-card rounded-xl border">
            <h3 className="text-xl font-semibold mb-4">More Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href={`/answers/${game}/archive`} className="text-primary hover:underline">
                📅 View {gameData.label} Archive
              </Link>
              <Link href="/blog/best-strategies-for-linkedin-puzzles" className="text-primary hover:underline">
                📚 Best Strategies for LinkedIn Puzzles
              </Link>
              <Link href={`/blog/how-to-solve-linkedin-${game}`} className="text-primary hover:underline">
                🎯 How to Solve {gameData.label}
              </Link>
              <Link href="/" className="text-primary hover:underline">
                🏠 All Puzzle Answers
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

// 🔥 Generate Static Params (Only include available dates from API)
export async function generateStaticParams() {
  const games = ["pinpoint", "queens", "tango", "crossclimb", "zip", "minisudoku", "patches"];
  const params = [];

  for (const game of games) {
    try {
      // Use the new fetchAvailableDates function that works with backend data
      const dates = await fetchAvailableDates(game);
      
      for (const date of dates) {
        params.push({ game, date });
      }
      
      // If no dates found, generate last 3 days as fallback
      if (dates.length === 0) {
        for (let i = 0; i < 3; i++) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          params.push({ game, date: d.toISOString().split("T")[0] });
        }
      }
    } catch (error) {
      console.error(`Error fetching dates for ${game}:`, error);
      // Fallback: generate last 3 days if API fails
      for (let i = 0; i < 3; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        params.push({ game, date: d.toISOString().split("T")[0] });
      }
    }
  }

  return params;
}

// Enable ISR
export const revalidate = 60;
