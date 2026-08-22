"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Swal from "sweetalert2";
import { ArrowLeft, ChevronRight } from "lucide-react";

import Header from "@/components/home/Header";
import HomeFooter from "@/components/home/HomeFooter";

import WishlistHeader from "@/components/wishlist/WishlistHeader";
import WishlistItems, {
  type WishlistLineItem,
} from "@/components/wishlist/WishlistItems";
import WishlistSkeleton from "@/components/wishlist/WishlistSkeleton";
import EmptyCart from "@/components/cart/EmptyCart";
import CartTrustBar from "@/components/cart/CartTrustBar";

import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

/*
 * Wishlist keys are stored as `productId` or
 * `productId-color-storage` (see ProductActions.tsx).
 * Resolve back to the base product by prefix match.
 */
function resolveProduct(key: string) {
  return products.find(
    (item) => key === item.id || key.startsWith(`${item.id}-`)
  );
}

export default function WishlistPage() {
  const {
    wishlistItems,
    wishlistCount,
    addToCart,
    removeFromWishlist,
    clearWishlist,
  } = useCart();

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set()
  );

  const [isLoading, setIsLoading] = useState(true);

  const knownKeysRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const lineItems = useMemo<WishlistLineItem[]>(() => {
    return Object.keys(wishlistItems)
      .map((key) => {
        const product = resolveProduct(key);

        if (!product) {
          return null;
        }

        return { key, product };
      })
      .filter(
        (item): item is WishlistLineItem => item !== null
      );
  }, [wishlistItems]);

  /*
   * Keep selection synchronized with the wishlist.
   * Newly added products are selected automatically.
   */
  useEffect(() => {
    const currentKeys = new Set(
      lineItems.map(({ key }) => key)
    );

    setSelectedKeys((previous) => {
      const next = new Set<string>();

      currentKeys.forEach((key) => {
        if (
          previous.has(key) ||
          !knownKeysRef.current.has(key)
        ) {
          next.add(key);
        }
      });

      return next;
    });

    knownKeysRef.current = currentKeys;
  }, [lineItems]);

  const selectedLineItems = useMemo(() => {
    return lineItems.filter(({ key }) => selectedKeys.has(key));
  }, [lineItems, selectedKeys]);

  const allSelected =
    lineItems.length > 0 &&
    selectedKeys.size === lineItems.length;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedKeys(new Set());
      return;
    }

    setSelectedKeys(new Set(lineItems.map(({ key }) => key)));
  };

  const handleToggleSelect = (key: string) => {
    setSelectedKeys((previous) => {
      const next = new Set(previous);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  };

  const handleRemove = (key: string) => {
    removeFromWishlist(key);

    setSelectedKeys((previous) => {
      const next = new Set(previous);
      next.delete(key);
      return next;
    });
  };

  const handleMoveOneToCart = (key: string) => {
    const item = lineItems.find((entry) => entry.key === key);

    if (!item) {
      return;
    }

    addToCart(item.product.id, 1);
    removeFromWishlist(key);

    setSelectedKeys((previous) => {
      const next = new Set(previous);
      next.delete(key);
      return next;
    });
  };

  const handleClearWishlist = () => {
    if (lineItems.length === 0) {
      return;
    }

    Swal.fire({
      title: "Clear Wishlist?",
      html: "<p class='text-sm text-zinc-600 mb-0'>This will remove all items from your wishlist. This action cannot be undone.</p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#e4e4e7",
      confirmButtonText: "Clear Wishlist",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: true,

      customClass: {
        popup:
          "rounded-3xl font-sans shadow-xl border border-zinc-200 bg-white",
        title: "text-xl font-bold text-zinc-950 mt-4",
        htmlContainer: "text-center",
        icon: "text-red-500",
        confirmButton:
          "rounded-full px-6 py-3 text-sm font-semibold text-white bg-red-500 cursor-pointer hover:bg-red-600 transition active:scale-95",
        cancelButton:
          "rounded-full px-6 py-3 text-sm font-semibold text-zinc-700 bg-zinc-100 cursor-pointer hover:bg-zinc-200 transition active:scale-95 mr-2",
        actions: "gap-3",
      },
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      clearWishlist();
      setSelectedKeys(new Set());
    });
  };

  const handleMoveSelectedToCart = () => {
    if (selectedLineItems.length === 0) {
      Swal.fire({
        title: "No Items Selected",
        html: "<p class='text-sm text-zinc-600 mb-0'>Please select items to move to cart.</p>",
        icon: "info",
        confirmButtonColor: "#18181b",
        confirmButtonText: "Okay",
        allowOutsideClick: true,
        allowEscapeKey: true,

        customClass: {
          popup:
            "rounded-3xl font-sans shadow-xl border border-zinc-200 bg-white",
          title: "text-lg font-bold text-zinc-950 mt-4",
          htmlContainer: "text-center",
          icon: "text-blue-500",
          confirmButton:
            "rounded-full px-6 py-3 text-sm font-semibold text-white bg-zinc-900 cursor-pointer hover:bg-zinc-800 transition active:scale-95",
        },
      });
      return;
    }

    Swal.fire({
      title: "Move to Cart?",
      html: `<p class='text-sm text-zinc-600 mb-0'>${selectedLineItems.length} selected item${selectedLineItems.length !== 1 ? "s" : ""} will be moved to your cart and removed from wishlist.</p>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#18181b",
      cancelButtonColor: "#e4e4e7",
      confirmButtonText: "Move to Cart",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: true,

      customClass: {
        popup:
          "rounded-3xl font-sans shadow-xl border border-zinc-200 bg-white",
        title: "text-xl font-bold text-zinc-950 mt-4",
        htmlContainer: "text-center",
        icon: "text-blue-500",
        confirmButton:
          "rounded-full px-6 py-3 text-sm font-semibold text-white bg-zinc-900 cursor-pointer hover:bg-zinc-800 transition active:scale-95",
        cancelButton:
          "rounded-full px-6 py-3 text-sm font-semibold text-zinc-700 bg-zinc-100 cursor-pointer hover:bg-zinc-200 transition active:scale-95 mr-2",
        actions: "gap-3",
      },
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      selectedLineItems.forEach(({ key, product }) => {
        addToCart(product.id, 1);
        removeFromWishlist(key);
      });

      setSelectedKeys(new Set());

      Swal.fire({
        title: "🛍️ Added to Cart",
        html: `<p class='text-sm text-zinc-600 mb-0'>${selectedLineItems.length} item${selectedLineItems.length !== 1 ? "s" : ""} moved successfully.</p>`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        allowOutsideClick: true,

        customClass: {
          popup:
            "rounded-3xl font-sans shadow-xl border border-zinc-200 bg-white",
          title: "text-lg font-bold text-zinc-950 mt-4",
          htmlContainer: "text-center",
          icon: "text-emerald-500",
        },
      });
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f5f6f3] text-zinc-900">
        <Header hideWishlist />

        <section className="mx-auto w-[calc(100%-24px)] max-w-[1720px] py-5 sm:w-[calc(100%-32px)] sm:py-8 lg:py-10">
          <WishlistSkeleton />
        </section>

        <HomeFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f6f3] text-zinc-900">
      <Header hideWishlist />

      <section className="mx-auto w-[calc(100%-24px)] max-w-[1720px] py-5 sm:w-[calc(100%-32px)] sm:py-8 lg:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-[11px] text-zinc-500 sm:text-xs">
          <Link
            href="/"
            className="transition hover:text-zinc-900"
          >
            Home
          </Link>

          <ChevronRight size={13} className="shrink-0" />

          <span className="font-medium text-zinc-900">
            Wishlist
          </span>
        </div>

        {/* Wishlist Header */}
        <div className="mt-4 sm:mt-5">
          <WishlistHeader
            itemCount={wishlistCount}
            selectedItemCount={selectedLineItems.length}
            onClearWishlist={handleClearWishlist}
            onMoveToCart={handleMoveSelectedToCart}
          />
        </div>

        {lineItems.length === 0 ? (
          <div className="mt-6 sm:mt-8">
            <EmptyCart
              title="Your wishlist is empty"
              description="Save products you love and they'll show up here."
              buttonText="Discover Products"
              href="/"
            />
          </div>
        ) : (
          <div className="mt-8">
            <WishlistItems
              items={lineItems}
              selectedKeys={selectedKeys}
              allSelected={allSelected}
              onSelectAll={handleSelectAll}
              onToggleSelect={handleToggleSelect}
              onMoveToCart={handleMoveOneToCart}
              onRemove={handleRemove}
            />

            {/* Continue Shopping */}
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-zinc-700 transition hover:text-zinc-950 sm:text-sm"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>

            {/* Trust Bar */}
            <div className="mt-6">
              <CartTrustBar />
            </div>
          </div>
        )}
      </section>

      <HomeFooter />
    </main>
  );
}
