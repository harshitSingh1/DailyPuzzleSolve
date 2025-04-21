// components/AdSenseAd.tsx
import Script from 'next/script';
import { useEffect, useRef } from 'react';

interface AdSenseAdProps {
  slot: string;
  layout?: string;
  format?: string;
  style?: React.CSSProperties;
  layoutKey?: string;
  className?: string;
}

export default function AdSenseAd({ 
  slot, 
  layout = '', 
  format = 'auto', 
  style = { display: 'block' },
  layoutKey = '',
  className = ''
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const adInitialized = useRef(false);

  useEffect(() => {
    if (!adInitialized.current && adRef.current) {
      try {
        const adElement = adRef.current.querySelector('.adsbygoogle');
        if (adElement && !adElement.getAttribute('data-adsbygoogle-status')) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adInitialized.current = true;
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }

    return () => {
    };
  }, []);

  return (
    <div 
      ref={adRef}
      className={`ad-container ${className}`} 
      style={{ margin: '20px 0', ...style }}
    >
      <Script 
        id={`adsense-script-${slot}`}
        async 
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
        onError={(e) => {
          console.error('AdSense script failed to load', e);
        }}
      />
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
      />
    </div>
  );
}