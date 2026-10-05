"use client";

import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { GalleryImage } from "@/components/product/gallery-image";
import { GalleryThumb } from "@/components/product/gallery-thumb";
import type { ProductBadge, ProductImage } from "@/features/product/models/product.model";

type ProductGalleryProps = {
  images: ProductImage[];
  imageSetId: string;
  badge?: ProductBadge;
  mainImageHeight?: number | null;
};

export function ProductGallery({ images, imageSetId, badge, mainImageHeight }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isHeightSynced = Boolean(mainImageHeight);

  const imageCount = images.length;
  const imageSetKey = useMemo(
    () => images.map((image) => image.id).join("|"),
    [images],
  );
  const safeActiveIndex =
    imageCount > 0 ? Math.min(activeIndex, imageCount - 1) : 0;
  const activeImage = images[safeActiveIndex] ?? images[0];

  useLayoutEffect(() => {
    setActiveIndex(0);
  }, [imageSetId, imageSetKey]);

  useLayoutEffect(() => {
    if (activeIndex >= imageCount && imageCount > 0) {
      setActiveIndex(imageCount - 1);
    }
  }, [activeIndex, imageCount]);

  const goToPrevious = useCallback(() => {
    if (imageCount <= 1) return;
    setActiveIndex((current) => (current - 1 + imageCount) % imageCount);
  }, [imageCount]);

  const goToNext = useCallback(() => {
    if (imageCount <= 1) return;
    setActiveIndex((current) => (current + 1) % imageCount);
  }, [imageCount]);

  if (!activeImage) return null;

  const sliderStyle = isHeightSynced
    ? ({
        "--gallery-main-height": `${mainImageHeight}px`,
      } as CSSProperties)
    : undefined;

  return (
    <div className="thumbnail-image-slider">
      <div className={`thumbnail-image-slider__inner${isHeightSynced ? " is-height-synced" : ""}`}>
        <div
          className={`product-slick position-relative${isHeightSynced ? " is-height-synced" : ""}`}
          style={sliderStyle}
        >
          {badge ? (
            <ul className="product-detail-label">
              <li className={badge}>{badge}</li>
            </ul>
          ) : null}

          <div className="product-gallery-main">
            <div className="product-main-image">
              <GalleryImage
                key={imageSetId}
                src={activeImage.src}
                alt={activeImage.alt}
                fill={isHeightSynced}
                ratio="443 / 517"
              />
            </div>
          </div>

          {imageCount > 1 ? (
            <>
              <button
                type="button"
                className="owl-prev gallery-prev"
                aria-label="Previous Slide"
                onClick={goToPrevious}
              >
                <i className="ri-arrow-left-s-line" aria-hidden />
              </button>
              <button
                type="button"
                className="owl-next gallery-next"
                aria-label="Next Slide"
                onClick={goToNext}
              >
                <i className="ri-arrow-right-s-line" aria-hidden />
              </button>
            </>
          ) : null}
        </div>

        {imageCount > 1 ? (
          <div className="slider-nav">
            <ul className="product-gallery-thumbs">
              {images.map((image, index) => (
                <GalleryThumb
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  isActive={index === safeActiveIndex}
                  onSelect={() => setActiveIndex(index)}
                />
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
