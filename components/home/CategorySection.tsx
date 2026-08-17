"use client";

import Link from "next/link";
import {
  ArrowRight,
  Smartphone,
  Sparkles,
  Shirt,
  Footprints,
  Home,
  Gift,
} from "lucide-react";
import { categories } from "@/data/products";

const categoryIcons = {
  Electronics: Smartphone,
  Beauty: Sparkles,
  Fashion: Shirt,
  Footwear: Footprints,
  "Home & Living": Home,
  "Gifts & Lifestyle": Gift,
};

export default function CategorySection() {
  const visibleCategories = categories.filter(
    (category) => category !== "All"
  );

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1780px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-12">
        {/* Header */}
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35 sm:text-[11px]">
              Explore
            </p>

            <h2 className="text-xl font-semibold tracking-[-0.045em] text-black sm:text-2xl lg:text-3xl">
              Shop by category
            </h2>
          </div>

          <Link
            href="/search"
            className="group hidden items-center gap-1.5 text-xs font-medium text-black/50 transition hover:text-black sm:flex"
          >
            View all

            <ArrowRight
              size={14}
              strokeWidth={1.7}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {visibleCategories.map((category) => {
            const Icon =
              categoryIcons[category as keyof typeof categoryIcons];

            return (
              <Link
                key={category}
                href={`/search?category=${encodeURIComponent(category)}`}
                className="group relative flex min-h-[108px] flex-col justify-between overflow-hidden rounded-xl border border-black/[0.06] bg-[#fafaf9] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/[0.1] hover:bg-[#f6f6f4] hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)] sm:min-h-[120px] sm:rounded-2xl sm:p-4"
              >
                {/* Top-right bubble */}
                <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-black/[0.045] transition-all duration-500 ease-out group-hover:-right-5 group-hover:-top-5 group-hover:scale-125 group-hover:bg-black/[0.075]" />

                {/* Icon */}
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.05] bg-white text-black shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:scale-105 sm:h-11 sm:w-11">
                  <Icon
                    size={23}
                    strokeWidth={1.55}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 mt-4">
                  <h3 className="text-[15px] font-semibold tracking-[-0.015em] text-black sm:text-[14px]">
                    {category}
                  </h3>

                  <div className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-black/35 transition-colors group-hover:text-black/65 sm:text-[11px]">
                    Explore

                    <ArrowRight
                      size={13}
                      strokeWidth={1.7}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile view all */}
        <Link
          href="/search"
          className="group mt-4 flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-black/[0.08] text-[11px] font-medium text-black/60 transition hover:border-black/15 hover:text-black sm:hidden"
        >
          View all categories

          <ArrowRight
            size={12}
            strokeWidth={1.7}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}