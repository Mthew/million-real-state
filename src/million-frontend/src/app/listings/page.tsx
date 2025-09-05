"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { FilterBar } from "@/components/filter-bar";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";

interface Property {
  idOwner: string;
  name: string;
  address: string;
  price: number;
  imageUrl: string;
}

interface ApiResponse {
  properties: Property[];
  total: number;
}

export default function ListingsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<{
    name: string;
    address: string;
    minPrice: string;
    maxPrice: string;
  }>({
    name: "",
    address: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchProperties = async (filters?: {
    name: string;
    address: string;
    minPrice: string;
    maxPrice: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters?.name) params.append("name", filters.name);
      if (filters?.address) params.append("address", filters.address);
      if (filters?.minPrice) params.append("minPrice", filters.minPrice);
      if (filters?.maxPrice) params.append("maxPrice", filters.maxPrice);

      const response = await fetch(`/api/properties?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data: ApiResponse = await response.json();
      setProperties(data.properties);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleApplyFilters = (filters: {
    name: string;
    address: string;
    minPrice: string;
    maxPrice: string;
  }) => {
    setCurrentFilters(filters);
    fetchProperties(filters);
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      name: "",
      address: "",
      minPrice: "",
      maxPrice: "",
    };
    setCurrentFilters(emptyFilters);
    fetchProperties(emptyFilters);
  };

  const handleRetry = () => {
    fetchProperties(currentFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-16">
        <div className="relative text-center mb-12 sm:mb-16 lg:mb-20">
          {/* Subtle background accent */}
          <div className="absolute inset-0 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 bg-gradient-to-b from-muted/20 via-transparent to-transparent rounded-3xl"></div>

          <div className="relative z-10 py-12 sm:py-16 lg:py-20">
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-accent/50 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-accent-foreground/80 tracking-wide uppercase mb-6">
                Curated Collection
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-foreground mb-6 sm:mb-8 lg:mb-10 text-balance leading-[0.9] tracking-tight">
              Exclusive
              <span className="block font-normal italic text-accent">
                Properties
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground/80 max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-pretty leading-relaxed font-light mb-8 sm:mb-10 lg:mb-12">
              Discover our meticulously curated collection of the world's most
              prestigious luxury real estate investments and architectural
              masterpieces
            </p>

            {/* Elegant divider */}
            <div className="flex items-center justify-center mb-8 sm:mb-10 lg:mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent w-24 sm:w-32 lg:w-48"></div>
              <div className="mx-4 w-1 h-1 bg-accent rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent w-24 sm:w-32 lg:w-48"></div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />

        {/* Results Count */}
        {!isLoading && !error && (
          <div className="mb-6 lg:mb-8">
            <p className="text-muted-foreground text-sm lg:text-base">
              Showing {properties.length}{" "}
              {properties.length === 1 ? "property" : "properties"}
            </p>
          </div>
        )}

        {isLoading && (
          <div className="space-y-6 lg:space-y-8">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-32 sm:w-48 mb-6 lg:mb-8"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg overflow-hidden animate-pulse"
                >
                  <div className="h-48 sm:h-56 lg:h-64 bg-muted"></div>
                  <div className="p-4 sm:p-6">
                    <div className="h-5 lg:h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-4 w-3/4"></div>
                    <div className="h-6 lg:h-8 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                Something went wrong
              </h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button
                onClick={handleRetry}
                className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {properties.map((property) => (
                  <PropertyCard key={property.idOwner} property={property} />
                ))}
              </div>
            ) : (
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
                    onClick={handleClearFilters}
                    className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-6 py-2 lg:py-3 text-sm lg:text-base"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
