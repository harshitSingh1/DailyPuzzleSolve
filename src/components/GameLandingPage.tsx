import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import JsonLd from "@/components/JsonLd";
import AdBlock from "@/components/ads/AdBlock";
import { PUZZLE_GAMES, SITE_URL, SITE_NAME } from "@/lib/constants";
import PuzzleIcon from "@/components/PuzzleIcon";

// Generate dates for the last 30 days
function generateRecentDates(count: number = 30) {
  const dates = [];
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push({
      date: date.toISOString().split("T")[0],
      formatted: date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      shortFormatted: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      isToday: i === 0,
      isThisWeek: i < 7,
    });
  }
  return dates;
}

interface GameLandingPageProps {
  gameId: string;
}

export default function GameLandingPage({ gameId }: GameLandingPageProps) {
  const gameData = PUZZLE_GAMES.find((g) => g.id === gameId);
  
  if (!gameData) return null;

  const recentDates = generateRecentDates(30);
  const today = recentDates[0];
  const thisWeek = recentDates.filter((d) => d.isThisWeek);
  const older = recentDates.filter((d) => !d.isThisWeek);

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
            <Link href={`/answers/${gameId}/${today.date}`}>
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
              {gameData.description} Find today's answer or browse through our extensive 
              collection of past puzzles with detailed solutions.
            </p>
            <p>
              Each answer page includes progressive hints, step-by-step explanations, 
              strategy tips, and common mistakes to avoid. Whether you're stuck on today's 
              puzzle or studying patterns to improve your skills, you'll find everything 
              you need here.
            </p>
          </section>

          {/* Today's Answer - Featured */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Clock className="w-8 h-8 text-primary" />
              Today's Answer
            </h2>
            <Link
              href={`/answers/${gameId}/${today.date}`}
              className="block p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary hover:border-primary/80 transition-all hover:shadow-lg group"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <Badge variant="default" className="mb-2">
                    Latest
                  </Badge>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {today.formatted}
                  </h3>
                </div>
                <ArrowRight className="w-8 h-8 text-primary group-hover:translate-x-2 transition-transform" />
              </div>
              <p className="text-muted-foreground">
                Click to view today's complete solution with hints and explanations
              </p>
            </Link>
          </section>

          {/* This Week Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-8 h-8 text-primary" />
              This Week's Answers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {thisWeek.slice(1).map((dateInfo) => (
                <Link
                  key={dateInfo.date}
                  href={`/answers/${gameId}/${dateInfo.date}`}
                  className="group p-6 bg-card rounded-xl border hover:border-primary transition-all hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {dateInfo.shortFormatted}
                      </p>
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {dateInfo.formatted.split(",")[0]}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    <span>View Solution</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Previous Answers Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Previous Answers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {older.map((dateInfo) => (
                <Link
                  key={dateInfo.date}
                  href={`/answers/${gameId}/${dateInfo.date}`}
                  className="p-4 bg-card rounded-lg border hover:border-primary transition-all hover:shadow text-center group"
                >
                  <p className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">
                    {dateInfo.shortFormatted}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    View Answer
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* View Full Archive */}
          <section className="mb-12 text-center">
            <Link href={`/answers/${gameId}/archive`}>
              <Button size="lg" variant="outline">
                <Calendar className="w-5 h-5 mr-2" />
                View Full Archive (60+ Days)
              </Button>
            </Link>
          </section>

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
              <li>Browse this week's answers for recent puzzles</li>
              <li>Scroll down to find answers from previous weeks</li>
              <li>Visit the full archive for 60+ days of solutions</li>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PUZZLE_GAMES.filter((g) => g.id !== gameId).slice(0, 3).map((otherGame) => (
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
