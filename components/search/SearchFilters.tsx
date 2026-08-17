"use client";

import {
  Check,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { brands, categories } from "@/data/products";

const ratings = [
  { label: "4★ & above", value: "4" },
  { label: "3★ & above", value: "3" },
  { label: "2★ & above", value: "2" },
];

const priceRanges = [
  { label: "Under ₹1,000", value: "0-1000" },
  { label: "₹1,000 – ₹5,000", value: "1000-5000" },
  { label: "₹5,000 – ₹15,000", value: "5000-15000" },
  { label: "₹15,000 – ₹50,000", value: "15000-50000" },
  { label: "Above ₹50,000", value: "50000-9999999" },
];

type FilterSectionProps = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
};

function FilterSection({
  title,
  children,
  open,
  onToggle,
}: FilterSectionProps) {
  return (
    <div className="border-b border-black/[0.07] py-4 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-black">
          {title}
        </span>

        <ChevronDown
          size={15}
          strokeWidth={1.7}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="mt-3 space-y-1.5">
          {children}
        </div>
      )}
    </div>
  );
}

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [openSections, setOpenSections] = useState({
    category: true,
    brand: true,
    price: true,
    rating: true,
  });

  const [filterHeight, setFilterHeight] = useState(0);

  const filterRef = useRef<HTMLDivElement>(null);

  const selectedCategory = searchParams.get("category") ?? "";
  const selectedBrand = searchParams.get("brand") ?? "";
  const selectedPrice = searchParams.get("price") ?? "";
  const selectedRating = searchParams.get("rating") ?? "";

  const hasFilters =
    Boolean(selectedCategory) ||
    Boolean(selectedBrand) ||
    Boolean(selectedPrice) ||
    Boolean(selectedRating);

  /*
   * Measure the actual filter height.
   *
   * We need this because the stopping position is:
   *
   * viewport bottom
   * - filter height
   * - 20px bottom gap
   */
useEffect(() => {
  const element = filterRef.current;

  if (!element) {
    return;
  }

  const updateHeight = () => {
    setFilterHeight(element.offsetHeight);
  };

  updateHeight();

  const observer = new ResizeObserver(() => {
    updateHeight();
  });

  observer.observe(element);

  window.addEventListener("resize", updateHeight);

  return () => {
    observer.disconnect();
    window.removeEventListener("resize", updateHeight);
  };
}, []);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(
      params.toString()
        ? `/search?${params.toString()}`
        : "/search"
    );
  };

  const clearFilters = () => {
    const params = new URLSearchParams();

    const query = searchParams.get("q");

    if (query) {
      params.set("q", query);
    }

    router.push(
      params.toString()
        ? `/search?${params.toString()}`
        : "/search"
    );
  };

  const toggleSection = (
    section: keyof typeof openSections
  ) => {
    setOpenSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  };

  const filterContent = (
    <div>
      {/* Category */}
      <FilterSection
        title="Category"
        open={openSections.category}
        onToggle={() => toggleSection("category")}
      >
        {categories
          .filter((category) => category !== "All")
          .map((category) => {
            const selected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  updateFilter(
                    "category",
                    selected ? "" : category
                  )
                }
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-black/[0.035]"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                    selected
                      ? "border-black bg-black text-white"
                      : "border-black/20 bg-white"
                  }`}
                >
                  {selected && (
                    <Check
                      size={10}
                      strokeWidth={2.5}
                    />
                  )}
                </span>

                <span className="text-xs text-black/65">
                  {category}
                </span>
              </button>
            );
          })}
      </FilterSection>

      {/* Brand */}
      <FilterSection
        title="Brand"
        open={openSections.brand}
        onToggle={() => toggleSection("brand")}
      >
        {brands
          .filter((brand) => brand !== "All")
          .map((brand) => {
            const selected = selectedBrand === brand;

            return (
              <button
                key={brand}
                type="button"
                onClick={() =>
                  updateFilter(
                    "brand",
                    selected ? "" : brand
                  )
                }
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-black/[0.035]"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                    selected
                      ? "border-black bg-black text-white"
                      : "border-black/20 bg-white"
                  }`}
                >
                  {selected && (
                    <Check
                      size={10}
                      strokeWidth={2.5}
                    />
                  )}
                </span>

                <span className="text-xs text-black/65">
                  {brand}
                </span>
              </button>
            );
          })}
      </FilterSection>

      {/* Price */}
      <FilterSection
        title="Price"
        open={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        {priceRanges.map((range) => {
          const selected = selectedPrice === range.value;

          return (
            <button
              key={range.value}
              type="button"
              onClick={() =>
                updateFilter(
                  "price",
                  selected ? "" : range.value
                )
              }
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-black/[0.035]"
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                  selected
                    ? "border-black bg-black text-white"
                    : "border-black/20 bg-white"
                }`}
              >
                {selected && (
                  <Check
                    size={10}
                    strokeWidth={2.5}
                  />
                )}
              </span>

              <span className="text-xs text-black/65">
                {range.label}
              </span>
            </button>
          );
        })}
      </FilterSection>

      {/* Rating */}
      <FilterSection
        title="Rating"
        open={openSections.rating}
        onToggle={() => toggleSection("rating")}
      >
        {ratings.map((rating) => {
          const selected = selectedRating === rating.value;

          return (
            <button
              key={rating.value}
              type="button"
              onClick={() =>
                updateFilter(
                  "rating",
                  selected ? "" : rating.value
                )
              }
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-black/[0.035]"
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                  selected
                    ? "border-black bg-black text-white"
                    : "border-black/20 bg-white"
                }`}
              >
                {selected && (
                  <Check
                    size={10}
                    strokeWidth={2.5}
                  />
                )}
              </span>

              <span className="text-xs text-black/65">
                {rating.label}
              </span>
            </button>
          );
        })}
      </FilterSection>
    </div>
  );

  /*
   * This is the actual stopping position.
   *
   * Example:
   *
   * viewport = 900px
   * filter   = 500px
   * gap      = 20px
   *
   * sticky top = 900 - 500 - 20
   *            = 380px
   *
   * Therefore the filter's bottom is exactly:
   *
   * 380 + 500 = 880px
   *
   * leaving 20px at the bottom.
   *
   * BEFORE reaching this position:
   *     normal page scrolling
   *
   * AFTER reaching this position:
   *     sticky
   */
  const stickyTop =
    filterHeight > 0
      ? `calc(100vh - ${filterHeight}px - 20px)`
      : "calc(100vh - 20px)";

  return (
    <>
      {/* Desktop */}
      <aside className="hidden h-full w-full lg:block">
        <div
          ref={filterRef}
          className="sticky self-start"
          style={{
            top: stickyTop,
          }}
        >
          <div className="rounded-2xl border border-black/[0.07] bg-[#fafaf9]">
            {/* Header */}
            <div className="flex h-14 items-center justify-between border-b border-black/[0.07] px-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  size={15}
                  strokeWidth={1.7}
                />

                <h2 className="text-sm font-semibold">
                  Filters
                </h2>
              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[10px] font-medium text-black/45 transition hover:text-black"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Content */}
            <div className="px-4">
              {filterContent}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-black/[0.08] bg-white text-xs font-medium text-black transition active:scale-[0.98]"
        >
          <SlidersHorizontal
            size={15}
            strokeWidth={1.7}
          />

          Filters

          {hasFilters && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[9px] text-white">
              {
                [
                  selectedCategory,
                  selectedBrand,
                  selectedPrice,
                  selectedRating,
                ].filter(Boolean).length
              }
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[88vh] rounded-t-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-14 items-center justify-between border-b border-black/[0.07] px-5">
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  size={16}
                  strokeWidth={1.7}
                />

                <h2 className="text-sm font-semibold">
                  Filters
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close filters"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.05]"
              >
                <X
                  size={16}
                  strokeWidth={1.7}
                />
              </button>
            </div>

            <div className="max-h-[calc(88vh-7rem)] overflow-y-auto px-5">
              {filterContent}
            </div>

            <div className="flex gap-2 border-t border-black/[0.07] bg-white px-5 py-3">
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="h-10 flex-1 rounded-xl border border-black/10 text-xs font-medium"
                >
                  Clear all
                </button>
              )}

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="h-10 flex-1 rounded-xl bg-black text-xs font-medium text-white"
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}