"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { saveUploads, deleteUpload } from "@/lib/uploads";
import { slugify, generateSku } from "@/lib/slugify";
import { productFormSchema } from "@/lib/validations/product";

async function ensureUniqueSlug(base: string, excludeId?: string): Promise<string> {
  const baseSlug = slugify(base) || "product";
  let slug = baseSlug;
  let counter = 2;
  while (
    await prisma.product.findFirst({
      where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
    })
  ) {
    slug = `${baseSlug}-${counter++}`;
  }
  return slug;
}

async function ensureUniqueSku(name: string): Promise<string> {
  let sku = generateSku(name);
  while (await prisma.product.findUnique({ where: { sku } })) {
    sku = generateSku(name);
  }
  return sku;
}

function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function revalidateProductPaths() {
  revalidatePath("/admin/products");
  revalidatePath("/admin/dashboard");
  revalidatePath("/");
}

export async function createProduct(_prevState: unknown, formData: FormData) {
  await requireAdmin();

  const parsed = productFormSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product data" };
  }
  const data = parsed.data;

  const imageFiles = formData.getAll("images").filter((f): f is File => f instanceof File);
  const images = await saveUploads(imageFiles);

  const slug = await ensureUniqueSlug(data.slug || data.name);
  const sku = data.sku?.trim() ? data.sku.trim() : await ensureUniqueSku(data.name);

  await prisma.product.create({
    data: {
      name: data.name,
      slug,
      sku,
      description: data.description || null,
      shortDescription: data.shortDescription || null,
      categoryId: data.categoryId || null,
      subCategory: data.subCategory || null,
      images: JSON.stringify(images),
      tags: JSON.stringify(parseTags(data.tags)),
      featured: data.featured ?? false,
      price: data.price ?? null,
      stock: data.stock ?? 0,
      brand: data.brand || null,
      material: data.material || null,
      dimensions: data.dimensions || null,
      weight: data.weight ?? null,
    },
  });

  revalidateProductPaths();
  return { success: true };
}

export async function updateProduct(id: string, _prevState: unknown, formData: FormData) {
  await requireAdmin();

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) return { error: "Product not found" };

  const parsed = productFormSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product data" };
  }
  const data = parsed.data;

  const existingImages: string[] = JSON.parse(formData.get("existingImages")?.toString() || "[]");
  const removedImages: string[] = JSON.parse(existing.images).filter(
    (img: string) => !existingImages.includes(img)
  );
  await Promise.all(removedImages.map(deleteUpload));

  const newImageFiles = formData.getAll("images").filter((f): f is File => f instanceof File);
  const newImages = await saveUploads(newImageFiles);
  const images = [...existingImages, ...newImages];

  const slug = data.slug ? await ensureUniqueSlug(data.slug, id) : existing.slug;
  const sku = data.sku?.trim() ? data.sku.trim() : existing.sku;

  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      slug,
      sku,
      description: data.description || null,
      shortDescription: data.shortDescription || null,
      categoryId: data.categoryId || null,
      subCategory: data.subCategory || null,
      images: JSON.stringify(images),
      tags: JSON.stringify(parseTags(data.tags)),
      featured: data.featured ?? false,
      price: data.price ?? null,
      stock: data.stock ?? 0,
      brand: data.brand || null,
      material: data.material || null,
      dimensions: data.dimensions || null,
      weight: data.weight ?? null,
    },
  });

  revalidateProductPaths();
  return { success: true };
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return;
  const images: string[] = JSON.parse(product.images);
  await Promise.all(images.map(deleteUpload));
  await prisma.product.delete({ where: { id } });
  revalidateProductPaths();
}

export async function bulkDeleteProducts(ids: string[]) {
  await requireAdmin();
  const products = await prisma.product.findMany({ where: { id: { in: ids } } });
  await Promise.all(
    products.flatMap((p) => (JSON.parse(p.images) as string[]).map(deleteUpload))
  );
  await prisma.product.deleteMany({ where: { id: { in: ids } } });
  revalidateProductPaths();
}

export async function toggleFeatured(id: string, featured: boolean) {
  await requireAdmin();
  await prisma.product.update({ where: { id }, data: { featured } });
  revalidateProductPaths();
}

export async function duplicateProduct(id: string) {
  await requireAdmin();
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return;

  const slug = await ensureUniqueSlug(`${product.name}-copy`);
  const sku = await ensureUniqueSku(product.name);

  await prisma.product.create({
    data: {
      name: `${product.name} (Copy)`,
      slug,
      sku,
      description: product.description,
      shortDescription: product.shortDescription,
      categoryId: product.categoryId,
      subCategory: product.subCategory,
      images: product.images,
      tags: product.tags,
      featured: false,
      price: product.price,
      stock: product.stock,
      brand: product.brand,
      material: product.material,
      dimensions: product.dimensions,
      weight: product.weight,
    },
  });

  revalidateProductPaths();
}

export async function reorderProductImages(id: string, images: string[]) {
  await requireAdmin();
  await prisma.product.update({ where: { id }, data: { images: JSON.stringify(images) } });
  revalidatePath(`/admin/products/${id}/edit`);
}

type BulkImportRow = {
  name: string;
  sku?: string;
  description?: string;
  shortDescription?: string;
  categoryName?: string;
  subCategory?: string;
  price?: number;
  stock?: number;
  brand?: string;
  material?: string;
  dimensions?: string;
  weight?: number;
  tags?: string[];
  images?: string[];
  featured?: boolean;
};

export async function bulkImportProducts(rows: BulkImportRow[]) {
  await requireAdmin();

  let imported = 0;
  let skipped = 0;

  for (const row of rows) {
    if (!row.name) {
      skipped++;
      continue;
    }

    const sku = row.sku?.trim();
    if (sku && (await prisma.product.findUnique({ where: { sku } }))) {
      skipped++;
      continue;
    }

    let categoryId: string | null = null;
    if (row.categoryName) {
      const categorySlug = slugify(row.categoryName);
      const category = await prisma.category.upsert({
        where: { slug: categorySlug },
        update: {},
        create: { name: row.categoryName, slug: categorySlug },
      });
      categoryId = category.id;
    }

    const slug = await ensureUniqueSlug(row.name);
    const finalSku = sku || (await ensureUniqueSku(row.name));

    await prisma.product.create({
      data: {
        name: row.name,
        slug,
        sku: finalSku,
        description: row.description || null,
        shortDescription: row.shortDescription || null,
        categoryId,
        subCategory: row.subCategory || null,
        images: JSON.stringify(row.images ?? []),
        tags: JSON.stringify(row.tags ?? []),
        featured: row.featured ?? false,
        price: row.price ?? null,
        stock: row.stock ?? 0,
        brand: row.brand || null,
        material: row.material || null,
        dimensions: row.dimensions || null,
        weight: row.weight ?? null,
      },
    });
    imported++;
  }

  revalidateProductPaths();
  return { imported, skipped };
}
