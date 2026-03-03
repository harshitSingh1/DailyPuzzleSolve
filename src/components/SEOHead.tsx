import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
  image?: string;
  robots?: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  hreflang?: boolean;
}

const today = new Date().toISOString().split("T")[0];

const SEOHead = ({
  title,
  description,
  path = "/",
  type = "website",
  image = `${SITE_URL}/images/hero.jpeg`,
  robots = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  datePublished,
  dateModified = today,
  breadcrumbs,
  jsonLd,
  hreflang = true,
}: SEOHeadProps) => {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  // Build BreadcrumbList schema if provided
  const breadcrumbSchema = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          ...breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            position: i + 2,
            name: b.name,
            item: b.url,
          })),
        ],
      }
    : null;

  // Organization schema for E-E-A-T
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo1.png`,
    sameAs: [
      "https://twitter.com/PuzzleLogicHub",
      "https://youtube.com/@PuzzleLogicHub",
      "https://linkedin.com/company/puzzlelogichub",
      "https://facebook.com/PuzzleLogicHub",
      "https://instagram.com/PuzzleLogicHub",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${SITE_URL}/contact`,
    },
  };

  // Merge primary jsonLd + breadcrumb + org into a @graph
  const schemas: Record<string, unknown>[] = [];
  if (jsonLd) {
    if (Array.isArray(jsonLd)) schemas.push(...jsonLd);
    else schemas.push(jsonLd);
  }
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);
  // Only add org schema on homepage to avoid bloat
  if (path === "/") schemas.push(orgSchema);

  return (
    <Helmet>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={robots} />

      {/* Freshness signals */}
      {datePublished && <meta name="article:published_time" content={datePublished} />}
      <meta name="article:modified_time" content={dateModified} />

      {/* Hreflang for international targeting */}
      {hreflang && (
        <>
          <link rel="alternate" hrefLang="en-us" href={url} />
          <link rel="alternate" hrefLang="en-gb" href={url} />
          <link rel="alternate" hrefLang="en-in" href={url} />
          <link rel="alternate" hrefLang="x-default" href={url} />
        </>
      )}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@PuzzleLogicHub" />

      {/* Author */}
      <meta name="author" content={SITE_NAME} />

      {/* JSON-LD */}
      {schemas.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(schemas.length === 1 ? schemas[0] : { "@context": "https://schema.org", "@graph": schemas })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;