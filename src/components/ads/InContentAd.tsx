"use client";

import AdBlock from "./AdBlock";

interface Props {
  slot?: string;
  className?: string;
}

export default function InContentAd({
  slot = "5934836566",
  className = "",
}: Props) {

  return (
    <AdBlock
      slot={slot}
      format="in-article"
      layoutKey="-fb+5w+4e-db+86"
      lazy
      minHeight={280}
      className={className}
    />
  );
}