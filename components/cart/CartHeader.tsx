"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Trash2,
  ShoppingBag,
} from "lucide-react";

interface CartHeaderProps {
  itemCount: number;
  selectedItemCount?: number;
  onClearCart?: () => void;
  onMoveToWishlist?: () => void;
  showActions?: boolean;
}

export default function CartHeader({
  itemCount,
  selectedItemCount = 0,
  onClearCart,
  onMoveToWishlist,
  showActions = true,
}: CartHeaderProps) {
  const hasItems = itemCount > 0;
  const hasSelectedItems = selectedItemCount > 0;

  return (
    <section className="w-full">
      {/* Breadcrumb / Back */}

      {/* Main Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        {/* Title */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <ShoppingBag
              size={22}
              strokeWidth={1.8}
              className="shrink-0 text-zinc-900 sm:hidden"
            />

            <h1 className="text-[24px] font-black leading-none tracking-[-0.055em] text-zinc-950 sm:text-[38px] lg:text-[24px]">
              My Cart
            </h1>

            {hasSelectedItems && (
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-semibold text-blue-700 sm:text-[10px]">
                {selectedItemCount} selected
              </span>
            )}
          </div>

          <p className="mt-2 max-w-md text-xs leading-relaxed text-zinc-500 sm:text-sm">
            Review your selected products before proceeding
            to checkout.
          </p>
        </div>

        {/* Actions */}
        {showActions && hasItems && (
          <div className="flex w-full items-center gap-2 sm:w-auto">
            {/* Wishlist */}
            {onMoveToWishlist && (
              <button
                type="button"
                onClick={onMoveToWishlist}
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
                <Heart
                  size={14}
                  strokeWidth={1.8}
                />

                <span className="sm:hidden">
                  Wishlist
                </span>

                <span className="hidden sm:inline">
                  Move to Wishlist
                </span>
              </button>
            )}

            {/* Clear Cart */}
            {onClearCart && (
              <button
                type="button"
                onClick={onClearCart}
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

                <span className="sm:hidden">
                  Clear
                </span>

                <span className="hidden sm:inline">
                  Clear Cart
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}