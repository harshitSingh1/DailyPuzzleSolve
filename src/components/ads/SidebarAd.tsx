/**
 * SidebarAd - Sticky sidebar ad for desktop only (≥1024px).
 *
 * - Only visible on lg+ screens
 * - Sticky while scrolling
 * - Does not overlap content
 * - Auto-hides on small screens via CSS
 */

import AdBlock from "./AdBlock";

interface SidebarAdProps {
  slot?: string;
}

const SidebarAd = ({ slot = "5934836566" }: SidebarAdProps) => {
  return (
    <aside
      className="hidden xl:block w-[160px] shrink-0"
      aria-label="Advertisement"
    >
      <div className="sticky top-24">
        <AdBlock
          slot={slot}
          format="auto"
          minHeight={600}
          lazy={true}
          className="my-0 w-[160px]"
        />
      </div>
    </aside>
  );
};

export default SidebarAd;
