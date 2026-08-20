"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { cartItems, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const maxQuantity = Math.min(product.stock, 10) || 1;

  const cartQuantity = cartItems[product.id] ?? 0;

  const handleAddToCart = () => {
    addToCart(product.id, quantity);

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

  const handleBuyNow = () => {
    addToCart(product.id, quantity);

    const checkoutPayload = [
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        category: product.category,
      },
    ];

    localStorage.setItem("sellexa-checkout", JSON.stringify(checkoutPayload));
    router.push("/checkout");
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

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!product.inStock}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-black text-[13px] font-semibold text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-black/25 disabled:text-black/25 disabled:hover:bg-transparent disabled:hover:text-black/25"
        >
          Buy Now
        </button>
      </div>

      <button
        type="button"
        onClick={() => setWishlisted((value) => !value)}
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
