import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
      {/* We use min-h-[calc(100vh-10rem)] to make it fill the vertical space between header and footer (assuming they are roughly 5rem each) */}

      <AlertTriangle
        className="text-[#D4AF37] mb-6" // Muted Gold accent color
        size={64}
        strokeWidth={1.5}
      />

      <h1 className="text-6xl md:text-8xl font-playfair font-bold text-gray-800 mb-4">
        404
      </h1>

      <h2 className="text-xl md:text-2xl font-lato text-gray-600 mb-8">
        The property or page you are looking for could not be found.
      </h2>

      <p className="max-w-md text-gray-500 mb-10">
        The link may be broken, or the page may have been removed. We invite you
        to return to our exclusive listings to continue your search.
      </p>

      <Button asChild>
        <Link href="/listings">Back to Listings</Link>
      </Button>
    </div>
  );
}
