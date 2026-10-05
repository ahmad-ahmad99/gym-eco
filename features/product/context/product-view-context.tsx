"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProductDetails, ProductVariant } from "@/features/product/models/product.model";

type ProductViewContextValue = {
  product: ProductDetails | null;
  variant: ProductVariant | null;
  displayVariant: ProductVariant | null;
  quantity: number;
  setProduct: (product: ProductDetails | null) => void;
  setVariantId: (id: string) => void;
  setHoveredVariantId: (id: string | null) => void;
  setQuantity: (value: number) => void;
};

const ProductViewContext = createContext<ProductViewContextValue | null>(null);

export function useProductView() {
  const context = useContext(ProductViewContext);
  if (!context) {
    throw new Error("useProductView must be used within ProductViewProvider");
  }
  return context;
}

export function ProductViewProvider({ children }: { children: ReactNode }) {
  const [product, setProductState] = useState<ProductDetails | null>(null);
  const [variantId, setVariantIdState] = useState("");
  const [hoveredVariantId, setHoveredVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const setProduct = useCallback((nextProduct: ProductDetails | null) => {
    setProductState(nextProduct);
    setHoveredVariantId(null);

    if (nextProduct) {
      setVariantIdState(nextProduct.defaultVariantId);
      setQuantity(1);
    } else {
      setVariantIdState("");
    }
  }, []);

  const setVariantId = useCallback((id: string) => {
    setVariantIdState(id);
    setHoveredVariantId(null);
  }, []);

  const variant = useMemo(() => {
    if (!product) return null;
    return (
      product.variants.find((item) => item.id === variantId) ??
      product.variants.find((item) => item.id === product.defaultVariantId) ??
      product.variants[0] ??
      null
    );
  }, [product, variantId]);

  const displayVariant = useMemo(() => {
    if (!product) return null;

    const previewId = hoveredVariantId ?? variantId;
    return (
      product.variants.find((item) => item.id === previewId) ??
      variant ??
      product.variants[0] ??
      null
    );
  }, [hoveredVariantId, product, variant, variantId]);

  const value = useMemo(
    () => ({
      product,
      variant,
      displayVariant,
      quantity,
      setProduct,
      setVariantId,
      setHoveredVariantId,
      setQuantity,
    }),
    [displayVariant, product, quantity, setProduct, setVariantId, variant],
  );

  return <ProductViewContext.Provider value={value}>{children}</ProductViewContext.Provider>;
}
