import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Character Encoding */}
        <meta charSet="utf-8" />
        
        {/* PWA Primary Meta Tags */}
        <meta name="application-name" content="LogicPuzzleMaster" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LogicPuzzleMaster" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FFFFFF" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Google Fonts Preconnect - Required by Next.js */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />

        {/* Critical CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html {
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 
                  "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, 
                  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
              }
            `
          }}
        />

        {/* Google Fonts with proper preconnect */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap"
          media="print"
          onLoad={(e) => {
            const target = e.target as HTMLLinkElement;
            target.media = 'all';
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* AdSense Script with proper loading */}
        <Script
          id="adsbygoogle-script"
          strategy="lazyOnload"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-0000000000000000'}`}
          crossOrigin="anonymous"
          onError={(e) => {
            console.error('AdSense script failed to load', e);
          }}
        />

        {/* No-JS Fallback */}
        <noscript>
          <style>{`
            .requires-javascript {
              display: none !important;
            }
          `}</style>
          <div style={{
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#fafafa'
          }}>
            Please enable JavaScript to use all features of LogicPuzzleMaster.
          </div>
        </noscript>
      </body>
    </Html>
  );
}