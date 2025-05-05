import { NextSeo, ArticleJsonLd } from 'next-seo';

interface HeadSEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  type?: 'article' | 'website' | 'howto';
  noindex?: boolean;
  alternateLanguages?: {
    [key: string]: string;
  };
}

export default function HeadSEO({ 
  title,
  description,
  canonicalUrl,
  ogImageUrl,
  keywords,
  publishedTime,
  modifiedTime,
  author = 'LogicPuzzleMaster',
  type = 'website',
  noindex = false,
  alternateLanguages
}: HeadSEOProps) {
  // Default meta image for social sharing
  const defaultOgImage = '/images/default-social.png';
  const imageUrl = ogImageUrl || defaultOgImage;
  
  return (
    <>
      <NextSeo
        title={title}
        titleTemplate="%s | LogicPuzzleMaster - Daily LinkedIn Puzzle Solutions"
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          type: type,
          url: canonicalUrl,
          title: title,
          description: description,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
          site_name: 'LogicPuzzleMaster',
          ...(publishedTime && {
            article: {
              publishedTime: publishedTime,
              modifiedTime: modifiedTime || publishedTime,
              authors: [author],
            },
          }),
        }}
        twitter={{
          handle: '@LogicPuzzleMaster',
          site: '@LogicPuzzleMaster',
          cardType: 'summary_large_image',
        }}
        languageAlternates={
          alternateLanguages 
            ? Object.entries(alternateLanguages).map(([lang, url]) => ({
                hrefLang: lang,
                href: url,
              }))
            : []
        }
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
          {
            name: 'author',
            content: author,
          },
          {
            name: 'robots',
            content: noindex ? 'noindex,nofollow' : 'index,follow',
          },
          {
            property: 'og:locale',
            content: 'en_US',
          },
          ...(keywords ? [{
            name: 'keywords',
            content: keywords,
          }] : []),
        ]}
      />

      {type === 'article' && publishedTime && (
        <ArticleJsonLd
          type="Article"
          url={canonicalUrl || ''}
          title={title}
          images={[imageUrl]}
          datePublished={publishedTime}
          dateModified={modifiedTime || publishedTime}
          authorName={author}
          description={description}
          publisherName="LogicPuzzleMaster"
          publisherLogo="/images/logo.png"
        />
      )}

      {type === 'howto' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": title,
              "description": description,
              "author": {
                "@type": "Person",
                "name": author
              },
              "datePublished": publishedTime,
              "dateModified": modifiedTime || publishedTime,
              "image": {
                "@type": "ImageObject",
                "url": imageUrl
              }
            })
          }}
        />
      )}
    </>
  );
}