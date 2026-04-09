import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import JsonLd from "@/components/JsonLd";
import AdBlock from "@/components/ads/AdBlock";
import { fetchPuzzles } from "@/lib/api";
import { PUZZLE_GAMES, SITE_URL, SITE_NAME } from "@/lib/constants";
import { getPuzzleDate } from "@/lib/solutionUtils";

type Props = {
  params: Promise<{
    game: string;
  }>;
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game } = await params;
  const gameData = PUZZLE_GAMES.find((g) => g.id === game);

  if (!gameData) return {};

  const title = `${gameData.label} Archive – All Past Answers & Solutions`;
  const description = `Browse all past ${gameData.label} answers and solutions. Complete archive of daily puzzles with step-by-step explanations and hints.`;

  return {
    title,
    description,
    keywords: [
      ...gameData.keywords,
      `${gameData.id} archive`,
      `${gameData.id} past answers`,
      `${gameData.id} history`,
      `all ${gameData.id} solutions`,
    ],
    alternates: {
      canonical: `${SITE_URL}/answers/${game}/archive`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/answers/${game}/archive`,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}${gameData.image}`,
          width: 1200,
          height: 630,
          alt: `${gameData.label} Archive`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ArchivePage({ params }: Props) {
  const { game } = await params;
  const gameData = PUZZLE_GAMES.find((g) => g.id === game);

  if (!gameData) return notFound();

  // Fetch actual available dates from backend
  const puzzles = await fetchPuzzles(game);
  const availableDates = [...new Set(puzzles.map(p => getPuzzleDate(p)))].sort((a, b) => b.localeCompare(a));

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${gameData.label} Archive`,
    description: `Complete archive of ${gameData.label} answers and solutions`,
    url: `${SITE_URL}/answers/${game}/archive`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    breadcrumb: {
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
          name: gameData.label,
          item: `${SITE_URL}/answers/${game}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Archive",
          item: `${SITE_URL}/answers/${game}/archive`,
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="min-h-screen bg-background">
        <AdBlock slot="top-banner" className="mb-6" />

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`/answers/${game}`} className="hover:text-foreground transition-colors">
              {gameData.label}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Archive</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">
                <Calendar className="w-4 h-4 mr-1" />
                Archive
              </Badge>
              <Badge variant="outline">{gameData.difficulty}</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {gameData.label} Archive
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              Browse all past {gameData.label} answers and solutions. Click any date to view the complete solution with hints and explanations.
            </p>

            {/* Quick Access to Today */}
            <Link href={`/answers/${game}/today`}>
              <Button size="lg" className="mb-6">
                <Clock className="w-5 h-5 mr-2" />
                View Today's Answer
              </Button>
            </Link>
          </header>

          {/* Introduction */}
          <section className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <p>
              Welcome to the complete <strong>{gameData.label} archive</strong>. Here you'll find 
              every past puzzle solution, organized by date for easy browsing. Each entry includes 
              the full answer, step-by-step hints, detailed explanations, and solving strategies.
            </p>
            <p>
              {gameData.description} Whether you're looking to review a puzzle you missed or 
              studying patterns to improve your solving skills, this archive has everything you need.
            </p>
          </section>

          {/* Available Solutions */}
          {availableDates.length > 0 ? (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-8 h-8 text-primary" />
                All Available Solutions ({availableDates.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableDates.map((dateStr) => (
                  <Link
                    key={dateStr}
                    href={`/answers/${game}/${dateStr}`}
                    className="p-4 bg-card rounded-lg border hover:border-primary transition-all hover:shadow text-center group"
                  >
                    <p className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">
                      {formatDate(dateStr)}
                    </p>
                    <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      View Answer
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No solutions available yet.</p>
              <p className="mt-2">Check back soon for new puzzle solutions.</p>
            </div>
          )}

          {/* SEO Content */}
          <section className="prose prose-lg dark:prose-invert max-w-none mb-8 p-6 bg-card rounded-xl border">
            <h2>About {gameData.label}</h2>
            <p>
              {gameData.description} This puzzle has become one of the most popular daily 
              challenges on LinkedIn, with thousands of players competing to maintain their 
              solving streaks.
            </p>
            <h3>How to Use This Archive</h3>
            <ul>
              <li>Click any date to view the complete solution for that day</li>
              <li>Each solution includes hints, explanations, and solving strategies</li>
              <li>Use the archive to study patterns and improve your solving skills</li>
              <li>Bookmark this page to quickly access past puzzles</li>
            </ul>
            <h3>Why Keep an Archive?</h3>
            <p>
              Having access to past {gameData.label} solutions helps you:
            </p>
            <ul>
              <li>Learn from previous puzzles to improve your strategy</li>
              <li>Catch up on puzzles you missed</li>
              <li>Verify your own solutions against official answers</li>
              <li>Study difficulty patterns and trends over time</li>
            </ul>
          </section>

          {/* Related Links */}
          <section className="mb-8 p-6 bg-card rounded-xl border">
            <h3 className="text-xl font-semibold mb-4">More Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href={`/answers/${game}/today`} className="text-primary hover:underline">
                🔥 Today's {gameData.label} Answer
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

          {/* Other Games */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Other LinkedIn Puzzles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PUZZLE_GAMES.filter((g) => g.id !== game).map((otherGame) => (
                <Link
                  key={otherGame.id}
                  href={`/answers/${otherGame.id}/archive`}
                  className="p-4 bg-card rounded-xl border hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold mb-2">{otherGame.label}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {otherGame.description}
                  </p>
                  <Badge variant="outline">{otherGame.difficulty}</Badge>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

// Enable ISR
export const revalidate = 3600; // Revalidate every hour