import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

const lastUpdated = "2026-02-28";

const Disclaimer = () => (
  <>
    <SEOHead
      title="Disclaimer – Affiliate Disclosure & Legal Notice"
      description="Read PuzzleLogicHub's disclaimer including affiliate disclosure, accuracy notice, and third-party trademarks. We are not affiliated with LinkedIn."
      path="/disclaimer"
      robots="noindex, follow"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Disclaimer | ${SITE_NAME}`,
        url: `${SITE_URL}/disclaimer`,
        datePublished: "2025-01-01",
        dateModified: lastUpdated,
      }}
    />
    <main className="pt-6 pb-12">
      <div className="container max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold mb-2">Disclaimer</h1>
          <p className="text-muted-foreground">
            Last Updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Not Affiliated */}
          <Section title="Not Affiliated with LinkedIn">
            <p>
              {SITE_NAME} is an independent educational website. We are <strong>not affiliated with, endorsed by, or sponsored by LinkedIn Corporation</strong> or any of its subsidiaries. All LinkedIn puzzle names, including Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku, are trademarks or registered trademarks of LinkedIn Corporation. Our use of these names is purely for informational and educational reference purposes.
            </p>
            <p className="mt-3">
              The solutions, strategies, and guides published on this website represent the independent analysis and opinions of our editorial team. LinkedIn does not review, approve, or control any of the content on this website.
            </p>
          </Section>

          {/* Affiliate Disclosure */}
          <Section title="Affiliate Disclosure">
            <p>
              Some of the links on {SITE_NAME}, particularly in our <Link to="/shop" className="text-primary underline underline-offset-2 hover:text-primary/80">Shop</Link> section, are affiliate links. This means that if you click on a link and make a purchase, we may receive a small commission at <strong>no additional cost to you</strong>.
            </p>
            <p className="mt-3">
              We only recommend products that we genuinely believe will benefit puzzle enthusiasts and learners. Our editorial content is not influenced by affiliate partnerships, and we maintain full editorial independence in our recommendations. Every product listed in our shop has been reviewed and compared against 10 to 15 alternatives before being selected.
            </p>
            <p className="mt-3">
              Affiliate commissions help us maintain the website, pay for hosting, and continue publishing free daily puzzle solutions. We appreciate your support in keeping this resource available for everyone.
            </p>
          </Section>

          {/* Accuracy */}
          <Section title="Accuracy of Information">
            <p>
              While we strive to provide accurate and up-to-date puzzle solutions, we cannot guarantee that every solution is 100% error-free. Puzzle solutions are created by our team of puzzle enthusiasts and are based on our best interpretation of each daily puzzle. If you notice an error, please <Link to="/contact" className="text-primary underline underline-offset-2 hover:text-primary/80">contact us</Link> so we can correct it promptly.
            </p>
            <p className="mt-3">
              The educational content, strategy guides, and tool recommendations on this website are provided for general informational purposes only. They should not be considered professional advice.
            </p>
          </Section>

          {/* Third-Party Content */}
          <Section title="Third-Party Content & Links">
            <p>
              Our website may contain links to third-party websites, tools, and resources. We do not control or endorse the content, privacy policies, or practices of any third-party websites. Visiting external links is at your own discretion and risk. We recommend reviewing the terms and privacy policy of any website you visit through our links.
            </p>
          </Section>

          {/* User-Generated Content */}
          <Section title="Memes & User-Generated Content">
            <p>
              The memes displayed on our website are sourced from publicly available APIs and community platforms such as Reddit. We do not claim ownership of user-generated meme content. If you are the creator of a meme displayed on our site and would like it removed, please <Link to="/contact" className="text-primary underline underline-offset-2 hover:text-primary/80">contact us</Link> and we will take it down promptly.
            </p>
          </Section>

          {/* Limitation */}
          <Section title="Limitation of Liability">
            <p>
              {SITE_NAME} and its team members shall not be held liable for any damages arising from the use or inability to use the website, including but not limited to direct, indirect, incidental, punitive, or consequential damages. By using this website, you acknowledge and agree that you do so at your own risk.
            </p>
          </Section>

          {/* Changes */}
          <Section title="Changes to This Disclaimer">
            <p>
              We reserve the right to update this disclaimer at any time without prior notice. Continued use of the website after changes constitutes acceptance of the updated terms. We encourage you to review this page periodically.
            </p>
          </Section>

          {/* Contact */}
          <Section title="Questions?">
            <p>
              If you have any questions about this disclaimer, our affiliate relationships, or anything else, please reach out through our{" "}
              <Link to="/contact" className="text-primary underline underline-offset-2 hover:text-primary/80">Contact page</Link>.
            </p>
          </Section>
        </div>
      </div>
    </main>
  </>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-xl border border-border bg-card p-6"
  >
    <h2 className="font-display text-xl font-bold mb-3">{title}</h2>
    <div className="text-muted-foreground leading-relaxed">{children}</div>
  </motion.section>
);

export default Disclaimer;
