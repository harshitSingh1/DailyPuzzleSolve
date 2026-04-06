// src\components\shop\ShopCard.tsx
"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ShopItem } from "@/lib/types";
import { parseDescription } from "@/lib/shopUtils";
import Image from "next/image";

const ShopCard = ({ item }: { item: ShopItem }) => {
  const { cleanDescription, price, discount, priceNumeric } = parseDescription(item.description || "");
  const safeRating = Number(item.rating) || 4.3;
  const safeReviewCount = Math.max(1, Math.round(safeRating));

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
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.productName || "Product"}
          width={400}
          height={400}
          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          priority={false}
loading="lazy"
sizes="(max-width:768px) 100vw, 400px"
          itemProp="image"
          />
      </div>
      <meta itemProp="name" content={item.productName || "Product"} />
      <div className="flex flex-1 flex-col p-4">
        <h2 className="font-display text-lg font-bold line-clamp-2 mb-1">{item.productName}</h2>
        <div className="mb-2 flex items-center gap-1" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.round(safeRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">
            {safeRating.toFixed(1)}
          </span>
          <meta itemProp="ratingValue" content={safeRating.toFixed(1)} />
          <meta itemProp="reviewCount" content={String(safeReviewCount)} />
          <meta itemProp="bestRating" content="5" />
          <meta itemProp="worstRating" content="0" />
        </div>
        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3" itemProp="description">{cleanDescription}</p>
        <div className="flex items-center justify-between gap-2">
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="price" content={String(priceNumeric || 0)} />
            <meta itemProp="priceCurrency" content="INR" />
            <meta itemProp="availability" content="https://schema.org/InStock" />
            <meta itemProp="priceValidUntil" content={`${new Date().getFullYear() + 1}-12-31`} />
            <meta itemProp="url" content={item.url} />
          
            {price && (
              <span className="font-display font-bold text-primary">{price}</span>
            )}
          </div>
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

export default ShopCard;
