import type { Metadata } from "next";
import { APP_NAME, SITE_URL } from "@/core/constants/app.constants";
import type { ProductDetails } from "@/features/product/models/product.model";

export function createProductMetadata(product: ProductDetails): Metadata {
  const title = product.title;
  const description = product.description[0]?.slice(0, 160) ?? `${product.name} at ${APP_NAME}.`;
  const image =
    product.variants[0]?.images[0]?.src ?? "/images/seo/og-default.jpg";
  const url = `${SITE_URL}/product/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: APP_NAME,
      images: [
        {
          url: image.startsWith("http") ? image : image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
