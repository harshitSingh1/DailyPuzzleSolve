import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseAd from "@/components/AdSenseAd";

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using PuzzleLogicHub, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access the Website or use any services.",
  },
  {
    title: "Description of Service",
    content:
      'PuzzleLogicHub provides puzzle solutions, tutorials, and related content for educational and entertainment purposes. The service is provided "as is" and we make no warranties regarding its accuracy or completeness.',
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
      "All content on this Website, including text, graphics, logos, and images, is the property of PuzzleLogicHub or its content suppliers and protected by international copyright laws.",
  },
  {
    title: "Affiliate Links",
    content:
      "Our shop section contains affiliate links. When you make a purchase through these links, we may earn a commission at no additional cost to you.",
  },
  {
    title: "Limitation of Liability",
    content:
      "PuzzleLogicHub shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the service.",
  },
  {
    title: "User-Generated Content",
    content:
      "If the Website allows user submissions, you retain ownership of any content you submit but grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where PuzzleLogicHub is established, without regard to its conflict of law provisions.",
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

const lastUpdated = "2026-02-16";

const Terms = () => (
  <>
    <SEOHead
      title="Terms of Service"
      description="Review the terms and conditions governing your use of PuzzleLogicHub's services and content."
      path="/terms"
      robots="noindex, follow"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Terms of Service | PuzzleLogicHub",
        description: "Review the terms and conditions governing your use of PuzzleLogicHub's services and content.",
        url: "https://dailypuzzlesolve.com/terms",
        datePublished: "2025-01-01",
        dateModified: lastUpdated,
      }}
    />
    <main className="pt-6 pb-12">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold mb-2">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last Updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
          </p>
        </motion.div>

        <AdSenseAd slot="4661598458" className="mb-8" />

        <div className="space-y-8">
          {sections.map((s, i) => (
            <motion.section
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h2 className="font-display text-xl font-bold mb-3">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.content}</p>
              {s.list && (
                <ul className="mt-3 list-disc pl-5 space-y-1 text-muted-foreground">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {s.link && (
                <a href={s.link} className="mt-2 inline-block text-primary font-medium hover:underline">
                  Go to Contact Page →
                </a>
              )}
            </motion.section>
          ))}
        </div>

        <AdSenseAd slot="4661598458" className="mt-8" />
      </div>
    </main>
  </>
);

export default Terms;
