import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ShoppingBag, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import SEOHead from "@/components/SEOHead";
import AdBlock from "@/components/ads/AdBlock";
import { fetchShopItems } from "@/lib/api";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import type { ShopItem } from "@/lib/types";

const categories = ["All", "Tech", "Puzzles", "Books"] as const;
const today = new Date().toISOString().split("T")[0];

function parseDescription(description: string) {
  const priceRegex = /(Rs|₹)\s*([\d,]+)\s*\/-/;
  const discountRegex = /\(([^)]+)\)/;
  const priceMatch = description.match(priceRegex);
  const discountMatch = description.match(discountRegex);
  const clean = description
    .replace(priceRegex, "")
    .replace(discountRegex, "")
    .replace(/\s+/g, " ")
    .trim();
  return {
    cleanDescription: clean,
    price: priceMatch ? `${priceMatch[1]} ${priceMatch[2]}/-` : null,
    discount: discountMatch ? discountMatch[1] : null,
  };
}

const ShopCard = ({ item }: { item: ShopItem }) => {
  const { cleanDescription, price, discount } = parseDescription(item.description || "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
      itemScope
      itemType="https://schema.org/Product"
    >
      {discount && (
        <Badge className="absolute right-3 top-3 z-10 bg-destructive text-destructive-foreground">{discount}</Badge>
      )}
      <div className="aspect-square overflow-hidden bg-muted flex items-center justify-center">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.productName}
          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          itemProp="image"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h2 className="font-display text-lg font-bold line-clamp-2 mb-1" itemProp="name">{item.productName}</h2>
        <div className="mb-2 flex items-center gap-1" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.round(item.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">
            <span itemProp="ratingValue">{(item.rating || 0).toFixed(1)}</span>
          </span>
          <meta itemProp="bestRating" content="5" />
        </div>
        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3" itemProp="description">{cleanDescription}</p>
        <div className="flex items-center justify-between gap-2">
          {price && (
            <span className="font-display font-bold text-primary" itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <span itemProp="price">{price}</span>
            </span>
          )}
          <Button asChild size="sm" className="ml-auto gap-1.5">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="h-4 w-4" />
              {item.buttonText || "Buy Now"}
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Shop = () => {
  const [category, setCategory] = useState<string>("All");
  const { data: items = [], isLoading, error } = useQuery({
    queryKey: ["shop"],
    queryFn: fetchShopItems,
  });

  const filtered = useMemo(() => {
    if (category === "All") return items;
    return items.filter((item) =>
      (item.description || "").toLowerCase().includes(category.toLowerCase())
    );
  }, [items, category]);

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl mb-2">Puzzle Books & Brain Games</h1>
            <p className="mx-auto max-w-lg text-muted-foreground">
              Curated mind-challenging books and puzzle games to sharpen your thinking
            </p>
            {/* Category filter */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Top leaderboard */}
          <AdBlock slot="5934836566" format="leaderboard" lazy={false} minHeight={90} className="mb-8" />

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
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              {category === "All" ? "No products available at the moment." : `No ${category} products found.`}
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

          {/* Ad before SEO blurb */}
          <AdBlock slot="5934836566" format="rectangle" lazy={true} minHeight={250} className="mt-8" />

          {/* SEO blurb */}
          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-border bg-muted/30 p-6 text-center">
            <h2 className="mb-2 font-display text-lg font-bold">Why Buy Puzzle Books & Games?</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our curated selection of puzzle books and strategy games is designed to challenge minds of all skill levels.
              Whether you're a beginner building problem-solving skills or an expert seeking a complex challenge,
              each product is hand-picked for quality and learning value.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["puzzle books for adults", "brain training games", "logic puzzle books", "strategy board games", "best puzzle gifts"].map((q) => (
                <span key={q} className="rounded-full bg-background border border-border px-3 py-1 text-xs text-muted-foreground">{q}</span>
              ))}
            </div>
          </div>

          {/* Bottom rectangle */}
          <AdBlock slot="5934836566" format="rectangle" lazy={true} minHeight={250} className="mt-4" />
        </div>
      </main>
    </>
  );
};

export default Shop;
