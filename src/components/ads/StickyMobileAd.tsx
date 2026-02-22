/**
 * StickyMobileAd - Fixed bottom banner on mobile/tablet only.
 *
 * - Shown only on screens < 1024px
 * - Has a close button (Google policy compliant)
 * - Height reserved; no CLS
 * - Hidden on policy pages
 * - Shows once per session after 5s delay
 */

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import AdBlock from "./AdBlock";

const NO_AD_PATHS = ["/about", "/privacy", "/terms", "/contact"];
const SESSION_KEY = "sticky_ad_dismissed";

const StickyMobileAd = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() =>
    sessionStorage.getItem(SESSION_KEY) === "1"
  );

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleClose = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  if (NO_AD_PATHS.some((p) => pathname === p)) return null;
  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
      style={{ minHeight: 60 }}
      role="complementary"
      aria-label="Advertisement"
    >
      <div className="relative bg-background/95 shadow-[0_-2px_12px_rgba(0,0,0,0.15)] backdrop-blur-sm">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 right-3 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground shadow hover:bg-muted/80"
          aria-label="Close ad"
        >
          <X className="h-3 w-3" />
        </button>

        <AdBlock
          slot="5934836566"
          format="auto"
          lazy={false}
          minHeight={60}
          className="my-0 max-w-[468px]"
        />
      </div>
    </div>
  );
};

export default StickyMobileAd;
