"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import type { Product } from "@/data/products";
import ProductBadge from "@/components/products/ProductBadge";
import { useCart } from "@/context/CartContext";

type RelatedProductCardProps = {
  product: Product;
};

export default function RelatedProductCard({
  product,
}: RelatedProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      color: product.colors?.[0]?.name,
      storage: product.storage?.[0],
    });

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Added to cart",
      showConfirmButton: false,
      timer: 1600,
      timerProgressBar: true,
    });
  };

  return (
    <article className="group w-full min-w-0">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f5f5f3] sm:rounded-2xl">
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 42vw, (max-width: 1024px) 200px, 220px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        <ProductBadge
          badge={product.badge}
          className="absolute left-2 top-2 sm:left-3 sm:top-3"
        />

        <button
          type="button"
          onClick={() => setLiked((value) => !value)}
          aria-label={
            liked
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={liked}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 active:scale-95 sm:right-3 sm:top-3 sm:h-8 sm:w-8"
        >
          <Heart
            size={14}
            strokeWidth={1.7}
            fill={liked ? "currentColor" : "none"}
            className={liked ? "text-black" : "text-black/70"}
          />
        </button>
      </div>

      <div className="px-0.5 pt-2.5 sm:pt-3">
        <div className="flex h-3.5 items-center gap-1.5">
          {product.colors?.map((color) => (
            <span
              key={color.name}
              title={color.name}
              className="h-3.5 w-3.5 rounded-full border border-black/10"
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1.5 line-clamp-2 min-h-[2.25rem] text-[12px] font-medium leading-[1.35rem] text-black transition hover:text-black/55 sm:text-[13px] sm:leading-[1.4rem]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wider text-black/40">
          {product.brand}
        </p>

        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="text-[13px] font-semibold text-black sm:text-sm">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          {product.originalPrice && (
            <span className="text-[9px] text-black/35 line-through sm:text-[10px]">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <div className="mt-2.5 flex gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
            className="flex h-8 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-black text-[10px] font-medium text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:bg-black/25"
          >
            <ShoppingBag size={12} strokeWidth={1.7} />
            Add to cart
          </button>

          <button
            type="button"
            onClick={() => router.push(`/products/${product.slug}`)}
            className="flex h-8 flex-1 items-center justify-center whitespace-nowrap rounded-lg bg-black text-[10px] font-medium text-white transition hover:bg-black/85"
          >
            Buy
          </button>
        </div>
      </div>
    </article>
  );
}
