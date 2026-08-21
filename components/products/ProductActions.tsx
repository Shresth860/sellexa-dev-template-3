"use client";

import { useRouter } from "next/navigation";
import { Heart, ShoppingBag } from "lucide-react";
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
    addToCart,
    getCartQuantity,
    toggleWishlist,
    isInWishlist,
  } = useCart();

  // Unique wishlist ID for product + selected variants
  const cartId = [product.id, selectedColor, selectedStorage]
    .filter(Boolean)
    .join("-");

  const cartQuantity = getCartQuantity(product.id);

  const wishlisted = isInWishlist(cartId);

  const handleAddToCart = () => {
    if (!product.inStock) {
      return;
    }

    addToCart(product.id, 1);

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

    const buyQuantity = cartQuantity > 0 ? cartQuantity : 1;

    if (cartQuantity === 0) {
      addToCart(product.id, 1);
    }

    const checkoutPayload = [
      {
        id: cartId,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: buyQuantity,
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
      {/* Add to Cart + Buy Now */}
      <div className="flex items-center gap-3">
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
