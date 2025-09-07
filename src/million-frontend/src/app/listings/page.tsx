import { FilterBar } from "@/components/features/filter-bar";
import { PropertyList } from "@/components/features/property-list";
import { getProperties } from "@/lib/api";

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const params = new URLSearchParams();
  if (searchParams?.name) {
    params.append("name", searchParams.name as string);
  }
  if (searchParams?.address) {
    params.append("address", searchParams.address as string);
  }
  if (searchParams?.minPrice) {
    params.append("minPrice", searchParams.minPrice as string);
  }
  if (searchParams?.maxPrice) {
    params.append("maxPrice", searchParams.maxPrice as string);
  }

  const properties = await getProperties(params);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-16">
        {/* Filter Bar */}
        <FilterBar />

        {/* Results Count */}

        <div className="mb-6 lg:mb-8">
          <p className="text-muted-foreground text-sm lg:text-base">
            Showing {properties.length}{" "}
            {properties.length === 1 ? "property" : "properties"}
          </p>
        </div>

        <PropertyList properties={properties} />
      </main>
    </div>
  );
}
