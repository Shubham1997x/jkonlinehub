"use client";

import { ProductCard } from "@/components/catalogue/ProductCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { SerializedProduct } from "@/lib/types";
import { PackageSearch } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  onView,
  view = "grid",
  selectable = false,
  selectedIds,
  onToggleSelect,
  onQuoteNow,
  whatsappPhone,
  companyName,
}: {
  products: SerializedProduct[];
  onView: (product: SerializedProduct) => void;
  view?: "grid" | "list";
  selectable?: boolean;
  selectedIds?: Set<string>;
  onToggleSelect?: (product: SerializedProduct) => void;
  onQuoteNow?: (product: SerializedProduct) => void;
  whatsappPhone?: string;
  companyName?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 text-center text-muted-foreground">
        <PackageSearch className="mb-4 size-12 opacity-20" />
        <p className="text-lg font-medium text-foreground">No products found</p>
        <p className="text-sm">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-6",
        view === "grid"
          ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
      )}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onView={onView}
          view={view}
          selectable={selectable}
          selected={selectedIds?.has(product.id)}
          onToggleSelect={onToggleSelect}
          onQuoteNow={onQuoteNow}
          whatsappPhone={whatsappPhone}
          companyName={companyName}
        />
      ))}
    </div>
  );
}
