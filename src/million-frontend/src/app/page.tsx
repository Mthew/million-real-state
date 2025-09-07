"use client";

import { ListingsHero } from "@/components/features/listings-hero";

export default function ListingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-16">
        <ListingsHero />
      </main>
    </div>
  );
}
