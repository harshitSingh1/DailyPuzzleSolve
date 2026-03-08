import type { Metadata } from "next"
import { SITE_URL, SITE_NAME } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Programming Meme Generator – Create & Share Coding Memes Free",
  description:
    "Create hilarious programming memes with our free online meme generator. 50+ templates, drag-and-drop editor, custom fonts, and trending developer memes from Reddit.",
  keywords: [
    "programming meme generator",
    "coding memes",
    "developer memes",
    "tech memes",
    "meme generator online",
    "coding humor",
  ],
  alternates: {
    canonical: `${SITE_URL}/memes`,
  },
  openGraph: {
    title: "Programming Meme Generator – Free Developer Meme Maker",
    description:
      "Create and share programming memes instantly. Browse trending developer memes and design your own.",
    url: `${SITE_URL}/memes`,
    siteName: SITE_NAME,
    type: "website",
  },
}

export default function MemesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Programming Meme Generator",
              applicationCategory: "EntertainmentApplication",
              operatingSystem: "Web",
              url: `${SITE_URL}/memes`,
              description:
                "Free meme generator for programmers and tech enthusiasts with 50+ templates and drag-and-drop editing.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              publisher: {
                "@type": "Organization",
                name: SITE_NAME,
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Programming Memes Gallery",
              url: `${SITE_URL}/memes`,
              description:
                "Trending programming memes and developer humor curated from Reddit and coding communities.",
            },
          ]),
        }}
      />
    </>
  )
}