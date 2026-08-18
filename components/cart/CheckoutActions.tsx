"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

interface CheckoutActionsProps {
  total: number;
  disabled?: boolean;
  checkoutHref?: string;
  onCheckout?: () => void;
}

export default function CheckoutActions({
  total,
  disabled = false,
  checkoutHref = "/checkout",
  onCheckout,
}: CheckoutActionsProps) {
  const content = (
    <>
      <span className="flex min-w-0 flex-1 flex-col items-start">
        <span className="text-[10px] font-medium text-white/60">
          Total
        </span>

        <span className="truncate text-sm font-bold text-white sm:text-base">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </span>

      <span className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-xs font-bold text-zinc-950 transition group-hover:bg-zinc-100 sm:px-5 sm:py-3 sm:text-sm">
        Checkout
        <ArrowRight
          size={15}
          strokeWidth={2}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </>
  );

  if (disabled) {
    return (
      <div className="w-full">
        <div className="flex min-h-[58px] w-full items-center justify-between gap-3 rounded-2xl bg-zinc-300 px-3.5 py-2.5 opacity-70 sm:min-h-[66px] sm:rounded-3xl sm:px-4">
          <span className="flex min-w-0 flex-col items-start">
            <span className="text-[10px] font-medium text-zinc-600">
              Total
            </span>

            <span className="text-sm font-bold text-zinc-700 sm:text-base">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </span>

          <span className="flex shrink-0 items-center gap-2 rounded-xl bg-zinc-200 px-3.5 py-2.5 text-xs font-bold text-zinc-500 sm:px-5 sm:py-3 sm:text-sm">
            Checkout
            <ArrowRight size={15} />
          </span>
        </div>

        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
          <Lock size={11} />
          Select at least one item to continue
        </div>
      </div>
    );
  }

  if (onCheckout) {
    return (
      <div className="w-full">
        <button
          type="button"
          onClick={onCheckout}
          className="group flex min-h-[58px] w-full items-center justify-between gap-3 rounded-2xl bg-zinc-950 px-3.5 py-2.5 shadow-sm transition hover:bg-zinc-800 active:scale-[0.99] sm:min-h-[66px] sm:rounded-3xl sm:px-4"
        >
          {content}
        </button>

        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
          <Lock size={11} />
          Secure checkout
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Link
        href={checkoutHref}
        className="group flex min-h-[58px] w-full items-center justify-between gap-3 rounded-2xl bg-zinc-950 px-3.5 py-2.5 shadow-sm transition hover:bg-zinc-800 active:scale-[0.99] sm:min-h-[66px] sm:rounded-3xl sm:px-4"
      >
        {content}
      </Link>

      <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
        <Lock size={11} />
        Secure checkout
      </div>
    </div>
  );
}