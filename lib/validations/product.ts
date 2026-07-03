import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().optional(),
  sku: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  categoryId: z.string().optional(),
  subCategory: z.string().optional(),
  featured: z.coerce.boolean().optional().default(false),
  price: z.coerce.number().nonnegative().optional(),
  stock: z.coerce.number().int().nonnegative().default(0),
  brand: z.string().optional(),
  material: z.string().optional(),
  dimensions: z.string().optional(),
  weight: z.coerce.number().nonnegative().optional(),
  tags: z.string().optional(), // comma-separated in the form, split before save
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
