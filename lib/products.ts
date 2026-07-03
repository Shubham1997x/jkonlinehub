import type { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { serializeProduct, type SerializedProduct } from "@/lib/types";

export const PRODUCTS_PER_PAGE = 12;

export type CatalogueSearchParams = {
  q?: string;
  category?: string;
  subCategory?: string;
  availability?: "in-stock" | "out-of-stock";
  featured?: string;
  sort?: string;
  page?: string;
};

function buildOrderBy(sort?: string): Prisma.ProductOrderByWithRelationInput {
  switch (sort) {
    case "name-asc":
      return { name: "asc" };
    case "name-desc":
      return { name: "desc" };
    case "oldest":
      return { createdAt: "asc" };
    case "price-asc":
      return { price: "asc" };
    case "price-desc":
      return { price: "desc" };
    case "newest":
    default:
      return { createdAt: "desc" };
  }
}

export async function getCatalogueProducts(params: CatalogueSearchParams): Promise<{
  products: SerializedProduct[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const page = Math.max(1, Number(params.page) || 1);

  const where: Prisma.ProductWhereInput = {
    ...(params.q
      ? {
          OR: [
            { name: { contains: params.q } },
            { description: { contains: params.q } },
            { shortDescription: { contains: params.q } },
            { sku: { contains: params.q } },
            { category: { name: { contains: params.q } } },
          ],
        }
      : {}),
    ...(params.category ? { category: { slug: params.category } } : {}),
    ...(params.subCategory ? { subCategory: params.subCategory } : {}),
    ...(params.availability === "in-stock" ? { stock: { gt: 0 } } : {}),
    ...(params.availability === "out-of-stock" ? { stock: { lte: 0 } } : {}),
    ...(params.featured === "true" ? { featured: true } : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: buildOrderBy(params.sort),
      skip: (page - 1) * PRODUCTS_PER_PAGE,
      take: PRODUCTS_PER_PAGE,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products: rows.map(serializeProduct),
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE)),
  };
}

export async function getRelatedProducts(product: SerializedProduct, take = 4) {
  if (!product.categoryId) return [];
  const rows = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id } },
    include: { category: true },
    take,
  });
  return rows.map(serializeProduct);
}

export async function getSubCategories(categorySlug?: string): Promise<string[]> {
  const rows = await prisma.product.findMany({
    where: {
      subCategory: { not: null },
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    },
    select: { subCategory: true },
    distinct: ["subCategory"],
  });
  return rows.map((r) => r.subCategory).filter((s): s is string => Boolean(s));
}
