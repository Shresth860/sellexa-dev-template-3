"use client";

import Image from "next/image";
import { Trash2, Check, ShoppingBag } from "lucide-react";

interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  category?: string;
  badge?: string;
  inStock?: boolean;
}

interface WishlistItemCardProps {
  product: WishlistProduct;
  isSelected: boolean;
  onToggleSelect: () => void;
  onMoveToCart: () => void;
  onRemove: () => void;
}

export default function WishlistItemCard({
  product,
  isSelected,
  onToggleSelect,
  onMoveToCart,
  onRemove,
}: WishlistItemCardProps) {
  const image =
    product.image ||
    "/images/placeholder-product.png";

  return (
    <article
      className={`w-full rounded-2xl border bg-white p-3 transition sm:rounded-3xl sm:p-4 ${
        isSelected
          ? "border-zinc-200 bg-white"
          : "border-zinc-100 opacity-60"
      }`}
    >
      <div className="flex min-w-0 gap-3 sm:gap-4">
        {/* Checkbox */}
        <button
          type="button"
          onClick={onToggleSelect}
          aria-label={
            isSelected ? "Deselect product" : "Select product"
          }
          className="mt-1 flex shrink-0 items-center justify-center"
        >
          <span
            className={`flex size-4 items-center justify-center rounded-[5px] border-2 transition sm:size-5 ${
              isSelected
                ? "border-zinc-900 bg-zinc-900"
                : "border-zinc-300 bg-white"
            }`}
          >
            {isSelected && (
              <Check
                size={12}
                strokeWidth={3}
                className="text-white"
              />
            )}
          </span>
        </button>

        {/* Product Image */}
        <div className="relative size-[75px] shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:size-[100px] sm:rounded-2xl">
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 75px, 100px"
            className="object-cover"
          />

          {product.badge && (
            <span className="absolute left-1.5 top-1.5 max-w-[calc(100%-12px)] truncate rounded-full bg-white/90 px-2 py-0.5 text-[7px] font-bold text-zinc-800 backdrop-blur-sm sm:text-[8px]">
              {product.badge}
            </span>
          )}

          {product.inStock === false && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
              <span className="rounded-full bg-zinc-900 px-2 py-1 text-[7px] font-bold uppercase tracking-wide text-white sm:text-[8px]">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info - Mobile */}
        <div className="min-w-0 flex-1 sm:hidden">
          {product.category && (
            <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              {product.category}
            </p>
          )}

          <h3 className="mt-0.5 line-clamp-2 text-[14px] font-bold leading-snug text-zinc-900">
            {product.name}
          </h3>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-zinc-950">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              {product.originalPrice && (
                <span className="text-[11px] text-zinc-400 line-through">
                  ₹
                  {product.originalPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove product"
              className="flex size-6 items-center justify-center rounded-full text-zinc-400 transition hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={14} strokeWidth={1.8} />
            </button>
          </div>

          <button
            type="button"
            onClick={onMoveToCart}
            disabled={product.inStock === false}
            className="mt-2.5 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-zinc-950 text-[11px] font-semibold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            <ShoppingBag size={13} strokeWidth={1.8} />
            Move to Cart
          </button>
        </div>

        {/* Product Info - Desktop */}
        <div className="hidden min-w-0 flex-1 sm:block">
          {product.category && (
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
              {product.category}
            </p>
          )}

          <h3 className="mt-0.5 line-clamp-2 text-[15px] font-bold leading-snug text-zinc-900">
            {product.name}
          </h3>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[15px] font-bold text-zinc-950">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            {product.originalPrice && (
              <span className="text-[12px] text-zinc-400 line-through">
                ₹
                {product.originalPrice.toLocaleString(
                  "en-IN"
                )}
              </span>
            )}
          </div>
        </div>

        {/* Desktop Right - Move to Cart & Remove */}
        <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove product"
            className="flex size-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={onMoveToCart}
            disabled={product.inStock === false}
            className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-zinc-950 px-4 text-[12px] font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            <ShoppingBag size={13} strokeWidth={1.8} />
            Move to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
