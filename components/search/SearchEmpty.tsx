"use client";

import Link from "next/link";
import { ArrowRight, Search, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

type SearchEmptyProps = {
  query?: string;
  category?: string;
  brand?: string;
};

export default function SearchEmpty({
  query = "",
  category = "",
  brand = "",
}: SearchEmptyProps) {
  const router = useRouter();

  const hasFilters = Boolean(category || brand);

  const clearSearch = () => {
    router.push("/search");
  };

  return (
    <div className="flex min-h-[360px] w-full items-center justify-center px-4 py-12 sm:min-h-[420px]">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f3] text-black sm:h-20 sm:w-20">
          <Search
            size={26}
            strokeWidth={1.5}
            className="sm:h-7 sm:w-7"
          />
        </div>

        {/* Heading */}
        <h2 className="mt-5 text-xl font-semibold tracking-[-0.035em] text-black sm:text-2xl">
          No products found
        </h2>

        {/* Description */}
        <p className="mt-2 max-w-sm text-xs leading-5 text-black/45 sm:text-sm sm:leading-6">
          {query ? (
            <>
              We couldn&apos;t find anything matching{" "}
              <span className="font-medium text-black/65">
                &quot;{query}&quot;
              </span>
              .
            </>
          ) : hasFilters ? (
            "No products match your selected filters."
          ) : (
            "Try searching for another product or explore our collection."
          )}
        </p>

        {/* Suggestions */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <Link
            href="/search"
            className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-black px-5 text-xs font-medium text-white transition hover:bg-black/85 active:scale-[0.98]"
          >
            Browse all products

            <ArrowRight
              size={14}
              strokeWidth={1.7}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          {(query || hasFilters) && (
            <button
              type="button"
              onClick={clearSearch}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-black/10 px-5 text-xs font-medium text-black transition hover:border-black/20 hover:bg-black/[0.025] active:scale-[0.98]"
            >
              <RotateCcw
                size={13}
                strokeWidth={1.7}
              />

              Clear search
            </button>
          )}
        </div>
      </div>
    </div>
  );
}