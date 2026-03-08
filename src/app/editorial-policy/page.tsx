import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

const lastUpdated = "2026-03-01";

export const metadata: Metadata = {
  title: "Editorial Policy – Our Standards & Process",
  description: `Learn about ${SITE_NAME}'s editorial standards, content creation process, and commitment to accuracy. Every puzzle solution is verified by our team of puzzle enthusiasts.`,
  alternates: {
    canonical: `${SITE_URL}/editorial-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EditorialPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Editorial Policy | ${SITE_NAME}`,
    description: `${SITE_NAME}'s editorial standards and content verification process.`,
    url: `${SITE_URL}/editorial-policy`,
    datePublished: "2025-01-01",
    dateModified: lastUpdated,
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="py-10 sm:py-14">
        <div className="container max-w-3xl">

          {/* Breadcrumb */}

          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-foreground">
              Editorial Policy
            </span>
          </nav>

          {/* Page Title */}

          <h1 className="mb-2 font-display text-3xl font-extrabold sm:text-4xl">
            Editorial Policy
          </h1>

          <p className="mb-8 text-muted-foreground">
            Last updated:{" "}
            <time dateTime={lastUpdated}>{lastUpdated}</time>
          </p>

          {/* Content */}

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">

            <section>
              <h2 className="font-display text-xl font-bold">
                Our Mission
              </h2>

              <p className="mt-2 leading-relaxed text-muted-foreground">
                {SITE_NAME} was founded with a clear purpose: to be the most
                accurate, timely, and helpful resource for LinkedIn puzzle
                solutions on the internet. We believe that puzzle-solving
                should be accessible to everyone, and that a well-explained
                solution teaches more than the answer itself. Our editorial
                mission is to provide original, fact-checked, and thoroughly
                explained content that helps readers both solve today's puzzle
                and improve their problem-solving skills for the future.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">
                Content Creation Process
              </h2>

              <p className="mt-2 leading-relaxed text-muted-foreground">
                Every piece of content on {SITE_NAME} follows a structured
                creation process designed to ensure quality and accuracy:
              </p>

              <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
                <li>
                  <strong>Puzzle Solving</strong> - Our team solves each LinkedIn
                  puzzle independently within 30 minutes of it going live. We
                  do not scrape or copy solutions from other sources.
                </li>

                <li>
                  <strong>Documentation</strong> - We capture step-by-step
                  screenshots and record video walkthroughs that show the
                  complete solving process from start to finish.
                </li>

                <li>
                  <strong>Strategy Explanation</strong> - A team member writes
                  original explanations describing the reasoning behind each
                  step, common pitfalls, and alternative approaches.
                </li>

                <li>
                  <strong>Peer Review</strong> - Before publication, a second
                  team member verifies the solution for accuracy and reviews
                  the explanation for clarity.
                </li>

                <li>
                  <strong>Publication & Monitoring</strong> - After publishing,
                  we monitor reader feedback and correct any errors promptly.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">
                Accuracy & Corrections
              </h2>

              <p className="mt-2 leading-relaxed text-muted-foreground">
                Accuracy is our highest priority. Every solution published on
                this site has been solved and verified by at least one member
                of our editorial team. If we discover an error - or if a reader
                reports one - we correct it immediately and note the correction
                on the affected page. We do not silently edit content. If you
                spot an error, please{" "}
                <Link href="/contact" className="text-primary underline">
                  contact us
                </Link>{" "}
                and we will address it within 24 hours.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">
                Independence & Affiliate Disclosure
              </h2>

              <p className="mt-2 leading-relaxed text-muted-foreground">
                {SITE_NAME} is an independent publication. We are not
                affiliated with, endorsed by, or connected to LinkedIn
                Corporation in any way. Our puzzle solutions are based on our
                own work and analysis.
              </p>

              <p className="mt-2 leading-relaxed text-muted-foreground">
                Some pages on this site, particularly our shop section,
                contain affiliate links. When you purchase a product through
                an affiliate link, we may earn a small commission at no
                additional cost to you. Affiliate relationships never
                influence the content of our puzzle solutions, strategy
                guides, or editorial recommendations. We only recommend
                products that we believe genuinely benefit puzzle enthusiasts.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">
                Our Editorial Team
              </h2>

              <p className="mt-2 leading-relaxed text-muted-foreground">
                Our content is created by a small, dedicated team of puzzle
                enthusiasts with backgrounds in mathematics, computer
                science, and technical writing. Each team member has years of
                experience solving logic puzzles, crosswords, and brain
                teasers. We bring this expertise to every solution we publish,
                ensuring that our explanations are not only correct but
                genuinely educational.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">
                Content Freshness
              </h2>

              <p className="mt-2 leading-relaxed text-muted-foreground">
                LinkedIn puzzle games reset daily, and so does our content.
                Every solution page is updated with fresh content each day.
                We display prominent "Updated Today" badges and timestamps so
                readers always know they are viewing the latest solution.
                Older solutions are archived but remain accessible for
                reference.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">
                Advertising Policy
              </h2>

              <p className="mt-2 leading-relaxed text-muted-foreground">
                We use Google AdSense to display advertisements that help
                fund our operations. Advertisements are clearly distinguished
                from editorial content and are never disguised as solutions
                or recommendations. We do not accept sponsored content that
                would compromise the integrity of our puzzle solutions.
                Advertising revenue allows us to keep all puzzle solutions
                free for every visitor.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">
                Feedback & Contact
              </h2>

              <p className="mt-2 leading-relaxed text-muted-foreground">
                We welcome feedback from our readers. Whether you have a
                suggestion for improving our content, want to report an
                error, or have a question about our editorial process,
                please reach out through our{" "}
                <Link href="/contact" className="text-primary underline">
                  Contact page
                </Link>
                . We read every message and respond within 48 hours.
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}