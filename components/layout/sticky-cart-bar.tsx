"use client";

import { useStickyProductBar } from "@/core/hooks/use-sticky-product-bar";
import { useCart } from "@/features/cart/context/cart-provider";
import { useProductView } from "@/features/product/context/product-view-context";
import "@/styles/sticky-bottom-cart.css";

export function StickyCartBar() {
  const barVisible = useStickyProductBar();
  const { product, variant, quantity, setQuantity, setVariantId } = useProductView();
  const { addToCart } = useCart();

  if (!product || !variant) {
    return null;
  }

  const thumbSrc = variant.images[0]?.src;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.title,
      image: thumbSrc ?? "",
      price: product.price,
      variantId: variant.id,
      variantLabel: variant.label,
      quantity,
    });
  };

  return (
    <div className={`stickyCart${barVisible ? " is-active" : ""}`} aria-hidden={!barVisible}>
      <div className="sticky-bottom-cart container">
        <div className="container p-0">
          <div className="cart-content">
            <div className="product-image d-md-inline-flex d-none">
              {thumbSrc ? (
                <img
                  className="img-fluid"
                  src={thumbSrc}
                  alt={`${product.name} (${variant.label})`}
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <div className="content d-lg-block d-none">
                <h5>
                  {product.name} ({variant.label})
                </h5>
                <h6>${product.price.toFixed(2)}</h6>
              </div>
            </div>

            <div className="middle-value">
              <div className="selection-section">
                <h4 className="d-xl-inline-block d-none">Variants:</h4>
                <div className="form-group mb-0">
                  <div className="variant-select-wrap">
                    <select
                      className="form-control form-select"
                      value={variant.id}
                      onChange={(event) => setVariantId(event.target.value)}
                      aria-label="Select variant"
                    >
                      {product.variants.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="qty-box d-sm-inline-block d-none">
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

            <div>
              <div className="add-btn">
                <button
                  type="button"
                  className="btn btn-animation btn-solid hover-solid"
                  onClick={handleAddToCart}
                >
                  <i className="me-1 ri-shopping-cart-line" aria-hidden />
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
