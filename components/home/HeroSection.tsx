"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Headphones,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { products, getFeaturedProducts } from "@/data/products";

export default function HeroSection() {
  const featuredProducts = getFeaturedProducts();
  const product = featuredProducts[1];

  const formatProductCount = (count: number) => {
    if (count >= 1_000_000) {
      return `${(count / 1_000_000).toFixed(
        count % 1_000_000 === 0 ? 0 : 1,
      )}M`;
    }

    if (count >= 1_000) {
      return `${(count / 1_000).toFixed(
        count % 1_000 === 0 ? 0 : 1,
      )}K`;
    }

    return count.toString();
  };

  if (!product) {
    return null;
  }

  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Secure & Trusted",
      description: "Your data is safe with us",
    },
    {
      icon: Award,
      title: "High Quality",
      description: "Tested and certified products",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable delivery",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "We're here to help",
    },
  ];

  return (
    <section className="mt-5 w-full bg-white">
      <div className="mx-auto w-full max-w-full px-3 pt-0  ">

        {/* =====================================================
            DESKTOP HERO
        ====================================================== */}

        <div className="relative hidden overflow-hidden bg-[#f8f7f4] lg:block">

          <div className="relative h-[500px] overflow-hidden xl:h-[525px]">

            {/* =================================================
                RIGHT PRODUCT IMAGE
            ================================================== */}

            <div className="absolute inset-y-0 right-0 w-[58%]">

              <div className="absolute inset-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="58vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Main image-to-content blend */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  z-10
                  bg-gradient-to-r
                  from-[#f8f7f4]
                  via-[#f8f7f4]/45
                  to-transparent
                "
              />

              {/* Bottom atmospheric fade */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  z-10
                  h-20
                  bg-gradient-to-t
                  from-[#f8f7f4]/45
                  via-[#f8f7f4]/10
                  to-transparent
                "
              />

              {/* Subtle image highlight */}

              <div
                className="
                  pointer-events-none
                  absolute
                  right-0
                  top-0
                  z-10
                  h-full
                  w-[35%]
                  bg-gradient-to-l
                  from-white/[0.04]
                  via-transparent
                  to-transparent
                "
              />
            </div>

            {/* =================================================
                DESKTOP CONTENT
            ================================================== */}

            <div
              className="
                relative
                z-20
                flex
                h-full
                w-[52%]
                flex-col
                justify-center
                px-10
                py-8
                xl:w-[50%]
                xl:px-16
              "
            >

              {/* Collection */}

              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-7 bg-black/25" />

                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-black/45
                  "
                >
                  Sellexa Collection
                </p>
              </div>

              {/* Heading */}

              <h1
                className="
                  max-w-[680px]
                  text-[clamp(3.8rem,6vw,6.2rem)]
                  font-medium
                  leading-[0.88]
                  tracking-[-0.065em]
                  text-black
                "
              >
                Smart Electricals
                <br />
                for a Smarter Home
              </h1>

              {/* Description */}

              <p
                className="
                  mt-5
                  max-w-[430px]
                  text-[14px]
                  leading-[1.6]
                  text-black/45
                  sm:text-[15px]
                "
              >
                Discover innovative and reliable electricals designed
                to make your everyday life easier.
              </p>

              {/* CTA */}

              <Link
                href={`/search?category=${encodeURIComponent(
                  product.category,
                )}`}
                className="
                  group
                  flex
                  h-12
                  w-[150px]
                  shrink-0
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-black
                  px-6
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.08em]
                  whitespace-nowrap
                  text-white
                  transition-all
                  duration-300
                  hover:bg-black/85
                  hover:gap-4
                  active:scale-[0.98]
                "
              >
                <span>Shop Now</span>

                <ArrowRight
                  size={15}
                  strokeWidth={1.7}
                  className="
                    shrink-0
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>

              {/* Product count */}

              <div className="mt-8 flex items-center gap-4">
                <span
                  className="
                    text-[36px]
                    font-semibold
                    leading-none
                    tracking-[-0.07em]
                    text-black
                    sm:text-[40px]
                  "
                >
                  {formatProductCount(products.length)}+
                </span>

                <span className="h-9 w-px bg-black/20" />

                <span
                  className="
                    text-[9px]
                    font-medium
                    uppercase
                    leading-[1.15]
                    tracking-[0.06em]
                    text-black
                    sm:text-[10px]
                  "
                >
                  Products
                  <br />
                  in stock
                </span>
              </div>
            </div>
          </div>

          {/* =====================================================
              DESKTOP TRUST BAR
          ====================================================== */}

          <div
            className="
              relative
              z-30
              grid
              grid-cols-4
              border-t
              border-black/[0.07]
              bg-white
            "
          >
            {trustItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`
                    flex
                    min-h-[76px]
                    items-center
                    justify-center
                    gap-3
                    px-6
                    py-3
                    text-center
                    xl:px-8
                    ${
                      index !== trustItems.length - 1
                        ? "border-r border-black/[0.07]"
                        : ""
                    }
                  `}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                    <Icon
                      size={21}
                      strokeWidth={1.45}
                      className="text-black/70"
                    />
                  </div>

                  <div className="min-w-0 text-left">
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.02em]
                        text-black
                        sm:text-[11px]
                      "
                    >
                      {item.title}
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[9px]
                        leading-4
                        text-black/40
                        sm:text-[10px]
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

{/* =====================================================
    MOBILE HERO
====================================================== */}

<div
  className="
    relative
    overflow-hidden

    bg-[#f8f7f4]
    lg:hidden
  "
>
  {/* =================================================
      HERO CONTAINER

      Height belongs ONLY to this container.
      Image is absolute and cannot affect height.
  ================================================== */}

<div
  className="
    relative
    h-[clamp(480px,30svh,844px)]
    overflow-hidden
    sm:h-[clamp(540px,70svh,660px)]
  "
>

    {/* =================================================
        MOBILE BACKGROUND IMAGE
    ================================================== */}

    <div className="absolute inset-0 overflow-hidden">

      <Image
        src={product.image}
        alt={product.name}
        fill
        priority
        sizes="100vw"
        className="
          object-cover
          object-center
          scale-[1.02]
        "
      />

      {/* ===============================================
          IMAGE READABILITY OVERLAY
      ================================================ */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[#f8f7f4]/10
        "
      />

      {/* Top soft fade */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[48%]
          bg-gradient-to-b
          from-[#f8f7f4]/90
          via-[#f8f7f4]/65
          to-transparent
          blur-[8px]
        "
      />

      {/* Left text readability */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          w-[72%]
          bg-gradient-to-r
          from-[#f8f7f4]/85
          via-[#f8f7f4]/50
          to-transparent
          blur-[12px]
        "
      />

      {/* Bottom fade */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[28%]
          bg-gradient-to-t
          from-[#f8f7f4]/65
          via-[#f8f7f4]/25
          to-transparent
          blur-[8px]
        "
      />
    </div>


    {/* =================================================
        MOBILE CONTENT
    ================================================== */}

    <div
      className="
        relative
        z-20
        flex
        h-full
        flex-col
        px-6
        pb-8
        pt-9
        sm:px-8
        sm:pt-11
      "
    >

      {/* Collection */}

      <div className="flex items-center gap-3">
        <span className="h-px w-7 bg-black/25" />

        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-black/45
          "
        >
          Sellexa Collection
        </p>
      </div>


      {/* Heading */}

      <h1
        className="
          mt-5
          max-w-[320px]
          text-[clamp(3.1rem,12.5vw,4.5rem)]
          font-medium
          leading-[0.88]
          tracking-[-0.065em]
          text-black
        "
      >
        Smart Electricals
        <br />
        for a Smarter
        <br />
        Home
      </h1>


      {/* Description */}

      <p
        className="
          mt-5
          max-w-[315px]
          text-[13px]
          leading-[1.55]
          text-black/50
          sm:text-[14px]
        "
      >
        Discover innovative and reliable electricals designed
        to make your everyday life easier.
      </p>


      {/* CTA */}

      <Link
        href={`/search?category=${encodeURIComponent(
          product.category,
        )}`}
        className="
          group
          mt-6
          flex
          h-12
          w-[142px]
          shrink-0
          items-center
          justify-center
          gap-3
          rounded-full
          bg-black
          px-6
          text-[10px]
          font-medium
          uppercase
          tracking-[0.08em]
          whitespace-nowrap
          text-white
          transition-all
          duration-300
          active:scale-[0.97]
        "
      >
        <span>Shop Now</span>

        <ArrowRight
          size={15}
          strokeWidth={1.7}
          className="
            shrink-0
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </Link>


      {/* =================================================
          STOCK
      ================================================== */}

      <div className="mt-6 flex items-center gap-3">
        <span
          className="
            text-[34px]
            font-semibold
            leading-none
            tracking-[-0.07em]
            text-black
          "
        >
          {formatProductCount(products.length)}+
        </span>

        <span className="h-8 w-px bg-black/20" />

        <span
          className="
            text-[9px]
            font-medium
            uppercase
            leading-[1.15]
            tracking-[0.06em]
            text-black
          "
        >
          Products
          <br />
          in stock
        </span>
      </div>

    </div>
  </div>


  {/* =====================================================
      MOBILE TRUST BAR
  ====================================================== */}

  <div
    className="
      relative
      z-30
      grid
      grid-cols-2
      overflow-hidden
      rounded-t-[28px]
      border-t
      border-black/[0.07]
      bg-white
    "
  >
    {trustItems.map((item, index) => {
      const Icon = item.icon;

      return (
        <div
          key={item.title}
          className={`
            flex
            min-h-[110px]
            flex-col
            items-center
            justify-center
            px-3
            py-4
            text-center

            ${
              index % 2 === 0
                ? "border-r border-black/[0.07]"
                : ""
            }

            ${
              index < 2
                ? "border-b border-black/[0.07]"
                : ""
            }
          `}
        >
          <div
            className="
              mb-2
              flex
              h-8
              w-8
              items-center
              justify-center
            "
          >
            <Icon
              size={21}
              strokeWidth={1.4}
              className="text-black"
            />
          </div>

          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.02em]
              text-black
            "
          >
            {item.title}
          </p>

          <p
            className="
              mt-1
              max-w-[145px]
              text-[8px]
              leading-4
              text-black/40
            "
          >
            {item.description}
          </p>
        </div>
      );
    })}
  </div>
</div>
      </div>
    </section>
  );
}