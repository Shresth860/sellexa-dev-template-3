"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
}: QuantitySelectorProps) {
  const decrease = () => {
    if (disabled || quantity <= min) return;
    onChange(quantity - 1);
  };

  const increase = () => {
    if (disabled || quantity >= max) return;
    onChange(quantity + 1);
  };

  return (
    <div
      className={[
        "inline-flex h-8 items-center rounded-full border border-zinc-200 bg-white",
        "sm:h-9",
        disabled ? "pointer-events-none opacity-50" : "",
      ].join(" ")}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={decrease}
        disabled={disabled || quantity <= min}
        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-35 sm:h-9 sm:w-9"
      >
        <Minus size={13} strokeWidth={2} />
      </button>

      <span
        aria-live="polite"
        className="flex min-w-[24px] items-center justify-center px-0.5 text-xs font-bold tabular-nums text-zinc-900 sm:min-w-[28px] sm:text-sm"
      >
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={increase}
        disabled={disabled || quantity >= max}
        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-35 sm:h-9 sm:w-9"
      >
        <Plus size={13} strokeWidth={2} />
      </button>
    </div>
  );
}