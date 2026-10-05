"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine } from "@/features/cart/models/cart.model";

type AddToCartInput = Omit<CartLine, "quantity"> & { quantity?: number };

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  addToCart: (input: AddToCartInput) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addToCart = useCallback((input: AddToCartInput) => {
    const quantity = input.quantity ?? 1;
    setLines((current) => {
      const index = current.findIndex(
        (line) => line.productId === input.productId && line.variantId === input.variantId,
      );
      if (index === -1) {
        return [...current, { ...input, quantity }];
      }
      return current.map((line, lineIndex) =>
        lineIndex === index ? { ...line, quantity: line.quantity + quantity } : line,
      );
    });
  }, []);

  const value = useMemo(
    () => ({
      lines,
      itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      addToCart,
    }),
    [addToCart, lines],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
