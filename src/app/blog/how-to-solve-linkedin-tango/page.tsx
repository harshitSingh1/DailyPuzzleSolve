import { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import AdBlock from "@/components/ads/AdBlock";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

const today = new Date().toISOString().split("T")[0];

export const metadata: Metadata = {
  title: "How to Solve LinkedIn Tango Puzzle - Expert Line Drawing Strategies",
  description: "Master LinkedIn Tango puzzles with balance matching, triple rule techniques, dead-end avoidance, and systematic line drawing methods for consistent wins.",
  keywords: [
    "linkedin tango puzzle solution",
    "how to solve linkedin tango",
    "linkedin tango strategy",
    "tango puzzle tips",
    "non-crossing lines puzzle",
    "balance matching puzzle",
    "linkedin tango daily answer"
  ],
  alternates: {
    canonical: `${SITE_URL}/blog/how-to-solve-linkedin-tango`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HowToSolveTango() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Solve LinkedIn Tango Puzzle - Expert Line Drawing Strategies",
    description: "Master LinkedIn Tango puzzles with balance matching techniques.",
    datePublished: "2025-01-25",
    dateModified: today,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo1.png`,
      },
    },
    image: `${SITE_URL}/images/tango-game.png`,
    mainEntityOfPage: `${SITE_URL}/blog/how-to-solve-linkedin-tango`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="pt-6 pb-12">
        <div className="container max-w-3xl mx-auto px-4">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">How to Solve LinkedIn Tango</span>
          </nav>

          <article className="prose prose-lg dark:prose-invert max-w-none">

            {/* Title */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                How to Solve LinkedIn Tango Puzzle: Expert Line Drawing Strategies
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>By {SITE_NAME} Team</span>
                <span>•</span>
                <time dateTime={today}>{today}</time>
                <span>•</span>
                <span>11 min read</span>
              </div>
            </header>

            {/* Hero Image */}
            <figure className="mb-8">
              <img
                src="/images/tango-game.png"
                alt="LinkedIn Tango puzzle with colored dots requiring non-crossing line connections"
                className="w-full h-auto rounded-2xl shadow-xl"
                loading="eager"
                width="1200"
                height="630"
              />
              <figcaption className="mt-2 text-sm text-muted-foreground text-center">
                LinkedIn Tango: Connect same-color dots with non-crossing lines following balance rules
              </figcaption>
            </figure>

            {/* Top Ad */}
            <AdBlock slot="top-article" className="mb-8" />

            <div className="grid gap-8 text-lg leading-relaxed">

              <section>
                <h2 className="text-3xl font-bold mb-6">Tango Puzzle Rules Explained</h2>
                <p>
                  Tango presents a grid of colored dots. Your goal: draw lines connecting all dots of the same color without lines crossing. Each color family must be perfectly balanced - the number of "ends" on left/right and top/bottom must match.
                </p>
                <p className="mt-4">
                  The challenge lies in the <strong>global constraint</strong>: your local line choices must satisfy the overall balance requirements.
                </p>
              </section>

              <AdBlock slot="mid-article-1" className="my-8" />

              <section>
                <h2 className="text-3xl font-bold mb-6">Core Strategy: Balance Counting</h2>
                <p>
                  Before drawing any lines, count endpoints per direction:
                </p>
                <ul className="mt-4 space-y-2 pl-6 list-disc">
                  <li>Left column dots needing rightward lines</li>
                  <li>Right column dots needing leftward lines</li>
                  <li>Top row dots needing downward lines</li>
                  <li>Bottom row dots needing upward lines</li>
                </ul>
                <blockquote className="border-l-4 border-primary pl-6 italic bg-muted/50 p-4 rounded-r-lg my-6">
                  If left endpoints ≠ right endpoints for a color, immediate contradiction!
                </blockquote>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">The Triple Rule (Advanced Technique)</h2>
                <p>
                  When three dots of the same color form a triangle pattern, they must connect in a specific way:
                </p>
                <p className="my-4 p-4 bg-muted/50 rounded-lg font-mono text-sm">
                  Triangle Pattern → One central line connecting all three + outer loop
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Dead-End Avoidance</h2>
                <ul className="mt-4 space-y-3 pl-6 list-disc">
                  <li>Avoid "trapping" isolated dots</li>
                  <li>Check neighbor counts before connecting</li>
                  <li>Use "forced moves" - dots with only one possible direction</li>
                </ul>
              </section>

              <AdBlock slot="mid-article-2" className="my-8" />

              <section>
                <h2 className="text-3xl font-bold mb-6">Complete Solving Algorithm</h2>
                <ol className="mt-4 space-y-3 pl-6 list-decimal">
                  <li>Count balance for all colors</li>
                  <li>Identify forced single-direction dots</li>
                  <li>Draw all possible non-crossing connections</li>
                  <li>Verify global balance satisfied</li>
                </ol>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">FAQ</h2>
                <div className="space-y-4 mt-4">
                  <details className="p-4 border rounded-lg">
                    <summary className="font-semibold cursor-pointer">Can lines touch at endpoints only?</summary>
                    <p className="mt-2 text-muted-foreground">Yes, multiple lines can share endpoints but cannot cross or overlap segments.</p>
                  </details>
                  <details className="p-4 border rounded-lg">
                    <summary className="font-semibold cursor-pointer">What if balance doesn't match?</summary>
                    <p className="mt-2 text-muted-foreground">Your line drawing created an imbalance. Backtrack and find alternative routing.</p>
                  </details>
                </div>
              </section>

              <AdBlock slot="bottom-article" className="my-8" />

              <aside className="mt-12 p-6 bg-card rounded-xl border">
                <h3 className="text-xl font-bold mb-4">Related Guides</h3>
                <ul className="space-y-2">
                  <li><Link href="/blog/how-to-solve-linkedin-pinpoint" className="text-primary hover:underline">Pinpoint Word Association</Link></li>
                  <li><Link href="/blog/how-to-solve-linkedin-queens" className="text-primary hover:underline">Queens Constraint Solving</Link></li>
                  <li><Link href="/answers/tango/today" className="text-primary hover:underline">Today's Tango Solution</Link></li>
                </ul>
              </aside>

            </div>

          </article>
        </div>
      </main>
    </>
  );
}
