import SearchHeader from "@/components/search/SearchHeader";
import SearchFilters from "@/components/search/SearchFilters";
import SortDropdown from "@/components/search/SortDropdown";
import SearchResults from "@/components/search/SearchResults";
import { products } from "@/data/products";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
    price?: string;
    rating?: string;
    sort?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;

  const query = params.q ?? "";

  return (
    <div className="min-h-screen bg-white text-black">
      <SearchHeader
        query={query}
        resultCount={products.length}
      />

      <main>
        <div className="mx-auto flex max-w-[1780px] items-stretch px-4 sm:px-6 lg:px-8">
          {/* Desktop filter sidebar */}
          <aside className="hidden w-[230px] shrink-0 self-stretch lg:block">
            <div className="h-full py-5 pr-5">
              <SearchFilters />
            </div>
          </aside>

          {/* Product area */}
          <section className="min-w-0 flex-1">
            {/* Toolbar */}
            <div className="border-b border-black/[0.06] py-4">
              <div className="flex items-center justify-between gap-4">
                <p className="hidden text-xs text-black/40 sm:block">
                  Explore our collection
                </p>

                <div className="ml-auto w-full sm:w-auto">
                  <SortDropdown />
                </div>
              </div>

              {/* Mobile filters */}
              <div className="mt-3 lg:hidden">
                <SearchFilters />
              </div>
            </div>

            {/* Products */}
            <div className="py-5 pr-1 sm:py-6">
              <SearchResults />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}