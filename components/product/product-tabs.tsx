"use client";

import { useState } from "react";
import { AppContainer, AppRating } from "@/components/shared/ui";
import type { ProductDetails } from "@/features/product/models/product.model";
import "@/styles/product-tabs.css";

type ProductTabsProps = {
  product: ProductDetails;
};

const TAB_ITEMS = ["Description", "Review", "Q&A"] as const;

export function ProductTabs({ product }: ProductTabsProps) {
  const [tab, setTab] = useState(0);

  return (
    <section className="product-tabs">
      <AppContainer>
        <div className="tab-product product-details-contain">
          <ul className="nav nav-tabs" role="tablist" aria-label="Product information">
            {TAB_ITEMS.map((label, index) => (
              <li key={label} className="nav-item" role="presentation">
                <button
                  type="button"
                  role="tab"
                  id={`product-tab-${index}`}
                  aria-selected={tab === index}
                  aria-controls={`product-tabpanel-${index}`}
                  className={`nav-link${tab === index ? " active" : ""}`}
                  onClick={() => setTab(index)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <div
            className="tab-content nav-material"
            role="tabpanel"
            id={`product-tabpanel-${tab}`}
            aria-labelledby={`product-tab-${tab}`}
          >
            {tab === 0 ? (
              <div className="product-tabs__description">
                {product.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="product-tabs__paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            {tab === 1 ? (
              <div className="product-tabs__stack">
                {product.reviews.length === 0 ? (
                  <div>
                    <h3 className="product-tabs__empty-title">No Review Yet</h3>
                    <p className="product-tabs__paragraph">
                      There are currently no ratings or reviews for this product.
                    </p>
                  </div>
                ) : (
                  product.reviews.map((review) => (
                    <article key={review.id} className="product-tabs__card">
                      <div className="product-tabs__card-row">
                        <h3 className="product-tabs__card-author">{review.author}</h3>
                        <p className="product-tabs__card-date">{review.date}</p>
                      </div>
                      <AppRating value={review.rating} />
                      <p className="product-tabs__card-meta">{review.comment}</p>
                    </article>
                  ))
                )}
              </div>
            ) : null}

            {tab === 2 ? (
              <>
                <div className="post-question-box">
                  <h4>
                    Have Doubts Regarding This Product ?
                    <a href="#ask-question">Post Your Question</a>
                  </h4>
                </div>

                {product.questions.length === 0 ? (
                  <div className="no-data-added">
                    <h4>No Question Posted Yet</h4>
                    <p>There are currently no question for this product</p>
                  </div>
                ) : (
                  <div className="product-tabs__qa-list">
                    {product.questions.map((item) => (
                      <article key={item.id} className="product-tabs__card">
                        <p className="product-tabs__card-author">
                          {item.author} asked on {item.date}
                        </p>
                        <p className="product-tabs__card-meta">{item.question}</p>
                        {item.answer ? (
                          <p className="product-tabs__card-meta">Answer: {item.answer}</p>
                        ) : null}
                      </article>
                    ))}
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </AppContainer>
    </section>
  );
}
