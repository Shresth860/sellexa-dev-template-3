"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
  ChevronDown,
  Heart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/#categories" },

  { label: "New Arrivals", href: "/#new-arrivals" },
];

interface HeaderProps {
  hideCart?: boolean;
  hideWishlist?: boolean;
}

export default function Header({
  hideCart = false,
  hideWishlist = false,
}: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { cartCount, wishlistCount } = useCart();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky lg:fixed top-0 z-50 w-full border-b border-black/10 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1780px] items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5 lg:hidden"
          >
            <Menu size={21} strokeWidth={1.8} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
          >
            <span className="text-[22px] font-semibold tracking-[-0.04em] text-black sm:text-2xl">
              Sellexa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="ml-12 hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center gap-1.5 text-[18px] font-medium text-black/75 transition hover:text-black"
              >
                {item.label}

              </Link>
            ))}
          </nav>

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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside
            className="h-full w-[min(86vw,360px)] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex h-16 items-center justify-between border-b border-black/10 px-5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-semibold tracking-[-0.04em]"
              >
                Sellexa
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5"
              >
                <X size={21} strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex h-[calc(100%-4rem)] flex-col overflow-y-auto px-5 py-6">
              {/* Mobile Search */}
              <Link
                href="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="mb-6 flex h-12 items-center gap-3 rounded-xl border border-black/10 px-4 text-sm text-black/55"
              >
                <Search size={18} strokeWidth={1.7} />
                <span>Search products</span>
              </Link>

              {/* Navigation */}
              <nav className="flex flex-col">
                {navigation.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-12 items-center justify-between border-b border-black/[0.07] text-[15px] font-medium text-black"
                  >
                    <span>{item.label}</span>

                    {item.label === "Categories" && (
                      <ChevronDown size={17} strokeWidth={1.7} />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Account / Wishlist / Cart */}
              <div className="mt-auto border-t border-black/10 pt-5">
                {/* Account */}
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-12 items-center gap-3 text-[15px] font-medium"
                >
                  <UserRound size={18} strokeWidth={1.7} />
                  Account
                </Link>

                {/* Wishlist */}
                {!hideWishlist && (
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-12 items-center gap-3 text-[15px] font-medium"
                  >
                    <Heart size={18} strokeWidth={1.7} />

                    Wishlist

                    {wishlistCount > 0 && (
                      <span className="ml-auto text-xs text-black/50">
                        {wishlistCount}{" "}
                        {wishlistCount === 1 ? "item" : "items"}
                      </span>
                    )}
                  </Link>
                )}

                {/* Cart */}
                {!hideCart && (
                  <Link
                    href="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-12 items-center gap-3 text-[15px] font-medium"
                  >
                    <ShoppingBag size={18} strokeWidth={1.7} />

                    Cart

                    {cartCount > 0 && (
                      <span className="ml-auto text-xs text-black/50">
                        {cartCount}{" "}
                        {cartCount === 1 ? "item" : "items"}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}