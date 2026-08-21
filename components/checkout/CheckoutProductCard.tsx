"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

type CheckoutProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
};

type CheckoutProductCardProps = {
  item: CheckoutProduct;
  onIncrease?: (id: string) => void;
  onDecrease?: (id: string) => void;
  onRemove?: (id: string) => void;
};

export default function CheckoutProductCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CheckoutProductCardProps) {
  const total = item.price * item.quantity;

  return (
    <article className="group relative flex w-full gap-3 border-b border-zinc-100 py-4 last:border-b-0 sm:gap-4 sm:py-5">
      {/* Product Image */}
      <div className="relative h-[82px] w-[82px] shrink-0 overflow-hidden rounded-2xl bg-[#f4f4f1] sm:h-[100px] sm:w-[100px]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="100px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      {/* Product Details */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="mb-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-400 sm:text-[10px]">
          {item.category}
        </span>

        <h3 className="line-clamp-2 pr-5 text-[13px] font-semibold leading-[1.25rem] text-zinc-950 sm:text-[15px] sm:leading-5">
          {item.name}
        </h3>

        <p className="mt-1 text-[11px] text-zinc-400 sm:text-xs">
          ₹{item.price.toLocaleString("en-IN")} each
        </p>

        {/* Bottom Controls */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          {/* Quantity */}
          <div className="flex h-8 items-center rounded-full border border-zinc-200 bg-white px-1 sm:h-9">
            <button
              type="button"
              onClick={() => onDecrease?.(item.id)}
              disabled={item.quantity <= 1}
              aria-label={`Decrease ${item.name} quantity`}
              className="flex h-6 w-6 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-30 sm:h-7 sm:w-7"
            >
              <Minus size={12} strokeWidth={1.8} />
            </button>

            <span className="min-w-[22px] text-center text-[11px] font-semibold text-zinc-900 sm:text-xs">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => onIncrease?.(item.id)}
              aria-label={`Increase ${item.name} quantity`}
              className="flex h-6 w-6 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 sm:h-7 sm:w-7"
            >
              <Plus size={12} strokeWidth={1.8} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-[21px] font-bold tracking-tight text-zinc-950 sm:text-sm">
              ₹{total.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove?.(item.id)}
        aria-label={`Remove ${item.name}`}
        className="absolute right-0 top-4 flex h-10 w-10 items-center justify-center rounded-full text-zinc-300 transition hover:bg-red-100 hover:text-red-500 sm:top-5"
      >
        <Trash2 size={24} strokeWidth={2} />
      </button>
    </article>
  );
}