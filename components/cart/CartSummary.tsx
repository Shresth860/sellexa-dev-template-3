"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

import PriceBreakdown from "./PriceBreakdown";

interface CartSummaryProps {
  itemCount: number;
  subtotal: number;
  discount?: number;
  deliveryFee?: number;
  tax?: number;
  total: number;
  couponCode?: string;
  productIds?: string[];
  onCheckout?: () => void;
}

export default function CartSummary({
  itemCount,
  subtotal,
  discount = 0,
  deliveryFee = 0,
  tax = 0,
  total,
  couponCode,
  productIds = [],
  onCheckout,
}: CartSummaryProps) {
  const hasItems = itemCount > 0 && productIds.length > 0;

  const handleCheckout = () => {
    if (!hasItems) return;

    onCheckout?.();
  };

  return (
    <aside className="w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:rounded-3xl sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-black tracking-tight text-zinc-950 sm:text-lg">
            Order Summary
          </h2>

          <p className="mt-0.5 text-[10px] text-zinc-500 sm:text-xs">
            {itemCount} {itemCount === 1 ? "item" : "items"} selected
          </p>
        </div>

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 sm:h-9 sm:w-9">
          <ShieldCheck
            size={16}
            strokeWidth={1.8}
            className="text-zinc-700"
          />
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="mt-5">
        <PriceBreakdown
          subtotal={subtotal}
          discount={discount}
          deliveryFee={deliveryFee}
          tax={tax}
          total={total}
          couponCode={couponCode}
        />
      </div>

      {/* Checkout Button */}
      <div className="mt-5">
        {hasItems ? (
          onCheckout ? (
            <button
              type="button"
              onClick={handleCheckout}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-zinc-800 active:scale-[0.99] sm:min-h-12 sm:text-sm"
            >
              Proceed to Checkout
              <ArrowRight
                size={15}
                strokeWidth={2}
              />
            </button>
          ) : (
            <Link
              href="/checkout"
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-zinc-800 active:scale-[0.99] sm:min-h-12 sm:text-sm"
            >
              Proceed to Checkout
              <ArrowRight
                size={15}
                strokeWidth={2}
              />
            </Link>
          )
        ) : (
          <button
            type="button"
            disabled
            className="flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded-xl bg-zinc-200 px-4 py-3 text-xs font-bold text-zinc-400 sm:min-h-12 sm:text-sm"
          >
            Select Items to Continue
          </button>
        )}
      </div>

      {/* Security */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-center text-[9px] text-zinc-400 sm:text-[10px]">
        <ShieldCheck
          size={12}
          strokeWidth={1.7}
        />
        <span>
          Secure checkout · Your payment information is protected
        </span>
      </div>
    </aside>
  );
}