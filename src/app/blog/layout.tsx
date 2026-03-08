import type { Metadata } from "next"
import JsonLd from "@/components/JsonLd"
import { SITE_NAME, SITE_URL } from "@/lib/constants"

const today = new Date().toISOString().split("T")[0]

export const metadata: Metadata = {
  title: "Puzzle Strategy Blog – Solve LinkedIn Puzzles Faster",
  description:
    "In-depth puzzle solving strategies, brain training guides, and developer insights to help you master LinkedIn games like Pinpoint, Queens, Tango, Crossclimb, Zip, and Mini Sudoku.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Puzzle Strategy Blog – Logic Puzzle Guides",
    description:
      "Learn expert strategies for solving daily LinkedIn puzzles and improving logical thinking.",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Puzzle Strategy Blog`,
    url: `${SITE_URL}/blog`,
    description:
      "Strategy guides and tutorials for solving logic puzzles and improving problem-solving skills.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    dateModified: today,
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  )
}