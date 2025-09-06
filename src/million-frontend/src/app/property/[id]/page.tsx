"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  DollarSign,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyOwner {
  id: string;
  name: string;
  address: string;
  photoUrl: string;
  birthday: string;
}

interface PropertyImage {
  id: string;
  propertyId: string;
  fileUrl: string;
  isEnabled: boolean;
}

interface PropertyTrace {
  id: string;
  propertyId: string;
  dateSale: string;
  name: string;
  value: number;
  tax: number;
}

interface PropertyDetail {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  imageUrl: string;
  owner: PropertyOwner;
  images: PropertyImage[];
  traces: PropertyTrace[];
}

export default function PropertyDetailPage({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/properties/${params.id}`);

        if (!response.ok) {
          throw new Error("Property not found");
        }

        const data = await response.json();
        setProperty(data.property);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load property"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-8"></div>
            <div className="h-96 bg-muted rounded-lg mb-8"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-6 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-foreground mb-4">
            Property Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            {error || "The requested property could not be found."}
          </p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const enabledImages = property.images.filter((img) => img.isEnabled);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Navigation */}
        <Link
          href="/listings"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <img
                  src={
                    enabledImages[selectedImageIndex]?.fileUrl ||
                    property.imageUrl
                  }
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  {selectedImageIndex + 1} / {enabledImages.length}
                </div>
              </div>

              {/* Image Thumbnails */}
              {enabledImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {enabledImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-accent ring-2 ring-accent/20"
                          : "border-transparent hover:border-muted-foreground/20"
                      }`}
                    >
                      <img
                        src={image.fileUrl || "/placeholder.svg"}
                        alt={`${property.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Property Information */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <h1 className="text-3xl font-serif text-foreground">
                {property.name}
              </h1>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{property.address}</span>
              </div>
              <div className="text-xl font-medium text-foreground">
                {formatPrice(property.price)}
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-4 p-6 bg-muted/30 rounded-lg">
              <h3 className="font-serif text-lg text-foreground">
                Property Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Internal Code:</span>
                  <span className="font-medium">{property.codeInternal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year Built:</span>
                  <span className="font-medium">{property.year}</span>
                </div>
              </div>
            </div>

            {/* Owner Information */}
            <div className="space-y-4 p-6 bg-muted/30 rounded-lg">
              <h3 className="font-serif text-lg text-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Owner Information
              </h3>
              <div className="flex items-start gap-4">
                <img
                  src={property.owner.photoUrl || "/placeholder.svg"}
                  alt={property.owner.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="space-y-1">
                  <div className="font-medium">{property.owner.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {property.owner.address}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Born: {formatDate(property.owner.birthday)}
                  </div>
                </div>
              </div>
            </div>

            {/* Sales History */}
            {property.traces.length > 0 && (
              <div className="space-y-4 p-6 bg-muted/30 rounded-lg">
                <h3 className="font-serif text-lg text-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Sales History
                </h3>
                <div className="space-y-4">
                  {property.traces
                    .sort(
                      (a, b) =>
                        new Date(b.dateSale).getTime() -
                        new Date(a.dateSale).getTime()
                    )
                    .map((trace) => (
                      <div
                        key={trace.id}
                        className="border-l-2 border-accent/20 pl-4 space-y-1"
                      >
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-3 h-3" />
                          <span className="text-muted-foreground">
                            {formatDate(trace.dateSale)}
                          </span>
                        </div>
                        <div className="font-medium">{trace.name}</div>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Sale Price:
                            </span>
                            <span className="font-medium">
                              {formatPrice(trace.value)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tax:</span>
                            <span className="font-medium">
                              {formatPrice(trace.tax)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Contact Button */}
            <Button className="w-full" size="lg">
              Contact Agent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
