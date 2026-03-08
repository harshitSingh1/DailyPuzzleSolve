"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import AdBlock from "./AdBlock";

const NO_AD_PATHS = ["/about", "/privacy", "/terms", "/contact"];
const SESSION_KEY = "popup_ad_shown";

export default function ScrollPopupAd() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const shouldSkip =
    NO_AD_PATHS.includes(pathname) ||
    typeof window !== "undefined" &&
    sessionStorage.getItem(SESSION_KEY) === "1";

  const show = () => {
    if (triggered) return;

    setTriggered(true);
    setOpen(true);

    sessionStorage.setItem(SESSION_KEY, "1");
  };

  // Trigger after 45 seconds
  useEffect(() => {
    if (shouldSkip) return;

    const timer = setTimeout(show, 45000);

    return () => clearTimeout(timer);
  }, [shouldSkip]);

  // Trigger on 60% scroll
  useEffect(() => {
    if (shouldSkip) return;

    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;

      if (scrolled / total >= 0.6) show();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
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

        {/* Close Button */}
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
}