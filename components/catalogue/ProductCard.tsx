"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { SerializedProduct } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  onView,
  view = "grid",
  selectable = false,
  selected = false,
  onToggleSelect,
  onQuoteNow,
  whatsappPhone,
  companyName = "JK Online Hub",
}: {
  product: SerializedProduct;
  onView: (product: SerializedProduct) => void;
  view?: "grid" | "list";
  selectable?: boolean;
  selected?: boolean;
  onToggleSelect?: (product: SerializedProduct) => void;
  onQuoteNow?: (product: SerializedProduct) => void;
  whatsappPhone?: string;
  companyName?: string;
}) {
  const inStock = product.stock > 0;
  const image = product.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      className={cn(
        "group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md",
        view === "list" && "flex flex-col sm:flex-row",
        selectable && selected && "ring-2 ring-primary"
      )}
    >
      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden bg-secondary/40",
          view === "list" && "sm:w-56 sm:shrink-0"
        )}
      >
        {selectable && (
          <div className="absolute top-3 right-3 z-10 flex size-7 items-center justify-center rounded-full bg-background/90 shadow-sm">
            <Checkbox
              checked={selected}
              onCheckedChange={() => onToggleSelect?.(product)}
              aria-label={selected ? "Deselect product" : "Select product"}
            />
          </div>
        )}
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <PackageSearch className="size-10" />
          </div>
        )}
        {product.featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          {product.category && (
            <span className="text-xs font-medium tracking-wide text-accent uppercase">
              {product.category.name}
            </span>
          )}
          <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
        </div>

        <h3 className="line-clamp-1 font-semibold text-foreground">{product.name}</h3>

        {product.shortDescription && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="flex flex-col">
            {product.price != null && (
              <span className="font-semibold text-foreground">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            )}
            <span className={cn("text-xs", inStock ? "text-emerald-600" : "text-destructive")}>
              {inStock ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>
          <Button
            size="sm"
            className="rounded-full"
            onClick={() => onView(product)}
          >
            View Details
          </Button>
        </div>
      </div>

      {whatsappPhone && onQuoteNow && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuoteNow(product);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-b-3xl bg-[#25D366] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5c]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp Inquiry
        </button>
      )}
    </motion.div>
  );
}
