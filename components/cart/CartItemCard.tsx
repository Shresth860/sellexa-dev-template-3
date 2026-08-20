"use client";

import Image from "next/image";
import { Trash2, Check } from "lucide-react";

import QuantitySelector from "./QuantitySelector";

interface CartProduct {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  badge?: string;
}

interface CartItemCardProps {
  product: CartProduct;
  quantity: number;
  isSelected: boolean;
  onToggleSelect: () => void;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartItemCard({
  product,
  quantity,
  isSelected,
  onToggleSelect,
  onQuantityChange,
  onRemove,
}: CartItemCardProps) {
  const image =
    product.image ||
    "/images/placeholder-product.png";

  const subtotal = product.price * quantity;

  return (
    <article
      className={`w-full rounded-2xl border bg-white p-3 transition sm:rounded-3xl sm:p-4 ${
        isSelected
          ? "border-zinc-200 bg-white"
          : "border-zinc-100 opacity-60"
      }`}
    >
      <div className="flex min-w-0 gap-3 sm:gap-4">
        {/* Checkbox */}
        <button
          type="button"
          onClick={onToggleSelect}
          aria-label={
            isSelected ? "Deselect product" : "Select product"
          }
          className="mt-1 flex shrink-0 items-center justify-center"
        >
          <span
            className={`flex size-4 items-center justify-center rounded-[5px] border-2 transition sm:size-5 ${
              isSelected
                ? "border-zinc-900 bg-zinc-900"
                : "border-zinc-300 bg-white"
            }`}
          >
            {isSelected && (
              <Check
                size={isSelected ? 12 : 0}
                strokeWidth={3}
                className="text-white"
              />
            )}
          </span>
        </button>

        {/* Product Image */}
        <div className="relative size-[75px] shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:size-[100px] sm:rounded-2xl">
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 75px, 100px"
            className="object-cover"
          />

          {product.badge && (
            <span className="absolute left-1.5 top-1.5 max-w-[calc(100%-12px)] truncate rounded-full bg-white/90 px-2 py-0.5 text-[7px] font-bold text-zinc-800 backdrop-blur-sm sm:text-[8px]">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Info - Mobile */}
        <div className="min-w-0 flex-1 sm:hidden">
          {product.category && (
            <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              {product.category}
            </p>
          )}

          <h3 className="mt-0.5 line-clamp-2 text-[14px] font-bold leading-snug text-zinc-900">
            {product.name}
          </h3>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-bold text-zinc-950">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>

            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove product"
              className="flex size-6 items-center justify-center rounded-full text-zinc-400 transition hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={14} strokeWidth={1.8} />
            </button>
          </div>

          <div className="mt-2">
            <QuantitySelector
              quantity={quantity}
              onChange={onQuantityChange}
            />
          </div>
        </div>

        {/* Product Info - Desktop */}
        <div className="hidden min-w-0 flex-1 sm:block">
          {product.category && (
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
              {product.category}
            </p>
          )}

          <h3 className="mt-0.5 line-clamp-2 text-[15px] font-bold leading-snug text-zinc-900">
            {product.name}
          </h3>

          <p className="mt-2 text-[14px] font-semibold text-zinc-700">
            ₹{product.price.toLocaleString("en-IN")} × {quantity}
          </p>
        </div>

        {/* Desktop Right - Quantity & Total */}
        <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
          <span className="text-[16px] font-bold text-zinc-950">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>

          <QuantitySelector
            quantity={quantity}
            onChange={onQuantityChange}
          />

          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove product"
            className="flex size-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </article>
  );
}