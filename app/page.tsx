import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BestSellingProducts from "@/components/home/BestSellingProducts";
import NewArrivals from "@/components/home/NewArrivals";
import PromoSection from "@/components/home/PromoSection";
import CustomerRating from "@/components/home/CustomerRating";
import HomeFooter from "@/components/home/HomeFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main>
        <HeroSection />

        <section id="categories" className="scroll-mt-24">
          <CategorySection />
        </section>

        <section
          id="featured-products"
          className="scroll-mt-24"
        >
          <FeaturedProducts />
        </section>

        <section
          id="best-sellers"
          className="scroll-mt-24"
        >
          <BestSellingProducts />
        </section>

        <section
          id="new-arrivals"
          className="scroll-mt-24"
        >
          <NewArrivals />
        </section>

        <PromoSection />
        <CustomerRating />
      </main>

      <HomeFooter />
    </div>
  );
}