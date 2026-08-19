import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/home/Header";
import HomeFooter from "@/components/home/HomeFooter";
import ProductDetails from "@/components/products/ProductDetails";
import { getProductBySlug } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Sellexa" };
  }

  return {
    title: "Sellexa",
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main>
        <ProductDetails product={product} />
      </main>

      <HomeFooter />
    </div>
  );
}
