/**
 * AdBlock - CLS-safe, lazy-loaded, failsafe Google AdSense component.
 *
 * - Reserves height before ad loads  → prevents layout shift (CLS)
 * - Uses IntersectionObserver        → lazy loads below-fold ads
 * - Delays init by 1s                → avoids blocking main thread on load
 * - Catches all errors               → never crashes the page
 * - Shows nothing on ad-block        → clean graceful degradation
 */

import { useEffect, useRef, useState } from "react";

const PUBLISHER_ID = "ca-pub-5138062904998916";

// Height reservations per format (px) – prevents CLS
const FORMAT_HEIGHT: Record<string, number> = {
  leaderboard: 90,    // 728×90
  rectangle: 250,     // 300×250
  "in-article": 280,
  auto: 100,
  fluid: 120,
};

export type AdFormat = "leaderboard" | "rectangle" | "in-article" | "auto" | "fluid";

interface AdBlockProps {
  /** Google AdSense ad slot ID */
  slot: string;
  format?: AdFormat;
  /** Override the reserved min-height (px) */
  minHeight?: number;
  className?: string;
  /** Whether to lazy-load via IntersectionObserver (default: true) */
  lazy?: boolean;
  /** data-ad-layout-key for fluid / in-article */
  layoutKey?: string;
}

let scriptInjected = false;

function injectAdSenseScript() {
  if (scriptInjected) return;
  if (document.querySelector(`script[src*="adsbygoogle"]`)) {
    scriptInjected = true;
    return;
  }
  const script = document.createElement("script");
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`;
  script.async = true;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
  scriptInjected = true;
}

const AdBlock = ({
  slot,
  format = "auto",
  minHeight,
  className = "",
  lazy = true,
  layoutKey,
}: AdBlockProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [visible, setVisible] = useState(!lazy);

  // Intersection observer for lazy loading
  useEffect(() => {
    if (!lazy) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // start loading 200px before viewport
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy]);

  // Inject script + push ad unit once visible
  useEffect(() => {
    if (!visible || pushed.current) return;

    // Delay 1 second to avoid blocking LCP / main thread
    const timer = setTimeout(() => {
      try {
        injectAdSenseScript();
        if (insRef.current && !insRef.current.getAttribute("data-adsbygoogle-status")) {
          (window as any).adsbygoogle = (window as any).adsbygoogle || [];
          (window as any).adsbygoogle.push({});
          pushed.current = true;
        }
      } catch {
        // Silent fail - ad blocker or network error
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [visible]);

  const reservedHeight = minHeight ?? FORMAT_HEIGHT[format] ?? 100;
  const isFluid = format === "fluid" || format === "in-article";

  return (
    <div
      ref={containerRef}
      className={`ad-block mx-auto my-6 overflow-hidden text-center ${className}`}
      style={{ minHeight: reservedHeight }}
      aria-label="Advertisement"
    >
      {visible && (
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", minHeight: reservedHeight }}
          data-ad-client={PUBLISHER_ID}
          data-ad-slot={slot}
          data-ad-format={isFluid ? "fluid" : format}
          data-full-width-responsive="true"
          {...(isFluid && layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
          {...(format === "in-article" ? { "data-ad-layout": "in-article" } : {})}
        />
      )}
    </div>
  );
};

export default AdBlock;
