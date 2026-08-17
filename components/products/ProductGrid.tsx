"use client";

import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import type { Product } from "@/data/products";

type ProductGridProps = {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
  priorityCount?: number;
};

export default function ProductGrid({
  products,
  loading = false,
  skeletonCount = 10,
  priorityCount = 4,
}: ProductGridProps) {
  const gridClassName =
    "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-12 xl:grid-cols-6";

  if (loading) {
    return (
      <div
        className={gridClassName}
        aria-busy="true"
        aria-label="Loading products"
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductSkeleton key={`product-skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <div className={gridClassName}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}