// src\pages\about.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Crown, Disc, ArrowUpDown, Zap, Grid3x3, Gamepad2, Wrench, BookOpen, ShoppingCart, Smile, CheckCircle, Shield } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

const About = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${SITE_NAME}`,
    description: "Learn about PuzzleLogicHub's mission, team, and commitment to providing daily puzzle solutions and educational resources.",
    url: `${SITE_URL}/about`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo1.png` },
    },
  };

  return (
    <>
      <SEOHead
        title="About PuzzleLogicHub – Our Mission & Story"
        description="Learn about PuzzleLogicHub, our mission to provide daily LinkedIn puzzle solutions, and how our team of puzzle enthusiasts builds the best free resource for logic puzzles."
        path="/about"
        jsonLd={jsonLd}
      />
      <main className="pt-6 pb-12">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="mb-10 text-center">
              <h1 className="mb-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
                About {SITE_NAME}
              </h1>
              <p className="text-lg text-muted-foreground">
                Your trusted daily companion for LinkedIn puzzle solutions and brain training resources
              </p>
            </div>

            <div className="space-y-8">
              <Section title="Who We Are">
                <p>
                  PuzzleLogicHub was founded in early 2025 by a small group of puzzle enthusiasts who were frustrated by the lack of reliable, well-explained solutions for LinkedIn's daily puzzle games. What started as a personal habit of documenting daily answers quickly grew into a full-fledged educational platform that thousands of players visit every day.
                </p>
                <p className="mt-3">
                  Our team includes competitive puzzle solvers, software developers, and content writers who share a common passion: making logic puzzles accessible and enjoyable for everyone, regardless of experience level. We are based across India and work remotely to bring you fresh solutions every single day.
                </p>
              </Section>

              <Section title="Our Mission">
                <p>
                  Our mission is straightforward: help people solve daily puzzles without the frustration. We believe that puzzles should be fun, not stressful. Whether you are stuck on today's Pinpoint answer or trying to understand how Queens placement logic works, our guides walk you through every step with clear explanations, annotated screenshots, and video walkthroughs.
                </p>
                <p className="mt-3">
                  Beyond just giving answers, we focus on teaching the reasoning behind each solution. We want our readers to become better puzzle solvers over time, not just copy answers. That is why every solution page includes strategy tips, common patterns, and a hints section for those who want a nudge rather than the full answer.
                </p>
              </Section>

              <Section title="What We Cover">
                <p>We provide daily solutions and strategy guides for all six LinkedIn puzzle games:</p>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2"><Target className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong>Pinpoint:</strong> Identify the common thread connecting four seemingly unrelated words. Our guides break down each clue and explain the connection logic.</span></li>
                  <li className="flex items-start gap-2"><Crown className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong>Queens:</strong> Place queens on a grid without any two sharing the same row, column, or color region. We show the elimination process step by step.</span></li>
                  <li className="flex items-start gap-2"><Disc className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong>Tango:</strong> Fill a grid with suns and moons following adjacency rules. Our solutions highlight the constraint patterns that lead to the answer.</span></li>
                  <li className="flex items-start gap-2"><ArrowUpDown className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong>Crossclimb:</strong> Solve a hybrid crossword-ladder puzzle where each row differs by one letter. We explain both the word definitions and the letter swaps.</span></li>
                  <li className="flex items-start gap-2"><Zap className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong>Zip:</strong> Connect numbers in sequence across a grid. Our guides trace the optimal path and explain dead-end avoidance strategies.</span></li>
                  <li className="flex items-start gap-2"><Grid3x3 className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong>Mini Sudoku:</strong> Fill a compact Sudoku grid using standard logic. We cover naked singles, hidden singles, and other techniques you can apply daily.</span></li>
                </ul>
              </Section>

              <Section title="How Our Solutions Work">
                <p>
                  Every morning, our team solves each LinkedIn puzzle as soon as it goes live. Within 30 minutes, we publish a complete solution page that includes annotated screenshots showing every step, a detailed text explanation of the reasoning, progressive hints for players who prefer to solve it themselves, and a video walkthrough for visual learners.
                </p>
                <p className="mt-3">
                  We also run a countdown timer on the homepage so you know exactly when fresh solutions will be posted. Our goal is to be the fastest and most thorough LinkedIn puzzle answer source on the internet.
                </p>
              </Section>

              <Section title="Beyond Solutions">
                <p>PuzzleLogicHub is more than just an answer sheet. Here is what else you will find on our site:</p>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2"><Gamepad2 className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong><Link to="/games" className="text-primary hover:underline">Games Directory:</Link></strong> Discover other brain-training puzzles and logic games you might enjoy beyond LinkedIn's offerings.</span></li>
                  <li className="flex items-start gap-2"><Wrench className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong><Link to="/tools" className="text-primary hover:underline">Developer Tools:</Link></strong> A curated collection of free online tools for puzzle solvers and programmers, hand-picked for quality and usefulness.</span></li>
                  <li className="flex items-start gap-2"><BookOpen className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong><Link to="/blog" className="text-primary hover:underline">Blog:</Link></strong> Articles on puzzle-solving strategies, cognitive benefits of brain training, and updates about new puzzle games.</span></li>
                  <li className="flex items-start gap-2"><ShoppingCart className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong><Link to="/shop" className="text-primary hover:underline">Shop:</Link></strong> Reviewed and compared puzzle books, strategy games, and brain-training products for all skill levels.</span></li>
                  <li className="flex items-start gap-2"><Smile className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong><Link to="/memes" className="text-primary hover:underline">Memes:</Link></strong> A curated feed of programming and puzzle humor from Reddit and other sources, because solving puzzles should come with a few laughs.</span></li>
                </ul>
              </Section>

              <Section title="Our Values">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong>Accuracy First:</strong> We double-check every solution before publishing. If we make a mistake, we fix it immediately and note the correction.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong>Speed Matters:</strong> Fresh solutions are posted within 30 minutes of each puzzle going live, so you never wait long.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong>Free for Everyone:</strong> All solutions and guides are completely free. We keep the lights on through non-intrusive advertising and affiliate recommendations.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong>Transparency:</strong> We clearly disclose affiliate links and maintain editorial independence. Read our full <Link to="/disclaimer" className="text-primary hover:underline">Disclaimer</Link> for details.</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" /> <span><strong>Community Driven:</strong> Reader feedback shapes our content. If you spot an error or have a suggestion, we genuinely want to hear it.</span></li>
                </ul>
              </Section>

              <Section title="Independent & Unaffiliated">
                <p>
                  PuzzleLogicHub is an independent website. We are <strong>not affiliated with, endorsed by, or sponsored by LinkedIn Corporation</strong>. All puzzle names and trademarks mentioned on this site belong to their respective owners. Our content represents independent editorial analysis and is created solely for educational purposes.
                </p>
              </Section>

              <Section title="Get in Touch">
                <p>
                  Have a question, found an error in a solution, or want to suggest a feature? We would love to hear from you. Visit our{" "}
                  <Link to="/contact" className="text-primary hover:underline">Contact page</Link> to send us a message. We typically respond within 24 hours.
                </p>
                <p className="mt-3">
                  You can also follow us on social media for instant solution alerts and puzzle tips. Thank you for being part of the PuzzleLogicHub community.
                </p>
              </Section>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
    <h2 className="mb-3 font-display text-xl font-bold text-foreground">{title}</h2>
    <div className="text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

export default About;
