"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { saveUpload, deleteUpload } from "@/lib/uploads";
import { settingsFormSchema } from "@/lib/validations/settings";

export async function getSettings() {
  const settings = await prisma.settings.findUnique({ where: { id: "settings" } });
  if (settings) return settings;
  return prisma.settings.create({ data: { id: "settings" } });
}

export async function updateSettings(_prevState: unknown, formData: FormData) {
  await requireAdmin();

  const parsed = settingsFormSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid settings data" };
  }
  const data = parsed.data;

  const existing = await getSettings();

  const logoFile = formData.get("logo");
  let logo = existing.logo;
  if (logoFile instanceof File && logoFile.size > 0) {
    if (existing.logo) await deleteUpload(existing.logo);
    logo = await saveUpload(logoFile);
  }

  await prisma.settings.upsert({
    where: { id: "settings" },
    create: {
      id: "settings",
      companyName: data.companyName,
      description: data.description || null,
      email: data.email || null,
      phone: data.phone || null,
      address: data.address || null,
      logo,
      socialLinks: JSON.stringify({
        facebook: data.facebook || "",
        instagram: data.instagram || "",
        twitter: data.twitter || "",
        linkedin: data.linkedin || "",
        whatsapp: data.whatsapp || "",
      }),
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
    },
    update: {
      companyName: data.companyName,
      description: data.description || null,
      email: data.email || null,
      phone: data.phone || null,
      address: data.address || null,
      logo,
      socialLinks: JSON.stringify({
        facebook: data.facebook || "",
        instagram: data.instagram || "",
        twitter: data.twitter || "",
        linkedin: data.linkedin || "",
        whatsapp: data.whatsapp || "",
      }),
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
    },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}
