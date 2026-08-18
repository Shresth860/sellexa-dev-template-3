"use client";

import { useState } from "react";
import { Check, ChevronDown, Tag, X } from "lucide-react";

interface CouponSectionProps {
  appliedCoupon?: string | null;
  onApply?: (coupon: string) => void;
  onRemove?: () => void;
}

const AVAILABLE_COUPONS = [
  {
    code: "SAVE10",
    title: "10% OFF",
    description: "Get 10% off on your order",
  },
  {
    code: "FLAT500",
    title: "₹500 OFF",
    description: "Flat ₹500 off on your order",
  },
];

export default function CouponSection({
  appliedCoupon = null,
  onApply,
  onRemove,
}: CouponSectionProps) {
  const [coupon, setCoupon] = useState("");
  const [showCoupons, setShowCoupons] = useState(false);

  const handleApply = (code = coupon) => {
    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) return;

    onApply?.(normalizedCode);
    setCoupon("");
    setShowCoupons(false);
  };

  return (
    <section className="w-full rounded-2xl border border-zinc-200 bg-white p-4 sm:rounded-3xl sm:p-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 sm:size-10">
          <Tag
            size={17}
            strokeWidth={1.8}
            className="text-zinc-700"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-zinc-950 sm:text-[15px]">
            Apply Coupon
          </h3>

          <p className="mt-0.5 text-[11px] leading-4 text-zinc-500 sm:text-xs">
            Save more on your order
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCoupons((prev) => !prev)}
          className="flex size-8 shrink-0 items-center justify-center rounded-full transition hover:bg-zinc-100"
          aria-label="Show available coupons"
          aria-expanded={showCoupons}
        >
          <ChevronDown
            size={17}
            strokeWidth={1.8}
            className={`transition-transform ${
              showCoupons ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Applied Coupon */}
      {appliedCoupon ? (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
            <Check
              size={15}
              strokeWidth={2}
              className="text-emerald-700"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-emerald-900">
              {appliedCoupon}
            </p>

            <p className="text-[10px] text-emerald-700">
              Coupon applied successfully
            </p>
          </div>

          <button
            type="button"
            onClick={onRemove}
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-emerald-700 transition hover:bg-emerald-100"
            aria-label="Remove coupon"
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        <>
          {/* Coupon Input */}
          <div className="mt-4 flex h-11 w-full items-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 transition focus-within:border-zinc-400 focus-within:bg-white">
            <input
              type="text"
              value={coupon}
              onChange={(event) =>
                setCoupon(event.target.value.toUpperCase())
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleApply();
                }
              }}
              placeholder="Enter coupon code"
              className="min-w-0 flex-1 bg-transparent px-3 text-xs font-medium text-zinc-900 outline-none placeholder:text-zinc-400 sm:text-sm"
            />

            <button
              type="button"
              onClick={() => handleApply()}
              disabled={!coupon.trim()}
              className="mr-1.5 h-8 shrink-0 rounded-lg bg-zinc-950 px-3 text-[11px] font-bold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-xs"
            >
              Apply
            </button>
          </div>

          {/* Available Coupons */}
          {showCoupons && (
            <div className="mt-3 space-y-2">
              {AVAILABLE_COUPONS.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleApply(item.code)}
                  className="flex w-full items-center gap-3 rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-3 text-left transition hover:border-zinc-400 hover:bg-white"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-900 shadow-sm">
                    <Tag size={14} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-zinc-950">
                      {item.title}
                    </p>

                    <p className="mt-0.5 text-[10px] text-zinc-500">
                      {item.description}
                    </p>
                  </div>

                  <span className="shrink-0 text-[10px] font-bold text-zinc-700">
                    Apply
                  </span>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}