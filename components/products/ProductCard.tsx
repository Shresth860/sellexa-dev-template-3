"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
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
  const [liked, setLiked] = useState(false);

  return (
    <article className="group mx-auto w-full max-w-[180px] min-w-0 sm:max-w-[200px] lg:max-w-[220px]">
      {/* Product image */}
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
          onClick={() => setLiked((value) => !value)}
          aria-label={
            liked
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={liked}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 active:scale-95 sm:right-3 sm:top-3 sm:h-8 sm:w-8"
        >
          <Heart
            size={14}
            strokeWidth={1.7}
            fill={liked ? "currentColor" : "none"}
            className={liked ? "text-black" : "text-black/70"}
          />
        </button>

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/45 backdrop-blur-[1px]">
            <span className="rounded-full bg-black px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-wide text-white sm:text-[9px]">
              Out of Stock
            </span>
          </div>
        )}

        {/* Desktop add to cart */}
        {product.inStock && (
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            className="absolute bottom-2 left-2 right-2 hidden h-8 items-center justify-center gap-1.5 rounded-lg bg-black text-[10px] font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100 hover:bg-black/85 sm:flex"
          >
            <ShoppingBag size={13} strokeWidth={1.7} />
            Add to Cart
          </button>
        )}
      </div>

      {/* Product information */}
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
        <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
          <span className="text-[13px] font-semibold text-black sm:text-sm">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          {product.originalPrice && (
            <span className="text-[9px] text-black/35 line-through sm:text-[10px]">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}

          {product.discount && (
            <span className="text-[8px] font-semibold text-black/50 sm:text-[9px]">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Mobile add to cart */}
        {product.inStock && (
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            className="mt-2 flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-black text-[10px] font-medium text-white transition active:scale-[0.98] sm:hidden"
          >
            <ShoppingBag size={12} strokeWidth={1.7} />
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
}