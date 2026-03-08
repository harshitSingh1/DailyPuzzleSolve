"use client";

import { useEffect, useRef, useState } from "react";

const PUBLISHER_ID = "ca-pub-5138062904998916";

const FORMAT_HEIGHT: Record<string, number> = {
  leaderboard: 90,
  rectangle: 250,
  "in-article": 280,
  auto: 100,
  fluid: 120,
};

export type AdFormat = "leaderboard" | "rectangle" | "in-article" | "auto" | "fluid";

interface AdBlockProps {
  slot: string;
  format?: AdFormat;
  minHeight?: number;
  className?: string;
  lazy?: boolean;
  layoutKey?: string;
}

export default function AdBlock({
  slot,
  format = "auto",
  minHeight,
  className = "",
  lazy = true,
  layoutKey,
}: AdBlockProps) {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const insRef = useRef<HTMLModElement | null>(null);
  const pushed = useRef(false);

  const [visible, setVisible] = useState(!lazy);

  // Lazy loading
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
      { rootMargin: "200px" }
    );

    observer.observe(el);

    return () => observer.disconnect();

  }, [lazy]);

  // Push AdSense
  useEffect(() => {

    if (!visible || pushed.current) return;

    const timer = setTimeout(() => {
      try {
        if (insRef.current && !(insRef.current as any).dataset.adsbygoogleStatus) {
          (window as any).adsbygoogle = (window as any).adsbygoogle || [];
          (window as any).adsbygoogle.push({});
          pushed.current = true;
        }
      } catch {}
    }, 1000);

    return () => clearTimeout(timer);

  }, [visible]);

  const reservedHeight = minHeight ?? FORMAT_HEIGHT[format] ?? 100;
  const isFluid = format === "fluid" || format === "in-article";

  return (
    <div
      ref={containerRef}
      className={`mx-auto my-6 text-center overflow-hidden ${className}`}
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
}