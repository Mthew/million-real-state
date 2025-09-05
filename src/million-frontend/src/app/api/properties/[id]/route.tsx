import { type NextRequest, NextResponse } from "next/server";

// Mock detailed property data based on the DTO structure
const mockPropertyDetails = {
  "68b73ffa04b4a84b6673518c": {
    id: "68b73ffa04b4a84b6673518c",
    ownerId: "68b73ffa04b4a84b6673518a",
    name: "Oceanfront Villa",
    address: "101 Coastline Road, Paradise Cove",
    price: 8250000,
    codeInternal: "VF101",
    year: 2018,
    imageUrl:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    owner: {
      id: "68b73ffa04b4a84b6673518a",
      name: "David Beaumont",
      address: "456 Dreamer's Drive, Serenity Bay",
      photoUrl:
        "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpg",
      birthday: "1975-11-15T00:00:00Z",
    },
    images: [
      {
        id: "68b73ffa04b4a84b66735190",
        propertyId: "68b73ffa04b4a84b6673518c",
        fileUrl:
          "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
        isEnabled: true,
      },
      {
        id: "68b73ffa04b4a84b66735191",
        propertyId: "68b73ffa04b4a84b6673518c",
        fileUrl: "/malibu-oceanfront-luxury-villa.jpg",
        isEnabled: true,
      },
      {
        id: "68b73ffa04b4a84b66735192",
        propertyId: "68b73ffa04b4a84b6673518c",
        fileUrl: "/miami-beach-luxury-condo.jpg",
        isEnabled: true,
      },
    ],
    traces: [
      {
        id: "68b73ffa04b4a84b66735192",
        propertyId: "68b73ffa04b4a84b6673518c",
        dateSale: "2023-01-10T00:00:00Z",
        name: "Previous Sale to Investment Group",
        value: 7500000,
        tax: 375000,
      },
      {
        id: "68b73ffa04b4a84b66735193",
        propertyId: "68b73ffa04b4a84b6673518c",
        dateSale: "2020-05-15T00:00:00Z",
        name: "Initial Purchase",
        value: 6800000,
        tax: 340000,
      },
    ],
  },
  // Add more mock properties with similar structure
  "1": {
    id: "1",
    ownerId: "owner1",
    name: "Manhattan Penthouse",
    address: "432 Park Avenue, New York, NY 10022",
    price: 15750000,
    codeInternal: "MP432",
    year: 2020,
    imageUrl: "/luxury-penthouse-manhattan.png",
    owner: {
      id: "owner1",
      name: "Alexander Sterling",
      address: "123 Elite Street, Manhattan, NY",
      photoUrl:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      birthday: "1968-03-22T00:00:00Z",
    },
    images: [
      {
        id: "img1",
        propertyId: "1",
        fileUrl: "/luxury-penthouse-manhattan.png",
        isEnabled: true,
      },
      {
        id: "img2",
        propertyId: "1",
        fileUrl: "/beverly-hills-luxury-mansion.jpg",
        isEnabled: true,
      },
    ],
    traces: [
      {
        id: "trace1",
        propertyId: "1",
        dateSale: "2022-08-20T00:00:00Z",
        name: "Corporate Acquisition",
        value: 14200000,
        tax: 710000,
      },
    ],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const propertyId = params.id;
    const property =
      mockPropertyDetails[propertyId as keyof typeof mockPropertyDetails];

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ property });
  } catch (error) {
    console.error("Error fetching property details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
