import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";
import AdBlock from "@/components/ads/AdBlock";
import { PUZZLE_GAMES, SITE_URL, SITE_NAME } from "@/lib/constants";

const today = new Date().toISOString().split("T")[0];
const todayLong = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

const Solutions = () => {
  return (
    <>
      <SEOHead
        title={`Daily LinkedIn Puzzle Solutions (${today}) – Pinpoint, Queens, Tango & More`}
        description={`Browse today's LinkedIn puzzle solutions: Pinpoint, Queens, Tango, Crossclimb, Zip & Mini Sudoku. Step-by-step screenshots and video walkthroughs updated daily. ${todayLong}.`}
        path="/solutions"
        datePublished="2025-01-01"
        dateModified={today}
        breadcrumbs={[{ name: "Solutions", url: `${SITE_URL}/solutions` }]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Daily LinkedIn Puzzle Solutions",
          url: `${SITE_URL}/solutions`,
          dateModified: today,
          publisher: { "@type": "Organization", name: SITE_NAME },
          hasPart: PUZZLE_GAMES.map((g) => ({
            "@type": "HowTo",
            name: `${g.label} Solution Today`,
            url: `${SITE_URL}/solutions/${g.id}`,
            image: `${SITE_URL}${g.image}`,
          })),
        }}
      />

      <main className="py-10 sm:py-14">
        <div className="container">
          <div className="mb-3 text-center">
            <h1 className="mb-2 font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Daily Puzzle Solutions
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
              <Badge variant="secondary" className="gap-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse inline-block" />
                Updated Today
              </Badge>
              <time dateTime={today} className="text-sm text-muted-foreground">{todayLong}</time>
            </div>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Choose a puzzle game below to see today's step-by-step solution with screenshots and video walkthroughs. Never lose your streak!
            </p>
          </div>

          {/* Top leaderboard */}
          <AdBlock slot="5934836566" format="leaderboard" lazy={false} minHeight={90} className="mb-8" />

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PUZZLE_GAMES.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="h-44 overflow-hidden bg-muted">
                    <img
                      src={game.image}
                      alt={`${game.label} – Daily Solution ${today}`}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading={i < 3 ? "eager" : "lazy"}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="mb-1 font-display text-lg font-bold">{game.label}</h2>
                    <p className="mb-4 min-h-[3em] text-sm text-muted-foreground">{game.description}</p>
                    <Button
                      asChild
                      className="mt-auto w-full rounded-full font-display font-semibold transition-transform hover:scale-[1.02]"
                    >
                      <Link to={`/solutions/${game.id}`}>View Today's Solution →</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom in-article ad */}
          <AdBlock slot="5934836566" format="in-article" layoutKey="-fb+5w+4e-db+86" lazy={true} minHeight={280} className="mt-10" />

          {/* SEO content */}
          <div className="mt-8 rounded-lg border border-border bg-card p-6 sm:p-8">
            <h2 className="mb-2 font-display text-xl font-bold">About Our Daily LinkedIn Puzzle Solutions</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every day, we publish complete solutions for all active LinkedIn puzzle games: Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku.
              Each guide includes annotated screenshots and a video walkthrough so you can quickly understand every step.
              Bookmark this page to get your daily fix and maintain your puzzle streak.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Solutions;
