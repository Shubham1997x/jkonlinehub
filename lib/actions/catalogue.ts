"use server";

import { getRelatedProducts } from "@/lib/products";
import type { SerializedProduct } from "@/lib/types";

export async function fetchRelatedProducts(product: SerializedProduct) {
  return getRelatedProducts(product);
}
