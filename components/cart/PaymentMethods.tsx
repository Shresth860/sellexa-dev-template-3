"use client";

import { useState } from "react";
import {
  CreditCard,
  Wallet,
  Smartphone,
  Banknote,
  Check,
} from "lucide-react";

export type PaymentMethod =
  | "upi"
  | "card"
  | "wallet"
  | "cod";

interface PaymentMethodsProps {
  selectedMethod?: PaymentMethod;
  onMethodChange?: (method: PaymentMethod) => void;
  codAvailable?: boolean;
}

const paymentOptions: {
  id: PaymentMethod;
  title: string;
  description: string;
  icon: typeof CreditCard;
}[] = [
  {
    id: "upi",
    title: "UPI",
    description: "Google Pay, PhonePe, Paytm",
    icon: Smartphone,
  },
  {
    id: "card",
    title: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay",
    icon: CreditCard,
  },
  {
    id: "wallet",
    title: "Wallet",
    description: "Use your Sellexa wallet balance",
    icon: Wallet,
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Banknote,
  },
];

export default function PaymentMethods({
  selectedMethod = "upi",
  onMethodChange,
  codAvailable = true,
}: PaymentMethodsProps) {
  const [internalMethod, setInternalMethod] =
    useState<PaymentMethod>(selectedMethod);

  const activeMethod = onMethodChange
    ? selectedMethod
    : internalMethod;

  const handleSelect = (method: PaymentMethod) => {
    setInternalMethod(method);
    onMethodChange?.(method);
  };

  const visibleOptions = paymentOptions.filter(
    (option) => option.id !== "cod" || codAvailable
  );

  return (
    <section className="w-full rounded-2xl border border-zinc-200 bg-white p-4 sm:rounded-3xl sm:p-5">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-[15px] font-bold tracking-[-0.02em] text-zinc-950 sm:text-base">
          Payment Method
        </h2>

        <p className="mt-1 text-[11px] leading-4 text-zinc-500 sm:text-xs">
          Choose how you would like to pay for your order.
        </p>
      </div>

      {/* Methods */}
      <div className="space-y-2.5">
        {visibleOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = activeMethod === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              aria-pressed={isSelected}
              className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 sm:rounded-2xl sm:p-3.5 ${
                isSelected
                  ? "border-zinc-900 bg-zinc-50"
                  : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50"
              }`}
            >
              {/* Icon */}
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${
                  isSelected
                    ? "bg-zinc-900 text-white"
                    : "bg-zinc-100 text-zinc-600"
                }`}
              >
                <Icon
                  size={17}
                  strokeWidth={1.8}
                />
              </span>

              {/* Content */}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold text-zinc-900 sm:text-sm">
                  {option.title}
                </span>

                <span className="mt-0.5 block truncate text-[10px] leading-4 text-zinc-500 sm:text-xs">
                  {option.description}
                </span>
              </span>

              {/* Selected */}
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                  isSelected
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-300 bg-white"
                }`}
              >
                {isSelected && (
                  <Check
                    size={12}
                    strokeWidth={2.5}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Security note */}
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2.5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-zinc-600 shadow-sm">
          <Check size={12} strokeWidth={2.2} />
        </span>

        <p className="text-[10px] leading-4 text-zinc-500 sm:text-[11px]">
          Your payment information is securely processed.
        </p>
      </div>
    </section>
  );
}