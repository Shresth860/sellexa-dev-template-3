"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface CartContextType {
  cartItems: Record<string, number>;
  wishlistItems: Record<string, boolean>;

  cartCount: number;
  wishlistCount: number;

  addToCart: (productId: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  toggleWishlist: (productId: string, forceState?: boolean) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;

  isInCart: (productId: string) => boolean;
  getCartQuantity: (productId: string) => number;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const CART_STORAGE_KEY = "sellexa-cart";
const WISHLIST_STORAGE_KEY = "sellexa-wishlist";

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [wishlistItems, setWishlistItems] = useState<
    Record<string, boolean>
  >({});
  const [mounted, setMounted] = useState(false);

  // Load saved cart and wishlist
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);

      if (savedCart) {
        const parsed = JSON.parse(savedCart);

        if (parsed && typeof parsed === "object") {
          setCartItems(parsed);
        }
      }

      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);

        if (parsed && typeof parsed === "object") {
          setWishlistItems(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load cart/wishlist:", error);
    }

    setMounted(true);
  }, []);

  // Persist cart
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartItems)
    );
  }, [cartItems, mounted]);

  // Persist wishlist
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems, mounted]);

  // Add product to cart
const addToCart = (
  productId: string,
  quantity = 1
) => {
  setCartItems((previous) => {
    const currentQuantity = previous[productId] ?? 0;
    const newQuantity = currentQuantity + quantity;

    const next = { ...previous };

    if (newQuantity <= 0) {
      delete next[productId];
    } else {
      next[productId] = newQuantity;
    }

    return next;
  });
};

  // Update cart quantity
  const updateCartQuantity = (
    productId: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      setCartItems((previous) => {
        const next = { ...previous };

        delete next[productId];

        return next;
      });

      return;
    }

    setCartItems((previous) => ({
      ...previous,
      [productId]: quantity,
    }));
  };

  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setCartItems((previous) => {
      const next = { ...previous };

      delete next[productId];

      return next;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCartItems({});
  };

  // Toggle wishlist
  const toggleWishlist = (
    productId: string,
    forceState?: boolean
  ) => {
    setWishlistItems((previous) => {
      const next = { ...previous };

      const current = Boolean(next[productId]);

      const newState =
        forceState !== undefined
          ? forceState
          : !current;

      if (newState) {
        next[productId] = true;
      } else {
        delete next[productId];
      }

      return next;
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (
    productId: string
  ) => {
    setWishlistItems((previous) => {
      const next = { ...previous };

      delete next[productId];

      return next;
    });
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems({});
  };

  // Check if product is in cart
  const isInCart = (productId: string) => {
    return (cartItems[productId] ?? 0) > 0;
  };

  // Get product quantity
  const getCartQuantity = (productId: string) => {
    return cartItems[productId] ?? 0;
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: string) => {
    return Boolean(wishlistItems[productId]);
  };

  // Total cart quantity
  const cartCount = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    0
  );

  // Total wishlist products
  const wishlistCount = Object.keys(wishlistItems).length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,

        cartCount,
        wishlistCount,

        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,

        toggleWishlist,
        removeFromWishlist,
        clearWishlist,

        isInCart,
        getCartQuantity,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider"
    );
  }

  return context;
}