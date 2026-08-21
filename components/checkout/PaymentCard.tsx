"use client";

import {
  Check,
  ChevronRight,
  CreditCard,
  Lock,
  Smartphone,
  Wallet,
} from "lucide-react";

type PaymentMethod = "upi" | "card" | "wallet" | "cod";

type Address = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
};

type PaymentCardProps = {
  subtotal: number;
  delivery?: number;
  tax?: number;
  discount?: number;

  selectedAddress: Address | null;

  paymentMethod?: PaymentMethod;

  onPaymentMethodChange?: (
    method: PaymentMethod
  ) => void;

  onPlaceOrder?: () => void;
};

const paymentMethods = [
  {
    id: "upi" as const,
    label: "UPI",
    description: "Google Pay, PhonePe, Paytm",
    icon: Smartphone,
  },
  {
    id: "card" as const,
    label: "Card",
    description: "Credit or debit card",
    icon: CreditCard,
  },
  {
    id: "wallet" as const,
    label: "Wallet",
    description: "Available wallets",
    icon: Wallet,
  },
  {
    id: "cod" as const,
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Wallet,
  },
];

export default function PaymentCard({
  subtotal,
  delivery = 0,
  tax = 0,
  discount = 0,
  selectedAddress,
  paymentMethod = "upi",
  onPaymentMethodChange,
  onPlaceOrder,
}: PaymentCardProps) {
  /*
   * Never allow the discount to exceed subtotal.
   */
  const safeDiscount = Math.min(
    Math.max(discount, 0),
    subtotal
  );

  const total = Math.max(
    0,
    subtotal + delivery + tax - safeDiscount
  );

  return (
    <aside className="w-full rounded-[24px] border border-zinc-200/80 bg-white p-4 shadow-[0_10px_35px_rgba(0,0,0,0.04)] sm:rounded-[28px] sm:p-5 lg:p-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Secure checkout
          </p>

          <h2 className="mt-1.5 text-lg font-bold tracking-tight text-zinc-950 sm:text-xl">
            Payment
          </h2>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-50 text-zinc-500">
          <Lock size={14} strokeWidth={1.7} />
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-5">
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          Payment method
        </p>

        <div className="space-y-2">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const selected =
              paymentMethod === method.id;

            return (
              <button
                key={method.id}
                type="button"
                onClick={() =>
                  onPaymentMethodChange?.(method.id)
                }
                className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200 ${
                  selected
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    selected
                      ? "bg-white/10 text-white"
                      : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  <Icon size={15} strokeWidth={1.7} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold">
                    {method.label}
                  </p>

                  <p
                    className={`mt-0.5 truncate text-[12px] ${
                      selected
                        ? "text-white/55"
                        : "text-zinc-400"
                    }`}
                  >
                    {method.description}
                  </p>
                </div>

                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    selected
                      ? "border-white bg-white text-zinc-950"
                      : "border-zinc-200"
                  }`}
                >
                  {selected && (
                    <Check size={11} strokeWidth={2.5} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="mt-5 border-t border-zinc-100 pt-5">
        <div className="space-y-3 text-[13px]">

          {/* Subtotal */}
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">
              Subtotal
            </span>

            <span className="font-semibold text-zinc-900">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Delivery */}
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">
              Delivery
            </span>

            {delivery === 0 ? (
              <span className="font-semibold text-emerald-600">
                FREE
              </span>
            ) : (
              <span className="font-semibold text-zinc-900">
                ₹{delivery.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Taxes */}
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">
              Taxes
            </span>

            <span className="font-semibold text-zinc-900">
              ₹{tax.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Coupon */}
          {safeDiscount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">
                Coupon discount
              </span>

              <span className="font-semibold text-emerald-600">
                - ₹{safeDiscount.toLocaleString("en-IN")}
              </span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="mt-4 flex items-end justify-between border-t border-zinc-100 pt-4">
          <div>
            <p className="text-sm font-bold text-zinc-950">
              Total
            </p>

            <p className="mt-0.5 text-[10px] text-zinc-400">
              Inclusive of applicable taxes
            </p>
          </div>

          <p className="text-xl font-black tracking-[-0.04em] text-zinc-950 sm:text-2xl">
            ₹{total.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Place Order */}
      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={!selectedAddress}
        className={`mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold transition active:scale-[0.99] ${
          selectedAddress
            ? "bg-zinc-950 text-white hover:bg-zinc-800"
            : "cursor-not-allowed bg-zinc-200 text-zinc-400"
        }`}
      >
        {selectedAddress
          ? "Place Order"
          : "Select Delivery Address"}

        <ChevronRight size={15} strokeWidth={1.8} />
      </button>

      {/* Security Note */}
      <div className="mt-3 flex items-center justify-center gap-1.5 text-center">
        <Lock
          size={10}
          strokeWidth={1.7}
          className="text-zinc-400"
        />

        <p className="text-[10px] text-zinc-400">
          Your payment information is encrypted and secure
        </p>
      </div>
    </aside>
  );
}