"use client";

import { memo, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppImage } from "@/components/shared/ui";
import type {
  BasicProductCardData,
  BasicProductVariant,
} from "@/features/product/models/basic-product-card.model";
import "@/styles/basic-product.css";

const HOVER_ACTIONS = [
  { icon: "ri-shopping-cart-line", label: "Add to cart" },
  { icon: "ri-search-line", label: "Quick view" },
  { icon: "ri-refresh-line", label: "Compare" },
] as const;

export type BasicProductCardProps = {
  product: BasicProductCardData;
  className?: string;
  imageSizes?: string;
  imageQuality?: number;
  priority?: boolean;
  showHoverActions?: boolean;
  showVariants?: boolean;
};

export const BasicProductCard = memo(function BasicProductCard({
  product,
  className,
  imageSizes = "(max-width: 1200px) 25vw, 320px",
  imageQuality = 88,
  priority = false,
  showHoverActions = true,
  showVariants = false,
}: BasicProductCardProps) {
  const defaultVariant = useMemo(
    () => product.variants[product.defaultVariantIndex ?? 0] ?? product.variants[0],
    [product],
  );
  const [activeVariant, setActiveVariant] = useState<BasicProductVariant>(defaultVariant);
  const rating = product.rating ?? 0;
  const displayVariant = showVariants ? activeVariant : defaultVariant;

  useEffect(() => {
    setActiveVariant(defaultVariant);
  }, [defaultVariant]);

  const cardClassName = ["basic-product", "theme-product-1", className].filter(Boolean).join(" ");

  if (!displayVariant) return null;

  return (
    <div
      className={cardClassName}
      onMouseLeave={showVariants ? () => setActiveVariant(defaultVariant) : undefined}
    >
      <div className="product-image">
        <div className="img-wrapper bg-light overflow-hidden">
          {product.badge ? (
            <span className="ribbon">{product.badge}</span>
          ) : null}
          <div className="product-actions">
            <button
              type="button"
              className="wishlist-btn"
              aria-label="Add to wishlist"
            >
              <i className="ri-heart-line" aria-hidden />
            </button>
            {showHoverActions ? (
              <ul className="hover-action" aria-label="Product actions">
                {HOVER_ACTIONS.map((action) => (
                  <li key={action.label}>
                    <button type="button" aria-label={action.label}>
                      <i className={action.icon} aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <Link href={product.href} tabIndex={-1} aria-hidden>
            <AppImage
              key={displayVariant.image}
              src={displayVariant.image}
              alt={`${product.name} (${displayVariant.label})`}
              ratio="4 / 5"
              fit="cover"
              quality={imageQuality}
              sizes={imageSizes}
              priority={priority}
              loading={priority ? "eager" : "lazy"}
            />
          </Link>
          <span className="rating">
            <i className="ri-star-fill" aria-hidden />
            {rating}
          </span>
        </div>
      </div>

      <div className="product-detail">
        <div>
          <div className="brand-w-color">
            <Link href={product.href} className="product-title">
              {product.brand}
            </Link>
            {showVariants && product.variants.length > 1 ? (
              <div className="color-panel">
                {product.variantDisplay === "thumbs" ? (
                  <ul className="image-swatch image">
                    {product.variants.map((variant, index) => (
                      <li
                        key={`${product.id}-thumb-${index}`}
                        className={activeVariant.image === variant.image ? "active" : undefined}
                      >
                        <button
                          type="button"
                          aria-label={`Preview ${variant.label}`}
                          onMouseEnter={() => setActiveVariant(variant)}
                          onFocus={() => setActiveVariant(variant)}
                        >
                          <img
                            src={variant.thumb ?? variant.image}
                            alt=""
                            loading="lazy"
                            decoding="async"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="color-variant">
                    {product.variants.map((variant, index) => (
                      <li
                        key={`${product.id}-swatch-${index}`}
                        className={activeVariant.image === variant.image ? "active" : undefined}
                        style={{ backgroundColor: variant.color }}
                      >
                        <button
                          type="button"
                          aria-label={`Preview ${variant.label}`}
                          onMouseEnter={() => setActiveVariant(variant)}
                          onFocus={() => setActiveVariant(variant)}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}
          </div>

          <h6>
            {product.name} ({displayVariant.label})
          </h6>

          <h4 className="price">
            <span>${product.price.toFixed(2)}</span>
            {product.compareAtPrice ? <del>${product.compareAtPrice.toFixed(2)}</del> : null}
            {product.discountPercent ? (
              <span className="discounted-price">{product.discountPercent}% Off</span>
            ) : null}
          </h4>
        </div>

        {product.offerLabel ? (
          <div className="offer-panel">
            <span className="offer-icon" aria-hidden>
              <i className="ri-percent-line" />
            </span>
            {product.offerLabel}
          </div>
        ) : null}
      </div>
    </div>
  );
});
