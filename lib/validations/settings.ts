import { z } from "zod";

export const settingsFormSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  description: z.string().optional(),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  whatsapp: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
