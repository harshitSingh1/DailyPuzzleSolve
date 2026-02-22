import { useEffect, useRef } from "react";

const ADSENSE_ID = "ca-pub-5138062904998916";

interface AdSenseAdProps {
  slot: string;
  format?: string;
  layout?: string;
  layoutKey?: string;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

const AdSenseAd = ({
  slot,
  format = "auto",
  layout = "",
  layoutKey = "",
  className = "",
  style = { display: "block" },
}: AdSenseAdProps) => {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Load the AdSense script once
    if (!document.querySelector(`script[src*="adsbygoogle"]`)) {
      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!initialized.current && adRef.current) {
      try {
        if (!adRef.current.getAttribute("data-adsbygoogle-status")) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          initialized.current = true;
        }
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, []);

  return (
    <div className={`ad-container mx-auto my-6 text-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layout && { "data-ad-layout": layout })}
        {...(layoutKey && { "data-ad-layout-key": layoutKey })}
      />
    </div>
  );
};

export default AdSenseAd;
