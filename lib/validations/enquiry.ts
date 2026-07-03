import { z } from "zod";

export const enquiryFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().optional(),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  message: z.string().optional(),
  productIds: z.string().optional(), // JSON-encoded string[] of Product ids
});

export type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;
