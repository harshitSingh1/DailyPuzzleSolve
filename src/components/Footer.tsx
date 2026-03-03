import { useState, memo } from "react";
import { Link } from "react-router-dom";
import { Youtube, Twitter, Linkedin, Send, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SOCIAL_LINKS, SITE_NAME, PUZZLE_GAMES } from "@/lib/constants";

const quickLinks = [
  { path: "/tools", name: "Useful Tools" },
  { path: "/shop", name: "Buy Fun Games" },
  { path: "/games", name: "More Puzzles" },
  { path: "/blog", name: "Read Articles" },
  { path: "/memes", name: "Tech Memes" },
];

const infoLinks = [
  { path: "/about", name: "About Us" },
  { path: "/editorial-policy", name: "Editorial Policy" },
  { path: "/privacy", name: "Privacy Policy" },
  { path: "/terms", name: "Terms of Service" },
  { path: "/disclaimer", name: "Disclaimer" },
  { path: "/contact", name: "Contact" },
];

const socialItems = [
  { icon: Youtube, url: SOCIAL_LINKS.youtube, label: "YouTube", hoverColor: "hover:bg-[hsl(0,100%,50%)]" },
  { icon: Linkedin, url: SOCIAL_LINKS.linkedin, label: "LinkedIn", hoverColor: "hover:bg-[hsl(210,70%,35%)]" },
  { icon: Twitter, url: SOCIAL_LINKS.twitter, label: "Twitter", hoverColor: "hover:bg-[hsl(203,89%,53%)]" },
  { icon: Facebook, url: SOCIAL_LINKS.facebook, label: "Facebook", hoverColor: "hover:bg-[hsl(220,46%,48%)]" },
  { icon: Instagram, url: SOCIAL_LINKS.instagram, label: "Instagram", hoverColor: "hover:bg-[hsl(340,75%,54%)]" },
];

const Footer = memo(() => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[hsl(210,30%,18%)] text-white">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/logo1.png" alt="PuzzleLogicHub Logo" width={32} height={32} className="h-8 w-8" loading="lazy" />
              <span className="font-display text-xl font-bold text-gradient">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-white/70">
              Your daily source for LinkedIn puzzle solutions, strategy guides, and brain training resources. Updated every day within 30 minutes of each puzzle going live.
            </p>
            <div className="flex gap-2">
              {socialItems.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-all ${s.hoverColor} hover:scale-110`}
                  aria-label={`Follow PuzzleLogicHub on ${s.label}`}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-white/60">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/70 transition-all hover:text-white hover:pl-1">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Puzzle Solutions + Information */}
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-white/60">Today's Solutions</h4>
            <ul className="space-y-2">
              {PUZZLE_GAMES.slice(0, 6).map((g) => (
                <li key={g.id}>
                  <Link to={`/solutions/${g.id}`} className="text-sm text-white/70 transition-all hover:text-white hover:pl-1">
                    {g.label} Answer Today
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mt-4 mb-3 font-display text-sm font-semibold uppercase tracking-wider text-white/60">Information</h4>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/70 transition-all hover:text-white hover:pl-1">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-white/60">Newsletter</h4>
            <p className="mb-3 text-sm text-white/70">Get daily puzzle solutions straight to your inbox</p>
            <div className="flex gap-2">
              <Input
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-white/20 bg-white text-foreground text-sm"
                aria-label="Email address for newsletter"
              />
              <Button size="icon" className="shrink-0" aria-label="Subscribe to newsletter">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
          <span className="text-center">
            Contact: <a href="mailto:contact@puzzlelogichub.com" className="text-white/70 hover:text-white underline">contact@puzzlelogichub.com</a>
          </span>
          <span>Not affiliated with LinkedIn Corporation. All trademarks belong to their respective owners.</span>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;