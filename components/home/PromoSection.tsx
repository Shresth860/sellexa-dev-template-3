"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PromoSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1780px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden rounded-2xl bg-black px-6 py-10 text-white sm:rounded-3xl sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          {/* Decorative shapes */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10 sm:h-72 sm:w-72" />

          <div className="pointer-events-none absolute -bottom-28 right-10 h-64 w-64 rounded-full border border-white/[0.06]" />

          <div className="pointer-events-none absolute left-[45%] top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl lg:block" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
            {/* Content */}
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-2 sm:mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]">
                  <Sparkles size={14} strokeWidth={1.6} />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 sm:text-xs">
                  Sellexa picks
                </span>
              </div>

              <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-4xl lg:text-5xl xl:text-6xl">
                Good products.
                <br />
                <span className="text-white/45">Better choices.</span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-6 text-white/55 sm:mt-6 sm:text-[15px] sm:leading-7">
                Explore thoughtfully selected products across electronics,
                fashion, beauty, lifestyle and more.
              </p>

              <Link
                href="/search"
                className="group mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-medium text-black transition hover:bg-white/90 active:scale-[0.98] sm:mt-8"
              >
                Explore collection

                <ArrowRight
                  size={16}
                  strokeWidth={1.8}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Stats / benefits */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:w-[310px] lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm sm:p-5">
                <p className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                  100%
                </p>

                <p className="mt-2 text-[10px] leading-4 text-white/45 sm:text-xs">
                  Carefully selected products
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm sm:p-5">
                <p className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                  4.8+
                </p>

                <p className="mt-2 text-[10px] leading-4 text-white/45 sm:text-xs">
                  Average customer rating
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm sm:p-5">
                <p className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                  Easy
                </p>

                <p className="mt-2 text-[10px] leading-4 text-white/45 sm:text-xs">
                  Simple shopping experience
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm sm:p-5">
                <p className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                  Secure
                </p>

                <p className="mt-2 text-[10px] leading-4 text-white/45 sm:text-xs">
                  Safe and reliable checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}