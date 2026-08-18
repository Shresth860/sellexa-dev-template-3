"use client";

import {
  BadgeCheck,
  LockKeyhole,
  RotateCcw,
  Truck,
} from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: LockKeyhole,
    title: "Secure Payment",
    description: "100% protected checkout",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick & reliable shipping",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Simple return process",
  },
  {
    icon: BadgeCheck,
    title: "Genuine Products",
    description: "Quality guaranteed",
  },
];

interface CartTrustBarProps {
  items?: typeof TRUST_ITEMS;
}

export default function CartTrustBar({
  items = TRUST_ITEMS,
}: CartTrustBarProps) {
  return (
    <section className="w-full rounded-2xl border border-zinc-200 bg-white p-3 sm:rounded-3xl sm:p-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex min-w-0 items-center gap-2 rounded-xl bg-zinc-50 p-2.5 sm:flex-col sm:items-center sm:justify-center sm:gap-2 sm:p-3"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-700 shadow-sm sm:size-9">
                <Icon
                  size={15}
                  strokeWidth={1.7}
                />
              </div>

              <div className="min-w-0 sm:text-center">
                <p className="truncate text-[10px] font-bold text-zinc-900 sm:text-xs">
                  {item.title}
                </p>

                <p className="mt-0.5 truncate text-[9px] leading-3.5 text-zinc-400 sm:text-[10px]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}