"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, ArrowUpRight } from "lucide-react";
import { products, getFeaturedProducts } from "@/data/products";

export default function HeroSection() {
  const featuredProducts = getFeaturedProducts();
  const product = featuredProducts[0];
  const formatProductCount = (count: number) => {
    if (count >= 1_000_000) {
      return `${(count / 1_000_000).toFixed(count % 1_000_000 === 0 ? 0 : 1)}M`;
    }

    if (count >= 1_000) {
      return `${(count / 1_000).toFixed(count % 1_000 === 0 ? 0 : 1)}K`;
    }

    return count.toString();
  };
  if (!product) {
    return null;
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1780px] px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
        <div className="relative overflow-hidden ">
          <div className="relative min-h-[650px] overflow-hidden sm:min-h-[700px] lg:min-h-[720px] xl:min-h-[760px]">
            {/* Decorative background */}
<div
  className="
    pointer-events-none
    absolute
    -bottom-50
    -left-50
    h-[390px]
    w-[390px]
    rounded-full
    bg-[#f0eeea]
    sm:h-[500px]
    sm:w-[500px]
    lg:h-[620px]
    lg:w-[620px]
    xl:h-[700px]
    xl:w-[700px]
  "
/>
<div
  className="
    pointer-events-none
    absolute
    -top-50
    -right-50
    h-[390px]
    w-[390px]
    rounded-full
    bg-[#f0eeea]
    sm:h-[500px]
    sm:w-[500px]
    lg:h-[620px]
    lg:w-[620px]
    xl:h-[700px]
    xl:w-[700px]
  "
/>
            {/* =====================================================
                DESKTOP
            ====================================================== */}
            <div className="relative z-10 hidden min-h-[720px] lg:block">
              {/* =================================================
                  LEFT CART PANEL
              ================================================== */}
              <div className="absolute bottom-[30%] left-[3%] xl:left-[5%]">
                <div className="relative w-[275px] xl:w-[310px]">
                  {/* Cart card */}
                  <Link
                    href="/cart"
                    aria-label="View shopping cart"
                    className="
                      group
                      relative
                      flex
                      h-[310px]
                      w-full
                      flex-col
                      justify-between
                      overflow-hidden
                      rounded-[30px]
                      border
                      border-black/[0.07]
                      bg-white
                      p-6
                      shadow-[0_25px_60px_rgba(0,0,0,0.08)]
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      hover:shadow-[0_30px_70px_rgba(0,0,0,0.11)]
                      xl:h-[350px]
                      xl:p-7
                    "
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/40">
                          Your shopping bag
                        </p>

                        <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-black xl:text-2xl">
                          Ready to shop?
                        </h2>
                      </div>

                      <span
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-black/[0.08]
                          bg-[#fafaf9]
                          text-black
                          transition-transform
                          duration-300
                          group-hover:rotate-[-6deg]
                        "
                      >
                        <ArrowUpRight size={17} strokeWidth={1.6} />
                      </span>
                    </div>

                    {/* Large cart */}
                    <div className="relative flex flex-1 items-center justify-center">
                      <div
                        className="
                          absolute
                          h-[145px]
                          w-[145px]
                          rounded-full
                          bg-[#f1eee9]
                          transition-transform
                          duration-500
                          group-hover:scale-110
                        "
                      />

                      <ShoppingCart
                        size={108}
                        strokeWidth={1.05}
                        className="
                          relative
                          z-10
                          text-black
                          transition-transform
                          duration-500
                          group-hover:-translate-y-1
                        "
                      />

                      {/* Cart count */}
                      <span
                        className="
                          absolute
                          right-[20%]
                          top-[22%]
                          z-20
                          flex
                          h-9
                          min-w-9
                          items-center
                          justify-center
                          rounded-full
                          bg-black
                          px-2
                          text-[11px]
                          font-semibold
                          text-white
                          shadow-lg
                        "
                      >
                        0
                      </span>
                    </div>

                    {/* Bottom */}
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.14em] text-black/35">
                          Cart
                        </p>

                        <p className="mt-1 text-sm font-semibold text-black">
                          Start adding products
                        </p>
                      </div>

                      <span className="text-xs font-medium text-black/45 transition-colors group-hover:text-black">
                        Open cart
                      </span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* =================================================
                  CENTER CONTENT
              ================================================== */}
              <div className="absolute left-[34%] top-1/2 w-[42%] -translate-y-1/2">
                <div className="max-w-[650px]">
                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                    Sellexa Collection
                  </p>

                  <h1
                    className="
                    text-[clamp(3.5rem,5.8vw,6.8rem)]
                    font-medium
                    leading-[0.88]
                    tracking-[-0.065em]
                    text-black
                  "
                  >
                    Discover
                    <br />
                    more.
                    <br />
                    Shop
                    <br />
                    better.
                  </h1>

                  <p className="mt-6 max-w-md text-sm leading-6 text-black/50 xl:text-[15px]">
                    Thoughtfully selected products designed to make everyday
                    living smarter, simpler and better.
                  </p>

                  <Link
                    href={`/search?category=${encodeURIComponent(
                      product.category,
                    )}`}
className="
  group
  mt-9
  flex
  h-12
  w-fit
  lg:translate-x-[50%]
  items-center
  justify-center
  gap-3
  rounded-full
  bg-black
  px-8
  text-[11px]
  font-medium
  uppercase
  tracking-[0.08em]
  text-white
  transition-all
  duration-300
  hover:bg-black/85
  hover:gap-4
  active:scale-[0.98]
"
                  >
                    Start Shopping
                    <ArrowRight
                      size={15}
                      strokeWidth={1.7}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>

              {/* =================================================
                  RIGHT PRODUCT
              ================================================== */}
              {/* Right featured product composition */}
              <div
                className="
                absolute
                bottom-[15%]
                right-[3%]
                h-[430px]
                w-[400px]
                xl:right-[5%]
                xl:h-[470px]
                xl:w-[440px]
              "
              >
                {/* Product image */}
                <Link
                  href={`/products/${product.slug}`}
                  aria-label={`View ${product.name}`}
                  className="
                  group
                  absolute
                  left-0
                  top-0
                  z-10
                  block
                  h-[420px]
                  w-[360px]
                  overflow-hidden
                  rounded-[14px]
                  bg-[#eeeae4]
                  shadow-[0_20px_45px_rgba(0,0,0,0.06)]
                  xl:h-[450px]
                  xl:w-[350px]
                "
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1280px) 360px, 390px"
                    className="
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.025]
                  "
                  />
                </Link>

                {/* Floating product information */}
                <div
                  className="
                  absolute
                  bottom-[-5px]
                  right-0
                  z-20
                  w-[270px]
                  rounded-[18px]
                  border
                  border-black/[0.06]
                  bg-white
                  px-5
                  py-4
                  shadow-[0_12px_30px_rgba(0,0,0,0.10)]
                  xl:bottom-[-40px]
                  xl:w-[290px]
                "
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-black/40">
                        {product.category}
                      </p>

                      <h2 className="mt-1 truncate text-sm font-semibold tracking-[-0.02em] text-black">
                        {product.name}
                      </h2>
                    </div>

                    {product.badge && (
                      <span className="shrink-0 rounded-full bg-black px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.06em] text-white">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-base font-semibold tracking-[-0.02em] text-black">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    {product.originalPrice && (
                      <span className="text-xs text-black/35 line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div className="absolute bottom-[8%] left-[4%] flex items-end gap-2 xl:left-[5%]">
                <span className="text-3xl font-semibold tracking-[-0.06em] text-black xl:text-4xl">
                  {formatProductCount(products.length)}
                </span>

                <span className="mb-1 text-[10px] font-medium uppercase leading-[1.1] tracking-[0.05em] text-black">
                  Products
                  <br />
                  in stock
                </span>
              </div>
            </div>

            {/* =====================================================
                MOBILE
            ====================================================== */}
            <div className="relative z-10 flex min-h-[700px] flex-col px-5 py-8 sm:min-h-[760px] sm:px-8 sm:py-10 lg:hidden">
              {/* Heading */}
              <div className="relative z-20">
                <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40 sm:text-[10px]">
                  Sellexa Collection
                </p>

                <h1
                  className="
                    text-[clamp(2.65rem,12vw,4.5rem)]
                    font-medium
                    leading-[0.9]
                    tracking-[-0.06em]
                    text-black
                  "
                >
                  Smart
                  <br />
                  Electricals
                  <br />
                  for a Smarter
                  <br />
                  Home
                </h1>

                <p className="mt-5 max-w-[320px] text-xs leading-5 text-black/50 sm:text-sm sm:leading-6">
                  Thoughtfully selected products designed for smarter, simpler
                  everyday living.
                </p>
              </div>

              {/* Mobile product */}
              <div className="relative mt-8 flex min-h-[320px] flex-1 items-center justify-center sm:mt-10 sm:min-h-[360px]">
                {/* Circle */}
                <div className="absolute h-[300px] w-[300px] rounded-full bg-[#f0eeea] sm:h-[390px] sm:w-[390px]" />

                <Link
                  href={`/products/${product.slug}`}
                  aria-label={`View ${product.name}`}
                  className="group relative z-10"
                >
                  <div className="relative h-[310px] w-[235px] overflow-hidden rounded-[26px] bg-[#eeeae4] shadow-[0_22px_50px_rgba(0,0,0,0.10)] sm:h-[360px] sm:w-[275px]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="275px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>

                {/* Floating cart */}
                <Link
                  href="/cart"
                  aria-label="View shopping cart"
                  className="
                    absolute
                    right-[2%]
                    top-[2%]
                    z-20
                    flex
                    h-[68px]
                    w-[68px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-black/[0.08]
                    bg-white
                    text-black
                    shadow-[0_15px_35px_rgba(0,0,0,0.12)]
                    transition
                    hover:-translate-y-1
                    active:scale-95
                    sm:right-[8%]
                  "
                >
                  <ShoppingCart size={29} strokeWidth={1.15} />

                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[8px] font-semibold text-white">
                    0
                  </span>
                </Link>

                {/* Mobile product info */}
                <div className="absolute bottom-[-6px] left-1/2 z-20 w-[calc(100%-32px)] max-w-[310px] -translate-x-1/2 rounded-2xl border border-black/[0.06] bg-white/90 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] backdrop-blur-md sm:p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-black/40">
                        {product.category}
                      </p>

                      <p className="mt-1 truncate text-xs font-semibold text-black sm:text-sm">
                        {product.name}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs font-semibold text-black sm:text-sm">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="relative z-20 mt-9 flex items-end justify-between gap-4 sm:mt-10">
                {/* Stock */}
                <div className="flex items-end gap-1.5">
                  <span className="text-2xl font-semibold tracking-[-0.06em] text-black sm:text-3xl">
                    5K+
                  </span>

                  <span className="mb-0.5 text-[8px] font-medium uppercase leading-[1.1] tracking-[0.05em] text-black/70 sm:text-[9px]">
                    Products
                    <br />
                    in stock
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href={`/search?category=${encodeURIComponent(
                    product.category,
                  )}`}
                  className="
                    group
                    inline-flex
                    h-11
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-black
                    px-6
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.06em]
                    text-white
                    transition-all
                    active:scale-[0.97]
                    sm:h-12
                    sm:px-7
                    sm:text-[11px]
                  "
                >
                  Start Shopping
                  <ArrowRight
                    size={14}
                    strokeWidth={1.7}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
