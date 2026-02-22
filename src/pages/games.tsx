import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Gamepad2, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";
import AdBlock from "@/components/ads/AdBlock";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

const GAMES: Game[] = [
  {
    id: "1",
    title: "Chess",
    description: "Master the king of strategy games. Sharpen focus, foresight, and mental stamina in every move.",
    image: "/images/chess.jpg",
    url: "https://www.chess.com/",
    tags: ["Strategy", "Puzzle", "Board"],
  },
  {
    id: "2",
    title: "Sudoku",
    description: "Train your brain with numbers. Classic Sudoku boosts logic, patience, and pattern recognition.",
    image: "/images/sudoku.jpeg",
    url: "https://sudoku.com/",
    tags: ["Focus", "Logic", "Puzzle"],
  },
  {
    id: "3",
    title: "Connect 4",
    description: "Think ahead and block your rival. Connect 4 is a fun and fast-paced tactical duel of minds.",
    image: "/images/connect-4.png",
    url: "https://www.sudoku.com",
    tags: ["Board", "Strategy", "Skill"],
  },
  {
    id: "4",
    title: "Checkers",
    description: "Simple yet smart. Checkers trains strategic thinking and helps develop sharp decision-making skills.",
    image: "/images/Checkers.png",
    url: "https://www.247checkers.com/",
    tags: ["Board", "Logic", "Strategy"],
  },
  {
    id: "5",
    title: "Minesweeper",
    description: "Uncover the field without blowing up! A perfect logic test packed into a classic brain teaser.",
    image: "/images/minesweepers.jpeg",
    url: "https://minesweeper.online",
    tags: ["Logic", "Focus", "Brain"],
  },
  {
    id: "6",
    title: "2048 Game",
    description: "Swipe to win! Merge tiles, reach 2048, and test your tactical thinking under pressure.",
    image: "/images/game2048.jpg",
    url: "https://2048game.com/",
    tags: ["Strategy", "Logic", "Brain"],
  },
];

const ALL_TAGS = [...new Set(GAMES.flatMap((g) => g.tags))];
const today = new Date().toISOString().split("T")[0];

const Games = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tagsRef = useRef<HTMLDivElement>(null);

  const filteredGames = selectedTags.length === 0
    ? GAMES
    : GAMES.filter((g) => g.tags.some((t) => selectedTags.includes(t)));

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const scrollTags = (dir: "left" | "right") => {
    tagsRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <>
      <SEOHead
        title="Best Brain Training Puzzle Games – Play Free Online"
        description="Challenge your mind with the best free puzzle and strategy games. Chess, Sudoku, Minesweeper, Connect 4, and more, curated to boost logic and problem-solving."
        path="/games"
        dateModified={today}
        breadcrumbs={[{ name: "Games", url: `${SITE_URL}/games` }]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Brain Training Puzzle Games",
          description: "The best free puzzle and strategy games to improve logic and cognitive skills.",
          dateModified: today,
          publisher: { "@type": "Organization", name: SITE_NAME },
          hasPart: GAMES.map((g) => ({
            "@type": "Game",
            name: g.title,
            description: g.description,
            url: g.url,
            image: `${SITE_URL}${g.image}`,
          })),
        }}
      />
      <main className="pt-6 pb-12">
        <div className="container">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <h1 className="mb-3 font-display text-3xl font-extrabold sm:text-4xl">
              <Gamepad2 className="mr-2 inline-block h-8 w-8 text-primary" />
              Brain Training Puzzle Games
            </h1>
            <p className="text-muted-foreground">Challenge your mind and improve cognitive skills with our curated game collection</p>

            {/* Tag Filter */}
            <div className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-1">
              <button onClick={() => scrollTags("left")} className="shrink-0 rounded-full p-1.5 text-primary hover:bg-accent" aria-label="Scroll left">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div ref={tagsRef} className="flex gap-2 overflow-x-auto scrollbar-none">
                {ALL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-all ${
                      selectedTags.includes(tag)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-primary/40 text-primary hover:bg-accent"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <button onClick={() => scrollTags("right")} className="shrink-0 rounded-full p-1.5 text-primary hover:bg-accent" aria-label="Scroll right">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Top leaderboard */}
          <AdBlock slot="5934836566" format="leaderboard" lazy={false} minHeight={90} className="mb-8" />

          {/* Games Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGames.length > 0 ? (
              filteredGames.map((game, i) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={game.image}
                        alt={`${game.title} – Free Online Puzzle Game`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading={i < 3 ? "eager" : "lazy"}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="mb-1.5 font-display text-lg font-bold">{game.title}</h2>
                      <p className="mb-3 flex-1 text-sm text-muted-foreground">{game.description}</p>
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {game.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button asChild className="w-full gap-2 rounded-full font-semibold">
                        <a href={game.url} target="_blank" rel="noopener noreferrer">
                          <Gamepad2 className="h-4 w-4" /> Play Now <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No games found matching your selected filters.
              </div>
            )}
          </div>

          {/* Ad before SEO content */}
          <AdBlock slot="5934836566" format="rectangle" lazy={true} minHeight={250} className="mt-8" />

          {/* SEO Content */}
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="mb-3 font-display text-xl font-bold">Why Play Brain Training Puzzle Games?</h2>
            <p className="mb-4 text-muted-foreground">
              Puzzle games offer more than entertainment. They&apos;re powerful cognitive tools. Regular play delivers measurable mental benefits:
            </p>
            <ul className="mb-4 space-y-1.5 text-sm text-muted-foreground">
              <li>🧠 <strong>Improved memory</strong> through pattern recall and working memory exercises</li>
              <li>⚡ <strong>Faster thinking</strong> with strategic decisions under time pressure</li>
              <li>🎯 <strong>Better focus</strong> from deep concentration and attention training</li>
              <li>🛡️ <strong>Stress relief</strong> via mindful engagement that reduces anxiety</li>
            </ul>
            <h3 className="mb-2 font-display text-base font-semibold">People Also Search For</h3>
            <div className="flex flex-wrap gap-2">
              {["free puzzle games online", "brain training games", "logic games for adults", "LinkedIn puzzle games", "daily puzzle games"].map((q) => (
                <span key={q} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{q}</span>
              ))}
            </div>
          </div>

          {/* Bottom rectangle */}
          <AdBlock slot="5934836566" format="rectangle" lazy={true} minHeight={250} className="mt-8" />
        </div>
      </main>
    </>
  );
};

export default Games;
