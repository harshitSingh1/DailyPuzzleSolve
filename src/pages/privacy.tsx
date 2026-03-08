// src\pages\privacy.tsx
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseAd from "@/components/AdSenseAd";

const sections = [
  {
    title: "Introduction",
    content:
      "At PuzzleLogicHub, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.",
  },
  {
    title: "Information We Collect",
    content:
      "We may collect the following types of information:",
    list: [
      "Personal Information: Name, email address when you contact us",
      "Usage Data: Pages visited, time spent, referring website",
      "Cookies: To improve your browsing experience",
    ],
  },
  {
    title: "How We Use Your Information",
    content: "We use the information we collect to:",
    list: [
      "Provide and maintain our service",
      "Improve user experience",
      "Respond to inquiries and support requests",
      "Analyze usage patterns",
      "Prevent fraudulent activity",
    ],
  },
  {
    title: "Google AdSense",
    content:
      'We use Google AdSense to display advertisements. Google may use cookies and web beacons to serve ads based on your prior visits to our website and other sites. You can opt out of personalized advertising by visiting Google Ads Settings.',
  },
  {
    title: "Data Security",
    content:
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction.",
  },
  {
    title: "Your Rights Under GDPR",
    content:
      "If you are a resident of the European Economic Area (EEA), you have certain data protection rights:",
    list: [
      "The right to access, update or delete your information",
      "The right of rectification",
      "The right to object",
      "The right of restriction",
      "The right to data portability",
      "The right to withdraw consent",
    ],
  },
  {
    title: "Changes to This Policy",
    content:
      'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.',
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us through our Contact page.",
    link: "/contact",
  },
];

const lastUpdated = "2026-02-16";

const Privacy = () => (
  <>
    <SEOHead
      title="Privacy Policy"
      description="Learn how PuzzleLogicHub collects, uses, and protects your personal information. Read our comprehensive privacy policy."
      path="/privacy"
      robots="index, follow"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Privacy Policy | PuzzleLogicHub",
        description: "Learn how PuzzleLogicHub collects, uses, and protects your personal information.",
        url: "https://daily-puzzle-solve.vercel.app/privacy",
        datePublished: "2025-01-01",
        dateModified: lastUpdated,
      }}
    />
    <main className="pt-6 pb-12">
      <div className="container max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last Updated:{" "}
            <time dateTime={lastUpdated}>{lastUpdated}</time>
          </p>
        </motion.div>

        <AdSenseAd slot="4661598458" className="mb-8" />

        {/* Sections */}
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
                <a
                  href={s.link}
                  className="mt-2 inline-block text-primary font-medium hover:underline"
                >
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

export default Privacy;
