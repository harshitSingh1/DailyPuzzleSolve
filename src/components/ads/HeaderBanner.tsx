"use client";

import { usePathname } from "next/navigation";
import AdBlock from "./AdBlock";

const NO_AD_PATHS = ["/about", "/privacy", "/terms", "/contact", "/"];

export default function HeaderBanner() {

  const pathname = usePathname();

  if (NO_AD_PATHS.includes(pathname)) return null;

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
}