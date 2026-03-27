import { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import AdBlock from "@/components/ads/AdBlock";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

const today = new Date().toISOString().split("T")[0];

export const metadata: Metadata = {
  title: "How to Solve LinkedIn Mini Sudoku - Compact Grid Strategies",
  description: "Master LinkedIn Mini Sudoku with naked pairs, hidden singles, X-wing techniques, and systematic row/column/box elimination for fast compact grid solves.",
  keywords: [
    "linkedin mini sudoku solution",
    "how to solve mini sudoku",
    "linkedin mini sudoku strategy",
    "mini sudoku tips",
    "sudoku techniques",
    "compact sudoku solving",
    "linkedin sudoku answer"
  ],
  alternates: {
    canonical: `${SITE_URL}/blog/how-to-solve-linkedin-mini-sudoku`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HowToSolveMiniSudoku() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Solve LinkedIn Mini Sudoku - Compact Grid Expert Strategies",
    description: "Master LinkedIn Mini Sudoku with advanced techniques.",
    datePublished: "2025-02-10",
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
    image: `${SITE_URL}/images/mini-sudoku.png`,
    mainEntityOfPage: `${SITE_URL}/blog/how-to-solve-linkedin-mini-sudoku`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="pt-6 pb-12">
        <div className="container max-w-3xl mx-auto px-4">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground font-medium">How to Solve LinkedIn Mini Sudoku</span>
          </nav>

          <article className="prose prose-lg dark:prose-invert max-w-none">

            {/* Title */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                How to Solve LinkedIn Mini Sudoku: Compact Grid Mastery
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>By {SITE_NAME} Team</span>
                <span>•</span>
                <time dateTime={today}>{today}</time>
                <span>•</span>
                <span>14 min read</span>
              </div>
            </header>

            {/* Hero Image */}
            <figure className="mb-8">
              <img
                src="/images/mini-sudoku.png"
                alt="LinkedIn Mini Sudoku 6x6 compact logic grid puzzle"
                className="w-full h-auto rounded-2xl shadow-xl"
                loading="eager"
                width="1200"
                height="630"
              />
              <figcaption className="mt-2 text-sm text-muted-foreground text-center">
                LinkedIn Mini Sudoku: Solve 6x6 grids using row, column, box constraints
              </figcaption>
            </figure>

            {/* Top Ad */}
            <AdBlock slot="top-article" className="mb-8" />

            <div className="grid gap-8 text-lg leading-relaxed">

              <section>
                <h2 className="text-3xl font-bold mb-6">Mini Sudoku vs Standard Sudoku</h2>
                <p>
                  LinkedIn Mini Sudoku uses 6x6 grids divided into six 2x3 boxes. Numbers 1-6 used exactly once per row, column, and box. Compact size means fewer givens but tighter constraints.
                </p>
              </section>

              <AdBlock slot="mid-article-1" className="my-8" />

              <section>
                <h2 className="text-3xl font-bold mb-6">Beginner Techniques</h2>
                <ol className="mt-4 space-y-3 pl-6 list-decimal">
                  <li><strong>Naked Singles:</strong> Cells with only one possible number</li>
                  <li><strong>Hidden Singles:</strong> Number appears only once in row/column/box</li>
                  <li><strong>Naked Pairs:</strong> Two cells with identical candidates → eliminate from row/column/box</li>
                </ol>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Intermediate: Pointing Pairs & Claiming Pairs</h2>
                <p>
                  Box with two candidates in same row → eliminate those candidates from that row in other boxes.
                </p>
              </section>

              <AdBlock slot="mid-article-2" className="my-8" />

              <section>
                <h2 className="text-3xl font-bold mb-6">Advanced: X-Wing Pattern</h2>
                <p>
                  Two rows with identical candidates in same columns → those columns can only contain the candidates in those rows.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">FAQ</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-semibold mb-2">6x6 vs 9x9 Sudoku?</h4>
                    <p>Fewer cells means more constraint propagation per move. Solve time similar despite smaller grid.</p>
                  </div>
                </div>
              </section>

              <aside className="mt-12 p-6 bg-card rounded-xl border">
                <h3 className="text-xl font-bold mb-4">Related Guides</h3>
                <ul className="space-y-2">
                  <li><Link href="/blog/how-to-solve-linkedin-patches" className="text-primary hover:underline">Patches Pattern Completion</Link></li>
                  <li><Link href="/answers/minisudoku/today" className="text-primary hover:underline">Today's Mini Sudoku</Link></li>
                </ul>
              </aside>

            </div>

          </article>
        </div>
      </main>
    </>
  );
}
