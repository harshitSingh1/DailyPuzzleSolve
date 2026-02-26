import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = memo(() => {
  return (
    <section className="relative overflow-hidden min-h-[350px] sm:min-h-[400px] md:min-h-[450px] flex flex-col">
      {/* Relaunch banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden md:block w-full bg-white/10 backdrop-blur-sm border-b border-white/10 py-2.5 px-4 text-center"
      >
        <p
          className="text-sm font-medium text-white/95 sm:text-base"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
        >
          DailyPuzzleSolve is <span className="font-bold">BACK</span>. Faster, smoother, and better than ever. Never
          lose your puzzle streak again.
        </p>
      </motion.div>

      {/* Background image + blue gradient overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(to right,
              rgba(25, 59, 210, 0.52) 0%,
              rgba(9, 3, 131, 0.77) 50%,
              rgba(25, 59, 210, 0.52) 100%),
            url('/images/hero.jpeg')
          `,
        }}
      />
      <div className="container relative z-10 flex flex-1 items-center">
        <div className="mx-auto max-w-[800px] text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 font-display text-[2rem] font-extrabold leading-[1.2] text-white sm:text-[2.8rem] md:text-[3.2rem]"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          >
            <span className="block">Master Logic Puzzles</span>
            <span className="block">Like Never Before</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-[1.1rem] font-normal text-white/90 md:text-[1.25rem]"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
          >
            Today's Pinpoint, Queens, Tango, Crossclimb, Zip & Mini Sudoku answers with step-by-step guides.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-2"
          >
            <Button
              size="lg"
              className="rounded-full bg-white px-8 py-3 font-display font-semibold text-primary shadow-md hover:bg-white/90 hover:-translate-y-0.5 transition-all"
              onClick={() => document.getElementById("puzzles")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Solutions
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white bg-transparent px-8 py-3 font-display font-semibold text-white hover:bg-white/10 hover:border-white hover:-translate-y-0.5 transition-all"
            >
              <Link to="/games">More Games</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
