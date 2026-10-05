"use server";

import { productService } from "@/api/services/product.service";
import type { ProductDetails } from "@/features/product/models/product.model";

export async function getProductBySlugAction(slug: string): Promise<ProductDetails> {
  return productService.getBySlug(slug);
}

export async function getAllProductsAction(): Promise<ProductDetails[]> {
  return productService.getAll();
}
