"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

import Header from "@/components/home/Header";
import HomeFooter from "@/components/home/HomeFooter";

import CartHeader from "@/components/cart/CartHeader";
import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import CartTrustBar from "@/components/cart/CartTrustBar";
import EmptyCart from "@/components/cart/EmptyCart";
import CartSkeleton from "@/components/cart/CartSkeleton";

import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

type LineItem = {
  product: (typeof products)[number];
  quantity: number;
};

export default function CartPage() {
  const {
    cartItems,
    cartCount,
    wishlistCount,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
  } = useCart();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set()
  );

  const [isLoading, setIsLoading] = useState(true);

  const knownIdsRef = useRef<Set<string>>(new Set());

  /*
   * Initial loading state.
   */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /*
   * Convert cart IDs into actual products.
   *
   * CartContext stores:
   * {
   *   [productId]: quantity
   * }
   */
  const lineItems = useMemo<LineItem[]>(() => {
    return Object.entries(cartItems)
      .map(([productId, quantity]) => {
        const product = products.find(
          (item) => item.id === productId
        );

        if (!product) {
          return null;
        }

        return {
          product,
          quantity,
        };
      })
      .filter(
        (item): item is LineItem =>
          item !== null
      );
  }, [cartItems]);

  /*
   * LOCAL SEARCH (Disabled)
   *
   * On /cart, we can implement local filtering.
   * For now, we show all cart items.
   */
  const filteredLineItems = lineItems;

  /*
   * Keep selected products synchronized with
   * the actual cart.
   *
   * Newly added products are selected automatically.
   */
  useEffect(() => {
    const currentIds = new Set(
      lineItems.map(({ product }) => product.id)
    );

    setSelectedIds((previous) => {
      const next = new Set<string>();

      currentIds.forEach((id) => {
        if (
          previous.has(id) ||
          !knownIdsRef.current.has(id)
        ) {
          next.add(id);
        }
      });

      return next;
    });

    knownIdsRef.current = currentIds;
  }, [lineItems]);

  /*
   * Selected products.
   *
   * Selection is based on the complete cart,
   * not only the current search results.
   */
  const selectedLineItems = useMemo(() => {
    return lineItems.filter(({ product }) =>
      selectedIds.has(product.id)
    );
  }, [lineItems, selectedIds]);

  /*
   * Selected quantity.
   */
  const selectedItemCount = useMemo(() => {
    return selectedLineItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [selectedLineItems]);

  /*
   * Selected product IDs.
   */
  const selectedProductIds = useMemo(() => {
    return selectedLineItems.map(
      ({ product }) => product.id
    );
  }, [selectedLineItems]);

  /*
   * Selected subtotal.
   */
  const selectedSubtotal = useMemo(() => {
    return selectedLineItems.reduce(
      (total, item) =>
        total +
        item.product.price *
          item.quantity,
      0
    );
  }, [selectedLineItems]);

  /*
   * All cart products selected.
   */
  const allSelected =
    lineItems.length > 0 &&
    selectedIds.size === lineItems.length;

  /*
   * Select / deselect all.
   */
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
      return;
    }

    setSelectedIds(
      new Set(
        lineItems.map(
          ({ product }) => product.id
        )
      )
    );
  };

  /*
   * Select / deselect one product.
   */
  const handleToggleSelect = (
    productId: string
  ) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);

      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }

      return next;
    });
  };

  /*
   * Clear complete cart.
   */
  const handleClearCart = () => {
    if (lineItems.length === 0) {
      return;
    }

    Swal.fire({
      title: "Clear Cart?",
      html: "<p class='text-sm text-zinc-600 mb-0'>This will remove all items from your cart. This action cannot be undone.</p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#e4e4e7",
      confirmButtonText: "Clear Cart",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: true,

      customClass: {
        popup:
          "rounded-3xl font-sans shadow-xl border border-zinc-200 bg-white",
        title:
          "text-xl font-bold text-zinc-950 mt-4",
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

      clearCart();
      setSelectedIds(new Set());
    });
  };

  /*
   * Move selected items to wishlist.
   */
  const handleMoveToWishlist = () => {
    if (selectedLineItems.length === 0) {
      Swal.fire({
        title: "No Items Selected",
        html: "<p class='text-sm text-zinc-600 mb-0'>Please select items to move to wishlist.</p>",
        icon: "info",
        confirmButtonColor: "#18181b",
        confirmButtonText: "Okay",
        allowOutsideClick: true,
        allowEscapeKey: true,

        customClass: {
          popup:
            "rounded-3xl font-sans shadow-xl border border-zinc-200 bg-white",
          title:
            "text-lg font-bold text-zinc-950 mt-4",
          htmlContainer: "text-center",
          icon: "text-blue-500",
          confirmButton:
            "rounded-full px-6 py-3 text-sm font-semibold text-white bg-zinc-900 cursor-pointer hover:bg-zinc-800 transition active:scale-95",
        },
      });
      return;
    }

    Swal.fire({
      title: "Move to Wishlist?",
      html: `<p class='text-sm text-zinc-600 mb-0'>${selectedLineItems.length} selected item${selectedLineItems.length !== 1 ? "s" : ""} will be moved to your wishlist and removed from cart.</p>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#18181b",
      cancelButtonColor: "#e4e4e7",
      confirmButtonText: "Move to Wishlist",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: true,

      customClass: {
        popup:
          "rounded-3xl font-sans shadow-xl border border-zinc-200 bg-white",
        title:
          "text-xl font-bold text-zinc-950 mt-4",
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

      selectedLineItems.forEach(({ product }) => {
        toggleWishlist(product.id, true);
        removeFromCart(product.id);
      });

      setSelectedIds(new Set());

      Swal.fire({
        title: "✨ Added to Wishlist",
        html: `<p class='text-sm text-zinc-600 mb-0'>${selectedLineItems.length} item${selectedLineItems.length !== 1 ? "s" : ""} moved successfully.</p>`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        allowOutsideClick: true,

        customClass: {
          popup:
            "rounded-3xl font-sans shadow-xl border border-zinc-200 bg-white",
          title:
            "text-lg font-bold text-zinc-950 mt-4",
          htmlContainer: "text-center",
          icon: "text-emerald-500",
        },
      });
    });
  };

  /*
   * Checkout.
   */
  const handleCheckout = () => {
    if (selectedProductIds.length === 0) {
      Swal.fire({
        title: "Select Items First",
        html: "<p class='text-sm text-zinc-600 mb-0'>Please select at least one item to proceed with checkout.</p>",
        icon: "info",
        confirmButtonColor: "#18181b",
        confirmButtonText: "Okay",
        allowOutsideClick: true,
        allowEscapeKey: true,

        customClass: {
          popup:
            "rounded-3xl font-sans shadow-xl border border-zinc-200 bg-white",
          title:
            "text-lg font-bold text-zinc-950 mt-4",
          htmlContainer: "text-center",
          icon: "text-blue-500",
          confirmButton:
            "rounded-full px-6 py-3 text-sm font-semibold text-white bg-zinc-900 cursor-pointer hover:bg-zinc-800 transition active:scale-95",
        },
      });

      return;
    }

    const checkoutPayload = selectedLineItems.map(
      ({ product, quantity }) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        category: product.category,
      })
    );

    localStorage.setItem(
      "sellexa-checkout",
      JSON.stringify(checkoutPayload)
    );

    window.location.href = "/checkout";
  };

  /*
   * Loading state.
   */
  if (isLoading) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f5f6f3] text-zinc-900">
        <Header hideCart hideWishlist />

        <section className="mx-auto w-[calc(100%-24px)] max-w-[1720px] py-5 sm:w-[calc(100%-32px)] sm:py-8 lg:py-10">
          <CartSkeleton />
        </section>

        <HomeFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f6f3] text-zinc-900">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <Header hideCart hideWishlist />

      {/* =====================================================
          PAGE
      ====================================================== */}
      <section className="mx-auto w-[calc(100%-24px)] max-w-[1720px] py-5 sm:w-[calc(100%-32px)] sm:py-8 lg:py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-[11px] text-zinc-500 sm:text-xs">
          <Link
            href="/"
            className="transition hover:text-zinc-900"
          >
            Home
          </Link>

          <ChevronRight
            size={13}
            className="shrink-0"
          />

          <span className="font-medium text-zinc-900">
            Cart
          </span>
        </div>

        {/* =================================================
            CART HEADER
        ================================================= */}
        <div className="mt-4 sm:mt-5">
          <CartHeader
            itemCount={cartCount}
            selectedItemCount={selectedItemCount}
            onClearCart={handleClearCart}
            onMoveToWishlist={
              handleMoveToWishlist
            }
          />
        </div>

        {/* =================================================
            EMPTY COMPLETE CART
        ================================================= */}
        {lineItems.length === 0 ? (
          <div className="mt-6 sm:mt-8">
            <EmptyCart />
          </div>
        ) : (
          <>
            {/* Main Cart Layout */}
            <div className="mt-8 grid gap-5 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
              {/* Left: Cart Items */}
              <div>
                <CartItems
                  items={filteredLineItems}
                  selectedIds={selectedIds}
                  allSelected={allSelected}
                  onSelectAll={handleSelectAll}
                  onToggleSelect={
                    handleToggleSelect
                  }
                  onQuantityChange={(
                    productId,
                    quantity
                  ) => {
                    updateCartQuantity(
                      productId,
                      quantity
                    );
                  }}
                  onRemove={(productId) => {
                    removeFromCart(
                      productId
                    );
                  }}
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

              {/* Right: Summary */}
              <div className="lg:sticky lg:top-20 lg:self-start">
                <CartSummary
                  itemCount={
                    selectedItemCount
                  }
                  productIds={
                    selectedProductIds
                  }
                  subtotal={
                    selectedSubtotal
                  }
                  total={
                    selectedSubtotal
                  }
                  onCheckout={
                    handleCheckout
                  }
                />
              </div>
            </div>
          </>
        )}
      </section>

      <HomeFooter />
    </main>
  );
}