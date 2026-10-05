"use client";

import { useCart } from "@/features/cart/context/cart-provider";
import { useProductView } from "@/features/product/context/product-view-context";
import type { ProductDetails } from "@/features/product/models/product.model";

type ProductPurchasePanelProps = {
  product: ProductDetails;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const { variant, quantity, setQuantity, setVariantId, setHoveredVariantId } = useProductView();
  const { addToCart } = useCart();

  const activeVariant =
    variant ??
    product.variants.find((item) => item.id === product.defaultVariantId) ??
    product.variants[0];

  if (!activeVariant) return null;

  const add = () =>
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.title,
      image: activeVariant.images[0]?.src ?? "",
      price: product.price,
      variantId: activeVariant.id,
      variantLabel: activeVariant.label,
      quantity,
    });

  return (
    <div id="product-form-box" className="product-right product-form-box product-page-details">
      <div className="variation-box">
        <h4 className="sub-title">Colour:</h4>
        <ul
          className="image-box image"
          onMouseLeave={() => setHoveredVariantId(null)}
        >
          {product.variants.map((item) => {
            const isSelected = item.id === activeVariant.id;

            return (
              <li key={item.id} className={isSelected ? "active" : undefined}>
                <button
                  type="button"
                  onClick={() => {
                    setVariantId(item.id);
                    setHoveredVariantId(null);
                  }}
                  onMouseEnter={() => setHoveredVariantId(item.id)}
                  onFocus={() => setHoveredVariantId(item.id)}
                  onBlur={(event) => {
                    const nextTarget = event.relatedTarget as Node | null;
                    if (nextTarget && event.currentTarget.closest(".image-box")?.contains(nextTarget)) {
                      return;
                    }
                    setHoveredVariantId(null);
                  }}
                  aria-label={item.label}
                >
                  <img
                    src={item.images[0]?.src ?? ""}
                    alt={item.label}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="product-buttons">
        <div>
          <div className="qty-section">
            <div className="qty-box">
              <div className="input-group">
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-left-minus"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <i className="ri-arrow-left-s-line" aria-hidden />
                  </button>
                </span>
                <input
                  type="text"
                  name="quantity"
                  className="form-control input-number"
                  value={quantity}
                  readOnly
                  aria-label="Quantity"
                />
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-left-plus"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity(Math.min(product.quantityLeft, quantity + 1))}
                  >
                    <i className="ri-arrow-right-s-line" aria-hidden />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-buy-btn-group">
          <button
            type="button"
            className="btn btn-solid buy-button buy-button--cart hover-solid"
            onClick={add}
          >
            <span className="buy-button__icon">
              <i className="ri-shopping-cart-line me-1" aria-hidden />
            </span>
            Add To Cart
          </button>
          <button
            type="button"
            className="btn btn-solid buy-button buy-button--checkout btn-animation hover-outline"
            onClick={add}
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="buy-box compare-box">
        <button type="button">
          <i className="ri-heart-line" aria-hidden />
          <span>Add To Wishlist</span>
        </button>
        <button type="button">
          <i className="ri-refresh-line" aria-hidden />
          <span>Add To Compare</span>
        </button>
        <button type="button">
          <i className="ri-share-line" aria-hidden />
          <span>share</span>
        </button>
      </div>
    </div>
  );
}
