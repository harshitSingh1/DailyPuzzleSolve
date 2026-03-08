import type { Metadata } from "next"
import { SITE_URL, SITE_NAME } from "@/lib/constants"
import JsonLd from "@/components/JsonLd"

const today = new Date().toISOString().split("T")[0]

export const metadata: Metadata = {
  title: "Puzzle Books & Brain Training Games Shop – Best Picks",
  description:
    "Shop curated puzzle books, strategy games, and brain training products. Find the perfect mental challenge for all skill levels. Daily updated deals.",
  keywords: [
    "puzzle books",
    "brain training games",
    "logic puzzle books",
    "strategy board games",
    "best puzzle gifts",
  ],
  alternates: {
    canonical: `${SITE_URL}/shop`,
  },
  openGraph: {
    title: "Puzzle Books & Brain Training Games Shop – Best Picks",
    description:
      "Shop curated puzzle books and brain training products for all skill levels.",
    url: `${SITE_URL}/shop`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puzzle Books & Brain Training Games Shop",
    description:
      "Curated puzzle books, brain training games, and logic challenges.",
  },
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Puzzle Books & Brain Training Games Shop",
    description:
      "Curated puzzle books and brain training games for puzzle lovers and logic enthusiasts.",
    url: `${SITE_URL}/shop`,
    dateModified: today,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  )
}