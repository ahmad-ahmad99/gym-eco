import type { ProductImage } from "@/features/product/models/product.model";

function buildVariantGallery(
  prefix: string,
  sources: [string, string, string],
  label: string,
): ProductImage[] {
  const views = ["front view", "side view", "back view"] as const;

  return sources.map((src, index) => ({
    id: `${prefix}-${index + 1}`,
    src,
    alt: `Gym Coords Set ${label} ${views[index]}`,
  }));
}

export const brownGalleryImages = buildVariantGallery(
  "brown",
  [
    "/images/products/gym-coords/brown-1.jpg",
    "/images/products/gym-coords/brown-2.jpg",
    "/images/products/gym-coords/brown-3.jpg",
  ],
  "brown",
);

export const navyGalleryImages = buildVariantGallery(
  "navy",
  [
    "/images/products/gym-coords/blue-1.jpg",
    "/images/products/gym-coords/navy-2.jpg",
    "/images/products/gym-coords/navy-3.jpg",
  ],
  "navy",
);

export const oliveGalleryImages = buildVariantGallery(
  "olive",
  [
    "/images/products/gym-coords/green-1.jpg",
    "/images/products/gym-coords/green-2.jpg",
    "/images/products/gym-coords/green-3.jpg",
  ],
  "olive",
);
