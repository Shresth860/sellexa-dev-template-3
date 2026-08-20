"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import Swal from "sweetalert2";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

type ProductActionsProps = {
  product: Product;
  selectedColor?: string;
  selectedStorage?: string;
};

export default function ProductActions({
  product,
  selectedColor,
  selectedStorage,
}: ProductActionsProps) {
  const { cartItems, addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);

  const maxQuantity = Math.min(product.stock, 10) || 1;

  const cartId = [product.id, selectedColor, selectedStorage]
    .filter(Boolean)
    .join("-");
  const cartQuantity = cartItems[cartId] ?? 0;
  const wishlisted = isInWishlist(cartId);

  const handleAddToCart = () => {
    addToCart(cartId, quantity);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Added to cart",
      showConfirmButton: false,
      timer: 1600,
      timerProgressBar: true,
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-11 items-center rounded-lg border border-black/15">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-full w-10 items-center justify-center text-black/60 transition hover:text-black disabled:opacity-30"
          >
            <Minus size={15} strokeWidth={1.8} />
          </button>

          <span className="w-8 text-center text-sm font-medium">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              setQuantity((value) => Math.min(maxQuantity, value + 1))
            }
            disabled={quantity >= maxQuantity}
            aria-label="Increase quantity"
            className="flex h-full w-10 items-center justify-center text-black/60 transition hover:text-black disabled:opacity-30"
          >
            <Plus size={15} strokeWidth={1.8} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-black text-[13px] font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:bg-black/25"
        >
          <ShoppingBag size={15} strokeWidth={1.8} />
          {!product.inStock
            ? "Out of Stock"
            : cartQuantity > 0
              ? `ADDED (${cartQuantity})`
              : "Add to Cart"}
        </button>
      </div>

      <button
        type="button"
        onClick={() => toggleWishlist(cartId)}
        aria-pressed={wishlisted}
        className="flex items-center gap-1.5 text-[12px] font-medium text-black/50 transition hover:text-black"
      >
        <Heart
          size={13}
          strokeWidth={1.8}
          fill={wishlisted ? "currentColor" : "none"}
          className={wishlisted ? "text-black" : ""}
        />
        Wishlist
      </button>
    </div>
  );
}
