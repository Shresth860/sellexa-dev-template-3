"use client";

import { Check, Tag, X } from "lucide-react";
import { useState } from "react";

type CouponCardProps = {
  subtotal: number;
  onDiscountChange?: (discount: number) => void;
};

type Coupon = {
  code: string;
  discount: number;
  type: "percentage" | "flat";
  minOrder: number;
};

const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: "SELLEXA10",
    discount: 10,
    type: "percentage",
    minOrder: 499,
  },
  {
    code: "WELCOME100",
    discount: 100,
    type: "flat",
    minOrder: 999,
  },
];

export default function CouponCard({
  subtotal,
  onDiscountChange,
}: CouponCardProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] =
    useState<Coupon | null>(null);
  const [error, setError] = useState("");

  const calculateDiscount = (coupon: Coupon) => {
    if (coupon.type === "percentage") {
      return Math.round(
        (subtotal * coupon.discount) / 100
      );
    }

    return coupon.discount;
  };

  const handleApply = () => {
    setError("");

    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setError("Enter a coupon code");
      return;
    }

    const coupon = AVAILABLE_COUPONS.find(
      (item) => item.code === code
    );

    if (!coupon) {
      setError("Invalid coupon code");
      return;
    }

    if (subtotal < coupon.minOrder) {
      setError(
        `Minimum order ₹${coupon.minOrder.toLocaleString(
          "en-IN"
        )} required`
      );
      return;
    }

    const discount = calculateDiscount(coupon);

    setAppliedCoupon(coupon);
    onDiscountChange?.(discount);
  };

  const handleRemove = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setError("");
    onDiscountChange?.(0);
  };

  const discount = appliedCoupon
    ? calculateDiscount(appliedCoupon)
    : 0;

  return (
    <section className="rounded-[24px] border border-zinc-200/80 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.025)] sm:rounded-[28px] sm:p-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
          <Tag size={16} strokeWidth={1.7} />
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Save more
          </p>

          <h2 className="mt-0.5 text-[15px] font-bold text-zinc-950 sm:text-base">
            Apply coupon
          </h2>
        </div>
      </div>

      {/* Applied Coupon */}
      {appliedCoupon ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
              <Check size={14} strokeWidth={2.5} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[12px] font-bold text-emerald-900">
                {appliedCoupon.code}
              </p>

              <p className="text-[11px] text-emerald-700">
                ₹{discount.toLocaleString("en-IN")} saved
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove coupon"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-emerald-700 transition hover:bg-emerald-100"
          >
            <X size={14} strokeWidth={1.8} />
          </button>
        </div>
      ) : (
        <>
          {/* Coupon Input */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(event) => {
                setCouponCode(
                  event.target.value.toUpperCase()
                );
                setError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleApply();
                }
              }}
              placeholder="Enter coupon code"
              className="h-11 min-w-0 flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-[12px] font-medium text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-900/5 sm:text-[13px]"
            />

            <button
              type="button"
              onClick={handleApply}
              className="h-11 shrink-0 rounded-xl bg-zinc-950 px-4 text-[12px] font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98] sm:px-5 sm:text-[13px]"
            >
              Apply
            </button>
          </div>

          {error && (
            <p className="mt-2 text-[11px] font-medium text-red-500">
              {error}
            </p>
          )}
        </>
      )}

      {/* Available Coupons */}
      {!appliedCoupon && (
        <div className="mt-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Available offers
          </p>

          <div className="space-y-2">
            {AVAILABLE_COUPONS.map((coupon) => (
              <button
                key={coupon.code}
                type="button"
                onClick={() => {
                  setCouponCode(coupon.code);
                  setError("");
                }}
                className="flex w-full items-center justify-between rounded-xl border border-dashed border-zinc-200 px-3 py-2.5 text-left transition hover:border-zinc-400 hover:bg-zinc-50"
              >
                <div>
                  <p className="text-[12px] font-bold text-zinc-900">
                    {coupon.code}
                  </p>

                  <p className="mt-0.5 text-[10px] text-zinc-400">
                    {coupon.type === "percentage"
                      ? `${coupon.discount}% off`
                      : `₹${coupon.discount} off`}
                    {" • "}Min. ₹
                    {coupon.minOrder.toLocaleString("en-IN")}
                  </p>
                </div>

                <span className="text-[10px] font-semibold text-zinc-500">
                  Use
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}