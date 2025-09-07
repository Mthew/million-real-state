"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { PropertyImage } from "@/types";
import Image from "next/image";

interface PropertyImageGalleryProps {
  images: PropertyImage[];
  propertyName: string;
  fallbackImageUrl: string;
}

export function PropertyImageGallery({
  images,
  propertyName,
  fallbackImageUrl,
}: PropertyImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const displayImages =
    images.length > 0
      ? images
      : [
          {
            id: "fallback",
            fileUrl: fallbackImageUrl,
            isEnabled: true,
          } as PropertyImage,
        ];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
        <Image
          src={displayImages[selectedImageIndex]?.fileUrl || fallbackImageUrl}
          alt={propertyName}
          fill
          className="object-cover"
          priority={selectedImageIndex === 0}
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
        {displayImages.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <Camera className="w-3 h-3" />
            {selectedImageIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Image Thumbnails */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {displayImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImageIndex(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImageIndex === index
                  ? "border-accent ring-2 ring-accent/20"
                  : "border-transparent hover:border-muted-foreground/20"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.fileUrl || fallbackImageUrl}
                  alt={`${propertyName} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 12vw"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
