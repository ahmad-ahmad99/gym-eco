import type { Metadata } from "next";
import { APP_NAME, SITE_URL, THEME_COLOR } from "@/core/constants/app.constants";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Multikart is a modern e-commerce storefront for fashion, fitness, and lifestyle products.",
  applicationName: APP_NAME,
  keywords: ["ecommerce", "multikart", "fashion", "fitness", "online store"],
  authors: [{ name: "Pixelstrap" }],
  creator: APP_NAME,
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: APP_NAME,
    title: APP_NAME,
    description:
      "Multikart is a modern e-commerce storefront for fashion, fitness, and lifestyle products.",
    images: [
      {
        url: "/images/seo/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${APP_NAME} storefront preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description:
      "Multikart is a modern e-commerce storefront for fashion, fitness, and lifestyle products.",
    images: ["/images/seo/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
