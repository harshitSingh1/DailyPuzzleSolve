/**
 * HeaderBanner - Leaderboard/responsive ad placed below the navbar.
 * Visible only on content pages; hidden on About, Privacy, Terms, Contact.
 * Uses the AdBlock component for CLS-safe rendering.
 */

import { useLocation } from "react-router-dom";
import AdBlock from "./AdBlock";

const NO_AD_PATHS = ["/about", "/privacy", "/terms", "/contact", "/"];

const HeaderBanner = () => {
  const { pathname } = useLocation();
  if (NO_AD_PATHS.some((p) => pathname === p)) return null;

  return (
    <div className="w-full border-b border-border/40 bg-background">
      <AdBlock
        slot="5934836566"
        format="leaderboard"
        lazy={false}
        minHeight={90}
        className="max-w-[728px] py-1"
      />
    </div>
  );
};

export default HeaderBanner;
