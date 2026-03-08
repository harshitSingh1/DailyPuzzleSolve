"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = memo(() => {
  const scrollToPuzzles = () => {
    document
      .getElementById("puzzles")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden min-h-[220px] sm:min-h-[300px] md:min-h-[350px] flex flex-col">
      
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

      <div className="container relative z-10 flex flex-1 items-center py-6 sm:py-8">
        <div className="mx-auto max-w-[800px] text-center">

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 font-display text-[1.5rem] font-extrabold leading-[1.2] text-white sm:text-[2.2rem] md:text-[2.8rem]"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          >
            <span className="block">Master Logic Puzzles</span>
            <span className="block">Like Never Before</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-sm sm:text-base md:text-lg font-normal text-white/90"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
          >
            Today's Pinpoint, Queens, Tango, Crossclimb, Zip & Mini Sudoku answers with step-by-step guides.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-2"
          >
            <Button
              size="sm"
              className="rounded-full bg-white px-5 py-2 sm:px-8 sm:py-3 font-display text-sm sm:text-base font-semibold text-primary shadow-md hover:bg-white/90 hover:-translate-y-0.5 transition-all"
              onClick={scrollToPuzzles}
            >
              View Solutions
            </Button>

            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-full border-white bg-transparent px-5 py-2 sm:px-8 sm:py-3 font-display text-sm sm:text-base font-semibold text-white hover:bg-white/10 hover:border-white hover:-translate-y-0.5 transition-all"
            >
              <Link href="/games">More Games</Link>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;