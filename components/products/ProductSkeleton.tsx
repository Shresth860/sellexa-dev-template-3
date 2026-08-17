export default function ProductSkeleton() {
  return (
    <article
      className="min-w-0 animate-pulse"
      aria-hidden="true"
    >
      {/* Product image */}
      <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-black/[0.06] sm:rounded-2xl">
        <div className="h-full w-full bg-black/[0.025]" />
      </div>

      {/* Product information */}
      <div className="px-0.5 pt-2.5 sm:pt-3">
        {/* Category */}
        <div className="h-2 w-14 rounded-full bg-black/[0.07] sm:h-2.5 sm:w-16" />

        {/* Product name */}
        <div className="mt-2 space-y-1.5">
          <div className="h-3.5 w-[85%] rounded-full bg-black/[0.07]" />
          <div className="h-3.5 w-[60%] rounded-full bg-black/[0.07]" />
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="h-3 w-10 rounded-full bg-black/[0.07]" />
          <div className="h-2.5 w-7 rounded-full bg-black/[0.05]" />
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <div className="h-4 w-16 rounded-full bg-black/[0.09]" />
          <div className="h-3 w-12 rounded-full bg-black/[0.05]" />
        </div>

        {/* Mobile button */}
        <div className="mt-2 h-8 w-full rounded-lg bg-black/[0.07] sm:hidden" />
      </div>
    </article>
  );
}