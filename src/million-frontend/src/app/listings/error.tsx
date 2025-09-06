"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

// Next.js passes `error` and `reset` props to this component
export default function ListingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Listings Page Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center bg-gray-50 p-8 rounded-lg border border-red-200 min-h-[400px]">
        <AlertTriangle className="text-red-500 mb-4" size={48} />

        <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-2">
          Something Went Wrong
        </h2>

        <p className="text-gray-600 mb-6 text-center max-w-md">
          We were unable to load the property listings at this time. This could
          be a temporary issue with our server.
        </p>

        {/* The `reset` function attempts to re-render the page component */}
        <Button onClick={() => reset()} variant={"secondary"}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
