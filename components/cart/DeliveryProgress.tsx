"use client";

import { Check, Truck } from "lucide-react";

interface DeliveryProgressProps {
  subtotal: number;
  freeDeliveryThreshold?: number;
}

export default function DeliveryProgress({
  subtotal,
  freeDeliveryThreshold = 2000,
}: DeliveryProgressProps) {
  const remaining = Math.max(
    freeDeliveryThreshold - subtotal,
    0
  );

  const progress = Math.min(
    (subtotal / freeDeliveryThreshold) * 100,
    100
  );

  const isFreeDelivery = remaining <= 0;

  return (
    <section className="w-full rounded-2xl border border-zinc-200 bg-white p-4 sm:rounded-3xl sm:p-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className={`flex size-9 shrink-0 items-center justify-center rounded-xl sm:size-10 ${
            isFreeDelivery
              ? "bg-emerald-50"
              : "bg-zinc-100"
          }`}
        >
          {isFreeDelivery ? (
            <Check
              size={17}
              strokeWidth={2}
              className="text-emerald-600"
            />
          ) : (
            <Truck
              size={17}
              strokeWidth={1.8}
              className="text-zinc-700"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-zinc-950 sm:text-[15px]">
            {isFreeDelivery
              ? "Free Delivery Unlocked"
              : "Free Delivery"}
          </h3>

          <p className="mt-0.5 text-[11px] leading-4 text-zinc-500 sm:text-xs">
            {isFreeDelivery
              ? "Your order qualifies for free delivery."
              : `Add ₹${remaining.toLocaleString("en-IN")} more to unlock free delivery.`}
          </p>
        </div>

        <span className="hidden shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold text-zinc-600 sm:block">
          ₹{freeDeliveryThreshold.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isFreeDelivery
                ? "bg-emerald-500"
                : "bg-zinc-900"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] font-medium text-zinc-400">
            ₹0
          </span>

          <span
            className={`text-[10px] font-semibold ${
              isFreeDelivery
                ? "text-emerald-600"
                : "text-zinc-500"
            }`}
          >
            {isFreeDelivery
              ? "Free delivery"
              : `${Math.round(progress)}% reached`}
          </span>

          <span className="text-[10px] font-medium text-zinc-400">
            ₹{freeDeliveryThreshold.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </section>
  );
}