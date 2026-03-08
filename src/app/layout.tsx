import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/providers";
import RecruitmentBanner from "@/components/RecruitmentBanner";

import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} | Daily LinkedIn Puzzle Answers`,
    template: `%s | ${SITE_NAME}`
  },

  description: SITE_DESCRIPTION,

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],

    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },

  manifest: "/site.webmanifest",

  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,

    images: [
      {
        url: "/images/hero.jpeg",
        width: 1200,
        height: 630
      }
    ],

    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/images/hero.jpeg"]
  },

  alternates: {
    canonical: SITE_URL
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className="min-h-screen flex flex-col">

        <Providers>

          <Script
            async
            strategy="afterInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5138062904998916"
            crossOrigin="anonymous"
          />

          <RecruitmentBanner />

          <Header />

          <main className="flex-1">
            {children}
          </main>

          <Footer />

        </Providers>

      </body>

    </html>
  );
}