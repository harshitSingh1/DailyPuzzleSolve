import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import JsonLd from "@/components/JsonLd";
import AdBlock from "@/components/ads/AdBlock";
import { fetchPuzzles } from "@/lib/api";
import { PUZZLE_GAMES, SITE_URL, SITE_NAME } from "@/lib/constants";
import PuzzleIcon from "@/components/PuzzleIcon";
import { getPuzzleDate } from "@/lib/solutionUtils";

interface GameLandingPageProps {
  gameId: string;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default async function GameLandingPage({ gameId }: GameLandingPageProps) {
  const gameData = PUZZLE_GAMES.find((g) => g.id === gameId);
  
  if (!gameData) return null;

  const puzzles = await fetchPuzzles(gameId);
  const availableDates = [...new Set(puzzles.map(p => getPuzzleDate(p)))].sort((a, b) => b.localeCompare(a));
  const recentSolutions = availableDates.slice(0, 10);
  
  const today = new Date().toISOString().split("T")[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${gameData.label} Answers`,
    description: `Complete collection of ${gameData.label} answers and solutions`,
    url: `${SITE_URL}/answers/${gameId}`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
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
            <span className="text-foreground font-medium">{gameData.label}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <PuzzleIcon icon={gameData.icon} className="w-10 h-10 text-primary" />
              <Badge variant="secondary">All Answers</Badge>
              <Badge variant="outline">{gameData.difficulty}</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {gameData.label} Answers
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              Complete archive of daily {gameData.label} answers with step-by-step solutions, hints, and explanations.
            </p>

            {/* Quick Access to Today */}
            <Link href={`/answers/${gameId}/${today}`}>
              <Button size="lg" className="mb-6">
                <Clock className="w-5 h-5 mr-2" />
                View Today's Answer
              </Button>
            </Link>
          </header>

          {/* Introduction */}
          <section className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <p>
              Welcome to the complete <strong>{gameData.label} answers archive</strong>. 
              {gameData.description} Find today's answer or browse through our collection 
              of past puzzles with detailed solutions.
            </p>
            <p>
              Each answer page includes progressive hints, step-by-step explanations, 
              strategy tips, and common mistakes to avoid. Whether you're stuck on today's 
              puzzle or studying patterns to improve your skills, you'll find everything 
              you need here.
            </p>
          </section>

          {/* Today's Answer - Featured */}
          {recentSolutions.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-8 h-8 text-primary" />
                Today's Answer
              </h2>
              <Link
                href={`/answers/${gameId}/${recentSolutions[0]}`}
                className="block p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary hover:border-primary/80 transition-all hover:shadow-lg group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <Badge variant="default" className="mb-2">
                      Latest
                    </Badge>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {formatDate(recentSolutions[0])}
                    </h3>
                  </div>
                  <ArrowRight className="w-8 h-8 text-primary group-hover:translate-x-2 transition-transform" />
                </div>
                <p className="text-muted-foreground">
                  Click to view the complete solution with hints and explanations
                </p>
              </Link>
            </section>
          )}

          {/* Previous Solutions - Only show actual available solutions */}
          {recentSolutions.length > 1 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">
                Previous {recentSolutions.length} Solutions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {recentSolutions.slice(1).map((dateInfo) => (
                  <Link
                    key={dateInfo}
                    href={`/answers/${gameId}/${dateInfo}`}
                    className="p-4 bg-card rounded-lg border hover:border-primary transition-all hover:shadow text-center group"
                  >
                    <p className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">
                      {formatDate(dateInfo)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      View Answer
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* About Section */}
          <section className="prose prose-lg dark:prose-invert max-w-none mb-8 p-6 bg-card rounded-xl border">
            <h2>About {gameData.label}</h2>
            <p>
              {gameData.description} This puzzle has become one of the most popular daily 
              challenges on LinkedIn, with thousands of players competing to maintain their 
              solving streaks.
            </p>
            <h3>How to Use This Page</h3>
            <ul>
              <li>Click "Today's Answer" for the latest solution</li>
              <li>Scroll down to find previous solutions</li>
              <li>Each answer page includes hints, explanations, and strategies</li>
            </ul>
            <h3>Why Daily Solutions Matter</h3>
            <p>
              Having access to daily {gameData.label} solutions helps you:
            </p>
            <ul>
              <li>Maintain your solving streak without frustration</li>
              <li>Learn new strategies from detailed explanations</li>
              <li>Understand the logic behind each puzzle</li>
              <li>Improve your skills over time</li>
              <li>Save time when you're stuck</li>
            </ul>
          </section>

          {/* Related Games */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Other LinkedIn Puzzles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PUZZLE_GAMES.filter((g) => g.id !== gameId).map((otherGame) => (
                <Link
                  key={otherGame.id}
                  href={`/answers/${otherGame.id}`}
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
