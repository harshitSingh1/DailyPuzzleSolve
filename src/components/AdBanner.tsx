// components/AdBanner.tsx
import { Box } from '@mui/material';
import Script from 'next/script';

const AdBanner = () => {
  return (
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5138062904998916"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5138062904998916"
        data-ad-slot="YOUR_AD_SLOT"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <Script id="ad-banner">
        (adsbygoogle = window.adsbygoogle || []).push({});
      </Script>
    </Box>
  );
};

export default AdBanner;