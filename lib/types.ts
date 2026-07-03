import type { Prisma } from "@/lib/generated/prisma/client";

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export type SerializedProduct = Omit<ProductWithCategory, "images" | "tags"> & {
  images: string[];
  tags: string[];
};

export function serializeProduct(product: ProductWithCategory): SerializedProduct {
  return {
    ...product,
    images: JSON.parse(product.images || "[]"),
    tags: JSON.parse(product.tags || "[]"),
  };
}
