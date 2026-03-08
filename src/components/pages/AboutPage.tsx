"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import {
  Target,
  Crown,
  Disc,
  ArrowUpDown,
  Zap,
  Grid3x3,
  Gamepad2,
  Wrench,
  BookOpen,
  ShoppingCart,
  Smile,
  CheckCircle,
} from "lucide-react";

import { SITE_NAME } from "@/lib/constants";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
    <h2 className="mb-3 font-display text-xl font-bold">{title}</h2>
    <div className="text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

export default function AboutPage() {
  return (
    <main className="pt-6 pb-12">
      <div className="container max-w-4xl">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* Header */}

          <div className="mb-10 text-center">
            <h1 className="mb-3 font-display text-3xl font-extrabold sm:text-4xl">
              About {SITE_NAME}
            </h1>

            <p className="text-lg text-muted-foreground">
              Your trusted daily companion for LinkedIn puzzle solutions and brain training resources
            </p>
          </div>

          <div className="space-y-8">

            {/* Who We Are */}

            <Section title="Who We Are">
              <p>
                LogicPuzzleHub was founded in early 2025 by a small group of puzzle enthusiasts who were frustrated by the lack of reliable explanations for LinkedIn’s daily puzzle games. What began as a personal habit of documenting daily puzzle answers quickly evolved into a growing educational platform visited by thousands of puzzle players each day.
              </p>

              <p className="mt-3">
                Our team includes competitive puzzle solvers, software developers, and content writers who share a passion for logic puzzles and problem solving. We work remotely across India and collaborate daily to publish accurate solutions, helpful guides, and strategy resources.
              </p>
            </Section>

            {/* Mission */}

            <Section title="Our Mission">
              <p>
                Our mission is simple: make daily logic puzzles enjoyable instead of frustrating. When players get stuck on puzzles like Pinpoint or Queens, we provide step-by-step explanations so they can understand the reasoning behind each move.
              </p>

              <p className="mt-3">
                Instead of simply revealing the final answer, our guides focus on the solving process. Each solution page contains annotated screenshots, reasoning explanations, hints for partial help, and strategy tips that help players improve over time.
              </p>
            </Section>

            {/* Puzzle Coverage */}

            <Section title="What We Cover">
              <p>We publish daily solutions for all LinkedIn puzzle games:</p>

              <ul className="mt-3 space-y-2 text-muted-foreground">

                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 mt-0.5 text-primary" />
                  <span><strong>Pinpoint:</strong> Discover the hidden connection between four words.</span>
                </li>

                <li className="flex items-start gap-2">
                  <Crown className="h-4 w-4 mt-0.5 text-primary" />
                  <span><strong>Queens:</strong> Place queens across the board using logical elimination.</span>
                </li>

                <li className="flex items-start gap-2">
                  <Disc className="h-4 w-4 mt-0.5 text-primary" />
                  <span><strong>Tango:</strong> Solve adjacency puzzles using constraint logic.</span>
                </li>

                <li className="flex items-start gap-2">
                  <ArrowUpDown className="h-4 w-4 mt-0.5 text-primary" />
                  <span><strong>Crossclimb:</strong> A crossword ladder where each row changes one letter.</span>
                </li>

                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 mt-0.5 text-primary" />
                  <span><strong>Zip:</strong> Connect numbers sequentially across the grid.</span>
                </li>

                <li className="flex items-start gap-2">
                  <Grid3x3 className="h-4 w-4 mt-0.5 text-primary" />
                  <span><strong>Mini Sudoku:</strong> Solve compact Sudoku puzzles using standard logic.</span>
                </li>

              </ul>
            </Section>

            {/* Beyond Solutions */}

            <Section title="Beyond Puzzle Answers">
              <p>
                LogicPuzzleHub also provides additional resources that help puzzle players and programmers sharpen their thinking skills.
              </p>

              <ul className="mt-3 space-y-2 text-muted-foreground">

                <li className="flex gap-2">
                  <Gamepad2 className="h-4 w-4 text-primary mt-0.5"/>
                  <span>
                    <strong><Link href="/games" className="text-primary hover:underline">Games Directory</Link>:</strong>
                    Discover new brain-training puzzles.
                  </span>
                </li>

                <li className="flex gap-2">
                  <Wrench className="h-4 w-4 text-primary mt-0.5"/>
                  <span>
                    <strong><Link href="/tools" className="text-primary hover:underline">Developer Tools</Link>:</strong>
                    Free coding utilities for puzzle solving and programming.
                  </span>
                </li>

                <li className="flex gap-2">
                  <BookOpen className="h-4 w-4 text-primary mt-0.5"/>
                  <span>
                    <strong><Link href="/blog" className="text-primary hover:underline">Blog</Link>:</strong>
                    Puzzle strategies and learning guides.
                  </span>
                </li>

                <li className="flex gap-2">
                  <ShoppingCart className="h-4 w-4 text-primary mt-0.5"/>
                  <span>
                    <strong><Link href="/shop" className="text-primary hover:underline">Shop</Link>:</strong>
                    Reviewed puzzle books and brain games.
                  </span>
                </li>

                <li className="flex gap-2">
                  <Smile className="h-4 w-4 text-primary mt-0.5"/>
                  <span>
                    <strong><Link href="/memes" className="text-primary hover:underline">Memes</Link>:</strong>
                    Programming humor and developer memes.
                  </span>
                </li>

              </ul>
            </Section>

            {/* Values */}

            <Section title="Our Values">

              <ul className="space-y-2 text-muted-foreground">

                <li className="flex gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5"/>
                  <span><strong>Accuracy:</strong> Every puzzle solution is verified before publishing.</span>
                </li>

                <li className="flex gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5"/>
                  <span><strong>Speed:</strong> Solutions are posted within 30 minutes.</span>
                </li>

                <li className="flex gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5"/>
                  <span><strong>Free Access:</strong> All puzzle answers remain free for everyone.</span>
                </li>

                <li className="flex gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5"/>
                  <span><strong>Transparency:</strong> Affiliate links are disclosed clearly.</span>
                </li>

              </ul>

            </Section>

            {/* Independent */}

            <Section title="Independent Website">

              <p>
                LogicPuzzleHub is an independent website and is not affiliated with LinkedIn Corporation. All puzzle names belong to their respective owners. Our solutions represent independent editorial analysis.
              </p>

            </Section>

            {/* Contact */}

            <Section title="Get in Touch">

              <p>
                If you discover an error in a solution or want to suggest improvements, please visit our{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  contact page
                </Link>.
              </p>

              <p className="mt-3">
                Thank you for being part of the LogicPuzzleHub community.
              </p>

            </Section>

          </div>

        </motion.div>
      </div>
    </main>
  );
}