import { PageTitleBanner } from "@/components/product/page-title-banner";
import { ProductPageClient } from "@/components/product/product-page-client";
import { productService } from "@/api/services/product.service";
import { createProductMetadata } from "@/core/seo/create-product-metadata";
import type { Metadata } from "next";

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);
  return createProductMetadata(product);
}

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductSlugPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await productService.getBySlug(slug);

  return (
    <>
      <PageTitleBanner title={product.name} breadcrumbs={product.breadcrumbs} />
      <ProductPageClient product={product} />
    </>
  );
}
