"use client";

interface SkeletonBlockProps {
  className?: string;
}

function SkeletonBlock({ className = "" }: SkeletonBlockProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-zinc-200 ${className}`}
    />
  );
}

function CartItemSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white p-3.5 sm:rounded-3xl sm:p-5">
      <div className="flex gap-3 sm:gap-5">
        {/* Product image */}
        <SkeletonBlock className="size-20 shrink-0 rounded-xl sm:size-28 sm:rounded-2xl" />

        {/* Product information */}
        <div className="min-w-0 flex-1">
          <SkeletonBlock className="h-4 w-3/4 max-w-[220px]" />

          <SkeletonBlock className="mt-2 h-3 w-1/2 max-w-[150px]" />

          <SkeletonBlock className="mt-3 h-4 w-20" />

          <div className="mt-4 flex items-center justify-between gap-3">
            <SkeletonBlock className="h-8 w-24 rounded-lg" />
            <SkeletonBlock className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SummarySkeleton() {
  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white p-4 sm:rounded-3xl sm:p-5">
      <SkeletonBlock className="h-5 w-32" />

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between">
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="h-3 w-16" />
        </div>

        <div className="flex items-center justify-between">
          <SkeletonBlock className="h-3 w-28" />
          <SkeletonBlock className="h-3 w-20" />
        </div>

        <div className="flex items-center justify-between">
          <SkeletonBlock className="h-3 w-20" />
          <SkeletonBlock className="h-3 w-14" />
        </div>

        <div className="h-px w-full bg-zinc-100" />

        <div className="flex items-center justify-between">
          <SkeletonBlock className="h-5 w-20" />
          <SkeletonBlock className="h-5 w-24" />
        </div>

        <SkeletonBlock className="h-12 w-full rounded-xl sm:h-14 sm:rounded-2xl" />
      </div>
    </div>
  );
}

interface CartSkeletonProps {
  itemCount?: number;
}

export default function CartSkeleton({
  itemCount = 3,
}: CartSkeletonProps) {
  return (
    <section
      aria-label="Loading cart"
      className="mx-auto w-full max-w-[1720px] px-3 py-6 sm:px-6 sm:py-8 lg:px-8"
    >
      {/* Page heading */}
      <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
        <div>
          <SkeletonBlock className="h-8 w-32 sm:h-10 sm:w-40" />

          <SkeletonBlock className="mt-2 h-3 w-48 sm:w-64" />
        </div>

        <SkeletonBlock className="h-9 w-24 rounded-full sm:w-28" />
      </div>

      {/* Main content */}
      <div className="grid min-w-0 gap-5 lg:grid-cols-[1.6fr_1fr] lg:gap-6">
        {/* Cart items */}
        <div className="min-w-0 space-y-3 sm:space-y-4">
          {Array.from({
            length: Math.max(itemCount, 1),
          }).map((_, index) => (
            <CartItemSkeleton key={index} />
          ))}

          {/* Trust bar */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-3 sm:rounded-3xl sm:p-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-xl bg-zinc-50 p-2.5 sm:flex-col sm:justify-center sm:p-3"
                >
                  <SkeletonBlock className="size-8 shrink-0 rounded-lg sm:size-9" />

                  <div className="min-w-0 flex-1 sm:w-full">
                    <SkeletonBlock className="h-2.5 w-3/4 sm:mx-auto" />
                    <SkeletonBlock className="mt-1.5 h-2 w-full sm:mx-auto sm:w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="min-w-0 space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:rounded-3xl sm:p-5">
            <SkeletonBlock className="h-5 w-32" />

            <SkeletonBlock className="mt-4 h-11 w-full rounded-xl" />
          </div>

          <SummarySkeleton />

          <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:rounded-3xl sm:p-5">
            <SkeletonBlock className="h-5 w-28" />

            <SkeletonBlock className="mt-3 h-3 w-full" />
            <SkeletonBlock className="mt-2 h-3 w-4/5" />

            <SkeletonBlock className="mt-5 h-10 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}