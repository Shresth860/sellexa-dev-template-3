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

function WishlistItemSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white p-3.5 sm:rounded-3xl sm:p-5">
      <div className="flex gap-3 sm:gap-5">
        <SkeletonBlock className="size-20 shrink-0 rounded-xl sm:size-28 sm:rounded-2xl" />

        <div className="min-w-0 flex-1">
          <SkeletonBlock className="h-4 w-3/4 max-w-[220px]" />

          <SkeletonBlock className="mt-2 h-3 w-1/2 max-w-[150px]" />

          <SkeletonBlock className="mt-3 h-4 w-20" />

          <div className="mt-4 flex items-center justify-between gap-3">
            <SkeletonBlock className="h-8 w-28 rounded-lg" />
            <SkeletonBlock className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface WishlistSkeletonProps {
  itemCount?: number;
}

export default function WishlistSkeleton({
  itemCount = 3,
}: WishlistSkeletonProps) {
  return (
    <section
      aria-label="Loading wishlist"
      className="mx-auto w-full max-w-[1720px] px-3 py-6 sm:px-6 sm:py-8 lg:px-8"
    >
      {/* Page heading */}
      <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
        <div>
          <SkeletonBlock className="h-8 w-36 sm:h-10 sm:w-48" />

          <SkeletonBlock className="mt-2 h-3 w-48 sm:w-64" />
        </div>

        <SkeletonBlock className="h-9 w-24 rounded-full sm:w-28" />
      </div>

      {/* Items */}
      <div className="space-y-3 sm:space-y-4">
        {Array.from({
          length: Math.max(itemCount, 1),
        }).map((_, index) => (
          <WishlistItemSkeleton key={index} />
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
    </section>
  );
}
