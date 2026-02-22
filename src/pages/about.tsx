import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import AdSenseAd from "@/components/AdSenseAd";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

const About = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${SITE_NAME}`,
    description: "Discover PuzzleLogicHub's mission to provide high-quality puzzle solutions, tutorials, and tools.",
    url: `${SITE_URL}/about`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
  };

  return (
    <>
      <SEOHead
        title="About PuzzleLogicHub"
        description="Discover PuzzleLogicHub's mission to provide high-quality puzzle solutions, tutorials, and tools for enthusiasts of all skill levels."
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
                Empowering puzzle enthusiasts with comprehensive solutions and learning resources
              </p>
            </div>

            <AdSenseAd slot="about-top" />

            {/* Sections */}
            <div className="space-y-8">
              <Section title="Who We Are">
                PuzzleLogicHub was founded in 2025 by a team of puzzle enthusiasts who wanted to create a comprehensive resource for puzzle solvers of all levels. We&apos;re dedicated to providing high-quality solutions, strategies, and tools to help you master logic puzzles.
              </Section>

              <Section title="Our Mission">
                Our mission is to make puzzle-solving accessible and enjoyable for everyone. We believe that regular mental exercise through puzzles can improve cognitive function, problem-solving skills, and overall mental well-being.
              </Section>

              <Section title="What We Offer">
                <ul className="mt-2 space-y-2 text-muted-foreground">
                  <li>📸 <strong>Daily Puzzle Solutions:</strong> Step-by-step explanations for popular puzzles</li>
                  <li>🎬 <strong>Video Tutorials:</strong> Visual guides for complex puzzles</li>
                  <li>📝 <strong>Strategy Guides:</strong> Tips to improve your solving skills</li>
                  <li>🔧 <strong>Tool Recommendations:</strong> Curated list of helpful puzzle-solving tools</li>
                </ul>
              </Section>

              <Section title="Our Team">
                Our team consists of puzzle champions, software developers, and educators who are passionate about sharing their knowledge. We&apos;re constantly working to expand our library of resources and improve your puzzle-solving experience.
              </Section>

              {/* SEO content */}
              <div className="rounded-xl border border-border bg-muted/30 p-6">
                <h2 className="mb-2 font-display text-xl font-bold text-foreground">Why Puzzles Matter</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Puzzles are more than just entertainment. They&apos;re powerful tools for cognitive development. Regular puzzle-solving can enhance memory, improve problem-solving skills, and even reduce stress. At PuzzleLogicHub, we&apos;re committed to helping you reap these benefits through our carefully curated content.
                </p>
              </div>
            </div>

            <AdSenseAd slot="about-bottom" className="mt-8" />
          </motion.div>
        </div>
      </main>
    </>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
    <h2 className="mb-2 font-display text-xl font-bold text-foreground">{title}</h2>
    <div className="text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

export default About;
