import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PUZZLE_GAMES } from "@/lib/constants";

const TodaysPuzzles = memo(() => {
  return (
    <section id="puzzles" className="py-4 sm:py-8">
      <div className="container">
        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3">
          {PUZZLE_GAMES.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg h-full">
                {/* Image */}
                <div className="h-24 sm:h-36 lg:h-44 overflow-hidden bg-muted">
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
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <h3 className="mb-0.5 sm:mb-1 font-display text-sm sm:text-base lg:text-lg font-bold text-foreground leading-tight">
                    {game.label.replace("LinkedIn ", "")} Answer
                  </h3>
                  <p className="mb-2 sm:mb-3 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {game.description}
                  </p>
                  <Button
                    asChild
                    size="sm"
                    className="mt-auto w-full rounded-full font-display text-xs sm:text-sm font-semibold transition-transform hover:scale-[1.02]"
                  >
                    <Link to={`/solutions/${game.id}`}>View Answer</Link>
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
