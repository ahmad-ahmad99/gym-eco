"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Box from "@mui/material/Box";
import { AppContainer } from "@/components/shared/ui";
import { ProductDetails } from "@/components/product/product-details";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ProductTabs } from "@/components/product/product-tabs";
import { RelatedProducts } from "@/components/product/related-products";
import { usePrefetchImages } from "@/core/hooks/use-prefetch-images";
import { useProductGalleryHeight } from "@/core/hooks/use-product-gallery-height";
import { useProductView } from "@/features/product/context/product-view-context";
import type { ProductDetails as ProductDetailsModel } from "@/features/product/models/product.model";
import "@/styles/product-page.css";

type ProductPageClientProps = {
  product: ProductDetailsModel;
};

export function ProductPageClient({ product }: ProductPageClientProps) {
  const { setProduct, displayVariant } = useProductView();

  const galleryColRef = useRef<HTMLDivElement>(null);
  const gallerySyncRef = useRef<HTMLDivElement>(null);
  const detailsColRef = useRef<HTMLDivElement>(null);

  const mainImageHeight = useProductGalleryHeight({
    galleryRef: galleryColRef,
    syncRef: gallerySyncRef,
    detailsRef: detailsColRef,
  });

  const prefetchUrls = useMemo(
    () => product.variants.flatMap((variantItem) => variantItem.images.map((image) => image.src)),
    [product.variants],
  );

  usePrefetchImages(prefetchUrls);

  useLayoutEffect(() => {
    setProduct(product);
  }, [product, setProduct]);

  const images = displayVariant?.images ?? product.variants[0]?.images ?? [];
  const imageSetId = displayVariant?.id ?? product.defaultVariantId;

  return (
    <Box>
      <AppContainer className="product-page-content">
        <div className="product-page-row">
          <div ref={galleryColRef} className="product-page-col product-page-col--gallery">
            <ProductGallery
              images={images}
              imageSetId={imageSetId}
              badge={product.badge}
              mainImageHeight={mainImageHeight}
            />
          </div>
          <div ref={detailsColRef} className="product-page-col product-page-col--details">
            <ProductDetails product={product} gallerySyncRef={gallerySyncRef} />
          </div>
          <div className="product-page-col product-page-col--form">
            <ProductPurchasePanel product={product} />
          </div>
        </div>
      </AppContainer>
      <ProductTabs product={product} />
      <RelatedProducts products={product.relatedProducts} />
    </Box>
  );
}
