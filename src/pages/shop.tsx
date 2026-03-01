import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SEOHead from "@/components/SEOHead";
import AdBlock from "@/components/ads/AdBlock";
import ShopCard from "@/components/shop/ShopCard";
import ShopFilters, { type SortOption } from "@/components/shop/ShopFilters";
import { fetchShopItems } from "@/lib/api";
import { parseDescription } from "@/lib/shopUtils";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { Link } from "react-router-dom";
import type { ShopItem } from "@/lib/types";

const categories = ["All", "Tech", "Puzzles", "Books"] as const;
const today = new Date().toISOString().split("T")[0];
const MAX_PRICE = 100000;

const Shop = () => {
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<SortOption>("none");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);

  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shop"],
    queryFn: fetchShopItems,
  });

  const handleCategoryChange = useCallback((c: string) => setCategory(c), []);
  const handleSortChange = useCallback((s: SortOption) => setSort(s), []);
  const handlePriceRangeChange = useCallback((r: [number, number]) => setPriceRange(r), []);

  const filtered = useMemo(() => {
    let result = items;

    // Category filter
    if (category !== "All") {
      result = result.filter((item) => (item.description || "").toLowerCase().includes(category.toLowerCase()));
    }

    // Parse descriptions once for filtering/sorting
    const withParsed = result.map((item) => ({
      item,
      parsed: parseDescription(item.description || ""),
    }));

    // Price range filter
    const priceFiltered = withParsed.filter(({ parsed }) => {
      if (parsed.priceNumeric === null) return true; // keep items without price
      const aboveMin = parsed.priceNumeric >= priceRange[0];
      const belowMax = priceRange[1] >= MAX_PRICE ? true : parsed.priceNumeric <= priceRange[1];
      return aboveMin && belowMax;
    });

    // Smart sort-filters (best-deal / featured applied as filters)
    let smartFiltered = priceFiltered;
    if (sort === "best-deal") {
      smartFiltered = smartFiltered.filter(({ parsed }) => parsed.discount !== null);
    }
    if (sort === "featured") {
      smartFiltered = smartFiltered.filter(({ parsed }) => (parsed.discount || "").toLowerCase().includes("featured"));
    }

    // Sort
    if (sort === "price-asc") {
      smartFiltered.sort((a, b) => (a.parsed.priceNumeric ?? Infinity) - (b.parsed.priceNumeric ?? Infinity));
    } else if (sort === "price-desc") {
      smartFiltered.sort((a, b) => (b.parsed.priceNumeric ?? 0) - (a.parsed.priceNumeric ?? 0));
    } else if (sort === "rating-desc") {
      smartFiltered.sort((a, b) => (b.item.rating || 0) - (a.item.rating || 0));
    }

    return smartFiltered.map(({ item }) => item);
  }, [items, category, priceRange, sort]);

  return (
    <>
      <SEOHead
        title="Puzzle Books & Brain Training Games Shop – Best Picks"
        description="Shop curated puzzle books, strategy games, and brain training products. Find the perfect mental challenge for all skill levels. Daily updated deals."
        path="/shop"
        dateModified={today}
        breadcrumbs={[{ name: "Shop", url: `${SITE_URL}/shop` }]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Puzzle Books & Games Shop",
          description: "Curated puzzle books and brain training games for all skill levels.",
          url: `${SITE_URL}/shop`,
          dateModified: today,
          publisher: { "@type": "Organization", name: SITE_NAME },
        }}
      />
      <main className="pt-6 pb-12">
        <div className="container">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl mb-3">Puzzle Books & Brain Games</h1>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground leading-relaxed">
              We have compared 10 to 15 similar products in each category and verified all reviews before listing them to
              provide you with the best products in the market. To report or suggest any product, please{" "}
              <Link to="/contact" className="text-primary underline underline-offset-2 hover:text-primary/80">
                Contact Us
              </Link>
              .
            </p>
          </motion.div>

          {/* Affiliate Disclosure */}
          <div className="mx-auto mb-8 max-w-3xl rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-muted-foreground">
            <strong className="text-foreground">Affiliate Disclosure:</strong> Some links on this page are affiliate links. If you make a purchase through these links, we may earn a small commission at no extra cost to you. This helps us keep the site running and continue providing free daily puzzle solutions. Read our full <Link to="/disclaimer" className="text-primary underline underline-offset-2">Disclaimer</Link>.
          </div>

          {/* Filters Bar */}
          <ShopFilters
            category={category}
            categories={categories}
            onCategoryChange={handleCategoryChange}
            sort={sort}
            onSortChange={handleSortChange}
            priceRange={priceRange}
            onPriceRangeChange={handlePriceRangeChange}
            maxPrice={MAX_PRICE}
          />
          {/* Top leaderboard */}
          <AdBlock slot="5934836566" format="leaderboard" lazy={false} minHeight={90} className="my-6" />

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
                  <Skeleton className="aspect-square w-full" />
                  <div className="flex flex-col gap-3 p-4">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-9 w-full mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <p className="text-muted-foreground">Server is waking up, retrying...</p>
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No products match the current filters. Try adjusting your selection.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((item) => (
                <ShopCard key={item._id} item={item} />
              ))}
            </div>
          )}

          {/* Browse more */}
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-muted-foreground">Can't find what you're looking for?</p>
            <Button asChild size="lg" className="gap-2">
              <a href="https://fktr.in/mIGawZ6" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" /> Browse More Products
              </a>
            </Button>
          </div>

          <AdBlock slot="5934836566" format="rectangle" lazy={true} minHeight={250} className="mt-8" />

          {/* Buyer Guide (repositioned below grid) */}
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              If you enjoy solving LinkedIn puzzles daily, you will love having a physical puzzle book or strategy game to practice with offline. Puzzle books strengthen the same pattern recognition and logical deduction skills that make you better at Pinpoint, Queens, and Tango. Strategy board games add a social element, letting you challenge friends and family while training your brain.
            </p>
            <p>
              Our team personally reviews every product before adding it to this page. We compare pricing, read verified buyer reviews, check the publisher's reputation, and test difficulty levels to make sure each recommendation offers genuine value. Products that receive consistently negative feedback or poor quality ratings are removed from our listings.
            </p>
            <p>
              Whether you are shopping for yourself or looking for a thoughtful gift for a puzzle-loving friend, you will find something here that fits. We organize products by category and price range so you can quickly narrow down your options.
            </p>
          </div>

          {/* SEO blurb */}
          <section className="mx-auto mt-8 max-w-2xl rounded-xl border border-border bg-muted/30 p-6 text-center">
            <h2 className="mb-2 font-display text-lg font-bold">Why Buy Puzzle Books & Games?</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our curated selection of puzzle books and strategy games is designed to challenge minds of all skill
              levels. Whether you're a beginner building problem-solving skills or an expert seeking a complex
              challenge, each product is hand-picked for quality and learning value.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {[
                "puzzle books for adults",
                "brain training games",
                "logic puzzle books",
                "strategy board games",
                "best puzzle gifts",
              ].map((q) => (
                <span
                  key={q}
                  className="rounded-full bg-background border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {q}
                </span>
              ))}
            </div>
          </section>

          <AdBlock slot="5934836566" format="rectangle" lazy={true} minHeight={250} className="mt-4" />
        </div>
      </main>
    </>
  );
};

export default Shop;
