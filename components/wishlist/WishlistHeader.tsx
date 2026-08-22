"use client";

import {
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";

interface WishlistHeaderProps {
  itemCount: number;
  selectedItemCount?: number;
  onClearWishlist?: () => void;
  onMoveToCart?: () => void;
  showActions?: boolean;
}

export default function WishlistHeader({
  itemCount,
  selectedItemCount = 0,
  onClearWishlist,
  onMoveToCart,
  showActions = true,
}: WishlistHeaderProps) {
  const hasItems = itemCount > 0;
  const hasSelectedItems = selectedItemCount > 0;

  return (
    <section className="w-full">
      {/* Main Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        {/* Title */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Heart
              size={22}
              strokeWidth={1.8}
              className="shrink-0 text-zinc-900 sm:hidden"
            />

            <h1 className="text-xl font-semibold tracking-[-0.045em] text-black sm:text-2xl lg:text-3xl">
              My Wishlist
            </h1>

            {hasSelectedItems && (
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-semibold text-blue-700 sm:text-[10px]">
                {selectedItemCount} selected
              </span>
            )}
          </div>

          <p className="mt-2 max-w-md text-xs leading-relaxed text-zinc-500 sm:text-sm">
            Your saved products, ready to move to cart whenever
            you are.
          </p>
        </div>

        {/* Actions */}
        {showActions && hasItems && (
          <div className="hidden w-full items-center gap-2 sm:flex sm:w-auto">
            {/* Move to Cart */}
            {onMoveToCart && (
              <button
                type="button"
                onClick={onMoveToCart}
                disabled={!hasSelectedItems}
                className={`
                  flex
                  min-h-9
                  flex-1
                  items-center
                  justify-center
                  gap-1.5
                  rounded-full
                  border
                  border-zinc-200
                  bg-white
                  px-3
                  text-[11px]
                  font-semibold
                  transition
                  active:scale-[0.98]
                  sm:min-h-10
                  sm:flex-none
                  sm:px-4
                  sm:text-xs
                  ${
                    hasSelectedItems
                      ? "text-zinc-700 cursor-pointer hover:border-zinc-300 hover:bg-zinc-50"
                      : "text-zinc-400 cursor-not-allowed opacity-50"
                  }
                `}
              >
                <ShoppingBag
                  size={14}
                  strokeWidth={1.8}
                />

                <span className="sm:hidden">Cart</span>

                <span className="hidden sm:inline">
                  Move to Cart
                </span>
              </button>
            )}

            {/* Clear Wishlist */}
            {onClearWishlist && (
              <button
                type="button"
                onClick={onClearWishlist}
                className="
                  flex
                  min-h-9
                  flex-1
                  items-center
                  justify-center
                  gap-1.5
                  rounded-full
                  px-3
                  text-[11px]
                  font-semibold
                  text-red-600
                  transition
                  active:scale-[0.98]
                  hover:bg-red-50
                  sm:min-h-10
                  sm:flex-none
                  sm:px-4
                  sm:text-xs
                "
              >
                <Trash2
                  size={14}
                  strokeWidth={1.8}
                />

                <span className="sm:hidden">Clear</span>

                <span className="hidden sm:inline">
                  Clear Wishlist
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
