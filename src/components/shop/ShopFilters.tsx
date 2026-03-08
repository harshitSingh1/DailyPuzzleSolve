// src\components\shop\ShopFilters.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type SortOption = "none" | "price-asc" | "price-desc" | "rating-desc" | "best-deal" | "featured";

interface ShopFiltersProps {
  category: string;
  categories: readonly string[];
  onCategoryChange: (cat: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
  { value: "best-deal", label: "Best Deal" },
  { value: "featured", label: "Featured" },
];

function formatPrice(val: number, max: number) {
  if (val >= max) return `${(max / 1000).toFixed(0)}k+`;
  if (val >= 1000) return `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}k`;
  return String(val);
}

const ShopFilters = ({
  category,
  categories,
  onCategoryChange,
  sort,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  maxPrice,
}: ShopFiltersProps) => {
  const [localRange, setLocalRange] = useState<[number, number]>(priceRange);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalRange(priceRange);
  }, [priceRange]);

const handleRangeChange = useCallback(
  (values: number[]) => {
    const range: [number, number] = [values[0], values[1]];
    setLocalRange(range);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onPriceRangeChange(range);
    }, 150);
  },
  [onPriceRangeChange],
);

  return (
    <div
      className="mx-auto max-w-[1100px] grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2.5 md:flex md:flex-row md:items-center md:justify-center md:gap-4 rounded-lg border border-border bg-card px-3 py-2.5"
      role="search"
      aria-label="Product filters"
    >
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5 shrink-0" role="tablist" aria-label="Category filter">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            size="sm"
            className="rounded-full text-xs h-8 px-3"
            role="tab"
            aria-selected={category === cat}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="shrink-0 w-full justify-self-end max-w-[160px] md:w-44">
        <Select key={sort === "none" ? "cleared" : "active"} value={sort === "none" ? undefined : sort} onValueChange={(val: string) => onSortChange(val as SortOption)}>
          <SelectTrigger className="h-8 text-xs" aria-label="Sort products">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sort !== "none" && (
              <SelectItem value="none" className="text-xs text-muted-foreground">
                Clear Sort
              </SelectItem>
            )}
            {sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-xs">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Separator - desktop only */}
      <div className="hidden md:block h-6 w-px bg-border shrink-0" />

      {/* Price Range Slider */}
      <div className="col-span-2 md:col-span-1 shrink-0 w-full md:w-[280px] md:max-w-[280px]">
        <Slider
          min={0}
          max={maxPrice}
          step={500}
          value={localRange}
          onValueChange={handleRangeChange}
          className="w-full"
          aria-label="Price range"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-muted-foreground">Rs {formatPrice(localRange[0], maxPrice)}</span>
          <span className="text-[10px] text-muted-foreground">Rs {formatPrice(localRange[1], maxPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopFilters;
