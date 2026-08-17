
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";

export default function HeroSection() {
  const featuredProducts = getFeaturedProducts();
  const product = featuredProducts[0];

  if (!product) {
    return null;
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1780px] px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="relative overflow-hidden rounded-2xl  sm:rounded-3xl">
          <div className="grid min-h-[560px] grid-cols-1 lg:grid-cols-2 lg:min-h-[620px]">
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16 xl:px-20">
              {/* Small label */}
              <div className="mb-5 flex items-center gap-2 sm:mb-7">
                <span className="h-px w-7 bg-black sm:w-10" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/60 sm:text-xs">
                  Featured Collection
                </span>
              </div>

              {/* Heading */}
              <h1 className="max-w-xl text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-black">
                Discover
                <br />
                what&apos;s
                <br />
                <span className="text-black/45">next.</span>
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-md text-sm leading-6 text-black/60 sm:mt-7 sm:text-[15px] sm:leading-7">
                Curated products designed to bring quality, style and
                everyday convenience into your life.
              </p>

              {/* CTA */}
              <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
                <Link
                  href={`/search?category=${encodeURIComponent(
                    product.category
                  )}`}
                  className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/85 active:scale-[0.98]"
                >
                  Shop Collection
                  <ArrowRight
                    size={16}
                    strokeWidth={1.8}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/15 bg-white/60 px-6 text-sm font-medium text-black transition hover:bg-white active:scale-[0.98]"
                >
                  View Product
                </Link>
              </div>

              {/* Rating */}
              <div className="mt-8 flex items-center gap-3 sm:mt-10">
                <div className="flex items-center gap-1">
                  <Star
                    size={14}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                  <span className="text-sm font-semibold">
                    {product.rating.toFixed(1)}
                  </span>
                </div>

                <span className="h-4 w-px bg-black/15" />

                <span className="text-xs text-black/50">
                  {product.reviewCount.toLocaleString()} verified reviews
                </span>
              </div>
            </div>

            {/* Product visual */}
            <div className="relative min-h-[350px] overflow-hidden sm:min-h-[440px] lg:min-h-full">
              {/* Background decorative shape */}
              <div className="absolute right-[-20%] top-1/2 h-[90%] w-[90%] -translate-y-1/2 rounded-full bg-[#f4f1ed]  blur-[1px]" />

              {/* Product image */}
<div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12 lg:p-14 xl:p-20">
  <div className="relative h-[280px] w-[200px] overflow-hidden rounded-[22px] sm:h-[340px] sm:w-[300px] lg:h-[380px] lg:w-[300px] xl:h-[420px] xl:w-[360px]">
    <Image
      src={product.image}
      alt={product.name}
      fill
      priority
      sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, (max-width: 1280px) 380px, 420px"
      className="object-cover"
    />
  </div>
</div>

              {/* Floating product information */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-black/[0.06] bg-white/90 p-4 shadow-lg backdrop-blur-md sm:bottom-7 sm:left-auto sm:right-7 sm:w-[270px] sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-black/45">
                      {product.category}
                    </p>

                    <h2 className="truncate text-sm font-semibold text-black sm:text-[15px]">
                      {product.name}
                    </h2>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-base font-semibold">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>

                      {product.originalPrice && (
                        <span className="text-xs text-black/40 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>

                  {product.badge && (
                    <span className="shrink-0 rounded-full bg-black px-2.5 py-1 text-[9px] font-semibold tracking-wide text-white">
                      {product.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
