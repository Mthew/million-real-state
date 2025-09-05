import { type NextRequest, NextResponse } from "next/server";

export interface Property {
  idOwner: string;
  name: string;
  address: string;
  price: number;
  imageUrl: string;
}

// Mock database - in a real app, this would be a database query
const properties: Property[] = [
  {
    idOwner: "1",
    name: "Luxury Penthouse Manhattan",
    address: "432 Park Avenue, New York, NY 10022",
    price: 15000000,
    imageUrl: "/luxury-penthouse-manhattan.png",
  },
  {
    idOwner: "2",
    name: "Beverly Hills Estate",
    address: "1234 Rodeo Drive, Beverly Hills, CA 90210",
    price: 25000000,
    imageUrl: "/beverly-hills-luxury-mansion.jpg",
  },
  {
    idOwner: "3",
    name: "Malibu Oceanfront Villa",
    address: "567 Pacific Coast Highway, Malibu, CA 90265",
    price: 18500000,
    imageUrl: "/malibu-oceanfront-luxury-villa.jpg",
  },
  {
    idOwner: "4",
    name: "Miami Beach Condo",
    address: "789 Ocean Drive, Miami Beach, FL 33139",
    price: 3200000,
    imageUrl: "/miami-beach-luxury-condo.jpg",
  },
  {
    idOwner: "5",
    name: "Aspen Mountain Retreat",
    address: "321 Snowmass Village, Aspen, CO 81615",
    price: 12000000,
    imageUrl: "/aspen-mountain-luxury-chalet.jpg",
  },
  {
    idOwner: "6",
    name: "Hamptons Waterfront Estate",
    address: "456 Meadow Lane, Southampton, NY 11968",
    price: 22000000,
    imageUrl: "/hamptons-waterfront-luxury-estate.jpg",
  },
  {
    idOwner: "7",
    name: "Napa Valley Vineyard Estate",
    address: "789 Silverado Trail, Napa, CA 94558",
    price: 8500000,
    imageUrl: "/napa-valley-vineyard-estate.jpg",
  },
  {
    idOwner: "8",
    name: "Park Avenue Duplex",
    address: "740 Park Avenue, New York, NY 10021",
    price: 28000000,
    imageUrl: "/park-avenue-luxury-duplex.jpg",
  },
];

export async function GET(request: NextRequest) {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const address = searchParams.get("address");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    let filteredProperties = properties;

    // Apply filters
    if (name) {
      filteredProperties = filteredProperties.filter((property) =>
        property.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (address) {
      filteredProperties = filteredProperties.filter((property) =>
        property.address.toLowerCase().includes(address.toLowerCase())
      );
    }

    if (minPrice) {
      const min = Number.parseInt(minPrice);
      if (!Number.isNaN(min)) {
        filteredProperties = filteredProperties.filter(
          (property) => property.price >= min
        );
      }
    }

    if (maxPrice) {
      const max = Number.parseInt(maxPrice);
      if (!Number.isNaN(max)) {
        filteredProperties = filteredProperties.filter(
          (property) => property.price <= max
        );
      }
    }

    return NextResponse.json({
      properties: filteredProperties,
      total: filteredProperties.length,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
