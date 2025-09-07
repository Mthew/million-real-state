import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, Calendar, MapPin, User, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyDetail } from "@/types";
import { getPropertyById } from "@/lib/api";

import Image from "next/image";
import { PropertyImageGallery } from "@/components/features/Image-gallery";

interface PropertyDetailPageProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

// Server-side data fetching
async function getPropertyData(id: string): Promise<PropertyDetail> {
  try {
    const property = await getPropertyById(id);
    return property;
  } catch (error) {
    console.error("Error fetching property:", error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const property = await getPropertyById(params.id);

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    };

    return {
      title: `${property.name} - ${formatPrice(
        property.price
      )} | Million Real Estate`,
      description: `Luxury property located at ${property.address}. Built in ${property.year}. Contact us for more information about this exclusive real estate opportunity.`,
      openGraph: {
        title: `${property.name} - ${formatPrice(property.price)}`,
        description: `Luxury property located at ${property.address}`,
        images: [
          {
            url: property.imageUrl,
            width: 1200,
            height: 630,
            alt: property.name,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Property Not Found | Million Real Estate",
      description: "The requested property could not be found.",
    };
  }
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const property = await getPropertyData(params.id);

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
            <PropertyImageGallery
              images={property.images}
              propertyName={property.name}
              fallbackImageUrl={property.imageUrl}
            />
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
                <div className="relative w-12 h-12">
                  <Image
                    src={property.owner.photoUrl || "/placeholder.svg"}
                    alt={property.owner.name}
                    fill
                    className="rounded-full object-cover"
                    sizes="48px"
                  />
                </div>
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
