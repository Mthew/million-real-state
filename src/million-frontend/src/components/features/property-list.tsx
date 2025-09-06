"use client"; // This component needs to be a client component for potential future interactivity (e.g., hover effects)

import { PropertySummary } from "@/types";
import { PropertyCard } from "./property-card"; // Assuming you will create this component
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface PropertyListProps {
  properties: PropertySummary[];
}

export const PropertyList = ({ properties }: PropertyListProps) => {
  const router = useRouter();
  const handlers = {
    clearFilters: () => {
      router.push("/listings");
    },
  };

  if (properties.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 lg:py-20">
        <div className="max-w-sm sm:max-w-md mx-auto px-4">
          <div className="mb-4 lg:mb-6">
            <svg
              className="mx-auto h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-semibold text-foreground mb-2 lg:mb-3">
            No properties found
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 lg:mb-8 text-pretty">
            Please broaden your search criteria to find more properties.
          </p>
          <Button
            onClick={handlers.clearFilters}
            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-6 py-2 lg:py-3 text-sm lg:text-base"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.ownerId} property={property} />
      ))}
    </div>
  );
};
