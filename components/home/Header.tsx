"use client";

import Link from "next/link";
import {
  Search,
  ShoppingBag,
  UserRound,
  Heart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  hideCart?: boolean;
  hideWishlist?: boolean;
}

export default function Header({
  hideCart = false,
  hideWishlist = false,
}: HeaderProps = {}) {
  const { cartCount, wishlistCount } = useCart();

  return (
    <header className="sticky lg:fixed top-0 z-50 w-full border-b border-black/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-full items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">

        {/* Mobile Logo */}
        <Link
          href="/"
          className="lg:hidden text-[22px] font-semibold tracking-[-0.04em] text-black sm:text-2xl"
        >
          Sellexa
        </Link>

        {/* Desktop Logo */}
        <Link
          href="/"
          className="hidden lg:block text-2xl font-semibold tracking-[-0.04em] text-black"
        >
          Sellexa
        </Link>

        {/* Desktop Actions */}
        <div className="ml-auto hidden items-center gap-1 lg:flex">

          {/* Search */}
          <Link
            href="/search"
            aria-label="Search products"
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5"
          >
            <Search size={19} strokeWidth={1.7} />
          </Link>

          {/* Account */}
          <Link
            href="/account"
            aria-label="Account"
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5"
          >
            <UserRound size={19} strokeWidth={1.7} />
          </Link>

          {/* Wishlist */}
          {!hideWishlist && (
            <Link
              href="/wishlist"
              aria-label={`Wishlist with ${wishlistCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5"
            >
              <Heart size={19} strokeWidth={1.7} />

              {wishlistCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold leading-none text-white">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>
          )}

          {/* Cart */}
          {!hideCart && (
            <Link
              href="/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5"
            >
              <ShoppingBag size={19} strokeWidth={1.7} />

              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold leading-none text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          )}
        </div>

        {/* Mobile Cart */}
        {!hideCart && (
          <Link
            href="/cart"
            aria-label={`Shopping cart with ${cartCount} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5 lg:hidden"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />

            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold leading-none text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  );
}