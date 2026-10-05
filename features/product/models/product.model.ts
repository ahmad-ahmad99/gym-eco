export type ProductBadge = "featured" | "trending" | "sale";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type ProductImage = {
  id: string;
  src: string;
  alt: string;
};

export type ProductVariant = {
  id: string;
  label: string;
  color: string;
  images: ProductImage[];
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductOffer = {
  label: string;
  href?: string;
};

export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
};

export type ProductQuestion = {
  id: string;
  author: string;
  date: string;
  question: string;
  answer?: string;
};

export type RelatedProduct = {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  badge?: ProductBadge;
  offerLabel?: string;
  colors?: string[];
};

export type ProductDetails = {
  id: string;
  slug: string;
  name: string;
  title: string;
  sku: string;
  price: number;
  currency: "USD";
  rating: number;
  reviewCount: number;
  socialProof: string;
  taxNote: string;
  badge?: ProductBadge;
  stockStatus: string;
  quantityLeft: number;
  unit: string;
  weight: string;
  specs: ProductSpec[];
  deliveryNotes: string[];
  description: string[];
  breadcrumbs: BreadcrumbItem[];
  variants: ProductVariant[];
  defaultVariantId: string;
  reviews: ProductReview[];
  questions: ProductQuestion[];
  relatedProducts: RelatedProduct[];
  sellingCount: number;
};
