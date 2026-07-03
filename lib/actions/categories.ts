"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { saveUpload, deleteUpload } from "@/lib/uploads";
import { slugify } from "@/lib/slugify";
import { categoryFormSchema } from "@/lib/validations/category";

async function ensureUniqueSlug(base: string, excludeId?: string): Promise<string> {
  const baseSlug = slugify(base) || "category";
  let slug = baseSlug;
  let counter = 2;
  while (
    await prisma.category.findFirst({
      where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
    })
  ) {
    slug = `${baseSlug}-${counter++}`;
  }
  return slug;
}

function revalidateCategoryPaths() {
  revalidatePath("/admin/categories");
  revalidatePath("/admin/dashboard");
  revalidatePath("/");
}

export async function createCategory(_prevState: unknown, formData: FormData) {
  await requireAdmin();

  const parsed = categoryFormSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid category data" };
  }
  const data = parsed.data;

  const imageFile = formData.get("image");
  const image = imageFile instanceof File && imageFile.size > 0 ? await saveUpload(imageFile) : null;

  const slug = await ensureUniqueSlug(data.slug || data.name);

  await prisma.category.create({
    data: {
      name: data.name,
      slug,
      description: data.description || null,
      image,
    },
  });

  revalidateCategoryPaths();
  return { success: true };
}

export async function updateCategory(id: string, _prevState: unknown, formData: FormData) {
  await requireAdmin();

  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) return { error: "Category not found" };

  const parsed = categoryFormSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid category data" };
  }
  const data = parsed.data;

  const imageFile = formData.get("image");
  let image = existing.image;
  if (imageFile instanceof File && imageFile.size > 0) {
    if (existing.image) await deleteUpload(existing.image);
    image = await saveUpload(imageFile);
  }

  const slug = data.slug ? await ensureUniqueSlug(data.slug, id) : existing.slug;

  await prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      slug,
      description: data.description || null,
      image,
    },
  });

  revalidateCategoryPaths();
  return { success: true };
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) return;
  if (category.image) await deleteUpload(category.image);
  await prisma.product.updateMany({ where: { categoryId: id }, data: { categoryId: null } });
  await prisma.category.delete({ where: { id } });
  revalidateCategoryPaths();
}
