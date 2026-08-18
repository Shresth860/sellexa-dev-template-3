import ProductSkeleton from "@/components/products/ProductSkeleton";

type SearchSkeletonProps = {
  count?: number;
};

export default function SearchSkeleton({
  count = 10,
}: SearchSkeletonProps) {
  return (
    <div
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12 xl:grid-cols-5"
      aria-label="Loading products"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}