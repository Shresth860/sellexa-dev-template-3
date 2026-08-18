"use client";

import { Check } from "lucide-react";
import CartItemCard from "./CartItemCard";

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  badge?: string;
}

export interface CartLineItem {
  product: CartProduct;
  quantity: number;
}

interface CartItemsProps {
  items: CartLineItem[];
  selectedIds: Set<string>;
  allSelected: boolean;
  onSelectAll: () => void;
  onToggleSelect: (productId: string) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItems({
  items,
  selectedIds,
  allSelected,
  onSelectAll,
  onToggleSelect,
  onQuantityChange,
  onRemove,
}: CartItemsProps) {
  if (items.length === 0) {
    return null;
  }

  const selectedCount = selectedIds.size;

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Selection Header - Desktop */}
      <div className="mb-4 hidden flex-wrap items-center gap-4 rounded-2xl bg-white px-4 py-3 sm:flex">
        <button
          type="button"
          onClick={onSelectAll}
          className="flex items-center gap-3 text-sm font-semibold text-zinc-700 transition hover:text-zinc-950"
        >
          <span
            className={`flex size-5 items-center justify-center rounded-[6px] border-2 transition ${
              allSelected
                ? "border-zinc-900 bg-zinc-900"
                : "border-zinc-300 bg-white"
            }`}
          >
            {allSelected && (
              <Check
                size={12}
                strokeWidth={3}
                className="text-white"
              />
            )}
          </span>
          <span>{allSelected ? "Deselect All" : "Select All"}</span>
        </button>

        <div className="ml-auto text-xs text-zinc-400">
          {selectedCount} of {items.length} selected
        </div>
      </div>

      {/* Selection Header - Mobile */}
      <div className="mb-3 flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-3 py-2.5 sm:hidden">
        <button
          type="button"
          onClick={onSelectAll}
          className="flex items-center gap-2 text-xs font-semibold text-zinc-700"
        >
          <span
            className={`flex size-4 items-center justify-center rounded-[4px] border-2 transition ${
              allSelected
                ? "border-zinc-900 bg-zinc-900"
                : "border-zinc-300 bg-white"
            }`}
          >
            {allSelected && (
              <Check
                size={10}
                strokeWidth={3}
                className="text-white"
              />
            )}
          </span>
          <span>{allSelected ? "Deselect All" : "Select All"}</span>
        </button>

        <span className="text-[10px] font-medium text-zinc-400">
          {selectedCount}/{items.length}
        </span>
      </div>

      {/* Cart Items */}
      <div className="space-y-2">
        {items.map(({ product, quantity }) => (
          <CartItemCard
            key={product.id}
            product={product}
            quantity={quantity}
            isSelected={selectedIds.has(product.id)}
            onToggleSelect={() => onToggleSelect(product.id)}
            onQuantityChange={(qty) =>
              onQuantityChange(product.id, qty)
            }
            onRemove={() => onRemove(product.id)}
          />
        ))}
      </div>
    </div>
  );
}