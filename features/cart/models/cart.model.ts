export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  variantId: string;
  variantLabel: string;
  quantity: number;
};

export type CartState = {
  lines: CartLine[];
};
