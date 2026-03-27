import { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import AdBlock from "@/components/ads/AdBlock";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

const today = new Date().toISOString().split("T")[0];

export const metadata: Metadata = {
  title: "How to Solve LinkedIn Patches Puzzle - Pattern Completion Guide",
  description: "Complete LinkedIn Patches puzzles with symmetry recognition, tessellation techniques, rotation patterns, and systematic shape completion strategies for perfect scores.",
  keywords: [
    "linkedin patches puzzle solution",
    "how to solve linkedin patches",
    "patches puzzle strategy",
    "linkedin patches tips",
    "pattern completion puzzle",
    "tessellation puzzle",
    "symmetry pattern solving"
  ],
  alternates: {
    canonical: `${SITE_URL}/blog/how-to-solve-linkedin-patches`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HowToSolvePatches() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Solve LinkedIn Patches Puzzle - Pattern Completion Expert Guide",
    description: "Complete LinkedIn Patches with symmetry and tessellation techniques.",
    datePublished: "2025-02-15",
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
    image: `${SITE_URL}/images/patches-game.png`,
    mainEntityOfPage: `${SITE_URL}/blog/how-to-solve-linkedin-patches`,
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
            <span className="text-foreground font-medium">How to Solve LinkedIn Patches</span>
          </nav>

          <article className="prose prose-lg dark:prose-invert max-w-none">

            {/* Title */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                How to Solve LinkedIn Patches Puzzle: Pattern Recognition Mastery
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>By {SITE_NAME} Team</span>
                <span>•</span>
                <time dateTime={today}>{today}</time>
                <span>•</span>
                <span>10 min read</span>
              </div>
            </header>

            {/* Hero Image */}
            <figure className="mb-8">
              <img
                src="/images/patches-game.png"
                alt="LinkedIn Patches pattern completion puzzle with incomplete tessellation"
                className="w-full h-auto rounded-2xl shadow-xl"
                loading="eager"
                width="1200"
                height="630"
              />
              <figcaption className="mt-2 text-sm text-muted-foreground text-center">
                LinkedIn Patches: Complete the repeating pattern across the grid
              </figcaption>
            </figure>

            {/* Top Ad */}
            <AdBlock slot="top-article" className="mb-8" />

            <div className="grid gap-8 text-lg leading-relaxed">

              <section>
                <h2 className="text-3xl font-bold mb-6">Patches Puzzle Fundamentals</h2>
                <p>
                  Patches presents an incomplete grid pattern. Your task: fill in missing pieces to create a seamless, repeating tessellation that matches the established pattern in completed areas.
                </p>
              </section>

              <AdBlock slot="mid-article-1" className="my-8" />

              <section>
                <h2 className="text-3xl font-bold mb-6">Core Strategy: Identify the Unit Cell</h2>
                <p>
                  Every Patches puzzle repeats a basic "unit cell" pattern. Find the smallest repeating block:
                </p>
                <ul className="mt-4 space-y-2 pl-6 list-disc">
                  <li>Look for completed 2x2 or 3x3 pattern blocks</li>
                  <li>Identify rotationally symmetric elements</li>
                  <li>Check for mirror symmetry across lines</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Symmetry Exploitation</h2>
                <p>
                  Patches favors 4 main symmetry types:
                </p>
                <table className="w-full my-4 bg-card rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-muted">
                      <th className="p-3 text-left">Symmetry Type</th>
                      <th className="p-3 text-left">Identification Clue</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-t">Rotational (90°)</td>
                      <td className="p-3 border-t">Top-left = bottom-right pattern</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-t">Mirror (horizontal)</td>
                      <td className="p-3 border-t">Top/bottom rows mirror each other</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <AdBlock slot="mid-article-2" className="my-8" />

              <section>
                <h2 className="text-3xl font-bold mb-6">Boundary Condition Checking</h2>
                <p>
                  Edge pieces must match adjacent grid edges. Incomplete edge patterns reveal the repeating motif.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">FAQ</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-semibold mb-2">Multiple possible patterns?</h4>
                    <p>Only one creates seamless tiling across entire grid boundaries.</p>
                  </div>
                </div>
              </section>

              <aside className="mt-12 p-6 bg-card rounded-xl border">
                <h3 className="text-xl font-bold mb-4">Related Guides</h3>
                <ul className="space-y-2">
                  <li><Link href="/blog/how-to-solve-linkedin-mini-sudoku" className="text-primary hover:underline">Mini Sudoku Techniques</Link></li>
                  <li><Link href="/answers/patches/today" className="text-primary hover:underline">Today's Patches Solution</Link></li>
                </ul>
              </aside>

            </div>

          </article>
        </div>
      </main>
    </>
  );
}
