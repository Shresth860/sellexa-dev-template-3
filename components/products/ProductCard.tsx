"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import ProductBadge from "@/components/products/ProductBadge";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export default function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  const {
    cartItems,
    wishlistItems,
    addToCart,
    toggleWishlist,
  } = useCart();

  const quantity = cartItems?.[product.id] ?? 0;

  const isLiked = Boolean(
    wishlistItems?.[product.id]
  );

  const handleAddToCart = () => {
    if (!product.inStock) return;

    addToCart(product.id, 1);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;

    addToCart(product.id, 1);

    const checkoutPayload = [
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        category: product.category,
      },
    ];

    localStorage.setItem(
      "sellexa-checkout",
      JSON.stringify(checkoutPayload)
    );

    window.location.href = "/checkout";
  };

  const handleWishlist = () => {
    toggleWishlist(
      product.id,
      !isLiked
    );
  };

  return (
    <article className="group mx-auto w-full max-w-[180px] min-w-0 sm:max-w-[200px] lg:max-w-[220px]">
      {/* Product Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f5f5f3] sm:rounded-2xl">
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 42vw, (max-width: 1024px) 200px, 220px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        {/* Badge */}
        <ProductBadge
          badge={product.badge}
          className="absolute left-2 top-2 sm:left-3 sm:top-3"
        />

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            isLiked
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isLiked}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 active:scale-95 sm:right-3 sm:top-3 sm:h-8 sm:w-8"
        >
          <Heart
            size={14}
            strokeWidth={1.7}
            fill={isLiked ? "currentColor" : "none"}
            className={
              isLiked
                ? "text-black"
                : "text-black/70"
            }
          />
        </button>

        {/* Out of Stock */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/45 backdrop-blur-[1px]">
            <span className="rounded-full bg-black px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-wide text-white sm:text-[9px]">
              Out of Stock
            </span>
          </div>
        )}

        {/* Desktop Add / Quantity */}
        {product.inStock && (
          <div className="absolute bottom-2 left-2 right-2 hidden sm:block">
            {quantity === 0 ? (
              <button
                type="button"
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} to cart`}
                className="flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-black text-[10px] font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100 hover:bg-black/85 active:scale-[0.98]"
              >
                <ShoppingBag
                  size={13}
                  strokeWidth={1.7}
                />
                Add to Cart
              </button>
            ) : (
              <div className="flex h-8 items-center justify-between rounded-lg bg-black px-2 text-white shadow-lg">
                <button
                  type="button"
                  onClick={() =>
                    addToCart(
                      product.id,
                      -1
                    )
                  }
                  className="flex h-6 w-6 items-center justify-center rounded-md text-sm hover:bg-white/10"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span className="text-[10px] font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    addToCart(
                      product.id,
                      1
                    )
                  }
                  className="flex h-6 w-6 items-center justify-center rounded-md text-sm hover:bg-white/10"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="px-0.5 pt-2.5 sm:pt-3">
        <p className="mb-1 text-[8px] font-medium uppercase tracking-wider text-black/40 sm:text-[9px]">
          {product.category}
        </p>

        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.25rem] text-[12px] font-medium leading-[1.35rem] text-black transition hover:text-black/55 sm:text-[13px] sm:leading-[1.4rem]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-1.5 flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            <Star
              size={11}
              fill="currentColor"
              strokeWidth={0}
            />

            <span className="text-[10px] font-medium">
              {product.rating.toFixed(1)}
            </span>
          </div>

          <span className="text-[9px] text-black/35">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mt-1.5 flex flex-wrap items-center justify-between gap-x-1.5 gap-y-0.5">
          <div className="flex flex-wrap items-center gap-x-1.5">
            <span className="text-[13px] font-semibold text-black sm:text-sm">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            {product.originalPrice && (
              <span className="text-[9px] text-black/35 line-through sm:text-[10px]">
                ₹
                {product.originalPrice.toLocaleString(
                  "en-IN"
                )}
              </span>
            )}

            {product.discount && (
              <span className="text-[8px] font-semibold text-black/50 sm:text-[9px]">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Buy Now Button - Visible on all screens */}
          {product.inStock && (
            <button
              type="button"
              onClick={handleBuyNow}
              aria-label={`Buy ${product.name}`}
              className="flex h-6 items-center justify-center gap-1 rounded-full bg-black px-2.5 text-[9px] font-semibold text-white transition hover:bg-black/85 active:scale-95 sm:h-7 sm:px-3 sm:text-[10px]"
            >
              <ShoppingBag size={11} strokeWidth={1.8} />
              <span>Buy</span>
            </button>
          )}
        </div>

        {/* Mobile Add / Quantity */}
        {product.inStock && (
          <div className="mt-2 sm:hidden">
            {quantity === 0 ? (
              <button
                type="button"
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} to cart`}
                className="flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-black text-[10px] font-medium text-white transition active:scale-[0.98]"
              >
                <ShoppingBag
                  size={12}
                  strokeWidth={1.7}
                />
                Add to Cart
              </button>
            ) : (
              <div className="mx-auto flex h-8 w-full items-center justify-between rounded-lg bg-black px-2 text-white">
                <button
                  type="button"
                  onClick={() =>
                    addToCart(
                      product.id,
                      -1
                    )
                  }
                  className="flex h-6 w-6 items-center justify-center rounded-md text-sm active:bg-white/10"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span className="text-[10px] font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    addToCart(
                      product.id,
                      1
                    )
                  }
                  className="flex h-6 w-6 items-center justify-center rounded-md text-sm active:bg-white/10"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}