// src\components\home\WhatsNewSection.tsx
"use client";

import { memo } from "react";
import { Zap, RefreshCw, Paintbrush, Wrench } from "lucide-react";

const items = [
  { icon: Zap, title: "Faster Performance", desc: "Optimized loading, lazy routes, and smarter caching." },
  { icon: RefreshCw, title: "Daily Updated Solutions", desc: "Fresh answers within 30 min of each new puzzle." },
  { icon: Paintbrush, title: "Improved UI", desc: "Cleaner layout, dark mode, and mobile-first design." },
  { icon: Wrench, title: "More Tools & Features", desc: "Games hub, memes, shop, and community tools." },
];

const WhatsNewSection = memo(() => (
  <section className="py-10 sm:py-14">
    <div className="container">
      <h2 className="mb-2 text-center font-display text-2xl font-extrabold sm:text-3xl">What's New</h2>
      <p className="mx-auto mb-8 max-w-md text-center text-sm text-muted-foreground">
        We've rebuilt everything from scratch. Here's what changed.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-1 font-display text-sm font-bold">{item.title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
));

WhatsNewSection.displayName = "WhatsNewSection";
export default WhatsNewSection;
