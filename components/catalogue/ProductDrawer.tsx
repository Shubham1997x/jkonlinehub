"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/catalogue/ImageGallery";
import { ProductCard } from "@/components/catalogue/ProductCard";
import { fetchRelatedProducts } from "@/lib/actions/catalogue";
import { buildWhatsAppUrl } from "@/components/shared/WhatsAppButton";
import type { SerializedProduct } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ClipboardList, CheckCircle2 } from "lucide-react";

// Inline WhatsApp SVG to avoid any client/server mismatch
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const specFields: { key: keyof SerializedProduct; label: string }[] = [
  { key: "brand", label: "Brand" },
  { key: "material", label: "Material" },
  { key: "dimensions", label: "Dimensions" },
  { key: "weight", label: "Weight" },
  { key: "subCategory", label: "Sub-category" },
];

export function ProductDrawer({
  product,
  open,
  onOpenChange,
  onSelectRelated,
  whatsappPhone,
  companyName = "JK Online Hub",
  selectedIds,
  onToggleSelect,
  onQuoteNow,
}: {
  product: SerializedProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectRelated: (product: SerializedProduct) => void;
  whatsappPhone?: string;
  companyName?: string;
  selectedIds?: Set<string>;
  onToggleSelect?: (product: SerializedProduct) => void;
  onQuoteNow?: (product: SerializedProduct) => void;
}) {
  const [relatedProducts, setRelatedProducts] = useState<SerializedProduct[]>([]);

  useEffect(() => {
    if (!product) return;
    let cancelled = false;
    fetchRelatedProducts(product).then((related) => {
      if (!cancelled) setRelatedProducts(related);
    });
    return () => {
      cancelled = true;
    };
  }, [product]);

  const isInQuote = product ? selectedIds?.has(product.id) : false;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        {product && (
          <>
            <SheetHeader>
              <SheetTitle>{product.name}</SheetTitle>
            </SheetHeader>

            <div className="space-y-6 px-4 pb-8">
              <ImageGallery images={product.images} alt={product.name} />

              <div className="flex flex-wrap items-center gap-2">
                {product.category && <Badge variant="secondary">{product.category.name}</Badge>}
                {product.featured && (
                  <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                )}
                <Badge variant="outline">SKU: {product.sku}</Badge>
                <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </Badge>
              </div>

              {product.price != null && (
                <p className="text-2xl font-semibold text-foreground">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              )}

              {product.description && (
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-foreground">Description</h4>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
              )}

              <div>
                <h4 className="mb-2 text-sm font-semibold text-foreground">Specifications</h4>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {specFields
                    .filter((f) => product[f.key])
                    .map((f) => (
                      <div key={f.key}>
                        <dt className="text-muted-foreground">{f.label}</dt>
                        <dd className="font-medium text-foreground">{String(product[f.key])}</dd>
                      </div>
                    ))}
                </dl>
              </div>

              {product.tags.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col gap-3 pt-1">
                {/* Add to Quote List */}
                <Button
                  size="lg"
                  variant={isInQuote ? "secondary" : "default"}
                  className={cn(
                    "w-full rounded-full font-semibold transition-all",
                    isInQuote && "border-2 border-primary text-primary"
                  )}
                  onClick={() => onToggleSelect?.(product)}
                >
                  {isInQuote ? (
                    <>
                      <CheckCircle2 className="size-4 text-primary" />
                      Added to Quote List
                    </>
                  ) : (
                    <>
                      <ClipboardList className="size-4" />
                      Add to Quote List
                    </>
                  )}
                </Button>

                {/* WhatsApp Inquiry */}
                {whatsappPhone && onQuoteNow && (
                  <button
                    onClick={() => onQuoteNow(product)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5c]"
                  >
                    <WhatsAppIcon />
                    WhatsApp Inquiry
                  </button>
                )}
              </div>

              {relatedProducts.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-foreground">Related Products</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {relatedProducts.map((related) => (
                      <ProductCard
                        key={related.id}
                        product={related}
                        onView={onSelectRelated}
                        whatsappPhone={whatsappPhone}
                        companyName={companyName}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
