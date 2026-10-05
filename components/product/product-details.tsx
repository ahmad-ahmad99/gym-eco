"use client";

import Link from "next/link";
import type { RefObject } from "react";
import { AppImage, AppRating } from "@/components/shared/ui";
import type { ProductDetails as ProductDetailsModel } from "@/features/product/models/product.model";

type ProductDetailsProps = {
  product: ProductDetailsModel;
  gallerySyncRef?: RefObject<HTMLDivElement | null>;
};

export function ProductDetails({ product, gallerySyncRef }: ProductDetailsProps) {
  return (
    <div className="product-right product-description-box product-page-details">
      <div className="trending-text">
        <img src="/images/product/trending.gif" alt="" className="img-fluid" />
        <h5>{product.socialProof}</h5>
      </div>

      <Link href={`/product/${product.slug}`}>
        <h2 className="main-title">{product.title}</h2>
      </Link>

      <AppRating value={product.rating} count={product.reviewCount} variant="product" />

      <div className="price-text">
        <h3>
          <span className="text-dark fw-normal">MRP:</span> ${product.price.toFixed(2)}
        </h3>
        <span>{product.taxNote}</span>
      </div>

      <div className="size-delivery-info">
        <a href="#delivery-return">
          <i className="ri-truck-line" aria-hidden />
          Delivery &amp; Return
        </a>
        <a href="#ask-question">
          <i className="ri-questionnaire-line" aria-hidden />
          Ask A Question
        </a>
      </div>

      <div className="bordered-box">
        <h4 className="sub-title">Product Info</h4>
        <ul className="shipping-info">
          {product.specs.map((spec) => (
            <li key={spec.label}>
              <span>{spec.label}: </span>
              {spec.value}
            </li>
          ))}
        </ul>
      </div>

      <div className="bordered-box">
        <h4 className="sub-title">Delivery Details</h4>
        <ul className="product-offer">
          {product.deliveryNotes.map((note, index) => (
            <li key={note}>
              <i
                className={index === 0 ? "ri-truck-line" : "ri-arrow-left-right-line"}
                aria-hidden
              />
              {note}
            </li>
          ))}
        </ul>
      </div>

      <div className="dashed-border-box" ref={gallerySyncRef}>
        <h4 className="sub-title">Guaranteed Safe Checkout</h4>
        <AppImage
          src="/images/payments/payments.png"
          alt="Payment methods"
          width={320}
          height={40}
          className="img-fluid"
        />
      </div>

      <div className="dashed-border-box">
        <h4 className="sub-title">Secure Checkout</h4>
        <AppImage
          src="/images/payments/secure-payments.png"
          alt="Secure checkout"
          width={320}
          height={40}
          className="img-fluid"
        />
      </div>
    </div>
  );
}
