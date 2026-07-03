"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { enquiryFormSchema } from "@/lib/validations/enquiry";

export type EnquiryState = {
  error?: string;
  success?: boolean;
};

export async function createEnquiry(
  _prevState: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const parsed = enquiryFormSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check your details" };
  }
  const data = parsed.data;

  let productIds: string[] = [];
  try {
    const parsedIds = JSON.parse(data.productIds || "[]");
    if (Array.isArray(parsedIds)) productIds = parsedIds.filter((id) => typeof id === "string");
  } catch {
    // ignore malformed input, treat as no products
  }

  await prisma.enquiry.create({
    data: {
      name: data.name,
      companyName: data.companyName || null,
      email: data.email || null,
      phone: data.phone,
      message: data.message || null,
      productIds: JSON.stringify(productIds),
    },
  });

  revalidatePath("/admin/enquiries");
  return { success: true };
}

export async function deleteEnquiry(id: string) {
  await requireAdmin();
  await prisma.enquiry.delete({ where: { id } });
  revalidatePath("/admin/enquiries");
}
