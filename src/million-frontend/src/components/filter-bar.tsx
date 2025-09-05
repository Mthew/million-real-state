"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FilterBarProps {
  onApplyFilters: (filters: {
    name: string;
    address: string;
    minPrice: string;
    maxPrice: string;
  }) => void;
  onClearFilters: () => void;
}

export function FilterBar({ onApplyFilters, onClearFilters }: FilterBarProps) {
  const [filters, setFilters] = useState({
    name: "",
    address: "",
    minPrice: "",
    maxPrice: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      address: "",
      minPrice: "",
      maxPrice: "",
    });
    onClearFilters();
  };

  return (
    <div className="bg-white shadow-sm rounded-xl overflow-hidden mb-8 lg:mb-12">
      <div className="lg:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors duration-300"
        >
          <span className="text-base font-medium text-charcoal font-serif">
            Filter Properties
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <div
        className={`p-6 sm:p-8 lg:p-10 ${!isExpanded ? "hidden lg:block" : ""}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
          {/* Property Name */}
          <div className="space-y-3">
            <Label
              htmlFor="property-name"
              className="text-sm font-medium text-charcoal/80 font-sans tracking-wide"
            >
              Property Name
            </Label>
            <Input
              id="property-name"
              type="text"
              placeholder="Enter property name"
              value={filters.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="bg-gray-50/50 border-0 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:shadow-sm h-12 text-base placeholder:text-gray-400 rounded-lg transition-all duration-300"
            />
          </div>

          {/* Address */}
          <div className="space-y-3">
            <Label
              htmlFor="address"
              className="text-sm font-medium text-charcoal/80 font-sans tracking-wide"
            >
              Address
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter address"
              value={filters.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="bg-gray-50/50 border-0 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:shadow-sm h-12 text-base placeholder:text-gray-400 rounded-lg transition-all duration-300"
            />
          </div>

          {/* Price Range - Responsive Layout */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Label className="text-sm font-medium text-charcoal/80 font-sans tracking-wide mb-3 block">
              Price Range
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="min-price"
                type="number"
                placeholder="Min price"
                value={filters.minPrice}
                onChange={(e) => handleInputChange("minPrice", e.target.value)}
                className="bg-gray-50/50 border-0 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:shadow-sm h-12 text-base placeholder:text-gray-400 rounded-lg transition-all duration-300"
              />
              <Input
                id="max-price"
                type="number"
                placeholder="Max price"
                value={filters.maxPrice}
                onChange={(e) => handleInputChange("maxPrice", e.target.value)}
                className="bg-gray-50/50 border-0 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:shadow-sm h-12 text-base placeholder:text-gray-400 rounded-lg transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:justify-between sm:items-center">
          {/* Fixed contrast issue by using proper design tokens instead of undefined charcoal class */}
          <Button
            onClick={handleApplyFilters}
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md px-8 py-3 h-12 text-base font-medium rounded-lg transition-all duration-300 order-2 sm:order-1"
          >
            Apply Filters
          </Button>
          <button
            onClick={handleClearFilters}
            className="text-gray-500 hover:text-accent transition-colors duration-300 text-base font-medium order-1 sm:order-2 self-start sm:self-center"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
