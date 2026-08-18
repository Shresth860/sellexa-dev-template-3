"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
};

export default function SearchBar({
  placeholder = "Search products, brands and categories...",
  className = "",
  autoFocus = false,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = query.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    router.push(
      params.toString()
        ? `/search?${params.toString()}`
        : "/search"
    );
  };

  const handleClear = () => {
    setQuery("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");

    const queryString = params.toString();

    router.push(
      queryString
        ? `/search?${queryString}`
        : "/search"
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`w-full ${className}`}
    >
      <div className="group flex h-11 w-full items-center rounded-xl border border-black/[0.08] bg-[#fafaf9] transition-all duration-200 focus-within:border-black/20 focus-within:bg-white focus-within:shadow-[0_4px_18px_rgba(0,0,0,0.04)] sm:h-12 sm:rounded-2xl">
        {/* Search icon */}
        <button
          type="submit"
          aria-label="Search"
          className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center text-black/45 transition hover:text-black sm:ml-3.5"
        >
          <Search
            size={18}
            strokeWidth={1.7}
          />
        </button>

        {/* Search input */}
        <input
          type="text"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label="Search products"
          className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-sm text-black outline-none placeholder:text-black/35 sm:text-[15px]"
        />

        {/* Custom clear button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-black/40 transition hover:bg-black/[0.05] hover:text-black"
          >
            <X
              size={16}
              strokeWidth={1.7}
            />
          </button>
        )}

        {/* Search button */}
        <button
          type="submit"
          className="mr-1.5 hidden h-8 shrink-0 items-center justify-center rounded-lg bg-black px-4 text-xs font-medium text-white transition hover:bg-black/85 active:scale-[0.98] sm:flex"
        >
          Search
        </button>
      </div>
    </form>
  );
}