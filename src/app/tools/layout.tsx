import type { Metadata } from "next"
import { SITE_URL, SITE_NAME } from "@/lib/constants"
import JsonLd from "@/components/JsonLd"

const today = new Date().toISOString().split("T")[0]

export const metadata: Metadata = {
  title: "Essential Developer & Puzzle Tools – Free Online Resources",
  description:
    "Discover the best free developer tools and resources for puzzle enthusiasts. Enhance your problem-solving and coding workflow with our curated collection.",
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
  openGraph: {
    title: "Essential Developer & Puzzle Tools – Free Online Resources",
    description:
      "Discover the best free developer tools and resources for puzzle enthusiasts.",
    url: `${SITE_URL}/tools`,
    siteName: SITE_NAME,
    type: "website",
  },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Developer & Puzzle Tools Collection",
    url: `${SITE_URL}/tools`,
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