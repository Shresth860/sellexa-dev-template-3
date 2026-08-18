"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Swal from "sweetalert2";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

type ProductActionsProps = {
  product: Product;
  selectedColor?: string;
  selectedStorage?: string;
};

export default function ProductActions({
  product,
  selectedColor,
  selectedStorage,
}: ProductActionsProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<
    "idle" | "valid" | "invalid"
  >("idle");

  const maxQuantity = Math.min(product.stock, 10) || 1;

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        price: product.price,
        color: selectedColor,
        storage: selectedStorage,
      },
      quantity
    );

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

  const handleCheckPincode = () => {
    setPincodeStatus(/^\d{6}$/.test(pincode) ? "valid" : "invalid");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 items-center rounded-lg border border-black/15">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-full w-10 items-center justify-center text-black/60 transition hover:text-black disabled:opacity-30"
          >
            <Minus size={15} strokeWidth={1.8} />
          </button>

          <span className="w-8 text-center text-sm font-medium">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              setQuantity((value) => Math.min(maxQuantity, value + 1))
            }
            disabled={quantity >= maxQuantity}
            aria-label="Increase quantity"
            className="flex h-full w-10 items-center justify-center text-black/60 transition hover:text-black disabled:opacity-30"
          >
            <Plus size={15} strokeWidth={1.8} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex h-11 flex-1 items-center justify-center rounded-lg bg-black text-[13px] font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:bg-black/25"
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex h-11 items-center justify-center rounded-lg border border-black bg-white px-6 text-[13px] font-semibold text-black transition hover:bg-black/[0.04] disabled:cursor-not-allowed disabled:opacity-30"
        >
          Buy Now
        </button>
      </div>

      <div>
        <div className="flex gap-2">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={pincode}
            onChange={(event) => {
              setPincode(event.target.value.replace(/\D/g, ""));
              setPincodeStatus("idle");
            }}
            placeholder="Enter pincode"
            className="h-11 flex-1 rounded-lg border border-black/15 px-4 text-sm placeholder:text-black/35 focus:border-black/40 focus:outline-none"
          />

          <button
            type="button"
            onClick={handleCheckPincode}
            className="h-11 shrink-0 rounded-lg border border-black/15 px-5 text-[13px] font-medium text-black transition hover:border-black/35"
          >
            Check
          </button>
        </div>

        {pincodeStatus === "valid" && (
          <p className="mt-2 text-xs text-green-700">
            Delivery available — arrives in 3-5 days.
          </p>
        )}

        {pincodeStatus === "invalid" && (
          <p className="mt-2 text-xs text-red-600">
            Enter a valid 6-digit pincode.
          </p>
        )}
      </div>
    </div>
  );
}
