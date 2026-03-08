// src\components\Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, PUZZLE_GAMES } from "@/lib/constants";
import ThemeToggle from "@/components/ThemeToggle";
import PuzzleIcon from "@/components/PuzzleIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const pathname = usePathname();

 const isActive = (href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

const isSolutionsActive = pathname.startsWith("/solutions");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo1.png" alt="LogicPuzzleHub Logo" width={28} height={28} className="h-7 w-7" />
          <span className="font-display text-lg font-extrabold tracking-tight">
            <span className="text-gradient">LogicPuzzleHub</span>
          </span>
          <span className="ml-1 hidden sm:inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {/* Home */}
          <Link
            href="/"
            className={`px-2.5 py-1.5 font-display text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") && pathname === "/"
                ? "text-primary"
                : "text-foreground"
            }`}
          >
            Home
          </Link>

          {/* Solutions dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 font-display text-sm font-medium transition-colors hover:text-primary outline-none ${
                  isSolutionsActive ? "text-primary" : "text-foreground"
                }`}
              >
                Solutions
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[340px] p-3">
              <div className="grid grid-cols-3 gap-1">
                {PUZZLE_GAMES.map((game) => (
                  <DropdownMenuItem key={game.id} asChild className="rounded-md p-0">
                    <Link
                      href={`/solutions/${game.id}`}
                      className="flex flex-col items-center gap-1 rounded-md px-2 py-2.5 text-center transition-colors hover:bg-accent"
                    >
                      <PuzzleIcon icon={game.icon} className="h-5 w-5 text-primary" />
                      <span className="text-xs font-medium leading-tight">{game.label.replace("LinkedIn ", "")}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Other nav links */}
          {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2.5 py-1.5 font-display text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.href) ? "text-primary" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden rounded-lg font-display font-semibold lg:inline-flex">
            <Link href="/contact">Contact</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-card p-3 lg:hidden">
          <div className="flex flex-col gap-0.5">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`rounded-md px-3 py-2 font-display text-sm font-medium transition-colors hover:bg-accent ${
                pathname === "/" ? "bg-accent text-primary font-semibold" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>

            {/* Solutions accordion */}
            <Collapsible open={solutionsOpen} onOpenChange={setSolutionsOpen}>
              <CollapsibleTrigger
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 font-display text-sm font-medium transition-colors hover:bg-accent ${
                  isSolutionsActive ? "bg-accent text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                Solutions
                <ChevronDown className={`h-4 w-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-3 mt-0.5 grid grid-cols-2 gap-0.5 border-l-2 border-border pl-2">
                  {PUZZLE_GAMES.map((game) => (
                    <Link
                      key={game.id}
                      href={`/solutions/${game.id}`}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-colors hover:bg-accent ${
                        pathname === `/solutions/${game.id}`
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      <PuzzleIcon icon={game.icon} className="h-4 w-4" />
                      <span>{game.label.replace("LinkedIn ", "")}</span>
                    </Link>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2 font-display text-sm font-medium transition-colors hover:bg-accent ${
                  isActive(link.href) ? "bg-accent text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-1.5 rounded-md bg-primary px-3 py-2 text-center font-display text-sm font-semibold text-primary-foreground"
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
