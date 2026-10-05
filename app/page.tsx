import { PageTitleBanner } from "@/components/product/page-title-banner";
import { ProductPageClient } from "@/components/product/product-page-client";
import { DEFAULT_PRODUCT_SLUG } from "@/core/constants/app.constants";
import { productService } from "@/api/services/product.service";
import { createProductMetadata } from "@/core/seo/create-product-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const product = await productService.getBySlug();
  return createProductMetadata(product);
}

export default async function HomePage() {
  const product = await productService.getBySlug(DEFAULT_PRODUCT_SLUG);

  return (
    <>
      <PageTitleBanner title={product.name} breadcrumbs={product.breadcrumbs} />
      <ProductPageClient product={product} />
    </>
  );
}
