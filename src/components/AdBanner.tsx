import { Box } from '@mui/material';
import Script from 'next/script';

export default function AdBanner() {
  return (
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUB_ID"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_PUB_ID"
        data-ad-slot="YOUR_AD_SLOT"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <Script id="ad-banner">
        (adsbygoogle = window.adsbygoogle || []).push({});
      </Script>
    </Box>
  );
}