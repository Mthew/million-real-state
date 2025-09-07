// Mock data for testing
export const mockProperties = [
  {
    id: "1",
    ownerId: "owner1",
    name: "Luxury Manhattan Penthouse",
    address: "123 Park Avenue, New York, NY",
    price: 5000000,
    imageUrl: "/luxury-penthouse-manhattan.png",
  },
  {
    id: "2",
    ownerId: "owner2",
    name: "Beverly Hills Mansion",
    address: "456 Beverly Drive, Beverly Hills, CA",
    price: 8500000,
    imageUrl: "/beverly-hills-luxury-mansion.jpg",
  },
  {
    id: "3",
    ownerId: "owner3",
    name: "Miami Beach Condo",
    address: "789 Ocean Drive, Miami Beach, FL",
    price: 2750000,
    imageUrl: "/miami-beach-luxury-condo.jpg",
  },
];

export const mockPropertyDetail = {
  id: "1",
  ownerId: "owner1",
  name: "Luxury Manhattan Penthouse",
  address: "123 Park Avenue, New York, NY",
  price: 5000000,
  codeInternal: "LUX001",
  year: 2020,
  imageUrl: "/luxury-penthouse-manhattan.png",
  owner: {
    id: "owner1",
    name: "John Smith",
    address: "100 Wall Street, New York, NY",
    photoUrl: "/owner-photo.jpg",
    birthday: "1975-06-15T00:00:00Z",
  },
  images: [
    {
      id: "img1",
      fileUrl: "/luxury-penthouse-manhattan.png",
      isEnabled: true,
    },
    {
      id: "img2",
      fileUrl: "/luxury-penthouse-interior.jpg",
      isEnabled: true,
    },
  ],
  traces: [
    {
      id: "trace1",
      dateSale: "2023-01-15T00:00:00Z",
      name: "Initial Sale",
      value: 4500000,
      tax: 45000,
    },
  ],
};

// Mock API responses
export const mockApiResponse = {
  success: mockProperties,
  empty: [],
  error: new Error("API Error"),
  detail: mockPropertyDetail,
};
