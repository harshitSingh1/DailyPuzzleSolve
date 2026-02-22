import { Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/home/HeroSection";
import TodaysPuzzles from "@/components/home/TodaysPuzzles";
import FAQSection from "@/components/home/FAQSection";
import WhatsNewSection from "@/components/home/WhatsNewSection";
import AdBlock from "@/components/ads/AdBlock";
import { SITE_DESCRIPTION, SITE_URL, SITE_NAME, PUZZLE_GAMES } from "@/lib/constants";



const today = new Date().toISOString().split("T")[0];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    dateModified: today,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo1.png` },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/solutions/{search_term_string}` },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: PUZZLE_GAMES.length,
      itemListElement: PUZZLE_GAMES.map((game, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Game",
          name: game.label,
          description: game.description,
          url: `${SITE_URL}/solutions/${game.id}`,
          image: `${SITE_URL}${game.image}`,
        },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    dateModified: today,
    mainEntity: [
      {
        "@type": "Question",
        name: "What LinkedIn puzzle solutions are available today?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Today's solutions cover LinkedIn Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku puzzles, all updated daily with step-by-step guides.",
        },
      },
      {
        "@type": "Question",
        name: "How often are puzzle solutions updated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Solutions are updated daily within 30 minutes of each new puzzle going live on LinkedIn.",
        },
      },
    ],
  },
];

const Index = () => {
  return (
    <>
      <SEOHead
        title={`Today's LinkedIn Puzzle Solutions (${today}) – Step-by-Step Guides`}
        description={SITE_DESCRIPTION}
        path="/"
        datePublished="2025-01-01"
        dateModified={today}
        jsonLd={jsonLd}
      />

      <main>
        <HeroSection />
        {/* Ad below hero */}
        <AdBlock slot="5934836566" format="leaderboard" lazy={false} minHeight={90} className="my-2" />

        {/* Puzzles section heading with freshness signal */}
        <div className="container pt-6 pb-2 text-center">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            Today's Puzzle Solutions
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Updated daily · <time dateTime={today}>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</time>
          </p>
        </div>

        <TodaysPuzzles />

        {/* Mid-page ad */}
        <AdBlock slot="5934836566" format="leaderboard" lazy={true} minHeight={90} className="my-4" />

        <WhatsNewSection />

        <FAQSection />

        {/* Related puzzles / internal linking */}
        <section className="py-8 sm:py-10 bg-muted/30">
          <div className="container">
            <h2 className="mb-4 text-center font-display text-xl font-bold">Popular Puzzle Guides</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {PUZZLE_GAMES.map((g) => (
                <a
                  key={g.id}
                  href={`/solutions/${g.id}`}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
                >
                  {g.emoji} {g.label} Solution Today
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

    </>
  );
};

export default Index;
