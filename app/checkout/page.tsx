"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import Header from "@/components/home/Header";
import HomeFooter from "@/components/home/HomeFooter";

type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
};

const STORAGE_KEY = "sellexa-checkout";

export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        setItems([]);
        return;
      }

      const parsed = JSON.parse(raw);
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      console.error("Failed to parse checkout payload:", error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      ),
    [items]
  );

  const totalItems = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [items]
  );

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f5f6f3] text-zinc-900">
        <Header hideCart hideWishlist />
        <section className="mx-auto w-[calc(100%-24px)] max-w-[1200px] py-8 sm:w-[calc(100%-32px)]">
          <div className="animate-pulse rounded-3xl border border-zinc-200 bg-white p-6">
            <div className="h-6 w-40 rounded bg-zinc-200" />
            <div className="mt-6 space-y-4">
              <div className="h-24 rounded-2xl bg-zinc-100" />
              <div className="h-24 rounded-2xl bg-zinc-100" />
            </div>
          </div>
        </section>
        <HomeFooter />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f5f6f3] text-zinc-900">
        <Header hideCart hideWishlist />

        <section className="mx-auto flex w-[calc(100%-24px)] max-w-[1200px] flex-col items-center justify-center py-16 text-center sm:w-[calc(100%-32px)]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Checkout
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-[-0.06em] text-zinc-950">
              No items selected
            </h1>
            <p className="mt-2 max-w-md text-sm text-zinc-600">
              Please choose products from the cart or product card before continuing to checkout.
            </p>
            <a
              href="/cart"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Back to Cart
            </a>
          </div>
        </section>

        <HomeFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f6f3] text-zinc-900">
      <Header hideCart hideWishlist />

      <section className="mx-auto w-[calc(100%-24px)] max-w-[1200px] py-6 sm:w-[calc(100%-32px)] sm:py-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Checkout
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.06em] text-zinc-950 sm:text-4xl">
              Order Summary
            </h1>
          </div>

          <span className="rounded-full bg-zinc-900 px-3 py-1.5 text-[10px] font-semibold text-white sm:text-xs">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-[0_12px_32px_rgba(0,0,0,0.04)] sm:p-5">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h2 className="text-base font-bold text-zinc-950 sm:text-lg">
                Products
              </h2>
              <span className="text-xs text-zinc-500">
                {items.length} {items.length === 1 ? "product" : "products"}
              </span>
            </div>

            <div className="mt-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                      {item.category}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-zinc-900 sm:text-base">
                      {item.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-zinc-400">
                        Qty
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">
                        {item.quantity}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-zinc-400">
                        Price
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-[0_12px_32px_rgba(0,0,0,0.04)] sm:p-5">
            <h2 className="text-base font-bold text-zinc-950 sm:text-lg">
              Payment Summary
            </h2>

            <div className="mt-5 space-y-3 text-sm text-zinc-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-zinc-900">Free</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span className="font-semibold text-zinc-900">₹0</span>
              </div>
            </div>

            <div className="mt-5 border-t border-zinc-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-zinc-950">Total</span>
                <span className="text-xl font-black tracking-[-0.05em] text-zinc-950">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Secure Checkout
            </button>
          </aside>
        </div>
      </section>

      <HomeFooter />
    </main>
  );
}
