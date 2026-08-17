"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductGrid from "@/components/products/ProductGrid";
import { getFeaturedProducts } from "@/data/products";

export default function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts().slice(0, 8);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1780px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        {/* Header */}
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
          <div>
            <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/40 sm:text-[10px]">
              Curated for you
            </p>

            <h2 className="text-xl font-semibold tracking-[-0.045em] text-black sm:text-2xl lg:text-3xl">
              Featured products
            </h2>

            <p className="mt-1.5 max-w-md text-[11px] leading-5 text-black/45 sm:text-xs">
              Discover some of our most carefully selected products.
            </p>
          </div>

          <Link
            href="/search?featured=true"
            className="group hidden items-center gap-1.5 text-[11px] font-medium text-black/50 transition hover:text-black sm:flex"
          >
            View all

            <ArrowRight
              size={13}
              strokeWidth={1.7}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Product Grid */}
        {featuredProducts.length > 0 ? (
          <ProductGrid
            products={featuredProducts}
            priorityCount={4}
          />
        ) : (
          <div className="flex min-h-32 items-center justify-center rounded-xl border border-black/[0.07] bg-[#f7f7f5] sm:rounded-2xl">
            <p className="text-xs text-black/45">
              No featured products available.
            </p>
          </div>
        )}

        {/* Mobile view all */}
        <Link
          href="/search?featured=true"
          className="group mt-6 flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-black/10 text-[10px] font-medium text-black transition hover:border-black/20 sm:hidden"
        >
          View all featured products

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