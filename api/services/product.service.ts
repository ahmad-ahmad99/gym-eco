import { DEFAULT_PRODUCT_SLUG } from "@/core/constants/app.constants";
import { dummyProduct, dummyProducts } from "@/features/product/data/dummy-product.data";
import type { ProductDetails } from "@/features/product/models/product.model";

export const productService = {
  async getBySlug(slug = DEFAULT_PRODUCT_SLUG): Promise<ProductDetails> {
    return dummyProducts.find((item) => item.slug === slug) ?? dummyProduct;
  },

  async getAll(): Promise<ProductDetails[]> {
    return dummyProducts;
  },
};
