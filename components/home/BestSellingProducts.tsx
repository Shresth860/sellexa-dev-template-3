"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import ProductGrid from "@/components/products/ProductGrid";
import { getBestSellingProducts } from "@/data/products";

export default function BestSellingProducts() {
  const bestSellingProducts = getBestSellingProducts().slice(0, 8);

  return (
    <section className="w-full bg-[#f7f7f5]">
      <div className="mx-auto max-w-[1780px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        {/* Header */}
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
          <div>
            <div className="mb-1.5 flex items-center gap-1.5">
              <TrendingUp
                size={14}
                strokeWidth={1.8}
                className="text-black/45"
              />

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40 sm:text-[11px]">
                Most loved
              </p>
            </div>

            <h2 className="text-xl font-semibold tracking-[-0.045em] text-black sm:text-2xl lg:text-3xl">
              Best sellers
            </h2>

            <p className="mt-1.5 max-w-md text-xs leading-5 text-black/45 sm:text-sm">
              Products customers are choosing again and again.
            </p>
          </div>

          <Link
            href="/search?sort=best-selling"
            className="group hidden items-center gap-1.5 text-sm font-medium text-black/50 transition hover:text-black sm:flex"
          >
            View all

            <ArrowRight
              size={13}
              strokeWidth={1.7}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Products */}
        {bestSellingProducts.length > 0 ? (
          <ProductGrid
            products={bestSellingProducts}
            priorityCount={4}
          />
        ) : (
          <div className="flex min-h-32 items-center justify-center rounded-xl border border-black/[0.07] bg-white sm:rounded-2xl">
            <p className="text-sm text-black/45">
              No best-selling products available.
            </p>
          </div>
        )}

        {/* Mobile view all */}
        <Link
          href="/search?sort=best-selling"
          className="group mt-6 flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-black/10 bg-white text-[11px] font-medium text-black transition hover:border-black/20 sm:hidden"
        >
          View all best sellers

          <ArrowRight
            size={12}
            strokeWidth={1.7}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}