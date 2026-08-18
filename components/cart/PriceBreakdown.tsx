"use client";

interface PriceBreakdownProps {
  subtotal: number;
  discount?: number;
  deliveryFee?: number;
  tax?: number;
  total: number;
  couponCode?: string;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function PriceBreakdown({
  subtotal,
  discount = 0,
  deliveryFee = 0,
  tax = 0,
  total,
  couponCode,
}: PriceBreakdownProps) {
  return (
    <div className="w-full">
      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-zinc-500 sm:text-sm">
            Subtotal
          </span>

          <span className="text-xs font-semibold text-zinc-900 sm:text-sm">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="text-xs text-zinc-500 sm:text-sm">
                Discount
              </span>

              {couponCode && (
                <span className="max-w-[100px] truncate rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 sm:max-w-[140px] sm:text-[10px]">
                  {couponCode}
                </span>
              )}
            </div>

            <span className="shrink-0 text-xs font-semibold text-emerald-600 sm:text-sm">
              -{formatCurrency(discount)}
            </span>
          </div>
        )}

        {/* Delivery */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-zinc-500 sm:text-sm">
            Delivery
          </span>

          {deliveryFee === 0 ? (
            <span className="text-xs font-semibold text-emerald-600 sm:text-sm">
              FREE
            </span>
          ) : (
            <span className="text-xs font-semibold text-zinc-900 sm:text-sm">
              {formatCurrency(deliveryFee)}
            </span>
          )}
        </div>

        {/* Tax */}
        {tax > 0 && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-zinc-500 sm:text-sm">
              Tax
            </span>

            <span className="text-xs font-semibold text-zinc-900 sm:text-sm">
              {formatCurrency(tax)}
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-dashed border-zinc-200" />

      {/* Total */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-zinc-950 sm:text-base">
            Total
          </p>

          <p className="mt-0.5 text-[9px] text-zinc-400 sm:text-[10px]">
            Inclusive of applicable taxes
          </p>
        </div>

        <span className="text-lg font-black tracking-tight text-zinc-950 sm:text-xl">
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  );
}