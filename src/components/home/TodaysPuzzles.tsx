import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PUZZLE_GAMES } from "@/lib/constants";

const TodaysPuzzles = memo(() => {
  return (
    <section id="puzzles" className="py-8 sm:py-10">
      <div className="container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PUZZLE_GAMES.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                {/* Image placeholder */}
                <div className="h-44 overflow-hidden bg-muted">
                  <img
                    src={game.image}
                    alt={`${game.label} - Daily Solutions and Walkthroughs`}
                    width={400}
                    height={176}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading={i < 3 ? "eager" : "lazy"}
                    decoding={i < 3 ? "sync" : "async"}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1 font-display text-lg font-bold text-foreground">
                    {game.label}
                  </h3>
                  <p className="mb-4 min-h-[3em] text-sm text-muted-foreground">
                    {game.description}
                  </p>
                  <Button
                    asChild
                    className="mt-auto w-full rounded-full font-display font-semibold transition-transform hover:scale-[1.02]"
                  >
                    <Link to={`/solutions/${game.id}`}>View Today's Solution</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

TodaysPuzzles.displayName = "TodaysPuzzles";

export default TodaysPuzzles;
