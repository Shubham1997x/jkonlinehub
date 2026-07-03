import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getCatalogueProducts, getSubCategories } from "@/lib/products";
import { getSettings } from "@/lib/actions/settings";
import { JsonLd } from "@/components/shared/JsonLd";
import { CatalogueClient } from "./CatalogueClient";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description: "Browse our full catalogue of wholesale household products.",
};

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;

  const [{ products, total, page, totalPages }, categories, subCategories, settings] =
    await Promise.all([
      getCatalogueProducts(params),
      prisma.category.findMany({ orderBy: { name: "asc" } }),
      getSubCategories(params.category),
      getSettings(),
    ]);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const socialLinks = JSON.parse(settings.socialLinks || "{}");
  const whatsappPhone: string | undefined =
    socialLinks.whatsapp || settings.phone || undefined;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: products.map((product, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: product.name,
              sku: product.sku,
              description: product.shortDescription || product.description || undefined,
              ...(product.images[0] ? { image: `${baseUrl}${product.images[0]}` } : {}),
              ...(product.price != null
                ? {
                    offers: {
                      "@type": "Offer",
                      priceCurrency: "INR",
                      price: product.price,
                      availability:
                        product.stock > 0
                          ? "https://schema.org/InStock"
                          : "https://schema.org/OutOfStock",
                    },
                  }
                : {}),
            },
          })),
        }}
      />

      <header className="border-b border-border bg-secondary/30 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Brand Row: logo + name + badge + description */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
            {/* Logo */}
            <div className="shrink-0">
              <div className="relative size-24 overflow-hidden rounded-2xl border border-border bg-white shadow-sm sm:size-28">
                <Image
                  src="/logo.jpg"
                  alt={settings.companyName}
                  fill
                  sizes="112px"
                  className="object-contain p-1"
                  priority
                />
              </div>
            </div>

            {/* Brand info */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-foreground leading-tight">
                {settings.companyName}
              </h1>
              <span className="inline-flex w-fit rounded-md bg-primary px-3 py-0.5 text-sm font-semibold italic text-primary-foreground shadow-sm">
                Hub of Products
              </span>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground leading-relaxed">
                {settings.description ??
                  "We, JK Online Hub, are counted as one of the leading Wholesaler, Supplier & Importer of a wide range of the best quality of Household, Kitchen, Cleaning, Storage, and more products. Known for their seamless finish, durability, and value for money."}
              </p>
              <p className="text-xs text-muted-foreground">{total} products available</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CatalogueClient
          products={products}
          categories={categories}
          subCategories={subCategories}
          page={page}
          totalPages={totalPages}
          whatsappPhone={whatsappPhone}
          companyName={settings.companyName}
        />
      </div>
    </>
  );
}
