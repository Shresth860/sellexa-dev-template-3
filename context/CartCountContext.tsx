"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useCart } from "@/context/CartContext";

interface CartCountContextType {
  cartCount: number;
}

const CartCountContext = createContext<CartCountContextType | undefined>(
  undefined
);

export function CartCountProvider({ children }: { children: ReactNode }) {
  const { cartCount } = useCart();

  return (
    <CartCountContext.Provider value={{ cartCount }}>
      {children}
    </CartCountContext.Provider>
  );
}

export function useCartCount() {
  const context = useContext(CartCountContext);

  if (!context) {
    throw new Error(
      "useCartCount must be used within a CartCountProvider"
    );
  }

  return context;
}
