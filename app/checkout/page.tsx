"use client";

import { useEffect, useMemo, useState } from "react";

import Header from "@/components/home/Header";
import HomeFooter from "@/components/home/HomeFooter";

import CheckoutProductCard from "@/components/checkout/CheckoutProductCard";
import DeliveryCard from "@/components/checkout/DeliveryCard";
import CouponCard from "@/components/checkout/CouponCard";
import PaymentCard from "@/components/checkout/PaymentCard";

import { useCart } from "@/context/CartContext";

type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
};

type Address = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
};

type PaymentMethod =
  | "upi"
  | "card"
  | "wallet"
  | "cod";

const STORAGE_KEY = "sellexa-checkout";

export default function CheckoutPage() {
  /*
   * Cart Context
   *
   * We use removeFromCart() instead of clearing the
   * complete cart so products that were NOT checked out
   * remain in the cart.
   */
  const { removeFromCart } = useCart();

  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("upi");

  const [selectedAddress, setSelectedAddress] =
    useState<Address | null>(null);

  /*
   * Coupon discount
   */
  const [discount, setDiscount] = useState(0);

  /*
   * Replace this with your actual address data/API later.
   */
  const addresses: Address[] = [];

  /* Load checkout products */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        setItems([]);
        return;
      }

      const parsed = JSON.parse(raw);

      if (Array.isArray(parsed)) {
        setItems(parsed);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error(
        "Failed to load checkout items:",
        error
      );

      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* Subtotal */
  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [items]);

  /* Total quantity */
  const totalItems = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [items]);

  /* Increase quantity */
  const handleIncrease = (id: string) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  /* Decrease quantity */
  const handleDecrease = (id: string) => {
    setItems((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  /* Remove product */
  const handleRemove = (id: string) => {
    setItems((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );
  };

  /* Keep localStorage synchronized */
  useEffect(() => {
    if (isLoading) return;

    if (items.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );
  }, [items, isLoading]);

  /*
   * Successful order
   */
  const handlePlaceOrder = () => {
    /*
     * Safety check
     */
    if (!selectedAddress) {
      return;
    }

    /*
     * Calculate final amount
     */
    const safeDiscount = Math.min(
      Math.max(discount, 0),
      subtotal
    );

    const delivery = 0;
    const tax = 0;

    const total =
      subtotal +
      delivery +
      tax -
      safeDiscount;

    /*
     * Order data
     *
     * Replace console.log with your API request
     * when the backend order endpoint is connected.
     */
    const orderData = {
      items,
      paymentMethod,
      selectedAddress,
      subtotal,
      delivery,
      tax,
      discount: safeDiscount,
      total,
      createdAt: new Date().toISOString(),
    };

    console.log(
      "Order placed successfully:",
      orderData
    );

    /*
     * IMPORTANT:
     *
     * Remove ONLY the products that were checked out.
     *
     * Other products already present in the cart
     * will remain untouched.
     */
    items.forEach((item) => {
      removeFromCart(item.id);
    });

    /*
     * Remove checkout-only data.
     */
    localStorage.removeItem(STORAGE_KEY);

    /*
     * Reset checkout state.
     */
    setItems([]);
    setDiscount(0);

    /*
     * Redirect after successful order.
     */
    window.location.href = "/";
  };

  /* Loading state */
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f5f6f3] text-zinc-950">
        <Header hideCart hideWishlist />

        <section className="mx-auto mt-5 w-[calc(100%-24px)] max-w-[1780px] py-6 sm:w-[calc(100%-32px)] sm:py-8 lg:py-10">
          <div className="animate-pulse">
            <div className="h-4 w-24 rounded-full bg-zinc-200" />

            <div className="mt-3 h-9 w-56 rounded-xl bg-zinc-200" />

            <div className="mt-8 h-14 rounded-2xl bg-white" />

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
              <div className="rounded-[28px] bg-white p-5">
                <div className="h-5 w-32 rounded bg-zinc-200" />

                <div className="mt-6 space-y-5">
                  <div className="h-28 rounded-2xl bg-zinc-100" />
                  <div className="h-28 rounded-2xl bg-zinc-100" />
                </div>
              </div>

              <div className="h-[430px] rounded-[28px] bg-white" />
            </div>
          </div>
        </section>

        <HomeFooter />
      </main>
    );
  }

  /* Empty checkout */
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f5f6f3] text-zinc-950">
        <Header hideCart hideWishlist />

        <section className="mx-auto mt-5 flex min-h-[65vh] w-[calc(100%-24px)] max-w-[1780px] items-center justify-center sm:w-[calc(100%-32px)]">
          <div className="w-full max-w-[460px] rounded-[28px] border border-zinc-200 bg-white p-7 text-center shadow-[0_15px_50px_rgba(0,0,0,0.04)] sm:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950 text-white">
              <span className="text-lg">
                ×
              </span>
            </div>

            <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Checkout
            </p>

            <h1 className="mt-2 text-2xl font-black tracking-[-0.05em] text-zinc-950 sm:text-3xl">
              No items selected
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-[13px] leading-5 text-zinc-500 sm:text-[14px]">
              Your checkout is currently empty.
              Add a product to your cart and
              continue when you're ready.
            </p>

            <a
              href="/cart"
              className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-zinc-950 px-6 text-[13px] font-semibold text-white transition hover:bg-zinc-800"
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
    <main className="min-h-screen bg-[#f5f6f3] text-zinc-950">
      <Header hideCart hideWishlist />

      <section className="mx-auto mt-5 w-[calc(100%-20px)] max-w-[1780px] py-5 sm:w-[calc(100%-32px)] sm:py-7 lg:py-9">

        {/* Page Header */}
        <div className="mb-6 sm:mb-7 lg:mb-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Sellexa checkout
          </p>

          <div className="mt-1.5 flex items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-black tracking-[-0.055em] text-zinc-950 sm:text-3xl lg:text-4xl">
                Complete your order
              </h1>

              <p className="mt-1.5 text-[13px] text-zinc-500 sm:text-[14px]">
                Review your items and choose
                how you'd like to receive them.
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-zinc-950 px-3 py-1.5 text-[12px] font-semibold text-white">
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}
            </span>
          </div>
        </div>

        {/* Main Checkout */}
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-7">

          {/* Left */}
          <div className="min-w-0 space-y-5">

            {/* Products */}
            <section className="rounded-[24px] border border-zinc-200/80 bg-white px-4 shadow-[0_8px_30px_rgba(0,0,0,0.025)] sm:rounded-[28px] sm:px-5 lg:px-6">
              <div className="flex items-center justify-between gap-3 border-b border-zinc-100 py-4 sm:py-5">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Your selection
                  </p>

                  <h2 className="mt-1 text-base font-bold tracking-tight text-zinc-950 sm:text-lg">
                    Products
                  </h2>
                </div>

                <span className="text-[12px] font-medium text-zinc-400 sm:text-[13px]">
                  {items.length}{" "}
                  {items.length === 1
                    ? "product"
                    : "products"}
                </span>
              </div>

              <div>
                {items.map((item) => (
                  <CheckoutProductCard
                    key={item.id}
                    item={item}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </section>

            {/* Delivery */}
            <DeliveryCard
              selectedAddress={selectedAddress}
              addresses={addresses}
              onSelectAddress={
                setSelectedAddress
              }
            />

            {/* Coupon */}
            <CouponCard
              subtotal={subtotal}
              onDiscountChange={
                setDiscount
              }
            />
          </div>

          {/* Right */}
          <div className="lg:sticky lg:top-6">
            <PaymentCard
              subtotal={subtotal}
              delivery={0}
              tax={0}
              discount={discount}
              paymentMethod={paymentMethod}
              selectedAddress={
                selectedAddress
              }
              onPaymentMethodChange={
                setPaymentMethod
              }
              onPlaceOrder={
                handlePlaceOrder
              }
            />
          </div>
        </div>
      </section>

      <HomeFooter />
    </main>
  );
}