// components/HeadSEO.tsx
import { NextSeo } from 'next-seo';

interface HeadSEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  keywords?: string;
}

export default function HeadSEO({ 
  title, 
  description, 
  canonicalUrl, 
  ogImageUrl,
  keywords
}: HeadSEOProps) {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonicalUrl}
      openGraph={{
        url: canonicalUrl,
        title: title,
        description: description,
        images: ogImageUrl ? [{ url: ogImageUrl }] : [],
        site_name: 'LogicPuzzleMaster',
      }}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        ...(keywords ? [{
          name: 'keywords',
          content: keywords,
        }] : []),
      ]}
    />
  );
}