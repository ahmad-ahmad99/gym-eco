export type BasicProductVariant = {
  image: string;
  label: string;
  thumb?: string;
  color?: string;
};

export type BasicProductCardData = {
  id: string;
  href: string;
  brand: string;
  name: string;
  variants: BasicProductVariant[];
  variantDisplay: "thumbs" | "swatches";
  defaultVariantIndex?: number;
  price: number;
  compareAtPrice?: number;
  discountPercent?: number;
  badge?: string;
  rating?: number;
  offerLabel?: string;
};
