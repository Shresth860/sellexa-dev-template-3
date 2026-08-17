"use client";

import { Search } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";

type SearchHeaderProps = {
  query?: string;
  resultCount?: number;
};

export default function SearchHeader({
  query = "",
  resultCount = 0,
}: SearchHeaderProps) {
  const hasQuery = query.trim().length > 0;

  return (
    <section className="w-full border-b border-black/[0.06] bg-white">
      <div className="mx-auto max-w-[1780px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-5">
          {/* Heading */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5f5f3] sm:h-10 sm:w-10">
              <Search
                size={17}
                strokeWidth={1.7}
              />
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35 sm:text-[10px]">
                Sellexa Search
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-[-0.045em] text-black sm:text-3xl lg:text-4xl">
                {hasQuery ? (
                  <>
                    Results for{" "}
                    <span className="text-black/45">
                      &quot;{query}&quot;
                    </span>
                  </>
                ) : (
                  "Find your next favorite"
                )}
              </h1>

              <p className="mt-1.5 text-xs text-black/45 sm:text-sm">
                {resultCount === 0
                  ? "Explore products, brands and categories."
                  : `${resultCount.toLocaleString()} ${
                      resultCount === 1 ? "product" : "products"
                    } found`}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}