import type { BasicProductCardData, BasicProductVariant } from "@/features/product/models/basic-product-card.model";
import type { RelatedProduct } from "@/features/product/models/product.model";

function parseProductName(fullName: string) {
  const parenMatch = fullName.match(/^(.+?)\s+\(([^)]+)\)$/);
  const base = parenMatch ? parenMatch[1] : fullName;
  const variantLabel = parenMatch?.[2];

  if (base.startsWith("Thrive Athletica ")) {
    return {
      brand: "Thrive Athletica",
      name: base.slice("Thrive Athletica ".length),
      variantLabel,
    };
  }

  if (base.startsWith("EnduraFit ")) {
    return {
      brand: "EnduraFit",
      name: base.slice("EnduraFit ".length),
      variantLabel,
    };
  }

  const spaceIdx = base.indexOf(" ");
  if (spaceIdx === -1) {
    return { brand: base, name: base, variantLabel };
  }

  return {
    brand: base.slice(0, spaceIdx),
    name: base.slice(spaceIdx + 1),
    variantLabel,
  };
}

function buildVariants(product: RelatedProduct, variantLabel?: string): BasicProductVariant[] {
  if (product.colors?.length) {
    return product.colors.map((color, index) => ({
      image: product.image,
      label: variantLabel ?? `Variant ${index + 1}`,
      color,
    }));
  }

  return [
    {
      image: product.image,
      label: variantLabel ?? "Default",
    },
  ];
}

export function toBasicProductCard(product: RelatedProduct): BasicProductCardData {
  const { brand, name, variantLabel } = parseProductName(product.name);
  const variants = buildVariants(product, variantLabel);

  return {
    id: product.id,
    href: `/product/${product.slug}`,
    brand,
    name,
    variants,
    variantDisplay: product.colors?.length ? "swatches" : "thumbs",
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    discountPercent: product.discountPercent,
    badge: product.badge,
    rating: product.rating,
    offerLabel: product.offerLabel,
  };
}
