import { PropertyCardSkeleton } from "@/components/features/property-card-skeleton";

// This component is automatically shown by Next.js while the page.tsx is fetching data.
export default function ListingsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* You can also include skeletons for the title and filter bar if you wish */}
      <div className="h-10 bg-gray-200 rounded w-1/4 mb-8 animate-pulse"></div>
      <div className="h-16 bg-gray-200 rounded mb-8 animate-pulse"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Create an array of a fixed size to render multiple skeletons */}
        {Array.from({ length: 8 }).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
