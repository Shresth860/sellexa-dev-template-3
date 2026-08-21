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

  const {
    items = [],
    addItem,
    toggleWishlist,
    isInWishlist,
  } = useCart();

  const [quantity, setQuantity] = useState(1);

  const maxQuantity = Math.max(
    1,
    Math.min(product.stock ?? 0, 10)
  );

  // Unique cart ID for product + selected variants
  const cartId = [product.id, selectedColor, selectedStorage]
    .filter(Boolean)
    .join("-");

  const cartQuantity =
    items.find((item) => item.id === cartId)?.quantity ?? 0;

  const wishlisted = isInWishlist(cartId);

  const handleDecrease = () => {
    setQuantity((value) => Math.max(1, value - 1));
  };

  const handleIncrease = () => {
    setQuantity((value) =>
      Math.min(maxQuantity, value + 1)
    );
  };

  const handleAddToCart = () => {
    if (!product.inStock) {
      return;
    }

    addItem(
      {
        id: cartId,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        price: product.price,
        color: selectedColor,
        storage: selectedStorage,
      },
      quantity
    );

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
    if (!product.inStock) {
      return;
    }

    addItem(
      {
        id: cartId,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        price: product.price,
        color: selectedColor,
        storage: selectedStorage,
      },
      quantity
    );

    const checkoutPayload = [
      {
        id: cartId,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        category: product.category,
        color: selectedColor,
        storage: selectedStorage,
      },
    ];

    localStorage.setItem(
      "sellexa-checkout",
      JSON.stringify(checkoutPayload)
    );

    router.push("/checkout");
  };

  return (
    <div className="space-y-3">
      {/* Quantity + Add to Cart */}
      <div className="flex items-center gap-3">
        {/* Quantity */}
        <div className="flex h-11 items-center rounded-lg border border-black/15">
          {/* Decrease */}
          <button
            type="button"
            onClick={handleDecrease}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-full w-10 items-center justify-center text-black/60 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Minus size={15} strokeWidth={1.8} />
          </button>

          {/* Quantity */}
          <span className="w-8 text-center text-sm font-medium">
            {quantity}
          </span>

          {/* Increase */}
          <button
            type="button"
            onClick={handleIncrease}
            disabled={quantity >= maxQuantity}
            aria-label="Increase quantity"
            className="flex h-full w-10 items-center justify-center text-black/60 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Plus size={15} strokeWidth={1.8} />
          </button>
        </div>

        {/* Add to Cart */}
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

        {/* Buy Now */}
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!product.inStock}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-black text-[13px] font-semibold text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-black/25 disabled:text-black/25 disabled:hover:bg-transparent disabled:hover:text-black/25"
        >
          Buy Now
        </button>
      </div>

      {/* Wishlist */}
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