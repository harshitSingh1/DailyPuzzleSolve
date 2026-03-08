import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About ${SITE_NAME} – Our Mission & Story`,
  description:
    "Learn about LogicPuzzleHub, our mission to provide daily LinkedIn puzzle solutions, and how our team of puzzle enthusiasts builds the best free resource for logic puzzles.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: `About ${SITE_NAME}`,
    description:
      "Learn about LogicPuzzleHub and our mission to make daily logic puzzles easier and more enjoyable.",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${SITE_NAME}`,
    description:
      "Learn about LogicPuzzleHub's mission, team, and commitment to providing daily puzzle solutions.",
    url: `${SITE_URL}/about`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo1.png`,
      },
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}