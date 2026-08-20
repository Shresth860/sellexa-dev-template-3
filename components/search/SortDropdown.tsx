"use client";

import { Check, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const sortOptions = [
  {
    label: "Recommended",
    value: "recommended",
  },
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Price: Low to High",
    value: "price-low",
  },
  {
    label: "Price: High to Low",
    value: "price-high",
  },
  {
    label: "Top Rated",
    value: "rating",
  },
  {
    label: "Best Selling",
    value: "best-selling",
  },
];

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedValue =
    searchParams.get("sort") ?? "recommended";

  const selectedOption =
    sortOptions.find((option) => option.value === selectedValue) ??
    sortOptions[0];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "recommended") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.push(
      params.toString()
        ? `/search?${params.toString()}`
        : "/search"
    );

    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative w-full sm:w-auto"
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 w-full items-center justify-between gap-4 rounded-xl border border-black/[0.08] bg-white px-3.5 text-sm font-medium text-black transition hover:border-black/15 active:scale-[0.99] sm:min-w-[190px] sm:gap-6"
      >
        <span className="text-black/45">
          Sort by
        </span>

        <span className="flex items-center gap-2">
          <span className="text-black">
            {selectedOption.label}
          </span>

          <ChevronDown
            size={14}
            strokeWidth={1.7}
            className={`transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Sort products"
          className="absolute right-0 top-[calc(100%+6px)] z-50 w-full min-w-[220px] overflow-hidden rounded-xl border border-black/[0.08] bg-white p-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.1)]"
        >
          {sortOptions.map((option) => {
            const selected = selectedValue === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => handleSortChange(option.value)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  selected
                    ? "bg-black text-white"
                    : "text-black/65 hover:bg-black/[0.04] hover:text-black"
                }`}
              >
                <span>{option.label}</span>

                {selected && (
                  <Check
                    size={14}
                    strokeWidth={2}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}