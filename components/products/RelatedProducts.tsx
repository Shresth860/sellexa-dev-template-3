import type { Product } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

type RelatedProductsProps = {
  products: Product[];
};

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 sm:mt-16">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
        You may also like
      </p>
      <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-black">
        More picks for you
      </h2>

      <div className="mt-6 grid grid-cols-2 items-start gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
