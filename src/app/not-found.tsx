"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo } from "react";

const puzzlePieceClip = `polygon(0% 25%, 25% 25%, 25% 0%, 75% 0%, 75% 25%, 100% 25%, 100% 75%, 75% 75%, 75% 100%, 25% 100%, 25% 75%, 0% 75%)`;

export default function NotFound() {

  const floatingPieces = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: 15 + Math.random() * 10,
        xOffset: Math.random() * 50 - 25,
        rotateOffset: Math.random() * 90 - 45,
      })),
    []
  );

  return (
    <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-16">

      {/* Floating puzzle pieces background */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        {floatingPieces.map((p) => (

          <motion.div
            key={p.id}
            initial={{ y: 0, x: 0, rotate: 0 }}
            animate={{
              y: [0, -100, 0],
              x: [0, p.xOffset, 0],
              rotate: [0, p.rotateOffset, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute h-10 w-10 rounded-[10px] bg-primary/20"
            style={{
              top: p.top,
              left: p.left,
              clipPath: puzzlePieceClip,
            }}
          />

        ))}

      </div>

      {/* 404 number */}

      <div className="relative mb-8 text-center">

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >

          <span className="font-display text-[8rem] font-extrabold leading-none text-primary sm:text-[12rem]">
            404
          </span>

        </motion.div>

        {/* Decorative puzzle piece top */}

        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute -right-8 -top-4 h-[60px] w-[60px] rounded-[15px] bg-secondary"
          style={{ clipPath: puzzlePieceClip }}
        />

        {/* Decorative puzzle piece bottom */}

        <motion.div
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute -bottom-4 -left-8 h-[60px] w-[60px] rounded-[15px] bg-primary/60"
          style={{ clipPath: puzzlePieceClip }}
        />

      </div>

      {/* Message */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-8 text-center"
      >

        <h1 className="mb-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
          Missing Puzzle Piece
        </h1>

        <p className="mx-auto max-w-[600px] text-muted-foreground">
          We couldn&apos;t find the page you&apos;re looking for, but we&apos;ve got plenty
          of other puzzle solutions waiting for you!
        </p>

      </motion.div>

      {/* Buttons */}

      <div className="flex flex-wrap justify-center gap-3">

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>

          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-primary px-6 py-3 font-display font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
          >
            Return Home
          </Link>

        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>

          <Link
            href="/solutions"
            className="inline-flex items-center rounded-full border-2 border-primary px-6 py-3 font-display font-semibold text-primary transition-all hover:bg-primary/5"
          >
            Explore Puzzles
          </Link>

        </motion.div>

      </div>

    </main>
  );
}