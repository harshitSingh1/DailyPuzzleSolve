/**
 * ScrollPopupAd - Soft center popup ad.
 *
 * Rules (Google-policy compliant):
 * - Shown ONLY after 45 seconds OR 60% scroll depth
 * - Once per session
 * - Has a mandatory close button
 * - Non-blocking semi-transparent overlay
 * - Disabled on policy pages
 */

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import AdBlock from "./AdBlock";

const NO_AD_PATHS = ["/about", "/privacy", "/terms", "/contact"];
const SESSION_KEY = "popup_ad_shown";

const ScrollPopupAd = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const shouldSkip =
    NO_AD_PATHS.some((p) => pathname === p) ||
    sessionStorage.getItem(SESSION_KEY) === "1";

  const show = () => {
    if (triggered) return;
    setTriggered(true);
    setOpen(true);
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  // Trigger on 45s timer
  useEffect(() => {
    if (shouldSkip) return;
    const timer = setTimeout(show, 45_000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldSkip]);

  // Trigger on 60% scroll depth
  useEffect(() => {
    if (shouldSkip) return;
    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total >= 0.6) show();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldSkip]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Advertisement"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="relative rounded-xl bg-card shadow-2xl">
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute -right-3 -top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background shadow-lg hover:opacity-80"
          aria-label="Close advertisement"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="p-4">
          <p className="mb-2 text-center text-xs font-medium text-muted-foreground">
            Advertisement
          </p>
          <AdBlock
            slot="5934836566"
            format="rectangle"
            lazy={false}
            minHeight={250}
            className="my-0 w-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollPopupAd;
