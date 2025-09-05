import Image from "next/image";
import Link from "next/link";

interface Property {
  idOwner: string;
  name: string;
  address: string;
  price: number;
  imageUrl: string;
}

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/property/${property.idOwner}`} className="block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer transform hover:-translate-y-1 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-96 overflow-hidden flex-shrink-0">
          <Image
            src={property.imageUrl || "/placeholder.svg"}
            alt={property.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-[0.15em] mb-2 font-sans">
            Mandarin Oriental Brickell
          </p>

          <h3 className="text-xl font-serif font-normal text-foreground mb-4 text-balance leading-tight tracking-tight">
            {property.name}
          </h3>

          <div className="flex items-center gap-4 text-xs text-muted-foreground/60 mb-5 font-sans tracking-wide">
            <span>4 Beds</span>
            <span className="text-muted-foreground/30">•</span>
            <span>5 Baths</span>
            <span className="text-muted-foreground/30">•</span>
            <span>4,390 Sq. Ft.</span>
          </div>

          {/* Price */}
          <div className="text-xl font-medium text-foreground/90 tracking-tight font-sans mt-auto">
            {formatPrice(property.price)}
          </div>
        </div>
      </div>
    </Link>
  );
}
