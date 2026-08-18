"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

interface EmptyCartProps {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}

export default function EmptyCart({
  title = "Your cart is empty",
  description = "Looks like you haven't added anything to your cart yet.",
  buttonText = "Start Shopping",
  href = "/",
}: EmptyCartProps) {
  return (
    <section className="flex min-h-[360px] w-full items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-10 sm:min-h-[440px] sm:rounded-3xl sm:px-8">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="flex size-16 items-center justify-center rounded-full bg-zinc-100 sm:size-20">
          <ShoppingBag
            size={28}
            strokeWidth={1.5}
            className="text-zinc-500 sm:size-8"
          />
        </div>

        {/* Content */}
        <h2 className="mt-5 text-xl font-black tracking-[-0.03em] text-zinc-950 sm:mt-6 sm:text-2xl">
          {title}
        </h2>

        <p className="mt-2 max-w-xs text-xs leading-5 text-zinc-500 sm:max-w-sm sm:text-sm sm:leading-6">
          {description}
        </p>

        {/* CTA */}
        <Link
          href={href}
          className="group mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 text-xs font-bold text-white transition hover:bg-zinc-800 active:scale-[0.98] sm:h-12 sm:rounded-2xl sm:px-6 sm:text-sm"
        >
          {buttonText}

          <ArrowRight
            size={15}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>

        {/* Supporting text */}
        <p className="mt-4 text-[10px] text-zinc-400 sm:text-xs">
          Discover products you'll love.
        </p>
      </div>
    </section>
  );
}