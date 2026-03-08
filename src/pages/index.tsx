// src\pages\index.tsx
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Puzzle, Wrench, BookOpen, ShoppingCart, Smile } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import TodaysPuzzles from "@/components/home/TodaysPuzzles";
import FAQSection from "@/components/home/FAQSection";
import WhatsNewSection from "@/components/home/WhatsNewSection";
import PuzzleCountdown from "@/components/PuzzleCountdown";
import AdBlock from "@/components/ads/AdBlock";
import PuzzleIcon from "@/components/PuzzleIcon";
import SocialShareButtons from "@/components/SocialShareButtons";
import { SITE_DESCRIPTION, SITE_URL, SITE_NAME, PUZZLE_GAMES } from "@/lib/constants";

const today = new Date().toISOString().split("T")[0];
const todayLong = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

const jsonLd = [
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "DailyPuzzleSolve",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  dateModified: today,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo1.png` }
  },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/solutions/{search_term_string}` },
    "query-input": "required name=search_term_string"
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: PUZZLE_GAMES.length,
    itemListElement: PUZZLE_GAMES.map((game, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Game",
        name: `${game.label} Answer Today`,
        description: game.description,
        url: `${SITE_URL}/solutions/${game.id}`,
        image: `${SITE_URL}${game.image}`
      }
    }))
  }
},
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  dateModified: today,
  mainEntity: [
  {
    "@type": "Question",
    name: "What are today's LinkedIn puzzle answers?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Today's LinkedIn puzzle answers cover Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku. All solutions are updated daily with step-by-step screenshots and video walkthroughs."
    }
  },
  {
    "@type": "Question",
    name: "How do I solve LinkedIn Pinpoint today?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Visit our LinkedIn Pinpoint solution page for today's answer with step-by-step screenshots, hints, and a video walkthrough. Updated within 30 minutes of the puzzle going live."
    }
  },
  {
    "@type": "Question",
    name: "Where can I find LinkedIn Queens puzzle answer today?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Our Queens puzzle solution page has today's complete answer with annotated screenshots showing every step. We also provide hints if you want to try solving it yourself first."
    }
  }]

}];


const Index = () => {
  return (
    <>
      <SEOHead
        title={`LinkedIn Puzzle Answers Today (${today})`}
        description="Get today's LinkedIn puzzle answers: Pinpoint, Queens, Tango, Crossclimb, Zip & Mini Sudoku. Step-by-step solutions with screenshots updated daily."
        path="/"
        datePublished="2025-01-01"
        dateModified={today}
        jsonLd={jsonLd} />
      

      <main>
        <HeroSection />

        {/* Interactive section first */}
        <div className="container pt-5 pb-2 text-center" id="puzzles">
          <h2 className="font-display text-xl font-extrabold sm:text-2xl">
            Today's LinkedIn Puzzle Answers
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Updated daily · <time dateTime={today}>{todayLong}</time>
          </p>
          <div className="mt-2 flex justify-center">
            <PuzzleCountdown />
          </div>
        </div>

        <TodaysPuzzles />

        <AdBlock slot="5934836566" format="leaderboard" lazy={true} minHeight={90} className="my-3" />

        <WhatsNewSection />

        {/* SEO Content below the fold */}
        <section className="py-8 sm:py-10">
          <div className="container max-w-4xl">
            <h2 className="mb-3 text-center font-display text-xl font-extrabold sm:text-2xl">
              What Are LinkedIn Puzzle Games?
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                LinkedIn launched a collection of daily puzzle games in 2024, and they quickly became one of the platform's most popular features. Every day, millions of professionals take a break from their feeds to solve Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku. These games test vocabulary, logic, pattern recognition, and spatial reasoning, and each one resets at the same time every day.
              </p>
              <p>The appeal of LinkedIn puzzles goes beyond entertainment. They have become a social phenomenon where colleagues compete for streaks, share scores on their profiles, and use daily puzzle performance as an icebreaker in meetings. The games are designed to be quick, most take between two and five minutes but they reward careful thinking over speed. That combination of accessibility and depth is why they have attracted such a large and engaged audience.

              </p>
              <p>PuzzleLogicHub exists because we know that feeling of being stuck on a puzzle with no reliable help available. Most search results are either outdated, incomplete, or buried under ads. We built this site to be the resource we wished we had: fast, accurate daily solutions with real explanations, not just screenshots of the final answer. Our team of puzzle enthusiasts publishes solutions within 15 minutes of each new puzzle going live, with annotated screenshots, step-by-step reasoning, progressive hints, and video walkthroughs.

              </p>
              <p>
                Whether you are a daily player looking to maintain your streak, a newcomer trying to understand how these puzzles work, or someone who enjoys the strategy behind solving them, PuzzleLogicHub is your daily companion. We cover all six LinkedIn games with the depth and speed that no other site matches. Bookmark this page and check back every day for fresh answers and new strategies.
              </p>
            </div>

            {/* Author byline */}
            <div className="mt-6 flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">PLH</div>
              <p>Updated daily by the {SITE_NAME} Editorial Team · <time dateTime={today}>{todayLong}</time></p>
            </div>

            {/* Trust signals */}
            <div className="mt-6 grid gap-3 grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-3 text-center shadow-sm">
                <p className="font-display text-xl font-extrabold text-primary">6</p>
                <p className="text-xs text-muted-foreground">Puzzles Daily</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-3 text-center shadow-sm">
                <p className="font-display text-xl font-extrabold text-primary">10 min</p>
                <p className="text-xs text-muted-foreground">Post Time</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-3 text-center shadow-sm">
                <p className="font-display text-xl font-extrabold text-primary">100%</p>
                <p className="text-xs text-muted-foreground">Free Access</p>
              </div>
            </div>

            {/* Category links */}
            <div className="mt-6">
              <h3 className="mb-2 text-center font-display text-base font-bold">Explore More</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/games" className="rounded-full border border-border bg-card px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all hover:border-primary hover:text-primary flex items-center gap-1"><Puzzle className="h-3.5 w-3.5" /> More Puzzles</Link>
                <Link to="/tools" className="rounded-full border border-border bg-card px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all hover:border-primary hover:text-primary flex items-center gap-1"><Wrench className="h-3.5 w-3.5" /> Tools</Link>
                <Link to="/blog" className="rounded-full border border-border bg-card px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all hover:border-primary hover:text-primary flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> Articles</Link>
                <Link to="/shop" className="rounded-full border border-border bg-card px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all hover:border-primary hover:text-primary flex items-center gap-1"><ShoppingCart className="h-3.5 w-3.5" /> Shop</Link>
                <Link to="/memes" className="rounded-full border border-border bg-card px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all hover:border-primary hover:text-primary flex items-center gap-1"><Smile className="h-3.5 w-3.5" /> Memes</Link>
              </div>
            </div>
          </div>
        </section>

        <AdBlock slot="5934836566" format="leaderboard" lazy={true} minHeight={90} className="my-3" />

        {/* Strategy articles */}
        <section className="py-8 sm:py-10 bg-muted/30">
          <div className="container max-w-5xl">
            <h2 className="mb-2 text-center font-display text-xl font-extrabold sm:text-2xl">
              Puzzle Strategy Articles
            </h2>
            <p className="mb-5 text-center text-xs sm:text-sm text-muted-foreground">
              In-depth guides written by our editorial team
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
              { title: "How to Solve LinkedIn Pinpoint Faster", path: "/blog/how-to-solve-linkedin-pinpoint", desc: "Master category thinking and elimination to guess in fewer clues.", time: "8 min" },
              { title: "Best Brain Training Techniques", path: "/blog/brain-training-techniques", desc: "Science-backed methods for memory, focus, and pattern recognition.", time: "10 min" },
              { title: "Daily Puzzle Strategy Guide", path: "/blog/daily-puzzle-strategy-guide", desc: "Complete strategies for all six LinkedIn puzzle games.", time: "12 min" }].
              map((a) =>
              <Link key={a.path} to={a.path} className="rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/50">
                  <h3 className="font-display text-sm sm:text-base font-bold text-foreground mb-1">{a.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">{a.desc}</p>
                  <span className="text-xs text-primary font-semibold">{a.time} read →</span>
                </Link>
              )}
            </div>
            <div className="mt-4 text-center">
              <Link to="/blog" className="text-sm font-semibold text-primary hover:underline">
                View all articles →
              </Link>
            </div>
          </div>
        </section>

        <FAQSection />

        {/* Share section */}
        <section className="py-6 sm:py-8">
          <div className="container max-w-2xl text-center">
            <h2 className="mb-2 font-display text-lg font-bold">Share Today's Puzzle Answers</h2>
            <p className="mb-3 text-sm text-muted-foreground">Help your friends solve today's LinkedIn puzzles</p>
            <SocialShareButtons
              url={SITE_URL}
              title={`LinkedIn Puzzle Answers Today (${today}) – Pinpoint, Queens, Tango Solutions`}
              className="justify-center" />
            
          </div>
        </section>

        {/* Related puzzles / internal linking */}
        <section className="py-6 sm:py-8 bg-muted/30">
          <div className="container">
            <h2 className="mb-3 text-center font-display text-lg font-bold">Popular LinkedIn Puzzle Answers</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {PUZZLE_GAMES.map((g) =>
              <Link
                key={g.id}
                to={`/solutions/${g.id}`}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs sm:text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary">
                
                  <PuzzleIcon icon={g.icon} className="h-4 w-4 inline-block mr-1" />{g.label} Answer Today
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
    </>);

};

export default Index;