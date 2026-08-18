"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  color?: string;
  storage?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (
    item: Omit<CartItem, "id" | "quantity">,
    quantity?: number
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "sellexa-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        // Hydrating from localStorage after mount avoids an SSR/client mismatch,
        // since localStorage isn't available during server render.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(stored));
      }
    } catch {
      // ignore malformed/unavailable storage
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem: CartContextValue["addItem"] = (item, quantity = 1) => {
    const id = [item.productId, item.color, item.storage]
      .filter(Boolean)
      .join("-");

    setItems((current) => {
      const existing = current.find((cartItem) => cartItem.id === id);

      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }

      return [...current, { ...item, id, quantity }];
    });
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((cartItem) => cartItem.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((cartItem) => cartItem.id !== id)
        : current.map((cartItem) =>
            cartItem.id === id ? { ...cartItem, quantity } : cartItem
          )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
