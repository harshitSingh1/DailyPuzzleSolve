import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us – Report Puzzle Issues, Request Solutions & Partnerships",
  description:
    "Contact the LogicPuzzleHub team to report incorrect puzzle answers, request new puzzle solutions, suggest products for our shop page, or discuss advertising opportunities.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  robots: "index, follow",
  openGraph: {
    title: `Contact ${SITE_NAME}`,
    description:
      "Report incorrect puzzle solutions, request puzzle guides, suggest products, or discuss advertising opportunities with LogicPuzzleHub.",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE_NAME}`,
    url: `${SITE_URL}/contact`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}