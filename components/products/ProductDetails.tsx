"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/data/products";
import ProductGallery from "@/components/products/ProductGallery";
import VariantSelector from "@/components/products/VariantSelector";
import ProductActions from "@/components/products/ProductActions";
import DeliveryInfo from "@/components/products/DeliveryInfo";
import ProductSpecifications from "@/components/products/ProductSpecifications";
import ProductReviews from "@/components/products/ProductReviews";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.storage?.[0]
  );

  const emiPerMonth = Math.round(product.price / 20);

  return (
    <div className="mx-auto max-w-[1780px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex items-center gap-1.5 text-[11px] text-black/45 sm:mb-6"
      >
        <Link href="/" className="transition hover:text-black">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/search?category=${encodeURIComponent(product.category)}`}
          className="transition hover:text-black"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-black/70">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery
          images={product.images.length ? product.images : [product.image]}
          name={product.name}
          badge={product.badge}
        />

        <div>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
            {product.category}
          </p>

          <h1 className="text-2xl font-semibold tracking-[-0.03em] text-black sm:text-[28px]">
            {product.name}
          </h1>

          <p className="mt-2 max-w-md text-[13px] leading-5 text-black/55">
            {product.description}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-md bg-black px-2 py-1 text-[11px] font-semibold text-white">
              <Star size={11} fill="currentColor" strokeWidth={0} />
              {product.rating.toFixed(1)}
            </span>

            <span className="text-[12px] text-black/50">
              ({product.reviewCount} ratings)
            </span>

            <a
              href="#reviews"
              className="text-[12px] font-medium text-black/60 underline-offset-2 hover:underline"
            >
              See all reviews
            </a>
          </div>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-[26px] font-semibold text-black">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            {product.originalPrice && (
              <span className="text-sm text-black/35 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}

            {product.discount && (
              <span className="text-sm font-semibold text-green-700">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <p className="mt-1 text-[11.5px] text-black/45">
            Inclusive of all taxes · EMI from ₹
            {emiPerMonth.toLocaleString("en-IN")}/mo available
          </p>

          {(product.colors?.length || product.storage?.length) && (
            <div className="mt-6 border-t border-black/[0.07] pt-6">
              <VariantSelector
                colors={product.colors}
                storageOptions={product.storage}
                selectedColor={selectedColor}
                selectedStorage={selectedStorage}
                onColorChange={setSelectedColor}
                onStorageChange={setSelectedStorage}
              />
            </div>
          )}

          <div className="mt-6 border-t border-black/[0.07] pt-6">
            <ProductActions
              product={product}
              selectedColor={selectedColor}
              selectedStorage={selectedStorage}
            />
          </div>

          <div className="mt-6">
            <DeliveryInfo />
          </div>

          <div className="mt-6 space-y-6">
            <ProductSpecifications specifications={product.specifications} />

            <ProductReviews
              rating={product.rating}
              reviewCount={product.reviewCount}
              ratingBreakdown={product.ratingBreakdown}
              reviews={product.reviews}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
