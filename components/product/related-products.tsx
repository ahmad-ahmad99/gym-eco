"use client";

import { BasicProductCard } from "@/components/product/basic-product-card";
import { AppContainer, AppSlider, AppSliderSlide } from "@/components/shared/ui";
import { toBasicProductCard } from "@/features/product/utils/to-basic-product-card";
import type { RelatedProduct } from "@/features/product/models/product.model";
import "@/styles/related-products.css";

type RelatedProductsProps = {
  products: RelatedProduct[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="product-related">
      <AppContainer>
        <h2>Related Products</h2>
        <div className="product-related__slider">
          <AppSlider
            className="related-products-slider"
            fallbackClassName="related-products-slider__fallback"
            fallbackHeight={320}
            slidesPerView={1.4}
            spaceBetween={16}
            navigation
            watchOverflow
            breakpoints={{
              480: { slidesPerView: 2.1 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {products.map((product) => (
              <AppSliderSlide key={product.id} className="related-products-slider__slide">
                <BasicProductCard
                  product={toBasicProductCard(product)}
                  imageSizes="(max-width: 768px) 45vw, 240px"
                  imageQuality={72}
                  showHoverActions={false}
                />
              </AppSliderSlide>
            ))}
          </AppSlider>
        </div>
      </AppContainer>
    </section>
  );
}
