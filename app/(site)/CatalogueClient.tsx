"use client";

import { useMemo, useState } from "react";
import { Send, X, ClipboardList, Minus, Plus } from "lucide-react";
import { SearchBar } from "@/components/catalogue/SearchBar";
import { FilterBar } from "@/components/catalogue/FilterBar";
import { SortSelect } from "@/components/catalogue/SortSelect";
import { ViewToggle } from "@/components/catalogue/ViewToggle";
import { ProductGrid } from "@/components/catalogue/ProductGrid";
import { ProductDrawer } from "@/components/catalogue/ProductDrawer";
import { CataloguePagination } from "@/components/catalogue/CataloguePagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { WhatsAppFloat } from "@/components/shared/WhatsAppButton";
import type { SerializedProduct } from "@/lib/types";

type Category = { id: string; name: string; slug: string };

export function CatalogueClient({
  products,
  categories,
  subCategories,
  page,
  totalPages,
  whatsappPhone,
  companyName,
}: {
  products: SerializedProduct[];
  categories: Category[];
  subCategories: string[];
  page: number;
  totalPages: number;
  whatsappPhone?: string;
  companyName?: string;
}) {
  const [viewedProduct, setViewedProduct] = useState<SerializedProduct | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const [selectedProducts, setSelectedProducts] = useState<Map<string, SerializedProduct>>(
    new Map()
  );
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const selectedIds = useMemo(() => new Set(selectedProducts.keys()), [selectedProducts]);

  function handleView(product: SerializedProduct) {
    setViewedProduct(product);
    setDrawerOpen(true);
  }

  function handleToggleSelect(product: SerializedProduct) {
    setSelectedProducts((prev) => {
      const next = new Map(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        setQuantities((q) => {
          const newQ = { ...q };
          delete newQ[product.id];
          return newQ;
        });
      } else {
        next.set(product.id, product);
        setQuantities((q) => ({ ...q, [product.id]: 1 }));
      }
      return next;
    });
  }

  function updateQuantity(id: string, delta: number) {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  }

  function handleQuoteNow(product: SerializedProduct) {
    setSelectedProducts((prev) => {
      const next = new Map(prev);
      if (!next.has(product.id)) {
        next.set(product.id, product);
        setQuantities((q) => ({ ...q, [product.id]: 1 }));
      }
      return next;
    });
    setEnquiryOpen(true);
    setDrawerOpen(false); // Close the drawer if it was open
  }

  return (
    <div className="space-y-5">
      {/* Search row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar />
        <div className="flex shrink-0 items-center gap-3">
          <SortSelect />
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>

      {/* Filter row — below search, full width */}
      <FilterBar categories={categories} subCategories={subCategories} />

      <ProductGrid
        products={products}
        onView={handleView}
        view={view}
        selectable
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onQuoteNow={handleQuoteNow}
        whatsappPhone={whatsappPhone}
        companyName={companyName}
      />

      <CataloguePagination page={page} totalPages={totalPages} />

      <ProductDrawer
        product={viewedProduct}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onSelectRelated={handleView}
        whatsappPhone={whatsappPhone}
        companyName={companyName}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onQuoteNow={handleQuoteNow}
      />

      {selectedProducts.size > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
          <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2.5 shadow-lg">
            <span className="text-sm font-medium text-foreground">
              {selectedProducts.size} item{selectedProducts.size === 1 ? "" : "s"} added
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedProducts(new Map())}
            >
              <X className="size-4" /> Clear
            </Button>
            <Button size="sm" className="rounded-full" onClick={() => setEnquiryOpen(true)}>
              <ClipboardList className="size-4 mr-1" /> View Quote List
            </Button>
          </div>
        </div>
      )}

      <Dialog open={enquiryOpen} onOpenChange={setEnquiryOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader className="shrink-0">
            <DialogTitle>Your Quote List</DialogTitle>
            <DialogDescription>
              Review the products in your quote list and submit your request below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 py-4">
            <div className="space-y-3">
              {[...selectedProducts.values()].map((product) => (
                <div key={product.id} className="flex items-center gap-4 rounded-xl border border-border bg-secondary/20 p-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-secondary/50">
                    {product.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-muted-foreground text-xs">
                        No img
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium text-foreground text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">SKU: {product.sku}</p>
                  </div>

                  <div className="flex shrink-0 items-center rounded-md border border-border">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="size-7 rounded-none"
                      onClick={() => updateQuantity(product.id, -1)}
                      disabled={(quantities[product.id] || 1) <= 1}
                    >
                      <Minus className="size-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {quantities[product.id] || 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="size-7 rounded-none"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      <Plus className="size-3" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-muted-foreground hover:text-destructive ml-2"
                    onClick={() => handleToggleSelect(product)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
              {selectedProducts.size === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">Your quote list is empty.</p>
              )}
            </div>

            {selectedProducts.size > 0 && (
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="font-semibold text-foreground mb-4">Contact Details</h3>
                <EnquiryForm
                  productIds={[...selectedProducts.keys()]}
                  productsData={[...selectedProducts.values()].map((p) => ({
                    name: p.name,
                    sku: p.sku,
                    quantity: quantities[p.id] || 1,
                  }))}
                  whatsappPhone={whatsappPhone}
                  companyName={companyName}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating WhatsApp button */}
      {whatsappPhone && (
        <WhatsAppFloat phone={whatsappPhone} companyName={companyName ?? "JK Online Hub"} />
      )}
    </div>
  );
}
