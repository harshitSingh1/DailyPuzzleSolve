import { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import AdBlock from "@/components/ads/AdBlock";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

const lastUpdated = "2026-02-16";

export const metadata: Metadata = {
  title: "Terms of Service | LogicPuzzleHub",
  description:
    "Review the terms and conditions governing your use of LogicPuzzleHub's services and content.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using LogicPuzzleHub, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access the Website or use any services.",
  },
  {
    title: "Description of Service",
    content:
      'LogicPuzzleHub provides puzzle solutions, tutorials, and related content for educational and entertainment purposes. The service is provided "as is" and we make no warranties regarding its accuracy or completeness.',
  },
  {
    title: "User Responsibilities",
    content: "As a user of this Website, you agree to:",
    list: [
      "Use the content for personal, non-commercial purposes only",
      "Not redistribute or republish any content without permission",
      "Not use the Website in any unlawful manner",
      "Not attempt to gain unauthorized access to our systems",
    ],
  },
  {
    title: "Intellectual Property",
    content:
      "All content on this Website, including text, graphics, logos, and images, is the property of LogicPuzzleHub or its content suppliers and protected by international copyright laws.",
  },
  {
    title: "Affiliate Links",
    content:
      "Our shop section contains affiliate links. When you make a purchase through these links, we may earn a commission at no additional cost to you.",
  },
  {
    title: "Limitation of Liability",
    content:
      "LogicPuzzleHub shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the service.",
  },
  {
    title: "User-Generated Content",
    content:
      "If the Website allows user submissions, you retain ownership of any content you submit but grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where LogicPuzzleHub is established, without regard to its conflict of law provisions.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to modify these terms at any time. Your continued use of the Website after such modifications constitutes your acceptance of the new terms.",
  },
  {
    title: "Contact",
    content: "Questions about these terms? Reach out via our Contact page.",
    link: "/contact",
  },
];

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Terms of Service | ${SITE_NAME}`,
    description:
      "Review the terms and conditions governing your use of LogicPuzzleHub's services and content.",
    url: `${SITE_URL}/terms`,
    datePublished: "2025-01-01",
    dateModified: lastUpdated,
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="pt-6 pb-12">
        <div className="container max-w-3xl mx-auto">

          {/* Header */}

          <div className="text-center mb-10">
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold mb-2">
              Terms of Service
            </h1>

            <p className="text-muted-foreground">
              Last Updated:{" "}
              <time dateTime={lastUpdated}>{lastUpdated}</time>
            </p>
          </div>

          {/* Top Ad */}

          <AdBlock
            slot="5934836566"
            format="leaderboard"
            minHeight={90}
            className="mb-8"
          />

          {/* Terms Sections */}

          <div className="space-y-8">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h2 className="font-display text-xl font-bold mb-3">
                  {section.title}
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>

                {section.list && (
                  <ul className="mt-3 list-disc pl-5 space-y-1 text-muted-foreground">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.link && (
                  <Link
                    href={section.link}
                    className="mt-2 inline-block text-primary font-medium hover:underline"
                  >
                    Go to Contact Page →
                  </Link>
                )}
              </section>
            ))}
          </div>

          {/* Bottom Ad */}

          <AdBlock
            slot="5934836566"
            format="rectangle"
            minHeight={250}
            lazy={true}
            className="mt-8"
          />
        </div>
      </main>
    </>
  );
}