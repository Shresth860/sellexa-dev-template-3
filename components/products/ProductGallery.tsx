"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import ProductBadge from "@/components/products/ProductBadge";

type ProductGalleryProps = {
  images: string[];
  name: string;
  badge?: Product["badge"];
};

export default function ProductGallery({
  images,
  name,
  badge,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const activeImage = images[selectedIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f5f5f3] sm:aspect-4/5">
        <ProductBadge
          badge={badge}
          className="absolute left-3 top-3 z-10"
        />

        <button
          type="button"
          onClick={() => setLiked((value) => !value)}
          aria-label={
            liked ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`
          }
          aria-pressed={liked}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 active:scale-95"
        >
          <Heart
            size={16}
            strokeWidth={1.7}
            fill={liked ? "currentColor" : "none"}
            className={liked ? "text-black" : "text-black/70"}
          />
        </button>

        {activeImage ? (
          <Image
            src={activeImage}
            alt={name}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 55vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-black/35">
            No image available
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`View ${name} image ${index + 1}`}
              aria-pressed={index === selectedIndex}
              className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl border bg-[#f5f5f3] transition ${
                index === selectedIndex
                  ? "border-black"
                  : "border-black/10 hover:border-black/25"
              }`}
            >
              <Image
                src={image}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
