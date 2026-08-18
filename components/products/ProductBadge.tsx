import type { Product } from "@/data/products";

type ProductBadgeProps = {
  badge?: Product["badge"];
  className?: string;
};

export default function ProductBadge({
  badge,
  className = "",
}: ProductBadgeProps) {
  if (!badge) {
    return null;
  }

  const badgeStyles: Record<string, string> = {
    "Best Seller": "bg-black text-white",
    "New Arrival": "bg-white text-black border border-black/10",
    Sale: "bg-black text-white",
    Featured: "bg-white text-black border border-black/10",
  };

  const style =
    badgeStyles[badge] ||
    "bg-white text-black border border-black/10";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] shadow-sm backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-[10px] ${style} ${className}`}
    >
      {badge}
    </span>
  );
}