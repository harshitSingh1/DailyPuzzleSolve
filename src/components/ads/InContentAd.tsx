/**
 * InContentAd - In-article / fluid ad for placement within page content.
 * High RPM format. Lazy-loaded by default.
 */

import AdBlock from "./AdBlock";

interface InContentAdProps {
  slot?: string;
  className?: string;
}

const InContentAd = ({ slot = "5934836566", className = "" }: InContentAdProps) => (
  <AdBlock
    slot={slot}
    format="in-article"
    layoutKey="-fb+5w+4e-db+86"
    lazy={true}
    minHeight={280}
    className={className}
  />
);

export default InContentAd;
