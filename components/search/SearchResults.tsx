"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/products/ProductGrid";
import SearchEmpty from "@/components/search/SearchEmpty";
import { products } from "@/data/products";

export default function SearchResults() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const category = searchParams.get("category") ?? "";
  const brand = searchParams.get("brand") ?? "";
  const price = searchParams.get("price") ?? "";
  const rating = Number(searchParams.get("rating") ?? 0);
  const sort = searchParams.get("sort") ?? "recommended";

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /* Search */
    if (query) {
      result = result.filter((product) => {
        const searchableText = [
          product.name,
          product.brand,
          product.category,
          product.description,
          ...product.tags,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    /* Category */
    if (category) {
      result = result.filter(
        (product) => product.category === category
      );
    }

    /* Brand */
    if (brand) {
      result = result.filter(
        (product) => product.brand === brand
      );
    }

    /* Price */
    if (price) {
      const [min, max] = price.split("-").map(Number);

      result = result.filter((product) => {
        if (Number.isNaN(min) || Number.isNaN(max)) {
          return true;
        }

        return product.price >= min && product.price <= max;
      });
    }

    /* Rating */
    if (rating > 0) {
      result = result.filter(
        (product) => product.rating >= rating
      );
    }

    /* Sorting */
    switch (sort) {
      case "newest":
        result.sort((a, b) => {
          if (a.newArrival === b.newArrival) {
            return b.id.localeCompare(a.id);
          }

          return a.newArrival ? -1 : 1;
        });
        break;

      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "best-selling":
        result.sort((a, b) => {
          if (a.bestSeller === b.bestSeller) {
            return b.reviewCount - a.reviewCount;
          }

          return a.bestSeller ? -1 : 1;
        });
        break;

      case "recommended":
      default:
        result.sort((a, b) => {
          const scoreA =
            (a.featured ? 3 : 0) +
            (a.bestSeller ? 2 : 0) +
            (a.newArrival ? 1 : 0) +
            a.rating;

          const scoreB =
            (b.featured ? 3 : 0) +
            (b.bestSeller ? 2 : 0) +
            (b.newArrival ? 1 : 0) +
            b.rating;

          return scoreB - scoreA;
        });
        break;
    }

    return result;
  }, [query, category, brand, price, rating, sort]);

  if (!filteredProducts.length) {
    return (
      <SearchEmpty
        query={query}
        category={category}
        brand={brand}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between sm:mb-5">
        <p className="text-xs text-black/45 sm:text-sm">
          Showing{" "}
          <span className="font-semibold text-black">
            {filteredProducts.length}
          </span>{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </p>
      </div>

      <ProductGrid
        products={filteredProducts}
        priorityCount={4}
      />
    </div>
  );
}